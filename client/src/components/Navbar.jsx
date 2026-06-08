import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar glass">
      <Link to="/" className="nav-brand">
        <span className="nav-logo">⚡</span>
        <span className="nav-title">LLM Trumps</span>
      </Link>
      <div className="nav-links">
        <Link
          to="/play"
          className={`nav-link ${location.pathname === '/play' ? 'active' : ''}`}
        >
          🎮 Play
        </Link>
        <Link
          to="/collection"
          className={`nav-link ${location.pathname === '/collection' ? 'active' : ''}`}
        >
          🃏 Collection
        </Link>
      </div>
    </nav>
  );
}
