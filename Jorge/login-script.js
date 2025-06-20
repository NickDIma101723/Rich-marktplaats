// Login Page JavaScript
let currentLanguage = 'EN';

// Translations
const translations = {
    EN: {
        loginSuccess: "Successfully logged in!",
        signupSuccess: "Account created successfully!",
        passwordMismatch: "Passwords do not match!",
        passwordTooShort: "Password must be at least 6 characters long.",
        fillAllFields: "Please fill in all fields.",
        emailInvalid: "Please enter a valid email address.",
        termsRequired: "Please accept the terms and conditions."
    },
    NL: {
        loginSuccess: "Succesvol ingelogd!",
        signupSuccess: "Account succesvol aangemaakt!",
        passwordMismatch: "Wachtwoorden komen niet overeen!",
        passwordTooShort: "Wachtwoord moet minimaal 6 tekens lang zijn.",
        fillAllFields: "Vul alle velden in.",
        emailInvalid: "Voer een geldig e-mailadres in.",
        termsRequired: "Accepteer de algemene voorwaarden."
    }
};

// Form switching functionality
function showLoginForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm && signupForm) {
        signupForm.classList.remove('active');
        setTimeout(() => {
            loginForm.classList.add('active');
        }, 300);
    }
}

function showSignupForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm && signupForm) {
        loginForm.classList.remove('active');
        setTimeout(() => {
            signupForm.classList.add('active');
        }, 300);
    }
}

// Notification system
function showNotification(type, message) {
    const notification = document.getElementById('notification');
    
    // Remove existing classes
    notification.classList.remove('success', 'error', 'visible');
    
    // Add new classes
    notification.classList.add(type);
    notification.textContent = message;
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('visible');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
    }, 4000);
}

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData, isSignup = false) {
    const { name, email, password, confirmPassword, terms } = formData;
    
    // Check if all required fields are filled
    if (!email || !password) {
        return { isValid: false, message: translations[currentLanguage].fillAllFields };
    }
    
    if (isSignup && (!name || !confirmPassword)) {
        return { isValid: false, message: translations[currentLanguage].fillAllFields };
    }
    
    // Validate email format
    if (!validateEmail(email)) {
        return { isValid: false, message: translations[currentLanguage].emailInvalid };
    }
    
    // Validate password length
    if (password.length < 6) {
        return { isValid: false, message: translations[currentLanguage].passwordTooShort };
    }
    
    // For signup, check password match and terms
    if (isSignup) {
        if (password !== confirmPassword) {
            return { isValid: false, message: translations[currentLanguage].passwordMismatch };
        }
        
        if (!terms) {
            return { isValid: false, message: translations[currentLanguage].termsRequired };
        }
    }
    
    return { isValid: true };
}

// Handle login
function handleLogin(formData) {
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
        showNotification('error', validation.message);
        return false;
    }
    
    // Add loading state
    const submitBtn = document.querySelector('#login-submit-form button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'SIGNING IN...';
    
    // Simulate API call
    setTimeout(() => {
        // Store user session
        const userData = {
            email: formData.email,
            name: formData.email.split('@')[0],
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('userSession', JSON.stringify(userData));
        
        // Show success and redirect
        showNotification('success', translations[currentLanguage].loginSuccess);
        
        setTimeout(() => {
            window.location.href = '../Niko/index.html';
        }, 1500);
        
    }, 2000);
    
    return true;
}

// Handle signup
function handleSignup(formData) {
    const validation = validateForm(formData, true);
    
    if (!validation.isValid) {
        showNotification('error', validation.message);
        return false;
    }
    
    // Add loading state
    const submitBtn = document.querySelector('#signup-submit-form button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'CREATING ACCOUNT...';
    
    // Simulate API call
    setTimeout(() => {
        // Store user session
        const userData = {
            email: formData.email,
            name: formData.name,
            signupTime: new Date().toISOString()
        };
        
        localStorage.setItem('userSession', JSON.stringify(userData));
        
        // Show success and redirect
        showNotification('success', translations[currentLanguage].signupSuccess);
        
        setTimeout(() => {
            window.location.href = '../Niko/index.html';
        }, 1500);
        
    }, 2000);
    
    return true;
}

// Input animation and validation feedback
function setupInputValidation() {
    const inputs = document.querySelectorAll('.luxury-input');
    
    inputs.forEach(input => {
        // Real-time validation feedback
        input.addEventListener('blur', function() {
            const value = this.value.trim();
            
            // Remove previous states
            this.classList.remove('error', 'success');
            
            if (value) {
                if (this.type === 'email') {
                    if (validateEmail(value)) {
                        this.classList.add('success');
                    } else {
                        this.classList.add('error');
                    }
                } else if (this.type === 'password') {
                    if (value.length >= 6) {
                        this.classList.add('success');
                    } else {
                        this.classList.add('error');
                    }
                } else {
                    this.classList.add('success');
                }
            }
        });
        
        // Remove error state on focus
        input.addEventListener('focus', function() {
            this.classList.remove('error');
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Setup input validation
    setupInputValidation();
    
    // Form switching event listeners
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    
    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupForm();
        });
    }
    
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('login-submit-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                email: document.getElementById('login-email').value.trim(),
                password: document.getElementById('login-password').value
            };
            
            handleLogin(formData);
        });
    }
    
    // Signup form submission
    const signupForm = document.getElementById('signup-submit-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('signup-name').value.trim(),
                email: document.getElementById('signup-email').value.trim(),
                password: document.getElementById('signup-password').value,
                confirmPassword: document.getElementById('signup-confirm-password').value,
                terms: document.querySelector('#signup-submit-form input[type="checkbox"]').checked
            };
            
            handleSignup(formData);
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + L for login form
        if (e.altKey && e.key === 'l') {
            e.preventDefault();
            showLoginForm();
        }
        
        // Alt + S for signup form
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            showSignupForm();
        }
    });
    
    // Check if user is already logged in
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
        // Redirect to main page if already logged in
        window.location.href = '../Niko/index.html';
    }
    
    // Video error handling
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('error', function() {
            // If video fails to load, show a fallback background
            this.style.display = 'none';
            this.parentElement.style.backgroundImage = 'url("../Niko/images/Bugatti.jpeg")';
            this.parentElement.style.backgroundSize = 'cover';
            this.parentElement.style.backgroundPosition = 'center';
        });
    }
    
    // Smooth animations on page load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page unload (cleanup)
window.addEventListener('beforeunload', function() {
    // Remove any loading states
    const loadingBtns = document.querySelectorAll('.loading');
    loadingBtns.forEach(btn => {
        btn.classList.remove('loading');
    });
});
