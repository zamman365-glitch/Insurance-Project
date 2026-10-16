import { useState, useCallback } from 'react';
import { predictCost } from '../services/api';

/**
 * Custom hook to encapsulate the prediction request lifecycle, loading,
 * error state, and cached response.
 */
export function usePrediction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const predict = useCallback(async (payload, forceMock = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictCost(payload, forceMock);
      setData(response);
      return response;
    } catch (err) {
      const msg = err.message || 'Unable to generate prediction. Please check your network connection.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    data,
    predict,
    reset,
  };
}
