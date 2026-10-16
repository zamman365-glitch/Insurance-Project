import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  BrainCircuit,
  Binary,
  Layers,
  AlertTriangle,
  Info,
  CheckCircle2,
  TrendingUp,
  Table as TableIcon,
} from 'lucide-react';

/**
 * Model coefficients and performance metadata
 */
const CORRELATIONS_DATA = [
  { feature: 'is_smoker', label: 'Smoking Status (is_smoker)', correlation: 0.79, type: 'Binary (0/1)' },
  { feature: 'age', label: 'Age (years)', correlation: 0.30, type: 'Continuous' },
  { feature: 'bmi_category_Obese', label: 'Obese Category (BMI ≥ 30)', correlation: 0.20, type: 'Binary (0/1)' },
  { feature: 'bmi', label: 'Body Mass Index (BMI)', correlation: 0.20, type: 'Continuous' },
  { feature: 'region_southeast', label: 'Region: Southeast', correlation: 0.07, type: 'Binary (0/1)' },
  { feature: 'children', label: 'Children Count', correlation: 0.07, type: 'Discrete (0-5)' },
  { feature: 'region_northwest', label: 'Region: Northwest', correlation: -0.04, type: 'Binary (0/1)' },
];

const MODEL_SUMMARY = [
  { metric: 'Algorithm Architecture', value: 'Ordinary Least Squares (OLS) Linear Regression', note: 'Linear combination of scaled & encoded features' },
  { metric: 'Train / Test Split', value: '80% Train / 20% Test', note: '1,069 training samples, 268 test samples' },
  { metric: 'R² Score (Variance Explained)', value: '0.801 (80.1%)', note: 'Standard evaluation on 1,337 clean records' },
  { metric: 'Adjusted R² Score', value: '0.798 (79.8%)', note: 'Penalizes feature count (p = 8 regressors)' },
  { metric: 'Model Intercept (β₀)', value: '$6,881.82', note: 'Baseline expected premium for mean patient profile' },
  { metric: 'Feature Preprocessing', value: 'StandardScaler + One-Hot Drop-First', note: 'Zero-mean unit-variance scaling on age, BMI, children' },
];

const COEFFICIENTS_DATA = [
  {
    feature: 'is_smoker',
    coef: 23863.84,
    formattedCoef: '+$23,863.84',
    type: 'Binary (0/1)',
    pVal: '< 0.001',
    impact: 'Massive (+)',
    interpretation: 'Regular tobacco smoking adds ~$23,864/yr surcharge over non-smokers.',
  },
  {
    feature: 'age_scaled',
    coef: 3610.54,
    formattedCoef: '+$3,610.54',
    type: 'Standardized (μ=39.2, σ=14.0)',
    pVal: '< 0.001',
    impact: 'Strong (+)',
    interpretation: 'Each 1-SD increase in age (+14.0 yrs) adds $3,611 (~$257 per single year of age).',
  },
  {
    feature: 'bmi_category_Obese',
    coef: 2868.99,
    formattedCoef: '+$2,868.99',
    type: 'Threshold Dummy (BMI ≥ 30)',
    pVal: '< 0.001',
    impact: 'Moderate (+)',
    interpretation: 'Crossing into clinical obesity adds a non-linear $2,869 baseline step penalty.',
  },
  {
    feature: 'bmi_scaled',
    coef: 875.01,
    formattedCoef: '+$875.01',
    type: 'Standardized (μ=30.7, σ=6.1)',
    pVal: '< 0.001',
    impact: 'Moderate (+)',
    interpretation: 'Continuous weight gradient adds $875 per 1-SD (+6.1 BMI points, ~$143/unit).',
  },
  {
    feature: 'children_scaled',
    coef: 565.32,
    formattedCoef: '+$565.32',
    type: 'Standardized (μ=1.1, σ=1.2)',
    pVal: '< 0.01',
    impact: 'Mild (+)',
    interpretation: 'Family dependents add $565 per 1-SD (+1.2 children, ~$469 per dependent child).',
  },
  {
    feature: 'is_female',
    coef: 155.09,
    formattedCoef: '+$155.09',
    type: 'Binary (0=Male, 1=Female)',
    pVal: '0.685 (n.s.)',
    impact: 'Slight (+)',
    interpretation: 'Mild gender difference in claims; statistically non-significant.',
  },
  {
    feature: 'region_northwest',
    coef: 91.97,
    formattedCoef: '+$91.97',
    type: 'Dummy (vs. Northeast/Southwest)',
    pVal: '0.862 (n.s.)',
    impact: 'Slight (+)',
    interpretation: 'Slightly higher claims in Northwest vs. baseline reference quadrant.',
  },
  {
    feature: 'region_southeast',
    coef: -394.18,
    formattedCoef: '-$394.18',
    type: 'Dummy (vs. Northeast/Southwest)',
    pVal: '0.457 (n.s.)',
    impact: 'Slight (-)',
    interpretation: 'Mild downward baseline adjustment for Southeast policyholders.',
  },
];

/**
 * Custom Tooltip for Pearson Correlation Chart
 */
function CorrelationTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="md-tooltip" role="tooltip">
        <div className="md-tooltip-title">{data.label}</div>
        <div className="md-tooltip-row">
          <span>Pearson Correlation (r):</span>
          <strong style={{ color: data.correlation < 0 ? 'var(--md-danger, #e11d48)' : 'var(--md-primary, #0f766e)' }}>
            {data.correlation > 0 ? `+${data.correlation.toFixed(2)}` : data.correlation.toFixed(2)}
          </strong>
        </div>
        <div className="md-tooltip-type">Encoding: {data.type}</div>
      </div>
    );
  }
  return null;
}

CorrelationTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};

/**
 * ModelDashboard Component
 */
export function ModelDashboard({ className = '' }) {
  return (
    <section className={`md-wrapper ${className}`.trim()} aria-labelledby="md-title">
      {/* Header */}
      <div className="md-header">
        <span className="md-badge">
          <BrainCircuit size={14} aria-hidden="true" />
          <span>Machine Learning Calibration</span>
        </span>
        <h2 id="md-title" className="md-title">Model Specifications & Feature Weights</h2>
        <p className="md-subtitle">
          Detailed metrics, Pearson correlation rankings, and calibrated regression weights from the Kaggle dataset.
        </p>
      </div>

      {/* Top Section: Horizontal Correlation Chart */}
      <article className="md-card" tabIndex={0} role="region" aria-labelledby="chart-heading">
        <div className="md-card-header">
          <div>
            <h3 id="chart-heading" className="md-card-title">
              Pearson Feature Correlation with Annual Charges
            </h3>
            <p className="md-card-desc">
              Linear correlation coefficients (r). Positive drivers in teal, negative drivers in red.
            </p>
          </div>
          <div className="md-legend-strip">
            <span className="md-legend-item">
              <span className="md-legend-dot pos" /> Positive (r &gt; 0)
            </span>
            <span className="md-legend-item">
              <span className="md-legend-dot neg" /> Negative (r &lt; 0)
            </span>
          </div>
        </div>

        <figure
          className="md-chart-wrap"
          aria-label="Horizontal bar chart illustrating Pearson correlation of features with insurance charges where negative bars are colored in red"
        >
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={CORRELATIONS_DATA}
              layout="vertical"
              margin={{ top: 10, right: 35, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--md-border, #e2e8f0)" horizontal={false} />
              <XAxis
                type="number"
                domain={[-0.1, 0.9]}
                stroke="var(--md-text-muted, #64748b)"
                fontSize={12}
                tickFormatter={(v) => `${v > 0 ? '+' : ''}${v.toFixed(2)}`}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="feature"
                stroke="var(--md-text-muted, #64748b)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={150}
              />
              <Tooltip content={<CorrelationTooltip />} cursor={{ fill: 'var(--md-surface-subtle, rgba(0,0,0,0.03))' }} />
              <ReferenceLine x={0} stroke="var(--md-border-hover, #94a3b8)" strokeWidth={1.5} />
              <Bar dataKey="correlation" radius={[0, 4, 4, 0]}>
                {CORRELATIONS_DATA.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={entry.correlation < 0 ? 'var(--md-danger, #e11d48)' : 'var(--md-primary, #0f766e)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </figure>
      </article>

      {/* Actuarial / ML Limitation Callout Box */}
      <aside className="md-callout-box" role="note" aria-labelledby="limitation-title">
        <div className="md-callout-icon">
          <AlertTriangle size={24} aria-hidden="true" />
        </div>
        <div className="md-callout-content">
          <h4 id="limitation-title">Actuarial Limitation: Smoker × BMI Interaction Effect</h4>
          <p>
            Because <strong>smoking status dominates the regression ($r = 0.79$)</strong>, the OLS linear model
            treats BMI and smoking as additive independent terms. In reality, medical claims exhibit a steep
            multiplicative interaction: <strong>an obese smoker pays dramatically more ($\approx \$41,500+$)</strong>{' '}
            than the simple sum of independent BMI and smoking components. Non-linear models (e.g. Random Forest, XGBoost)
            capture this compound risk with higher accuracy ($R^2 \approx 0.86\text{–}0.87$).
          </p>
        </div>
      </aside>

      {/* Bottom Grid: Model Summary Table & Coefficients Table */}
      <div className="md-tables-grid">
        {/* Table 1: Model Summary */}
        <article className="md-card" tabIndex={0} role="region" aria-labelledby="summary-title">
          <div className="md-card-header">
            <h3 id="summary-title" className="md-card-title">Model Architecture & Fit Summary</h3>
            <span className="md-card-tag">Trained Model Parameters</span>
          </div>

          <div className="md-table-container">
            <table className="md-table" aria-label="Model summary metrics">
              <thead>
                <tr>
                  <th scope="col">Specification / Metric</th>
                  <th scope="col">Value</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {MODEL_SUMMARY.map((row, idx) => (
                  <tr key={idx}>
                    <td className="md-table-primary">{row.metric}</td>
                    <td>
                      <span className="md-metric-badge">{row.value}</span>
                    </td>
                    <td className="md-table-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* Table 2: Coefficients Table */}
        <article className="md-card" tabIndex={0} role="region" aria-labelledby="coef-title">
          <div className="md-card-header">
            <h3 id="coef-title" className="md-card-title">Linear Regression Feature Coefficients</h3>
            <span className="md-card-tag">8 Regressors + Intercept</span>
          </div>

          <div className="md-table-container">
            <table className="md-table" aria-label="Linear regression feature coefficients and interpretations">
              <thead>
                <tr>
                  <th scope="col">Feature Regressor</th>
                  <th scope="col">Coefficient (β)</th>
                  <th scope="col">Preprocessing / Scale</th>
                  <th scope="col">Actuarial Meaning</th>
                </tr>
              </thead>
              <tbody>
                {COEFFICIENTS_DATA.map((row, idx) => (
                  <tr key={idx}>
                    <td className="md-table-primary">
                      <code>{row.feature}</code>
                    </td>
                    <td>
                      <strong className={`md-coef-val ${row.coef < 0 ? 'neg' : 'pos'}`}>
                        {row.formattedCoef}
                      </strong>
                    </td>
                    <td className="md-table-muted">{row.type}</td>
                    <td style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>{row.interpretation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>

      {/* Scoped CSS with CSS Variables & Dark Theme */}
      <style>{`
        .md-wrapper {
          --md-primary: var(--color-primary, #0f766e);
          --md-primary-subtle: var(--color-primary-subtle, #f0fdfa);
          --md-primary-border: var(--color-primary-border, #99f6e4);
          --md-accent: var(--color-accent, #4f46e5);
          --md-surface: var(--color-surface, #ffffff);
          --md-surface-subtle: var(--color-surface-subtle, #f8fafc);
          --md-border: var(--color-border, #e2e8f0);
          --md-border-hover: var(--color-border-hover, #cbd5e1);
          --md-text: var(--color-text-primary, #0f172a);
          --md-text-muted: var(--color-text-muted, #64748b);
          --md-danger: var(--color-danger, #e11d48);
          --md-danger-subtle: var(--color-danger-subtle, #fff1f2);
          --md-danger-border: var(--color-danger-border, #fecdd3);
          --md-warning: var(--color-warning, #d97706);
          --md-warning-subtle: var(--color-warning-subtle, #fffbeb);
          --md-warning-border: var(--color-warning-border, #fde68a);

          font-family: var(--font-body, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          color: var(--md-text);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        /* Dark Theme Support */
        [data-theme='dark'] .md-wrapper,
        .dark .md-wrapper {
          --md-primary: var(--color-primary, #14b8a6);
          --md-primary-subtle: var(--color-primary-subtle, rgba(20, 184, 166, 0.12));
          --md-primary-border: var(--color-primary-border, rgba(20, 184, 166, 0.35));
          --md-accent: var(--color-accent, #818cf8);
          --md-surface: var(--color-surface, #151d2f);
          --md-surface-subtle: var(--color-surface-subtle, #0f172a);
          --md-border: var(--color-border, #222f47);
          --md-border-hover: var(--color-border-hover, #334466);
          --md-text: var(--color-text-primary, #f8fafc);
          --md-text-muted: var(--color-text-muted, #94a3b8);
          --md-danger: var(--color-danger, #fb7185);
          --md-danger-subtle: var(--color-danger-subtle, rgba(251, 113, 133, 0.12));
          --md-danger-border: var(--color-danger-border, rgba(251, 113, 133, 0.3));
          --md-warning: var(--color-warning, #fbbf24);
          --md-warning-subtle: var(--color-warning-subtle, rgba(251, 191, 36, 0.12));
          --md-warning-border: var(--color-warning-border, rgba(251, 191, 36, 0.3));
        }

        .md-header { margin-bottom: 0.25rem; }
        .md-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 2px 10px;
          border-radius: 9999px;
          background: var(--md-primary-subtle);
          color: var(--md-primary);
          border: 1px solid var(--md-primary-border);
          margin-bottom: 0.5rem;
        }

        .md-title {
          font-family: var(--font-heading, inherit);
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 700;
          margin: 0 0 0.35rem;
          letter-spacing: -0.02em;
        }

        .md-subtitle {
          font-size: 0.925rem;
          color: var(--md-text-muted);
          margin: 0;
          max-width: 680px;
          line-height: 1.5;
        }

        /* Card with Hover Lift */
        .md-card {
          background-color: var(--md-surface);
          border: 1px solid var(--md-border);
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
          overflow: hidden;
          transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 220ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .md-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06);
          border-color: var(--md-border-hover);
        }

        .md-card-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--md-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .md-card-title {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 2px 0;
        }

        .md-card-desc {
          font-size: 0.775rem;
          color: var(--md-text-muted);
          margin: 0;
        }

        .md-card-tag {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 9999px;
          background: var(--md-surface-subtle);
          border: 1px solid var(--md-border);
          color: var(--md-text-muted);
        }

        .md-legend-strip {
          display: flex;
          gap: 1rem;
          font-size: 0.775rem;
          color: var(--md-text-muted);
        }

        .md-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .md-legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }
        .md-legend-dot.pos { background: var(--md-primary, #0f766e); }
        .md-legend-dot.neg { background: var(--md-danger, #e11d48); }

        .md-chart-wrap {
          margin: 0;
          padding: 1rem;
          width: 100%;
          height: 320px;
          box-sizing: border-box;
        }

        /* Callout Box */
        .md-callout-box {
          display: flex;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          border-radius: 14px;
          background-color: var(--md-warning-subtle);
          border: 1px solid var(--md-warning-border);
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
        }

        .md-callout-icon {
          color: var(--md-warning);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .md-callout-content h4 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 0.35rem 0;
          color: var(--md-text);
        }

        .md-callout-content p {
          font-size: 0.85rem;
          color: var(--md-text);
          margin: 0;
          line-height: 1.5;
        }

        /* Tables */
        .md-tables-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .md-table-container {
          overflow-x: auto;
          width: 100%;
        }

        .md-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          text-align: left;
        }

        .md-table th {
          background-color: var(--md-surface-subtle);
          color: var(--md-text-muted);
          font-weight: 600;
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid var(--md-border);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .md-table td {
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid var(--md-border);
          vertical-align: middle;
        }

        .md-table tbody tr:last-child td {
          border-bottom: none;
        }

        .md-table tbody tr:hover td {
          background-color: var(--md-surface-subtle);
        }

        .md-table-primary {
          font-weight: 600;
          color: var(--md-text);
        }

        .md-table-primary code {
          background: var(--md-surface-subtle);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid var(--md-border);
          font-family: monospace;
          font-size: 0.8rem;
        }

        .md-table-muted {
          color: var(--md-text-muted);
          font-size: 0.8rem;
        }

        .md-metric-badge {
          display: inline-block;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
          background: var(--md-primary-subtle);
          color: var(--md-primary);
          border: 1px solid var(--md-primary-border);
          font-size: 0.8rem;
        }

        .md-coef-val {
          font-size: 0.9rem;
          white-space: nowrap;
        }
        .md-coef-val.pos { color: var(--md-primary); }
        .md-coef-val.neg { color: var(--md-danger); }

        /* Tooltip */
        .md-tooltip {
          background-color: var(--md-surface);
          border: 1px solid var(--md-border);
          border-radius: 10px;
          padding: 0.5rem 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.15);
          font-size: 0.8rem;
          color: var(--md-text);
        }

        .md-tooltip-title {
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .md-tooltip-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .md-tooltip-type {
          font-size: 0.725rem;
          color: var(--md-text-muted);
          margin-top: 2px;
        }
      `}</style>
    </section>
  );
}

ModelDashboard.propTypes = {
  className: PropTypes.string,
};
