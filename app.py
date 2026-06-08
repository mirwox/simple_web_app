import os
import sys

# Add the server directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'server')))

from app import create_app

# Render defaults to running `gunicorn app:app` from the root directory.
# This file provides the `app` object that Render is looking for.
app = create_app('production')
