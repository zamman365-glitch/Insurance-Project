/**
 * API Service for InsureIQ.
 *
 * Implements the contract:
 *   POST /api/predict -> { predicted_charge: number, risk_level: 'low'|'medium'|'high', top_factors: [...] }
 *   GET /api/stats    -> Kaggle dataset insights & metrics
 *
 * Provides automatic fallback to the local mock calculation engine if the
 * backend server is unavailable, ensuring the application runs standalone out of the box.
 */

import { calculatePrediction } from '../utils/modelCalculator';
import { STATS_DATA } from '../data/statsData';

const BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Predicts insurance charges using backend API or local mock engine.
 * @param {Object} payload - { age, sex, bmi, children, smoker, region }
 * @param {boolean} [forceMock=false] - Optional override to force local mock
 * @returns {Promise<{ predicted_charge: number, risk_level: string, top_factors: Array, isMock: boolean }>}
 */
export async function predictCost(payload, forceMock = false) {
  if (forceMock || !BASE_URL) {
    // Simulate real network latency (550ms) for realistic loading skeleton / UX
    await new Promise((resolve) => setTimeout(resolve, 550));
    const result = calculatePrediction(payload);
    return {
      ...result,
      isMock: true,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age: Number(payload.age),
        sex: payload.sex,
        bmi: Number(payload.bmi),
        children: Number(payload.children),
        smoker: payload.smoker,
        region: payload.region,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      ...data,
      isMock: false,
    };
  } catch (error) {
    console.warn('Real API endpoint failed or unreachable. Falling back to local ML mock calculation.', error.message);
    // Graceful fallback to client-side ML calculation
    await new Promise((resolve) => setTimeout(resolve, 300));
    const result = calculatePrediction(payload);
    return {
      ...result,
      isMock: true,
      fallbackNotice: 'Prediction generated using client-side regression model.',
    };
  }
}

/**
 * Fetches static or live summary statistics for the insights dashboard.
 * @returns {Promise<typeof STATS_DATA>}
 */
export async function fetchStats() {
  if (!BASE_URL) {
    return STATS_DATA;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/stats`);
    if (response.ok) {
      return await response.json();
    }
    return STATS_DATA;
  } catch (err) {
    return STATS_DATA;
  }
}
