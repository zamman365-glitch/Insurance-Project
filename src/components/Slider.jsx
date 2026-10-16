import React from 'react';
import PropTypes from 'prop-types';

/**
 * Synchronized Slider + Number Input component.
 */
export function Slider({
  id,
  value,
  onChange,
  min = 18,
  max = 64,
  step = 1,
  unit = '',
  disabled = false,
  error = null,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
}) {
  const numValue = Number(value) || min;

  const handleSliderChange = (e) => {
    onChange(Number(e.target.value));
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val === '' ? '' : Number(val));
  };

  // Calculate percentage fill for styling slider track
  const percentage = Math.min(100, Math.max(0, ((numValue - min) / (max - min)) * 100));

  return (
    <div className="slider-number-combo">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className={`field-input ${error ? 'has-error' : ''}`}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          style={{ width: '6.5rem', textAlign: 'center', fontWeight: 600 }}
        />
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={numValue}
            onChange={handleSliderChange}
            disabled={disabled}
            className="custom-range-slider"
            aria-label={`${id} range slider`}
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-border) ${percentage}%, var(--color-border) 100%)`,
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: 'var(--color-text-subtle)',
              marginTop: '4px',
            }}
          >
            <span>{min} {unit}</span>
            <span>{max} {unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  unit: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
};
