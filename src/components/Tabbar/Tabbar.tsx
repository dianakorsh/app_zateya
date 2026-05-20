import React from 'react'
import { useAppStore } from '../../store/appStore'
import './Tabbar.css'

const IconFeed = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V8C21 9.10457 20.1046 10 19 10H5C3.89543 10 3 9.10457 3 8V6Z"
      fill={active ? '#FF7133' : '#555'} />
    <path d="M3 14C3 12.8954 3.89543 12 5 12H11C12.1046 12 13 12.8954 13 14V18C13 19.1046 12.1046 20 11 20H5C3.89543 20 3 19.1046 3 18V14Z"
      fill={active ? '#FF7133' : '#555'} />
    <path d="M16 12C16 12 21 12 21 17C21 19.2091 19.2091 20 17 20C15.3431 20 15 19.2091 15 19.2091"
      stroke={active ? '#FF7133' : '#555'} strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="16" r="3" fill={active ? '#FF7133' : '#555'} />
  </svg>
)

const IconSearch = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={active ? '#7E2FFF' : '#555'} strokeWidth="2.2" />
    <path d="M16.5 16.5L21 21" stroke={active ? '#7E2FFF' : '#555'} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M8.5 11H13.5M11 8.5V13.5" stroke={active ? '#7E2FFF' : '#555'} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const IconMy = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={active ? '#EDAFF6' : '#555'} />
  </svg>
)

const IconProfile = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={active ? '#CCE84B' : '#555'} />
    <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={active ? '#CCE84B' : '#555'} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
)

const TABS = [
  { key: 'feed' as const, label: 'затеи', Icon: IconFeed, color: '#FF7133' },
  { key: 'search' as const, label: 'поиск', Icon: IconSearch, color: '#7E2FFF' },
  { key: 'my' as const, label: 'моё', Icon: IconMy, color: '#EDAFF6' },
  { key: 'profile' as const, label: 'био', Icon: IconProfile, color: '#CCE84B' },
]

export default function Tabbar() {
  const { currentTab, setCurrentTab } = useAppStore()

  return (
    <nav className="tabbar">
      <svg className="tabbar-wave" viewBox="0 0 390 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,20 L0,12 Q30,0 60,10 Q90,20 120,10 Q150,0 180,10 Q210,20 240,10 Q270,0 300,10 Q330,20 360,10 Q375,4 390,8 L390,20 Z"
          fill="#0D0D0D" />
      </svg>
      <div className="tabbar-inner">
        {TABS.map(({ key, label, Icon, color }) => {
          const active = currentTab === key
          return (
            <button
              key={key}
              className={`tab-btn ${active ? 'active' : ''}`}
              style={{ '--tab-color': color } as React.CSSProperties}
              onClick={() => setCurrentTab(key)}
            >
              <span className="tab-icon">
                <Icon active={active} />
              </span>
              <span className="tab-label">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
