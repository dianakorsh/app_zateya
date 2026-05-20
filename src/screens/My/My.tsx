import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useAppStore as useStore } from '../../store/appStore'
import './My.css'

const DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function getWeekDays() {
  const today = new Date()
  const dow = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

export default function My() {
  const { likedActivities, plannedActivities, setCurrentTab } = useAppStore()
  const [activeTab, setActiveTab] = useState<'my' | 'archive'>('my')
  const weekDays = getWeekDays()
  const today = new Date().getDate()

  return (
    <div className="my-screen">
      <div className="my-header">
        <h1 className="my-title">Моё</h1>
        <div className="my-tabs">
          <button
            className={`my-tab ${activeTab === 'my' ? 'active' : ''}`}
            onClick={() => setActiveTab('my')}
          >мои</button>
          <button
            className={`my-tab ${activeTab === 'archive' ? 'active' : ''}`}
            onClick={() => setActiveTab('archive')}
          >архив</button>
        </div>
      </div>

      <div className="scroll-area my-scroll">
        {activeTab === 'my' ? (
          <>
            <div className="my-section">
              <h3 className="my-section-title">Лайки</h3>
              {likedActivities.length > 0 ? (
                <div className="horizontal-scroll">
                  {likedActivities.map(a => (
                    <div key={a.id} className="like-thumb">
                      <img src={a.image} alt={a.title} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="my-empty">
                  <p>Ещё нет лайков</p>
                  <button className="my-empty-cta" onClick={() => setCurrentTab('feed')}>
                    найти затеи
                  </button>
                </div>
              )}
            </div>

            <div className="my-section">
              <h3 className="my-section-title">Запланировано</h3>
              <div className="cal-week">
                {weekDays.map((d, i) => {
                  const isToday = d.getDate() === today
                  const hasEvent = plannedActivities.some(p => {
                    const pd = new Date(p.date)
                    return pd.getDate() === d.getDate() && pd.getMonth() === d.getMonth()
                  })
                  return (
                    <div key={i} className={`cal-day ${isToday ? 'today' : ''}`}>
                      <span className="cal-day-name">{DAYS[i]}</span>
                      <span className="cal-day-num">{d.getDate()}</span>
                      {hasEvent && <span className="cal-dot" />}
                    </div>
                  )
                })}
              </div>

              {plannedActivities.length > 0 ? (
                <div className="planned-card">
                  <div className="planned-img">
                    <img src={plannedActivities[0].activity.image} alt={plannedActivities[0].activity.title} />
                  </div>
                  <div className="planned-info">
                    <span className="planned-date">
                      {new Date(plannedActivities[0].date).toLocaleDateString('ru', { day: 'numeric', month: 'long' })}
                    </span>
                    <p className="planned-title">{plannedActivities[0].activity.title}</p>
                    <p className="planned-meta">{plannedActivities[0].activity.schedule}</p>
                  </div>
                </div>
              ) : (
                <div className="my-empty">
                  <p>Пока ничего не запланировано</p>
                  <button className="my-empty-cta" onClick={() => setCurrentTab('feed')}>
                    найти затеи
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="my-empty" style={{ marginTop: 40 }}>
            <p>Архив пока пуст</p>
            <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Здесь появятся прошедшие активности</p>
          </div>
        )}
      </div>
    </div>
  )
}
