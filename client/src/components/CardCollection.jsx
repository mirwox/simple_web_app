import { useState, useEffect } from 'react';
import Card from './Card';
import { fetchCards } from '../services/api';
import './CardCollection.css';

const SORT_OPTIONS = [
  { key: 'name', label: 'Name' },
  { key: 'parameters', label: 'Parameters' },
  { key: 'context_window', label: 'Context' },
  { key: 'benchmark_score', label: 'Benchmark' },
  { key: 'speed', label: 'Speed' },
  { key: 'community_score', label: 'Community' },
  { key: 'openness', label: 'Open-ness' },
];

export default function CardCollection() {
  const [cards, setCards] = useState([]);
  const [sortBy, setSortBy] = useState('benchmark_score');
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards()
      .then(setCards)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const sorted = [...cards].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return (b.stats?.[sortBy] ?? b[sortBy] ?? 0) - (a.stats?.[sortBy] ?? a[sortBy] ?? 0);
  });

  if (loading) {
    return (
      <div className="collection-loading">
        <div className="loading-spinner" />
        <p>Loading collection…</p>
      </div>
    );
  }

  return (
    <div className="collection">
      <div className="collection-header">
        <div>
          <h1 className="collection-title">Card Collection</h1>
          <p className="collection-subtitle">All 10 open-weight LLM champions</p>
        </div>
        <div className="sort-controls">
          <label className="sort-label">Sort by:</label>
          <div className="sort-pills">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.key}
                className={`sort-pill ${sortBy === opt.key ? 'active' : ''}`}
                onClick={() => setSortBy(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="collection-grid">
        {sorted.map((card, i) => (
          <div
            key={card.id}
            className="collection-item"
            style={{ animationDelay: `${i * 80}ms` }}
            onClick={() => setSelectedCard(card)}
          >
            <Card card={card} compact />
          </div>
        ))}
      </div>

      {/* Expanded card modal */}
      {selectedCard && (
        <div className="card-modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="card-modal-content" onClick={e => e.stopPropagation()}>
            <button className="card-modal-close" onClick={() => setSelectedCard(null)}>✕</button>
            <Card card={selectedCard} />
            <div className="card-modal-lore">
              <p className="lore-text">{selectedCard.mascot_description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
