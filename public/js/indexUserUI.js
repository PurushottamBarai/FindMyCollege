function safeGetItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

function isUserLoggedIn() {
    return safeGetItem('userRole') === 'user' &&
           safeGetItem('isLoggedIn') === 'true';
}

function initIndexUserUI() {
    const loginLink = document.getElementById('loginNavLink');
    const registerLink = document.getElementById('registerNavLink');
    const profileWrapper = document.getElementById('userProfileWrapper');
    const profileIcon = document.getElementById('userProfileIcon');

    if (!loginLink || !profileWrapper || !profileIcon) return;

    if (isUserLoggedIn()) {
        loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        profileWrapper.style.display = 'flex';

        const email = safeGetItem('userEmail') || '';
        const first = email.trim().charAt(0).toUpperCase();
        profileIcon.textContent = first || 'U';
    } else {
        loginLink.style.display = 'inline-flex';
        if (registerLink) registerLink.style.display = 'inline-flex';
        profileWrapper.style.display = 'none';
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userProfileDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

document.addEventListener('click', (event) => {
    const wrapper = document.getElementById('userProfileWrapper');
    const dropdown = document.getElementById('userProfileDropdown');
    if (!wrapper || !dropdown) return;

    if (!wrapper.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

function viewUserProfile() {
    const email = safeGetItem('userEmail') || 'Unknown';
    alert(`Profile\nEmail: ${email}`);
}

function userLogout() {
    if (confirm('Are you sure you want to logout?')) {
        try {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
        } catch (e) {}
        window.location.replace('/login.html');
    }
}

// Global mobile menu toggle
window.toggleMobileMenu = function(e) {
    if (e) e.stopPropagation();
    const btn = document.getElementById('hamburgerMenuBtn');
    const links = document.querySelector('.nav-links');
    if (btn && links) {
        btn.classList.toggle('open');
        links.classList.toggle('show');
    }
};

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const btn = document.getElementById('hamburgerMenuBtn');
    const links = document.querySelector('.nav-links');
    if (btn && links && !links.contains(e.target) && !btn.contains(e.target)) {
        btn.classList.remove('open');
        links.classList.remove('show');
    }
});

function runInitializers() {
    initIndexUserUI();
}

if (document.readyState !== 'loading') {
    runInitializers();
} else {
    document.addEventListener('DOMContentLoaded', runInitializers);
}

window.addEventListener('pageshow', runInitializers);