Write-Host "🏖️ Starting Trip Planner Frontend..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Current Directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Change to frontend directory
Set-Location -Path $PSScriptRoot

Write-Host "📦 Installing dependencies..." -ForegroundColor Green
npm install

Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Green
Write-Host "🌐 Your app will be available at: http://localhost:3000" -ForegroundColor Magenta
Write-Host ""

npm run dev