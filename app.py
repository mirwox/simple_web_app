import os
import sys

# Add server/ to the path so `from app import ...` resolves to server/app/__init__.py
_server_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'server')
sys.path.insert(0, _server_dir)

# Remove this file (app.py) from sys.modules so Python doesn't confuse it
# with the `app` package inside server/ when we do the import below.
sys.modules.pop('app', None)

from app import create_app  # now correctly imports server/app/__init__.py

# `app` is what Render's default `gunicorn app:app` command looks for.
app = create_app('production')
