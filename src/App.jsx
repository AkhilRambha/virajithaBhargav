import React, { useState, useEffect, useRef, useCallback } from 'react';
import { weddingConfig, photoGalleryData } from './weddingConfig';
import AudioController from './components/AudioController';
import OpeningScreen from './components/OpeningScreen';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import VenueSection from './components/VenueSection';
import RsvpSection from './components/RsvpSection';
import Footer from './components/Footer';
import ImageLightbox from './components/ImageLightbox';

export default function App() {
  const [isOpeningVisible, setIsOpeningVisible] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const audioRef = useRef(null);

  // Live countdown state
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    ariaLabel: 'Countdown to the wedding'
  });

  // Calculate live countdown
  useEffect(() => {
    const weddingTimestamp = new Date(weddingConfig.weddingDate).getTime();

    function updateCountdown() {
      if (Number.isNaN(weddingTimestamp)) {
        setCountdown({
          days: '--',
          hours: '--',
          minutes: '--',
          seconds: '--',
          ariaLabel: 'Countdown to the wedding'
        });
        return;
      }

      const difference = weddingTimestamp - Date.now();

      if (difference <= 0) {
        let ariaLabel = 'Countdown to the wedding';
        if (difference > -86400000) {
          ariaLabel = 'The wedding day is here';
        } else {
          ariaLabel = 'The wedding date has passed';
        }

        setCountdown({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          ariaLabel
        });
        return;
      }

      const days = Math.floor(difference / 86400000);
      const hours = Math.floor((difference % 86400000) / 3600000);
      const minutes = Math.floor((difference % 3600000) / 60000);
      const seconds = Math.floor((difference % 60000) / 1000);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        ariaLabel: 'Countdown to the wedding'
      });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Music handling
  const startMusic = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.35;
    audioRef.current.muted = false;
    audioRef.current.loop = true;

    if (document.hidden) return;

    audioRef.current
      .play()
      .then(() => {
        setIsMusicPlaying(true);
      })
      .catch(() => {
        console.warn('Browser blocked autoplay. Music will start after next user interaction.');
      });
  }, []);

  const pauseMusic = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsMusicPlaying(false);
  }, []);

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  const handleEnterInvitation = () => {
    setIsOpeningVisible(false);
    startMusic();
  };

  // Pause music when tab is hidden, resume when visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current) audioRef.current.pause();
      } else if (!isOpeningVisible && isMusicPlaying) {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isOpeningVisible, isMusicPlaying]);

  // Scroll reveal animations
  useEffect(() => {
    const heroSection = document.querySelector('.hero');
    const revealElements = document.querySelectorAll('.reveal');

    if (heroSection) {
      heroSection.classList.add('is-visible');
    }

    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              heroObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15
        }
      );

      if (heroSection) heroObserver.observe(heroSection);

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      revealElements.forEach((element) => revealObserver.observe(element));

      return () => {
        if (heroSection) heroObserver.disconnect();
        revealObserver.disconnect();
      };
    } else {
      if (heroSection) heroSection.classList.add('is-visible');
      revealElements.forEach((element) => element.classList.add('visible'));
    }
  }, []);

  // Lightbox photo navigation
  const handleNavigatePhoto = (direction) => {
    if (activePhotoIndex === null) return;
    const total = photoGalleryData.length;
    setActivePhotoIndex((activePhotoIndex + direction + total) % total);
  };

  return (
    <>
      <OpeningScreen
        isVisible={isOpeningVisible}
        onEnter={handleEnterInvitation}
        onStartMusic={startMusic}
      />

      <audio
        ref={audioRef}
        id="bgMusic"
        loop
        preload="auto"
        src="/music.mp3"
      ></audio>

      {!isOpeningVisible && (
        <AudioController
          isPlaying={isMusicPlaying}
          onToggle={handleToggleMusic}
        />
      )}

      <main>
        <HeroSection countdown={countdown} />
        <StorySection />
        <EventsSection />
        <GallerySection onOpenImage={(index) => setActivePhotoIndex(index)} />
        <VenueSection />
        <RsvpSection />
      </main>

      <Footer />

      <ImageLightbox
        activeIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNavigate={handleNavigatePhoto}
      />
    </>
  );
}
