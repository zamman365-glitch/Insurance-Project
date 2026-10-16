import React from 'react';
import { Sliders, Cpu, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

/**
 * "How it Works" section describing the 3-step pipeline and model limitations.
 */
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section" aria-labelledby="how-it-works-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Architecture & Pipeline</span>
          </div>
          <h2 id="how-it-works-heading" className="section-title">
            How InsureIQ Generates Estimates
          </h2>
          <p className="section-description">
            Transparent, reproducible machine learning based on standard actuarial feature engineering
            and ordinary least squares linear regression.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number-tag">01</div>
            <h3 className="step-title">Enter Health Profile</h3>
            <p className="step-desc">
              Input six key health and lifestyle variables: age, biological sex, BMI, number of
              dependents, smoking status, and US residential region.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number-tag">02</div>
            <h3 className="step-title">Feature Engineering</h3>
            <p className="step-desc">
              The engine scales continuous variables (age, BMI, children) via <code>StandardScaler</code>,
              applies one-hot dummy encoding, and creates an actuarial non-linear <code>bmi_category_Obese</code> threshold flag (BMI ≥ 30).
            </p>
          </div>

          <div className="step-card">
            <div className="step-number-tag">03</div>
            <h3 className="step-title">Inference & Attribution</h3>
            <p className="step-desc">
              Trained regression coefficients compute predicted annual and monthly charges, categorize overall
              actuarial risk (Low, Medium, High), and isolate individual top drivers.
            </p>
          </div>
        </div>

        {/* Model Limitations Notice Box */}
        <div className="model-limits-box" role="note" aria-labelledby="model-limits-title">
          <AlertTriangle size={24} className="model-limits-icon" />
          <div className="model-limits-content">
            <h4 id="model-limits-title">Model Limitations & Actuarial Assumptions</h4>
            <p>
              This estimator utilizes an <strong>Ordinary Least Squares (OLS) Linear Regression model</strong>{' '}
              with an <strong>Adjusted R² ≈ 0.798</strong>. While it explains roughly 80% of historical
              claim variance in the Kaggle insurance benchmark, it is an educational approximation. Real-world
              actuarial pricing additionally incorporates clinical history, chronic conditions, family risk, prescription
              formularies, plan deductibles, and local hospital network negotiated rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
