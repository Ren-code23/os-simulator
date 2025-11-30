# PROJECT ROADMAP

## TIMELINE

Final Deadline: December 12, 2025

Key Deadlines:
- UI Design: December 2, 2025
- Manuscript: December 5, 2025
- Script: December 7, 2025
- Video: December 10, 2025
- Reflection: December 10, 2025
- Finalization: December 11, 2025
- Submission: December 12, 2025

## PROJECT REQUIREMENTS

Platform: Progressive Web App (PWA)

Required Features:

1. Deadlock / Resource Allocation (REQUIRED)
   - Input for resource allocation
   - Safe/unsafe state detection
   - Visual showing deadlock or safe sequence
   - Analysis, suggestions and solutions

2. Page Replacement Algorithms (REQUIRED)
   - FIFO
   - LRU
   - Optimal
   - Input reference string
   - Input number of frames
   - Step-by-step page table
   - Page fault counter

3. Scheduling Algorithms (OPTIONAL)
   - Input for processes
   - Gantt chart
   - Waiting time and turnaround time

4. Security Features (REQUIRED)
   - Login system
   - Input validation
   - Error handling

## TEAM ROLES

Programmers:
- Ren Jay
- Don Miguel

Responsibilities:
- Build the PWA application
- Implement algorithms
- Ensure functionality

Scriptwriters:
- Frances
- Vincen
- Paul

Responsibilities:
- Write video script
- Prepare manuscript content
- Document algorithms

Video Team:
- Janwell (Video Editor)
- Glen (Video Editor + UI Design)

Responsibilities:
- Edit demonstration video
- Screen recording
- Final video production

Other Roles:
- Vincent - PowerPoint Presentation
- Glen - UI Design
- Don Miguel - Researcher

## DEVELOPMENT PLAN

Phase 1: Foundation (Days 1-3)
Target: December 2, 2025 (UI Design Deadline)

Tasks:
- Set up PWA project structure
- Create login system
- Design UI (Glen)
- Implement security features (login, validation, error handling)
- Basic navigation

Deliverable: Working UI design

Phase 2: Core Algorithms (Days 4-7)
Target: December 5, 2025 (Manuscript Deadline)

Tasks:
- Implement Deadlock/Resource Allocation algorithm
  - Input form for resource allocation
  - Safe/unsafe state detection
  - Visual representation
  - Analysis and solutions display
- Implement Page Replacement algorithms
  - FIFO algorithm
  - LRU algorithm
  - Optimal algorithm
  - Step-by-step visualization
  - Page fault counter
- Optional: Scheduling algorithms
  - Process input form
  - Gantt chart
  - Waiting/turnaround time calculations

Deliverable: Working application with all algorithms

Phase 3: Documentation (Days 8-10)
Target: December 7, 2025 (Script Deadline)

Tasks:
- Complete manuscript
  - Introduction
  - Application overview
  - Algorithm sections
  - Security features
  - Challenges and solutions
- Write video script
- Prepare screenshots
- Document implementation

Deliverable: Complete manuscript and script

Phase 4: Video Production (Days 11-12)
Target: December 10, 2025 (Video & Reflection Deadline)

Tasks:
- Record screen demonstration
- Edit video (Janwell, Glen)
- Add introductions
- Include all required sections
- Finalize video (5-10 minutes)
- Write individual reflections

Deliverable: Demonstration video and reflections

Phase 5: Finalization (Day 13)
Target: December 11, 2025

Tasks:
- Final testing
- Bug fixes
- Review all deliverables
- Prepare submission package
- Deploy application (if needed)

Deliverable: All deliverables ready

Phase 6: Submission (Day 14)
Target: December 12, 2025

Tasks:
- Submit all deliverables
- Working application
- Demonstration video
- Manuscript

## FEATURE REQUIREMENTS

1. Deadlock / Resource Allocation

Must Include:
- Input form for:
  - Number of processes
  - Number of resources
  - Allocation matrix
  - Maximum need matrix
  - Available resources
- Algorithm: Banker's Algorithm (for deadlock avoidance)
- Output:
  - Safe/Unsafe state detection
  - Safe sequence (if exists)
  - Visual representation
  - Analysis and suggestions

Implementation Notes:
- Use Banker's Algorithm
- Show step-by-step calculation
- Visualize resource allocation
- Display safe sequence

2. Page Replacement Algorithms

Must Include:
- Three algorithms:
  - FIFO (First In First Out)
  - LRU (Least Recently Used)
  - Optimal
- Input:
  - Reference string (e.g., 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2)
  - Number of frames
- Output:
  - Step-by-step page table for each algorithm
  - Page fault count for each
  - Visual comparison (optional)

Implementation Notes:
- Implement all three algorithms
- Show step-by-step process
- Count page faults accurately
- Visualize page table changes

3. Scheduling Algorithms (Optional)

If Time Permits:
- Process input (arrival time, burst time, priority)
- Algorithm options (FCFS, SJF, Round Robin, Priority)
- Gantt chart visualization
- Waiting time and turnaround time

4. Security Features

Must Include:
- Login system
  - Username/password
  - Session management
- Input validation
  - Check for valid inputs
  - Prevent invalid data
  - Show error messages
- Error handling
  - Try-catch blocks
  - User-friendly error messages
  - Prevent crashes

## UI DESIGN REQUIREMENTS

Deadline: December 2, 2025

Must Include:
- Login page
- Main dashboard
- Deadlock algorithm page
- Page replacement page
- Optional: Scheduling page
- Responsive design (mobile-friendly)
- Modern, clean interface
- Easy navigation

## MANUSCRIPT REQUIREMENTS

Deadline: December 5, 2025

Sections:
1. Introduction
   - Purpose of application
   - Why chosen algorithms

2. Application Overview
   - Tools/language used
   - How program works
   - Screenshots of GUI

3. Algorithm Sections
   - Brief discussion of algorithms
   - Implementation explanation
   - Sample input and output

4. Security Features
   - Explanation of security features
   - Importance in OS

5. Challenges and Solutions
   - Problems encountered
   - How resolved

6. Reflection (Each Member)
   - Due: December 10, 2025
   - 2 paragraphs each
   - Lesson, Challenges, Solution

## VIDEO SCRIPT REQUIREMENTS

Deadline: December 7, 2025

Must Include (5-10 minutes):
1. Introduction of members
2. Brief discussion of concepts
3. Application overview
   - Platform used
   - Overview
   - Security features
4. Hands-on demonstration (screen recording)
   - Show each algorithm
   - Explain results
5. Results explanation

## ACTION ITEMS FOR PROGRAMMERS

Week 1 (Now - December 5):
- Set up PWA project structure
- Implement login system
- Implement Deadlock algorithm (Banker's)
- Implement Page Replacement (FIFO, LRU, Optimal)
- Add input validation
- Test all features

Week 2 (December 6-12):
- Bug fixes
- Final testing
- Deploy application
- Support video recording
- Help with documentation

## TECHNICAL STACK

Frontend: HTML5, CSS3, JavaScript (Vanilla)
PWA: manifest.json, service worker (optional)
Styling: CSS Framework (Bootstrap/Tailwind) or custom
Deployment: GitHub Pages, Netlify, or Vercel

## SUCCESS CRITERIA

Must Have:
- Working PWA application
- Deadlock algorithm working
- All 3 page replacement algorithms
- Login system
- Input validation
- Error handling
- Responsive design

Nice to Have:
- Scheduling algorithms (optional)
- Algorithm comparison feature
- Export results
- Dark mode
- Advanced visualizations

## PRIORITY MATRIX

High Priority (Must Do):
1. Deadlock algorithm
2. Page Replacement (FIFO, LRU, Optimal)
3. Login system
4. Input validation
5. Error handling

Medium Priority (Should Do):
1. Scheduling algorithms (optional)
2. Visual representations
3. Step-by-step explanations

Low Priority (Nice to Have):
1. Algorithm comparison
2. Export features
3. Advanced animations
