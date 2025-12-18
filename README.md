# OS Simulator - Progressive Web App

This is a web application for simulating classic Operating System algorithms. Features include Deadlock Detection (Banker's Algorithm), Page Replacement (FIFO, LRU, Optimal), and CPU Scheduling. 8-bit Mario-inspired retro UI. Everything listed here is actually present in the app.

## Features

### Deadlock / Resource Allocation
- Banker's Algorithm implementation
- User inputs resource allocation matrices
- Safe/Unsafe state detection with explanation
- Shows safe sequence if exists
- Detailed result and suggestions

### Page Replacement
- FIFO
- LRU
- Optimal Algorithm
- Enter reference string and number of frames
- Step-by-step page table for each algorithm
- Color-coded page faults/hits
- Page fault counter, rate, and algorithm comparison with recommendations

### CPU Scheduling
- FCFS (First Come First Served)
- SJF (Shortest Job First)
- Priority (Non-preemptive)
- Round Robin (Time quantum configurable)
- Gantt chart output
- Waiting time and turnaround time calculations
- CPU Utilization, throughput
- Recommendations based on results

### Security Features
- Login system with test/demo users
- Input validation and error handling on all forms

## Getting Started

### Run Locally

**Option 1: Easiest**
- Use VS Code Live Server extension (right-click index.html → “Open with Live Server”)

**Option 2: Python**
```
python -m http.server 8000
```
Then visit: http://localhost:8000

**Option 3: Node.js/HTTP-server**
```
npx http-server
```

**Do not run with file:// — use a local server for best results (and to enable PWA features).**

### Default Login Credentials

- Username: admin | Password: admin123
- Username: user  | Password: user123
- Username: test  | Password: test123

## Project Structure

```
os-simulator/
├── index.html          # Login page
├── dashboard.html      # Main application
├── manifest.json       # PWA manifest
├── css/
│   └── style.css      # Styles
├── js/
│   ├── auth.js        # Authentication and session
│   ├── dashboard.js   # Main navigation
│   ├── deadlock.js    # Deadlock/Banker's Algorithm
│   ├── paging.js      # Page Replacement Algorithms
│   └── scheduling.js  # CPU Scheduling Algorithms
└── README.md
```

## Deployment (GitHub Pages recommended)

1. Go to https://github.com/Ren-code23/os-simulator
2. Go in Settings > Pages
3. Set Source to "main" branch, root (/) folder
4. Save – wait a few minutes
5. App goes live at: https://ren-code23.github.io/os-simulator/

Every push to GitHub will update the public site.

## Technology

- HTML5
- CSS3
- Vanilla JS
- PWA

## Browser Support

- Chrome / Edge (works best)
- Firefox
- Safari
- Mobile browsers

## Notes

- Built for OS algorithm demonstration/testing
- All algorithms actually implemented and tested
- Responsive/mobile-friendly
- Retro pixel UI — see css/8bit-style-enhanced.css for design details

## License

For academic/educational use. See LICENSE for more.
