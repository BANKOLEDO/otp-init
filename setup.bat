@echo off
title otp-Init Setup
color 0F

echo.
echo  ==========================================
echo   otp-Init - One-Click Setup
echo  ==========================================
echo.

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [!] Node.js not found.
    echo      Download from: https://nodejs.org
    echo      Install the LTS version, then run this script again.
    echo.
    pause
    exit /b 1
)
echo  [ok] Node.js found

:: Check Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo  [!] Python not found.
    echo      Download from: https://python.org
    echo      Make sure to check "Add to PATH" during install.
    echo.
    pause
    exit /b 1
)
echo  [ok] Python found

:: Check pnpm
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo  [*] Installing pnpm...
    call npm install -g pnpm
)
echo  [ok] pnpm found

:: Create .env if missing
if not exist "apps\api\.env" (
    echo  [*] Creating .env file...

    :: Generate a random API key
    for /f "delims=" %%i in ('powershell -Command "[guid]::NewGuid().ToString('N').Substring(0,32)"') do set API_KEY=%%i
    for /f "delims=" %%i in ('powershell -Command "[guid]::NewGuid().ToString('N').Substring(0,32)"') do set SECRET_KEY=%%i

    (
        echo DATABASE_URL=sqlite+aiosqlite:///./otp_init.db
        echo SECRET_KEY=%SECRET_KEY%
        echo API_KEY=%API_KEY%
        echo OTP_LENGTH=6
        echo OTP_TTL=300
        echo MAX_ATTEMPTS=5
        echo CORS_ORIGINS=["http://localhost:3000","http://localhost:3001"]
        echo DEBUG=false
    ) > apps\api\.env

    echo.
    echo  ==========================================
    echo   Your API Key (save this somewhere safe):
    echo.
    echo   %API_KEY%
    echo.
    echo  ==========================================
    echo.
)

:: Install dependencies
echo  [*] Installing dependencies...
call pnpm install

:: Install Python dependencies
echo  [*] Installing Python dependencies...
cd apps\api
pip install -r requirements.txt >nul 2>nul
cd ..\..

:: Start everything
echo.
echo  [ok] Setup complete! Starting otp-Init...
echo.
echo  ------------------------------------------
echo   Web:      http://localhost:3000
echo   API:      http://localhost:8000
echo   Dashboard: http://localhost:3000/dashboard
echo  ------------------------------------------
echo.

call pnpm dev
