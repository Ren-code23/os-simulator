/**
 * Page Replacement Algorithms Module
 * Implements FIFO, LRU, and Optimal algorithms
 */

/**
 * FIFO (First In First Out) Page Replacement
 */
function fifoPageReplacement(referenceString, numFrames) {
    const frames = [];
    const steps = [];
    let pageFaults = 0;
    let framePointer = 0; // Points to the frame to replace (circular)
    
    for (let i = 0; i < referenceString.length; i++) {
        const page = referenceString[i];
        const step = {
            step: i + 1,
            page: page,
            frames: [],
            pageFault: false,
            action: ''
        };
        
        // Check if page is already in frames
        if (frames.includes(page)) {
            step.frames = [...frames];
            step.action = 'Hit - Page already in memory';
        } else {
            // Page fault
            pageFaults++;
            step.pageFault = true;
            
            if (frames.length < numFrames) {
                // Frame available, just add
                frames.push(page);
                step.action = 'Page Fault - Added to empty frame';
            } else {
                // Replace oldest page (FIFO)
                frames[framePointer] = page;
                framePointer = (framePointer + 1) % numFrames;
                step.action = `Page Fault - Replaced frame ${framePointer === 0 ? numFrames : framePointer}`;
            }
            step.frames = [...frames];
        }
        
        steps.push(step);
    }
    
    return {
        algorithm: 'FIFO',
        steps: steps,
        pageFaults: pageFaults,
        pageFaultRate: (pageFaults / referenceString.length * 100).toFixed(2) + '%'
    };
}

/**
 * LRU (Least Recently Used) Page Replacement
 */
function lruPageReplacement(referenceString, numFrames) {
    const frames = [];
    const lastUsed = {}; // Track last usage time for each page
    const steps = [];
    let pageFaults = 0;
    
    for (let i = 0; i < referenceString.length; i++) {
        const page = referenceString[i];
        const step = {
            step: i + 1,
            page: page,
            frames: [],
            pageFault: false,
            action: ''
        };
        
        // Check if page is already in frames
        if (frames.includes(page)) {
            lastUsed[page] = i;
            step.frames = [...frames];
            step.action = 'Hit - Page already in memory';
        } else {
            // Page fault
            pageFaults++;
            step.pageFault = true;
            
            if (frames.length < numFrames) {
                // Frame available, just add
                frames.push(page);
                lastUsed[page] = i;
                step.action = 'Page Fault - Added to empty frame';
            } else {
                // Find LRU page (least recently used)
                let lruPage = frames[0];
                let lruTime = lastUsed[lruPage] !== undefined ? lastUsed[lruPage] : -1;
                
                for (let j = 1; j < frames.length; j++) {
                    const framePage = frames[j];
                    const frameTime = lastUsed[framePage] !== undefined ? lastUsed[framePage] : -1;
                    if (frameTime < lruTime) {
                        lruPage = framePage;
                        lruTime = frameTime;
                    }
                }
                
                // Replace LRU page
                const lruIndex = frames.indexOf(lruPage);
                frames[lruIndex] = page;
                lastUsed[page] = i;
                step.action = `Page Fault - Replaced LRU page ${lruPage}`;
            }
            step.frames = [...frames];
        }
        
        steps.push(step);
    }
    
    return {
        algorithm: 'LRU',
        steps: steps,
        pageFaults: pageFaults,
        pageFaultRate: (pageFaults / referenceString.length * 100).toFixed(2) + '%'
    };
}

/**
 * Optimal Page Replacement
 */
function optimalPageReplacement(referenceString, numFrames) {
    const frames = [];
    const steps = [];
    let pageFaults = 0;
    
    for (let i = 0; i < referenceString.length; i++) {
        const page = referenceString[i];
        const step = {
            step: i + 1,
            page: page,
            frames: [],
            pageFault: false,
            action: ''
        };
        
        // Check if page is already in frames
        if (frames.includes(page)) {
            step.frames = [...frames];
            step.action = 'Hit - Page already in memory';
        } else {
            // Page fault
            pageFaults++;
            step.pageFault = true;
            
            if (frames.length < numFrames) {
                // Frame available, just add
                frames.push(page);
                step.action = 'Page Fault - Added to empty frame';
            } else {
                // Find page that won't be used for longest time (or never)
                let optimalPage = frames[0];
                let optimalIndex = -1;
                
                for (let j = 0; j < frames.length; j++) {
                    const framePage = frames[j];
                    // Find next occurrence of this page in future
                    let nextUse = referenceString.indexOf(framePage, i + 1);
                    
                    if (nextUse === -1) {
                        // This page won't be used again - optimal to replace
                        optimalPage = framePage;
                        optimalIndex = j;
                        break;
                    } else {
                        // Update if this page is used later than current optimal
                        if (optimalIndex === -1 || nextUse > referenceString.indexOf(optimalPage, i + 1)) {
                            optimalPage = framePage;
                            optimalIndex = j;
                        }
                    }
                }
                
                // Replace optimal page
                if (optimalIndex === -1) {
                    optimalIndex = 0; // Fallback
                }
                frames[optimalIndex] = page;
                step.action = `Page Fault - Replaced optimal page ${frames[optimalIndex] === page ? optimalPage : frames[optimalIndex]}`;
            }
            step.frames = [...frames];
        }
        
        steps.push(step);
    }
    
    return {
        algorithm: 'Optimal',
        steps: steps,
        pageFaults: pageFaults,
        pageFaultRate: (pageFaults / referenceString.length * 100).toFixed(2) + '%'
    };
}

/**
 * Display page replacement results
 */
function displayPagingResults(results) {
    const resultsDiv = document.getElementById('pagingResults');
    resultsDiv.innerHTML = '';
    
    results.forEach(result => {
        const resultBox = document.createElement('div');
        resultBox.className = 'result-box';
        
        resultBox.innerHTML = `
            <h3>${result.algorithm} Algorithm</h3>
            <p><strong>Total Page Faults:</strong> ${result.pageFaults}</p>
            <p><strong>Page Fault Rate:</strong> ${result.pageFaultRate}</p>
            <h4>Step-by-Step Process:</h4>
            <div class="table-container">
                <table class="page-table">
                    <thead>
                        <tr>
                            <th>Step</th>
                            <th>Page</th>
                            ${Array(result.steps[0].frames.length).fill(0).map((_, i) => `<th>Frame ${i + 1}</th>`).join('')}
                            <th>Page Fault</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${result.steps.map(step => `
                            <tr>
                                <td>${step.step}</td>
                                <td><strong>${step.page}</strong></td>
                                ${Array(result.steps[0].frames.length).fill(0).map((_, i) => 
                                    `<td>${step.frames[i] !== undefined ? step.frames[i] : '-'}</td>`
                                ).join('')}
                                <td class="${step.pageFault ? 'page-fault' : ''}">${step.pageFault ? 'Yes' : 'No'}</td>
                                <td>${step.action}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        resultsDiv.appendChild(resultBox);
    });
}

/**
 * Handle page replacement calculation
 */
function calculatePageReplacement() {
    // Get inputs
    const referenceStringInput = document.getElementById('referenceString').value.trim();
    const numFrames = parseInt(document.getElementById('numFrames').value);
    
    // Validation
    if (!referenceStringInput) {
        alert('Please enter a reference string');
        return;
    }
    
    if (numFrames < 1 || numFrames > 10) {
        alert('Number of frames must be between 1 and 10');
        return;
    }
    
    // Parse reference string
    const referenceString = referenceStringInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    
    if (referenceString.length === 0) {
        alert('Invalid reference string. Please use comma-separated numbers.');
        return;
    }
    
    // Calculate all algorithms
    const fifoResult = fifoPageReplacement(referenceString, numFrames);
    const lruResult = lruPageReplacement(referenceString, numFrames);
    const optimalResult = optimalPageReplacement(referenceString, numFrames);
    
    // Display results
    displayPagingResults([fifoResult, lruResult, optimalResult]);
}

// Setup event listener
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculatePagingBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePageReplacement);
    }
});

