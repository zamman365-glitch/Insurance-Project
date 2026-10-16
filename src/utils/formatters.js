/**
 * Formatting utilities for numbers, currencies, percentages, and risk labels.
 */

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const currencyDetailedFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('en-US');

/**
 * Formats a number as USD currency without cents.
 * @param {number} amount
 * @returns {string} E.g., "$13,279"
 */
export function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return '$0';
  return currencyFormatter.format(amount);
}

/**
 * Formats a number as USD currency with cents.
 * @param {number} amount
 * @returns {string} E.g., "$13,279.12"
 */
export function formatCurrencyDetailed(amount) {
  if (amount == null || isNaN(amount)) return '$0.00';
  return currencyDetailedFormatter.format(amount);
}

/**
 * Formats standard number with comma separators.
 * @param {number} value
 * @returns {string} E.g., "1,337"
 */
export function formatNumber(value) {
  if (value == null || isNaN(value)) return '0';
  return numberFormatter.format(value);
}

/**
 * Formats a decimal as percentage.
 * @param {number} value
 * @param {number} [decimals=1]
 * @returns {string} E.g., "20.5%"
 */
export function formatPercentage(value, decimals = 1) {
  if (value == null || isNaN(value)) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Maps a risk level ("low", "medium", "high") to UI presentation metadata.
 * @param {string} level
 * @returns {{ label: string, variant: string, badgeBg: string, description: string }}
 */
export function getRiskLevelMeta(level) {
  const norm = String(level).toLowerCase();
  switch (norm) {
    case 'low':
      return {
        label: 'Low Risk',
        variant: 'success',
        color: 'var(--color-success)',
        bgColor: 'var(--color-success-subtle)',
        borderColor: 'var(--color-success-border)',
        description: 'Predictable baseline healthcare costs within normal population range.',
      };
    case 'medium':
      return {
        label: 'Moderate Risk',
        variant: 'warning',
        color: 'var(--color-warning)',
        bgColor: 'var(--color-warning-subtle)',
        borderColor: 'var(--color-warning-border)',
        description: 'Elevated expected costs influenced by age or body mass index indicators.',
      };
    case 'high':
    default:
      return {
        label: 'High Risk',
        variant: 'danger',
        color: 'var(--color-danger)',
        bgColor: 'var(--color-danger-subtle)',
        borderColor: 'var(--color-danger-border)',
        description: 'Substantially increased projected claims driven primarily by tobacco usage or obesity.',
      };
  }
}
