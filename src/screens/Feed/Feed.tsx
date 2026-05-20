import { useState } from 'react';
import SwipeCard from '../../components/SwipeCard/SwipeCard';
import PaywallOverlay from '../../components/PaywallOverlay/PaywallOverlay';
import ActivityDetail from './ActivityDetail';
import { useAppStore } from '../../store/appStore';
import { ACTIVITIES } from '../../data/activities';
import './Feed.css';

const FREE_SWIPES = 10;

export default function Feed() {
  const { likeActivity, skipActivity, swipeCount, isPremium } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const visibleCards = ACTIVITIES.slice(currentIndex, currentIndex + 3);
  const isLimitReached = swipeCount >= FREE_SWIPES && !isPremium;

  const handleLike = () => {
    if (isLimitReached) { setShowPaywall(true); return; }
    const activity = ACTIVITIES[currentIndex];
    if (activity) likeActivity(activity.id);
    setCurrentIndex((i) => Math.min(i + 1, ACTIVITIES.length - 1));
  };

  const handleSkip = () => {
    if (isLimitReached) { setShowPaywall(true); return; }
    const activity = ACTIVITIES[currentIndex];
    if (activity) skipActivity(activity.id);
    setCurrentIndex((i) => Math.min(i + 1, ACTIVITIES.length - 1));
  };

  const handleTap = (id: number) => {
    setSelectedActivity(id);
  };

  if (selectedActivity !== null) {
    const activity = ACTIVITIES.find((a) => a.id === selectedActivity);
    if (activity) {
      return <ActivityDetail activity={activity} onClose={() => setSelectedActivity(null)} />;
    }
  }

  return (
    <div className="feed screen">
      <div className="feed-header">
        <h1 className="feed-title">Активности</h1>
        <button className="feed-filter">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M7 12h10M10 18h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="7" cy="6" r="1.5" fill="var(--accent-orange)" />
            <circle cx="14" cy="12" r="1.5" fill="var(--accent-orange)" />
            <circle cx="11" cy="18" r="1.5" fill="var(--accent-orange)" />
          </svg>
        </button>
      </div>

      <div className="feed-stack">
        {isLimitReached && (
          <div className="feed-blur-card">
            <div className="feed-blur-img" style={{ backgroundImage: `url(${ACTIVITIES[currentIndex % ACTIVITIES.length]?.image})` }} />
          </div>
        )}

        {!isLimitReached && visibleCards.map((activity, idx) => (
          <SwipeCard
            key={`${activity.id}-${currentIndex}`}
            activity={activity}
            stackIndex={idx}
            isTop={idx === 0}
            onLike={handleLike}
            onSkip={handleSkip}
            onTap={() => handleTap(activity.id)}
          />
        ))}

        {!isLimitReached && currentIndex >= ACTIVITIES.length && (
          <div className="feed-empty">
            <p>Всё посмотрели!</p>
            <p className="feed-empty-sub">Попробуй изменить настройки поиска</p>
          </div>
        )}
      </div>

      {showPaywall && <PaywallOverlay onClose={() => setShowPaywall(false)} />}
    </div>
  );
}
