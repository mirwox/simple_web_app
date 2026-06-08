"""Top Trumps game engine — shuffle, compare, AI strategy, round resolution."""

import random
from ..extensions import db
from ..models import Card


def shuffle_and_deal(card_ids):
    """
    Shuffle the card IDs using Fisher-Yates and split into two equal decks.

    Returns (player_deck, ai_deck) — each a list of card IDs.
    """
    deck = list(card_ids)
    random.shuffle(deck)
    mid = len(deck) // 2
    return deck[:mid], deck[mid:]


def compare_stat(player_card, ai_card, stat_name):
    """
    Compare a single stat between two cards.

    Returns 'player', 'ai', or 'draw'.
    """
    player_val = getattr(player_card, stat_name)
    ai_val = getattr(ai_card, stat_name)

    if player_val > ai_val:
        return 'player'
    elif ai_val > player_val:
        return 'ai'
    else:
        return 'draw'


def ai_choose_stat(card):
    """
    AI strategy: pick the stat where this card scores highest.
    Adds slight randomness — 20% chance to pick a random stat instead,
    so the AI isn't perfectly predictable.
    """
    if random.random() < 0.2:
        return random.choice(Card.STAT_FIELDS)

    best_stat = None
    best_val = -1

    for stat in Card.STAT_FIELDS:
        val = getattr(card, stat)
        # Normalize parameters to 0-100 scale for fair comparison
        if stat == 'parameters':
            val = min(val / 16, 100)  # 1600B → 100
        elif stat == 'context_window':
            val = min(val / 10.24, 100)  # 1024K → 100

        if val > best_val:
            best_val = val
            best_stat = stat

    return best_stat


def resolve_round(session, chosen_stat):
    """
    Core game loop: compare the top cards on the chosen stat,
    move cards accordingly, handle draws with a pot.

    Mutates the session in place (caller must commit).
    Returns a dict describing the round outcome.
    """
    player_card_id = session.player_deck[0]
    ai_card_id = session.ai_deck[0]

    player_card = Card.query.get(player_card_id)
    ai_card = Card.query.get(ai_card_id)

    result = compare_stat(player_card, ai_card, chosen_stat)

    player_val = getattr(player_card, chosen_stat)
    ai_val = getattr(ai_card, chosen_stat)

    # Remove top cards from both decks
    player_deck = list(session.player_deck)
    ai_deck = list(session.ai_deck)
    pot = list(session.pot) if session.pot else []

    played_player = player_deck.pop(0)
    played_ai = ai_deck.pop(0)

    round_info = {
        'stat': chosen_stat,
        'stat_label': Card.STAT_LABELS.get(chosen_stat, chosen_stat),
        'player_card': player_card.to_dict(),
        'ai_card': ai_card.to_dict(),
        'player_value': player_val,
        'ai_value': ai_val,
        'winner': result,
        'chose_by': session.current_turn,
    }

    if result == 'player':
        # Player wins — collects both cards + any pot
        player_deck.extend([played_player, played_ai] + pot)
        pot = []
        session.player_score += 1
        session.current_turn = 'player'
    elif result == 'ai':
        # AI wins — collects both cards + any pot
        ai_deck.extend([played_ai, played_player] + pot)
        pot = []
        session.ai_score += 1
        session.current_turn = 'ai'
    else:
        # Draw — cards go to pot, same player picks again
        pot.extend([played_player, played_ai])

    round_info['pot_count'] = len(pot)

    # Update session
    session.player_deck = player_deck
    session.ai_deck = ai_deck
    session.pot = pot
    session.last_result = round_info
    session.round_number += 1

    # Check for game over
    if not player_deck or not ai_deck:
        session.status = 'finished'
        # Award remaining pot cards to whoever has cards left
        if pot:
            if player_deck:
                player_deck.extend(pot)
                session.player_deck = player_deck
            elif ai_deck:
                ai_deck.extend(pot)
                session.ai_deck = ai_deck
            session.pot = []

    return round_info
