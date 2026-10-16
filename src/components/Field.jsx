import React from 'react';
import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react';

/**
 * Accessible form field wrapper managing label association, helper text, and validation error messages.
 */
export function Field({
  id,
  label,
  required = false,
  badge = null,
  helperText = null,
  error = null,
  className = '',
  children,
}) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`field-wrapper ${className}`.trim()}>
      <div className="field-label-row">
        <label htmlFor={id} className="field-label">
          <span>{label}</span>
          {required && (
            <span className="field-required" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {badge}
      </div>

      {/* Clone children to inject accessibility attributes if applicable */}
      {typeof children === 'function'
        ? children({ id, 'aria-describedby': describedBy, 'aria-invalid': Boolean(error) })
        : React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                id,
                'aria-describedby': describedBy,
                'aria-invalid': Boolean(error),
              });
            }
            return child;
          })}

      {error ? (
        <div id={errorId} className="field-error-text" role="alert" aria-live="assertive">
          <AlertCircle size={14} aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <div id={helperId} className="field-helper-text">
          {helperText}
        </div>
      ) : null}
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  badge: PropTypes.node,
  helperText: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
