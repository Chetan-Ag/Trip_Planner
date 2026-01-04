@echo off
title Travel Planner - Complete Setup

echo ========================================
echo    TRAVEL PLANNER - FINAL SETUP
echo ========================================
echo.

echo [1/3] Resetting database...
cd /d "%~dp0backend"
python reset_db.py
echo.

echo [2/3] Starting Backend Server...
start "Backend" cmd /k "python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo Backend starting on http://localhost:8000
echo.

echo [3/3] Starting Frontend Server...
cd /d "%~dp0frontend"
start "Frontend" cmd /k "npm run dev"
echo Frontend starting on http://localhost:5173
echo.

echo ========================================
echo         SETUP COMPLETE!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo.
echo Press any key to exit...
pause > nul