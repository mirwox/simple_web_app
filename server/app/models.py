from .extensions import db


class Card(db.Model):
    """A trading card representing an open-weight LLM model."""
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=False)
    mascot_name = db.Column(db.String(100), nullable=False)
    mascot_description = db.Column(db.Text)
    mascot_image = db.Column(db.String(200))
    color_primary = db.Column(db.String(7), default='#6366f1')
    color_secondary = db.Column(db.String(7), default='#06b6d4')

    # Stats (all "higher is better")
    parameters = db.Column(db.Float, nullable=False)          # Billions
    context_window = db.Column(db.Integer, nullable=False)    # Thousands of tokens
    benchmark_score = db.Column(db.Integer, nullable=False)   # 0-100
    speed = db.Column(db.Integer, nullable=False)             # Normalized tok/s
    community_score = db.Column(db.Integer, nullable=False)   # 0-100
    openness = db.Column(db.Integer, nullable=False)          # 0-100

    # Metadata
    organization = db.Column(db.String(100))
    license = db.Column(db.String(50))
    release_year = db.Column(db.Integer)
    tagline = db.Column(db.String(300))

    # All stat fields for game comparisons
    STAT_FIELDS = ['parameters', 'context_window', 'benchmark_score',
                   'speed', 'community_score', 'openness']

    STAT_LABELS = {
        'parameters': 'Parameters (B)',
        'context_window': 'Context (K)',
        'benchmark_score': 'Benchmark',
        'speed': 'Speed',
        'community_score': 'Community',
        'openness': 'Open-ness',
    }

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'mascot_name': self.mascot_name,
            'mascot_description': self.mascot_description,
            'mascot_image': self.mascot_image,
            'color_primary': self.color_primary,
            'color_secondary': self.color_secondary,
            'stats': {
                'parameters': self.parameters,
                'context_window': self.context_window,
                'benchmark_score': self.benchmark_score,
                'speed': self.speed,
                'community_score': self.community_score,
                'openness': self.openness,
            },
            'organization': self.organization,
            'license': self.license,
            'release_year': self.release_year,
            'tagline': self.tagline,
        }

    def __repr__(self):
        return f'<Card {self.name}>'


class GameSession(db.Model):
    """A single Top Trumps game between the player and AI."""
    __tablename__ = 'game_sessions'

    id = db.Column(db.Integer, primary_key=True)
    player_deck = db.Column(db.JSON, nullable=False)   # [card_id, ...]
    ai_deck = db.Column(db.JSON, nullable=False)
    pot = db.Column(db.JSON, default=list)
    current_turn = db.Column(db.String(10), default='player')  # 'player' | 'ai'
    player_score = db.Column(db.Integer, default=0)
    ai_score = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default='active')  # active | finished
    round_number = db.Column(db.Integer, default=1)
    last_result = db.Column(db.JSON, default=dict)  # Last round result for display
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self, reveal_ai=False):
        """Serialize game state. Hides AI top card unless reveal_ai=True."""
        return {
            'id': self.id,
            'player_deck_count': len(self.player_deck) if self.player_deck else 0,
            'ai_deck_count': len(self.ai_deck) if self.ai_deck else 0,
            'player_top_card': self.player_deck[0] if self.player_deck else None,
            'ai_top_card': self.ai_deck[0] if (reveal_ai and self.ai_deck) else None,
            'pot_count': len(self.pot) if self.pot else 0,
            'current_turn': self.current_turn,
            'player_score': self.player_score,
            'ai_score': self.ai_score,
            'status': self.status,
            'round_number': self.round_number,
            'last_result': self.last_result,
        }

    def __repr__(self):
        return f'<GameSession {self.id} ({self.status})>'
