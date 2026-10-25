import React from 'react';
import { weddingConfig } from '../weddingConfig';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-monogram" aria-hidden="true">
          <span className="monogram-letter">{weddingConfig.groomName[0]}</span>
          <span className="monogram-heart">♡</span>
          <span className="monogram-letter">{weddingConfig.brideName[0]}</span>
        </div>

        <h3 className="footer-names">
          {weddingConfig.groomName} <span>&amp;</span> {weddingConfig.brideName}
        </h3>

        <p className="footer-blessing">
          With love, gratitude, and with the eternal blessings of our families.
        </p>

        <p className="footer-date" id="footerDate">
          {weddingConfig.weddingShortDate.replace(/\./g, '  ·  ')}
        </p>

        <div className="footer-divider">
          <span></span>
          <span className="divider-icon">❦</span>
          <span></span>
        </div>

        <p className="copyright">
          CELEBRATING LOVE &amp; TOGETHERNESS · FOREVER BEGINS HERE
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top of invitation"
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
}
