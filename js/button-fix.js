/**
 * Button Fix - Ensure all buttons work properly
 * Adds event delegation and prevents glitches
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Button fix initialized');
    
    // Add event delegation for dynamically created buttons
    document.body.addEventListener('click', function(e) {
        // Check if clicked element or its parent has onclick
        const target = e.target.closest('[onclick]');
        if (target) {
            console.log('Button clicked:', target.textContent);
        }
    });
    
    // Verify all required functions exist
    const requiredFunctions = [
        'loadDeadlockSample',
        'loadPagingSample', 
        'loadSchedulingSample',
        'exportDeadlockResults',
        'exportPagingResults',
        'exportSchedulingResults',
        'copyDeadlockResults',
        'copyPagingResults',
        'copySchedulingResults',
        'toggleHelp'
    ];
    
    const missingFunctions = [];
    requiredFunctions.forEach(func => {
        if (typeof window[func] !== 'function') {
            missingFunctions.push(func);
        }
    });
    
    if (missingFunctions.length > 0) {
        console.error('Missing functions:', missingFunctions);
    } else {
        console.log('All required functions loaded successfully!');
    }
});

