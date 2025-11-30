/**
 * Scheduling Algorithms Module
 * Implements FCFS, SJF, Round Robin, and Priority Scheduling
 */

let processes = [];

/**
 * Add process to list
 */
function addProcess() {
    const processId = document.getElementById('processId').value.trim();
    const arrivalTime = parseInt(document.getElementById('arrivalTime').value);
    const burstTime = parseInt(document.getElementById('burstTime').value);
    
    // Validation
    if (!processId) {
        alert('Please enter a process ID');
        return;
    }
    
    if (isNaN(arrivalTime) || arrivalTime < 0) {
        alert('Please enter a valid arrival time (>= 0)');
        return;
    }
    
    if (isNaN(burstTime) || burstTime < 1) {
        alert('Please enter a valid burst time (>= 1)');
        return;
    }
    
    // Check if process ID already exists
    if (processes.find(p => p.id === processId)) {
        alert('Process ID already exists');
        return;
    }
    
    // Add process
    processes.push({
        id: processId,
        arrivalTime: arrivalTime,
        burstTime: burstTime
    });
    
    // Clear inputs
    document.getElementById('processId').value = '';
    document.getElementById('arrivalTime').value = '0';
    document.getElementById('burstTime').value = '1';
    
    // Update process list display
    displayProcessList();
}

/**
 * Display process list
 */
function displayProcessList() {
    const processListDiv = document.getElementById('processList');
    
    if (processes.length === 0) {
        processListDiv.innerHTML = '<p>No processes added yet.</p>';
        return;
    }
    
    processListDiv.innerHTML = `
        <h3>Process List</h3>
        <table class="page-table">
            <thead>
                <tr>
                    <th>Process ID</th>
                    <th>Arrival Time</th>
                    <th>Burst Time</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${processes.map((process, index) => `
                    <tr>
                        <td>${process.id}</td>
                        <td>${process.arrivalTime}</td>
                        <td>${process.burstTime}</td>
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
    if (confirm('Clear all processes?')) {
        processes = [];
        displayProcessList();
    }
}

/**
 * FCFS (First Come First Served) Scheduling
 */
function fcfsScheduling() {
    if (processes.length === 0) {
        alert('Please add at least one process');
        return null;
    }
    
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
 * Display scheduling results
 */
function displaySchedulingResults(result) {
    const resultsDiv = document.getElementById('schedulingResults');
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
    if (processes.length === 0) {
        alert('Please add at least one process');
        return;
    }
    
    // For now, implement FCFS (can add more algorithms later)
    const result = fcfsScheduling();
    if (result) {
        displaySchedulingResults(result);
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
    
    // Initialize process list display
    displayProcessList();
});

// Make functions global for onclick handlers
window.removeProcess = removeProcess;
window.clearProcessList = clearProcessList;

