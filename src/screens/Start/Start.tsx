import './Start.css';

interface StartProps {
  onStart: () => void;
}

export default function Start({ onStart }: StartProps) {
  return (
    <div className="start screen">
      <div className="start-top">
        <div className="start-logo-a">
          <svg viewBox="0 0 60 60" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7133" />
                <stop offset="100%" stopColor="#FF4500" />
              </linearGradient>
            </defs>
            <text x="50%" y="52" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="900" fontSize="52" fill="url(#logoGrad)">з</text>
          </svg>
        </div>
      </div>

      <div className="start-middle">
        <h1 className="start-slogan">Помогаем,<br />когда не знаешь,<br />чего хочешь</h1>

        <div className="start-cat">
          <svg viewBox="0 0 200 180" width="200" height="180" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <ellipse cx="100" cy="130" rx="55" ry="45" fill="#1a1a1a" />
            {/* Head */}
            <ellipse cx="100" cy="82" rx="45" ry="42" fill="#222" />
            {/* Ears */}
            <polygon points="62,48 52,20 80,42" fill="#222" />
            <polygon points="138,48 148,20 120,42" fill="#222" />
            <polygon points="65,46 57,28 78,43" fill="#FF7133" opacity="0.4" />
            <polygon points="135,46 143,28 122,43" fill="#FF7133" opacity="0.4" />
            {/* Eyes */}
            <ellipse cx="86" cy="78" rx="8" ry="9" fill="#7E2FFF" />
            <ellipse cx="114" cy="78" rx="8" ry="9" fill="#7E2FFF" />
            <ellipse cx="87" cy="79" rx="4" ry="6" fill="#000" />
            <ellipse cx="115" cy="79" rx="4" ry="6" fill="#000" />
            <circle cx="88" cy="77" r="2" fill="#fff" />
            <circle cx="116" cy="77" r="2" fill="#fff" />
            {/* Nose */}
            <polygon points="100,90 96,95 104,95" fill="#FF7133" />
            {/* Mouth */}
            <path d="M96 95 Q100 102 104 95" stroke="#555" strokeWidth="1.5" fill="none" />
            {/* Whiskers */}
            <line x1="60" y1="88" x2="88" y2="90" stroke="#444" strokeWidth="1" />
            <line x1="60" y1="93" x2="88" y2="92" stroke="#444" strokeWidth="1" />
            <line x1="112" y1="90" x2="140" y2="88" stroke="#444" strokeWidth="1" />
            <line x1="112" y1="92" x2="140" y2="93" stroke="#444" strokeWidth="1" />
            {/* Megaphone */}
            <rect x="128" y="95" width="30" height="18" rx="4" fill="#FF7133" transform="rotate(-15 128 95)" />
            <polygon points="158,90 175,75 175,105 158,108" fill="#FF7133" transform="rotate(-15 158 90)" />
            <rect x="125" y="99" width="8" height="8" rx="2" fill="#222" transform="rotate(-15 125 99)" />
            {/* Sound waves */}
            <path d="M178 78 Q185 90 178 102" stroke="#FF7133" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M183 72 Q193 90 183 108" stroke="#FF7133" strokeWidth="2" fill="none" opacity="0.4" />
            {/* Paws */}
            <ellipse cx="68" cy="158" rx="18" ry="12" fill="#1a1a1a" />
            <ellipse cx="132" cy="158" rx="18" ry="12" fill="#1a1a1a" />
            <ellipse cx="58" cy="153" rx="12" ry="8" fill="#222" transform="rotate(-20 58 153)" />
          </svg>
        </div>
      </div>

      <div className="start-bottom">
        <button className="btn-primary" onClick={onStart}>
          подобрать идеи →
        </button>
      </div>
    </div>
  );
}
