import './Tabbar.css';

type Tab = 'feed' | 'search' | 'my' | 'profile';

interface TabbarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; color: string }[] = [
  { id: 'feed', label: 'затеи', color: '#FF7133' },
  { id: 'search', label: 'поиск', color: '#7E2FFF' },
  { id: 'my', label: 'моё', color: '#EDAFF6' },
  { id: 'profile', label: 'био', color: '#CCE84B' },
];

function FeedIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={color === '#FF7133' ? `${color}33` : 'none'} />
    </svg>
  );
}

function SearchIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M20 20L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MyIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={color === '#EDAFF6' ? `${color}33` : 'none'} />
    </svg>
  );
}

function ProfileIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const icons = {
  feed: FeedIcon,
  search: SearchIcon,
  my: MyIcon,
  profile: ProfileIcon,
};

export default function Tabbar({ active, onChange }: TabbarProps) {
  return (
    <div className="tabbar">
      <svg className="tabbar-wave" viewBox="0 0 390 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,10 C30,0 60,20 97.5,10 C135,0 165,20 195,10 C225,0 255,20 292.5,10 C330,0 360,20 390,10 L390,20 L0,20 Z" fill="#0D0D0D" />
      </svg>
      <div className="tabbar-inner">
        {tabs.map((tab) => {
          const Icon = icons[tab.id];
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              className={`tabbar-tab ${isActive ? 'active' : ''}`}
              onClick={() => onChange(tab.id)}
              style={{ '--tab-color': tab.color } as React.CSSProperties}
            >
              <span className="tabbar-icon">
                <Icon color={isActive ? tab.color : '#555'} />
              </span>
              <span className="tabbar-label" style={{ color: isActive ? tab.color : '#555' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
