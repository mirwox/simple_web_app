"""Card endpoints — browse the 10 LLM trading cards."""

from flask import Blueprint, jsonify
from ..models import Card

cards_bp = Blueprint('cards', __name__)


@cards_bp.route('/cards', methods=['GET'])
def list_cards():
    """Return all 10 trading cards."""
    cards = Card.query.order_by(Card.id).all()
    return jsonify([c.to_dict() for c in cards])


@cards_bp.route('/cards/<slug>', methods=['GET'])
def get_card(slug):
    """Return a single card by slug."""
    card = Card.query.filter_by(slug=slug).first_or_404()
    return jsonify(card.to_dict())
