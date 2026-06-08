import './ResultModal.css';

export default function ResultModal({ game, onPlayAgain }) {
  const winner =
    game.player_score > game.ai_score ? 'player' :
    game.ai_score > game.player_score ? 'ai' : 'draw';

  return (
    <div className="result-overlay">
      <div className={`result-modal glass result-${winner}`}>
        <div className="result-emoji">
          {winner === 'player' ? '🏆' : winner === 'ai' ? '💀' : '🤝'}
        </div>
        <h2 className="result-title">
          {winner === 'player' ? 'Victory!' :
           winner === 'ai' ? 'Defeat!' : 'Draw!'}
        </h2>
        <p className="result-subtitle">
          {winner === 'player'
            ? 'You outsmarted the AI! Your LLM knowledge is unmatched.'
            : winner === 'ai'
            ? 'The AI chose wisely. Better luck next time!'
            : 'Evenly matched! A battle for the ages.'}
        </p>
        <div className="result-scores">
          <div className="result-score-item">
            <span className="rs-label">You</span>
            <span className="rs-value">{game.player_score}</span>
          </div>
          <span className="rs-divider">–</span>
          <div className="result-score-item">
            <span className="rs-label">AI</span>
            <span className="rs-value">{game.ai_score}</span>
          </div>
        </div>
        <button className="play-again-btn" onClick={onPlayAgain}>
          ⚡ Play Again
        </button>
      </div>
    </div>
  );
}
