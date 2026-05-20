import { useState, useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import { Activity } from '../../data/activities'
import './SwipeCard.css'

interface Props {
  activity: Activity;
  index: number;
  onLike: (id: number) => void;
  onSkip: (id: number) => void;
  onExpand: (activity: Activity) => void;
}

const SWIPE_THRESHOLD = 100

export default function SwipeCard({ activity, index, onLike, onSkip, onExpand }: Props) {
  const [gone, setGone] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const [{ x, rot, scale, opacity }, api] = useSpring(() => ({
    x: 0, rot: 0,
    scale: index === 0 ? 1 : index === 1 ? 0.95 : 0.90,
    opacity: 1,
    config: { tension: 300, friction: 30 }
  }))

  const bind = useDrag(({ active, movement: [mx], velocity: [vx], first, last }) => {
    if (index !== 0) return
    if (first) { isDragging.current = false; startX.current = mx }

    if (Math.abs(mx) > 5) isDragging.current = true

    const trigger = Math.abs(mx) > SWIPE_THRESHOLD || Math.abs(vx) > 0.5

    if (!active && trigger) {
      const dir = mx > 0 ? 1 : -1
      api.start({
        x: dir * 600,
        rot: dir * 20,
        opacity: 0,
        config: { tension: 200, friction: 20 }
      })
      setGone(true)
      setTimeout(() => {
        if (dir > 0) onLike(activity.id)
        else onSkip(activity.id)
      }, 200)
    } else if (!active) {
      api.start({ x: 0, rot: 0, scale: 1 })
    } else {
      api.start({
        x: mx,
        rot: mx / 20,
        scale: 1,
        immediate: true
      })
    }
  })

  const handleTap = () => {
    if (!isDragging.current) onExpand(activity)
  }

  if (gone) return null

  const zIndex = 10 - index
  const translateY = index === 0 ? 0 : index === 1 ? 8 : 16

  const likeOpacity = x.to(v => Math.max(0, v / 150))
  const skipOpacity = x.to(v => Math.max(0, -v / 150))

  return (
    <animated.div
      {...(index === 0 ? bind() : {})}
      className="swipe-card-wrapper"
      style={{
        zIndex,
        x: index === 0 ? x : 0,
        rotate: index === 0 ? rot : 0,
        scale,
        translateY,
        touchAction: 'none',
      }}
      onClick={handleTap}
    >
      <div className="swipe-card">
        <div className="card-image-wrap">
          <img src={activity.image} alt={activity.title} loading="lazy" />
          {index === 0 && (
            <>
              <animated.div className="card-overlay like" style={{ opacity: likeOpacity }}>
                <span>♥</span>
              </animated.div>
              <animated.div className="card-overlay skip" style={{ opacity: skipOpacity }}>
                <span>✕</span>
              </animated.div>
            </>
          )}
        </div>
        <div className="card-info">
          <div className="card-meta-row">
            <span className="card-meta">{activity.category} · {activity.audience}</span>
            <button className="card-heart" onClick={e => { e.stopPropagation(); onLike(activity.id) }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#EDAFF6" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </div>
          <h3 className="card-title">{activity.title}</h3>
          <div className="card-bottom">
            <div className="card-schedule-price">
              <span className="card-schedule">{activity.schedule}</span>
              <span className="card-price">
                {activity.price === 0 ? 'бесплатно' : `от ${activity.price.toLocaleString()} ₽`}
              </span>
            </div>
            <span className="card-distance">{activity.distance} км</span>
          </div>
        </div>
      </div>
    </animated.div>
  )
}
