/**
 * Dashboard Module
 * Handles navigation and page switching
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    // Handle navigation clicks
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = document.getElementById(targetPage + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Show first section by default
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }
});
