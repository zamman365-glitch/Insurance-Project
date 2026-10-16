/**
 * In-browser regression model inference that replicates the scikit-learn
 * pipeline trained on the Kaggle Insurance dataset.
 *
 * Preprocessing:
 *  - is_female: 1 if female, 0 if male
 *  - is_smoker: 1 if smoker, 0 if non-smoker
 *  - bmi_category_Obese: 1 if bmi >= 30, 0 otherwise
 *  - region_southeast: 1 if region == southeast, 0 otherwise
 *  - region_northwest: 1 if region == northwest, 0 otherwise
 *  - StandardScaler on age, bmi, children
 *
 * Linear Regression formula:
 *  charges = intercept + sum(coef_i * feature_i)
 */

export const MODEL_PARAMS = {
  intercept: 6881.81985,
  scaler: {
    age: { mean: 39.222139, scale: 14.03908 },
    bmi: { mean: 30.663452, scale: 6.098187 },
    children: { mean: 1.095737, scale: 1.20512 },
  },
  coefficients: {
    age_scaled: 3610.53826,
    is_female: 155.09047,
    bmi_scaled: 875.01122,
    children_scaled: 565.31654,
    is_smoker: 23863.84405,
    region_southeast: -394.18354,
    bmi_category_Obese: 2868.99789,
    region_northwest: 91.97354,
  },
};

/**
 * Calculates insurance charges and factor breakdown from raw user input.
 * @param {Object} input - { age, sex, bmi, children, smoker, region }
 * @returns {{ predicted_charge: number, risk_level: 'low'|'medium'|'high', top_factors: Array, breakdown: Object }}
 */
export function calculatePrediction(input) {
  const age = Number(input.age);
  const bmi = Number(input.bmi);
  const children = Number(input.children);
  const isFemale = input.sex === 'female' ? 1 : 0;
  const isSmoker = input.smoker === 'yes' ? 1 : 0;
  const isObese = bmi >= 30 ? 1 : 0;
  const isSoutheast = input.region === 'southeast' ? 1 : 0;
  const isNorthwest = input.region === 'northwest' ? 1 : 0;

  // Standardize continuous variables
  const ageScaled = (age - MODEL_PARAMS.scaler.age.mean) / MODEL_PARAMS.scaler.age.scale;
  const bmiScaled = (bmi - MODEL_PARAMS.scaler.bmi.mean) / MODEL_PARAMS.scaler.bmi.scale;
  const childrenScaled = (children - MODEL_PARAMS.scaler.children.mean) / MODEL_PARAMS.scaler.children.scale;

  // Partial contributions
  const ageContrib = MODEL_PARAMS.coefficients.age_scaled * ageScaled;
  const sexContrib = MODEL_PARAMS.coefficients.is_female * isFemale;
  const bmiContrib = MODEL_PARAMS.coefficients.bmi_scaled * bmiScaled;
  const childrenContrib = MODEL_PARAMS.coefficients.children_scaled * childrenScaled;
  const smokerContrib = MODEL_PARAMS.coefficients.is_smoker * isSmoker;
  const southeastContrib = MODEL_PARAMS.coefficients.region_southeast * isSoutheast;
  const obeseContrib = MODEL_PARAMS.coefficients.bmi_category_Obese * isObese;
  const northwestContrib = MODEL_PARAMS.coefficients.region_northwest * isNorthwest;

  // Total raw prediction
  let rawCharge =
    MODEL_PARAMS.intercept +
    ageContrib +
    sexContrib +
    bmiContrib +
    childrenContrib +
    smokerContrib +
    southeastContrib +
    obeseContrib +
    northwestContrib;

  // Ensure realistic non-negative boundary
  const predictedCharge = Math.max(1000, Math.round(rawCharge));

  // Determine risk level based on clinical and actuarial boundaries
  let riskLevel = 'low';
  if (predictedCharge >= 25000) {
    riskLevel = 'high';
  } else if (predictedCharge >= 10000) {
    riskLevel = 'medium';
  }

  // Determine top contributing factors with human-readable descriptions
  const factorList = [];

  if (isSmoker) {
    factorList.push({
      factor: 'Tobacco Usage',
      impact: '+$23,864 / yr',
      type: 'negative',
      importance: 1,
      description: 'Single highest driver of risk across medical claims data.',
    });
  } else {
    factorList.push({
      factor: 'Non-Smoker Status',
      impact: '~$0 tobacco surcharge',
      type: 'positive',
      importance: 5,
      description: 'Avoids average +$23,800 surcharge applied to tobacco users.',
    });
  }

  if (isObese) {
    factorList.push({
      factor: 'Obesity Threshold (BMI ≥ 30)',
      impact: '+$2,869 base surcharge',
      type: 'negative',
      importance: 2,
      description: 'BMI above 30 triggers elevated chronic risk classifications.',
    });
  } else if (bmi < 25) {
    factorList.push({
      factor: 'Healthy BMI Range',
      impact: 'Baseline rate',
      type: 'positive',
      importance: 4,
      description: 'Normal weight lowers cardiovascular and metabolic risk.',
    });
  }

  if (age >= 50) {
    factorList.push({
      factor: `Senior Age Bracket (${age} yrs)`,
      impact: `+${Math.round(ageContrib > 0 ? ageContrib : 2500).toLocaleString()} / yr`,
      type: 'negative',
      importance: 3,
      description: 'Age-correlated utilization curves increase with maturity.',
    });
  } else if (age < 30) {
    factorList.push({
      factor: `Young Adult Tier (${age} yrs)`,
      impact: 'Lower base tier',
      type: 'positive',
      importance: 3,
      description: 'Significantly lower historical utilization below 30.',
    });
  }

  if (children > 0) {
    factorList.push({
      factor: `${children} Dependent${children > 1 ? 's' : ''}`,
      impact: `+${Math.round(children * 469).toLocaleString()} / yr`,
      type: 'neutral',
      importance: 6,
      description: 'Family coverage adjustment based on child count.',
    });
  }

  // Sort by priority/importance
  factorList.sort((a, b) => a.importance - b.importance);

  return {
    predicted_charge: predictedCharge,
    risk_level: riskLevel,
    monthly_charge: Math.round(predictedCharge / 12),
    top_factors: factorList.slice(0, 3),
    breakdown: {
      intercept: Math.round(MODEL_PARAMS.intercept),
      ageContrib: Math.round(ageContrib),
      bmiContrib: Math.round(bmiContrib + obeseContrib),
      smokerContrib: Math.round(smokerContrib),
      childrenContrib: Math.round(childrenContrib),
      regionalContrib: Math.round(southeastContrib + northwestContrib),
    },
  };
}
