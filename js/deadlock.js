/**
 * Deadlock Algorithm Module
 * Implements Banker's Algorithm for deadlock avoidance
 */

let numProcesses = 3;
let numResources = 3;
let allocation = [];
let max = [];
let available = [];

/**
 * Setup matrices for Banker's Algorithm
 */
function setupDeadlockMatrices() {
    numProcesses = parseInt(document.getElementById('numProcesses').value);
    numResources = parseInt(document.getElementById('numResources').value);
    
    // Validation
    if (numProcesses < 1 || numProcesses > 10) {
        alert('Number of processes must be between 1 and 10');
        return;
    }
    
    if (numResources < 1 || numResources > 10) {
        alert('Number of resources must be between 1 and 10');
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
        <button id="calculateDeadlockBtn" class="btn-primary" style="margin-top: 20px;">Calculate Safe Sequence</button>
    `;
    
    matricesDiv.appendChild(allocationDiv);
    matricesDiv.appendChild(maxDiv);
    matricesDiv.appendChild(availableDiv);
    
    // Add event listeners to inputs
    setupMatrixInputListeners();
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
        });
    });
    
    // Calculate button
    const calculateBtn = document.getElementById('calculateDeadlockBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBankersAlgorithm);
    }
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
        alert('Invalid state: Need matrix has negative values. Please check your inputs.');
        return;
    }
    
    // Run algorithm
    const result = bankersAlgorithm();
    
    // Display results
    displayDeadlockResults(result);
}

// Setup event listener
document.addEventListener('DOMContentLoaded', function() {
    const setupBtn = document.getElementById('setupDeadlockBtn');
    if (setupBtn) {
        setupBtn.addEventListener('click', setupDeadlockMatrices);
    }
});

