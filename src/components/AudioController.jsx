import React from 'react';

export default function AudioController({ isPlaying, onToggle }) {
  return (
    <button
      type="button"
      className={`audio-controller ${isPlaying ? 'is-playing' : 'is-paused'}`}
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      title={isPlaying ? 'Pause background music' : 'Play background music'}
    >
      <span className="audio-bars">
        <span className="bar bar-1"></span>
        <span className="bar bar-2"></span>
        <span className="bar bar-3"></span>
      </span>
      <span className="audio-label">{isPlaying ? 'Sound On' : 'Sound Off'}</span>
    </button>
  );
}
