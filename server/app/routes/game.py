"""Game session endpoints — play Top Trumps against AI."""

from flask import Blueprint, jsonify, request
from ..extensions import db
from ..models import Card, GameSession
from ..services.game_engine import (
    shuffle_and_deal,
    resolve_round,
    ai_choose_stat,
)

game_bp = Blueprint('game', __name__)


@game_bp.route('/game/new', methods=['POST'])
def new_game():
    """Create a new game session — shuffle and deal 5 cards each."""
    cards = Card.query.all()
    card_ids = [c.id for c in cards]

    player_deck, ai_deck = shuffle_and_deal(card_ids)

    session = GameSession(
        player_deck=player_deck,
        ai_deck=ai_deck,
        pot=[],
        current_turn='player',
        player_score=0,
        ai_score=0,
        status='active',
        round_number=1,
        last_result={},
    )
    db.session.add(session)
    db.session.commit()

    # Fetch the player's top card details
    top_card = Card.query.get(player_deck[0])

    result = session.to_dict()
    result['player_top_card_detail'] = top_card.to_dict() if top_card else None
    return jsonify(result), 201


@game_bp.route('/game/<int:game_id>', methods=['GET'])
def get_game(game_id):
    """Get current game state (AI top card hidden)."""
    session = GameSession.query.get_or_404(game_id)

    result = session.to_dict(reveal_ai=False)

    # Include full card data for player's top card
    if session.player_deck:
        top_card = Card.query.get(session.player_deck[0])
        result['player_top_card_detail'] = top_card.to_dict() if top_card else None
    else:
        result['player_top_card_detail'] = None

    return jsonify(result)


@game_bp.route('/game/<int:game_id>/play', methods=['POST'])
def play_round(game_id):
    """
    Play a round.

    If it's the player's turn, the request body must include:
        { "stat": "parameters" }   (one of the 6 stat fields)

    If it's the AI's turn, the AI picks the stat automatically.
    """
    session = GameSession.query.get_or_404(game_id)

    if session.status != 'active':
        return jsonify({'error': 'Game is already finished.'}), 400

    if not session.player_deck or not session.ai_deck:
        return jsonify({'error': 'No cards left to play.'}), 400

    # Determine which stat is chosen
    if session.current_turn == 'player':
        data = request.get_json(silent=True) or {}
        stat = data.get('stat')
        valid_stats = Card.STAT_FIELDS
        if stat not in valid_stats:
            return jsonify({
                'error': f'Invalid stat. Choose one of: {valid_stats}'
            }), 400
    else:
        # AI's turn — pick the best stat from AI's top card
        ai_card = Card.query.get(session.ai_deck[0])
        stat = ai_choose_stat(ai_card)

    # Resolve the round
    round_result = resolve_round(session, stat)
    db.session.commit()

    # Build response with both card details
    response = session.to_dict(reveal_ai=True)
    response['round_result'] = round_result

    # Include card details for next round
    if session.player_deck:
        next_card = Card.query.get(session.player_deck[0])
        response['player_top_card_detail'] = next_card.to_dict() if next_card else None
    else:
        response['player_top_card_detail'] = None

    return jsonify(response)


@game_bp.route('/game/<int:game_id>/result', methods=['GET'])
def game_result(game_id):
    """Get the final result of a finished game."""
    session = GameSession.query.get_or_404(game_id)

    winner = None
    if session.status == 'finished':
        if session.player_score > session.ai_score:
            winner = 'player'
        elif session.ai_score > session.player_score:
            winner = 'ai'
        else:
            winner = 'draw'

    return jsonify({
        'id': session.id,
        'status': session.status,
        'player_score': session.player_score,
        'ai_score': session.ai_score,
        'winner': winner,
        'round_number': session.round_number,
    })
