// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — HeroSection Component
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMG_SIZES } from '../../constants';
import { StarIcon, PlayIcon, InfoIcon } from './Icons';

const INTERVAL_MS = 7000;

export default function HeroSection({ items = [] }) {
  const navigate = useNavigate();
  const [heroIdx, setHeroIdx] = useState(0);
  const timerRef = useRef(null);
  const idxRef = useRef(0);
  const isPausedRef = useRef(false);

  const heroItems = useMemo(
    () => items.filter((i) => i.backdrop_path).slice(0, 5),
    [items]
  );

  const heroItem = heroItems[heroIdx];

  // Keep idxRef in sync
  useEffect(() => { idxRef.current = heroIdx; }, [heroIdx]);

  // Start auto-advance
  const startTimer = useCallback(() => {
    if (heroItems.length < 2) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = (idxRef.current + 1) % heroItems.length;
      idxRef.current = next;
      setHeroIdx(next);
    }, INTERVAL_MS);
  }, [heroItems.length]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  useEffect(() => {
    if (heroItems.length < 2) return undefined;
    if (isPausedRef.current) return undefined;

    stopTimer();
    startTimer();

    return undefined;
  }, [heroIdx, heroItems.length, startTimer, stopTimer]);

  // Pause-on-hover handlers
  const handleMouseEnter = useCallback(() => {
    isPausedRef.current = true;
    stopTimer();
  }, [stopTimer]);

  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false;
    startTimer();
  }, [startTimer]);

  if (!heroItem) return null;

  const type = heroItem.media_type || (heroItem.title ? 'movie' : 'tv');
  const title = heroItem.title || heroItem.name;

  return (
    <div
      className="hero"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="hero-bg"
        src={`${IMG_SIZES.backdrop.original}${heroItem.backdrop_path}`}
        alt=""
        loading="eager"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">
          <div className="live-dot" />
          Trending Today
        </div>
        <h1 className="hero-title">{title}</h1>
        <div className="hero-meta">
          <span className="star-icon" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <StarIcon />
            {(+heroItem.vote_average).toFixed(1)}
          </span>
          <span>{(heroItem.release_date || heroItem.first_air_date || '').slice(0, 4)}</span>
          <span style={{ textTransform: 'capitalize' }}>
            {type === 'movie' ? 'Film' : 'Series'}
          </span>
        </div>
        {heroItem.overview && <p className="hero-overview">{heroItem.overview}</p>}
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate(`/${type}/${heroItem.id}`)}>
            <PlayIcon /> View Details
          </button>
          <button className="btn-secondary" onClick={() => navigate(`/${type}/${heroItem.id}`)}>
            <InfoIcon /> More Info
          </button>
        </div>
        {heroItems.length > 1 && (
          <div className="hero-dots">
            {heroItems.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  stopTimer();
                  setHeroIdx(i);
                  if (!isPausedRef.current) startTimer();
                }}
                aria-label={`Slide ${i + 1}`}
                className={`hero-dot ${i === heroIdx ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}