import './Search.css';
import { ACTIVITIES } from '../../data/activities';

const NEARBY = ACTIVITIES.slice(0, 5);

export default function Search() {
  return (
    <div className="search screen">
      <div className="search-header">
        <h1 className="search-title">Поиск</h1>
        <div className="search-input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" stroke="#555" strokeWidth="2" />
            <path d="M20 20L16.65 16.65" stroke="#555" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input placeholder="найти активность..." className="search-input" />
        </div>
      </div>

      <div className="search-body">
        {/* Hero banner */}
        <div className="search-hero">
          <div className="search-hero-img" style={{ backgroundImage: `url(${ACTIVITIES[3].image})` }}>
            <div className="search-hero-overlay">
              <span className="search-hero-tag">сегодня</span>
              <h2 className="search-hero-title">{ACTIVITIES[3].title}</h2>
              <div className="search-hero-dots">
                {[0,1,2].map((i) => (
                  <div key={i} className={`search-hero-dot ${i === 0 ? 'active' : ''}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map block */}
        <div className="search-section">
          <h3 className="search-section-title">Смотреть на карте</h3>
          <div className="search-map-preview">
            <div className="search-map-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#7E2FFF" opacity="0.8" />
                <circle cx="12" cy="9" r="2.5" fill="#fff" />
              </svg>
              <span>Открыть карту</span>
            </div>
          </div>
        </div>

        {/* Nearby */}
        <div className="search-section">
          <h3 className="search-section-title">Ближайшие события</h3>
          <div className="search-scroll">
            {NEARBY.map((a) => (
              <div key={a.id} className="search-card">
                <div className="search-card-img" style={{ backgroundImage: `url(${a.image})` }} />
                <div className="search-card-body">
                  <span className="search-card-cat">{a.category}</span>
                  <p className="search-card-title">{a.title}</p>
                  <span className="search-card-dist">{a.distance} км</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
