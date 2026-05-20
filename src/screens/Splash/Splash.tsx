import { useEffect } from 'react';
import './Splash.css';

interface SplashProps {
  onDone: () => void;
}

export default function Splash({ onDone }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="splash screen">
      <div className="splash-content">
        <h1 className="splash-logo">ЗАТЕЯ</h1>
        <div className="splash-rabbit">
          <svg viewBox="0 0 120 160" width="120" height="160" xmlns="http://www.w3.org/2000/svg">
            {/* Ears */}
            <ellipse cx="42" cy="40" rx="12" ry="32" fill="#2a2a2a" />
            <ellipse cx="78" cy="40" rx="12" ry="32" fill="#2a2a2a" />
            <ellipse cx="42" cy="42" rx="7" ry="26" fill="#7E2FFF" opacity="0.5" />
            <ellipse cx="78" cy="42" rx="7" ry="26" fill="#7E2FFF" opacity="0.5" />
            {/* Head */}
            <ellipse cx="60" cy="85" rx="36" ry="34" fill="#2a2a2a" />
            {/* Eyes */}
            <circle cx="46" cy="80" r="6" fill="#fff" />
            <circle cx="74" cy="80" r="6" fill="#fff" />
            <circle cx="48" cy="80" r="3" fill="#7E2FFF" />
            <circle cx="76" cy="80" r="3" fill="#7E2FFF" />
            <circle cx="49" cy="79" r="1" fill="#fff" />
            <circle cx="77" cy="79" r="1" fill="#fff" />
            {/* Nose */}
            <ellipse cx="60" cy="92" rx="5" ry="3" fill="#EDAFF6" />
            {/* Mouth */}
            <path d="M55 95 Q60 100 65 95" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Cheeks */}
            <ellipse cx="38" cy="90" rx="8" ry="5" fill="#FF7133" opacity="0.3" />
            <ellipse cx="82" cy="90" rx="8" ry="5" fill="#FF7133" opacity="0.3" />
            {/* Body */}
            <ellipse cx="60" cy="135" rx="28" ry="22" fill="#1a1a1a" />
            {/* Arms */}
            <ellipse cx="30" cy="128" rx="8" ry="14" fill="#2a2a2a" transform="rotate(-20 30 128)" />
            <ellipse cx="90" cy="128" rx="8" ry="14" fill="#2a2a2a" transform="rotate(20 90 128)" />
          </svg>
          <div className="splash-glow" />
        </div>
      </div>
    </div>
  );
}
