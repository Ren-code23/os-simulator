# GUIDE FOR DON - Getting Started

## WELCOME!

Hi Don! This guide will help you get started with the OS Simulator project.

## QUICK START (5 MINUTES)

### Step 1: Get the Code

You have two options:

**Option A: Download as ZIP (Easiest)**
1. Go to: https://github.com/Ren-code23/os-simulator
2. Click the green "Code" button
3. Click "Download ZIP"
4. Extract the ZIP file to a folder on your computer
5. Done!

**Option B: Clone with Git (If you have Git installed)**
1. Open terminal/command prompt
2. Navigate to where you want the project
3. Run:
   ```
   git clone https://github.com/Ren-code23/os-simulator.git
   ```
4. Done!

### Step 2: Open the Project

1. Navigate to the project folder
2. Open `index.html` in your web browser
   - Just double-click the file, OR
   - Right-click → Open with → Your browser

### Step 3: Test the Application

1. You should see a login page
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. You should see the dashboard with three sections:
   - Deadlock Algorithm
   - Page Replacement
   - Scheduling (Optional)

## PROJECT STRUCTURE

```
os-simulator/
├── index.html              # Login page
├── dashboard.html          # Main application
├── manifest.json           # PWA configuration
├── css/
│   └── style.css          # Styles (basic, ready for UI design)
├── js/
│   ├── auth.js            # Login system
│   ├── dashboard.js       # Navigation
│   ├── deadlock.js        # Banker's Algorithm
│   ├── paging.js          # Page Replacement (FIFO, LRU, Optimal)
│   └── scheduling.js      # CPU Scheduling (FCFS)
└── README.md              # Project documentation
```

## WHAT'S ALREADY DONE

### Completed Features:
1. **Login System** - Working authentication
2. **Deadlock Algorithm** - Banker's Algorithm fully implemented
3. **Page Replacement** - All 3 algorithms (FIFO, LRU, Optimal) working
4. **Scheduling** - FCFS algorithm implemented
5. **Input Validation** - Error handling in place
6. **Navigation** - Dashboard navigation working

### What Needs Work:
- UI Design (Glen will handle this)
- Testing and bug fixes
- Additional features (if time permits)

## YOUR TASKS AS PROGRAMMER

### Priority 1: Testing
- Test all algorithms with different inputs
- Check for bugs or errors
- Verify calculations are correct
- Test on different browsers
- Test on mobile devices

### Priority 2: Bug Fixes
- Fix any issues you find
- Improve error messages
- Add better input validation if needed

### Priority 3: Enhancements (Optional)
- Add more scheduling algorithms (SJF, Round Robin, Priority)
- Improve visualizations
- Add export functionality
- Any other improvements you think of

## HOW TO TEST

### Test Deadlock Algorithm:
1. Go to "Deadlock Algorithm" tab
2. Enter number of processes (e.g., 3)
3. Enter number of resources (e.g., 3)
4. Click "Setup Matrices"
5. Fill in the matrices:
   - Allocation Matrix
   - Max Matrix
   - Available Resources
6. Click "Calculate Safe Sequence"
7. Check if results are correct

### Test Page Replacement:
1. Go to "Page Replacement" tab
2. Enter reference string: `7,0,1,2,0,3,0,4,2,3,0,3,2`
3. Enter number of frames: `3`
4. Click "Calculate All Algorithms"
5. Verify FIFO, LRU, and Optimal results

### Test Scheduling:
1. Go to "Scheduling" tab
2. Add processes:
   - Process ID: P1, Arrival: 0, Burst: 5
   - Process ID: P2, Arrival: 1, Burst: 3
   - Process ID: P3, Arrival: 2, Burst: 8
3. Click "Calculate"
4. Check Gantt chart and results

## WORKING WITH GIT (If You Want to Contribute)

### If You Make Changes:

1. **Pull latest changes first:**
   ```
   git pull
   ```

2. **Make your changes to files**

3. **Add your changes:**
   ```
   git add .
   ```

4. **Commit with a message:**
   ```
   git commit -m "Description of what you changed"
   ```

5. **Push to GitHub:**
   ```
   git push
   ```

### If You Don't Have Write Access:
- Make your changes locally
- Send updated files to Ren Jay
- Or ask Ren Jay to add you as collaborator on GitHub

## USING A LOCAL SERVER (Recommended for Development)

For better testing, use a local server:

**Python:**
```bash
python -m http.server 8000
```
Then open: http://localhost:8000

**Node.js:**
```bash
npx http-server
```

## ALGORITHM IMPLEMENTATIONS

### Deadlock (Banker's Algorithm)
- File: `js/deadlock.js`
- Function: `bankersAlgorithm()`
- Handles safe/unsafe state detection

### Page Replacement
- File: `js/paging.js`
- Functions:
  - `fifoPageReplacement()`
  - `lruPageReplacement()`
  - `optimalPageReplacement()`

### Scheduling
- File: `js/scheduling.js`
- Function: `fcfsScheduling()`
- Can add more algorithms here

## COMMON ISSUES

### Problem: App doesn't work when opening HTML file
**Solution:** Use a local server (see "Using a Local Server" above)

### Problem: Can't login
**Solution:** Check credentials:
- admin / admin123
- user / user123
- test / test123

### Problem: Algorithms not calculating
**Solution:** 
- Check browser console for errors (F12)
- Verify inputs are valid
- Check if all JS files are loaded

### Problem: Changes not showing
**Solution:**
- Clear browser cache (Ctrl+F5)
- Check if files are saved
- Verify file paths are correct

## COMMUNICATION

### With Ren Jay:
- Share progress regularly
- Report any bugs found
- Discuss any changes before implementing
- Coordinate on who works on what

### With Team:
- Update team on progress
- Share test results
- Report any blockers

## DEADLINES TO REMEMBER

- UI Design: December 2, 2025 (Glen)
- Manuscript: December 5, 2025
- Script: December 7, 2025
- Video: December 10, 2025
- Final Submission: December 12, 2025

## QUICK REFERENCE

**Repository:** https://github.com/Ren-code23/os-simulator

**Login Credentials:**
- admin / admin123
- user / user123
- test / test123

**Test Reference String:** 7,0,1,2,0,3,0,4,2,3,0,3,2

**Test Number of Frames:** 3

## NEED HELP?

- Check README.md for more info
- Check PROJECT_ROADMAP.md for project plan
- Contact Ren Jay if you have questions
- Check code comments in JS files

## NEXT STEPS

1. Download/clone the repository
2. Open and test the application
3. Test all algorithms
4. Report any bugs
5. Start working on your assigned tasks

Good luck! Let's build something great together!

