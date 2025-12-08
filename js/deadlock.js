/**
 * Deadlock Algorithm Module
 * Implements Banker's Algorithm for deadlock avoidance
 */

let numProcesses = 3;
let numResources = 3;
let allocation = [];
let max = [];
let available = [];

function showDeadlockError(message) {
    const errorDiv = document.querySelector('#deadlock-section .error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }
}

/**
 * Setup matrices for Banker's Algorithm
 */
function setupDeadlockMatrices() {
    numProcesses = parseInt(document.getElementById('numProcesses').value);
    numResources = parseInt(document.getElementById('numResources').value);
    
    // Validation
    if (numProcesses < 1 || numProcesses > 10) {
        showDeadlockError('Number of processes must be between 1 and 10');
        return;
    }
    
    if (numResources < 1 || numResources > 10) {
        showDeadlockError('Number of resources must be between 1 and 10');
        return;
    }
    
    // Initialize matrices

    allocation = Array(numProcesses).fill(null).map(() => Array(numResources).fill(0));
    max = Array(numProcesses).fill(null).map(() => Array(numResources).fill(0));
    available = Array(numResources).fill(0);
    
    // Display input matrices
    displayDeadlockMatrices();
}

/**
 * Display input matrices
 */
function displayDeadlockMatrices() {
    const matricesDiv = document.getElementById('deadlockMatrices');
    matricesDiv.innerHTML = '';
    
    // Allocation Matrix
    const allocationDiv = document.createElement('div');
    allocationDiv.className = 'matrix-container';
    allocationDiv.innerHTML = `
        <h4>Allocation Matrix</h4>
        <table class="matrix" id="allocationMatrix">
            <thead>
                <tr>
                    <th>Process</th>
                    ${Array(numResources).fill(0).map((_, i) => `<th>R${i}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${allocation.map((row, i) => `
                    <tr>
                        <th>P${i}</th>
                        ${row.map((val, j) => `
                            <td><input type="number" min="0" value="${val}" data-process="${i}" data-resource="${j}" data-type="allocation"></td>
                        `).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    // Max Matrix
    const maxDiv = document.createElement('div');
    maxDiv.className = 'matrix-container';
    maxDiv.innerHTML = `
        <h4>Max Matrix</h4>
        <table class="matrix" id="maxMatrix">
            <thead>
                <tr>
                    <th>Process</th>
                    ${Array(numResources).fill(0).map((_, i) => `<th>R${i}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${max.map((row, i) => `
                    <tr>
                        <th>P${i}</th>
                        ${row.map((val, j) => `
                            <td><input type="number" min="0" value="${val}" data-process="${i}" data-resource="${j}" data-type="max"></td>
                        `).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    // Available Resources
    const availableDiv = document.createElement('div');
    availableDiv.className = 'matrix-container';
    availableDiv.innerHTML = `
        <h4>Available Resources</h4>
        <table class="matrix" id="availableMatrix">
            <thead>
                <tr>
                    ${Array(numResources).fill(0).map((_, i) => `<th>R${i}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr>
                    ${available.map((val, i) => `
                        <td><input type="number" min="0" value="${val}" data-resource="${i}" data-type="available"></td>
                    `).join('')}
                </tr>
            </tbody>
        </table>
    `;
    
    matricesDiv.appendChild(allocationDiv);
    matricesDiv.appendChild(maxDiv);
    matricesDiv.appendChild(availableDiv);
    
    // Add event listeners to inputs
    setupMatrixInputListeners();
    calculateBankersAlgorithm();
}

/**
 * Setup input listeners for matrices
 */
function setupMatrixInputListeners() {
    const inputs = document.querySelectorAll('#deadlockMatrices input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const process = parseInt(this.getAttribute('data-process'));
            const resource = parseInt(this.getAttribute('data-resource'));
            const type = this.getAttribute('data-type');
            const value = parseInt(this.value) || 0;
            
            if (type === 'allocation') {
                allocation[process][resource] = value;
            } else if (type === 'max') {
                max[process][resource] = value;
            } else if (type === 'available') {
                available[resource] = value;
            }
            
            calculateBankersAlgorithm();
        });
    });
}

/**
 * Calculate Need Matrix
 */
function calculateNeed() {
    const need = [];
    for (let i = 0; i < numProcesses; i++) {
        need[i] = [];
        for (let j = 0; j < numResources; j++) {
            need[i][j] = max[i][j] - allocation[i][j];
            if (need[i][j] < 0) {
                return null; // Invalid state
            }
        }
    }
    return need;
}

/**
 * Check if a process can be satisfied
 */
function canSatisfy(need, available, processIndex) {
    for (let j = 0; j < numResources; j++) {
        if (need[processIndex][j] > available[j]) {
            return false;
        }
    }
    return true;
}

/**
 * Banker's Algorithm - Find safe sequence
 */
function bankersAlgorithm() {
    const need = calculateNeed();
    if (!need) {
        return {
            safe: false,
            message: 'Invalid state: Need matrix has negative values',
            sequence: []
        };
    }
    
    const work = [...available];
    const finish = Array(numProcesses).fill(false);
    const safeSequence = [];
    let found = true;
    
    while (found && safeSequence.length < numProcesses) {
        found = false;
        
        for (let i = 0; i < numProcesses; i++) {
            if (!finish[i] && canSatisfy(need, work, i)) {
                // Process can be satisfied
                for (let j = 0; j < numResources; j++) {
                    work[j] += allocation[i][j];
                }
                finish[i] = true;
                safeSequence.push(i);
                found = true;
                break;
            }
        }
    }
    
    // Check if all processes finished
    const allFinished = finish.every(f => f === true);
    
    return {
        safe: allFinished,
        message: allFinished 
            ? `System is in SAFE state. Safe sequence found.`
            : `System is in UNSAFE state. Deadlock may occur.`,
        sequence: safeSequence,
        need: need
    };
}

/**
 * Display Banker's Algorithm results
 */
function displayDeadlockResults(result) {
    const resultsDiv = document.getElementById('deadlockResults');
    resultsDiv.innerHTML = '';
    
    const resultBox = document.createElement('div');
    resultBox.className = `result-box ${result.safe ? 'success' : 'error'}`;
    
    // Need Matrix
    let needMatrixHTML = '<h4>Need Matrix (Max - Allocation):</h4><table class="matrix"><thead><tr><th>Process</th>';
    for (let j = 0; j < numResources; j++) {
        needMatrixHTML += `<th>R${j}</th>`;
    }
    needMatrixHTML += '</tr></thead><tbody>';
    for (let i = 0; i < numProcesses; i++) {
        needMatrixHTML += `<tr><th>P${i}</th>`;
        for (let j = 0; j < numResources; j++) {
            needMatrixHTML += `<td>${result.need[i][j]}</td>`;
        }
        needMatrixHTML += '</tr>';
    }
    needMatrixHTML += '</tbody></table>';
    
    // Safe Sequence
    let sequenceHTML = '';
    if (result.safe && result.sequence.length > 0) {
        sequenceHTML = `
            <h4>Safe Sequence:</h4>
            <p style="font-size: 18px; font-weight: bold; color: #10B981;">
                ${result.sequence.map(p => `P${p}`).join(' → ')}
            </p>
        `;
    }
    
    // Analysis
    let analysisHTML = `
        <h4>Analysis:</h4>
        <p>${result.message}</p>
    `;
    
    if (result.safe) {
        analysisHTML += `
            <p><strong>Explanation:</strong> All processes can be completed in the order shown above without causing a deadlock.</p>
            <p><strong>Suggestion:</strong> The system can safely grant resources to processes in the safe sequence order.</p>
        `;
    } else {
        analysisHTML += `
            <p><strong>Explanation:</strong> Not all processes can be completed, which may lead to a deadlock situation.</p>
            <p><strong>Suggestion:</strong> 
                <ul>
                    <li>Increase available resources</li>
                    <li>Reduce maximum resource requirements</li>
                    <li>Reallocate resources from other processes</li>
                    <li>Wait for some processes to release resources</li>
                </ul>
            </p>
        `;
    }
    
    resultBox.innerHTML = `
        <h3>Banker's Algorithm Results</h3>
        ${needMatrixHTML}
        ${sequenceHTML}
        ${analysisHTML}
    `;
    
    resultsDiv.appendChild(resultBox);
}

/**
 * Calculate Banker's Algorithm
 */
function calculateBankersAlgorithm() {
    // Validate inputs
    const need = calculateNeed();
    if (!need) {
        showDeadlockError('Invalid state: A process\'s max need cannot be less than its allocation. Please check your inputs.');
        // Optionally clear results or show an error state in the results display
        const resultsDiv = document.getElementById('deadlockResults');
        resultsDiv.innerHTML = '<div class="result-box error"><p>Invalid input: Max need cannot be less than allocation.</p></div>';
        return;
    }
    
    // Run algorithm
    const result = bankersAlgorithm();
    
    // Display results
    displayDeadlockResults(result);
}

// Setup event listener
document.addEventListener('DOMContentLoaded', function() {
    const numProcessesInput = document.getElementById('numProcesses');
    const numResourcesInput = document.getElementById('numResources');

    if (numProcessesInput && numResourcesInput) {
        numProcessesInput.addEventListener('input', setupDeadlockMatrices);
        numResourcesInput.addEventListener('input', setupDeadlockMatrices);

        // Initial setup on page load
        setupDeadlockMatrices();
    }
});

// Sample Data Functions for Deadlock
function loadDeadlockSample(sampleNum) {
    if (sampleNum === 1) {
        // Safe State Example
        document.getElementById('numProcesses').value = 5;
        document.getElementById('numResources').value = 3;
        numProcesses = 5;
        numResources = 3;
        
        // Allocation Matrix (Safe State)
        allocation = [
            [0, 1, 0],  // P0
            [2, 0, 0],  // P1
            [3, 0, 2],  // P2
            [2, 1, 1],  // P3
            [0, 0, 2]   // P4
        ];
        
        // Max Matrix
        max = [
            [7, 5, 3],  // P0
            [3, 2, 2],  // P1
            [9, 0, 2],  // P2
            [2, 2, 2],  // P3
            [4, 3, 3]   // P4
        ];
        
        // Available Resources
        available = [3, 3, 2];
        
        displayDeadlockMatrices();
        
    } else if (sampleNum === 2) {
        // Unsafe State Example
        document.getElementById('numProcesses').value = 4;
        document.getElementById('numResources').value = 3;
        numProcesses = 4;
        numResources = 3;
        
        // Allocation Matrix (Unsafe State)
        allocation = [
            [0, 1, 0],  // P0
            [3, 0, 2],  // P1
            [3, 0, 1],  // P2
            [2, 1, 1]   // P3
        ];
        
        // Max Matrix
        max = [
            [8, 4, 3],  // P0
            [6, 2, 3],  // P1
            [3, 3, 3],  // P2
            [4, 2, 2]   // P3
        ];
        
        // Available Resources
        available = [1, 0, 0];
        
        displayDeadlockMatrices();
        
    } else if (sampleNum === 3) {
        // Complex Example
        document.getElementById('numProcesses').value = 6;
        document.getElementById('numResources').value = 4;
        numProcesses = 6;
        numResources = 4;
        
        // Allocation Matrix
        allocation = [
            [0, 0, 1, 2],  // P0
            [1, 0, 0, 0],  // P1
            [1, 3, 5, 4],  // P2
            [0, 6, 3, 2],  // P3
            [0, 0, 1, 4],  // P4
            [1, 0, 1, 0]   // P5
        ];
        
        // Max Matrix
        max = [
            [0, 0, 1, 2],  // P0
            [1, 7, 5, 0],  // P1
            [2, 3, 5, 6],  // P2
            [0, 6, 5, 2],  // P3
            [0, 6, 5, 6],  // P4
            [1, 0, 1, 0]   // P5
        ];
        
        // Available Resources
        available = [1, 5, 2, 0];
        
        displayDeadlockMatrices();
    }
}

// Export Functions for Deadlock
function exportDeadlockResults() {
    const resultsDiv = document.getElementById('deadlockResults');
    if (!resultsDiv || resultsDiv.innerHTML.trim() === '') {
        alert('No results to export. Please run the algorithm first.');
        return;
    }
    
    let exportText = '========================================\n';
    exportText += 'DEADLOCK ALGORITHM RESULTS\n';
    exportText += 'Banker\'s Algorithm for Deadlock Avoidance\n';
    exportText += '========================================\n\n';
    
    exportText += 'Configuration:\n';
    exportText += `Number of Processes: ${numProcesses}\n`;
    exportText += `Number of Resources: ${numResources}\n\n`;
    
    exportText += 'Allocation Matrix:\n';
    allocation.forEach((row, i) => {
        exportText += `P${i}: [${row.join(', ')}]\n`;
    });
    exportText += '\n';
    
    exportText += 'Max Matrix:\n';
    max.forEach((row, i) => {
        exportText += `P${i}: [${row.join(', ')}]\n`;
    });
    exportText += '\n';
    
    exportText += `Available Resources: [${available.join(', ')}]\n\n`;
    
    exportText += resultsDiv.innerText;
    exportText += '\n\n========================================\n';
    exportText += 'Generated by OS Simulator\n';
    exportText += `Date: ${new Date().toLocaleString()}\n`;
    exportText += '========================================\n';
    
    downloadAsFile('deadlock-results.txt', exportText);
    
    const exportSection = document.getElementById('deadlockExport');
    if (exportSection) {
        exportSection.style.display = 'flex';
    }
}

function copyDeadlockResults() {
    const resultsDiv = document.getElementById('deadlockResults');
    if (!resultsDiv || resultsDiv.innerHTML.trim() === '') {
        alert('No results to copy. Please run the algorithm first.');
        return;
    }
    
    copyToClipboard(resultsDiv.innerText);
}

// Make functions global
window.loadDeadlockSample = loadDeadlockSample;
window.exportDeadlockResults = exportDeadlockResults;
window.copyDeadlockResults = copyDeadlockResults;

