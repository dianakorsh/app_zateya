import { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import type { Activity } from '../../data/activities';
import './SwipeCard.css';

interface SwipeCardProps {
  activity: Activity;
  stackIndex: number;
  onLike: () => void;
  onSkip: () => void;
  onTap: () => void;
  isTop: boolean;
}

const SWIPE_THRESHOLD = 100;

export default function SwipeCard({ activity, stackIndex, onLike, onSkip, onTap, isTop }: SwipeCardProps) {
  const isDragging = useRef(false);
  const startX = useRef(0);

  const scaleByIndex = [1, 0.95, 0.9];
  const yByIndex = [0, 10, 20];
  const scale = scaleByIndex[stackIndex] ?? 0.85;
  const yOffset = yByIndex[stackIndex] ?? 30;

  const [spring, api] = useSpring(() => ({
    x: 0,
    y: yOffset,
    rotate: 0,
    scale,
    opacity: 1,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx], direction: [dx], first }) => {
      if (!isTop) return;

      if (first) {
        isDragging.current = false;
        startX.current = mx;
      }

      if (Math.abs(mx) > 5) {
        isDragging.current = true;
      }

      const rotate = mx / 12;
      const gone = Math.abs(mx) > SWIPE_THRESHOLD || (Math.abs(vx) > 0.5 && Math.abs(mx) > 50);

      if (!active && gone) {
        const dir = dx > 0 ? 1 : -1;
        api.start({
          x: dir * 600,
          rotate: dir * 20,
          opacity: 0,
          config: { tension: 200, friction: 20 },
        });
        setTimeout(() => {
          if (dir > 0) onLike();
          else onSkip();
        }, 250);
      } else if (!active) {
        api.start({ x: 0, y: yOffset, rotate: 0, scale, opacity: 1 });
      } else {
        api.start({ x: mx, rotate, scale: 1, y: 0, immediate: true });
      }
    },
    { filterTaps: true, axis: 'x' }
  );

  const likeOpacity = spring.x.to((x) => Math.max(0, Math.min(1, x / SWIPE_THRESHOLD)));
  const skipOpacity = spring.x.to((x) => Math.max(0, Math.min(1, -x / SWIPE_THRESHOLD)));

  const handleClick = () => {
    if (!isDragging.current) {
      onTap();
    }
  };

  return (
    <animated.div
      {...(isTop ? bind() : {})}
      className="swipe-card"
      style={{
        x: spring.x,
        y: spring.y,
        rotate: spring.rotate,
        scale: spring.scale,
        opacity: spring.opacity,
        zIndex: 10 - stackIndex,
        touchAction: 'none',
      }}
      onClick={handleClick}
    >
      <div className="swipe-card-photo" style={{ backgroundImage: `url(${activity.image})` }}>
        <animated.div className="swipe-overlay like-overlay" style={{ opacity: likeOpacity }}>
          <span className="overlay-icon">❤️</span>
        </animated.div>
        <animated.div className="swipe-overlay skip-overlay" style={{ opacity: skipOpacity }}>
          <span className="overlay-icon">✕</span>
        </animated.div>
      </div>
      <div className="swipe-card-info">
        <div className="swipe-card-top-row">
          <div className="swipe-card-meta">
            <span className="swipe-card-category">{activity.category}</span>
            <span className="swipe-card-dot">·</span>
            <span className="swipe-card-audience">{activity.audience}</span>
          </div>
          <button className="swipe-card-heart" onClick={(e) => { e.stopPropagation(); onLike(); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#EDAFF6" strokeWidth="2" fill="none" />
            </svg>
          </button>
        </div>
        <h3 className="swipe-card-title">{activity.title}</h3>
        <div className="swipe-card-bottom-row">
          <div className="swipe-card-details">
            <span className="swipe-card-schedule">{activity.schedule}</span>
            <span className="swipe-card-price">
              {activity.price === 0 ? 'бесплатно' : `от ${activity.price.toLocaleString('ru')} ₽`}
            </span>
          </div>
          <span className="swipe-card-distance">{activity.distance} км</span>
        </div>
      </div>
    </animated.div>
  );
}
