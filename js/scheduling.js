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
    const processIdInput = document.getElementById('processId');
    const arrivalTimeInput = document.getElementById('arrivalTime');
    const burstTimeInput = document.getElementById('burstTime');
    const priorityInput = document.getElementById('priority');
    
    if (!processIdInput || !arrivalTimeInput || !burstTimeInput || !priorityInput) {
        showSchedulingError('Input fields not found. Please refresh the page.');
        return;
    }
    
    const processIdValue = processIdInput.value.trim();
    const arrivalTime = parseInt(arrivalTimeInput.value);
    const burstTime = parseInt(burstTimeInput.value);
    const priority = parseInt(priorityInput.value);
    
    // Validation
    if (!processIdValue) {
        showSchedulingError('Please enter a process ID');
        return;
    }

    const processId = parseInt(processIdValue);

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
    
    const algorithm = document.getElementById('schedulingAlgorithm');
    if (!algorithm) {
        showSchedulingError('Algorithm selector not found.');
        return;
    }

    if (algorithm.value === "priority") {
        if (isNaN(priority) || priority < 0) {
            showSchedulingError('Please enter a valid priority (>= 0)');
            return;
        }
    }

    
    // Check if process ID already exists
    if (processes.find(p => p.id === processId)) {
        showSchedulingError('Process ID already exists. Please use a different ID.');
        return;
    }
    
    // Add process
    processes.push({
        id: processId,
        arrivalTime: arrivalTime,
        burstTime: burstTime,
        priority: priority || 0 // Default priority to 0 if not provided
    });
    
    // Clear inputs
    processIdInput.value = '';
    arrivalTimeInput.value = '0';
    burstTimeInput.value = '1';
    priorityInput.value = '0';
    
    // Clear any previous errors
    const errorDiv = document.querySelector('#scheduling-section .error-message');
    if (errorDiv) errorDiv.style.display = 'none';
    
    // Update process list display
    displayProcessList();
    
    // Focus on process ID input for next entry
    processIdInput.focus();
}

/**
 * Display process list
 */
function displayProcessList() {
    const processListDiv = document.getElementById('processList');
    const calculateBtn = document.getElementById('calculateSchedulingBtn');
    
    if (!processListDiv) {
        console.error('Process list container not found');
        return;
    }
    
    if (!calculateBtn) {
        console.error('Calculate button not found');
        return;
    }
    
    const algorithm = document.getElementById('schedulingAlgorithm');
    if (!algorithm) {
        console.error('Algorithm selector not found');
        return;
    }
    
    const showPriority = algorithm.value === 'priority';
    
    if (processes.length === 0) {
        processListDiv.innerHTML = '<p style="font-family: \'Press Start 2P\', cursive; font-size: 9px; color: var(--text-white); padding: 20px; text-align: center;">No processes added yet.</p>';
        calculateBtn.disabled = true;
        return;
    }
    
    calculateBtn.disabled = false;
    
    processListDiv.innerHTML = `
        <h3 style="font-family: 'Press Start 2P', cursive; color: var(--mario-yellow); margin-bottom: 15px; text-shadow: 2px 2px 0 var(--border-black);">Process List (${processes.length} process${processes.length > 1 ? 'es' : ''})</h3>
        <div class="table-container">
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
                            <td><strong>P${process.id}</strong></td>
                            <td>${process.arrivalTime}</td>
                            <td>${process.burstTime}</td>
                            ${showPriority ? `<td>${process.priority}</td>` : ''}
                            <td><button class="btn-secondary" onclick="removeProcess(${index})" style="padding: 8px 16px; font-size: 8px;">Remove</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <button class="btn-secondary" onclick="clearProcessList()" style="margin-top: 15px; padding: 10px 20px;">Clear All</button>
    `;
}

/**
 * Remove process
 */
function removeProcess(index) {
    if (index >= 0 && index < processes.length) {
        processes.splice(index, 1);
        displayProcessList();
        
        // Clear results when process list changes
        const resultsDiv = document.getElementById('schedulingResults');
        if (resultsDiv) resultsDiv.innerHTML = '';
        
        // Hide export section
        const exportSection = document.getElementById('schedulingExport');
        if (exportSection) exportSection.style.display = 'none';
    }
}

/**
 * Clear process list
 */
function clearProcessList() {
    if (processes.length > 0 && confirm('This will reset all added processes. Are you sure?')) {
        processes = [];
        displayProcessList();
        
        // Clear results if any
        const resultsDiv = document.getElementById('schedulingResults');
        if (resultsDiv) resultsDiv.innerHTML = '';
        
        // Hide export section
        const exportSection = document.getElementById('schedulingExport');
        if (exportSection) exportSection.style.display = 'none';
        
        // Clear any errors
        const errorDiv = document.querySelector('#scheduling-section .error-message');
        if (errorDiv) errorDiv.style.display = 'none';
        
        const calcErrorDiv = document.getElementById('calculate-error-message');
        if (calcErrorDiv) calcErrorDiv.style.display = 'none';
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
    const timeQuantumInput = document.getElementById('timeQuantum');
    if (!timeQuantumInput) {
        showCalculateError('Time quantum input not found. Please refresh the page.');
        return null;
    }
    
    const timeQuantum = parseInt(timeQuantumInput.value);
    if (isNaN(timeQuantum) || timeQuantum < 1) {
        showCalculateError('Please enter a valid time quantum (>= 1)');
        return null;
    }
    
    if (timeQuantum > 100) {
        showCalculateError('Time quantum cannot exceed 100. Please use a smaller value.');
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
 * Calculate scheduling analysis metrics
 */
function calculateSchedulingAnalysis(result) {
    // Safety checks
    if (!result || !result.results || result.results.length === 0) {
        return {
            totalProcesses: 0,
            totalExecutionTime: 0,
            totalBurstTime: 0,
            avgWaitingTime: 0,
            avgTurnaroundTime: 0,
            maxWaitingTime: 0,
            minWaitingTime: 0,
            maxTurnaroundTime: 0,
            minTurnaroundTime: 0,
            cpuUtilization: '0.00',
            throughput: '0.000',
            recommendations: ['No data available for analysis.']
        };
    }
    
    const analysis = {
        totalProcesses: result.results.length,
        totalExecutionTime: Math.max(...result.results.map(r => r.completionTime)),
        totalBurstTime: result.results.reduce((sum, r) => sum + r.burstTime, 0),
        avgWaitingTime: parseFloat(result.avgWaitingTime) || 0,
        avgTurnaroundTime: parseFloat(result.avgTurnaroundTime) || 0,
        maxWaitingTime: Math.max(...result.results.map(r => r.waitingTime)),
        minWaitingTime: Math.min(...result.results.map(r => r.waitingTime)),
        maxTurnaroundTime: Math.max(...result.results.map(r => r.turnaroundTime)),
        minTurnaroundTime: Math.min(...result.results.map(r => r.turnaroundTime)),
        cpuUtilization: 0,
        throughput: 0,
        recommendations: []
    };
    
    // Calculate CPU utilization (avoid division by zero)
    analysis.cpuUtilization = analysis.totalExecutionTime > 0 
        ? ((analysis.totalBurstTime / analysis.totalExecutionTime) * 100).toFixed(2)
        : '0.00';
    
    // Calculate throughput (processes per unit time)
    analysis.throughput = analysis.totalExecutionTime > 0
        ? (analysis.totalProcesses / analysis.totalExecutionTime).toFixed(3)
        : '0.000';
    
    // Generate recommendations
    if (analysis.avgWaitingTime < 5) {
        analysis.recommendations.push('Excellent average waiting time. The algorithm is performing well for this workload.');
    } else if (analysis.avgWaitingTime < 10) {
        analysis.recommendations.push('Good average waiting time. Consider optimizing process order or using a different algorithm.');
    } else {
        analysis.recommendations.push('High average waiting time. Consider using SJF or Priority scheduling for better performance.');
    }
    
    if (parseFloat(analysis.cpuUtilization) < 70) {
        analysis.recommendations.push('Low CPU utilization. There may be idle time - consider process optimization.');
    } else if (parseFloat(analysis.cpuUtilization) > 95) {
        analysis.recommendations.push('High CPU utilization. System is efficiently using CPU resources.');
    }
    
    const waitingTimeVariance = result.results.reduce((sum, r) => {
        const diff = r.waitingTime - analysis.avgWaitingTime;
        return sum + (diff * diff);
    }, 0) / analysis.totalProcesses;
    
    if (waitingTimeVariance > 50) {
        analysis.recommendations.push('High variance in waiting times. Some processes wait significantly longer than others.');
    }
    
    // Algorithm-specific insights
    const algorithmLower = result.algorithm.toLowerCase();
    if (algorithmLower.includes('fcfs')) {
        analysis.recommendations.push('FCFS is simple but may cause convoy effect (long processes delay short ones).');
    } else if (algorithmLower.includes('sjf')) {
        analysis.recommendations.push('SJF minimizes average waiting time but may cause starvation of long processes.');
    } else if (algorithmLower.includes('priority')) {
        analysis.recommendations.push('Priority scheduling ensures important processes run first but may cause starvation.');
    } else if (algorithmLower.includes('round robin')) {
        analysis.recommendations.push('Round Robin provides fairness and prevents starvation, good for time-sharing systems.');
    }
    
    return analysis;
}

/**
 * Display scheduling results with analysis
 */
function displaySchedulingResults(result) {
    const resultsDiv = document.getElementById('schedulingResults');
    if (!resultsDiv) return;
    
    const showPriority = result.algorithm.toLowerCase().includes('priority');
    resultsDiv.innerHTML = '';
    
    const resultBox = document.createElement('div');
    resultBox.className = 'result-box success';
    
    // Safety checks
    if (!result.results || result.results.length === 0) {
        resultsDiv.innerHTML = '<div class="result-box error"><h3>Error</h3><p>No results to display.</p></div>';
        return;
    }
    
    // Calculate statistics
    const totalExecutionTime = Math.max(...result.results.map(r => r.completionTime));
    const totalBurstTime = result.results.reduce((sum, r) => sum + r.burstTime, 0);
    
    // Enhanced Gantt Chart
    let ganttHTML = '<h4>Gantt Chart:</h4><div class="gantt-chart">';
    if (result.ganttChart && result.ganttChart.length > 0) {
        result.ganttChart.forEach((item, index) => {
            const duration = item.end - item.start;
            const width = totalExecutionTime > 0 ? ((duration / totalExecutionTime) * 100) + '%' : '100px';
            const isLast = index === result.ganttChart.length - 1;
            ganttHTML += `
                <div class="gantt-bar" style="width: ${width}; min-width: ${Math.max(duration * 8, 60)}px;" title="Process ${item.process}: ${item.start}-${item.end}">
                    <span class="gantt-process">P${item.process}</span>
                    <span class="gantt-time">${item.start}-${item.end}</span>
                </div>
            `;
            if (!isLast && item.end < result.ganttChart[index + 1].start) {
                // Show idle time
                const idleDuration = result.ganttChart[index + 1].start - item.end;
                const idleWidth = totalExecutionTime > 0 ? ((idleDuration / totalExecutionTime) * 100) + '%' : '40px';
                ganttHTML += `<div class="gantt-idle" style="width: ${idleWidth}; min-width: ${Math.max(idleDuration * 8, 40)}px;">IDLE</div>`;
            }
        });
    } else {
        ganttHTML += '<p style="padding: 20px; text-align: center; color: var(--text-white);">No Gantt chart data available.</p>';
    }
    ganttHTML += '</div>';
    
    // Enhanced Results Table with color coding
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
                ${result.results.sort((a, b) => a.process - b.process).map(r => {
                    const maxWaiting = Math.max(...result.results.map(r => r.waitingTime));
                    const waitingClass = r.waitingTime === maxWaiting ? 'max-waiting' : '';
                    return `
                    <tr class="${waitingClass}">
                        <td><strong>P${r.process}</strong></td>
                        <td>${r.arrivalTime}</td>
                        <td>${r.burstTime}</td>
                        ${showPriority ? `<td>${r.priority}</td>` : ''}
                        <td>${r.startTime}</td>
                        <td>${r.completionTime}</td>
                        <td>${r.turnaroundTime}</td>
                        <td>${r.waitingTime}</td>
                    </tr>
                `;
                }).join('')}
            </tbody>
        </table>
        <div class="algorithm-stats">
            <p><strong>Average Waiting Time:</strong> ${result.avgWaitingTime}</p>
            <p><strong>Average Turnaround Time:</strong> ${result.avgTurnaroundTime}</p>
            <p><strong>Total Execution Time:</strong> ${totalExecutionTime}</p>
            <p><strong>CPU Utilization:</strong> ${((totalBurstTime / totalExecutionTime) * 100).toFixed(2)}%</p>
        </div>
    `;
    
    resultBox.innerHTML = `
        <h3>${result.algorithm} Scheduling Results</h3>
        ${ganttHTML}
        ${tableHTML}
    `;
    
    resultsDiv.appendChild(resultBox);
    
    // Add Analysis Section LAST
    const analysis = calculateSchedulingAnalysis(result);
    const analysisBox = document.createElement('div');
    analysisBox.className = 'result-box analysis-box';
    analysisBox.style.borderColor = 'var(--mario-blue)';
    analysisBox.style.boxShadow = '6px 6px 0 var(--mario-blue), inset -2px -2px 0 rgba(0, 0, 0, 0.3), inset 2px 2px 0 rgba(255, 255, 255, 0.1)';
    analysisBox.style.background = 'linear-gradient(180deg, rgba(33, 150, 243, 0.2) 0%, var(--bg-medium) 100%)';
    
    let analysisHTML = '<h3>📊 Performance Analysis</h3>';
    
    // Summary Metrics
    analysisHTML += '<h4>Summary Metrics:</h4>';
    analysisHTML += '<div class="analysis-metrics">';
    analysisHTML += `
        <div class="metric-item">
            <strong>Total Processes:</strong> <span>${analysis.totalProcesses}</span>
        </div>
        <div class="metric-item">
            <strong>Total Execution Time:</strong> <span>${analysis.totalExecutionTime} units</span>
        </div>
        <div class="metric-item">
            <strong>CPU Utilization:</strong> <span>${analysis.cpuUtilization}%</span>
        </div>
        <div class="metric-item">
            <strong>Throughput:</strong> <span>${analysis.throughput} processes/unit time</span>
        </div>
        <div class="metric-item">
            <strong>Average Waiting Time:</strong> <span>${analysis.avgWaitingTime.toFixed(2)}</span>
        </div>
        <div class="metric-item">
            <strong>Average Turnaround Time:</strong> <span>${analysis.avgTurnaroundTime.toFixed(2)}</span>
        </div>
        <div class="metric-item">
            <strong>Waiting Time Range:</strong> <span>${analysis.minWaitingTime} - ${analysis.maxWaitingTime}</span>
        </div>
        <div class="metric-item">
            <strong>Turnaround Time Range:</strong> <span>${analysis.minTurnaroundTime} - ${analysis.maxTurnaroundTime}</span>
        </div>
    `;
    analysisHTML += '</div>';
    
    // Performance Insights
    analysisHTML += '<h4>Performance Insights:</h4>';
    analysisHTML += '<ul class="analysis-list">';
    
    const algorithmLower = result.algorithm.toLowerCase();
    if (algorithmLower.includes('fcfs')) {
        analysisHTML += '<li><strong>FCFS:</strong> Simple and fair but may cause convoy effect. Processes execute in arrival order.</li>';
    } else if (algorithmLower.includes('sjf')) {
        analysisHTML += '<li><strong>SJF:</strong> Minimizes average waiting time by prioritizing short jobs. May cause starvation.</li>';
    } else if (algorithmLower.includes('priority')) {
        analysisHTML += '<li><strong>Priority:</strong> Ensures high-priority processes run first. Lower priority processes may wait longer.</li>';
    } else if (algorithmLower.includes('round robin')) {
        analysisHTML += '<li><strong>Round Robin:</strong> Provides fairness and prevents starvation. Good for interactive systems.</li>';
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
    
    // Show export section
    const exportSection = document.getElementById('schedulingExport');
    if (exportSection) {
        exportSection.style.display = 'flex';
    }
}

/**
 * Calculate scheduling
 */
function calculateScheduling() {
    const resultsDiv = document.getElementById('schedulingResults');
    if (!resultsDiv) {
        showCalculateError('Results container not found. Please refresh the page.');
        return;
    }
    
    resultsDiv.innerHTML = ''; // Clear previous results at the start

    if (processes.length === 0) {
        showCalculateError('Please add at least one process');
        const exportSection = document.getElementById('schedulingExport');
        if (exportSection) exportSection.style.display = 'none';
        return;
    }

    const algorithm = document.getElementById('schedulingAlgorithm');
    if (!algorithm) {
        showCalculateError('Algorithm selector not found. Please refresh the page.');
        return;
    }
    
    const algorithmValue = algorithm.value;
    let result;

    try {
        switch (algorithmValue) {
            case 'fcfs':
                result = fcfsScheduling();
                break;
            case 'sjf':
                result = sjfScheduling();
                break;
            case 'priority':
                // Validate all processes have priority
                const missingPriority = processes.find(p => p.priority === undefined || p.priority === null);
                if (missingPriority) {
                    showCalculateError('All processes must have a priority value for Priority scheduling.');
                    return;
                }
                result = priorityScheduling();
                break;
            case 'rr':
                result = roundRobinScheduling();
                break;
            default:
                showCalculateError('Invalid algorithm selected.');
                return;
        }
        
        if (result) {
            displaySchedulingResults(result);
        } else {
            // If result is null (which means an error occurred in the scheduling function),
            // we ensure the results area is cleared. The scheduling functions are responsible
            // for showing the actual error message.
            resultsDiv.innerHTML = '';
            const exportSection = document.getElementById('schedulingExport');
            if (exportSection) exportSection.style.display = 'none';
        }
    } catch (error) {
        showCalculateError('An error occurred during calculation: ' + error.message);
        console.error('Scheduling error:', error);
        resultsDiv.innerHTML = '';
        const exportSection = document.getElementById('schedulingExport');
        if (exportSection) exportSection.style.display = 'none';
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

// Sample Data Functions for Scheduling
function loadSchedulingSample(sampleNum) {
    // Clear existing processes
    processes = [];
    
    if (sampleNum === 1) {
        // Basic Example
        processes = [
            {id: 0, arrivalTime: 0, burstTime: 5, priority: 2},
            {id: 1, arrivalTime: 1, burstTime: 3, priority: 1},
            {id: 2, arrivalTime: 2, burstTime: 8, priority: 3}
        ];
    } else if (sampleNum === 2) {
        // Multiple Processes
        processes = [
            {id: 0, arrivalTime: 0, burstTime: 4, priority: 2},
            {id: 1, arrivalTime: 1, burstTime: 3, priority: 3},
            {id: 2, arrivalTime: 2, burstTime: 1, priority: 1},
            {id: 3, arrivalTime: 3, burstTime: 5, priority: 4},
            {id: 4, arrivalTime: 4, burstTime: 2, priority: 2}
        ];
    } else if (sampleNum === 3) {
        // Complex Case
        processes = [
            {id: 0, arrivalTime: 0, burstTime: 8, priority: 3},
            {id: 1, arrivalTime: 1, burstTime: 4, priority: 2},
            {id: 2, arrivalTime: 2, burstTime: 9, priority: 1},
            {id: 3, arrivalTime: 3, burstTime: 5, priority: 4},
            {id: 4, arrivalTime: 4, burstTime: 3, priority: 2}
        ];
    }
    
    displayProcessList();
}

// Export Functions for Scheduling
function exportSchedulingResults() {
    const resultsDiv = document.getElementById('schedulingResults');
    if (!resultsDiv || resultsDiv.innerHTML.trim() === '') {
        alert('No results to export. Please calculate first.');
        return;
    }
    
    const algorithm = document.getElementById('schedulingAlgorithm').value;
    const algorithmNames = {
        'fcfs': 'First-Come, First-Served (FCFS)',
        'sjf': 'Shortest Job First (SJF)',
        'priority': 'Priority Scheduling',
        'rr': 'Round Robin'
    };
    
    let exportText = '========================================\n';
    exportText += 'SCHEDULING ALGORITHM RESULTS\n';
    exportText += `Algorithm: ${algorithmNames[algorithm]}\n`;
    exportText += '========================================\n\n';
    
    exportText += 'Process Details:\n';
    processes.forEach(p => {
        exportText += `Process ${p.id}: Arrival=${p.arrivalTime}, Burst=${p.burstTime}`;
        if (algorithm === 'priority') {
            exportText += `, Priority=${p.priority}`;
        }
        exportText += '\n';
    });
    exportText += '\n';
    
    if (algorithm === 'rr') {
        const timeQuantum = document.getElementById('timeQuantum').value;
        exportText += `Time Quantum: ${timeQuantum}\n\n`;
    }
    
    exportText += resultsDiv.innerText;
    exportText += '\n\n========================================\n';
    exportText += 'Generated by OS Simulator\n';
    exportText += `Date: ${new Date().toLocaleString()}\n`;
    exportText += '========================================\n';
    
    downloadAsFile('scheduling-results.txt', exportText);
    
    const exportSection = document.getElementById('schedulingExport');
    if (exportSection) {
        exportSection.style.display = 'flex';
    }
}

function copySchedulingResults() {
    const resultsDiv = document.getElementById('schedulingResults');
    if (!resultsDiv || resultsDiv.innerHTML.trim() === '') {
        alert('No results to copy. Please calculate first.');
        return;
    }
    
    copyToClipboard(resultsDiv.innerText);
}

// Make functions global
window.loadSchedulingSample = loadSchedulingSample;
window.exportSchedulingResults = exportSchedulingResults;
window.copySchedulingResults = copySchedulingResults;

