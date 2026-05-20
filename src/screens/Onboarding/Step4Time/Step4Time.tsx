import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import { useAppStore } from '../../../store/appStore';
import './Step4Time.css';

const TIME_OPTIONS = ['утро', 'день', 'вечер'];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step4Time({ onNext, onBack }: Props) {
  const { onboardingData, setOnboardingField } = useAppStore();
  const [weekend, setWeekend] = useState<string[]>(onboardingData.timeWeekend || []);
  const [weekdays, setWeekdays] = useState<string[]>(onboardingData.timeWeekdays || []);

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const handleWeekend = (t: string) => {
    const next = toggle(weekend, t);
    setWeekend(next);
    setOnboardingField('timeWeekend', next);
  };

  const handleWeekdays = (t: string) => {
    const next = toggle(weekdays, t);
    setWeekdays(next);
    setOnboardingField('timeWeekdays', next);
  };

  const hasSelection = weekend.length > 0 || weekdays.length > 0;

  return (
    <OnboardingLayout
      step={4}
      totalSteps={6}
      title="Когда?"
      subtitle="Подходящее время"
      onBack={onBack}
      cta={
        hasSelection ? (
          <button className="btn-primary ob-cta-appear" onClick={onNext}>
            продолжить →
          </button>
        ) : undefined
      }
      onSkip={onNext}
    >
      <div className="time-section">
        <p className="time-section-label">на выходных</p>
        <div className="time-row">
          {TIME_OPTIONS.map((t) => (
            <button
              key={t}
              className={`btn-option time-btn ${weekend.includes(t) ? 'selected' : ''}`}
              onClick={() => handleWeekend(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="time-section">
        <p className="time-section-label">на буднях</p>
        <div className="time-row">
          {TIME_OPTIONS.map((t) => (
            <button
              key={t}
              className={`btn-option time-btn ${weekdays.includes(t) ? 'selected' : ''}`}
              onClick={() => handleWeekdays(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
}
