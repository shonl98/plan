
 //const TRIAL_PRODUCT_TO_SIMULATE = 'combined';
//  const TRIAL_PRODUCT_TO_SIMULATE = 'shift_organize';
 // const TRIAL_PRODUCT_TO_SIMULATE = 'attendance';
// main.js - NEW ARCHITECTURE

import * as page0Welcome from './pages/page0-welcome.js';
import * as page1Plans from './pages/page1-plans.js';
import * as page2Payment from './pages/page2-payment.js';
import * as page3Success from './pages/page3-success.js';
// Function to safely get parameters from the URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        // Use 'clientId' from URL. In a real app, this should be required.
        clientId: params.get('clientId') || 'CLIENT_MOCK_001', 
        
        // Use 'employees' from URL, parse it as a number, or default to 10
        employees: parseInt(params.get('employees'), 10) || 10,
        
        // Use 'product' from URL, or default to 'shift_organize'
        product: params.get('product') || 'shift_organize'
    };
}

const urlData = getUrlParams();

// The app state now uses the data from the URL with 'clientId'
const appState = {
    currentStep: 0,
    maxCompletedStep: 0,
    userTrialProduct: urlData.product,
    selectedPlan: null,
    activeEmployees: urlData.employees,
    clientId: urlData.clientId, // Storing the client ID for later use

};

// --- No changes below this line, but included for completeness ---

const pages = {
    0: page0Welcome,
    1: page1Plans,
    2: page2Payment,
    3: page3Success,
};

const contentContainer = document.getElementById('app-content');
const langSwitcherContainer = document.getElementById('lang-switcher-container');

async function navigateToStep(stepNumber) {
    if (!pages[stepNumber] || stepNumber < 0) return; // Prevent invalid navigation

    // This logic allows going back but not skipping forward
    if (stepNumber > appState.maxCompletedStep + 1 && stepNumber > appState.currentStep) return;

    appState.currentStep = stepNumber;
    appState.maxCompletedStep = Math.max(appState.maxCompletedStep, stepNumber);
    const page = pages[stepNumber];
    
    const lang = localStorage.getItem('language') || 'he';
    const langData = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = langData.direction || 'ltr';

    contentContainer.classList.add('fade-out');
    await new Promise(resolve => setTimeout(resolve, 300));

    contentContainer.innerHTML = page.getHtml(appState, langData);

    // Pass the back function to the init method
    page.init(appState, { next: goToNextStep, back: goToPrevStep });
    
    contentContainer.classList.remove('fade-out');
}

const goToNextStep = () => {
    const nextStep = appState.currentStep + 1;
    if (pages[nextStep]) {
        navigateToStep(nextStep);
    } else {
        alert('Flow finished. Thank you!');
    }
};

const goToPrevStep = () => {
    const prevStep = appState.currentStep - 1;
    if (pages[prevStep]) {
        navigateToStep(prevStep);
    }
};

function initializeLanguageSwitcher() {
    langSwitcherContainer.innerHTML = `<select class="lang-select"><option value="he">עברית</option><option value="en">English</option></select>`;
    const selector = langSwitcherContainer.querySelector('select');
    selector.value = localStorage.getItem('language') || 'he';
    selector.addEventListener('change', (e) => {
        localStorage.setItem('language', e.target.value);
        navigateToStep(appState.currentStep);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Log the initial state to the console for easy debugging
    console.log("App state initialized from URL:", appState);
    
    initializeLanguageSwitcher();
    navigateToStep(0);
});