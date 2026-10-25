import React, { useEffect, useRef } from 'react';
import { photoGalleryData } from '../weddingConfig';

export default function ImageLightbox({ activeIndex, onClose, onNavigate }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.classList.add('modal-open');
      closeBtnRef.current?.focus();
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate(1);
      } else if (e.key === 'ArrowLeft') {
        onNavigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onClose, onNavigate]);

  if (activeIndex === null || !photoGalleryData[activeIndex]) {
    return null;
  }

  const currentPhoto = photoGalleryData[activeIndex];

  const handleBackdropClick = (e) => {
    if (e.target.id === 'imageModal') {
      onClose();
    }
  };

  return (
    <div
      className="modal is-open"
      id="imageModal"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      aria-hidden="false"
      onClick={handleBackdropClick}
    >
      <div className="lightbox-top-bar">
        <span className="lightbox-counter">
          {activeIndex + 1} / {photoGalleryData.length}
        </span>

        <button
          ref={closeBtnRef}
          className="modal-close"
          type="button"
          aria-label="Close image viewer"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      <button
        className="modal-prev"
        type="button"
        aria-label="Previous image"
        onClick={() => onNavigate(-1)}
      >
        ‹
      </button>

      <div className="lightbox-content-wrap">
        <img
          id="lightboxImage"
          src={currentPhoto.full}
          alt={currentPhoto.alt || 'Expanded wedding photograph'}
        />
        {currentPhoto.caption && (
          <p className="lightbox-caption">{currentPhoto.caption}</p>
        )}
      </div>

      <button
        className="modal-next"
        type="button"
        aria-label="Next image"
        onClick={() => onNavigate(1)}
      >
        ›
      </button>
    </div>
  );
}
