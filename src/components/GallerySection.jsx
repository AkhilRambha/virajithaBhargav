import React from 'react';
import { photoGalleryData } from '../weddingConfig';

export default function GallerySection({ onOpenImage }) {
  const handleImageError = (e) => {
    e.target.style.visibility = 'hidden';
    if (e.target.parentElement) {
      e.target.parentElement.style.background =
        'linear-gradient(135deg, #e8ece3, #efe9de)';
    }
  };

  return (
    <section className="gallery section-pad" id="gallery">
      <div className="section-heading reveal reveal-up">
        <div className="heading-badge">
          <span>✦</span>
          <span>MOMENTS IN TIME</span>
          <span>✦</span>
        </div>
        <h2>
          Our Photo <em>Gallery</em>
        </h2>
        <p>A few cherished glimpses into our joy, smiles, and celebrations.</p>
      </div>

      <div className="photo-grid section-inner">
        {photoGalleryData.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className={`photo-item ${photo.className} reveal reveal-up`}
            onClick={() => onOpenImage(index)}
            aria-label={`View ${photo.caption || 'wedding photograph'}`}
          >
            <img
              src={photo.thumb}
              alt={photo.alt}
              loading="lazy"
              onError={handleImageError}
            />
            <div className="photo-overlay">
              <span className="photo-caption">{photo.caption}</span>
              <span className="photo-zoom" aria-hidden="true">⤢</span>
            </div>
          </button>
        ))}
      </div>
      
      <p className="gallery-note">
        Click any photo to expand into high definition view.
      </p>
    </section>
  );
}
