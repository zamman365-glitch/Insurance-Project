# InsureIQ — Medical Insurance Cost Predictor & Insights Dashboard

[![React 18](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![Model R²](https://img.shields.io/badge/Adjusted_R²-0.798-0f766e.svg)](https://scikit-learn.org/)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG_AA-059669.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

**InsureIQ** is a production-grade, accessible, and responsive healthcare cost estimation platform. It connects a machine learning regression model trained on Kaggle's verified Medical Insurance dataset (1,337 records) to an interactive, user-friendly frontend dashboard.

---

## 🏗 Architecture Overview

```
                          ┌───────────────────────────┐
                          │   InsureIQ Frontend App   │
                          │      (React 18 + Vite)    │
                          └─────────────┬─────────────┘
                                        │
           ┌────────────────────────────┼───────────────────────────┐
           │                            │                           │
           ▼                            ▼                           ▼
┌────────────────────┐       ┌────────────────────┐      ┌────────────────────┐
│   Predictor Form   │       │ Insights Dashboard │      │    How It Works    │
│  • Age Slider/Num  │       │  • 4 KPI Cards     │      │  • 3-Step Pipeline │
│  • BMI Live Badge  │       │  • Smoker Bar      │      │  • Model Limits &  │
│  • Smoker Switch   │       │  • Age Scatter/Line│      │    Assumptions     │
│  • Stepper/Region  │       │  • Charge Histogram│      └────────────────────┘
└──────────┬─────────┘       │  • Feature Corr Bar│
           │                 │  • Regional Donut  │
           ▼                 └────────────────────┘
┌────────────────────────────────┐
│       services/api.js          │
│  • Live /api/predict fetch     │
│  • Automatic Fallback Mock ML  │
│  • StandardScaler + OLS weights│
└────────────────────────────────┘
```

### Key Engineering Highlights
- **No Heavy UI Frameworks**: Hand-written, pure modern CSS with CSS variables (`src/styles/variables.css`, `index.css`, `components.css`).
- **Data-Backed Precision**: Uses exact scikit-learn coefficients and standardization constants calculated from the Kaggle dataset.
- **Micro-Interactions**: Animated numeric ticker count-up on estimated charges, dynamic BMI status pills, toggle switches, and card elevations.
- **Accessibility (WCAG AA)**: Full keyboard navigability (`Tab`, `Space`, `Enter`, `Arrow` keys), `aria-live="polite"` result announcements, `aria-invalid` form states, and dark/light mode with `prefers-color-scheme` support.

---

## 📁 File Tree

```
Project_1/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── insurance.csv
├── Insurance (1).ipynb
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── HeroSection.jsx
    │   ├── PredictorSection.jsx
    │   ├── InsightsSection.jsx
    │   ├── HowItWorksSection.jsx
    │   ├── Footer.jsx
    │   ├── Button.jsx
    │   ├── Card.jsx
    │   ├── Field.jsx
    │   ├── Toggle.jsx
    │   ├── Slider.jsx
    │   ├── Stepper.jsx
    │   ├── KpiCard.jsx
    │   ├── ChartCard.jsx
    │   ├── ResultCard.jsx
    │   ├── Skeleton.jsx
    │   ├── Toast.jsx
    │   └── ErrorBoundary.jsx
    ├── hooks/
    │   ├── usePrediction.js
    │   ├── useDebounce.js
    │   └── useTheme.js
    ├── services/
    │   └── api.js
    ├── utils/
    │   ├── validators.js
    │   ├── formatters.js
    │   └── modelCalculator.js
    ├── data/
    │   └── statsData.js
    └── styles/
        ├── variables.css
        ├── index.css
        └── components.css
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18.0.0` or higher (tested on Node v24)
- npm `v9.0.0` or higher

### 2. Installation
```bash
# Clone or navigate into the workspace
cd "Project_1"

# Install dependencies
npm install
```

### 3. Launch the Local Dev Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🔌 Connecting a Real Backend (FastAPI / Flask / Express)

By default, `src/services/api.js` automatically uses a high-fidelity client-side ML engine if no remote backend is configured or if the server is offline.

To connect a live backend server:

### Step 1: Set Environment Variable
Create a `.env` or `.env.local` file in the project root:
```env
VITE_API_URL=http://localhost:8000
```

### Step 2: Implement the Backend API (`POST /api/predict`)
Here is a complete, production-ready Python **FastAPI** server that matches the frontend API contract:

```python
# server.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import numpy as np

app = FastAPI(title="InsureIQ Prediction API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema matches the frontend raw input
class PredictRequest(BaseModel):
    age: int = Field(..., ge=18, le=64)
    sex: str = Field(..., pattern="^(male|female)$")
    bmi: float = Field(..., ge=15.0, le=55.0)
    children: int = Field(..., ge=0, le=5)
    smoker: str = Field(..., pattern="^(yes|no)$")
    region: str = Field(..., pattern="^(northeast|northwest|southeast|southwest)$")

# Scikit-learn standardization and model parameters
SCALER_MEANS = {'age': 39.222139, 'bmi': 30.663452, 'children': 1.095737}
SCALER_SCALES = {'age': 14.039080, 'bmi': 6.098187, 'children': 1.205120}

COEFFICIENTS = {
    'age_scaled': 3610.53826,
    'is_female': 155.09047,
    'bmi_scaled': 875.01122,
    'children_scaled': 565.31654,
    'is_smoker': 23863.84405,
    'region_southeast': -394.18354,
    'bmi_category_Obese': 2868.99789,
    'region_northwest': 91.97354,
}
INTERCEPT = 6881.81985

@app.post("/api/predict")
def predict_charges(payload: PredictRequest):
    # 1. Feature Preprocessing
    age_scaled = (payload.age - SCALER_MEANS['age']) / SCALER_SCALES['age']
    bmi_scaled = (payload.bmi - SCALER_MEANS['bmi']) / SCALER_SCALES['bmi']
    children_scaled = (payload.children - SCALER_MEANS['children']) / SCALER_SCALES['children']
    
    is_female = 1 if payload.sex == "female" else 0
    is_smoker = 1 if payload.smoker == "yes" else 0
    is_obese = 1 if payload.bmi >= 30.0 else 0
    is_southeast = 1 if payload.region == "southeast" else 0
    is_northwest = 1 if payload.region == "northwest" else 0
    
    # 2. Linear dot product
    predicted = (
        INTERCEPT
        + COEFFICIENTS['age_scaled'] * age_scaled
        + COEFFICIENTS['is_female'] * is_female
        + COEFFICIENTS['bmi_scaled'] * bmi_scaled
        + COEFFICIENTS['children_scaled'] * children_scaled
        + COEFFICIENTS['is_smoker'] * is_smoker
        + COEFFICIENTS['region_southeast'] * is_southeast
        + COEFFICIENTS['bmi_category_Obese'] * is_obese
        + COEFFICIENTS['region_northwest'] * is_northwest
    )
    predicted_charge = max(1000, round(float(predicted)))
    
    # 3. Categorize Risk
    risk_level = "low"
    if predicted_charge >= 25000:
        risk_level = "high"
    elif predicted_charge >= 10000:
        risk_level = "medium"
        
    # 4. Top Factor Attribution
    top_factors = []
    if is_smoker:
        top_factors.append({
            "factor": "Tobacco Usage",
            "impact": "+$23,864 / yr",
            "type": "negative",
            "description": "Primary driver of actuarial medical risk across the benchmark."
        })
    if is_obese:
        top_factors.append({
            "factor": "Obesity Threshold (BMI ≥ 30)",
            "impact": "+$2,869 base surcharge",
            "type": "negative",
            "description": "Body mass index exceeds 30.0 threshold."
        })
    if payload.age >= 50:
        top_factors.append({
            "factor": f"Senior Age Bracket ({payload.age} yrs)",
            "impact": "+$3,610 / SD",
            "type": "negative",
            "description": "Age-correlated healthcare claims acceleration."
        })

    return {
        "predicted_charge": predicted_charge,
        "monthly_charge": round(predicted_charge / 12),
        "risk_level": risk_level,
        "top_factors": top_factors[:3]
    }

# Run with: uvicorn server:app --reload --port 8000
```

---

## 📊 Dataset Insights Summary

- **Total records**: 1,337 clean observations (1 duplicate removed from the initial 1,338 Kaggle records).
- **Mean Annual Charge**: $13,279.12 (Median $9,386.16).
- **Smokers vs. Non-Smokers**:
  - Non-smokers (1,063 patients, ~80%): Mean charge **$8,440.66**.
  - Smokers (274 patients, ~20%): Mean charge **$32,050.23** (nearly 4x higher!).
- **Feature Correlations with Charges**:
  1. `is_smoker`: **0.79** (Dominant factor)
  2. `age`: **0.30**
  3. `bmi_category_Obese`: **0.20**
  4. `bmi`: **0.20**
  5. `region_southeast`: **0.07**
  6. `children`: **0.07**
  7. `region_northwest`: **-0.04**

---

## 🔮 Future Improvements Roadmap

1. **Non-linear Models Comparison**: Provide a tab to toggle predictions between Linear Regression (R² = 0.80), Random Forest Regressor (R² = 0.86), and XGBoost (R² = 0.87).
2. **Interactive What-If Simulation**: Add interactive toggles ("What if I quit smoking?" or "What if I drop BMI to 24.5?") that visually demonstrate annual savings.
3. **PDF Summary Export**: Add a 1-click button to download an accessible medical cost summary report with breakdown graphs.
4. **Localization & Currency**: Expand support for international health systems (GBP, EUR, CAD, INR) with purchasing power parity (PPP) scaling.
