import { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import ResultModal from './ResultModal';
import { createGame, playRound, getGameState } from '../services/api';
import './GameBoard.css';

export default function GameBoard() {
  const [game, setGame] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [aiCard, setAiCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roundResult, setRoundResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [animating, setAnimating] = useState(false);

  const startNewGame = useCallback(async () => {
    setLoading(true);
    setGameOver(false);
    setRoundResult(null);
    setAiCard(null);
    try {
      const data = await createGame();
      setGame(data);
      setPlayerCard(data.player_top_card_detail);
    } catch (err) {
      console.error('Failed to start game:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleStatClick = async (stat) => {
    if (!game || animating || game.status === 'finished') return;
    setAnimating(true);

    try {
      const result = await playRound(game.id, stat);
      const rr = result.round_result;

      // Show AI card and result
      setAiCard(rr.ai_card);
      setRoundResult(rr);
      setShowResult(true);

      // After delay, move to next round
      setTimeout(() => {
        setShowResult(false);
        setAiCard(null);
        setRoundResult(null);
        setGame(result);
        setPlayerCard(result.player_top_card_detail);

        if (result.status === 'finished') {
          setGameOver(true);
        } else if (result.current_turn === 'ai') {
          // AI's turn — auto-play after short delay
          setTimeout(() => handleAiTurn(result.id), 1200);
        }
        setAnimating(false);
      }, 2500);
    } catch (err) {
      console.error('Failed to play round:', err);
      setAnimating(false);
    }
  };

  const handleAiTurn = async (gameId) => {
    setAnimating(true);
    try {
      const result = await playRound(gameId, null); // AI picks stat server-side
      const rr = result.round_result;

      setAiCard(rr.ai_card);
      setRoundResult(rr);
      setShowResult(true);

      setTimeout(() => {
        setShowResult(false);
        setAiCard(null);
        setRoundResult(null);
        setGame(result);
        setPlayerCard(result.player_top_card_detail);

        if (result.status === 'finished') {
          setGameOver(true);
        } else if (result.current_turn === 'ai') {
          setTimeout(() => handleAiTurn(result.id), 1200);
        }
        setAnimating(false);
      }, 2500);
    } catch (err) {
      console.error('AI turn failed:', err);
      setAnimating(false);
    }
  };

  if (loading) {
    return (
      <div className="gameboard-loading">
        <div className="loading-spinner" />
        <p>Shuffling the deck…</p>
      </div>
    );
  }

  if (!game) return null;

  const isPlayerTurn = game.current_turn === 'player' && !animating;

  return (
    <div className="gameboard">
      {/* Score Bar */}
      <div className="score-bar glass">
        <div className="score-player">
          <span className="score-label">YOU</span>
          <span className="score-value">{game.player_score}</span>
          <span className="deck-count">{game.player_deck_count} cards</span>
        </div>
        <div className="round-info">
          <span className="round-badge">Round {game.round_number}</span>
          {game.pot_count > 0 && (
            <span className="pot-badge">🏆 Pot: {game.pot_count}</span>
          )}
        </div>
        <div className="score-ai">
          <span className="score-label">AI</span>
          <span className="score-value">{game.ai_score}</span>
          <span className="deck-count">{game.ai_deck_count} cards</span>
        </div>
      </div>

      {/* Turn indicator */}
      <div className={`turn-indicator ${isPlayerTurn ? 'your-turn' : ''}`}>
        {animating ? '⚔️ Battling…' : isPlayerTurn ? '👆 Pick a stat to battle!' : '🤖 AI is choosing…'}
      </div>

      {/* Battle Arena */}
      <div className="battle-arena">
        {/* Player card */}
        <div className={`arena-slot player-slot ${showResult ? 'battle-reveal' : ''}`}>
          <h4 className="slot-label">Your Card</h4>
          {playerCard ? (
            <Card
              card={playerCard}
              interactive={isPlayerTurn}
              onStatClick={handleStatClick}
              highlightStat={roundResult?.stat}
              highlightResult={roundResult?.winner === 'player' ? 'player' : roundResult?.winner === 'ai' ? 'ai' : roundResult?.winner === 'draw' ? 'draw' : null}
            />
          ) : (
            <div className="empty-slot">No cards left</div>
          )}
        </div>

        {/* VS badge */}
        <div className="vs-badge">
          <span>VS</span>
        </div>

        {/* AI card */}
        <div className={`arena-slot ai-slot ${showResult ? 'battle-reveal' : ''}`}>
          <h4 className="slot-label">AI&apos;s Card</h4>
          {showResult && aiCard ? (
            <Card
              card={aiCard}
              interactive={false}
              highlightStat={roundResult?.stat}
              highlightResult={roundResult?.winner === 'ai' ? 'player' : roundResult?.winner === 'player' ? 'ai' : 'draw'}
            />
          ) : (
            <div className="card-back-placeholder">
              <div className="card-back-pattern-sm" />
              <span>⚡ LLM TRUMPS</span>
            </div>
          )}
        </div>
      </div>

      {/* Round result flash */}
      {showResult && roundResult && (
        <div className={`round-flash round-flash-${roundResult.winner}`}>
          <div className="flash-content">
            <span className="flash-stat">{roundResult.stat_label}</span>
            <span className="flash-values">
              {roundResult.player_value} vs {roundResult.ai_value}
            </span>
            <span className="flash-winner">
              {roundResult.winner === 'player' ? '🎉 You Win!' :
               roundResult.winner === 'ai' ? '😤 AI Wins!' : '🤝 Draw!'}
            </span>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <ResultModal game={game} onPlayAgain={startNewGame} />
      )}
    </div>
  );
}
