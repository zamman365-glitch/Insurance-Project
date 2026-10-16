import React from 'react';
import PropTypes from 'prop-types';

/**
 * Container wrapper for Recharts visual data components with header and descriptive metadata.
 */
export function ChartCard({
  title,
  subtitle,
  children,
  action,
  className = '',
  height = 320,
}) {
  return (
    <div className={`chart-card ${className}`.trim()}>
      <div className="chart-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <div>
          <h3 className="chart-title">{title}</h3>
          {subtitle && <p className="chart-desc">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div className="chart-container-wrap" style={{ height: `${height}px` }}>
        {children}
      </div>
    </div>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  action: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.number,
};
