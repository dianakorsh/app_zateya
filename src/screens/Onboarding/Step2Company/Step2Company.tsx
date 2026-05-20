import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import { useAppStore } from '../../../store/appStore';

const OPTIONS = ['один', 'в паре', 'семьёй', 'компанией'];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Company({ onNext, onBack }: Props) {
  const { onboardingData, setOnboardingField } = useAppStore();
  const [selected, setSelected] = useState(onboardingData.company || '');

  const handleSelect = (opt: string) => {
    setSelected(opt);
    setOnboardingField('company', opt);
  };

  return (
    <OnboardingLayout
      step={2}
      totalSteps={6}
      title="С кем?"
      subtitle="Выбери состав"
      description="В какой компании чаще всего отдыхаешь"
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
