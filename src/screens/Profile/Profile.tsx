import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import './Profile.css';

const ACHIEVEMENTS = [
  { id: 1, label: 'Первый шаг', emoji: '🚀', gradient: 'linear-gradient(135deg, #FF7133, #FF4500)' },
  { id: 2, label: 'Душа компании', emoji: '🎉', gradient: 'linear-gradient(135deg, #7E2FFF, #5500CC)' },
  { id: 3, label: 'Домосед', emoji: '🏠', gradient: 'linear-gradient(135deg, #CCE84B, #89A800)' },
  { id: 4, label: 'Проснись и йогой', emoji: '🧘', gradient: 'linear-gradient(135deg, #EDAFF6, #C060D0)' },
];

const FRIENDS = [
  { id: 1, name: 'Маша', color: '#FF7133' },
  { id: 2, name: 'Петя', color: '#7E2FFF' },
  { id: 3, name: 'Катя', color: '#CCE84B' },
  { id: 4, name: 'Рома', color: '#EDAFF6' },
];

const SHARED = [
  { id: 1, title: 'Велопрогулка по набережной', category: 'спорт' },
  { id: 2, title: 'Йога на рассвете в парке', category: 'спорт' },
];

export default function Profile() {
  const { likedActivities, resetOnboarding } = useAppStore();
  const [friendTab, setFriendTab] = useState<'my' | 'friends'>('my');

  return (
    <div className="profile screen">
      {/* Top section */}
      <div className="profile-top">
        <div className="profile-top-bg" />
        <div className="profile-top-content">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              <svg viewBox="0 0 80 80" width="80" height="80">
                <defs>
                  <clipPath id="blob-clip">
                    <path d="M40,8 C58,8 72,20 72,38 C72,56 60,74 42,74 C24,74 8,60 8,42 C8,24 22,8 40,8 Z" />
                  </clipPath>
                </defs>
                <rect width="80" height="80" fill="#7E2FFF" clipPath="url(#blob-clip)" />
                <text x="40" y="50" textAnchor="middle" fontSize="36" clipPath="url(#blob-clip)">🐱</text>
              </svg>
            </div>
          </div>
          <p className="profile-username">@лиличка</p>
          <h2 className="profile-name">Лилия</h2>
          <button className="profile-update-btn" onClick={resetOnboarding}>
            ↺ обновить предпочтения
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button className={`profile-tab ${friendTab === 'my' ? 'active' : ''}`} onClick={() => setFriendTab('my')}>
          мои затеи
        </button>
        <button className={`profile-tab ${friendTab === 'friends' ? 'active' : ''}`} onClick={() => setFriendTab('friends')}>
          друзья
        </button>
      </div>

      {/* Body */}
      <div className="profile-body">
        {friendTab === 'my' ? (
          <>
            {/* Achievements */}
            <section className="profile-section">
              <h3 className="profile-section-title">Достижения</h3>
              <div className="profile-scroll">
                {ACHIEVEMENTS.map((ach) => (
                  <div key={ach.id} className="profile-ach">
                    <div className="profile-ach-icon" style={{ background: ach.gradient }}>
                      <span>{ach.emoji}</span>
                    </div>
                    <span className="profile-ach-label">{ach.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reports */}
            <section className="profile-section">
              <div className="profile-section-header">
                <h3 className="profile-section-title">Отчёты</h3>
                <button className="profile-add-btn">+</button>
              </div>
              {likedActivities.slice(0, 2).map((a) => (
                <div key={a.id} className="profile-report-card">
                  <div className="profile-report-img" style={{ backgroundImage: `url(${a.image})` }} />
                  <div className="profile-report-info">
                    <p className="profile-report-title">{a.title}</p>
                    <span className="profile-report-date">
                      {new Date().toLocaleDateString('ru', { day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                </div>
              ))}
              {likedActivities.length === 0 && (
                <p className="profile-empty">Нет отчётов. Запланируй активность!</p>
              )}
            </section>
          </>
        ) : (
          <>
            {/* Friends */}
            <section className="profile-section">
              <div className="profile-scroll">
                {FRIENDS.map((f) => (
                  <div key={f.id} className="profile-friend">
                    <div className="profile-friend-avatar" style={{ background: f.color }}>
                      <span style={{ fontSize: 20 }}>👤</span>
                    </div>
                    <span className="profile-friend-name">{f.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Shared activities */}
            <section className="profile-section">
              <div className="profile-section-header">
                <h3 className="profile-section-title">Общие активности</h3>
                <button className="profile-add-btn">+</button>
              </div>
              {SHARED.map((s) => (
                <div key={s.id} className="profile-shared-item">
                  <div className="profile-shared-info">
                    <span className="profile-shared-cat">{s.category}</span>
                    <p className="profile-shared-title">{s.title}</p>
                  </div>
                  <button className="profile-join-btn">Присоединиться →</button>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
