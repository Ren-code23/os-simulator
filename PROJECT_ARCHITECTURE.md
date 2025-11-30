# PROJECT ARCHITECTURE

## IMPORTANT: NO BACKEND

This project is a **frontend-only Progressive Web App (PWA)**. There is no backend server, database, or API.

Everything runs in the browser using:
- HTML for structure
- CSS for styling
- JavaScript for logic and algorithms

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────┐
│         Browser (Client)            │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   HTML Pages                  │ │
│  │   - index.html (Login)        │ │
│  │   - dashboard.html (Main App) │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   JavaScript Modules          │ │
│  │   - auth.js                   │ │
│  │   - dashboard.js              │ │
│  │   - deadlock.js               │ │
│  │   - paging.js                 │ │
│  │   - scheduling.js             │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   CSS Styling                 │ │
│  │   - style.css                 │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   Browser Storage             │ │
│  │   - sessionStorage (Login)    │ │
│  │   - localStorage (Optional)    │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

## PROJECT STRUCTURE

```
Finals_OS_/
│
├── index.html                 # Entry point - Login page
├── dashboard.html             # Main application page
├── manifest.json              # PWA configuration
│
├── css/
│   └── style.css             # All styling (single file)
│
├── js/
│   ├── auth.js               # Authentication & session management
│   ├── dashboard.js          # Navigation & page switching
│   ├── deadlock.js           # Banker's Algorithm implementation
│   ├── paging.js             # Page Replacement algorithms (FIFO, LRU, Optimal)
│   └── scheduling.js         # CPU Scheduling (FCFS)
│
├── icons/
│   └── README.md             # Placeholder for PWA icons
│
└── Documentation/
    ├── README.md
    ├── PROJECT_ROADMAP.md
    ├── DON_START_HERE.md
    └── ... (other docs)
```

## FRONTEND ARCHITECTURE

### 1. HTML Layer (Structure)

**index.html:**
- Login form
- Input validation UI
- Error message display
- Links to CSS and auth.js

**dashboard.html:**
- Main application container
- Navigation tabs
- Three content sections:
  - Deadlock Algorithm section
  - Page Replacement section
  - Scheduling section
- Links to all JS modules

### 2. JavaScript Layer (Logic)

**auth.js:**
- Login validation (client-side only)
- Session management using sessionStorage
- Redirect logic
- No server communication

**dashboard.js:**
- Tab navigation
- Section switching
- UI state management

**deadlock.js:**
- Banker's Algorithm implementation
- Matrix input handling
- Safe/Unsafe state calculation
- Results display

**paging.js:**
- FIFO algorithm
- LRU algorithm
- Optimal algorithm
- Page fault calculation
- Step-by-step visualization

**scheduling.js:**
- FCFS algorithm
- Process management
- Gantt chart generation
- Waiting/turnaround time calculation

### 3. CSS Layer (Presentation)

**style.css:**
- All styling in one file
- Responsive design
- Component styles
- Mobile-friendly layout

### 4. Data Storage (Client-Side Only)

**sessionStorage:**
- Stores login status
- Stores username
- Cleared when browser closes

**No Database:**
- No server-side storage
- No persistent data
- All calculations done in browser

## DATA FLOW

```
User Input
    ↓
HTML Form
    ↓
JavaScript Function
    ↓
Algorithm Calculation (in browser)
    ↓
Results Display (in browser)
```

**Example: Page Replacement**

1. User enters reference string in HTML form
2. JavaScript reads input from DOM
3. Algorithm runs in browser (paging.js)
4. Results calculated in memory
5. Results displayed in HTML

**No network requests, no server, no database.**

## AUTHENTICATION (Client-Side Only)

**Current Implementation:**
- Credentials stored in JavaScript object (auth.js)
- Validation happens in browser
- Session stored in sessionStorage
- No server-side authentication

**Security Note:**
- This is for educational/demo purposes
- Not secure for production use
- Credentials are visible in code

## MODULE DEPENDENCIES

```
index.html
    └── js/auth.js

dashboard.html
    ├── js/auth.js (for logout)
    ├── js/dashboard.js (navigation)
    ├── js/deadlock.js (deadlock algorithm)
    ├── js/paging.js (page replacement)
    └── js/scheduling.js (scheduling)
```

All modules are independent and can work standalone.

## HOW IT WORKS

### 1. User Opens Application
- Browser loads index.html
- CSS and JS files load
- Login page displays

### 2. User Logs In
- Enters credentials
- auth.js validates (checks hardcoded credentials)
- If valid, stores in sessionStorage
- Redirects to dashboard.html

### 3. User Uses Algorithms
- Enters data in forms
- JavaScript reads input
- Algorithm calculates in browser
- Results displayed immediately

### 4. All Processing Happens in Browser
- No server needed
- No internet required (after initial load)
- Can work offline (if PWA service worker added)

## TECHNICAL STACK

**Frontend Only:**
- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)
- Progressive Web App (PWA) manifest

**No Backend:**
- No Node.js
- No Python/Flask/Django
- No PHP
- No database (MySQL, MongoDB, etc.)
- No API
- No server

## DEPLOYMENT

**Static Hosting:**
- GitHub Pages (just upload files)
- Netlify (drag and drop)
- Any web server (just serve HTML/CSS/JS)

**No Server Configuration Needed:**
- No backend setup
- No database setup
- No API endpoints
- Just static files

## FUTURE ENHANCEMENTS (If Needed)

If you want to add a backend later:

**Option 1: Simple Backend**
- Node.js + Express
- Store user data in database
- API endpoints for algorithms
- Real authentication

**Option 2: Serverless**
- Firebase Authentication
- Cloud Functions for algorithms
- Firestore for data

**Option 3: Full Stack**
- Backend API (Node.js/Python)
- Database (PostgreSQL/MongoDB)
- Frontend communicates via API

**But for this project: Frontend-only is perfect!**

## SUMMARY

**Architecture Type:** Frontend-Only PWA

**Backend:** None

**Data Storage:** Browser sessionStorage only

**Processing:** All in browser (client-side)

**Deployment:** Static file hosting

**Complexity:** Simple, no server needed

This architecture is perfect for:
- Educational projects
- Algorithm demonstrations
- Quick prototypes
- Offline-capable apps
- Easy deployment

