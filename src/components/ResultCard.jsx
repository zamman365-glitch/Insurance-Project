import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  ArrowRight,
  RotateCcw,
  TrendingUp,
  Info,
  Check,
  Copy,
} from 'lucide-react';
import { formatCurrency, getRiskLevelMeta } from '../utils/formatters';
import { Button } from './Button';

/**
 * Animated count-up hook.
 */
function useCountUp(targetValue, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = 0;
    const endValue = Number(targetValue) || 0;

    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (endValue - startValue) * easeOut));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue, duration]);

  return count;
}

/**
 * Displays the ML regression prediction results, animated count-up,
 * risk badge, top driving factors, and model breakdown.
 */
export function ResultCard({
  result,
  onReset,
  onShowToast,
}) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const animatedCharge = useCountUp(result?.predicted_charge || 0, 1100);
  const riskMeta = getRiskLevelMeta(result?.risk_level || 'low');

  const handleCopy = () => {
    const text = `InsureIQ Estimate: ${formatCurrency(result.predicted_charge)}/year (~${formatCurrency(result.monthly_charge)}/month) - ${riskMeta.label}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    if (onShowToast) onShowToast('Estimate copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  if (!result) return null;

  return (
    <article
      className="result-card"
      aria-live="polite"
      aria-label="Medical Insurance Cost Prediction Result"
    >
      {/* Top dynamic risk accent bar */}
      <div className={`result-glow-header risk-${result.risk_level}`} />

      {/* Main annual price container */}
      <div className="result-price-box">
        <div className="result-price-label">Estimated Annual Premium</div>
        <div className="result-price-display" aria-label={`Estimated charge: ${formatCurrency(result.predicted_charge)}`}>
          {formatCurrency(animatedCharge)}
        </div>
        <div className="result-monthly-subtext">
          Approximately <strong>{formatCurrency(Math.round(animatedCharge / 12))}</strong> / month
        </div>

        {/* Risk Badge */}
        <div
          className="risk-level-badge"
          style={{
            backgroundColor: riskMeta.bgColor,
            color: riskMeta.color,
            border: `1px solid ${riskMeta.borderColor}`,
          }}
        >
          {result.risk_level === 'high' ? (
            <ShieldAlert size={14} />
          ) : result.risk_level === 'medium' ? (
            <Shield size={14} />
          ) : (
            <ShieldCheck size={14} />
          )}
          <span>{riskMeta.label}</span>
        </div>
      </div>

      <div style={{ padding: 'var(--space-6)' }}>
        {/* Risk description */}
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
          {riskMeta.description}
        </p>

        {/* Top Factors Mini-List */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-2)',
            }}
          >
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
              Top Cost Factors
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
              Linear Regression Impact
            </span>
          </div>

          <div className="top-factors-list">
            {result.top_factors?.map((item, idx) => (
              <div key={idx} className="factor-item">
                <div className="factor-item-info">
                  <div className="factor-item-title">
                    <TrendingUp size={14} style={{ color: item.type === 'negative' ? 'var(--color-danger)' : 'var(--color-success)' }} />
                    <span>{item.factor}</span>
                  </div>
                  <div className="factor-item-desc">{item.description}</div>
                </div>
                <span
                  className="factor-item-badge"
                  style={{
                    backgroundColor:
                      item.type === 'negative'
                        ? 'var(--color-danger-subtle)'
                        : item.type === 'positive'
                        ? 'var(--color-success-subtle)'
                        : 'var(--color-bg-secondary)',
                    color:
                      item.type === 'negative'
                        ? 'var(--color-danger)'
                        : item.type === 'positive'
                        ? 'var(--color-success)'
                        : 'var(--color-text-primary)',
                    border: '1px solid currentColor',
                  }}
                >
                  {item.impact}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Details Toggle */}
        <div style={{ marginTop: 'var(--space-5)' }}>
          <button
            type="button"
            onClick={() => setShowBreakdown((prev) => !prev)}
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-primary)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <Info size={14} />
            {showBreakdown ? 'Hide model feature weights' : 'View full regression weights breakdown'}
          </button>

          {showBreakdown && result.breakdown && (
            <div
              style={{
                marginTop: 'var(--space-3)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-secondary)',
                fontSize: 'var(--text-xs)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div>Baseline Intercept: <strong>{formatCurrency(result.breakdown.intercept)}</strong></div>
                <div>Smoking Factor: <strong>{formatCurrency(result.breakdown.smokerContrib)}</strong></div>
                <div>Age Trend: <strong>{formatCurrency(result.breakdown.ageContrib)}</strong></div>
                <div>BMI & Obesity: <strong>{formatCurrency(result.breakdown.bmiContrib)}</strong></div>
                <div>Children: <strong>{formatCurrency(result.breakdown.childrenContrib)}</strong></div>
                <div>Regional: <strong>{formatCurrency(result.breakdown.regionalContrib)}</strong></div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-6)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            icon={copied ? Check : Copy}
            style={{ flex: 1 }}
          >
            {copied ? 'Copied' : 'Share Estimate'}
          </Button>

          <Button
            variant="subtle"
            size="sm"
            onClick={onReset}
            icon={RotateCcw}
          >
            Recalculate
          </Button>
        </div>
      </div>
    </article>
  );
}

ResultCard.propTypes = {
  result: PropTypes.shape({
    predicted_charge: PropTypes.number.isRequired,
    risk_level: PropTypes.string.isRequired,
    monthly_charge: PropTypes.number,
    top_factors: PropTypes.arrayOf(
      PropTypes.shape({
        factor: PropTypes.string.isRequired,
        impact: PropTypes.string.isRequired,
        type: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    breakdown: PropTypes.object,
    isMock: PropTypes.bool,
  }),
  onReset: PropTypes.func.isRequired,
  onShowToast: PropTypes.func,
};
