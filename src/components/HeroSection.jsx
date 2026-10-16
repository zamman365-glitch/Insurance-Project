import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDown, BarChart3, Calculator, Sparkles, Database } from 'lucide-react';
import { Button } from './Button';

/**
 * Hero section with headline, description, primary CTA, and quick metrics strip.
 */
export function HeroSection({ onGetEstimate, onExploreData }) {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-glow-bg" aria-hidden="true" />
      <div className="container">
        <div className="hero-content">
          {/* Tag Pill */}
          <div className="hero-pill">
            <span className="hero-pill-indicator" />
            <span>Kaggle Healthcare Regression Dataset (1,337 Records)</span>
          </div>

          {/* Headline */}
          <h1 id="hero-heading" className="hero-headline">
            Transparent Medical Insurance Cost Estimator
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            Demystify healthcare pricing with machine learning. Get instant, actuarially-grounded
            annual premium projections with clear feature contribution breakdowns.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <Button
              size="lg"
              variant="primary"
              onClick={onGetEstimate}
              icon={Calculator}
            >
              Get My Estimate
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={onExploreData}
              icon={BarChart3}
            >
              Explore Insights Dashboard
            </Button>
          </div>

          {/* Stats Preview Strip */}
          <div className="hero-stats-strip" role="region" aria-label="Dataset Highlights">
            <div className="hero-stat-item">
              <span className="hero-stat-value">1,337</span>
              <span className="hero-stat-label">Verified Records</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">0.798</span>
              <span className="hero-stat-label">Adjusted R² Score</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">$13,279</span>
              <span className="hero-stat-label">Average Annual Charge</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">&lt; 1 sec</span>
              <span className="hero-stat-label">Instant Inference</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  onGetEstimate: PropTypes.func.isRequired,
  onExploreData: PropTypes.func.isRequired,
};
