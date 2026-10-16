import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PredictorSection } from './components/PredictorSection';
import { OverviewDashboard } from './components/OverviewDashboard';
import { InsightsSection } from './components/InsightsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useTheme } from './hooks/useTheme';
import { usePrediction } from './hooks/usePrediction';
import { STATS_DATA } from './data/statsData';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const predictionState = usePrediction();
  const [toastMessage, setToastMessage] = useState(null);

  const handleScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
  };

  const handlePredict = async (formValues) => {
    try {
      await predictionState.predict(formValues);
    } catch (err) {
      setToastMessage('Error generating estimate. Please try again.');
    }
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        {/* Main Content Landmark */}
        <main id="main-content" className="main-content" tabIndex={-1}>
          {/* 1. Hero Section */}
          <HeroSection
            onGetEstimate={() => handleScrollTo('predictor')}
            onExploreData={() => handleScrollTo('overview')}
          />

          {/* 2. Self-Contained Overview Dashboard */}
          <section id="overview" className="section" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="container">
              <OverviewDashboard />
            </div>
          </section>

          {/* 3. Core Predictor Section */}
          <PredictorSection
            predictionState={predictionState}
            onPredict={handlePredict}
            onReset={predictionState.reset}
            onShowToast={(msg) => setToastMessage(msg)}
          />

          {/* 4. Deep-Dive Insights Section */}
          <InsightsSection stats={STATS_DATA} />

          {/* 4. How It Works Pipeline */}
          <HowItWorksSection />
        </main>

        {/* 5. Footer Landmark */}
        <Footer />

        {/* Floating Toast Notification */}
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
