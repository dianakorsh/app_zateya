import { useState, useEffect } from 'react';
import { useAppStore } from './store/appStore';
import Splash from './screens/Splash/Splash';
import Start from './screens/Start/Start';
import Step1City from './screens/Onboarding/Step1City/Step1City';
import Step2Company from './screens/Onboarding/Step2Company/Step2Company';
import Step3Budget from './screens/Onboarding/Step3Budget/Step3Budget';
import Step4Time from './screens/Onboarding/Step4Time/Step4Time';
import Step5Interests from './screens/Onboarding/Step5Interests/Step5Interests';
import Step6Excludes from './screens/Onboarding/Step6Excludes/Step6Excludes';
import Feed from './screens/Feed/Feed';
import Search from './screens/Search/Search';
import My from './screens/My/My';
import Profile from './screens/Profile/Profile';
import Tabbar from './components/Tabbar/Tabbar';
import './styles/globals.css';

type AppScreen =
  | 'splash'
  | 'start'
  | 'onboarding-1'
  | 'onboarding-2'
  | 'onboarding-3'
  | 'onboarding-4'
  | 'onboarding-5'
  | 'onboarding-6'
  | 'app';

type AppTab = 'feed' | 'search' | 'my' | 'profile';

export default function App() {
  const { isOnboardingComplete, completeOnboarding } = useAppStore();
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState<AppTab>('feed');

  useEffect(() => {
    if (screen === 'splash') return;
    if (isOnboardingComplete && screen !== 'app') {
      setScreen('app');
    }
  }, [isOnboardingComplete, screen]);

  const goTo = (s: AppScreen) => setScreen(s);

  const handleSplashDone = () => {
    if (isOnboardingComplete) {
      setScreen('app');
    } else {
      setScreen('start');
    }
  };

  const handleFinishOnboarding = () => {
    completeOnboarding();
    setScreen('app');
  };

  if (screen === 'splash') return <Splash onDone={handleSplashDone} />;
  if (screen === 'start') return <Start onStart={() => goTo('onboarding-1')} />;
  if (screen === 'onboarding-1') return <Step1City onNext={() => goTo('onboarding-2')} />;
  if (screen === 'onboarding-2') return <Step2Company onNext={() => goTo('onboarding-3')} onBack={() => goTo('onboarding-1')} />;
  if (screen === 'onboarding-3') return <Step3Budget onNext={() => goTo('onboarding-4')} onBack={() => goTo('onboarding-2')} />;
  if (screen === 'onboarding-4') return <Step4Time onNext={() => goTo('onboarding-5')} onBack={() => goTo('onboarding-3')} />;
  if (screen === 'onboarding-5') return <Step5Interests onNext={() => goTo('onboarding-6')} onBack={() => goTo('onboarding-4')} />;
  if (screen === 'onboarding-6') return <Step6Excludes onNext={handleFinishOnboarding} onBack={() => goTo('onboarding-5')} />;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden' }}>
      {activeTab === 'feed' && <Feed />}
      {activeTab === 'search' && <Search />}
      {activeTab === 'my' && <My />}
      {activeTab === 'profile' && <Profile />}
      <Tabbar active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
