import React from 'react';
import PropTypes from 'prop-types';
import {
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Compass,
  TrendingUp,
  BarChart2,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

/**
 * Verified EDA dataset extracted from Kaggle's 1,337 insurance records.
 */
const DEFAULT_EXPLORE_DATA = {
  // 1. Stratified sample points for Age vs Charges scatter
  scatterPoints: [
    { age: 18, charges: 1121.87, smoker: 'no', bmi: 23.2 },
    { age: 18, charges: 1610.61, smoker: 'no', bmi: 31.7 },
    { age: 19, charges: 16884.92, smoker: 'yes', bmi: 27.9 },
    { age: 19, charges: 34828.65, smoker: 'yes', bmi: 39.6 },
    { age: 20, charges: 1984.45, smoker: 'no', bmi: 22.4 },
    { age: 22, charges: 2150.47, smoker: 'no', bmi: 26.8 },
    { age: 24, charges: 3046.06, smoker: 'no', bmi: 29.8 },
    { age: 25, charges: 19933.46, smoker: 'yes', bmi: 26.2 },
    { age: 27, charges: 3579.83, smoker: 'no', bmi: 21.4 },
    { age: 28, charges: 3877.30, smoker: 'no', bmi: 24.3 },
    { age: 30, charges: 4149.74, smoker: 'no', bmi: 25.1 },
    { age: 31, charges: 3857.76, smoker: 'no', bmi: 20.5 },
    { age: 33, charges: 37079.37, smoker: 'yes', bmi: 33.5 },
    { age: 34, charges: 37742.58, smoker: 'yes', bmi: 38.3 },
    { age: 36, charges: 5469.00, smoker: 'no', bmi: 26.8 },
    { age: 38, charges: 5383.54, smoker: 'no', bmi: 28.3 },
    { age: 40, charges: 6389.38, smoker: 'no', bmi: 29.9 },
    { age: 42, charges: 7045.50, smoker: 'no', bmi: 26.1 },
    { age: 43, charges: 42435.61, smoker: 'yes', bmi: 36.0 },
    { age: 45, charges: 8516.83, smoker: 'no', bmi: 25.1 },
    { age: 47, charges: 8556.91, smoker: 'no', bmi: 29.8 },
    { age: 49, charges: 9140.95, smoker: 'no', bmi: 30.8 },
    { age: 50, charges: 42856.86, smoker: 'yes', bmi: 34.8 },
    { age: 52, charges: 42112.24, smoker: 'yes', bmi: 38.4 },
    { age: 54, charges: 10928.85, smoker: 'no', bmi: 27.5 },
    { age: 56, charges: 11073.18, smoker: 'no', bmi: 28.3 },
    { age: 58, charges: 11365.95, smoker: 'no', bmi: 25.2 },
    { age: 60, charges: 13204.28, smoker: 'no', bmi: 25.8 },
    { age: 61, charges: 46599.11, smoker: 'yes', bmi: 36.3 },
    { age: 63, charges: 13887.97, smoker: 'no', bmi: 26.2 },
    { age: 64, charges: 14418.28, smoker: 'no', bmi: 24.7 },
    { age: 64, charges: 49577.66, smoker: 'yes', bmi: 36.9 },
  ],

  // 2. Average charge by age cohort (smoker vs non-smoker)
  ageGroupTrends: [
    { ageGroup: '18-25', nonSmoker: 4014, smoker: 27934, overall: 9111, count: 305 },
    { ageGroup: '26-35', nonSmoker: 5797, smoker: 28282, overall: 10495, count: 268 },
    { ageGroup: '36-45', nonSmoker: 7823, smoker: 32365, overall: 13493, count: 264 },
    { ageGroup: '46-55', nonSmoker: 11693, smoker: 35145, overall: 15987, count: 284 },
    { ageGroup: '56-64', nonSmoker: 14088, smoker: 39513, overall: 18796, count: 216 },
  ],

  // 3. 10 Bins Histogram of charges
  chargesHistogram: [
    { range: '$1k-7k', count: 535, smokers: 0, nonSmokers: 535 },
    { range: '$7k-14k', count: 398, smokers: 1, nonSmokers: 397 },
    { range: '$14k-20k', count: 129, smokers: 59, nonSmokers: 70 },
    { range: '$20k-26k', count: 86, smokers: 51, nonSmokers: 35 },
    { range: '$26k-32k', count: 35, smokers: 13, nonSmokers: 22 },
    { range: '$32k-39k', count: 59, smokers: 55, nonSmokers: 4 },
    { range: '$39k-45k', count: 57, smokers: 57, nonSmokers: 0 },
    { range: '$45k-51k', count: 32, smokers: 32, nonSmokers: 0 },
    { range: '$51k-58k', count: 2, smokers: 2, nonSmokers: 0 },
    { range: '$58k-64k', count: 4, smokers: 4, nonSmokers: 0 },
  ],

  // 4. Average charge by BMI Category
  bmiCategories: [
    { category: 'Underweight (<18.5)', avgCharge: 8852, medianCharge: 6759, count: 20, pct: 1.5, color: 'var(--ed-info, #0284c7)' },
    { category: 'Normal (18.5-24.9)', avgCharge: 10409, medianCharge: 8604, count: 225, pct: 16.8, color: 'var(--ed-success, #059669)' },
    { category: 'Overweight (25-29.9)', avgCharge: 10988, medianCharge: 8659, count: 386, pct: 28.9, color: 'var(--ed-warning, #d97706)' },
    { category: 'Obese (30+)', avgCharge: 15572, medianCharge: 10004, count: 706, pct: 52.8, color: 'var(--ed-danger, #e11d48)' },
  ],
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-US');

/**
 * Custom accessible tooltip for Recharts.
 */
function ChartTooltip({ active, payload, label, unit = '' }) {
  if (active && payload && payload.length) {
    return (
      <div className="ed-tooltip" role="tooltip">
        {label && <div className="ed-tooltip-title">{label}</div>}
        {payload.map((item, idx) => (
          <div key={idx} className="ed-tooltip-row">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: item.color || item.fill,
                }}
              />
              <span>{item.name}:</span>
            </span>
            <strong>
              {typeof item.value === 'number' && item.value > 100
                ? currencyFormatter.format(item.value)
                : `${item.value} ${unit}`}
            </strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

ChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
};

/**
 * ExploreDashboard Component
 * Renders a 2-column responsive EDA dashboard featuring 4 clinical actuarial charts.
 */
export function ExploreDashboard({ data = DEFAULT_EXPLORE_DATA, className = '' }) {
  const dataset = { ...DEFAULT_EXPLORE_DATA, ...data };
  const { scatterPoints, ageGroupTrends, chargesHistogram, bmiCategories } = dataset;

  return (
    <section className={`ed-wrapper ${className}`.trim()} aria-labelledby="ed-heading">
      <div className="ed-header">
        <span className="ed-badge">
          <Compass size={14} aria-hidden="true" />
          <span>Exploratory Data Analysis</span>
        </span>
        <h2 id="ed-heading" className="ed-title">Insurance Claims Data Exploration</h2>
        <p className="ed-subtitle">
          Visualizing non-linear dynamics, smoking risk multipliers, age trajectories, and BMI tier differentials.
        </p>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="ed-grid-2col">
        {/* Chart 1: Scatter: Age vs Charges, Coloured by Smoker */}
        <article
          className="ed-card"
          tabIndex={0}
          role="region"
          aria-labelledby="scatter-title"
        >
          <div className="ed-card-header">
            <div>
              <h3 id="scatter-title" className="ed-card-title">Age vs. Charges (by Smoking Status)</h3>
              <p className="ed-card-desc">
                Smokers occupy a distinct high-cost band ($30k–$45k+) regardless of age.
              </p>
            </div>
          </div>

          <figure
            className="ed-chart-wrap"
            aria-label="Scatter plot showing patient age versus annual insurance charges colored by smoking status"
          >
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart margin={{ top: 15, right: 25, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--ed-border, #e2e8f0)" />
                <XAxis
                  type="number"
                  dataKey="age"
                  name="Age"
                  unit=" yrs"
                  domain={[18, 65]}
                  stroke="var(--ed-text-muted, #64748b)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  type="number"
                  dataKey="charges"
                  name="Charges"
                  stroke="var(--ed-text-muted, #64748b)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={
                    <ChartTooltip
                      unit="patients"
                    />
                  }
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '6px' }}
                />
                <Scatter
                  name="Non-Smoker"
                  data={scatterPoints.filter((p) => p.smoker === 'no')}
                  fill="var(--ed-primary, #0f766e)"
                  opacity={0.75}
                />
                <Scatter
                  name="Smoker"
                  data={scatterPoints.filter((p) => p.smoker === 'yes')}
                  fill="var(--ed-danger, #e11d48)"
                  opacity={0.85}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </figure>
        </article>

        {/* Chart 2: Line: Average Charge by Age Group (Smoker vs Non-Smoker) */}
        <article
          className="ed-card"
          tabIndex={0}
          role="region"
          aria-labelledby="line-title"
        >
          <div className="ed-card-header">
            <div>
              <h3 id="line-title" className="ed-card-title">Average Charge by Age Cohort</h3>
              <p className="ed-card-desc">
                Comparing progression across 5 life-stage brackets (18-25 through 56-64).
              </p>
            </div>
          </div>

          <figure
            className="ed-chart-wrap"
            aria-label="Line chart comparing average insurance charges by five age groups between smokers and non-smokers"
          >
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={ageGroupTrends} margin={{ top: 15, right: 25, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--ed-border, #e2e8f0)" vertical={false} />
                <XAxis
                  dataKey="ageGroup"
                  stroke="var(--ed-text-muted, #64748b)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--ed-text-muted, #64748b)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '6px' }}
                />
                <Line
                  type="monotone"
                  dataKey="nonSmoker"
                  name="Non-Smoker Avg"
                  stroke="var(--ed-primary, #0f766e)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: 'var(--ed-primary, #0f766e)' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="smoker"
                  name="Smoker Avg"
                  stroke="var(--ed-danger, #e11d48)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: 'var(--ed-danger, #e11d48)' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </figure>
        </article>

        {/* Chart 3: Histogram: Charges Distribution (10 Bins) */}
        <article
          className="ed-card"
          tabIndex={0}
          role="region"
          aria-labelledby="hist-title"
        >
          <div className="ed-card-header">
            <div>
              <h3 id="hist-title" className="ed-card-title">Charges Distribution (10 Bins)</h3>
              <p className="ed-card-desc">
                Severe positive skew: over 70% of non-smokers concentrate below $14,000.
              </p>
            </div>
          </div>

          <figure
            className="ed-chart-wrap"
            aria-label="Histogram chart showing medical charges distributed across 10 discrete intervals stacked by smoking status"
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chargesHistogram} margin={{ top: 15, right: 25, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--ed-border, #e2e8f0)" vertical={false} />
                <XAxis
                  dataKey="range"
                  stroke="var(--ed-text-muted, #64748b)"
                  fontSize={11}
                  tickLine={false}
                  angle={-25}
                  textAnchor="end"
                  height={45}
                />
                <YAxis
                  stroke="var(--ed-text-muted, #64748b)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip unit="patients" />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '6px' }}
                />
                <Bar
                  dataKey="nonSmokers"
                  name="Non-Smokers"
                  stackId="stack"
                  fill="var(--ed-primary, #0f766e)"
                />
                <Bar
                  dataKey="smokers"
                  name="Smokers"
                  stackId="stack"
                  fill="var(--ed-danger, #e11d48)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </figure>
        </article>

        {/* Chart 4: Bar: Average Charge by BMI Category */}
        <article
          className="ed-card"
          tabIndex={0}
          role="region"
          aria-labelledby="bmi-title"
        >
          <div className="ed-card-header">
            <div>
              <h3 id="bmi-title" className="ed-card-title">Average Charge by BMI Category</h3>
              <p className="ed-card-desc">
                Clinical classification highlights the steep price jump for Obese individuals (52.8% of dataset).
              </p>
            </div>
          </div>

          <figure
            className="ed-chart-wrap"
            aria-label="Bar chart showing average insurance charge across four clinical BMI classifications"
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={bmiCategories} margin={{ top: 15, right: 25, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--ed-border, #e2e8f0)" vertical={false} />
                <XAxis
                  dataKey="category"
                  stroke="var(--ed-text-muted, #64748b)"
                  fontSize={11}
                  tickLine={false}
                  angle={-15}
                  textAnchor="end"
                  height={45}
                />
                <YAxis
                  stroke="var(--ed-text-muted, #64748b)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '6px' }}
                />
                <Bar dataKey="avgCharge" name="Average Premium" radius={[6, 6, 0, 0]}>
                  {bmiCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <Bar dataKey="medianCharge" name="Median Premium" fill="var(--ed-accent, #4f46e5)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </figure>
        </article>
      </div>

      {/* Scoped CSS with CSS Variables and Light/Dark Support */}
      <style>{`
        .ed-wrapper {
          --ed-primary: var(--color-primary, #0f766e);
          --ed-primary-subtle: var(--color-primary-subtle, #f0fdfa);
          --ed-primary-border: var(--color-primary-border, #99f6e4);
          --ed-accent: var(--color-accent, #4f46e5);
          --ed-surface: var(--color-surface, #ffffff);
          --ed-surface-subtle: var(--color-surface-subtle, #f8fafc);
          --ed-border: var(--color-border, #e2e8f0);
          --ed-border-hover: var(--color-border-hover, #cbd5e1);
          --ed-text: var(--color-text-primary, #0f172a);
          --ed-text-muted: var(--color-text-muted, #64748b);
          --ed-success: var(--color-success, #059669);
          --ed-warning: var(--color-warning, #d97706);
          --ed-danger: var(--color-danger, #e11d48);
          --ed-info: var(--color-info, #0284c7);

          font-family: var(--font-body, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          color: var(--ed-text);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        /* Dark Theme Support */
        [data-theme='dark'] .ed-wrapper,
        .dark .ed-wrapper {
          --ed-primary: var(--color-primary, #14b8a6);
          --ed-primary-subtle: var(--color-primary-subtle, rgba(20, 184, 166, 0.12));
          --ed-primary-border: var(--color-primary-border, rgba(20, 184, 166, 0.35));
          --ed-accent: var(--color-accent, #818cf8);
          --ed-surface: var(--color-surface, #151d2f);
          --ed-surface-subtle: var(--color-surface-subtle, #0f172a);
          --ed-border: var(--color-border, #222f47);
          --ed-border-hover: var(--color-border-hover, #334466);
          --ed-text: var(--color-text-primary, #f8fafc);
          --ed-text-muted: var(--color-text-muted, #94a3b8);
          --ed-success: #34d399;
          --ed-warning: #fbbf24;
          --ed-danger: #fb7185;
          --ed-info: #38bdf8;
        }

        .ed-header { margin-bottom: 0.25rem; }
        .ed-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 2px 10px;
          border-radius: 9999px;
          background: var(--ed-primary-subtle);
          color: var(--ed-primary);
          border: 1px solid var(--ed-primary-border);
          margin-bottom: 0.5rem;
        }

        .ed-title {
          font-family: var(--font-heading, inherit);
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 700;
          margin: 0 0 0.35rem;
          letter-spacing: -0.02em;
        }

        .ed-subtitle {
          font-size: 0.925rem;
          color: var(--ed-text-muted);
          margin: 0;
          max-width: 680px;
          line-height: 1.5;
        }

        /* 2-Column Responsive Grid */
        .ed-grid-2col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .ed-grid-2col {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Card with Hover Lift */
        .ed-card {
          background-color: var(--ed-surface);
          border: 1px solid var(--ed-border);
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          outline: none;
          transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 220ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ed-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06);
          border-color: var(--ed-border-hover);
        }

        .ed-card:focus-visible {
          outline: 2px solid var(--ed-primary);
          outline-offset: 2px;
        }

        .ed-card-header {
          margin-bottom: 1rem;
        }

        .ed-card-title {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          color: var(--ed-text);
        }

        .ed-card-desc {
          font-size: 0.775rem;
          color: var(--ed-text-muted);
          margin: 0;
          line-height: 1.4;
        }

        .ed-chart-wrap {
          margin: 0;
          width: 100%;
          height: 280px;
        }

        /* Tooltip */
        .ed-tooltip {
          background-color: var(--ed-surface);
          border: 1px solid var(--ed-border);
          border-radius: 10px;
          padding: 0.5rem 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.15);
          font-size: 0.8rem;
          color: var(--ed-text);
        }

        .ed-tooltip-title {
          font-weight: 700;
          margin-bottom: 0.35rem;
          border-bottom: 1px solid var(--ed-border);
          padding-bottom: 2px;
        }

        .ed-tooltip-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 1px 0;
        }
      `}</style>
    </section>
  );
}

ExploreDashboard.propTypes = {
  data: PropTypes.shape({
    scatterPoints: PropTypes.arrayOf(
      PropTypes.shape({
        age: PropTypes.number.isRequired,
        charges: PropTypes.number.isRequired,
        smoker: PropTypes.string.isRequired,
        bmi: PropTypes.number,
      })
    ),
    ageGroupTrends: PropTypes.arrayOf(
      PropTypes.shape({
        ageGroup: PropTypes.string.isRequired,
        nonSmoker: PropTypes.number.isRequired,
        smoker: PropTypes.number.isRequired,
        overall: PropTypes.number,
        count: PropTypes.number,
      })
    ),
    chargesHistogram: PropTypes.arrayOf(
      PropTypes.shape({
        range: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        smokers: PropTypes.number,
        nonSmokers: PropTypes.number,
      })
    ),
    bmiCategories: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        avgCharge: PropTypes.number.isRequired,
        medianCharge: PropTypes.number,
        count: PropTypes.number,
        color: PropTypes.string,
      })
    ),
  }),
  className: PropTypes.string,
};
