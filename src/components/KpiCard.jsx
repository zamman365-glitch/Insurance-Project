import React from 'react';
import PropTypes from 'prop-types';

/**
 * Metric KPI card with custom icon, formatted value, title, and context badge.
 */
export function KpiCard({
  icon: Icon,
  value,
  label,
  subtext,
  badge,
  badgeVariant = 'subtle',
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-top-row">
        <div className="kpi-icon-pill">
          {Icon && <Icon size={22} />}
        </div>
        {badge && (
          <span
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor:
                badgeVariant === 'success'
                  ? 'var(--color-success-subtle)'
                  : badgeVariant === 'warning'
                  ? 'var(--color-warning-subtle)'
                  : 'var(--color-primary-subtle)',
              color:
                badgeVariant === 'success'
                  ? 'var(--color-success)'
                  : badgeVariant === 'warning'
                  ? 'var(--color-warning)'
                  : 'var(--color-primary)',
              border: '1px solid currentColor',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div>
        <div className="kpi-value">{value}</div>
        <div className="kpi-label">{label}</div>
        {subtext && <div className="kpi-subtext">{subtext}</div>}
      </div>
    </div>
  );
}

KpiCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  subtext: PropTypes.string,
  badge: PropTypes.string,
  badgeVariant: PropTypes.oneOf(['subtle', 'success', 'warning', 'info']),
};
