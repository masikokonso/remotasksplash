// ================== STATE MANAGEMENT ==================
const state = {
    termsAccepted: true
};

// ================== INITIALIZATION ==================
document.addEventListener('DOMContentLoaded', () => {
    updateSignUpButton();
});

// ================== TERMS & CONDITIONS ==================
function handleTermsChange() {
    const checkbox = document.getElementById('termsCheckbox');
    state.termsAccepted = checkbox.checked;

    updateSignUpButton();

    if (checkbox.checked) {
        showToast('✓ Terms accepted');
    }
}

function updateSignUpButton() {
    const signUpBtn = document.getElementById('signUpBtn');

    if (state.termsAccepted) {
        signUpBtn.disabled = false;
        signUpBtn.style.opacity = '1';
    } else {
        signUpBtn.disabled = true;
        signUpBtn.style.opacity = '0.4';
    }
}

// ================== NAVIGATION HANDLERS ==================
function handleSignUp() {
    if (!state.termsAccepted) {
        return;
    }

    showLoading();

    setTimeout(() => {
        hideLoading();
        checkTestData();
        showToast('Redirecting to Sign Up...');
        setTimeout(() => {
            window.location.href = 'signup.html';
        }, 1000);
    }, 1000);
}

function handleSignIn() {
    showLoading();

    setTimeout(() => {
        hideLoading();
        checkTestData();
        showToast('Redirecting to Sign In...');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }, 1000);
}

function showPrivacyInfo() {
    // Privacy page handler — implement when ready
}

// ================== TEST DATA HANDLING ==================
function checkTestData() {
    try {
        const tillfetch = localStorage.getItem('tillfetch');
        if (tillfetch) {
            const data = JSON.parse(tillfetch);
            const liveornot = data[6];

            if (liveornot === 'tomo') {
                localStorage.setItem('activated', JSON.stringify(['active']));
                localStorage.setItem('tomo', JSON.stringify(['tomo']));
                console.log('Test mode activated');
            }
        }
    } catch (error) {
        console.error('Error checking test data:', error);
    }
}

// ================== LOADING OVERLAY ==================
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

// ================== TOAST NOTIFICATION ==================
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(30, 41, 59, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        animation: slideUp 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    toast.textContent = message;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideDown {
            from { opacity: 1; transform: translateX(-50%) translateY(0); }
            to   { opacity: 0; transform: translateX(-50%) translateY(20px); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 300);
    }, 2000);
}

// ================== UTILITY FUNCTIONS ==================
function setTestMode() {
    const sampleData = [
        'value0', 'value1', '2.40', '4.50', '6.50',
        'value5',
        'tomo',  // Index 6 — test mode flag
        '5.00'   // Index 7 — minimum withdraw
    ];
    localStorage.setItem('tillfetch', JSON.stringify(sampleData));
    console.log('Test mode enabled');
}

function clearTestMode() {
    localStorage.removeItem('tillfetch');
    localStorage.removeItem('activated');
    localStorage.removeItem('tomo');
    console.log('Test mode cleared');
}

function hasAcceptedTerms() {
    return state.termsAccepted;
}

window.welcomeUtils = {
    setTestMode,
    clearTestMode,
    hasAcceptedTerms,
    showToast
};
