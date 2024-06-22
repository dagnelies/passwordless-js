#!/bin/bash
set -e

# Build Icons
pip install -r misc/requirements.txt
python misc/icons.py docs/authenticators

# Build JS libs
npm install
npm run build
cp dist/browser/*.js docs/demos/js

# Build docs
pip install -r docs/requirements.txt
mkdocs build
ls -l site