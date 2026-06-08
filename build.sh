#!/usr/bin/env bash
set -e  # abort on any error

echo "==> Installing Python dependencies..."
pip install -r server/requirements.txt

echo "==> Installing Node dependencies and building React frontend..."
cd client
npm install
npm run build
cd ..

echo "==> Build complete ✅"
