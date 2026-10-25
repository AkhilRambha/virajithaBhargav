import React, { useState } from 'react';

export default function OpeningScreen({ isVisible, onEnter, onStartMusic }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUnlock = () => {
    if (isUnlocked) return;

    // Immediately trigger music on direct user gesture for mobile browser autoplay policy
    if (onStartMusic) {
      onStartMusic();
    }

    setIsUnlocked(true);

    // After lock unlatches (350ms), swing open the palace doors
    setTimeout(() => {
      setIsOpen(true);
    }, 350);

    // After doors fully part, complete entrance to reveal hero section
    setTimeout(() => {
      onEnter();
    }, 1450);
  };

  return (
    <div
      className={`royal-gates-screen ${!isVisible ? 'hidden' : ''} ${isOpen ? 'is-opening' : ''}`}
      id="openingScreen"
      aria-live="polite"
      tabIndex={0}
      onClick={handleUnlock}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleUnlock();
        }
      }}
    >
      {/* Radiant golden light shaft bursting when doors part */}
      <div className={`gates-light-beam ${isOpen ? 'active' : ''}`}></div>

      <div className={`gates-container ${isOpen ? 'gates-open' : ''}`}>
        {/* Left Palace Door */}
        <div
          className="gate-door gate-left"
          role="button"
          tabIndex={0}
          aria-label="Palace Gate Left - Tap to unlock"
        >
          <div className="door-wood-grain"></div>

          <div className="gate-border-frame">
            {/* Top Royal Trefoil Arch */}
            <div className="gate-royal-arch">
              <span className="arch-finial">❦</span>
            </div>

            {/* Upper Jali Lattice */}
            <div className="gate-lattice upper-lattice">
              <div className="lattice-pattern"></div>
            </div>

            {/* Mid Divider Rail with Golden Studs */}
            <div className="gate-divider-rail">
              <span className="stud"></span>
              <span className="stud"></span>
              <span className="stud"></span>
            </div>

            {/* Lower Lattice */}
            <div className="gate-lattice lower-lattice">
              <div className="lattice-pattern"></div>
            </div>
          </div>

          {/* Left Knocker Ring */}
          <div className="gate-knocker left-knocker">
            <div className="knocker-mount"></div>
            <div className="knocker-ring"></div>
          </div>

          {/* 3D Depth Shadow */}
          <div className="door-depth-shadow left-shadow"></div>
        </div>

        {/* Right Palace Door */}
        <div
          className="gate-door gate-right"
          role="button"
          tabIndex={0}
          aria-label="Palace Gate Right - Tap to unlock"
        >
          <div className="door-wood-grain"></div>

          <div className="gate-border-frame">
            {/* Top Royal Trefoil Arch */}
            <div className="gate-royal-arch">
              <span className="arch-finial">❦</span>
            </div>

            {/* Upper Jali Lattice */}
            <div className="gate-lattice upper-lattice">
              <div className="lattice-pattern"></div>
            </div>

            {/* Mid Divider Rail with Golden Studs */}
            <div className="gate-divider-rail">
              <span className="stud"></span>
              <span className="stud"></span>
              <span className="stud"></span>
            </div>

            {/* Lower Lattice */}
            <div className="gate-lattice lower-lattice">
              <div className="lattice-pattern"></div>
            </div>
          </div>

          {/* Right Knocker Ring */}
          <div className="gate-knocker right-knocker">
            <div className="knocker-mount"></div>
            <div className="knocker-ring"></div>
          </div>

          {/* 3D Depth Shadow */}
          <div className="door-depth-shadow right-shadow"></div>
        </div>

        {/* Central Royal Golden Padlock & Clasp (No names, no dates - pure mystery & anticipation) */}
        <div
          className={`royal-lock-wrapper ${isUnlocked ? 'lock-unlocked' : ''} ${isOpen ? 'lock-fade-out' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleUnlock();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              handleUnlock();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Royal Golden Lock - Tap to unlock invitation"
        >
          {/* Top Royal Crest Crown */}
          <div className="lock-crest-ornament">
            <span className="crest-sparkle-dot">✦</span>
            <span className="crest-symbol">❦</span>
            <span className="crest-sparkle-dot">✦</span>
          </div>

          {/* Arched Padlock Shackle */}
          <div className="lock-shackle-container">
            <div className="lock-shackle"></div>
          </div>

          {/* Padlock Body */}
          <div className="lock-padlock-body">
            <div className="lock-bevel-rim"></div>
            <div className="lock-inner-plate">
              <div className="lock-filigree-top">✧</div>
              <div className="lock-keyhole-socket">
                <div className="keyhole-circle"></div>
                <div className="keyhole-slit"></div>
                <div className="keyhole-glow"></div>
              </div>
              <div className="lock-filigree-bottom">✧</div>
            </div>
          </div>

          {/* Glowing Tap Hint */}
          <div className="lock-callout">
            <div className="lock-instruction-pill">
              <span className="lock-sparkle">✦</span>
              <span className="lock-instruction-text">
                {isUnlocked ? 'Opening Palace Gates...' : 'Tap Lock to Enter'}
              </span>
              <span className="lock-sparkle">✦</span>
            </div>
            <p className="lock-music-hint">
              <span>♫</span> Tap to open with music
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
