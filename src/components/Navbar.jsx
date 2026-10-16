import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Activity, Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from './Button';

/**
 * Responsive Navigation bar with smooth scroll anchors, theme switcher, and mobile drawer.
 */
export function Navbar({ theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Set focus to the section or its first interactive element for accessibility
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand */}
          <a
            href="#hero"
            className="navbar-brand"
            onClick={(e) => handleScrollTo(e, 'hero')}
            aria-label="InsureIQ Home"
          >
            <div className="brand-icon-wrapper">
              <Activity size={20} strokeWidth={2.5} />
            </div>
            <span>InsureIQ</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li>
                <a
                  href="#overview"
                  className="nav-link"
                  onClick={(e) => handleScrollTo(e, 'overview')}
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#predictor"
                  className="nav-link"
                  onClick={(e) => handleScrollTo(e, 'predictor')}
                >
                  Predictor
                </a>
              </li>
              <li>
                <a
                  href="#insights"
                  className="nav-link"
                  onClick={(e) => handleScrollTo(e, 'insights')}
                >
                  Insights & Data
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="nav-link"
                  onClick={(e) => handleScrollTo(e, 'how-it-works')}
                >
                  How it Works
                </a>
              </li>
            </ul>
          </nav>

          {/* Right Action Items */}
          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Quick CTA */}
            <div style={{ display: 'none' }} className="d-sm-block">
              <Button
                size="sm"
                variant="primary"
                onClick={(e) => handleScrollTo(e, 'predictor')}
              >
                <span>Get Estimate</span>
                <ArrowUpRight size={14} />
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="theme-toggle-btn"
              style={{ display: 'flex' }}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: 'var(--space-4) 0',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            <a
              href="#predictor"
              className="nav-link"
              style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)' }}
              onClick={(e) => handleScrollTo(e, 'predictor')}
            >
              Predictor Form
            </a>
            <a
              href="#insights"
              className="nav-link"
              style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)' }}
              onClick={(e) => handleScrollTo(e, 'insights')}
            >
              Dataset Insights
            </a>
            <a
              href="#how-it-works"
              className="nav-link"
              style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)' }}
              onClick={(e) => handleScrollTo(e, 'how-it-works')}
            >
              Model Architecture & Limits
            </a>
            <div style={{ paddingTop: 'var(--space-2)' }}>
              <Button
                variant="primary"
                size="sm"
                style={{ width: '100%' }}
                onClick={(e) => handleScrollTo(e, 'predictor')}
              >
                <span>Get My Estimate</span>
                <ArrowUpRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .d-sm-block {
            display: block !important;
          }
        }
        @media (min-width: 768px) {
          .nav-actions button:last-child {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

Navbar.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
