import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2, X } from 'lucide-react';

/**
 * Floating accessible toast notification.
 */
export function Toast({
  message,
  onClose,
  duration = 3000,
  variant = 'success',
}) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--color-border)',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{message}</span>
      <button
        type="button"
        onClick={onClose}
        style={{
          marginLeft: '0.5rem',
          color: 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  variant: PropTypes.string,
};
