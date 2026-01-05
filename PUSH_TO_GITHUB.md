# MiniMeal - GitHub Push Guide

## Problem: Files over 100MB cannot be pushed to GitHub

## Solution Steps:

### Step 1: Clean up Git cache (if you already committed large files)
```bash
# Navigate to your project directory
cd g:/MiniMeal

# Remove all files from Git's cache
git rm -r --cached .

# Re-add all files (this time .gitignore will be respected)
git add .

# Commit the changes
git commit -m "Remove large files and add .gitignore"
```

### Step 2: Find large files in your repository
```bash
# Find files larger than 50MB in your directory
Get-ChildItem -Recurse -File | Where-Object { $_.Length -gt 50MB } | Select-Object FullName, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}} | Sort-Object "Size(MB)" -Descending
```

### Step 3: If you have large files in Git history, use BFG Repo Cleaner
```bash
# Download BFG Repo Cleaner from: https://rtyley.github.io/bfg-repo-cleaner/
# Or use git filter-branch (more complex)

# Using BFG:
java -jar bfg.jar --strip-blobs-bigger-than 100M g:/MiniMeal
cd g:/MiniMeal
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

### Step 4: Push to GitHub

#### If this is a NEW repository:
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit with MiniMeal application"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### If repository already exists:
```bash
# Force push if you cleaned history (WARNING: This overwrites remote)
git push -f origin main

# OR normal push if no history cleanup was needed
git push origin main
```

### Step 5: If you need to track large files, use Git LFS
```bash
# Install Git LFS: https://git-lfs.github.com/
git lfs install

# Track large files (example: .jar files)
git lfs track "*.jar"
git lfs track "*.mp4"

# Add .gitattributes
git add .gitattributes

# Now add and commit your large files
git add .
git commit -m "Add large files with LFS"
git push origin main
```

## Common Large Files in Your Project Type:

For a Spring Boot + React project, these are typically the culprits:
- `node_modules/` folder (can be 100s of MBs)
- `backend/target/` folder (compiled Java files)
- Large JAR files in backend
- Build artifacts in frontend (build/, dist/)
- Database files
- Large media files or datasets

## Quick Check Commands:

```bash
# Check current git status
git status

# Check repository size
git count-objects -vH

# List all tracked files
git ls-files

# Check remote URL
git remote -v
```

## Tips:
1. **NEVER commit `node_modules/`** - This is always huge and should be in .gitignore
2. **NEVER commit `target/`** - Maven build artifacts should not be committed
3. **NEVER commit `.env` files** - These contain sensitive credentials
4. Use `.gitignore` properly before your first commit
5. If you've already committed large files, clean the history before pushing

## Need Help?
If you're still having issues, run this command to find the specific large file:
```bash
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {print substr($0,6)}' | sort --numeric-sort --key=2 | tail -n 10
```
