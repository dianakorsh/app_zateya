import { useEffect } from 'react'
import './Splash.css'

interface Props {
  onDone: () => void;
}

export default function Splash({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="splash">
      <div className="splash-logo">ЗАТЕЯ</div>
      <div className="splash-rabbit">
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="125" rx="40" ry="10" fill="rgba(126,47,255,0.3)" />
          <ellipse cx="35" cy="55" rx="12" ry="30" fill="#E8E0FF" transform="rotate(-15 35 55)" />
          <ellipse cx="85" cy="55" rx="12" ry="30" fill="#E8E0FF" transform="rotate(15 85 55)" />
          <ellipse cx="35" cy="58" rx="6" ry="22" fill="#C4A8FF" transform="rotate(-15 35 58)" />
          <ellipse cx="85" cy="58" rx="6" ry="22" fill="#C4A8FF" transform="rotate(15 85 58)" />
          <ellipse cx="60" cy="90" rx="30" ry="32" fill="#E8E0FF" />
          <ellipse cx="60" cy="72" rx="22" ry="22" fill="#E8E0FF" />
          <ellipse cx="52" cy="68" rx="5" ry="6" fill="#1A0A2E" />
          <ellipse cx="68" cy="68" rx="5" ry="6" fill="#1A0A2E" />
          <ellipse cx="51" cy="67" rx="2" ry="2.5" fill="white" />
          <ellipse cx="67" cy="67" rx="2" ry="2.5" fill="white" />
          <ellipse cx="60" cy="77" rx="5" ry="3" fill="#FFAAC4" />
          <path d="M55 80 Q60 84 65 80" stroke="#C4A8FF" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M45 80 Q38 85 35 90" stroke="#C4A8FF" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M75 80 Q82 85 85 90" stroke="#C4A8FF" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
        <div className="splash-glow" />
      </div>
    </div>
  )
}
