// pages/page1-plans.js - NEW ARCHITECTURE & FIXES
function getHtml(appState, langData) {
  const trialProduct = appState.userTrialProduct;
  const trialPlanKey = 'advanced';
  const plansForProduct = plansData[trialProduct];
  const planKeys = Object.keys(plansForProduct);

  const cardsHtml = planKeys.map((key, index) => {
    const plan = plansForProduct[key];
    const isCurrent = key === trialPlanKey;

    return `
      <div 
        class="plan-card" 
        data-plan-key="${key}"
        style="--anim-delay: ${index * 100}ms;" 
      >
        ${isCurrent ? `<div class="current-plan-badge">${langData.your_current_plan || 'Your Plan'}</div>` : ''}
        <h2 class="plan-name">${langData['plan_' + key] || key}</h2>
        <div class="plan-price-wrapper">
          <span class="plan-price">${plan.price}</span>
          <span class="price-currency">₪</span>
        </div>
        <p class="price-note">${langData.price_per_employee || ''}</p>
        <p class="plan-description">${langData[plan.descriptionKey] || ''}</p>
      </div>
    `;
  }).join('');

  return `
    <div class="plans-container">
      <h1 class="page-title anim-fade-in-down">${langData.page_title || ''}</h1>
      
      <!-- NEW LINK ADDED HERE -->
      <p class="full-pricing-link anim-fade-in-down">
        ${langData.full_pricing_text || ''}
        <a href="/pricing-page" target="_blank">${langData.full_pricing_link_text || ''}</a>
      </p>

      <div class="plans-selection-cards anim-fade-in-up" id="plans-selection-cards">
        ${cardsHtml}
      </div>
      
      <div class="comparison-area anim-fade-in" id="comparison-area"></div>

      <div class="page-actions anim-fade-in-up">
        <button class="submit-btn" id="next-btn" disabled>${langData.button_next || 'Next'}</button>
      </div>
    </div>
  `;
}

function init(appState, navigation) {
  const cardsWrapper = document.getElementById('plans-selection-cards');
  const comparisonArea = document.getElementById('comparison-area');
  const nextButton = document.getElementById('next-btn');

  const trialProduct = appState.userTrialProduct;
  const trialPlanKey = 'advanced';
  const plansForProduct = plansData[trialProduct];

  if (!plansForProduct) {
    console.error(`FATAL: No plan data found for product: "${trialProduct}"`);
    return;
  }

  const renderComparison = (selectedKey) => {
    comparisonArea.innerHTML = ''; 
    comparisonArea.classList.remove('warning', 'upgrade');

    const lang = localStorage.getItem('language') || 'he';
    const langData = translations[lang];

    const trialPlanFeatures = new Set(plansForProduct[trialPlanKey].features);
    const selectedPlanFeatures = new Set(plansForProduct[selectedKey].features);
    
    let titleKey, featuresToShow, listClass;
    const planLevels = { basic: 0, advanced: 1, premium: 2 };

    if (planLevels[selectedKey] === planLevels[trialPlanKey]) {
      titleKey = 'compare_title_current';
      featuresToShow = [...trialPlanFeatures];
      listClass = 'neutral';
    } else if (planLevels[selectedKey] > planLevels[trialPlanKey]) {
      titleKey = 'compare_title_upgrade';
      featuresToShow = [...selectedPlanFeatures].filter(f => !trialPlanFeatures.has(f));
      listClass = 'gain';
      comparisonArea.classList.add('upgrade');
    } else { // Downgrade
      titleKey = 'compare_title_downgrade';
      featuresToShow = [...trialPlanFeatures].filter(f => !selectedPlanFeatures.has(f));
      listClass = 'loss';
      comparisonArea.classList.add('warning'); 
    }

    const checkmark = '✓';
    const cross = '×';

    const featuresHtml = featuresToShow.map((key, index) => `
      <li class="feature-diff-item ${listClass}" style="--anim-delay: ${index * 50}ms;">
        <span class="feature-icon">${listClass === 'loss' ? cross : checkmark}</span>
        <span>${langData[key] || key}</span>
      </li>
    `).join('');

    comparisonArea.innerHTML = `
      <h3 class="comparison-title">${langData[titleKey] || 'Features'}</h3>
      <ul class="features-grid-2-col">${featuresHtml}</ul>
    `;
  };

  cardsWrapper.addEventListener('click', (e) => {
    const card = e.target.closest('.plan-card');
    if (!card) return;
    const planKey = card.dataset.planKey;

    appState.selectedPlan = { product: trialProduct, plan: planKey, price: plansForProduct[planKey].price };
    
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    renderComparison(planKey);
    nextButton.disabled = false;
  });

  nextButton.addEventListener('click', () => {
      // Add loading state to button
      nextButton.disabled = true;
      const originalText = nextButton.innerHTML;
      nextButton.innerHTML = `<span>...</span>`; // Simple spinner
      
      api.submitPlanSelection(appState.selectedPlan).then(response => {
        if(response.success) {
            console.log('Submission successful:', response.data);
            navigation.next();
        } else {
            alert('There was an error saving your plan. Please try again.');
            nextButton.disabled = false;
            nextButton.innerHTML = originalText;
        }
      });
  });
  
  const initialCard = cardsWrapper.querySelector(`[data-plan-key="${trialPlanKey}"]`);
  if (initialCard) {
    setTimeout(() => {
      initialCard.click();
    }, 400); 
  }
}

export { getHtml, init };