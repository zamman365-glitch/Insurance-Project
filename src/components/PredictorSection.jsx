import React, { useState, useId } from 'react';
import PropTypes from 'prop-types';
import {
  Sparkles,
  MapPin,
  Compass,
  User,
  HeartPulse,
  Send,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Field } from './Field';
import { Slider } from './Slider';
import { Stepper } from './Stepper';
import { Toggle } from './Toggle';
import { ResultCard } from './ResultCard';
import { Skeleton } from './Skeleton';
import { validateForm, validateField, getBmiCategory, VALIDATION_LIMITS } from '../utils/validators';

const REGIONS = [
  { id: 'southeast', name: 'Southeast', states: 'FL, GA, NC, SC, TN, AL, MS' },
  { id: 'southwest', name: 'Southwest', states: 'TX, AZ, NM, OK, NV, UT' },
  { id: 'northwest', name: 'Northwest', states: 'WA, OR, ID, MT, WY, CO' },
  { id: 'northeast', name: 'Northeast', states: 'NY, PA, MA, NJ, CT, ME' },
];

const INITIAL_FORM_VALUES = {
  age: 28,
  sex: 'male',
  bmi: 24.5,
  children: 0,
  smoker: 'no',
  region: 'southeast',
};

/**
 * Core Predictor Form and Interactive Results display.
 */
export function PredictorSection({
  predictionState,
  onPredict,
  onReset,
  onShowToast,
}) {
  const { loading, error, data } = predictionState;

  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [touched, setTouched] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // Form field IDs
  const ageId = useId();
  const sexId = useId();
  const bmiId = useId();
  const childrenId = useId();
  const smokerId = useId();
  const regionId = useId();

  // Compute live BMI category
  const bmiCategory = getBmiCategory(formValues.bmi);

  // Validate on field change
  const handleFieldChange = (field, value) => {
    const updatedValues = { ...formValues, [field]: value };
    setFormValues(updatedValues);

    // Validate single field if already touched
    if (touched[field]) {
      const err = validateField(field, value);
      setFormErrors((prev) => ({
        ...prev,
        [field]: err,
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formValues[field]);
    setFormErrors((prev) => ({
      ...prev,
      [field]: err,
    }));
  };

  // Check form validity for disabling submit button
  const currentValidation = validateForm(formValues);
  const isFormValid = currentValidation.isValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = {
      age: true,
      sex: true,
      bmi: true,
      children: true,
      smoker: true,
      region: true,
    };
    setTouched(allTouched);

    const validation = validateForm(formValues);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      await onPredict(formValues);
    } catch (err) {
      // Handled via usePrediction hook
    }
  };

  return (
    <section id="predictor" className="section" aria-labelledby="predictor-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Interactive Estimator</span>
          </div>
          <h2 id="predictor-heading" className="section-title">
            Calculate Your Medical Insurance Cost
          </h2>
          <p className="section-description">
            Enter your basic demographics and lifestyle factors to receive an instant,
            interpretable annual premium estimate computed by our trained regression model.
          </p>
        </div>

        {/* Two-Column Grid: Form on Left, Result / Status on Right */}
        <div className="predictor-layout">
          {/* Form Card */}
          <Card as="form" onSubmit={handleSubmit} noValidate>
            <Card.Header>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Personal Health Profile</h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    Raw values are securely standardized and mapped to regression features.
                  </p>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
                  * Required fields
                </span>
              </div>
            </Card.Header>

            <Card.Body>
              <div className="form-grid">
                {/* 1. Age (Slider + Number) */}
                <Field
                  id={ageId}
                  label="Age"
                  required
                  badge={<span className="field-value-badge">{formValues.age} years</span>}
                  helperText="Primary linear actuarial factor (ages 18 to 64)."
                  error={touched.age ? formErrors.age : null}
                >
                  <Slider
                    id={ageId}
                    value={formValues.age}
                    onChange={(val) => {
                      handleFieldChange('age', val);
                      if (!touched.age) handleBlur('age');
                    }}
                    min={VALIDATION_LIMITS.age.min}
                    max={VALIDATION_LIMITS.age.max}
                    step={1}
                    unit="yrs"
                    error={touched.age ? formErrors.age : null}
                  />
                </Field>

                {/* 2. Biological Sex (Segmented Toggle) */}
                <Field
                  id={sexId}
                  label="Biological Sex"
                  required
                  helperText="Used for categorical encoding (is_female dummy)."
                  error={touched.sex ? formErrors.sex : null}
                >
                  <div
                    className="segmented-control"
                    role="radiogroup"
                    aria-label="Biological Sex"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={formValues.sex === 'male'}
                      className={`segmented-option ${formValues.sex === 'male' ? 'is-active' : ''}`}
                      onClick={() => handleFieldChange('sex', 'male')}
                    >
                      <User size={16} />
                      <span>Male</span>
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={formValues.sex === 'female'}
                      className={`segmented-option ${formValues.sex === 'female' ? 'is-active' : ''}`}
                      onClick={() => handleFieldChange('sex', 'female')}
                    >
                      <User size={16} />
                      <span>Female</span>
                    </button>
                  </div>
                </Field>

                {/* 3. BMI with Live Category Badge */}
                <Field
                  id={bmiId}
                  label="Body Mass Index (BMI)"
                  required
                  badge={
                    <span className={`bmi-indicator-badge bmi-badge-${bmiCategory.color}`}>
                      <HeartPulse size={12} />
                      <span>{bmiCategory.category}</span>
                    </span>
                  }
                  helperText={
                    bmiCategory.category === 'Obese'
                      ? '⚠️ BMI ≥ 30 triggers the significant obesity surcharge factor (+ $2,869 baseline).'
                      : 'Clinical reference: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese (30+).'
                  }
                  error={touched.bmi ? formErrors.bmi : null}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <div className="field-input-group">
                      <input
                        id={bmiId}
                        type="number"
                        step="0.1"
                        min={VALIDATION_LIMITS.bmi.min}
                        max={VALIDATION_LIMITS.bmi.max}
                        value={formValues.bmi}
                        onChange={(e) => handleFieldChange('bmi', e.target.value)}
                        onBlur={() => handleBlur('bmi')}
                        className={`field-input ${touched.bmi && formErrors.bmi ? 'has-error' : ''}`}
                        placeholder="e.g. 24.5"
                      />
                    </div>
                    {/* Quick BMI preset shortcuts */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-subtle)', alignSelf: 'center' }}>
                        Presets:
                      </span>
                      {[
                        { label: 'Normal (22.5)', val: 22.5 },
                        { label: 'Overweight (27.0)', val: 27.0 },
                        { label: 'Obese (32.0)', val: 32.0 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => handleFieldChange('bmi', preset.val)}
                          style={{
                            fontSize: '11px',
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-xs)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-surface-subtle)',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </Field>

                {/* 4. Children (Stepper 0-5) */}
                <Field
                  id={childrenId}
                  label="Number of Dependent Children"
                  required
                  badge={<span className="field-value-badge">{formValues.children}</span>}
                  helperText="Dependents covered under plan (0 to 5)."
                  error={touched.children ? formErrors.children : null}
                >
                  <Stepper
                    id={childrenId}
                    value={formValues.children}
                    onChange={(val) => handleFieldChange('children', val)}
                    min={VALIDATION_LIMITS.children.min}
                    max={VALIDATION_LIMITS.children.max}
                    label="Dependent children"
                  />
                </Field>

                {/* 5. Smoker Status (Animated Toggle Switch) */}
                <Field
                  id={smokerId}
                  label="Tobacco Smoking Status"
                  required
                  helperText="Strongest single regression coefficient in the dataset (r = 0.79)."
                  error={touched.smoker ? formErrors.smoker : null}
                >
                  <Toggle
                    id={smokerId}
                    checked={formValues.smoker === 'yes'}
                    onChange={(isYes) => handleFieldChange('smoker', isYes ? 'yes' : 'no')}
                    label="Smoking status toggle"
                  />
                </Field>

                {/* 6. US Geographic Region (Card-Radio) */}
                <Field
                  id={regionId}
                  label="Residential Region"
                  required
                  helperText="Dummies created: region_southeast, region_northwest (drop-first encoding)."
                  error={touched.region ? formErrors.region : null}
                >
                  <div
                    className="region-card-grid"
                    role="radiogroup"
                    aria-label="Geographic Region"
                  >
                    {REGIONS.map((r) => {
                      const isSelected = formValues.region === r.id;
                      return (
                        <div
                          key={r.id}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          className={`region-card-option ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => handleFieldChange('region', r.id)}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              handleFieldChange('region', r.id);
                            }
                          }}
                        >
                          <div className="region-card-title">
                            <MapPin size={14} />
                            <span>{r.name}</span>
                          </div>
                          <div className="region-card-meta">{r.states}</div>
                        </div>
                      );
                    })}
                  </div>
                </Field>
              </div>
            </Card.Body>

            <Card.Footer>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {!isFormValid ? '⚠️ Please address highlighted fields before proceeding.' : '✓ Form inputs are valid and ready.'}
                </span>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={!isFormValid || loading}
                  loading={loading}
                  icon={Send}
                >
                  Calculate My Estimate
                </Button>
              </div>
            </Card.Footer>
          </Card>

          {/* Right Column: Dynamic Results, Skeleton, or Empty State Prompt */}
          <div>
            {loading ? (
              <Skeleton />
            ) : error ? (
              <Card>
                <Card.Body>
                  <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                    <div
                      style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-danger-subtle)',
                        color: 'var(--color-danger)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto var(--space-4) auto',
                      }}
                    >
                      <AlertCircle size={24} />
                    </div>
                    <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                      Inference Error
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                      {error}
                    </p>
                    <Button variant="secondary" size="sm" onClick={() => handleSubmit(new Event('submit'))}>
                      Retry Calculation
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ) : data ? (
              <ResultCard
                result={data}
                onReset={onReset}
                onShowToast={onShowToast}
              />
            ) : (
              /* Welcoming Empty State Card */
              <Card style={{ height: '100%', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card.Body style={{ textAlign: 'center', padding: 'var(--space-10) var(--space-6)' }}>
                  <div
                    style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--color-primary-subtle)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto var(--space-4) auto',
                      boxShadow: '0 4px 14px var(--color-primary-glow)',
                    }}
                  >
                    <Compass size={32} />
                  </div>
                  <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                    Ready for Calculation
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', maxWidth: '340px', margin: '0 auto var(--space-6) auto' }}>
                    Adjust your age, BMI, tobacco status, and region on the left, then click{' '}
                    <strong>"Calculate My Estimate"</strong> to run the regression model.
                  </p>
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => {
                      // Demo quick calculation
                      onPredict(formValues);
                    }}
                  >
                    <span>Run with Default Demographics ($28y, non-smoker)</span>
                  </Button>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

PredictorSection.propTypes = {
  predictionState: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    data: PropTypes.object,
  }).isRequired,
  onPredict: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onShowToast: PropTypes.func,
};
