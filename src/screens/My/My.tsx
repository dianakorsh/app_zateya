import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import './My.css';

const DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

function getWeekDates() {
  const today = new Date();
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dow + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function My() {
  const { likedActivities, plannedActivities } = useAppStore();
  const [tab, setTab] = useState<'my' | 'archive'>('my');
  const weekDates = getWeekDates();
  const today = new Date().getDate();

  return (
    <div className="my screen">
      <div className="my-header">
        <h1 className="my-title">Моё</h1>
        <div className="my-tabs">
          <button className={`my-tab ${tab === 'my' ? 'active' : ''}`} onClick={() => setTab('my')}>
            мои
          </button>
          <button className={`my-tab ${tab === 'archive' ? 'active' : ''}`} onClick={() => setTab('archive')}>
            архив
          </button>
        </div>
      </div>

      <div className="my-body">
        {/* Likes */}
        <section className="my-section">
          <h3 className="my-section-title">❤️ Понравилось</h3>
          {likedActivities.length === 0 ? (
            <p className="my-empty">Ещё нет лайков — свайпай карточки!</p>
          ) : (
            <div className="my-scroll">
              {likedActivities.map((a) => (
                <div key={a.id} className="my-thumb" style={{ backgroundImage: `url(${a.image})` }} />
              ))}
            </div>
          )}
        </section>

        {/* Calendar */}
        <section className="my-section">
          <h3 className="my-section-title">📅 Запланировано</h3>
          <div className="my-calendar">
            {weekDates.map((date, i) => {
              const d = date.getDate();
              const isToday = d === today;
              const hasEvent = plannedActivities.some(
                (a) => new Date(a.date).getDate() === d
              );
              return (
                <div key={i} className={`my-cal-day ${isToday ? 'today' : ''}`}>
                  <span className="my-cal-label">{DAYS[i]}</span>
                  <span className="my-cal-num">{d}</span>
                  {hasEvent && <div className="my-cal-dot" />}
                </div>
              );
            })}
          </div>

          {plannedActivities.length === 0 ? (
            <p className="my-empty">Нет запланированных активностей</p>
          ) : (
            <div className="my-plan-list">
              {plannedActivities.map((a) => (
                <div key={a.id} className="my-plan-card">
                  <div className="my-plan-img" style={{ backgroundImage: `url(${a.image})` }} />
                  <div className="my-plan-info">
                    <span className="my-plan-cat">{a.category}</span>
                    <p className="my-plan-title">{a.title}</p>
                    <span className="my-plan-date">
                      {new Date(a.date).toLocaleDateString('ru', { day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
