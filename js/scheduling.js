/**
 * Scheduling Algorithms Module
 * Implements FCFS, SJF, Round Robin, and Priority Scheduling
 */

let processes = [];

function showSchedulingError(message) {
    const errorDiv = document.querySelector('#scheduling-section .error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }
}

function showCalculateError(message) {
    const errorDiv = document.getElementById('calculate-error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }
}

/**
 * Add process to list
 */
function addProcess() {
    const processIdInput = document.getElementById('processId').value.trim();
    const arrivalTime = parseInt(document.getElementById('arrivalTime').value);
    const burstTime = parseInt(document.getElementById('burstTime').value);
    const priority = parseInt(document.getElementById('priority').value);
    
    // Validation
    if (!processIdInput) {
        showSchedulingError('Please enter a process ID');
        return;
    }

    const processId = parseInt(processIdInput);

    if (isNaN(processId) || processId < 0) {
        showSchedulingError('Process ID must be a non-negative integer.');
        return;
    }
    
    if (isNaN(arrivalTime) || arrivalTime < 0) {
        showSchedulingError('Please enter a valid arrival time (>= 0)');
        return;
    }
    
    if (isNaN(burstTime) || burstTime < 1) {
        showSchedulingError('Please enter a valid burst time (>= 1)');
        return;
    }
    
    const algorithm = document.getElementById('schedulingAlgorithm').value;

    if (algorithm === "priority") {
        if (isNaN(priority) || priority < 0) {
            showSchedulingError('Please enter a valid priority (>= 0)');
            return;
        }
    }

    
    // Check if process ID already exists
    if (processes.find(p => p.id === processId)) {
        showSchedulingError('Process ID already exists');
        return;
    }
    
    // Add process
    processes.push({
        id: processId,
        arrivalTime: arrivalTime,
        burstTime: burstTime,
        priority: priority
    });
    
    // Clear inputs
    document.getElementById('processId').value = '';
    document.getElementById('arrivalTime').value = '0';
    document.getElementById('burstTime').value = '1';
    document.getElementById('priority').value = '0';
    
    // Update process list display
    displayProcessList();
}

/**
 * Display process list
 */
function displayProcessList() {
    const processListDiv = document.getElementById('processList');
    const calculateBtn = document.getElementById('calculateSchedulingBtn');
    const algorithm = document.getElementById('schedulingAlgorithm').value;
    const showPriority = algorithm === 'priority';

    // document.getElementById('calculateSchedulingBtn').disabled = true;
    
    if (processes.length === 0) {
        processListDiv.innerHTML = '<p>No processes added yet.</p>';
        calculateBtn.disabled = true;
        return;
    }
    
    calculateBtn.disabled = false;
    
    processListDiv.innerHTML = `
        <h3>Process List</h3>
        <table class="page-table">
            <thead>
                <tr>
                    <th>Process ID</th>
                    <th>Arrival Time</th>
                    <th>Burst Time</th>
                    ${showPriority ? '<th>Priority</th>' : ''}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${processes.map((process, index) => `
                    <tr>
                        <td>${process.id}</td>
                        <td>${process.arrivalTime}</td>
                        <td>${process.burstTime}</td>
                        ${showPriority ? `<td>${process.priority}</td>` : ''}
                        <td><button class="btn-secondary" onclick="removeProcess(${index})">Remove</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <button class="btn-secondary" onclick="clearProcessList()" style="margin-top: 10px;">Clear All</button>
    `;
}

/**
 * Remove process
 */
function removeProcess(index) {
    processes.splice(index, 1);
    displayProcessList();
}

/**
 * Clear process list
 */
function clearProcessList() {
    if (processes.length > 0 && confirm('This will reset all added processes. Are you sure?')) {
        processes = [];
        displayProcessList();
    }
}

/**
 * FCFS (First Come First Served) Scheduling
 */
function fcfsScheduling() {
    // Sort by arrival time
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    
    let currentTime = 0;
    const ganttChart = [];
    const results = [];
    
    sortedProcesses.forEach(process => {
        const startTime = Math.max(currentTime, process.arrivalTime);
        const completionTime = startTime + process.burstTime;
        const turnaroundTime = completionTime - process.arrivalTime;
        const waitingTime = turnaroundTime - process.burstTime;
        
        ganttChart.push({
            process: process.id,
            start: startTime,
            end: completionTime
        });
        
        results.push({
            process: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.burstTime,
            priority: process.priority, // Add priority for consistency
            startTime: startTime,
            completionTime: completionTime,
            turnaroundTime: turnaroundTime,
            waitingTime: waitingTime
        });
        
        currentTime = completionTime;
    });
    
    const avgWaitingTime = results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length;
    const avgTurnaroundTime = results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length;
    
    return {
        algorithm: 'FCFS',
        ganttChart: ganttChart,
        results: results,
        avgWaitingTime: avgWaitingTime.toFixed(2),
        avgTurnaroundTime: avgTurnaroundTime.toFixed(2)
    };
}

/**
 * SJF (Shortest Job First) Scheduling - Non-preemptive
 */
function sjfScheduling() {
    const remainingProcesses = JSON.parse(JSON.stringify(processes));
    let currentTime = 0;
    const ganttChart = [];
    const results = [];

    while (remainingProcesses.length > 0) {
        const arrivedProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);

        if (arrivedProcesses.length === 0) {
            currentTime++;
            continue;
        }

        arrivedProcesses.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime);
        const currentProcess = arrivedProcesses[0];

        const startTime = currentTime;
        const completionTime = startTime + currentProcess.burstTime;
        const turnaroundTime = completionTime - currentProcess.arrivalTime;
        const waitingTime = turnaroundTime - currentProcess.burstTime;

        ganttChart.push({ process: currentProcess.id, start: startTime, end: completionTime });

        results.push({
            process: currentProcess.id,
            arrivalTime: currentProcess.arrivalTime,
            burstTime: currentProcess.burstTime,
            priority: currentProcess.priority,
            startTime: startTime,
            completionTime: completionTime,
            turnaroundTime: turnaroundTime,
            waitingTime: waitingTime
        });

        currentTime = completionTime;
        const processIndex = remainingProcesses.findIndex(p => p.id === currentProcess.id);
        remainingProcesses.splice(processIndex, 1);
    }

    const avgWaitingTime = results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length;
    const avgTurnaroundTime = results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length;

    return {
        algorithm: 'SJF (Non-Preemptive)',
        ganttChart: ganttChart,
        results: results,
        avgWaitingTime: avgWaitingTime.toFixed(2),
        avgTurnaroundTime: avgTurnaroundTime.toFixed(2)
    };
}

/**
 * Priority Scheduling - Non-preemptive
 */
function priorityScheduling() {
    const remainingProcesses = JSON.parse(JSON.stringify(processes));
    let currentTime = 0;
    const ganttChart = [];
    const results = [];

    while (remainingProcesses.length > 0) {
        const arrivedProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);

        if (arrivedProcesses.length === 0) {
            currentTime++;
            continue;
        }

        arrivedProcesses.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
        const currentProcess = arrivedProcesses[0];

        const startTime = currentTime;
        const completionTime = startTime + currentProcess.burstTime;
        const turnaroundTime = completionTime - currentProcess.arrivalTime;
        const waitingTime = turnaroundTime - currentProcess.burstTime;

        ganttChart.push({ process: currentProcess.id, start: startTime, end: completionTime });

        results.push({
            process: currentProcess.id,
            arrivalTime: currentProcess.arrivalTime,
            burstTime: currentProcess.burstTime,
            priority: currentProcess.priority,
            startTime: startTime,
            completionTime: completionTime,
            turnaroundTime: turnaroundTime,
            waitingTime: waitingTime
        });

        currentTime = completionTime;
        const processIndex = remainingProcesses.findIndex(p => p.id === currentProcess.id);
        remainingProcesses.splice(processIndex, 1);
    }

    const avgWaitingTime = results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length;
    const avgTurnaroundTime = results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length;

    return {
        algorithm: 'Priority (Non-Preemptive)',
        ganttChart: ganttChart,
        results: results,
        avgWaitingTime: avgWaitingTime.toFixed(2),
        avgTurnaroundTime: avgTurnaroundTime.toFixed(2)
    };
}

/**
 * Round Robin Scheduling
 */
function roundRobinScheduling() {
    const timeQuantum = parseInt(document.getElementById('timeQuantum').value);
    if (isNaN(timeQuantum) || timeQuantum < 1) {
        showCalculateError('Please enter a valid time quantum (>= 1)');
        return null;
    }

    const readyQueue = [];
    const remainingProcesses = JSON.parse(JSON.stringify(processes.map(p => ({ ...p, remainingTime: p.burstTime }))));
    remainingProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    const ganttChart = [];
    const resultsMap = {};

    while (remainingProcesses.length > 0 || readyQueue.length > 0) {
        while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= currentTime) {
            readyQueue.push(remainingProcesses.shift());
        }

        if (readyQueue.length === 0) {
            currentTime++;
            continue;
        }

        const currentProcess = readyQueue.shift();

        if (!resultsMap[currentProcess.id]) {
            resultsMap[currentProcess.id] = { ...currentProcess, startTime: -1, completionTime: 0, waitingTime: 0 };
        }
        if (resultsMap[currentProcess.id].startTime === -1) {
            resultsMap[currentProcess.id].startTime = currentTime;
        }

        const executionTime = Math.min(timeQuantum, currentProcess.remainingTime);
        ganttChart.push({ process: currentProcess.id, start: currentTime, end: currentTime + executionTime });
        currentTime += executionTime;
        currentProcess.remainingTime -= executionTime;

        while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= currentTime) {
            readyQueue.push(remainingProcesses.shift());
        }

        if (currentProcess.remainingTime > 0) {
            readyQueue.push(currentProcess);
        } else {
            resultsMap[currentProcess.id].completionTime = currentTime;
            resultsMap[currentProcess.id].turnaroundTime = resultsMap[currentProcess.id].completionTime - resultsMap[currentProcess.id].arrivalTime;
            resultsMap[currentProcess.id].waitingTime = resultsMap[currentProcess.id].turnaroundTime - resultsMap[currentProcess.id].burstTime;
        }
    }

    const results = Object.values(resultsMap).map(r => ({
        process: r.id,
        arrivalTime: r.arrivalTime,
        burstTime: r.burstTime,
        priority: r.priority,
        startTime: r.startTime,
        completionTime: r.completionTime,
        turnaroundTime: r.turnaroundTime,
        waitingTime: r.waitingTime
    }));
    const avgWaitingTime = results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length;
    const avgTurnaroundTime = results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length;

    return {
        algorithm: `Round Robin (Q=${timeQuantum})`,
        ganttChart: ganttChart,
        results: results,
        avgWaitingTime: avgWaitingTime.toFixed(2),
        avgTurnaroundTime: avgTurnaroundTime.toFixed(2)
    };
}

/**
 * Display scheduling results
 */
function displaySchedulingResults(result) {
    const resultsDiv = document.getElementById('schedulingResults');
    const showPriority = result.algorithm.toLowerCase().includes('priority');
    resultsDiv.innerHTML = '';
    
    const resultBox = document.createElement('div');
    resultBox.className = 'result-box success';
    
    // Gantt Chart
    let ganttHTML = '<h4>Gantt Chart:</h4><div class="gantt-chart">';
    result.ganttChart.forEach(item => {
        const width = ((item.end - item.start) * 40) + 'px';
        ganttHTML += `<div class="gantt-bar" style="width: ${width}">${item.process}<br>${item.start}-${item.end}</div>`;
    });
    ganttHTML += '</div>';
    
    // Results Table
    let tableHTML = `
        <h4>Process Details:</h4>
        <table class="page-table">
            <thead>
                <tr>
                    <th>Process</th>
                    <th>Arrival</th>
                    <th>Burst</th>
                    ${showPriority ? '<th>Priority</th>' : ''}
                    <th>Start</th>
                    <th>Completion</th>
                    <th>Turnaround</th>
                    <th>Waiting</th>
                </tr>
            </thead>
            <tbody>
                ${result.results.map(r => `
                    <tr>
                        <td>${r.process}</td>
                        <td>${r.arrivalTime}</td>
                        <td>${r.burstTime}</td>
                        ${showPriority ? `<td>${r.priority}</td>` : ''}
                        <td>${r.startTime}</td>
                        <td>${r.completionTime}</td>
                        <td>${r.turnaroundTime}</td>
                        <td>${r.waitingTime}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <p><strong>Average Waiting Time:</strong> ${result.avgWaitingTime}</p>
        <p><strong>Average Turnaround Time:</strong> ${result.avgTurnaroundTime}</p>
    `;
    
    resultBox.innerHTML = `
        <h3>${result.algorithm} Scheduling Results</h3>
        ${ganttHTML}
        ${tableHTML}
    `;
    
    resultsDiv.appendChild(resultBox);
}

/**
 * Calculate scheduling
 */
function calculateScheduling() {
    const resultsDiv = document.getElementById('schedulingResults');
    resultsDiv.innerHTML = ''; // Clear previous results at the start

    if (processes.length === 0) {
        showCalculateError('Please add at least one process');
        return;
    }

    const algorithm = document.getElementById('schedulingAlgorithm').value;
    let result;

    switch (algorithm) {
        case 'fcfs':
            result = fcfsScheduling();
            break;
        case 'sjf':
            result = sjfScheduling();
            break;
        case 'priority':
            result = priorityScheduling();
            break;
        case 'rr':
            result = roundRobinScheduling();
            break;
    }
    
    if (result) {
        displaySchedulingResults(result);
    } else {
        // If result is null (which means an error occurred in the scheduling function),
        // we ensure the results area is cleared. The scheduling functions are responsible
        // for showing the actual error message.
        resultsDiv.innerHTML = '';
    }
}

// Setup event listeners
document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('addProcessBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addProcess);
    }
    
    const calculateBtn = document.getElementById('calculateSchedulingBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateScheduling);
    }

    const algorithmSelect = document.getElementById('schedulingAlgorithm');
    if (algorithmSelect) {
        algorithmSelect.addEventListener('change', function() {
            const timeQuantumInput = document.getElementById('timeQuantumInput');
            const priorityInput = document.getElementById('priorityInput');

            if (this.value === 'rr') {
                timeQuantumInput.style.display = 'block';
            } else {
                timeQuantumInput.style.display = 'none';
            }

            priorityInput.style.display = this.value === 'priority' ? 'block' : 'none';

            // Refresh the process list to show/hide the priority column
            displayProcessList();
        });
    }
    
    // Initialize process list display
    displayProcessList();
});

// Make functions global for onclick handlers
window.removeProcess = removeProcess;
window.clearProcessList = clearProcessList;
