// Static insights data computed from Kaggle insurance dataset (1,337 records)
export const STATS_DATA = {
  "kpis": {
    "totalRecords": 1337,
    "averageCharge": 13279.12,
    "smokersCount": 274,
    "smokersShare": 20.49,
    "nonSmokersCount": 1063,
    "adjustedR2": 0.798
  },
  "correlations": [
    {
      "feature": "Smoking Status (is_smoker)",
      "key": "is_smoker",
      "correlation": 0.79,
      "impact": "Strongest (+)"
    },
    {
      "feature": "Age (years)",
      "key": "age",
      "correlation": 0.3,
      "impact": "Strong (+)"
    },
    {
      "feature": "Obese Category (BMI \u2265 30)",
      "key": "bmi_category_Obese",
      "correlation": 0.2,
      "impact": "Moderate (+)"
    },
    {
      "feature": "BMI (Body Mass Index)",
      "key": "bmi",
      "correlation": 0.2,
      "impact": "Moderate (+)"
    },
    {
      "feature": "Southeast Region",
      "key": "region_southeast",
      "correlation": 0.07,
      "impact": "Mild (+)"
    },
    {
      "feature": "Number of Children",
      "key": "children",
      "correlation": 0.07,
      "impact": "Mild (+)"
    },
    {
      "feature": "Northwest Region",
      "key": "region_northwest",
      "correlation": -0.04,
      "impact": "Slight (-)"
    }
  ],
  "smokerComparison": [
    {
      "category": "Non-Smoker",
      "avgCharge": 8440.66,
      "medianCharge": 7345.73,
      "count": 1063,
      "percentage": 79.5
    },
    {
      "category": "Smoker",
      "avgCharge": 32050.23,
      "medianCharge": 34456.35,
      "count": 274,
      "percentage": 20.5
    }
  ],
  "regions": [
    {
      "name": "Southeast",
      "region": "southeast",
      "count": 364,
      "percentage": 27.2,
      "avgCharge": 14735.41
    },
    {
      "name": "Southwest",
      "region": "southwest",
      "count": 325,
      "percentage": 24.3,
      "avgCharge": 12346.94
    },
    {
      "name": "Northwest",
      "region": "northwest",
      "count": 324,
      "percentage": 24.2,
      "avgCharge": 12450.84
    },
    {
      "name": "Northeast",
      "region": "northeast",
      "count": 324,
      "percentage": 24.2,
      "avgCharge": 13406.38
    }
  ],
  "histogram": [
    {
      "range": "-5k",
      "count": 358,
      "smokers": 0,
      "nonSmokers": 358
    },
    {
      "range": "-10k",
      "count": 353,
      "smokers": 0,
      "nonSmokers": 353
    },
    {
      "range": "-15k",
      "count": 268,
      "smokers": 7,
      "nonSmokers": 261
    },
    {
      "range": "-20k",
      "count": 85,
      "smokers": 55,
      "nonSmokers": 30
    },
    {
      "range": "-25k",
      "count": 72,
      "smokers": 44,
      "nonSmokers": 28
    },
    {
      "range": "-30k",
      "count": 39,
      "smokers": 16,
      "nonSmokers": 23
    },
    {
      "range": "-35k",
      "count": 29,
      "smokers": 22,
      "nonSmokers": 7
    },
    {
      "range": "-40k",
      "count": 54,
      "smokers": 51,
      "nonSmokers": 3
    },
    {
      "range": "-45k",
      "count": 41,
      "smokers": 41,
      "nonSmokers": 0
    },
    {
      "range": "-50k",
      "count": 31,
      "smokers": 31,
      "nonSmokers": 0
    },
    {
      "range": "+",
      "count": 7,
      "smokers": 7,
      "nonSmokers": 0
    }
  ],
  "scatterData": [
    {
      "age": 18,
      "charges": 1708.93,
      "bmi": 26.1,
      "smoker": "no"
    },
    {
      "age": 18,
      "charges": 1634.57,
      "bmi": 40.3,
      "smoker": "no"
    },
    {
      "age": 18,
      "charges": 1633.04,
      "bmi": 39.2,
      "smoker": "no"
    },
    {
      "age": 18,
      "charges": 14133.04,
      "bmi": 38.3,
      "smoker": "no"
    },
    {
      "age": 18,
      "charges": 34617.84,
      "bmi": 33.5,
      "smoker": "yes"
    },
    {
      "age": 18,
      "charges": 36149.48,
      "bmi": 36.9,
      "smoker": "yes"
    },
    {
      "age": 18,
      "charges": 33732.69,
      "bmi": 31.7,
      "smoker": "yes"
    },
    {
      "age": 19,
      "charges": 1252.41,
      "bmi": 27.6,
      "smoker": "no"
    },
    {
      "age": 19,
      "charges": 22493.66,
      "bmi": 27.3,
      "smoker": "no"
    },
    {
      "age": 19,
      "charges": 2221.56,
      "bmi": 25.6,
      "smoker": "no"
    },
    {
      "age": 19,
      "charges": 1628.47,
      "bmi": 22.6,
      "smoker": "no"
    },
    {
      "age": 19,
      "charges": 39722.75,
      "bmi": 44.9,
      "smoker": "yes"
    },
    {
      "age": 19,
      "charges": 17468.98,
      "bmi": 28.3,
      "smoker": "yes"
    },
    {
      "age": 19,
      "charges": 36898.73,
      "bmi": 32.5,
      "smoker": "yes"
    },
    {
      "age": 19,
      "charges": 36397.58,
      "bmi": 34.7,
      "smoker": "yes"
    },
    {
      "age": 19,
      "charges": 17748.51,
      "bmi": 28.9,
      "smoker": "yes"
    },
    {
      "age": 20,
      "charges": 4915.06,
      "bmi": 30.1,
      "smoker": "no"
    },
    {
      "age": 20,
      "charges": 38344.57,
      "bmi": 39.4,
      "smoker": "yes"
    },
    {
      "age": 21,
      "charges": 3167.46,
      "bmi": 16.8,
      "smoker": "no"
    },
    {
      "age": 21,
      "charges": 15359.1,
      "bmi": 21.9,
      "smoker": "yes"
    },
    {
      "age": 22,
      "charges": 2755.02,
      "bmi": 39.8,
      "smoker": "no"
    },
    {
      "age": 22,
      "charges": 35585.58,
      "bmi": 35.6,
      "smoker": "yes"
    },
    {
      "age": 22,
      "charges": 37165.16,
      "bmi": 37.6,
      "smoker": "yes"
    },
    {
      "age": 23,
      "charges": 10795.94,
      "bmi": 33.4,
      "smoker": "no"
    },
    {
      "age": 23,
      "charges": 1815.88,
      "bmi": 26.5,
      "smoker": "no"
    },
    {
      "age": 23,
      "charges": 2775.19,
      "bmi": 17.4,
      "smoker": "no"
    },
    {
      "age": 23,
      "charges": 3597.6,
      "bmi": 37.1,
      "smoker": "no"
    },
    {
      "age": 23,
      "charges": 1826.84,
      "bmi": 34.4,
      "smoker": "no"
    },
    {
      "age": 23,
      "charges": 36021.01,
      "bmi": 32.8,
      "smoker": "yes"
    },
    {
      "age": 23,
      "charges": 34166.27,
      "bmi": 31.4,
      "smoker": "yes"
    },
    {
      "age": 23,
      "charges": 18328.24,
      "bmi": 28.5,
      "smoker": "yes"
    },
    {
      "age": 24,
      "charges": 14571.89,
      "bmi": 20.5,
      "smoker": "yes"
    },
    {
      "age": 25,
      "charges": 3227.12,
      "bmi": 34.0,
      "smoker": "no"
    },
    {
      "age": 25,
      "charges": 5080.1,
      "bmi": 23.9,
      "smoker": "no"
    },
    {
      "age": 25,
      "charges": 3213.62,
      "bmi": 28.6,
      "smoker": "no"
    },
    {
      "age": 25,
      "charges": 3208.79,
      "bmi": 20.8,
      "smoker": "no"
    },
    {
      "age": 25,
      "charges": 42112.24,
      "bmi": 45.5,
      "smoker": "yes"
    },
    {
      "age": 26,
      "charges": 2927.06,
      "bmi": 46.5,
      "smoker": "no"
    },
    {
      "age": 26,
      "charges": 3292.53,
      "bmi": 33.9,
      "smoker": "no"
    },
    {
      "age": 26,
      "charges": 3490.55,
      "bmi": 32.5,
      "smoker": "no"
    },
    {
      "age": 26,
      "charges": 2904.09,
      "bmi": 30.0,
      "smoker": "no"
    },
    {
      "age": 26,
      "charges": 2897.32,
      "bmi": 29.4,
      "smoker": "no"
    },
    {
      "age": 26,
      "charges": 17043.34,
      "bmi": 27.1,
      "smoker": "yes"
    },
    {
      "age": 27,
      "charges": 3558.62,
      "bmi": 25.2,
      "smoker": "no"
    },
    {
      "age": 27,
      "charges": 37133.9,
      "bmi": 36.1,
      "smoker": "yes"
    },
    {
      "age": 27,
      "charges": 15006.58,
      "bmi": 18.0,
      "smoker": "yes"
    },
    {
      "age": 28,
      "charges": 3847.67,
      "bmi": 23.8,
      "smoker": "no"
    },
    {
      "age": 28,
      "charges": 3766.88,
      "bmi": 37.6,
      "smoker": "no"
    },
    {
      "age": 28,
      "charges": 34672.15,
      "bmi": 31.7,
      "smoker": "yes"
    },
    {
      "age": 29,
      "charges": 3943.6,
      "bmi": 31.2,
      "smoker": "no"
    },
    {
      "age": 29,
      "charges": 4906.41,
      "bmi": 20.2,
      "smoker": "no"
    },
    {
      "age": 29,
      "charges": 19107.78,
      "bmi": 27.9,
      "smoker": "yes"
    },
    {
      "age": 30,
      "charges": 5693.43,
      "bmi": 19.9,
      "smoker": "no"
    },
    {
      "age": 30,
      "charges": 40932.43,
      "bmi": 39.0,
      "smoker": "yes"
    },
    {
      "age": 30,
      "charges": 39241.44,
      "bmi": 37.8,
      "smoker": "yes"
    },
    {
      "age": 31,
      "charges": 4949.76,
      "bmi": 36.6,
      "smoker": "no"
    },
    {
      "age": 31,
      "charges": 4350.51,
      "bmi": 29.3,
      "smoker": "no"
    },
    {
      "age": 31,
      "charges": 5327.4,
      "bmi": 32.8,
      "smoker": "no"
    },
    {
      "age": 31,
      "charges": 58571.07,
      "bmi": 38.1,
      "smoker": "yes"
    },
    {
      "age": 32,
      "charges": 3994.18,
      "bmi": 44.2,
      "smoker": "no"
    },
    {
      "age": 32,
      "charges": 4074.45,
      "bmi": 30.0,
      "smoker": "no"
    },
    {
      "age": 32,
      "charges": 32734.19,
      "bmi": 17.8,
      "smoker": "yes"
    },
    {
      "age": 33,
      "charges": 6059.17,
      "bmi": 29.4,
      "smoker": "no"
    },
    {
      "age": 33,
      "charges": 17904.53,
      "bmi": 24.8,
      "smoker": "yes"
    },
    {
      "age": 34,
      "charges": 4415.16,
      "bmi": 27.7,
      "smoker": "no"
    },
    {
      "age": 34,
      "charges": 5003.85,
      "bmi": 27.5,
      "smoker": "no"
    },
    {
      "age": 34,
      "charges": 35491.64,
      "bmi": 30.8,
      "smoker": "yes"
    },
    {
      "age": 35,
      "charges": 5125.22,
      "bmi": 24.1,
      "smoker": "no"
    },
    {
      "age": 35,
      "charges": 5926.85,
      "bmi": 28.9,
      "smoker": "no"
    },
    {
      "age": 35,
      "charges": 20234.85,
      "bmi": 28.0,
      "smoker": "yes"
    },
    {
      "age": 35,
      "charges": 20984.09,
      "bmi": 27.7,
      "smoker": "yes"
    },
    {
      "age": 36,
      "charges": 6548.2,
      "bmi": 28.6,
      "smoker": "no"
    },
    {
      "age": 36,
      "charges": 5458.05,
      "bmi": 19.9,
      "smoker": "no"
    },
    {
      "age": 36,
      "charges": 38709.18,
      "bmi": 35.2,
      "smoker": "yes"
    },
    {
      "age": 37,
      "charges": 6686.43,
      "bmi": 23.4,
      "smoker": "no"
    },
    {
      "age": 37,
      "charges": 19539.24,
      "bmi": 26.4,
      "smoker": "yes"
    },
    {
      "age": 37,
      "charges": 40182.25,
      "bmi": 34.1,
      "smoker": "yes"
    },
    {
      "age": 38,
      "charges": 6067.13,
      "bmi": 28.0,
      "smoker": "no"
    },
    {
      "age": 39,
      "charges": 7986.48,
      "bmi": 23.3,
      "smoker": "no"
    },
    {
      "age": 39,
      "charges": 23563.02,
      "bmi": 34.1,
      "smoker": "no"
    },
    {
      "age": 39,
      "charges": 7418.52,
      "bmi": 34.1,
      "smoker": "no"
    },
    {
      "age": 39,
      "charges": 21659.93,
      "bmi": 24.9,
      "smoker": "yes"
    },
    {
      "age": 39,
      "charges": 22462.04,
      "bmi": 29.9,
      "smoker": "yes"
    },
    {
      "age": 40,
      "charges": 6986.7,
      "bmi": 32.3,
      "smoker": "no"
    },
    {
      "age": 40,
      "charges": 40003.33,
      "bmi": 32.8,
      "smoker": "yes"
    },
    {
      "age": 41,
      "charges": 7256.72,
      "bmi": 30.6,
      "smoker": "no"
    },
    {
      "age": 42,
      "charges": 7160.33,
      "bmi": 36.0,
      "smoker": "no"
    },
    {
      "age": 42,
      "charges": 7160.09,
      "bmi": 35.8,
      "smoker": "no"
    },
    {
      "age": 42,
      "charges": 21259.38,
      "bmi": 24.6,
      "smoker": "yes"
    },
    {
      "age": 43,
      "charges": 18806.15,
      "bmi": 35.3,
      "smoker": "no"
    },
    {
      "age": 43,
      "charges": 18767.74,
      "bmi": 20.1,
      "smoker": "yes"
    },
    {
      "age": 43,
      "charges": 42124.52,
      "bmi": 36.0,
      "smoker": "yes"
    },
    {
      "age": 43,
      "charges": 19798.05,
      "bmi": 20.0,
      "smoker": "yes"
    },
    {
      "age": 43,
      "charges": 40941.29,
      "bmi": 32.6,
      "smoker": "yes"
    },
    {
      "age": 43,
      "charges": 45863.21,
      "bmi": 46.2,
      "smoker": "yes"
    },
    {
      "age": 44,
      "charges": 8891.14,
      "bmi": 21.9,
      "smoker": "no"
    },
    {
      "age": 44,
      "charges": 8302.54,
      "bmi": 22.1,
      "smoker": "no"
    },
    {
      "age": 44,
      "charges": 8116.27,
      "bmi": 32.0,
      "smoker": "no"
    },
    {
      "age": 44,
      "charges": 42983.46,
      "bmi": 39.0,
      "smoker": "yes"
    },
    {
      "age": 45,
      "charges": 8527.53,
      "bmi": 36.3,
      "smoker": "no"
    },
    {
      "age": 45,
      "charges": 62592.87,
      "bmi": 30.4,
      "smoker": "yes"
    },
    {
      "age": 46,
      "charges": 9411.0,
      "bmi": 32.3,
      "smoker": "no"
    },
    {
      "age": 46,
      "charges": 8944.12,
      "bmi": 43.9,
      "smoker": "no"
    },
    {
      "age": 46,
      "charges": 9414.92,
      "bmi": 30.8,
      "smoker": "no"
    },
    {
      "age": 47,
      "charges": 8534.67,
      "bmi": 24.3,
      "smoker": "no"
    },
    {
      "age": 47,
      "charges": 8539.67,
      "bmi": 23.6,
      "smoker": "no"
    },
    {
      "age": 47,
      "charges": 42211.14,
      "bmi": 36.1,
      "smoker": "yes"
    },
    {
      "age": 48,
      "charges": 8671.19,
      "bmi": 36.6,
      "smoker": "no"
    },
    {
      "age": 48,
      "charges": 8978.19,
      "bmi": 37.3,
      "smoker": "no"
    },
    {
      "age": 48,
      "charges": 45702.02,
      "bmi": 40.6,
      "smoker": "yes"
    },
    {
      "age": 49,
      "charges": 8125.78,
      "bmi": 36.9,
      "smoker": "no"
    },
    {
      "age": 49,
      "charges": 8703.46,
      "bmi": 28.7,
      "smoker": "no"
    },
    {
      "age": 50,
      "charges": 9549.57,
      "bmi": 46.1,
      "smoker": "no"
    },
    {
      "age": 51,
      "charges": 9957.72,
      "bmi": 27.7,
      "smoker": "no"
    },
    {
      "age": 51,
      "charges": 46255.11,
      "bmi": 37.0,
      "smoker": "yes"
    },
    {
      "age": 52,
      "charges": 11187.66,
      "bmi": 31.7,
      "smoker": "no"
    },
    {
      "age": 52,
      "charges": 24393.62,
      "bmi": 27.4,
      "smoker": "yes"
    },
    {
      "age": 52,
      "charges": 24869.84,
      "bmi": 24.3,
      "smoker": "yes"
    },
    {
      "age": 53,
      "charges": 10564.88,
      "bmi": 33.2,
      "smoker": "no"
    },
    {
      "age": 53,
      "charges": 21195.82,
      "bmi": 20.9,
      "smoker": "yes"
    },
    {
      "age": 53,
      "charges": 23244.79,
      "bmi": 22.9,
      "smoker": "yes"
    },
    {
      "age": 54,
      "charges": 25517.11,
      "bmi": 25.5,
      "smoker": "no"
    },
    {
      "age": 54,
      "charges": 48549.18,
      "bmi": 40.6,
      "smoker": "yes"
    },
    {
      "age": 55,
      "charges": 11394.07,
      "bmi": 35.2,
      "smoker": "no"
    },
    {
      "age": 55,
      "charges": 11881.97,
      "bmi": 30.1,
      "smoker": "no"
    },
    {
      "age": 55,
      "charges": 10214.64,
      "bmi": 29.9,
      "smoker": "no"
    },
    {
      "age": 55,
      "charges": 44423.8,
      "bmi": 35.2,
      "smoker": "yes"
    },
    {
      "age": 56,
      "charges": 11165.42,
      "bmi": 25.9,
      "smoker": "no"
    },
    {
      "age": 56,
      "charges": 11454.02,
      "bmi": 25.6,
      "smoker": "no"
    },
    {
      "age": 56,
      "charges": 22412.65,
      "bmi": 19.9,
      "smoker": "yes"
    },
    {
      "age": 57,
      "charges": 11566.3,
      "bmi": 40.9,
      "smoker": "no"
    },
    {
      "age": 57,
      "charges": 12029.29,
      "bmi": 22.2,
      "smoker": "no"
    },
    {
      "age": 57,
      "charges": 43578.94,
      "bmi": 31.2,
      "smoker": "yes"
    },
    {
      "age": 58,
      "charges": 11381.33,
      "bmi": 49.1,
      "smoker": "no"
    },
    {
      "age": 58,
      "charges": 11931.13,
      "bmi": 25.2,
      "smoker": "no"
    },
    {
      "age": 58,
      "charges": 24227.34,
      "bmi": 41.9,
      "smoker": "no"
    },
    {
      "age": 58,
      "charges": 12224.35,
      "bmi": 28.2,
      "smoker": "no"
    },
    {
      "age": 59,
      "charges": 12928.79,
      "bmi": 31.8,
      "smoker": "no"
    },
    {
      "age": 60,
      "charges": 52590.83,
      "bmi": 32.8,
      "smoker": "yes"
    },
    {
      "age": 60,
      "charges": 48173.36,
      "bmi": 39.9,
      "smoker": "yes"
    },
    {
      "age": 61,
      "charges": 14235.07,
      "bmi": 39.1,
      "smoker": "no"
    },
    {
      "age": 61,
      "charges": 47403.88,
      "bmi": 36.3,
      "smoker": "yes"
    },
    {
      "age": 62,
      "charges": 13352.1,
      "bmi": 30.0,
      "smoker": "no"
    },
    {
      "age": 62,
      "charges": 31620.0,
      "bmi": 36.9,
      "smoker": "no"
    },
    {
      "age": 62,
      "charges": 12982.87,
      "bmi": 39.9,
      "smoker": "no"
    },
    {
      "age": 62,
      "charges": 46718.16,
      "bmi": 30.9,
      "smoker": "yes"
    },
    {
      "age": 63,
      "charges": 13887.2,
      "bmi": 36.3,
      "smoker": "no"
    },
    {
      "age": 64,
      "charges": 14418.28,
      "bmi": 39.2,
      "smoker": "no"
    },
    {
      "age": 64,
      "charges": 16455.71,
      "bmi": 30.1,
      "smoker": "no"
    },
    {
      "age": 64,
      "charges": 47291.06,
      "bmi": 31.3,
      "smoker": "yes"
    }
  ],
  "ageTrends": [
    {
      "ageGroup": "18-21",
      "nonSmokerAvg": 3493.91,
      "smokerAvg": 25516.52,
      "overallAvg": 8172.29
    },
    {
      "ageGroup": "22-25",
      "nonSmokerAvg": 4911.72,
      "smokerAvg": 32062.67,
      "overallAvg": 10729.78
    },
    {
      "ageGroup": "26-29",
      "nonSmokerAvg": 5528.89,
      "smokerAvg": 26231.9,
      "overallAvg": 9445.68
    },
    {
      "ageGroup": "30-33",
      "nonSmokerAvg": 5471.08,
      "smokerAvg": 29457.78,
      "overallAvg": 11128.32
    },
    {
      "ageGroup": "34-37",
      "nonSmokerAvg": 6884.26,
      "smokerAvg": 32681.49,
      "overallAvg": 13269.71
    },
    {
      "ageGroup": "38-41",
      "nonSmokerAvg": 7363.15,
      "smokerAvg": 28013.71,
      "overallAvg": 10341.6
    },
    {
      "ageGroup": "42-45",
      "nonSmokerAvg": 8831.54,
      "smokerAvg": 33337.17,
      "overallAvg": 15737.67
    },
    {
      "ageGroup": "46-49",
      "nonSmokerAvg": 10269.74,
      "smokerAvg": 32216.05,
      "overallAvg": 14849.84
    },
    {
      "ageGroup": "50-53",
      "nonSmokerAvg": 12163.32,
      "smokerAvg": 35413.24,
      "overallAvg": 16408.96
    },
    {
      "ageGroup": "54-57",
      "nonSmokerAvg": 12855.54,
      "smokerAvg": 39596.9,
      "overallAvg": 16639.7
    },
    {
      "ageGroup": "58-61",
      "nonSmokerAvg": 14489.77,
      "smokerAvg": 42017.33,
      "overallAvg": 19077.7
    },
    {
      "ageGroup": "62-65",
      "nonSmokerAvg": 15100.13,
      "smokerAvg": 39061.17,
      "overallAvg": 20738.02
    }
  ],
  "modelWeights": {
    "intercept": 6881.82,
    "scaler": {
      "age": {
        "mean": 39.222,
        "scale": 14.039
      },
      "bmi": {
        "mean": 30.663,
        "scale": 6.098
      },
      "children": {
        "mean": 1.096,
        "scale": 1.205
      }
    },
    "coefficients": {
      "age_scaled": 3610.54,
      "is_female": 155.09,
      "bmi_scaled": 875.01,
      "children_scaled": 565.32,
      "is_smoker": 23863.84,
      "region_southeast": -394.18,
      "bmi_category_Obese": 2869.0,
      "region_northwest": 91.97
    }
  }
};
