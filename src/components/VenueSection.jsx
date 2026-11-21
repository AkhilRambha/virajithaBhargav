import React, { useState } from 'react';
import { weddingConfig } from '../weddingConfig';

export default function VenueSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${weddingConfig.venueName}, ${weddingConfig.venueAddress}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="venue section-pad" id="venue">
      <div className="section-inner venue-grid">
        <div className="venue-copy reveal reveal-left">
          <div className="heading-badge">
            <span>✦</span>
            <span>LOCATION & DIRECTIONS</span>
            <span>✦</span>
          </div>

          <h2>
            Meet Us <em>There</em>
          </h2>

          <p className="venue-intro">
            Your loving presence and sacred blessings will illuminate our celebration and complete our happiness.
          </p>

          <div className="venue-card-concierge">
            <div className="venue-detail">
              <span className="detail-icon" aria-hidden="true">⌖</span>
              <div className="detail-content">
                <small>THE WEDDING VENUE</small>
                <h3 id="venueName">{weddingConfig.venueName}</h3>
                <p id="venueAddress">{weddingConfig.venueAddress}</p>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="copy-address-btn"
                >
                  {copied ? '✓ Address Copied!' : '📋 Copy Address'}
                </button>
              </div>
            </div>

            <div className="venue-detail">
              <span className="detail-icon" aria-hidden="true">▦</span>
              <div className="detail-content">
                <small>DATE & AUSPICIOUS MUHURTHAM</small>
                <h3 id="venueDate">{weddingConfig.weddingDateText}</h3>
                <p>{weddingConfig.weddingTime}</p>
              </div>
            </div>

            <div className="venue-detail">
              <span className="detail-icon" aria-hidden="true">✧</span>
              <div className="detail-content">
                <small>DRESS CODE / ATTIRE</small>
                <h3>{weddingConfig.attire}</h3>
                <p>Wear your festive best and celebrate in comfort</p>
              </div>
            </div>
          </div>

          <div className="venue-actions">
            <a
              className="button button-gold"
              id="directionsLink"
              href={weddingConfig.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🧭</span> Get Driving Directions
            </a>
          </div>
        </div>

        <div className="map-container reveal reveal-right">
          <div className="map-frame-decor"></div>
          <iframe
            id="venueMap"
            title="Wedding venue map"
            src={weddingConfig.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
          <a
            className="map-caption"
            id="mapOpenLink"
            href={weddingConfig.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </div>
    </section>
  );
}
