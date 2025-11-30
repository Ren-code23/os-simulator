# OS Simulator - Progressive Web App

A web application that simulates Operating System algorithms including Deadlock Detection (Banker's Algorithm), Page Replacement (FIFO, LRU, Optimal), and CPU Scheduling.

## Features

### 1. Deadlock / Resource Allocation
- Banker's Algorithm implementation
- Input for resource allocation matrices
- Safe/Unsafe state detection
- Safe sequence visualization
- Analysis and suggestions

### 2. Page Replacement Algorithms
- FIFO (First In First Out)
- LRU (Least Recently Used)
- Optimal Algorithm
- Step-by-step page table visualization
- Page fault counter and rate

### 3. CPU Scheduling (Optional)
- FCFS (First Come First Served)
- Gantt chart visualization
- Waiting time and turnaround time calculations

### 4. Security Features
- Login system
- Input validation
- Error handling

## Getting Started

### Running Locally

1. Simple Method:
   - Open index.html in your web browser
   - Or use a local server (recommended)

2. Using Python:
   ```
   python -m http.server 8000
   ```
   Then open: http://localhost:8000

3. Using Node.js:
   ```
   npx http-server
   ```

### Default Login Credentials

- Username: admin, Password: admin123
- Username: user, Password: user123
- Username: test, Password: test123

## Project Structure

```
os-simulator/
├── index.html          # Login page
├── dashboard.html      # Main application
├── manifest.json       # PWA manifest
├── css/
│   └── style.css      # Styles
├── js/
│   ├── auth.js        # Authentication
│   ├── dashboard.js   # Navigation
│   ├── deadlock.js    # Banker's Algorithm
│   ├── paging.js      # Page Replacement
│   └── scheduling.js  # CPU Scheduling
└── README.md
```

## Deployment (GitHub Pages - Recommended)

Since we're already using GitHub, GitHub Pages is the easiest option:

1. Go to your repository: https://github.com/Ren-code23/os-simulator
2. Click "Settings" tab
3. Scroll to "Pages" in left sidebar
4. Under "Source", select "main" branch
5. Select "/ (root)" folder
6. Click "Save"
7. Wait 1-2 minutes
8. Your app will be live at: https://ren-code23.github.io/os-simulator/

**Note:** Every time you push to GitHub, your site automatically updates!

### Alternative: Netlify
1. Go to netlify.com
2. Drag and drop your project folder
3. Done. You get a live URL

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Progressive Web App (PWA)

## Browser Support

- Chrome/Edge (Recommended)
- Firefox
- Safari
- Mobile browsers

## Notes

- This is a functional prototype for educational purposes
- UI design can be customized later
- All algorithms are implemented and tested
- Mobile-responsive design

## License

Educational use only.
