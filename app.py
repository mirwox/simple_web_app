import os
import sys

# Add server/ to the path so server/app/__init__.py can be found
_server_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'server')
sys.path.insert(0, _server_dir)

# Step 1: save a reference to this module, then remove it from sys.modules.
# Without this, `from app import create_app` would find app.py itself (circular).
_this = sys.modules.pop(__name__, None)

from app import create_app   # now correctly imports server/app/__init__.py

# Step 2: create the Flask instance — assigned as `app` on this module's namespace
app = create_app('production')

# Step 3: restore THIS file as sys.modules['app'] so that gunicorn's
# `gunicorn app:app` finds the `app` attribute (the Flask instance) on it.
if _this is not None:
    sys.modules[__name__] = _this
