import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import { useAppStore } from '../../../store/appStore';

const OPTIONS = [
  'еда и кафе',
  'прогулки и природа',
  'культура (кино, музеи, театры)',
  'активный отдых и спорт',
  'домашние активности',
  'ночная жизнь и бары',
];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step5Interests({ onNext, onBack }: Props) {
  const { onboardingData, setOnboardingField } = useAppStore();
  const [selected, setSelected] = useState<string[]>(onboardingData.interests || []);

  const toggle = (opt: string) => {
    const next = selected.includes(opt)
      ? selected.filter((v) => v !== opt)
      : [...selected, opt];
    setSelected(next);
    setOnboardingField('interests', next);
  };

  return (
    <OnboardingLayout
      step={5}
      totalSteps={6}
      title="Что?"
      subtitle="Выбери подходящие интересы"
      onBack={onBack}
      cta={
        selected.length > 0 ? (
          <button className="btn-primary ob-cta-appear" onClick={onNext}>
            продолжить →
          </button>
        ) : undefined
      }
      onSkip={onNext}
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          className={`btn-option ${selected.includes(opt) ? 'selected' : ''}`}
          onClick={() => toggle(opt)}
        >
          {opt}
        </button>
      ))}
    </OnboardingLayout>
  );
}
