#!/bin/bash
set -e

echo ""
echo "  =========================================="
echo "   otp-Init - One-Click Setup"
echo "  =========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "  [!] Node.js not found."
    echo "      Install from: https://nodejs.org"
    echo "      Then run this script again."
    exit 1
fi
echo "  [ok] Node.js found"

# Check Python
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "  [!] Python not found."
    echo "      Install from: https://python.org"
    exit 1
fi
echo "  [ok] Python found"

PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "  [*] Installing pnpm..."
    npm install -g pnpm
fi
echo "  [ok] pnpm found"

# Create .env if missing
if [ ! -f "apps/api/.env" ]; then
    echo "  [*] Creating .env file..."

    API_KEY=$(openssl rand -hex 16)
    SECRET_KEY=$(openssl rand -hex 16)

    cat > apps/api/.env <<EOF
DATABASE_URL=sqlite+aiosqlite:///./otp_init.db
SECRET_KEY=${SECRET_KEY}
API_KEY=${API_KEY}
OTP_LENGTH=6
OTP_TTL=300
MAX_ATTEMPTS=5
SIGNAL_PHONE=
SIGNAL_CLI_PATH=signal-cli
SIGNAL_CLI_TIMEOUT=30
CORS_ORIGINS=["http://localhost:3000","http://localhost:3001"]
DEBUG=false
EOF

    echo ""
    echo "  =========================================="
    echo "   Your API Key (save this somewhere safe):"
    echo ""
    echo "   ${API_KEY}"
    echo ""
    echo "  =========================================="
    echo ""
fi

# Install dependencies
echo "  [*] Installing dependencies..."
pnpm install

# Install Python dependencies
echo "  [*] Installing Python dependencies..."
cd apps/api
if [ -f "requirements.txt" ]; then
    $PYTHON_CMD -m pip install -r requirements.txt -q 2>/dev/null || true
fi
cd ../..

# Start everything
echo ""
echo "  [ok] Setup complete! Starting otp-Init..."
echo ""
echo "  ------------------------------------------"
echo "   Web:       http://localhost:3000"
echo "   API:       http://localhost:8000"
echo "   Dashboard: http://localhost:3000/dashboard"
echo "  ------------------------------------------"
echo ""

pnpm dev
