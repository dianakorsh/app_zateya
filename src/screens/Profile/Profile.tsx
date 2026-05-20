import { useState } from 'react'
import './Profile.css'

const ACHIEVEMENTS = [
  { id: 1, emoji: '👣', name: 'Первый шаг', gradient: 'linear-gradient(135deg, #FF7133, #FF4500)' },
  { id: 2, emoji: '🎉', name: 'Душа компании', gradient: 'linear-gradient(135deg, #7E2FFF, #4A00C0)' },
  { id: 3, emoji: '🏠', name: 'Домосед', gradient: 'linear-gradient(135deg, #EDAFF6, #C060D0)' },
  { id: 4, emoji: '🧘', name: 'Проснись и йогой', gradient: 'linear-gradient(135deg, #CCE84B, #90A800)' },
]

const FRIENDS = [
  { id: 1, name: 'Аня', color: '#FF7133' },
  { id: 2, name: 'Слава', color: '#7E2FFF' },
  { id: 3, name: 'Маша', color: '#EDAFF6' },
  { id: 4, name: 'Коля', color: '#CCE84B' },
]

const JOINT_ACTIVITIES = [
  { id: 1, title: 'Йога на рассвете в парке', friend: 'Аня', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=60' },
  { id: 2, title: 'Книжный клуб без занудства', friend: 'Маша', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=60' },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'mine' | 'friends'>('mine')

  return (
    <div className="profile-screen">
      <div className="profile-hero">
        <div className="profile-avatar-wrap">
          <svg width="0" height="0">
            <defs>
              <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
                <path d="M0.5,0 C0.78,0 1,0.22 1,0.5 C1,0.72 0.88,0.92 0.7,0.98 C0.52,1.04 0.3,0.98 0.15,0.85 C0,0.72 0,0.5 0.1,0.32 C0.2,0.14 0.36,0 0.5,0 Z" />
              </clipPath>
            </defs>
          </svg>
          <div className="profile-avatar" style={{ clipPath: 'url(#blob-clip)' }}>
            <div className="profile-avatar-inner">
              <span className="profile-avatar-emoji">🐰</span>
            </div>
          </div>
        </div>
        <p className="profile-username">@zateia_user</p>
        <h2 className="profile-name">Привет, Путешественник!</h2>
        <button className="profile-refresh">↺ обновить предпочтения</button>
      </div>

      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === 'mine' ? 'active' : ''}`}
          onClick={() => setActiveTab('mine')}
        >мои затеи</button>
        <button
          className={`profile-tab ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >друзья</button>
      </div>

      <div className="scroll-area profile-scroll">
        {activeTab === 'mine' ? (
          <>
            <div className="profile-section">
              <h3 className="profile-section-title">Достижения</h3>
              <div className="horizontal-scroll">
                {ACHIEVEMENTS.map(a => (
                  <div key={a.id} className="achievement">
                    <div className="achievement-icon" style={{ background: a.gradient }}>
                      <span>{a.emoji}</span>
                    </div>
                    <p className="achievement-name">{a.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-row">
                <h3 className="profile-section-title">Отчёты</h3>
                <button className="profile-add-btn">+</button>
              </div>
              <div className="report-card">
                <div className="report-img">
                  <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=60" alt="report" />
                </div>
                <div className="report-info">
                  <p className="report-title">Велопрогулка по набережной</p>
                  <p className="report-date">12 мая 2026</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="profile-section">
              <h3 className="profile-section-title">Друзья</h3>
              <div className="horizontal-scroll">
                {FRIENDS.map(f => (
                  <div key={f.id} className="friend-avatar">
                    <div className="friend-circle" style={{ background: f.color }}>
                      <span>{f.name[0]}</span>
                    </div>
                    <p className="friend-name">{f.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-row">
                <h3 className="profile-section-title">Общие активности</h3>
                <button className="profile-add-btn">+</button>
              </div>
              {JOINT_ACTIVITIES.map(ja => (
                <div key={ja.id} className="joint-card">
                  <div className="joint-img">
                    <img src={ja.image} alt={ja.title} />
                  </div>
                  <div className="joint-info">
                    <p className="joint-title">{ja.title}</p>
                    <p className="joint-friend">с {ja.friend}</p>
                  </div>
                  <button className="joint-join">Присоединиться →</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
