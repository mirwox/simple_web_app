import { useState, useRef, useCallback } from 'react';
import './Card.css';

const STAT_LABELS = {
  parameters: 'Parameters (B)',
  context_window: 'Context (K)',
  benchmark_score: 'Benchmark',
  speed: 'Speed',
  community_score: 'Community',
  openness: 'Open-ness',
};

const STAT_MAX = {
  parameters: 1600,
  context_window: 1024,
  benchmark_score: 100,
  speed: 100,
  community_score: 100,
  openness: 100,
};

export default function Card({
  card,
  interactive = false,
  onStatClick,
  highlightStat,
  highlightResult,
  flipped = false,
  compact = false,
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -15,
      y: (x - 0.5) * 15,
    });
    setShimmerPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  if (!card) return null;

  const { stats } = card;
  const tierClass =
    card.stats.benchmark_score >= 90 ? 'tier-legendary' :
    card.stats.benchmark_score >= 80 ? 'tier-epic' :
    card.stats.benchmark_score >= 70 ? 'tier-rare' : 'tier-common';

  return (
    <div
      ref={cardRef}
      className={`trading-card ${tierClass} ${flipped ? 'flipped' : ''} ${compact ? 'compact' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{
        '--color-primary': card.color_primary,
        '--color-secondary': card.color_secondary,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Holographic shimmer overlay */}
      <div
        className="card-shimmer"
        style={{
          background: `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
      />

      {/* Card Front */}
      <div className="card-front">
        {/* Top badge */}
        <div className="card-header">
          <span className="card-org">{card.organization}</span>
          <span className="card-license">{card.license}</span>
        </div>

        {/* Mascot image */}
        <div className="card-image-wrapper">
          <img
            src={card.mascot_image}
            alt={card.mascot_name}
            className="card-mascot-img"
            loading="lazy"
          />
          <div className="card-image-overlay" />
        </div>

        {/* Name plate */}
        <div className="card-nameplate">
          <h3 className="card-name">{card.name}</h3>
          <p className="card-mascot-name">{card.mascot_name}</p>
        </div>

        {/* Stats */}
        <div className="card-stats">
          {Object.entries(STAT_LABELS).map(([key, label]) => {
            const value = stats[key];
            const max = STAT_MAX[key];
            const pct = Math.min((value / max) * 100, 100);
            const isHighlighted = highlightStat === key;
            const resultClass = isHighlighted ? `stat-${highlightResult}` : '';

            return (
              <button
                key={key}
                className={`stat-row ${interactive ? 'clickable' : ''} ${isHighlighted ? 'highlighted' : ''} ${resultClass}`}
                onClick={() => interactive && onStatClick?.(key)}
                disabled={!interactive}
                type="button"
              >
                <span className="stat-label">{label}</span>
                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="stat-value">{value}</span>
              </button>
            );
          })}
        </div>

        {/* Tagline */}
        {!compact && (
          <p className="card-tagline">{card.tagline}</p>
        )}
      </div>

      {/* Card Back */}
      <div className="card-back">
        <div className="card-back-pattern" />
        <div className="card-back-logo">⚡ LLM TRUMPS</div>
      </div>
    </div>
  );
}
