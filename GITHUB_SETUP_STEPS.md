# GITHUB SETUP STEPS

## STEP 1: CREATE GITHUB REPOSITORY (Do this first)

1. Go to https://github.com
2. Sign in (or create account if needed)
3. Click the "+" icon (top right) → "New repository"
4. Fill in:
   - Repository name: `os-simulator` (or any name you want)
   - Description: "OS Simulator - Deadlock, Page Replacement, and Scheduling Algorithms"
   - Make it Public (so Don can access)
   - DO NOT check "Initialize with README" (we already have files)
   - DO NOT add .gitignore or license (we already have files)
5. Click "Create repository"

## STEP 2: CONNECT YOUR LOCAL REPOSITORY

After creating the repository on GitHub, you'll see a page with instructions.

Copy the repository URL. It will look like:
`https://github.com/YOUR_USERNAME/os-simulator.git`

Then run these commands (replace YOUR_USERNAME with your GitHub username):

```
git remote add origin https://github.com/YOUR_USERNAME/os-simulator.git
git branch -M main
git push -u origin main
```

## STEP 3: VERIFY

1. Go back to your GitHub repository page
2. Refresh the page
3. You should see all your files there!

## STEP 4: SHARE WITH DON

1. Copy your repository URL: `https://github.com/YOUR_USERNAME/os-simulator`
2. Send it to Don
3. Don can:
   - Click "Code" → "Download ZIP" to get the files
   - Or clone it using: `git clone https://github.com/YOUR_USERNAME/os-simulator.git`

## TROUBLESHOOTING

### If you get authentication error:
- GitHub now requires a Personal Access Token instead of password
- Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with "repo" permissions
- Use token as password when pushing

### If you need to update files later:
```
git add .
git commit -m "Description of changes"
git push
```

### If Don makes changes and you want to get them:
```
git pull
```

## QUICK COMMAND REFERENCE

Initialize (already done):
```
git init
```

Add files (already done):
```
git add .
```

Commit (already done):
```
git commit -m "Initial commit"
```

Connect to GitHub (do this after creating repo):
```
git remote add origin https://github.com/YOUR_USERNAME/os-simulator.git
git branch -M main
git push -u origin main
```

Update later:
```
git add .
git commit -m "Your message"
git push
```

