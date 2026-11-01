import React, { useRef, useState, useEffect, useCallback } from 'react';
import { weddingConfig } from '../weddingConfig';

export default function ScratchCardDate() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Initialize canvas with gold foil surface
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (width === 0 || height === 0) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.scale(dpr, dpr);

    // Reset composite operation to draw fresh foil
    ctx.globalCompositeOperation = 'source-over';

    // 1. Shimmering Gold Foil Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, '#cda250');
    goldGrad.addColorStop(0.2, '#f5e2a8');
    goldGrad.addColorStop(0.4, '#b88934');
    goldGrad.addColorStop(0.65, '#fdeeb3');
    goldGrad.addColorStop(0.85, '#9d6f22');
    goldGrad.addColorStop(1, '#dfba68');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle diamond lattice watermark on foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1;
    const spacing = 18;
    for (let x = -height; x < width + height; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + height, 0);
      ctx.stroke();
    }

    // 3. Inner fine gold border
    ctx.strokeStyle = 'rgba(110, 75, 18, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(9, 9, width - 18, height - 18);

    // 4. Gold Foil Label Text & Icon
    ctx.fillStyle = '#4a320c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Crown / Sparkle icon
    ctx.font = 'bold 18px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('✦  ❦  ✦', width / 2, height / 2 - 24);

    // Main scratch prompt
    ctx.font = '700 13px "DM Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('SCRATCH TO REVEAL DATE', width / 2, height / 2);

    // Sub prompt
    ctx.font = 'italic 11px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#6e4c19';
    ctx.fillText('Rub with your finger or mouse', width / 2, height / 2 + 22);

    setIsRevealed(false);
    setScratchPercent(0);
    setShowConfetti(false);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // Scratch stroke function
  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    // Erase foil layer
    ctx.globalCompositeOperation = 'destination-out';

    // Radial gradient for smooth soft eraser edge
    const radius = 24 * dpr;
    const eraseGrad = ctx.createRadialGradient(x, y, radius * 0.4, x, y, radius);
    eraseGrad.addColorStop(0, 'rgba(0,0,0,1)');
    eraseGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = eraseGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Check completion periodically
    checkScratchCompletion();
  };

  // Sample canvas pixels to measure scratch percentage
  const checkScratchCompletion = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width;
    const height = canvas.height;

    // Sample a 20x20 grid (400 points) for quick performance
    const cols = 20;
    const rows = 12;
    let transparentCount = 0;
    const totalSamplePoints = cols * rows;

    const stepX = Math.floor(width / cols);
    const stepY = Math.floor(height / rows);

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const sampleX = Math.min(c * stepX + Math.floor(stepX / 2), width - 1);
          const sampleY = Math.min(r * stepY + Math.floor(stepY / 2), height - 1);
          const alphaIndex = (sampleY * width + sampleX) * 4 + 3;

          if (data[alphaIndex] < 64) {
            transparentCount++;
          }
        }
      }

      const percent = Math.round((transparentCount / totalSamplePoints) * 100);
      setScratchPercent(percent);

      // Auto-reveal once user scratches 40%
      if (percent >= 40) {
        revealComplete();
      }
    } catch {
      // Fallback
    }
  };

  const revealComplete = () => {
    setIsRevealed(true);
    setShowConfetti(true);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    setTimeout(() => {
      setShowConfetti(false);
    }, 3500);
  };

  // Mouse Handlers
  const handleMouseDown = (e) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  // Touch Handlers (with touch-action none prevention)
  const handleTouchStart = (e) => {
    if (e.cancelable) e.preventDefault();
    setIsScratching(true);
    const touch = e.touches[0];
    if (touch) scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.cancelable) e.preventDefault();
    if (!isScratching) return;
    const touch = e.touches[0];
    if (touch) scratch(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  return (
    <div className="scratch-card-wrapper">
      <div className="scratch-card-eyebrow">
        <span className="card-sparkle">✨</span>
        <span>A SPECIAL REVEAL FOR OUR GUESTS</span>
        <span className="card-sparkle">✨</span>
      </div>

      <div
        className={`scratch-card-container ${isRevealed ? 'is-revealed' : ''}`}
        ref={containerRef}
      >
        {/* UNDERNEATH LAYER: The Revealed Auspicious Wedding Date */}
        <div className="scratch-card-secret">
          <div className="secret-inner-frame">
            <span className="secret-crest">✦  ❦  ✦</span>
            <p className="secret-subtitle">THE AUSPICIOUS UNION OF OUR HEARTS</p>

            <h2 className="secret-date-title">{weddingConfig.weddingDateText}</h2>

            <div className="secret-muhurtham-badge">
              <span className="muhurtham-icon">◷</span>
              <span className="muhurtham-text">
                {weddingConfig.weddingDay} · {weddingConfig.weddingTime}
              </span>
            </div>

            <p className="secret-venue-text">
              <span className="venue-pin">⌖</span> {weddingConfig.venueName}
            </p>

            <div className="secret-stamp">
              <span>DATE REVEALED</span>
              <span>✓</span>
            </div>
          </div>
        </div>

        {/* TOP LAYER: Golden Foil Scratch Canvas */}
        <canvas
          ref={canvasRef}
          className={`scratch-card-canvas ${isRevealed ? 'canvas-hidden' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-label="Scratch card to reveal wedding date"
        />

        {/* Confetti celebration burst upon full scratch */}
        {showConfetti && (
          <div className="scratch-confetti-layer" aria-hidden="true">
            {[...Array(24)].map((_, i) => (
              <span
                key={i}
                className="confetti-piece"
                style={{
                  '--x': `${(i % 6) * 30 - 75}px`,
                  '--y': `${-40 - Math.random() * 80}px`,
                  '--rot': `${Math.random() * 360}deg`,
                  '--color': i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#e8b958' : '#fff5d0',
                  animationDelay: `${(i % 5) * 0.08}s`
                }}
              ></span>
            ))}
          </div>
        )}
      </div>

      {/* Helper Bar */}
      <div className="scratch-card-actions">
        {!isRevealed ? (
          <button
            type="button"
            className="scratch-reveal-btn"
            onClick={revealComplete}
          >
            <span>✨</span> Tap to Reveal Instantly
          </button>
        ) : (
          <button
            type="button"
            className="scratch-again-btn"
            onClick={initCanvas}
          >
            <span>↺</span> Scratch Again
          </button>
        )}
      </div>
    </div>
  );
}
