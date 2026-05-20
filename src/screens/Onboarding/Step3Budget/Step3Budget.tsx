import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import { useAppStore } from '../../../store/appStore';

const OPTIONS = ['без затрат', 'до 1 000 ₽', 'до 3 000 ₽', 'до 7 000 ₽'];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Budget({ onNext, onBack }: Props) {
  const { onboardingData, setOnboardingField } = useAppStore();
  const [selected, setSelected] = useState(onboardingData.budget || '');

  const handleSelect = (opt: string) => {
    setSelected(opt);
    setOnboardingField('budget', opt);
  };

  return (
    <OnboardingLayout
      step={3}
      totalSteps={6}
      title="Сколько?"
      subtitle="Твой бюджет по умолчанию"
      description="Это не жёсткое ограничение, мы просто начнём с этого"
      onBack={onBack}
      cta={
        selected ? (
          <button className="btn-primary ob-cta-appear" onClick={onNext}>
            продолжить →
          </button>
        ) : undefined
      }
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          className={`btn-option ${selected === opt ? 'selected' : ''}`}
          onClick={() => handleSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </OnboardingLayout>
  );
}
