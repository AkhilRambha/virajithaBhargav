import React, { useState } from 'react';
import { weddingConfig } from '../weddingConfig';

export default function RsvpSection() {
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [attendance, setAttendance] = useState('Joyfully attending');
  const [guestMessage, setGuestMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const attendanceOptions = [
    { label: 'Joyfully attending', icon: '✨' },
    { label: 'Sorry, cannot attend', icon: '💌' },
    { label: 'Not yet confirmed', icon: '⏳' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = guestName.trim();
    if (!trimmedName) {
      setFormMessage('Please enter your name.');
      return;
    }

    const phone = weddingConfig.whatsappNumber.replace(/\D/g, '');

    if (!/^\d{10,15}$/.test(phone) || /X/i.test(weddingConfig.whatsappNumber)) {
      setFormMessage(
        'Please configure a valid WhatsApp number in weddingConfig.js before using RSVP.'
      );
      return;
    }

    const message = [
      `Wedding RSVP: ${weddingConfig.groomName} & ${weddingConfig.brideName}`,
      '',
      `Guest name: ${trimmedName}`,
      `Number of guests: ${guestCount}`,
      `Attendance: ${attendance}`,
      `Wedding date: ${weddingConfig.weddingDateText}`,
      `Venue: ${weddingConfig.venueName}`,
      guestMessage.trim() ? `Message: ${guestMessage.trim()}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    setFormMessage('WhatsApp is opening. Review your RSVP and press Send to confirm.');

    const newWindow = window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      window.location.href = whatsappURL;
    }
  };

  return (
    <section className="rsvp section-pad" id="rsvp">
      <div className="rsvp-background-ornament" aria-hidden="true">♡</div>

      <div className="rsvp-content reveal reveal-up">
        <div className="heading-badge">
          <span>✦</span>
          <span>RESPONSE REQUESTED</span>
          <span>✦</span>
        </div>

        <h2>
          Will You <em>Join Us?</em>
        </h2>

        <p className="rsvp-subtitle">
          Kindly RSVP by 1st December 2026 so we can warmly prepare for your arrival.
        </p>

        <div className="rsvp-card-wrapper">
          <div className="rsvp-inner-border"></div>

          <form id="rsvpForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="guestName">Your Full Name</label>
              <input
                id="guestName"
                type="text"
                placeholder="e.g. Priya & Rajesh Kumar"
                required
                maxLength={100}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Will you be attending?</label>
              <div className="attendance-pills" role="radiogroup">
                {attendanceOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    className={`attendance-pill ${attendance === opt.label ? 'is-selected' : ''}`}
                    onClick={() => setAttendance(opt.label)}
                    role="radio"
                    aria-checked={attendance === opt.label}
                  >
                    <span className="pill-icon">{opt.icon}</span>
                    <span className="pill-text">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="guestCount">Number of Guests</label>
              <div className="guest-select-wrapper">
                <select
                  id="guestCount"
                  required
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
                <span className="select-chevron">▾</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="guestMessage">
                Wishes &amp; Blessings <small>(Optional)</small>
              </label>
              <textarea
                id="guestMessage"
                placeholder="Share your warm thoughts or dietary notes with us..."
                rows={3}
                maxLength={500}
                value={guestMessage}
                onChange={(e) => setGuestMessage(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="button button-gold rsvp-button">
              <span>Confirm via WhatsApp</span>
              <span className="button-icon">💌</span>
            </button>

            {formMessage && (
              <p className="form-note" id="formMessage" aria-live="polite">
                {formMessage}
              </p>
            )}
            {!formMessage && (
              <p className="form-subnote">
                Your confirmation will open WhatsApp with your pre-filled details.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
