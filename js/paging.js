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
                        const currentOptimalNextUse = optimalIndex === -1 ? -1 : referenceString.indexOf(optimalPage, i + 1);
                        if (optimalIndex === -1 || nextUse > currentOptimalNextUse) {
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
 * Calculate analysis metrics for page replacement
 */
function calculatePagingAnalysis(results, referenceStringLength) {
    const analysis = {
        bestAlgorithm: null,
        worstAlgorithm: null,
        hitRates: {},
        efficiency: {},
        recommendations: []
    };
    
    // Find best and worst algorithms
    const sortedResults = [...results].sort((a, b) => a.pageFaults - b.pageFaults);
    analysis.bestAlgorithm = sortedResults[0];
    analysis.worstAlgorithm = sortedResults[sortedResults.length - 1];
    
    // Calculate hit rates
    results.forEach(result => {
        const hits = referenceStringLength - result.pageFaults;
        const hitRate = ((hits / referenceStringLength) * 100).toFixed(2);
        analysis.hitRates[result.algorithm] = {
            hits: hits,
            hitRate: hitRate + '%',
            pageFaults: result.pageFaults
        };
    });
    
    // Calculate efficiency (lower page faults = higher efficiency)
    const maxFaults = Math.max(...results.map(r => r.pageFaults));
    results.forEach(result => {
        const efficiency = maxFaults > 0 
            ? ((maxFaults - result.pageFaults) / maxFaults * 100).toFixed(2)
            : '100.00';
        analysis.efficiency[result.algorithm] = efficiency + '%';
    });
    
    // Generate recommendations
    if (analysis.bestAlgorithm.algorithm === 'Optimal') {
        analysis.recommendations.push('Optimal algorithm achieved the best performance (theoretical minimum page faults).');
    } else {
        analysis.recommendations.push(`${analysis.bestAlgorithm.algorithm} performed best with ${analysis.bestAlgorithm.pageFaults} page faults.`);
    }
    
    if (analysis.bestAlgorithm.pageFaults < analysis.worstAlgorithm.pageFaults) {
        const improvement = ((analysis.worstAlgorithm.pageFaults - analysis.bestAlgorithm.pageFaults) / analysis.worstAlgorithm.pageFaults * 100).toFixed(1);
        analysis.recommendations.push(`Using ${analysis.bestAlgorithm.algorithm} instead of ${analysis.worstAlgorithm.algorithm} would reduce page faults by ${improvement}%.`);
    }
    
    // Algorithm-specific insights
    const fifoResult = results.find(r => r.algorithm === 'FIFO');
    const lruResult = results.find(r => r.algorithm === 'LRU');
    const optimalResult = results.find(r => r.algorithm === 'Optimal');
    
    if (fifoResult && lruResult) {
        if (fifoResult.pageFaults > lruResult.pageFaults) {
            analysis.recommendations.push('LRU outperformed FIFO, indicating temporal locality in the reference string.');
        } else if (fifoResult.pageFaults < lruResult.pageFaults) {
            analysis.recommendations.push('FIFO outperformed LRU, which is unusual but can occur with specific access patterns.');
        }
    }
    
    if (optimalResult) {
        analysis.recommendations.push('Optimal algorithm provides the theoretical lower bound for page faults (not practical in real systems).');
    }
    
    // Performance category
    const avgFaultRate = results.reduce((sum, r) => sum + parseFloat(r.pageFaultRate), 0) / results.length;
    if (avgFaultRate < 30) {
        analysis.recommendations.push('Overall performance is excellent with low page fault rates.');
    } else if (avgFaultRate < 60) {
        analysis.recommendations.push('Performance is moderate. Consider increasing number of frames to reduce page faults.');
    } else {
        analysis.recommendations.push('Performance is poor with high page fault rates. Increase frames or optimize reference pattern.');
    }
    
    return analysis;
}

/**
 * Display page replacement results with analysis (analysis appears last)
 */
function displayPagingResults(results) {
    const resultsDiv = document.getElementById('pagingResults');
    if (!resultsDiv) return;
    
    resultsDiv.innerHTML = '';
    
    // Safety check
    if (!results || results.length === 0 || !results[0] || !results[0].steps) {
        showPagingError('No results to display. Please check your inputs.');
        return;
    }
    
    const referenceStringLength = results[0].steps.length;
    const analysis = calculatePagingAnalysis(results, referenceStringLength);
    
    // Display detailed results for each algorithm FIRST
    results.forEach(result => {
        const resultBox = document.createElement('div');
        resultBox.className = 'result-box';
        
        // Add success class if it's the best algorithm
        if (result.algorithm === analysis.bestAlgorithm.algorithm) {
            resultBox.classList.add('success');
        }
        
        const hitInfo = analysis.hitRates[result.algorithm];
        
        resultBox.innerHTML = `
            <h3>${result.algorithm} Algorithm</h3>
            <div class="algorithm-stats">
                <p><strong>Total Page Faults:</strong> ${result.pageFaults}</p>
                <p><strong>Page Hits:</strong> ${hitInfo.hits}</p>
                <p><strong>Page Fault Rate:</strong> ${result.pageFaultRate}</p>
                <p><strong>Hit Rate:</strong> ${hitInfo.hitRate}</p>
                <p><strong>Efficiency:</strong> ${analysis.efficiency[result.algorithm]}</p>
            </div>
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
                                <td class="${step.pageFault ? 'page-fault' : 'page-hit'}">${step.pageFault ? 'Yes' : 'No'}</td>
                                <td>${step.action}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        resultsDiv.appendChild(resultBox);
    });
    
    // Display analysis section LAST
    const analysisBox = document.createElement('div');
    analysisBox.className = 'result-box analysis-box';
    analysisBox.style.borderColor = 'var(--mario-blue)';
    analysisBox.style.boxShadow = '6px 6px 0 var(--mario-blue), inset -2px -2px 0 rgba(0, 0, 0, 0.3), inset 2px 2px 0 rgba(255, 255, 255, 0.1)';
    analysisBox.style.background = 'linear-gradient(180deg, rgba(33, 150, 243, 0.2) 0%, var(--bg-medium) 100%)';
    
    let analysisHTML = '<h3>📊 Performance Analysis</h3>';
    
    // Summary metrics
    analysisHTML += '<h4>Summary Metrics:</h4>';
    analysisHTML += '<div class="analysis-metrics">';
    results.forEach(result => {
        const hitInfo = analysis.hitRates[result.algorithm];
        const isBest = result.algorithm === analysis.bestAlgorithm.algorithm;
        analysisHTML += `
            <div class="metric-item ${isBest ? 'best-metric' : ''}">
                <strong>${result.algorithm}:</strong>
                <span>${result.pageFaults} faults</span> | 
                <span>${hitInfo.hits} hits</span> | 
                <span>Hit Rate: ${hitInfo.hitRate}</span> | 
                <span>Efficiency: ${analysis.efficiency[result.algorithm]}</span>
                ${isBest ? ' ⭐ BEST' : ''}
            </div>
        `;
    });
    analysisHTML += '</div>';
    
    // Best/Worst performance
    analysisHTML += '<h4>Performance Comparison:</h4>';
    analysisHTML += `<p><strong>Best Algorithm:</strong> <span class="best-algorithm">${analysis.bestAlgorithm.algorithm}</span> with ${analysis.bestAlgorithm.pageFaults} page faults (${analysis.bestAlgorithm.pageFaultRate} fault rate)</p>`;
    
    if (analysis.bestAlgorithm.algorithm !== analysis.worstAlgorithm.algorithm) {
        analysisHTML += `<p><strong>Worst Algorithm:</strong> <span class="worst-algorithm">${analysis.worstAlgorithm.algorithm}</span> with ${analysis.worstAlgorithm.pageFaults} page faults (${analysis.worstAlgorithm.pageFaultRate} fault rate)</p>`;
        
        const difference = analysis.worstAlgorithm.pageFaults - analysis.bestAlgorithm.pageFaults;
        const improvement = ((difference / analysis.worstAlgorithm.pageFaults) * 100).toFixed(1);
        analysisHTML += `<p><strong>Performance Gap:</strong> ${difference} fewer faults (${improvement}% improvement) when using ${analysis.bestAlgorithm.algorithm}</p>`;
    }
    
    // Algorithm insights
    analysisHTML += '<h4>Algorithm Insights:</h4>';
    analysisHTML += '<ul class="analysis-list">';
    
    const fifoResult = results.find(r => r.algorithm === 'FIFO');
    const lruResult = results.find(r => r.algorithm === 'LRU');
    const optimalResult = results.find(r => r.algorithm === 'Optimal');
    
    if (fifoResult) {
        analysisHTML += `<li><strong>FIFO:</strong> Simple but may suffer from Belady's anomaly. Replaced oldest page regardless of future needs.</li>`;
    }
    
    if (lruResult) {
        analysisHTML += `<li><strong>LRU:</strong> Uses temporal locality - keeps recently used pages. Generally performs well in practice.</li>`;
    }
    
    if (optimalResult) {
        analysisHTML += `<li><strong>Optimal:</strong> Theoretical best algorithm (looks into future). Not implementable in real systems but provides benchmark.</li>`;
    }
    
    analysisHTML += '</ul>';
    
    // Recommendations
    analysisHTML += '<h4>Recommendations:</h4>';
    analysisHTML += '<ul class="analysis-list">';
    analysis.recommendations.forEach(rec => {
        analysisHTML += `<li>${rec}</li>`;
    });
    analysisHTML += '</ul>';
    
    analysisBox.innerHTML = analysisHTML;
    resultsDiv.appendChild(analysisBox);
    
    // Show export section when results are displayed
    const exportSection = document.getElementById('pagingExport');
    if (exportSection) {
        exportSection.style.display = 'flex';
    }
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
    const referenceStringInput = document.getElementById('referenceString');
    const numFramesInput = document.getElementById('numFrames');
    
    if (!referenceStringInput || !numFramesInput) {
        showPagingError('Input fields not found. Please refresh the page.');
        return;
    }
    
    const referenceStringValue = referenceStringInput.value.trim();
    const numFrames = parseInt(numFramesInput.value);
    
    // Validation for reference string
    if (!referenceStringValue) {
        showPagingError('Please enter a reference string');
        const resultsDiv = document.getElementById('pagingResults');
        if (resultsDiv) resultsDiv.innerHTML = '';
        return;
    }
    
    // Parse reference string - handle spaces and various separators
    const referenceString = referenceStringValue
        .split(/[,\s]+/)
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n) && n >= 0);
    
    if (referenceString.length === 0) {
        showPagingError('Invalid reference string. Please use comma-separated numbers (e.g., 7,0,1,2,0,3).');
        const resultsDiv = document.getElementById('pagingResults');
        if (resultsDiv) resultsDiv.innerHTML = '';
        return;
    }

    // Validation for number of frames
    if (isNaN(numFrames) || numFrames < 1) {
        showPagingError('Number of frames must be at least 1.');
        const resultsDiv = document.getElementById('pagingResults');
        if (resultsDiv) resultsDiv.innerHTML = '';
        return;
    }
    
    if (numFrames > 10) {
        showPagingError('Number of frames cannot exceed 10.');
        const resultsDiv = document.getElementById('pagingResults');
        if (resultsDiv) resultsDiv.innerHTML = '';
        return;
    }
    
    if (numFrames > referenceString.length) {
        showPagingError('Number of frames cannot exceed the length of the reference string.');
        const resultsDiv = document.getElementById('pagingResults');
        if (resultsDiv) resultsDiv.innerHTML = '';
        return;
    }

    // Clear any previous errors
    const errorDiv = document.querySelector('#paging-section .error-message');
    if (errorDiv) errorDiv.style.display = 'none';

    // Calculate all algorithms
    try {
        const fifoResult = fifoPageReplacement(referenceString, numFrames);
        const lruResult = lruPageReplacement(referenceString, numFrames);
        const optimalResult = optimalPageReplacement(referenceString, numFrames);
        
        // Display results with comparison and analysis
        displayPagingResultsWithComparison([fifoResult, lruResult, optimalResult]);
    } catch (error) {
        showPagingError('An error occurred during calculation: ' + error.message);
        console.error('Page replacement error:', error);
    }
}

// Setup event listener
document.addEventListener('DOMContentLoaded', function() {
    const referenceStringInput = document.getElementById('referenceString');
    const numFramesInput = document.getElementById('numFrames');

    if (referenceStringInput && numFramesInput) {
        // Use debounce for input events to avoid excessive calculations
        let inputTimeout;
        const debouncedCalculate = () => {
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(calculatePageReplacement, 300);
        };
        
        referenceStringInput.addEventListener('input', debouncedCalculate);
        numFramesInput.addEventListener('input', debouncedCalculate);
        numFramesInput.addEventListener('change', calculatePageReplacement);

        // Initial calculation on page load (only if values exist)
        if (referenceStringInput.value.trim() && numFramesInput.value) {
            calculatePageReplacement();
        }
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
            const percentage = maxFaults > 0 ? (result.faults / maxFaults) * 100 : 100;
            
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

// Note: calculatePageReplacement already uses displayPagingResultsWithComparison
// No need to override it - the function is already correct

// Make functions global
window.loadPagingSample = loadPagingSample;
window.exportPagingResults = exportPagingResults;
window.copyPagingResults = copyPagingResults;

