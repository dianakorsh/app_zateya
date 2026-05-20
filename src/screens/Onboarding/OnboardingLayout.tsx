import React, { useState } from 'react'
import './OnboardingLayout.css'

interface Props {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  description?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  canProceed: boolean;
  ctaLabel?: string;
  direction?: 'left' | 'right';
}

export default function OnboardingLayout({
  step, totalSteps, title, subtitle, description,
  children, onNext, onBack, onSkip, canProceed, ctaLabel = 'продолжить', direction = 'left'
}: Props) {
  return (
    <div className={`ob-screen onboarding-bg ob-anim-${direction}`}>
      <div className="ob-top">
        {onBack && (
          <button className="ob-back" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div className="progress-bar" style={{ flex: 1 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`progress-bar-segment ${i < step - 1 ? 'done' : i === step - 1 ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="ob-header">
        <h1 className="ob-title">{title}</h1>
        <h2 className="ob-subtitle">{subtitle}</h2>
        {description && <p className="ob-description">{description}</p>}
      </div>

      <div className="ob-content scroll-area">
        {children}
      </div>

      <div className={`ob-footer ${canProceed ? 'visible' : ''}`}>
        <button className="btn-primary" onClick={onNext} disabled={!canProceed}>
          {ctaLabel}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M11 5L16 10L11 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {onSkip && (
          <button className="btn-ghost" onClick={onSkip}>пропустить</button>
        )}
      </div>
    </div>
  )
}
