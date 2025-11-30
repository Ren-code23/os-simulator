/**
 * Authentication Module
 * Handles login, logout, and session management
 */

// Simple user credentials (in production, use proper authentication)
const VALID_CREDENTIALS = {
    'admin': 'admin123',
    'user': 'user123',
    'test': 'test123'
};

/**
 * Check if user is logged in
 */
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    // If on dashboard and not logged in, redirect to login
    if (currentPage === 'dashboard.html' && !isLoggedIn) {
        window.location.href = 'index.html';
    }
    
    // If on login page and already logged in, redirect to dashboard
    if (currentPage === 'index.html' && isLoggedIn) {
        window.location.href = 'dashboard.html';
    }
}

/**
 * Handle login form submission
 */
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Input validation
    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }
    
    // Check credentials
    if (VALID_CREDENTIALS[username] && VALID_CREDENTIALS[username] === password) {
        // Store session
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        showError('Invalid username or password');
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    window.location.href = 'index.html';
}

/**
 * Show error message
 */
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
}

// Initialize authentication when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Setup login form if it exists
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Setup logout button if it exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

