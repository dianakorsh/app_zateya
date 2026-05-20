import { ACTIVITIES } from '../../data/activities'
import './Search.css'

export default function Search() {
  const nearbyCards = ACTIVITIES.slice(0, 4)

  return (
    <div className="search-screen">
      <div className="search-header">
        <h1 className="search-title">Поиск</h1>
      </div>
      <div className="scroll-area search-scroll">
        <div className="search-hero">
          <img src={ACTIVITIES[3].image} alt="hero" />
          <div className="search-hero-overlay">
            <span className="search-hero-sub">сегодня</span>
            <h2 className="search-hero-title">{ACTIVITIES[3].title}</h2>
            <div className="search-hero-dots">
              <span className="dot active" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        </div>

        <div className="search-map-block">
          <div className="search-map-placeholder">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#7E2FFF" />
              <circle cx="12" cy="9" r="2.5" fill="white" />
            </svg>
            <span>Смотреть на карте</span>
          </div>
        </div>

        <div className="search-section">
          <h3 className="search-section-title">Ближайшие события</h3>
          <div className="horizontal-scroll nearby-scroll">
            {nearbyCards.map(a => (
              <div key={a.id} className="nearby-card">
                <div className="nearby-img">
                  <img src={a.image} alt={a.title} />
                </div>
                <p className="nearby-title">{a.title}</p>
                <p className="nearby-dist">{a.distance} км</p>
              </div>
            ))}
          </div>
        </div>

        <div className="search-section">
          <h3 className="search-section-title">Категории</h3>
          <div className="search-cats">
            {['еда', 'культура', 'спорт', 'ночная жизнь', 'прогулки'].map(cat => (
              <button key={cat} className="search-cat-btn">{cat}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
