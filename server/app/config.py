import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-prod')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_SORT_KEYS = False


class DevelopmentConfig(Config):
    """Local development — SQLite in the server/ directory."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, '..', 'llm_trumps.db')


class ProductionConfig(Config):
    """Production — PostgreSQL on Render."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '')

    def __init__(self):
        # Render provides postgres:// but SQLAlchemy 2.x requires postgresql://
        if self.SQLALCHEMY_DATABASE_URI.startswith('postgres://'):
            self.SQLALCHEMY_DATABASE_URI = self.SQLALCHEMY_DATABASE_URI.replace(
                'postgres://', 'postgresql://', 1
            )


config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
}
