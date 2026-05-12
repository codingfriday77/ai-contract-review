# AI Contract Review - Setup Script for Windows (PowerShell)
# Run this script with: powershell -ExecutionPolicy Bypass -File setup.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AI Contract Review - Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (Test-Path ".env") {
    Write-Host "[✓] .env file found" -ForegroundColor Green
} else {
    Write-Host "[!] .env file not found" -ForegroundColor Yellow
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "[✓] .env file created. Please edit it with your OpenAI API key" -ForegroundColor Green
    } else {
        Write-Host "[✗] .env.example not found" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Setting up Backend..." -ForegroundColor Cyan
Write-Host "---" -ForegroundColor Cyan

# Check if Python is installed
$pythonVersion = python --version 2>&1
if ($?) {
    Write-Host "[✓] Python found: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "[✗] Python not found. Please install Python 3.8+ from https://www.python.org/" -ForegroundColor Red
    exit 1
}

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
cd Backend
python -m pip install -r requirements.txt --quiet
if ($?) {
    Write-Host "[✓] Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[✗] Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}
cd ..

Write-Host ""
Write-Host "Setting up Frontend..." -ForegroundColor Cyan
Write-Host "---" -ForegroundColor Cyan

# Check if Node.js is installed
$nodeVersion = node --version 2>&1
if ($?) {
    Write-Host "[✓] Node.js found: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "[✗] Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
cd Frontend
npm install --quiet
if ($?) {
    Write-Host "[✓] Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[✗] Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
cd ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env file and add your OpenAI API key" -ForegroundColor White
Write-Host "2. Run the backend: cd Backend && python app.py" -ForegroundColor White
Write-Host "3. In another terminal, run frontend: cd Frontend && npm run dev" -ForegroundColor White
Write-Host "4. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "For more details, see QUICKSTART.md" -ForegroundColor Cyan
