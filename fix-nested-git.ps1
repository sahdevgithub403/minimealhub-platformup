# Fix Nested Git Repository Issue
# This script removes the embedded .git folder from backend

Write-Host "🔧 Fixing Nested Git Repository Issue" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

# Step 1: Check for nested git repos
Write-Host "🔍 Checking for nested Git repositories..." -ForegroundColor Cyan
$backendGit = Test-Path "backend\.git"
$frontendGit = Test-Path "frontend\.git"

if ($backendGit) {
    Write-Host "⚠️  Found .git in backend/" -ForegroundColor Yellow
}
else {
    Write-Host "✅ No .git in backend/" -ForegroundColor Green
}

if ($frontendGit) {
    Write-Host "⚠️  Found .git in frontend/" -ForegroundColor Yellow
}
else {
    Write-Host "✅ No .git in frontend/" -ForegroundColor Green
}

Write-Host ""

# Step 2: Remove nested git repositories
if ($backendGit -or $frontendGit) {
    Write-Host "🗑️  Removing nested Git repositories..." -ForegroundColor Cyan
    
    if ($backendGit) {
        Write-Host "   Removing backend\.git..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force "backend\.git"
        Write-Host "   ✅ Removed backend\.git" -ForegroundColor Green
    }
    
    if ($frontendGit) {
        Write-Host "   Removing frontend\.git..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force "frontend\.git"
        Write-Host "   ✅ Removed frontend\.git" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "✅ Nested repositories removed!`n" -ForegroundColor Green
}
else {
    Write-Host "✅ No nested repositories found. Nothing to fix!`n" -ForegroundColor Green
    exit
}

# Step 3: Clean Git cache and re-add files
Write-Host "🧹 Cleaning Git cache..." -ForegroundColor Cyan
git rm -r --cached . 2>$null
Write-Host "✅ Cache cleaned`n" -ForegroundColor Green

Write-Host "➕ Adding all files..." -ForegroundColor Cyan
git add .
Write-Host "✅ Files added`n" -ForegroundColor Green

# Step 4: Show status
Write-Host "📊 Current Git status:" -ForegroundColor Cyan
git status --short
Write-Host ""

Write-Host "✅ Fixed! Now you can commit and push." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. git commit -m 'Fix nested git repositories and add all code'" -ForegroundColor White
Write-Host "2. git push origin main" -ForegroundColor White
Write-Host ""
