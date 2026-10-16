import React from 'react';
import PropTypes from 'prop-types';
import {
  Users,
  DollarSign,
  Cigarette,
  TrendingUp,
  AlertCircle,
  MapPin,
  Flame,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

/**
 * Default Kaggle Insurance dataset statistics (1,337 clean observations)
 */
const DEFAULT_DASHBOARD_DATA = {
  kpis: {
    records: 1337,
    avgCharge: 13279,
    smokersShare: 20.5,
    adjustedR2: 0.798,
  },
  smokerComparison: [
    { label: 'Non-Smoker', charge: 8441, count: 1063, color: 'var(--color-primary, #0f766e)' },
    { label: 'Smoker', charge: 32050, count: 274, color: 'var(--color-danger, #e11d48)' },
  ],
  regionComparison: [
    { region: 'Southeast', charge: 14735, count: 364 },
    { region: 'Northeast', charge: 13406, count: 324 },
    { region: 'Northwest', charge: 12451, count: 324 },
    { region: 'Southwest', charge: 12347, count: 325 },
  ],
  insight: 'Smokers pay ~3.8x more on average than non-smokers ($32,050 vs $8,441).',
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-US');

/**
 * Custom accessible tooltip component for charts.
 */
function CustomChartTooltip({ active, payload, label, unit = '' }) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="od-tooltip" role="tooltip">
        <div className="od-tooltip-title">{label || data.name}</div>
        <div className="od-tooltip-row">
          <span>Average Charge:</span>
          <strong>{currencyFormatter.format(data.value)} {unit}</strong>
        </div>
        {data.payload.count && (
          <div className="od-tooltip-sub">
            {numberFormatter.format(data.payload.count)} policyholders
          </div>
        )}
      </div>
    );
  }
  return null;
}

CustomChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
  unit: PropTypes.string,
};

/**
 * Self-contained Overview Dashboard component.
 *
 * @param {Object} props
 * @param {Object} [props.data] - Optional override dataset matching schema
 * @param {string} [props.className] - Optional custom class name
 */
export function OverviewDashboard({ data = DEFAULT_DASHBOARD_DATA, className = '' }) {
  const dataset = { ...DEFAULT_DASHBOARD_DATA, ...data };
  const { kpis, smokerComparison, regionComparison, insight } = dataset;

  return (
    <section className={`od-wrapper ${className}`.trim()} aria-labelledby="od-heading">
      <div className="od-header">
        <div>
          <span className="od-badge">Dataset Overview</span>
          <h2 id="od-heading" className="od-title">Medical Insurance Cost Overview</h2>
          <p className="od-subtitle">
            Exploratory baseline statistics from 1,337 patient records and trained linear regression metrics.
          </p>
        </div>
      </div>

      {/* 1. Four Responsive KPI Cards */}
      <div className="od-kpi-grid">
        {/* KPI 1: Records */}
        <article className="od-card od-kpi-card" tabIndex={0} aria-label={`Total records: ${numberFormatter.format(kpis.records)}`}>
          <div className="od-kpi-top">
            <span className="od-kpi-label">Records</span>
            <div className="od-kpi-icon-pill icon-primary">
              <Users size={18} aria-hidden="true" />
            </div>
          </div>
          <div className="od-kpi-value">{numberFormatter.format(kpis.records)}</div>
          <span className="od-kpi-footer">1 duplicate dropped</span>
        </article>

        {/* KPI 2: Average Charge */}
        <article className="od-card od-kpi-card" tabIndex={0} aria-label={`Average charge: ${currencyFormatter.format(kpis.avgCharge)}`}>
          <div className="od-kpi-top">
            <span className="od-kpi-label">Average Charge</span>
            <div className="od-kpi-icon-pill icon-info">
              <DollarSign size={18} aria-hidden="true" />
            </div>
          </div>
          <div className="od-kpi-value">{currencyFormatter.format(kpis.avgCharge)}</div>
          <span className="od-kpi-footer">Median: $9,386</span>
        </article>

        {/* KPI 3: Smokers Share */}
        <article className="od-card od-kpi-card" tabIndex={0} aria-label={`Smokers share: ${kpis.smokersShare}%`}>
          <div className="od-kpi-top">
            <span className="od-kpi-label">Smokers Share</span>
            <div className="od-kpi-icon-pill icon-danger">
              <Cigarette size={18} aria-hidden="true" />
            </div>
          </div>
          <div className="od-kpi-value">~{kpis.smokersShare}%</div>
          <span className="od-kpi-footer">274 / 1,337 patients</span>
        </article>

        {/* KPI 4: Model Adjusted R² */}
        <article className="od-card od-kpi-card" tabIndex={0} aria-label={`Model Adjusted R squared: ${kpis.adjustedR2}`}>
          <div className="od-kpi-top">
            <span className="od-kpi-label">Model Adjusted R²</span>
            <div className="od-kpi-icon-pill icon-success">
              <TrendingUp size={18} aria-hidden="true" />
            </div>
          </div>
          <div className="od-kpi-value">{kpis.adjustedR2}</div>
          <span className="od-kpi-footer">79.8% variance explained</span>
        </article>
      </div>

      {/* 2. Key Actuarial Insight Callout Line */}
      <aside className="od-insight-banner" role="note" aria-label="Key finding">
        <div className="od-insight-icon">
          <Flame size={20} aria-hidden="true" />
        </div>
        <div className="od-insight-text">
          <strong>Key Actuarial Insight:</strong> {insight}
        </div>
      </aside>

      {/* 3. Two Charts Side-by-Side (Smoker vs Non-smoker & Regional charges) */}
      <div className="od-charts-grid">
        {/* Chart 1: Smoker vs Non-Smoker Charges */}
        <article className="od-card od-chart-card">
          <div className="od-chart-header">
            <div>
              <h3 className="od-chart-title">Average Charge: Smoker vs. Non-Smoker</h3>
              <p className="od-chart-sub">
                Tobacco status is the single highest pricing multiplier in the Kaggle dataset.
              </p>
            </div>
            <span className="od-pill-danger">+280% Surge</span>
          </div>

          <figure className="od-chart-wrap" aria-label="Bar chart showing smoker versus non-smoker average charges">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={smokerComparison} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--od-border, #e2e8f0)" vertical={false} />
                <XAxis dataKey="label" stroke="var(--od-text-muted, #64748b)" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="var(--od-text-muted, #64748b)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip content={<CustomChartTooltip />} cursor={{ fill: 'var(--od-surface-subtle, rgba(0,0,0,0.03))' }} />
                <Bar dataKey="charge" radius={[6, 6, 0, 0]}>
                  {smokerComparison.map((entry, index) => (
                    <Cell
                      key={`smoker-bar-${index}`}
                      fill={entry.label.includes('Non') ? 'var(--od-primary, #0f766e)' : 'var(--od-danger, #e11d48)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </figure>
        </article>

        {/* Chart 2: Regional Charge Variation */}
        <article className="od-card od-chart-card">
          <div className="od-chart-header">
            <div>
              <h3 className="od-chart-title">Average Charge by US Region</h3>
              <p className="od-chart-sub">
                Regional hospital cost disparities show Southeast leading at $14,735.
              </p>
            </div>
            <span className="od-pill-neutral">
              <MapPin size={12} aria-hidden="true" />
              <span>4 Regions</span>
            </span>
          </div>

          <figure className="od-chart-wrap" aria-label="Bar chart showing average medical charges by US region">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={regionComparison} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--od-border, #e2e8f0)" vertical={false} />
                <XAxis dataKey="region" stroke="var(--od-text-muted, #64748b)" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="var(--od-text-muted, #64748b)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip content={<CustomChartTooltip />} cursor={{ fill: 'var(--od-surface-subtle, rgba(0,0,0,0.03))' }} />
                <Bar dataKey="charge" fill="var(--od-accent, #4f46e5)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </figure>
        </article>
      </div>

      {/* Embedded Component Scoped CSS with CSS Variables for Zero-Dependency Isolation */}
      <style>{`
        /* Self-contained CSS tokens supporting Light & Dark themes */
        .od-wrapper {
          --od-primary: var(--color-primary, #0f766e);
          --od-primary-subtle: var(--color-primary-subtle, #f0fdfa);
          --od-primary-border: var(--color-primary-border, #99f6e4);

          --od-accent: var(--color-accent, #4f46e5);
          --od-accent-subtle: var(--color-accent-subtle, #eef2ff);

          --od-bg: var(--color-bg, #f8fafc);
          --od-surface: var(--color-surface, #ffffff);
          --od-surface-hover: var(--color-surface-hover, #fbfcfe);
          --od-surface-subtle: var(--color-surface-subtle, #f8fafc);

          --od-border: var(--color-border, #e2e8f0);
          --od-border-hover: var(--color-border-hover, #cbd5e1);

          --od-text: var(--color-text-primary, #0f172a);
          --od-text-secondary: var(--color-text-secondary, #334155);
          --od-text-muted: var(--color-text-muted, #64748b);

          --od-success: var(--color-success, #059669);
          --od-success-subtle: var(--color-success-subtle, #ecfdf5);

          --od-danger: var(--color-danger, #e11d48);
          --od-danger-subtle: var(--color-danger-subtle, #fff1f2);

          --od-info: var(--color-info, #0284c7);
          --od-info-subtle: var(--color-info-subtle, #f0f9ff);

          --od-shadow-sm: var(--shadow-sm, 0 1px 3px rgba(15, 23, 42, 0.08));
          --od-shadow-md: var(--shadow-md, 0 4px 6px -1px rgba(15, 23, 42, 0.08));
          --od-shadow-lg: var(--shadow-lg, 0 10px 15px -3px rgba(15, 23, 42, 0.08));

          --od-radius-md: var(--radius-md, 12px);
          --od-radius-lg: var(--radius-lg, 16px);
          --od-radius-full: var(--radius-full, 9999px);

          font-family: var(--font-body, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          color: var(--od-text);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        /* Dark Theme Support via data-theme or class */
        [data-theme='dark'] .od-wrapper,
        .dark .od-wrapper {
          --od-primary: var(--color-primary, #14b8a6);
          --od-primary-subtle: var(--color-primary-subtle, rgba(20, 184, 166, 0.12));
          --od-primary-border: var(--color-primary-border, rgba(20, 184, 166, 0.35));

          --od-accent: var(--color-accent, #818cf8);
          --od-accent-subtle: var(--color-accent-subtle, rgba(129, 140, 248, 0.12));

          --od-bg: var(--color-bg, #0b0f19);
          --od-surface: var(--color-surface, #151d2f);
          --od-surface-hover: var(--color-surface-hover, #1b263b);
          --od-surface-subtle: var(--color-surface-subtle, #0f172a);

          --od-border: var(--color-border, #222f47);
          --od-border-hover: var(--color-border-hover, #334466);

          --od-text: var(--color-text-primary, #f8fafc);
          --od-text-secondary: var(--color-text-secondary, #cbd5e1);
          --od-text-muted: var(--color-text-muted, #94a3b8);

          --od-success: var(--color-success, #34d399);
          --od-success-subtle: var(--color-success-subtle, rgba(52, 211, 153, 0.12));

          --od-danger: var(--color-danger, #fb7185);
          --od-danger-subtle: var(--color-danger-subtle, rgba(251, 113, 133, 0.12));

          --od-info: var(--color-info, #38bdf8);
          --od-info-subtle: var(--color-info-subtle, rgba(56, 189, 248, 0.12));
        }

        /* Header */
        .od-header {
          margin-bottom: 0.25rem;
        }

        .od-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 2px 10px;
          border-radius: var(--od-radius-full);
          background-color: var(--od-primary-subtle);
          color: var(--od-primary);
          border: 1px solid var(--od-primary-border);
          margin-bottom: 0.5rem;
        }

        .od-title {
          font-family: var(--font-heading, inherit);
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 700;
          color: var(--od-text);
          margin: 0 0 0.35rem 0;
          letter-spacing: -0.02em;
        }

        .od-subtitle {
          font-size: 0.925rem;
          color: var(--od-text-muted);
          margin: 0;
          max-width: 680px;
          line-height: 1.5;
        }

        /* Base Card Styling with Hover Lift */
        .od-card {
          background-color: var(--od-surface);
          border: 1px solid var(--od-border);
          border-radius: var(--od-radius-lg);
          box-shadow: var(--od-shadow-sm);
          transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 220ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .od-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--od-shadow-md);
          border-color: var(--od-border-hover);
        }

        /* Responsive Grid: 4 cols -> 2 cols -> 1 col */
        .od-kpi-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .od-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .od-kpi-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* KPI Card */
        .od-kpi-card {
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          outline: none;
        }

        .od-kpi-card:focus-visible {
          outline: 2px solid var(--od-primary);
          outline-offset: 2px;
        }

        .od-kpi-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .od-kpi-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--od-text-secondary);
        }

        .od-kpi-icon-pill {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--od-radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-primary { background-color: var(--od-primary-subtle); color: var(--od-primary); }
        .icon-info { background-color: var(--od-info-subtle); color: var(--od-info); }
        .icon-danger { background-color: var(--od-danger-subtle); color: var(--od-danger); }
        .icon-success { background-color: var(--od-success-subtle); color: var(--od-success); }

        .od-kpi-value {
          font-family: var(--font-heading, inherit);
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--od-text);
          line-height: 1.1;
        }

        .od-kpi-footer {
          font-size: 0.75rem;
          color: var(--od-text-muted);
        }

        /* Insight Callout Line */
        .od-insight-banner {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1.25rem;
          border-radius: var(--od-radius-md);
          background: linear-gradient(90deg, var(--od-danger-subtle), var(--od-surface));
          border: 1px solid var(--od-border);
          border-left: 4px solid var(--od-danger);
          box-shadow: var(--od-shadow-sm);
        }

        .od-insight-icon {
          color: var(--od-danger);
          flex-shrink: 0;
          display: flex;
        }

        .od-insight-text {
          font-size: 0.875rem;
          color: var(--od-text-secondary);
          line-height: 1.4;
        }

        .od-insight-text strong {
          color: var(--od-text);
        }

        /* Charts Grid */
        .od-charts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 1024px) {
          .od-charts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .od-chart-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .od-chart-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .od-chart-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--od-text);
          margin: 0 0 0.25rem 0;
        }

        .od-chart-sub {
          font-size: 0.775rem;
          color: var(--od-text-muted);
          margin: 0;
          line-height: 1.4;
        }

        .od-pill-danger {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: var(--od-radius-full);
          background-color: var(--od-danger-subtle);
          color: var(--od-danger);
          white-space: nowrap;
        }

        .od-pill-neutral {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: var(--od-radius-full);
          background-color: var(--od-surface-subtle);
          border: 1px solid var(--od-border);
          color: var(--od-text-muted);
          display: inline-flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .od-chart-wrap {
          margin: 0;
          width: 100%;
          height: 260px;
        }

        /* Tooltip */
        .od-tooltip {
          background-color: var(--od-surface);
          border: 1px solid var(--od-border);
          border-radius: var(--od-radius-md);
          padding: 0.5rem 0.75rem;
          box-shadow: var(--od-shadow-lg);
          font-size: 0.8rem;
          color: var(--od-text);
        }

        .od-tooltip-title {
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .od-tooltip-row {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .od-tooltip-sub {
          font-size: 0.725rem;
          color: var(--od-text-muted);
          margin-top: 2px;
        }
      `}</style>
    </section>
  );
}

OverviewDashboard.propTypes = {
  data: PropTypes.shape({
    kpis: PropTypes.shape({
      records: PropTypes.number,
      avgCharge: PropTypes.number,
      smokersShare: PropTypes.number,
      adjustedR2: PropTypes.number,
    }),
    smokerComparison: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        charge: PropTypes.number.isRequired,
        count: PropTypes.number,
      })
    ),
    regionComparison: PropTypes.arrayOf(
      PropTypes.shape({
        region: PropTypes.string.isRequired,
        charge: PropTypes.number.isRequired,
        count: PropTypes.number,
      })
    ),
    insight: PropTypes.string,
  }),
  className: PropTypes.string,
};
