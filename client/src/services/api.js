const API_BASE = '/api';

export async function fetchCards() {
  const res = await fetch(`${API_BASE}/cards`);
  if (!res.ok) throw new Error('Failed to fetch cards');
  return res.json();
}

export async function fetchCard(slug) {
  const res = await fetch(`${API_BASE}/cards/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch card');
  return res.json();
}

export async function createGame() {
  const res = await fetch(`${API_BASE}/game/new`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to create game');
  return res.json();
}

export async function getGameState(gameId) {
  const res = await fetch(`${API_BASE}/game/${gameId}`);
  if (!res.ok) throw new Error('Failed to get game state');
  return res.json();
}

export async function playRound(gameId, stat) {
  const res = await fetch(`${API_BASE}/game/${gameId}/play`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stat }),
  });
  if (!res.ok) throw new Error('Failed to play round');
  return res.json();
}

export async function getGameResult(gameId) {
  const res = await fetch(`${API_BASE}/game/${gameId}/result`);
  if (!res.ok) throw new Error('Failed to get game result');
  return res.json();
}
