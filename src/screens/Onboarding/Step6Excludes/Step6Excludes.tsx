import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import { useAppStore } from '../../../store/appStore';

const OPTIONS = [
  'алкоголь',
  'сильная физ. нагрузка',
  'много людей и шум',
  'дети',
  'семейные активности',
];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step6Excludes({ onNext, onBack }: Props) {
  const { onboardingData, setOnboardingField } = useAppStore();
  const [selected, setSelected] = useState<string[]>(onboardingData.excludes || []);

  const toggle = (opt: string) => {
    const next = selected.includes(opt)
      ? selected.filter((v) => v !== opt)
      : [...selected, opt];
    setSelected(next);
    setOnboardingField('excludes', next);
  };

  return (
    <OnboardingLayout
      step={6}
      totalSteps={6}
      title="Убираем?"
      subtitle="Выбери чего точно не хочешь"
      onBack={onBack}
      cta={
        <button className="btn-primary ob-cta-appear" onClick={onNext}>
          готово →
        </button>
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
