import { useState, useEffect } from 'react';

/**
 * Debounces any fast-changing value (e.g. text inputs or sliders).
 * @template T
 * @param {T} value
 * @param {number} delay - Milliseconds to delay
 * @returns {T}
 */
export function useDebounce(value, delay = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
