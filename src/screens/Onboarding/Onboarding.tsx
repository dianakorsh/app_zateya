import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import OnboardingLayout from './OnboardingLayout'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import './Onboarding.css'

interface Props {
  onComplete: () => void;
}

const CITIES = ['Москва', 'Санкт-Петербург', 'Другой город']
const COMPANY_OPTIONS = ['один', 'в паре', 'семьёй', 'компанией']
const BUDGET_OPTIONS = ['без затрат', 'до 1 000 ₽', 'до 3 000 ₽', 'до 7 000 ₽']
const TIME_OPTIONS = ['утро', 'день', 'вечер']
const INTEREST_OPTIONS = [
  'еда и кафе',
  'прогулки и природа',
  'культура (кино, музеи, театры)',
  'активный отдых и спорт',
  'домашние активности',
  'ночная жизнь и бары',
]
const EXCLUDE_OPTIONS = [
  'алкоголь',
  'сильная физ. нагрузка',
  'много людей и шум',
  'дети',
  'семейные активности',
]

export default function Onboarding({ onComplete }: Props) {
  const { onboardingData, setOnboardingField, completeOnboarding } = useAppStore()
  const [step, setStep] = useState(1)
  const [citySheetOpen, setCitySheetOpen] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('left')

  const goNext = () => {
    setDirection('left')
    if (step < 6) setStep(s => s + 1)
    else { completeOnboarding(); onComplete() }
  }

  const goBack = () => {
    setDirection('right')
    if (step > 1) setStep(s => s - 1)
  }

  const toggleMulti = (field: 'interests' | 'excludes' | 'timeWeekend' | 'timeWeekdays', val: string) => {
    const arr = onboardingData[field] as string[]
    const next = arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
    setOnboardingField(field, next)
  }

  const toggleTime = (period: 'timeWeekend' | 'timeWeekdays', val: string) => {
    toggleMulti(period, val)
  }

  if (step === 1) return (
    <>
      <OnboardingLayout
        step={1} totalSteps={6}
        title="Где?" subtitle="Твой город"
        description="Мы подберём активности рядом с тобой"
        onNext={goNext} canProceed={true} ctaLabel="подтвердить"
        direction={direction}
      >
        <div className="city-display">
          <span className="city-label">ваш город</span>
          <span className="city-name">{onboardingData.city}</span>
          <button className="btn-ghost city-change" onClick={() => setCitySheetOpen(true)}>
            сменить город
          </button>
        </div>
      </OnboardingLayout>

      <BottomSheet open={citySheetOpen} onClose={() => setCitySheetOpen(false)} title="Выбери город">
        <div className="city-list">
          {CITIES.map(c => (
            <button
              key={c}
              className={`btn-option ${onboardingData.city === c ? 'selected' : ''}`}
              onClick={() => { setOnboardingField('city', c); setCitySheetOpen(false) }}
            >{c}</button>
          ))}
        </div>
      </BottomSheet>
    </>
  )

  if (step === 2) return (
    <OnboardingLayout
      step={2} totalSteps={6}
      title="С кем?" subtitle="Выбери состав"
      description="В какой компании чаще всего отдыхаешь"
      onNext={goNext} onBack={goBack} canProceed={!!onboardingData.company}
      direction={direction}
    >
      {COMPANY_OPTIONS.map(o => (
        <button
          key={o}
          className={`btn-option ${onboardingData.company === o ? 'selected' : ''}`}
          onClick={() => setOnboardingField('company', o)}
        >{o}</button>
      ))}
    </OnboardingLayout>
  )

  if (step === 3) return (
    <OnboardingLayout
      step={3} totalSteps={6}
      title="Сколько?" subtitle="Твой бюджет по умолчанию"
      description="Это не жёсткое ограничение, мы просто начнём с этого"
      onNext={goNext} onBack={goBack} canProceed={!!onboardingData.budget}
      direction={direction}
    >
      {BUDGET_OPTIONS.map(o => (
        <button
          key={o}
          className={`btn-option ${onboardingData.budget === o ? 'selected' : ''}`}
          onClick={() => setOnboardingField('budget', o)}
        >{o}</button>
      ))}
    </OnboardingLayout>
  )

  if (step === 4) return (
    <OnboardingLayout
      step={4} totalSteps={6}
      title="Когда?" subtitle="Подходящее время"
      description="Выбери когда ты обычно свободен"
      onNext={goNext} onBack={goBack}
      canProceed={onboardingData.timeWeekend.length > 0 || onboardingData.timeWeekdays.length > 0}
      onSkip={goNext}
      direction={direction}
    >
      <div className="time-block">
        <p className="time-block-label">на выходных</p>
        <div className="time-row">
          {TIME_OPTIONS.map(t => (
            <button
              key={t}
              className={`btn-option time-btn ${onboardingData.timeWeekend.includes(t) ? 'selected' : ''}`}
              onClick={() => toggleTime('timeWeekend', t)}
            >{t}</button>
          ))}
        </div>
      </div>
      <div className="time-block">
        <p className="time-block-label">на буднях</p>
        <div className="time-row">
          {TIME_OPTIONS.map(t => (
            <button
              key={t}
              className={`btn-option time-btn ${onboardingData.timeWeekdays.includes(t) ? 'selected' : ''}`}
              onClick={() => toggleTime('timeWeekdays', t)}
            >{t}</button>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  )

  if (step === 5) return (
    <OnboardingLayout
      step={5} totalSteps={6}
      title="Что?" subtitle="Выбери интересы"
      description="Можно выбрать несколько"
      onNext={goNext} onBack={goBack} canProceed={onboardingData.interests.length > 0}
      onSkip={goNext}
      direction={direction}
    >
      {INTEREST_OPTIONS.map(o => (
        <button
          key={o}
          className={`btn-option ${onboardingData.interests.includes(o) ? 'selected' : ''}`}
          onClick={() => toggleMulti('interests', o)}
        >{o}</button>
      ))}
    </OnboardingLayout>
  )

  return (
    <OnboardingLayout
      step={6} totalSteps={6}
      title="Убираем?" subtitle="Чего точно не хочешь"
      description="Мы не будем предлагать такие активности"
      onNext={() => { completeOnboarding(); onComplete() }}
      onBack={goBack}
      canProceed={true}
      ctaLabel="готово"
      onSkip={() => { completeOnboarding(); onComplete() }}
      direction={direction}
    >
      {EXCLUDE_OPTIONS.map(o => (
        <button
          key={o}
          className={`btn-option ${onboardingData.excludes.includes(o) ? 'selected' : ''}`}
          onClick={() => toggleMulti('excludes', o)}
        >{o}</button>
      ))}
    </OnboardingLayout>
  )
}
