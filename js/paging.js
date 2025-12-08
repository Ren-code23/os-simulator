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
                const replacedFrameIndex = framePointer;
                frames[framePointer] = page;
                framePointer = (framePointer + 1) % numFrames;
                step.action = `Page Fault - Replaced frame ${replacedFrameIndex + 1}`;
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
                step.action = `Page Fault - Replaced optimal page ${optimalPage}`;
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
            <div class="table-container" style="overflow-x: auto;">
                <table class="page-table">
                    <thead>
                        <tr>
                            <th>Step</th>
                            <th>Page</th>
                            ${Array(parseInt(document.getElementById('numFrames').value)).fill(0).map((_, i) => `<th>Frame ${i + 1}</th>`).join('')}
                            <th>Page Fault</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${result.steps.map(step => `
                            <tr>
                                <td>${step.step}</td>
                                <td><strong>${step.page}</strong></td>
                                ${Array(parseInt(document.getElementById('numFrames').value)).fill(0).map((_, i) => 
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

function showPagingError(message) {
    const errorDiv = document.querySelector('#paging-section .error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }
}

/**
 * Handle page replacement calculation
 */
function calculatePageReplacement() {
    // Get inputs
    const referenceStringInput = document.getElementById('referenceString').value.trim();
    const numFrames = parseInt(document.getElementById('numFrames').value);
    
    // Validation for reference string
    if (!referenceStringInput) {
        showPagingError('Please enter a reference string');
        return;
    }
    
    // Parse reference string
    const referenceString = referenceStringInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    
    if (referenceString.length === 0) {
        showPagingError('Invalid reference string. Please use comma-separated numbers.');
        return;
    }

    // Validation for number of frames
    if (isNaN(numFrames) || numFrames < 1) {
        showPagingError('Number of frames must be at least 1.');
        return;
    }
    
    if (numFrames > referenceString.length) {
        showPagingError('Number of frames cannot exceed the length of the reference string.');
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
    const referenceStringInput = document.getElementById('referenceString');
    const numFramesInput = document.getElementById('numFrames');

    if (referenceStringInput && numFramesInput) {
        referenceStringInput.addEventListener('input', calculatePageReplacement);
        numFramesInput.addEventListener('input', calculatePageReplacement);

        // Initial calculation on page load
        calculatePageReplacement();
    }
});

// Sample Data Functions for Paging
function loadPagingSample(sampleNum) {
    if (sampleNum === 1) {
        // Classic Example
        document.getElementById('referenceString').value = '7,0,1,2,0,3,0,4,2,3,0,3,2';
        document.getElementById('numFrames').value = 3;
    } else if (sampleNum === 2) {
        // Extended Sequence
        document.getElementById('referenceString').value = '1,2,3,4,1,2,5,1,2,3,4,5,6,7,1';
        document.getElementById('numFrames').value = 4;
    } else if (sampleNum === 3) {
        // Complex Case
        document.getElementById('referenceString').value = '2,3,2,1,5,2,4,5,3,2,5,2,1,3,4';
        document.getElementById('numFrames').value = 3;
    }
    
    // Trigger calculation
    calculatePageReplacement();
}

// Export Functions for Paging
function exportPagingResults() {
    const resultsDiv = document.getElementById('pagingResults');
    if (!resultsDiv || resultsDiv.innerHTML.trim() === '') {
        alert('No results to export. Please enter data first.');
        return;
    }
    
    const referenceString = document.getElementById('referenceString').value;
    const numFrames = document.getElementById('numFrames').value;
    
    let exportText = '========================================\n';
    exportText += 'PAGE REPLACEMENT RESULTS\n';
    exportText += 'Comparison of FIFO, LRU, and Optimal\n';
    exportText += '========================================\n\n';
    
    exportText += 'Configuration:\n';
    exportText += `Reference String: ${referenceString}\n`;
    exportText += `Number of Frames: ${numFrames}\n\n`;
    
    exportText += resultsDiv.innerText;
    exportText += '\n\n========================================\n';
    exportText += 'Generated by OS Simulator\n';
    exportText += `Date: ${new Date().toLocaleString()}\n`;
    exportText += '========================================\n';
    
    downloadAsFile('paging-results.txt', exportText);
    
    const exportSection = document.getElementById('pagingExport');
    if (exportSection) {
        exportSection.style.display = 'flex';
    }
}

function copyPagingResults() {
    const resultsDiv = document.getElementById('pagingResults');
    if (!resultsDiv || resultsDiv.innerHTML.trim() === '') {
        alert('No results to copy. Please enter data first.');
        return;
    }
    
    copyToClipboard(resultsDiv.innerText);
}

// Enhanced Display with Comparison
function displayPagingResultsWithComparison(results) {
    const resultsDiv = document.getElementById('pagingResults');
    resultsDiv.innerHTML = '';
    
    // Create comparison section
    const comparisonDiv = document.getElementById('pagingComparison');
    if (comparisonDiv) {
        const pageFaults = results.map(r => ({
            algorithm: r.algorithm,
            faults: r.pageFaults
        }));
        
        const minFaults = Math.min(...pageFaults.map(r => r.faults));
        const maxFaults = Math.max(...pageFaults.map(r => r.faults));
        
        let comparisonHTML = '<h3>Algorithm Comparison</h3>';
        comparisonHTML += '<div class="comparison-bars">';
        
        pageFaults.forEach(result => {
            const isBest = result.faults === minFaults;
            const isWorst = result.faults === maxFaults;
            const barClass = isBest ? 'best' : (isWorst && minFaults !== maxFaults ? 'worst' : '');
            const percentage = (result.faults / maxFaults) * 100;
            
            comparisonHTML += `
                <div class="comparison-item">
                    <div class="comparison-label">${result.algorithm}:</div>
                    <div class="comparison-bar ${barClass}" style="width: ${percentage}%;">
                        <div class="comparison-value">${result.faults} faults ${isBest ? '⭐ BEST' : ''}</div>
                    </div>
                </div>
            `;
        });
        
        comparisonHTML += '</div>';
        comparisonDiv.innerHTML = comparisonHTML;
    }
    
    // Display detailed results
    displayPagingResults(results);
    
    // Show export section
    const exportSection = document.getElementById('pagingExport');
    if (exportSection) {
        exportSection.style.display = 'flex';
    }
}

// Update the calculation function to use comparison
const originalCalculatePageReplacement = calculatePageReplacement;
calculatePageReplacement = function() {
    // Get inputs
    const referenceStringInput = document.getElementById('referenceString').value.trim();
    const numFrames = parseInt(document.getElementById('numFrames').value);
    
    // Validation
    if (!referenceStringInput) {
        showPagingError('Please enter a reference string');
        return;
    }
    
    // Parse reference string
    const referenceString = referenceStringInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    
    if (referenceString.length === 0) {
        showPagingError('Invalid reference string. Please use comma-separated numbers.');
        return;
    }

    // Validation for number of frames
    if (isNaN(numFrames) || numFrames < 1) {
        showPagingError('Number of frames must be at least 1.');
        return;
    }
    
    if (numFrames > referenceString.length) {
        showPagingError('Number of frames cannot exceed the length of the reference string.');
        return;
    }

    // Calculate all algorithms
    const fifoResult = fifoPageReplacement(referenceString, numFrames);
    const lruResult = lruPageReplacement(referenceString, numFrames);
    const optimalResult = optimalPageReplacement(referenceString, numFrames);
    
    // Display results with comparison
    displayPagingResultsWithComparison([fifoResult, lruResult, optimalResult]);
};

// Make functions global
window.loadPagingSample = loadPagingSample;
window.exportPagingResults = exportPagingResults;
window.copyPagingResults = copyPagingResults;

