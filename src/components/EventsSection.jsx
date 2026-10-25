import React from 'react';
import { weddingEventsData, getGoogleCalendarUrl } from '../weddingConfig';

export default function EventsSection() {
  const calendarUrl = getGoogleCalendarUrl();

  return (
    <section className="events section-pad" id="events">
      <div className="section-heading reveal reveal-up">
        <div className="heading-badge">
          <span>✦</span>
          <span>THE ITINERARY</span>
          <span>✦</span>
        </div>
        <h2>
          Wedding <em>Festivities</em>
        </h2>
        <p>Every sacred ritual and joyful celebration is more meaningful with you.</p>
      </div>

      <div className="event-grid section-inner">
        {weddingEventsData.map((event) => (
          <article
            key={event.id}
            className={`event-card ${event.featured ? 'event-card-featured' : ''} reveal reveal-up`}
          >
            <div className="event-card-header">
              <span className="event-number">{event.number}</span>
              <span className="event-icon" aria-hidden="true">{event.icon}</span>
            </div>

            <p className="event-label">{event.label}</p>
            <h3>{event.title}</h3>
            <p className="event-description">{event.description}</p>

            <div className="event-details-list">
              <div className="event-meta">
                <span className="meta-icon">◷</span>
                <span className="meta-text">{event.time}</span>
              </div>
              <div className="event-meta">
                <span className="meta-icon">⌖</span>
                <span className="meta-text">{event.venue}</span>
              </div>
            </div>

            {event.featured && (
              <div className="event-action-wrap">
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calendar-btn"
                >
                  <span>📅</span> Add to Google Calendar
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
