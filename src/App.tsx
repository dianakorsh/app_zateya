import { useState, useEffect } from 'react'
import { useAppStore } from './store/appStore'
import Splash from './screens/Splash/Splash'
import Start from './screens/Start/Start'
import Onboarding from './screens/Onboarding/Onboarding'
import Feed from './screens/Feed/Feed'
import Search from './screens/Search/Search'
import My from './screens/My/My'
import Profile from './screens/Profile/Profile'
import Tabbar from './components/Tabbar/Tabbar'

type Route = 'splash' | 'start' | 'onboarding' | 'app'

export default function App() {
  const { isOnboardingComplete, currentTab } = useAppStore()
  const [route, setRoute] = useState<Route>('splash')

  useEffect(() => {
    if (isOnboardingComplete && route === 'splash') {
      setRoute('app')
    }
  }, [])

  const renderScreen = () => {
    switch (route) {
      case 'splash':
        return (
          <Splash
            onDone={() => {
              if (isOnboardingComplete) setRoute('app')
              else setRoute('start')
            }}
          />
        )
      case 'start':
        return <Start onStart={() => setRoute('onboarding')} />
      case 'onboarding':
        return <Onboarding onComplete={() => setRoute('app')} />
      case 'app':
        return (
          <div className="screen-with-tabs">
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              {currentTab === 'feed' && <Feed />}
              {currentTab === 'search' && <Search />}
              {currentTab === 'my' && <My />}
              {currentTab === 'profile' && <Profile />}
            </div>
            <Tabbar />
          </div>
        )
    }
  }

  return <>{renderScreen()}</>
}
