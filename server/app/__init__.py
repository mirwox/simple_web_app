import os

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate

from .config import config_by_name
from .extensions import db


migrate = Migrate()


def create_app(config_name=None):
    """Application factory."""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')

    app = Flask(
        __name__,
        static_folder=None,  # We serve React's build ourselves
    )

    config_cls = config_by_name[config_name]
    if callable(config_cls):
        app.config.from_object(config_cls())
    else:
        app.config.from_object(config_cls)

    # ── Extensions ──────────────────────────────────────────────
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # ── Blueprints ──────────────────────────────────────────────
    from .routes.cards import cards_bp
    from .routes.game import game_bp

    app.register_blueprint(cards_bp, url_prefix='/api')
    app.register_blueprint(game_bp, url_prefix='/api')

    # ── Serve React build in production ─────────────────────────
    client_dist = os.path.join(os.path.dirname(__file__), '..', '..', 'client', 'dist')

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react(path):
        """Serve the React SPA; fall back to index.html for client-side routing."""
        full = os.path.join(client_dist, path)
        if path and os.path.isfile(full):
            return send_from_directory(client_dist, path)
        return send_from_directory(client_dist, 'index.html')

    # ── CLI: seed command ───────────────────────────────────────
    from .seed import seed_db

    @app.cli.command('seed')
    def seed_command():
        """Seed the database with the 10 LLM trading cards."""
        seed_db()
        print('✅  Database seeded with 10 LLM trading cards.')

    # ── Create tables on first request (dev convenience) ────────
    with app.app_context():
        db.create_all()

    return app
