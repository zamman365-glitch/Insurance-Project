import React from 'react';
import PropTypes from 'prop-types';
import { Cigarette, Sparkles } from 'lucide-react';

/**
 * Animated toggle switch component designed for binary state selections like Smoker (Yes/No).
 * Supports keyboard activation with Space / Enter.
 */
export function Toggle({
  id,
  checked,
  onChange,
  label = 'Tobacco Usage / Smoker',
  disabled = false,
  ...rest
}) {
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div
      className={`toggle-switch-card ${checked ? 'is-active' : ''}`}
      onClick={() => !disabled && onChange(!checked)}
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: checked ? 'var(--color-danger-subtle)' : 'var(--color-success-subtle)',
            color: checked ? 'var(--color-danger)' : 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--transition-fast)',
          }}
        >
          {checked ? <Cigarette size={18} /> : <Sparkles size={18} />}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
            {checked ? 'Yes — Regular Tobacco User' : 'No — Non-Smoker'}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            {checked ? 'Significant actuarial risk surcharge applies' : 'Clean lifestyle baseline tier'}
          </div>
        </div>
      </div>

      <div className={`toggle-switch-track ${checked ? 'is-checked' : ''}`} aria-hidden="true">
        <div className="toggle-switch-thumb" />
      </div>
    </div>
  );
}

Toggle.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
