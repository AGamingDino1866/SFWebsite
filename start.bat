@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not on PATH.
  echo Install Node.js from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

echo Starting Success Club Scholarship Portal...
echo Open http://localhost:4173 in your browser.
echo.

node server.js

echo.
echo Server stopped.
pause
