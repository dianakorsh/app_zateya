import type { ReactNode } from 'react';
import './OnboardingLayout.css';

interface OnboardingLayoutProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  description?: string;
  children: ReactNode;
  cta?: ReactNode;
  onSkip?: () => void;
  onBack?: () => void;
}

export default function OnboardingLayout({
  step,
  totalSteps,
  title,
  subtitle,
  description,
  children,
  cta,
  onSkip,
  onBack,
}: OnboardingLayoutProps) {
  return (
    <div className="ob-screen screen">
      <div className="ob-blob ob-blob-1" />
      <div className="ob-blob ob-blob-2" />
      <div className="ob-blob ob-blob-3" />

      <div className="ob-content">
        <div className="ob-header">
          {onBack && (
            <button className="ob-back" onClick={onBack}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <div className="ob-progress">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`ob-dot ${i < step ? 'done' : ''} ${i === step - 1 ? 'active' : ''}`} />
            ))}
          </div>
        </div>

        <div className="ob-text">
          <h1 className="ob-title">{title}</h1>
          <h2 className="ob-subtitle">{subtitle}</h2>
          {description && <p className="ob-description">{description}</p>}
        </div>

        <div className="ob-body">{children}</div>
      </div>

      {(cta || onSkip) && (
        <div className="ob-footer">
          {cta}
          {onSkip && (
            <button className="btn-ghost" onClick={onSkip}>
              пропустить
            </button>
          )}
        </div>
      )}
    </div>
  );
}
