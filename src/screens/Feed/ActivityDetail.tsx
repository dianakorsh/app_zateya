import type { Activity } from '../../data/activities';
import { useAppStore } from '../../store/appStore';
import './ActivityDetail.css';

interface Props {
  activity: Activity;
  onClose: () => void;
}

export default function ActivityDetail({ activity, onClose }: Props) {
  const planActivity = useAppStore((s) => s.planActivity);
  const likeActivity = useAppStore((s) => s.likeActivity);

  const handlePlan = () => {
    const today = new Date().toISOString().split('T')[0];
    planActivity(activity.id, today);
    likeActivity(activity.id);
    onClose();
  };

  return (
    <div className="detail screen">
      <div className="detail-photo" style={{ backgroundImage: `url(${activity.image})` }}>
        <button className="detail-back" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="detail-photo-gradient" />
      </div>

      <div className="detail-body">
        <div className="detail-meta">
          <span className="detail-category">{activity.category}</span>
          <span className="detail-dot">·</span>
          <span className="detail-audience">{activity.audience}</span>
        </div>
        <h2 className="detail-title">{activity.title}</h2>

        <div className="detail-info-row">
          <div className="detail-info-item">
            <span className="detail-info-icon">📅</span>
            <span>{activity.schedule}</span>
          </div>
          <div className="detail-info-item">
            <span className="detail-info-icon">💰</span>
            <span>{activity.price === 0 ? 'бесплатно' : `от ${activity.price.toLocaleString('ru')} ₽`}</span>
          </div>
          <div className="detail-info-item">
            <span className="detail-info-icon" style={{ color: 'var(--accent-lime)' }}>📍</span>
            <span style={{ color: 'var(--accent-lime)' }}>{activity.distance} км</span>
          </div>
        </div>

        <p className="detail-address">{activity.address}</p>
        <p className="detail-description">{activity.description}</p>
      </div>

      <div className="detail-actions">
        <button className="detail-btn-skip" onClick={onClose}>пропустить</button>
        <button className="btn-primary detail-btn-plan" onClick={handlePlan}>запланировать →</button>
      </div>
    </div>
  );
}
