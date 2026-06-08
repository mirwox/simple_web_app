import os
import sys
import importlib.util

# Explicitly load the server/app package to avoid circular import
# (Python would otherwise confuse 'app' with this file itself)
_server_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'server'))
_spec = importlib.util.spec_from_file_location(
    "server_app",
    os.path.join(_server_dir, "app", "__init__.py"),
    submodule_search_locations=[os.path.join(_server_dir, "app")]
)
_server_app_module = importlib.util.module_from_spec(_spec)
sys.modules["server_app"] = _server_app_module
sys.path.insert(0, _server_dir)
_spec.loader.exec_module(_server_app_module)

# Render defaults to running `gunicorn app:app` from the root directory.
# This file provides the `app` object that Render is looking for.
app = _server_app_module.create_app('production')
