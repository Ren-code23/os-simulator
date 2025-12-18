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
    const loginButton = document.querySelector('.btn-primary');
    
    // Hide previous errors
    errorMessage.classList.remove('show');
    
    // Input validation
    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }
    
    // Show loading state
    loginButton.disabled = true;
    loginButton.classList.add('loading');
    const originalText = loginButton.textContent;
    loginButton.textContent = 'Logging in';
    
    // Simulate brief loading (for better UX)
    setTimeout(() => {
        // Check credentials
        if (VALID_CREDENTIALS[username] && VALID_CREDENTIALS[username] === password) {
            // Store session
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);

            // Remember-me: store username locally if checked
            const rememberMeCheckbox = document.getElementById('rememberMe');
            if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedUsername', username);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberedUsername');
                localStorage.removeItem('rememberMe');
            }
            
            // Success feedback
            loginButton.textContent = 'Success!';
            loginButton.style.background = 'linear-gradient(180deg, #5CAB3A 0%, #2e7d32 100%)';
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        } else {
            // Reset button
            loginButton.disabled = false;
            loginButton.classList.remove('loading');
            loginButton.textContent = originalText;
            showError('Invalid username or password');
        }
    }, 300);
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

    // Setup show/hide password toggle
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    if (passwordInput && togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            togglePasswordBtn.textContent = isHidden ? 'HIDE' : 'SHOW';
        });
    }

    // Prefill remembered username
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberMeFlag = localStorage.getItem('rememberMe') === 'true';
    const usernameInput = document.getElementById('username');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    if (usernameInput && rememberedUsername && rememberMeFlag) {
        usernameInput.value = rememberedUsername;
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
    }
    
    // Setup logout button if it exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

