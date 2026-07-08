#!/bin/bash
cd "$(dirname "$0")" || exit 1

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed or is not on PATH."
  echo "Install Node.js from https://nodejs.org/ and try again."
  read -r -p "Press Enter to close..."
  exit 1
fi

echo "Starting Success Club Scholarship Portal..."
echo "Open http://localhost:4173 in your browser."
echo

node server.js

echo
echo "Server stopped."
read -r -p "Press Enter to close..."
