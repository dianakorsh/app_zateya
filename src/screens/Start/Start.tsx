import './Start.css'

interface Props {
  onStart: () => void;
}

export default function Start({ onStart }: Props) {
  return (
    <div className="start-screen">
      <div className="start-top">
        <div className="start-logo-a">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="url(#grad-a)" />
            <text x="32" y="44" textAnchor="middle" fontSize="36" fontWeight="900" fill="white" fontFamily="Nunito">а</text>
            <defs>
              <radialGradient id="grad-a" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FF7133" />
                <stop offset="100%" stopColor="#C02000" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <p className="start-slogan">Помогаем, когда не знаешь,<br />чего хочешь</p>
      </div>

      <div className="start-mascot">
        <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="90" cy="185" rx="60" ry="12" fill="rgba(255,113,51,0.2)" />
          <ellipse cx="90" cy="130" rx="45" ry="48" fill="#2A2A2A" />
          <ellipse cx="90" cy="100" rx="35" ry="35" fill="#2A2A2A" />
          <ellipse cx="75" cy="94" rx="7" ry="8" fill="#0D0D0D" />
          <ellipse cx="105" cy="94" rx="7" ry="8" fill="#0D0D0D" />
          <ellipse cx="73" cy="92" rx="3" ry="3.5" fill="white" />
          <ellipse cx="103" cy="92" rx="3" ry="3.5" fill="white" />
          <ellipse cx="90" cy="106" rx="8" ry="5" fill="#FF9966" />
          <path d="M80 113 Q90 120 100 113" stroke="#888" strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="112" y="95" width="50" height="28" rx="8" fill="#FF7133" />
          <path d="M112 109 L104 109" stroke="#FF7133" strokeWidth="3" strokeLinecap="round" />
          <text x="137" y="114" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="Nunito">ТА-ДА!</text>
          <path d="M60 88 L45 70" stroke="#555" strokeWidth="3" strokeLinecap="round" />
          <path d="M120 88 L145 75" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="start-cta">
        <button className="btn-primary" onClick={onStart}>
          подобрать идеи
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M11 5L16 10L11 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
