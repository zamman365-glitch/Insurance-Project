import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Users,
  DollarSign,
  Cigarette,
  LineChart as LineChartIcon,
  BarChart2,
  PieChart as PieIcon,
  ScatterChart as ScatterIcon,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
} from 'recharts';
import { KpiCard } from './KpiCard';
import { ChartCard } from './ChartCard';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';

const REGION_COLORS = ['#0f766e', '#0284c7', '#6366f1', '#e11d48'];

/**
 * Custom accessible tooltip for Recharts.
 */
function CustomChartTooltip({ active, payload, label, formatter }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip" role="tooltip">
        {label && <div className="tooltip-title">{label}</div>}
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="tooltip-row">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: entry.color || entry.fill,
                }}
              />
              <span>{entry.name}:</span>
            </span>
            <strong>
              {formatter ? formatter(entry.value, entry.name) : entry.value}
            </strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

CustomChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formatter: PropTypes.func,
};

/**
 * Insights Dashboard Section displaying dataset KPIs and 5 Recharts visualizations.
 */
export function InsightsSection({ stats }) {
  const [scatterView, setScatterView] = useState('scatter'); // 'scatter' | 'trends'

  const {
    kpis,
    correlations,
    smokerComparison,
    regions,
    histogram,
    scatterData,
    ageTrends,
  } = stats;

  return (
    <section id="insights" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }} aria-labelledby="insights-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Exploratory Data Analysis</span>
          </div>
          <h2 id="insights-heading" className="section-title">
            Healthcare Dataset Insights & Patterns
          </h2>
          <p className="section-description">
            Analysis of the Kaggle Medical Insurance dataset (1,337 clean observations)
            powering the regression engine, highlighting actuarial risk drivers.
          </p>
        </div>

        {/* 1. KPI Cards */}
        <div className="kpi-grid">
          <KpiCard
            icon={Users}
            value={formatNumber(kpis.totalRecords)}
            label="Dataset Records"
            subtext="Cleaned observations (1 duplicate dropped)"
            badge="100% Complete"
            badgeVariant="subtle"
          />
          <KpiCard
            icon={DollarSign}
            value={formatCurrency(kpis.averageCharge)}
            label="Mean Annual Charge"
            subtext="Median: $9,386 (Right-skewed claims)"
            badge="Population Mean"
            badgeVariant="info"
          />
          <KpiCard
            icon={Cigarette}
            value={formatPercentage(kpis.smokersShare)}
            label="Tobacco Usage Rate"
            subtext={`${kpis.smokersCount} smokers / ${kpis.nonSmokersCount} non-smokers`}
            badge="Major Risk"
            badgeVariant="warning"
          />
          <KpiCard
            icon={LineChartIcon}
            value={kpis.adjustedR2}
            label="Model Adjusted R²"
            subtext="79.8% of variance explained"
            badge="Strong Fit"
            badgeVariant="success"
          />
        </div>

        {/* 2. Charts Grid */}
        <div className="charts-grid">
          {/* Chart 1: Smoker vs Non-Smoker Average Charges (Bar Chart) */}
          <ChartCard
            title="Smoker vs. Non-Smoker Claims Impact"
            subtitle="Tobacco usage quadruples expected annual claims from $8,441 to $32,050."
            action={
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: 'var(--color-danger)',
                  padding: '2px 8px',
                  backgroundColor: 'var(--color-danger-subtle)',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                +280% Cost Surge
              </span>
            }
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={smokerComparison}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="category" stroke="var(--color-text-muted)" fontSize={12} />
                <YAxis
                  stroke="var(--color-text-muted)"
                  fontSize={12}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  content={
                    <CustomChartTooltip
                      formatter={(val, name) =>
                        name.toLowerCase().includes('charge') ? formatCurrency(val) : val
                      }
                    />
                  }
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="avgCharge" name="Average Charge" radius={[6, 6, 0, 0]}>
                  {smokerComparison.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.category === 'Smoker' ? '#e11d48' : '#0f766e'}
                    />
                  ))}
                </Bar>
                <Bar dataKey="medianCharge" name="Median Charge" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 2: Feature Correlation with Charges (Horizontal Bar) */}
          <ChartCard
            title="Feature Correlation with Claims (Pearson r)"
            subtitle="is_smoker (0.79) and age (0.30) dominate insurance charge variance."
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={correlations}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[-0.1, 0.9]}
                  stroke="var(--color-text-muted)"
                  fontSize={12}
                />
                <YAxis
                  dataKey="key"
                  type="category"
                  stroke="var(--color-text-muted)"
                  fontSize={11}
                  width={110}
                />
                <Tooltip
                  content={
                    <CustomChartTooltip
                      formatter={(val) => `${val > 0 ? '+' : ''}${val}`}
                    />
                  }
                />
                <Bar dataKey="correlation" name="Correlation (r)" radius={[0, 4, 4, 0]}>
                  {correlations.map((entry, index) => (
                    <Cell
                      key={`corr-${index}`}
                      fill={
                        entry.correlation > 0.5
                          ? '#e11d48'
                          : entry.correlation > 0.2
                          ? '#0f766e'
                          : entry.correlation >= 0
                          ? '#0284c7'
                          : '#64748b'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 3: Age vs Charges Colored by Smoker (Scatter or Trend) */}
          <ChartCard
            title="Age vs. Annual Charges by Tobacco Usage"
            subtitle="Smokers occupy an upper band ($30k–$45k+), while non-smokers rise steadily with age ($2k–$15k)."
            action={
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => setScatterView('scatter')}
                  className={`btn btn-sm ${scatterView === 'scatter' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '2px 8px', fontSize: '11px' }}
                >
                  Scatter Sample
                </button>
                <button
                  type="button"
                  onClick={() => setScatterView('trends')}
                  className={`btn btn-sm ${scatterView === 'trends' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '2px 8px', fontSize: '11px' }}
                >
                  Age Cohorts
                </button>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height="100%">
              {scatterView === 'scatter' ? (
                <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    type="number"
                    dataKey="age"
                    name="Age"
                    unit=" yrs"
                    domain={[18, 65]}
                    stroke="var(--color-text-muted)"
                    fontSize={12}
                  />
                  <YAxis
                    type="number"
                    dataKey="charges"
                    name="Charges"
                    stroke="var(--color-text-muted)"
                    fontSize={12}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={
                      <CustomChartTooltip
                        formatter={(val, name) =>
                          name === 'Charges' ? formatCurrency(val) : `${val} yrs`
                        }
                      />
                    }
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Scatter
                    name="Non-Smoker"
                    data={scatterData.filter((d) => d.smoker === 'no')}
                    fill="#0f766e"
                    opacity={0.75}
                  />
                  <Scatter
                    name="Smoker"
                    data={scatterData.filter((d) => d.smoker === 'yes')}
                    fill="#e11d48"
                    opacity={0.85}
                  />
                </ScatterChart>
              ) : (
                <BarChart data={ageTrends} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="ageGroup" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis
                    stroke="var(--color-text-muted)"
                    fontSize={12}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <Tooltip
                    content={
                      <CustomChartTooltip
                        formatter={(val) => formatCurrency(val)}
                      />
                    }
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="nonSmokerAvg" name="Non-Smoker Avg" fill="#0f766e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="smokerAvg" name="Smoker Avg" fill="#e11d48" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 4: Charges Distribution Histogram */}
          <ChartCard
            title="Distribution of Charges (Histogram)"
            subtitle="Right-skewed claims: 65% of all policyholders fall under $15,000."
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={histogram}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="range" stroke="var(--color-text-muted)" fontSize={11} interval={0} angle={-25} textAnchor="end" height={45} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <Tooltip
                  content={
                    <CustomChartTooltip
                      formatter={(val, name) => `${val} patients`}
                    />
                  }
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="nonSmokers" name="Non-Smokers" stackId="a" fill="#0f766e" />
                <Bar dataKey="smokers" name="Smokers" stackId="a" fill="#e11d48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 5: US Geographic Region Distribution (Donut Chart) */}
          <ChartCard
            title="Geographic Population Breakdown"
            subtitle="Balanced distribution across four US regions (Southeast leads with 27.2%)."
            className="charts-grid-full"
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)', height: '100%', alignItems: 'center' }}>
              <div style={{ height: '240px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regions}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="count"
                      nameKey="name"
                    >
                      {regions.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={REGION_COLORS[index % REGION_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={
                        <CustomChartTooltip
                          formatter={(val, name) => `${val} patients (${((val / 1337) * 100).toFixed(1)}%)`}
                        />
                      }
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Regional Stats Mini-Table */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {regions.map((reg, idx) => (
                  <div key={reg.region} style={{ textAlign: 'center', padding: 'var(--space-2)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: REGION_COLORS[idx] }}>
                      {reg.name}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {formatCurrency(reg.avgCharge)}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {reg.count} records ({reg.percentage}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .charts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .charts-grid-full {
            grid-column: span 2;
          }
        }
      `}</style>
    </section>
  );
}

InsightsSection.propTypes = {
  stats: PropTypes.shape({
    kpis: PropTypes.object.isRequired,
    correlations: PropTypes.array.isRequired,
    smokerComparison: PropTypes.array.isRequired,
    regions: PropTypes.array.isRequired,
    histogram: PropTypes.array.isRequired,
    scatterData: PropTypes.array.isRequired,
    ageTrends: PropTypes.array.isRequired,
  }).isRequired,
};
