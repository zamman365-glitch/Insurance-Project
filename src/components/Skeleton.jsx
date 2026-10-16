import React from 'react';
import PropTypes from 'prop-types';

/**
 * Accessible Skeleton placeholder loader matching the ResultCard dimensions.
 */
export function Skeleton({ className = '' }) {
  return (
    <div
      className={`card ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-label="Calculating health insurance prediction..."
      style={{ overflow: 'hidden' }}
    >
      <div className="skeleton" style={{ height: '6px', width: '100%' }} />

      <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <div
          className="skeleton"
          style={{ width: '120px', height: '14px', margin: '0 auto var(--space-4) auto' }}
        />
        <div
          className="skeleton"
          style={{ width: '220px', height: '52px', margin: '0 auto var(--space-3) auto', borderRadius: 'var(--radius-lg)' }}
        />
        <div
          className="skeleton"
          style={{ width: '160px', height: '18px', margin: '0 auto var(--space-4) auto' }}
        />
        <div
          className="skeleton"
          style={{ width: '90px', height: '24px', margin: '0 auto', borderRadius: 'var(--radius-full)' }}
        />
      </div>

      <div style={{ padding: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
        <div
          className="skeleton"
          style={{ width: '140px', height: '16px', marginBottom: 'var(--space-4)' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div className="skeleton" style={{ height: '54px', width: '100%', borderRadius: 'var(--radius-md)' }} />
          <div className="skeleton" style={{ height: '54px', width: '100%', borderRadius: 'var(--radius-md)' }} />
          <div className="skeleton" style={{ height: '54px', width: '100%', borderRadius: 'var(--radius-md)' }} />
        </div>
      </div>
    </div>
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
};
