import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import { useAppStore } from '../../../store/appStore';
import './Step1City.css';

const CITIES = ['Москва', 'Санкт-Петербург', 'Другой город'];

interface Props {
  onNext: () => void;
  onBack?: () => void;
}

export default function Step1City({ onNext, onBack }: Props) {
  const { onboardingData, setOnboardingField } = useAppStore();
  const [sheetOpen, setSheetOpen] = useState(false);
  const city = onboardingData.city || 'Москва';

  const handleConfirm = () => {
    setOnboardingField('city', city);
    onNext();
  };

  const handleSelectCity = (c: string) => {
    setOnboardingField('city', c);
    setSheetOpen(false);
  };

  return (
    <>
      <OnboardingLayout
        step={1}
        totalSteps={6}
        title="Где?"
        subtitle="Твой город"
        description="Мы подберём активности рядом с тобой"
        onBack={onBack}
        cta={
          <button className="btn-primary ob-cta-appear" onClick={handleConfirm}>
            подтвердить →
          </button>
        }
      >
        <div className="city-block">
          <span className="city-label">ваш город</span>
          <span className="city-name">{city}</span>
          <button className="city-change" onClick={() => setSheetOpen(true)}>
            сменить город
          </button>
        </div>
      </OnboardingLayout>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Выбери город">
        <div className="city-sheet-list">
          {CITIES.map((c) => (
            <button
              key={c}
              className={`btn-option ${city === c ? 'selected' : ''}`}
              onClick={() => handleSelectCity(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
