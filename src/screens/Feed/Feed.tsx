import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { Activity, ACTIVITIES } from '../../data/activities'
import SwipeCard from '../../components/SwipeCard/SwipeCard'
import PaywallOverlay from '../../components/PaywallOverlay/PaywallOverlay'
import ActivityDetail from './ActivityDetail'
import './Feed.css'

const FREE_SWIPES = 10

export default function Feed() {
  const { likeActivity, skipActivity, swipeCount, isPremium, planActivity } = useAppStore()
  const [cards, setCards] = useState<Activity[]>([...ACTIVITIES])
  const [expanded, setExpanded] = useState<Activity | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)

  const handleLike = (id: number) => {
    if (!isPremium && swipeCount >= FREE_SWIPES) { setShowPaywall(true); return }
    likeActivity(id)
    setCards(prev => prev.filter(c => c.id !== id))
    if (!isPremium && swipeCount + 1 >= FREE_SWIPES) setShowPaywall(true)
  }

  const handleSkip = (id: number) => {
    if (!isPremium && swipeCount >= FREE_SWIPES) { setShowPaywall(true); return }
    skipActivity(id)
    setCards(prev => prev.filter(c => c.id !== id))
    if (!isPremium && swipeCount + 1 >= FREE_SWIPES) setShowPaywall(true)
  }

  const handlePlan = (id: number) => {
    const today = new Date().toISOString().split('T')[0]
    planActivity(id, today)
    setExpanded(null)
  }

  if (expanded) return (
    <ActivityDetail
      activity={expanded}
      onBack={() => setExpanded(null)}
      onSkip={() => { handleSkip(expanded.id); setExpanded(null) }}
      onPlan={() => handlePlan(expanded.id)}
    />
  )

  return (
    <div className="feed-screen">
      <div className="feed-header">
        <span />
        <h1 className="feed-title">Активности</h1>
        <button className="feed-filter">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="4" y1="7" x2="20" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="12" x2="20" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="17" x2="20" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="7" r="2.5" fill="#0D0D0D" stroke="white" strokeWidth="1.5" />
            <circle cx="16" cy="12" r="2.5" fill="#0D0D0D" stroke="white" strokeWidth="1.5" />
            <circle cx="10" cy="17" r="2.5" fill="#0D0D0D" stroke="white" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <div className="feed-stack-area">
        {cards.length === 0 ? (
          <div className="feed-empty">
            <p>Все активности просмотрены 🎉</p>
            <p className="feed-empty-sub">Скоро добавим новые</p>
          </div>
        ) : (
          <div className="feed-stack">
            {showPaywall && !isPremium ? (
              <div className="paywall-card-wrap">
                <div className="paywall-preview" style={{
                  backgroundImage: `url(${cards[0]?.image})`,
                  filter: 'blur(8px)',
                  transform: 'scale(1.05)',
                }} />
                <PaywallOverlay onClose={() => setShowPaywall(false)} />
              </div>
            ) : (
              cards.slice(0, 3).map((activity, i) => (
                <SwipeCard
                  key={activity.id}
                  activity={activity}
                  index={i}
                  onLike={handleLike}
                  onSkip={handleSkip}
                  onExpand={setExpanded}
                />
              )).reverse()
            )}
          </div>
        )}

        {!isPremium && swipeCount > 0 && !showPaywall && (
          <div className="feed-counter">
            {Math.max(0, FREE_SWIPES - swipeCount)} бесплатных свайпов
          </div>
        )}
      </div>
    </div>
  )
}
