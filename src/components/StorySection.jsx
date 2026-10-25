import React from 'react';
import { weddingConfig } from '../weddingConfig';

export default function StorySection() {
  return (
    <section className="story section-pad" id="story">
      <div className="section-inner story-grid">
        <div className="story-copy reveal reveal-left">
          <div className="story-eyebrow-wrap">
            <span className="eyebrow-decor">✦</span>
            <p className="eyebrow green">OUR LOVE STORY</p>
            <span className="eyebrow-decor">✦</span>
          </div>

          <h2>
            Two hearts.<br />
            <em>One timeless journey.</em>
          </h2>

          <div className="small-divider">
            <span className="divider-line"></span>
            <span className="divider-heart">♡</span>
            <span className="divider-line"></span>
          </div>

          <p className="story-lead">
            Some journeys are written in the stars, patiently waiting for the right moment to unfold.
          </p>

          <p>
            Ours brought two souls together across time, serendipity, and gentle conversations, blossoming into a bond of endless laughter, unwavering support, and mutual dreams.
          </p>

          <p>
            As we step hand in hand into our forever, our happiness will only be complete with the blessings, love, and presence of our dearest family and friends.
          </p>

          <div className="signature">
            {weddingConfig.groomName} <span className="sig-heart">♡</span> {weddingConfig.brideName}
          </div>
        </div>

        <div className="story-images reveal reveal-right">
          <div className="story-arch-frame">
            <img
              className="story-image-main"
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85"
              alt="Romantic wedding celebration"
              loading="lazy"
            />
          </div>

          <div className="story-image-small">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=85"
              alt="Wedding memories"
              loading="lazy"
            />
            <span className="small-card-label">Forever Begins</span>
          </div>

          <div className="story-stamp" aria-label="Better together seal">
            <div className="stamp-inner">
              <span>Better</span>
              <span>Together</span>
              <span className="stamp-heart">♡</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
