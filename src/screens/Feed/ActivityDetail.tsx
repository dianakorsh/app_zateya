import { Activity } from '../../data/activities'
import './ActivityDetail.css'

interface Props {
  activity: Activity;
  onBack: () => void;
  onSkip: () => void;
  onPlan: () => void;
}

export default function ActivityDetail({ activity, onBack, onSkip, onPlan }: Props) {
  return (
    <div className="detail-screen">
      <div className="detail-image-wrap">
        <img src={activity.image} alt={activity.title} />
        <button className="detail-back" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="detail-content scroll-area">
        <div className="detail-meta">{activity.category} · {activity.audience}</div>
        <h1 className="detail-title">{activity.title}</h1>
        <div className="detail-info-row">
          <span className="detail-info-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#888" strokeWidth="2"/>
              <path d="M12 7v5l3 3" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {activity.schedule}
          </span>
          <span className="detail-info-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#CCE84B" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="9" r="2.5" stroke="#CCE84B" strokeWidth="2"/>
            </svg>
            <span style={{ color: '#CCE84B' }}>{activity.distance} км</span>
          </span>
          <span className="detail-info-item" style={{ color: 'white', fontWeight: 700 }}>
            {activity.price === 0 ? 'бесплатно' : `от ${activity.price.toLocaleString()} ₽`}
          </span>
        </div>
        <p className="detail-address">📍 {activity.address}</p>
        <p className="detail-desc">{activity.description}</p>
      </div>
      <div className="detail-footer">
        <button className="detail-btn-skip" onClick={onSkip}>пропустить</button>
        <button className="btn-primary detail-btn-plan" onClick={onPlan}>
          запланировать
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M11 5L16 10L11 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
