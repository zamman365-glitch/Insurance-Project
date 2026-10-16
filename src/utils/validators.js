/**
 * Validation rules and helpers for the InsureIQ predictor form.
 */

export const VALIDATION_LIMITS = {
  age: { min: 18, max: 64 },
  bmi: { min: 15, max: 55 },
  children: { min: 0, max: 5 },
  sex: ['male', 'female'],
  smoker: ['yes', 'no'],
  region: ['northeast', 'northwest', 'southeast', 'southwest'],
};

/**
 * Validates a single field.
 * @param {string} field - Field name
 * @param {*} value - Field value
 * @returns {string|null} - Error message or null if valid
 */
export function validateField(field, value) {
  switch (field) {
    case 'age': {
      const num = Number(value);
      if (value === '' || isNaN(num)) return 'Age is required.';
      if (!Number.isInteger(num)) return 'Age must be a whole number.';
      if (num < VALIDATION_LIMITS.age.min || num > VALIDATION_LIMITS.age.max) {
        return `Age must be between ${VALIDATION_LIMITS.age.min} and ${VALIDATION_LIMITS.age.max}.`;
      }
      return null;
    }

    case 'bmi': {
      const num = Number(value);
      if (value === '' || isNaN(num)) return 'BMI is required.';
      if (num < VALIDATION_LIMITS.bmi.min || num > VALIDATION_LIMITS.bmi.max) {
        return `BMI must be between ${VALIDATION_LIMITS.bmi.min} and ${VALIDATION_LIMITS.bmi.max}.`;
      }
      return null;
    }

    case 'children': {
      const num = Number(value);
      if (value === '' || isNaN(num)) return 'Number of children is required.';
      if (!Number.isInteger(num) || num < 0 || num > 5) {
        return 'Children must be between 0 and 5.';
      }
      return null;
    }

    case 'sex': {
      if (!VALIDATION_LIMITS.sex.includes(value)) {
        return 'Please select a valid biological sex.';
      }
      return null;
    }

    case 'smoker': {
      if (!VALIDATION_LIMITS.smoker.includes(value)) {
        return 'Please specify smoking status.';
      }
      return null;
    }

    case 'region': {
      if (!VALIDATION_LIMITS.region.includes(value)) {
        return 'Please select a valid US residential region.';
      }
      return null;
    }

    default:
      return null;
  }
}

/**
 * Validates the entire form state.
 * @param {Object} values - Full form state
 * @returns {Object} - Object containing field errors (if any) and isValid boolean
 */
export function validateForm(values) {
  const errors = {};
  const fields = ['age', 'sex', 'bmi', 'children', 'smoker', 'region'];

  fields.forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

/**
 * Returns the BMI category and associated styling badge configuration.
 * Categories:
 *   Underweight: < 18.5
 *   Normal: 18.5 - 24.9
 *   Overweight: 25 - 29.9
 *   Obese: 30+
 * @param {number} bmi
 * @returns {{ category: string, color: string, description: string }}
 */
export function getBmiCategory(bmi) {
  const val = Number(bmi);
  if (isNaN(val) || val <= 0) {
    return { category: 'Invalid', color: 'neutral', description: 'Enter valid BMI' };
  }
  if (val < 18.5) {
    return { category: 'Underweight', color: 'info', description: '< 18.5 BMI' };
  }
  if (val < 25.0) {
    return { category: 'Normal', color: 'success', description: '18.5 – 24.9 BMI' };
  }
  if (val < 30.0) {
    return { category: 'Overweight', color: 'warning', description: '25.0 – 29.9 BMI' };
  }
  return { category: 'Obese', color: 'danger', description: '30.0+ BMI (Risk Multiplier)' };
}
