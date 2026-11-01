import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { weddingConfig } from '../weddingConfig';

function ScratchCardDate() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const hasScratchedRef = useRef(false);
  const lastCheckTimeRef = useRef(0);
  const isRevealedRef = useRef(false);

  // States
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Paint the golden foil texture on canvas
  const drawFoil = useCallback((ctx, width, height) => {
    ctx.globalCompositeOperation = 'source-over';

    // 1. Multi-stop Metallic Gold Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, '#cda250');
    goldGrad.addColorStop(0.18, '#f7e3ad');
    goldGrad.addColorStop(0.38, '#b88934');
    goldGrad.addColorStop(0.58, '#faebbd');
    goldGrad.addColorStop(0.8, '#9e7025');
    goldGrad.addColorStop(1, '#dfba68');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Diamond Lattice Watermark
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 1.5;
    const spacing = 22;
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
    ctx.restore();

    // 3. Ornate Double Gold Borders
    ctx.save();
    ctx.strokeStyle = 'rgba(90, 60, 15, 0.45)';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(13, 13, width - 26, height - 26);
    ctx.restore();

    // 4. Elegant Calligraphy & Labels
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Royal Crown / Flourish
    ctx.fillStyle = '#422c09';
    const scaleFactor = Math.min(width / 380, 1);
    const fontSizeFlourish = Math.max(16, Math.round(20 * scaleFactor));
    ctx.font = `bold ${fontSizeFlourish}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText('✦   ❦   ✦', width / 2, height / 2 - 28 * scaleFactor);

    // Main Title
    const fontSizeTitle = Math.max(12, Math.round(14 * scaleFactor));
    ctx.font = `700 ${fontSizeTitle}px "DM Sans", -apple-system, sans-serif`;
    ctx.fillStyle = '#2f1f06';
    ctx.fillText('SCRATCH TO REVEAL DATE', width / 2, height / 2);

    // Subtitle instruction
    const fontSizeSub = Math.max(10, Math.round(12 * scaleFactor));
    ctx.font = `italic ${fontSizeSub}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillStyle = '#5a3d0f';
    ctx.fillText('Rub with your finger or mouse', width / 2, height / 2 + 26 * scaleFactor);
    ctx.restore();
  }, []);

  // Complete reveal: stays permanently unveiled until website reload
  const revealComplete = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsFading(true);
    setShowConfetti(true);

    // Gracefully fade out canvas, then remove from DOM
    setTimeout(() => {
      setIsRevealed(true);
      setIsFading(false);
    }, 380);

    setTimeout(() => {
      setShowConfetti(false);
    }, 3800);
  }, []);

  // Check how much has been scratched (efficiently throttled)
  const checkScratchPercentage = useCallback(() => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const width = canvas.width;
    const height = canvas.height;

    // Sample an optimized 12x8 grid (96 points) across the canvas
    const cols = 12;
    const rows = 8;
    const totalSamples = cols * rows;
    let transparentCount = 0;

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

          if (data[alphaIndex] < 80) {
            transparentCount++;
          }
        }
      }

      const percent = (transparentCount / totalSamples) * 100;

      // Auto reveal once ~20% is scratched
      if (percent >= 20) {
        revealComplete();
      }
    } catch {
      // Fallback
    }
  }, [revealComplete]);

  // Coordinates helper
  const getCanvasCoords = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }, []);

  // Silky smooth scratch stroke with continuous interpolation
  const scratchTo = useCallback((clientX, clientY) => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const coords = getCanvasCoords(clientX, clientY);
    if (!coords) return;
    const { x: currX, y: currY } = coords;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    // Generous eraser radius (~30-34 CSS pixels)
    const rect = canvas.getBoundingClientRect();
    const scaleFactor = canvas.width / (rect.width || 1);
    const brushRadius = Math.round(30 * scaleFactor);

    ctx.lineWidth = brushRadius * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#000000';

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(currX, currY);
      ctx.stroke();
    }

    // Always draw round circle at current point for smooth endpoints
    ctx.beginPath();
    ctx.arc(currX, currY, brushRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    lastPointRef.current = { x: currX, y: currY };
    hasScratchedRef.current = true;

    // Throttle percentage check to maintain 60-120 FPS buttery smooth motion
    const now = performance.now();
    if (now - lastCheckTimeRef.current > 180) {
      lastCheckTimeRef.current = now;
      checkScratchPercentage();
    }
  }, [getCanvasCoords, checkScratchPercentage]);

  // Unified start/move/end handlers
  const handleStart = useCallback((clientX, clientY) => {
    if (isRevealedRef.current) return;
    isDrawingRef.current = true;
    lastPointRef.current = null;
    scratchTo(clientX, clientY);
  }, [scratchTo]);

  const handleMove = useCallback((clientX, clientY) => {
    if (!isDrawingRef.current || isRevealedRef.current) return;
    scratchTo(clientX, clientY);
  }, [scratchTo]);

  const handleEnd = useCallback(() => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    // Always check percentage when user finishes a stroke
    checkScratchPercentage();
  }, [checkScratchPercentage]);

  // Initialize canvas buffer
  const initCanvas = useCallback(() => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (width === 0 || height === 0) return;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    drawFoil(ctx, canvas.width, canvas.height);
  }, [drawFoil]);

  // Mount effect & non-passive native touch listeners for mobile
  useEffect(() => {
    initCanvas();

    const handleResize = () => {
      // Do not wipe out canvas if user already began scratching or if revealed
      if (isRevealedRef.current || hasScratchedRef.current) return;
      initCanvas();
    };

    window.addEventListener('resize', handleResize);

    const canvas = canvasRef.current;
    if (canvas && !isRevealed) {
      // Native non-passive listeners prevent mobile screen scroll during scratching
      const onTouchStart = (e) => {
        if (e.cancelable) e.preventDefault();
        const touch = e.touches[0];
        if (touch) handleStart(touch.clientX, touch.clientY);
      };

      const onTouchMove = (e) => {
        if (e.cancelable) e.preventDefault();
        const touch = e.touches[0];
        if (touch) handleMove(touch.clientX, touch.clientY);
      };

      const onTouchEnd = (e) => {
        if (e.cancelable) e.preventDefault();
        handleEnd();
      };

      canvas.addEventListener('touchstart', onTouchStart, { passive: false });
      canvas.addEventListener('touchmove', onTouchMove, { passive: false });
      canvas.addEventListener('touchend', onTouchEnd, { passive: false });
      canvas.addEventListener('touchcancel', onTouchEnd, { passive: false });

      return () => {
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('touchstart', onTouchStart);
        canvas.removeEventListener('touchmove', onTouchMove);
        canvas.removeEventListener('touchend', onTouchEnd);
        canvas.removeEventListener('touchcancel', onTouchEnd);
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, handleStart, handleMove, handleEnd, isRevealed]);

  return (
    <div className="scratch-card-wrapper">
      <div className="scratch-card-eyebrow">
        <span className="card-sparkle">✨</span>
        <span>{isRevealed ? 'OFFICIALLY REVEALED' : 'SCRATCH WITH FINGER OR MOUSE'}</span>
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
            <p className="secret-subtitle">AUSPICIOUS WEDDING DATE</p>

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

        {/* TOP LAYER: Golden Foil Scratch Canvas (stays removed once revealed) */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className={`scratch-card-canvas ${isFading ? 'canvas-hidden' : ''}`}
            onPointerDown={(e) => {
              if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
                try {
                  e.target.setPointerCapture(e.pointerId);
                } catch {}
                handleStart(e.clientX, e.clientY);
              }
            }}
            onPointerMove={(e) => {
              if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
                handleMove(e.clientX, e.clientY);
              }
            }}
            onPointerUp={(e) => {
              if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
                try {
                  e.target.releasePointerCapture(e.pointerId);
                } catch {}
                handleEnd();
              }
            }}
            onPointerCancel={(e) => {
              if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
                handleEnd();
              }
            }}
            aria-label="Scratch card to reveal wedding date"
          />
        )}

        {/* Confetti celebration burst upon reveal */}
        {showConfetti && (
          <div className="scratch-confetti-layer" aria-hidden="true">
            {[...Array(26)].map((_, i) => (
              <span
                key={i}
                className="confetti-piece"
                style={{
                  '--x': `${(i % 7) * 28 - 84}px`,
                  '--y': `${-45 - Math.random() * 85}px`,
                  '--rot': `${Math.random() * 360}deg`,
                  '--color': i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#f5e2a8' : '#e0b85c',
                  animationDelay: `${(i % 6) * 0.07}s`
                }}
              ></span>
            ))}
          </div>
        )}
      </div>

      {/* Helper Reveal Button (Permanently hidden once revealed) */}
      {!isRevealed && (
        <div className="scratch-card-actions">
          <button
            type="button"
            className="scratch-reveal-btn"
            onClick={revealComplete}
          >
            <span>✨</span> Tap to Reveal Instantly
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(ScratchCardDate);
