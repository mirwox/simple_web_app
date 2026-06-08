import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameBoard from './components/GameBoard';
import CardCollection from './components/CardCollection';
import './App.css';

function LandingPage() {
  return (
    <div className="landing">
      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-bolt">⚡</span>
            LLM Trumps
          </h1>
          <p className="hero-subtitle">
            The ultimate open-weight LLM trading card battle.
            <br />
            Pick your stats. Outsmart the AI. Collect them all.
          </p>
          <div className="hero-actions">
            <Link to="/play" className="btn-primary">
              🎮 Play Now
            </Link>
            <Link to="/collection" className="btn-secondary">
              🃏 View Collection
            </Link>
          </div>
        </div>

        {/* Floating card previews */}
        <div className="hero-cards">
          <div className="floating-card fc-1">
            <img src="/mascots/deepseek-v4.png" alt="Abyssal" />
          </div>
          <div className="floating-card fc-2">
            <img src="/mascots/llama-4-maverick.png" alt="Valcuno" />
          </div>
          <div className="floating-card fc-3">
            <img src="/mascots/gemma-4.png" alt="Crystara" />
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="features">
        <div className="feature glass">
          <span className="feature-icon">🏆</span>
          <h3>10 Champions</h3>
          <p>DeepSeek, Llama, Gemma, Mistral, and more — each with a unique mascot and stats.</p>
        </div>
        <div className="feature glass">
          <span className="feature-icon">⚔️</span>
          <h3>Top Trumps Battles</h3>
          <p>Pick Parameters, Speed, Benchmark, or Community — highest stat wins the round.</p>
        </div>
        <div className="feature glass">
          <span className="feature-icon">🤖</span>
          <h3>Smart AI Opponent</h3>
          <p>The AI knows its cards. Can you outsmart it with strategic stat picks?</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/play" element={<GameBoard />} />
        <Route path="/collection" element={<CardCollection />} />
      </Routes>
    </BrowserRouter>
  );
}
