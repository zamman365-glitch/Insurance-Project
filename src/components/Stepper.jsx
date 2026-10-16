import React from 'react';
import PropTypes from 'prop-types';
import { Minus, Plus } from 'lucide-react';

/**
 * Stepper control for discrete whole number inputs (e.g. Children 0-5).
 */
export function Stepper({
  id,
  value,
  onChange,
  min = 0,
  max = 5,
  label = 'Children',
  disabled = false,
  'aria-describedby': ariaDescribedBy,
}) {
  const numValue = Number(value) || 0;

  const handleDecrement = () => {
    if (numValue > min) {
      onChange(numValue - 1);
    }
  };

  const handleIncrement = () => {
    if (numValue < max) {
      onChange(numValue + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handleDecrement();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleIncrement();
    }
  };

  return (
    <div
      className="stepper-control"
      id={id}
      role="spinbutton"
      aria-label={label}
      aria-valuenow={numValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-describedby={ariaDescribedBy}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="stepper-btn"
        onClick={handleDecrement}
        disabled={disabled || numValue <= min}
        aria-label="Decrease children count"
      >
        <Minus size={18} />
      </button>

      <div className="stepper-display">
        <span className="stepper-value">{numValue}</span>
        <span className="stepper-subtext">
          {numValue === 0 ? 'No dependents' : numValue === 1 ? '1 dependent child' : `${numValue} dependent children`}
        </span>
      </div>

      <button
        type="button"
        className="stepper-btn"
        onClick={handleIncrement}
        disabled={disabled || numValue >= max}
        aria-label="Increase children count"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}

Stepper.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  'aria-describedby': PropTypes.string,
};
