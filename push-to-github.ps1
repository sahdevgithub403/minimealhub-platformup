# Quick Git Cleanup and Push Script for MiniMeal
# Run this script to clean up Git cache and push to GitHub

Write-Host "🚀 MiniMeal - Git Cleanup and Push Helper" -ForegroundColor Cyan
Write-Host "=========================================`n" -ForegroundColor Cyan

# Step 1: Check if Git is initialized
if (-Not (Test-Path ".git")) {
    Write-Host "❌ Git not initialized. Initializing now..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized`n" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized`n" -ForegroundColor Green
}

# Step 2: Show current large directories
Write-Host "📊 Checking for large directories..." -ForegroundColor Cyan
$nodeMods = Get-ChildItem -Recurse -Directory -Filter "node_modules" -ErrorAction SilentlyContinue
$target = Get-ChildItem -Recurse -Directory -Filter "target" -ErrorAction SilentlyContinue

if ($nodeMods) {
    Write-Host "⚠️  Found node_modules folders (will be ignored by .gitignore)" -ForegroundColor Yellow
}
if ($target) {
    Write-Host "⚠️  Found target folders (will be ignored by .gitignore)" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Clean Git cache
Write-Host "🧹 Cleaning Git cache..." -ForegroundColor Cyan
git rm -r --cached . 2>$null
Write-Host "✅ Git cache cleaned`n" -ForegroundColor Green

# Step 4: Add all files (respecting .gitignore)
Write-Host "➕ Adding files (respecting .gitignore)..." -ForegroundColor Cyan
git add .
Write-Host "✅ Files added`n" -ForegroundColor Green

# Step 5: Show what will be committed
Write-Host "📝 Files to be committed:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Step 6: Create commit
Write-Host "💾 Creating commit..." -ForegroundColor Cyan
$commitMsg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Add .gitignore and remove large files"
}
git commit -m $commitMsg
Write-Host "✅ Commit created`n" -ForegroundColor Green

# Step 7: Check for remote
Write-Host "🔗 Checking remote repository..." -ForegroundColor Cyan
$remote = git remote -v 2>$null
if ([string]::IsNullOrWhiteSpace($remote)) {
    Write-Host "⚠️  No remote repository found" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To add a remote repository, run:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor White
    Write-Host ""
    $addRemote = Read-Host "Enter your GitHub repository URL (or press Enter to skip)"
    if (-Not [string]::IsNullOrWhiteSpace($addRemote)) {
        git remote add origin $addRemote
        Write-Host "✅ Remote added`n" -ForegroundColor Green
    } else {
        Write-Host "⏭️  Skipping remote setup. Add it manually later.`n" -ForegroundColor Yellow
        exit
    }
} else {
    Write-Host "✅ Remote repository found:" -ForegroundColor Green
    Write-Host $remote
    Write-Host ""
}

# Step 8: Set main branch and push
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Choose push method:" -ForegroundColor Yellow
Write-Host "1. Normal push (if this is first push or no conflicts)" -ForegroundColor White
Write-Host "2. Force push (if you cleaned history - WARNING: overwrites remote)" -ForegroundColor White
$choice = Read-Host "Enter choice (1 or 2)"

git branch -M main

if ($choice -eq "2") {
    Write-Host "⚠️  Force pushing..." -ForegroundColor Yellow
    git push -f origin main
} else {
    Write-Host "📤 Pushing..." -ForegroundColor Cyan
    git push -u origin main
}

Write-Host ""
Write-Host "✅ Done! Check your GitHub repository." -ForegroundColor Green
Write-Host ""
Write-Host "📚 Useful commands:" -ForegroundColor Cyan
Write-Host "  git status          - Check current status" -ForegroundColor White
Write-Host "  git log --oneline   - View commit history" -ForegroundColor White
Write-Host "  git remote -v       - View remote repositories" -ForegroundColor White
