// pages/page2-payment.js - FINAL STABLE VERSION
function getHtml(appState, langData) {
  const { plan, product, price } = appState.selectedPlan;
  const { activeEmployees } = appState;

  const productName = langData[`product_${product}`] || product;
  const planName = langData[`plan_${plan}`] || plan;

  // Create the text for the summary using variables
  const summaryText = (langData.summary_text || 
    `You've selected the <strong>{planName} - {productName}</strong> package. Your monthly fee is calculated based on the number of active employees at a rate of <strong>₪{price}</strong> per employee.`
  )
  .replace('{planName}', planName)
  .replace('{productName}', productName)
  .replace('{price}', price);


  return `
    <div class="payment-container revised-layout">
      <h1 class="page-title">${langData.payment_page_title}</h1>
      
      <button type="button" id="back-arrow-btn" class="back-arrow-btn" title="${langData.back_button_title}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </button>

      <div class="payment-grid-wrapper">
        <div class="payment-grid">
          
          <!-- === NEW SIMPLE SUMMARY SECTION === -->
          <div class="simple-summary">
              <h2 class="summary-title">${langData.summary_title}</h2>
              <p>${summaryText}</p>
              <p class="min-cost-note">${langData.min_cost_note}</p>
          </div>

          <div class="payment-form-container">
            <h2 class="payment-form-title">${langData.payment_form_title}</h2>
            <form id="payment-form" novalidate>
              <div class="form-group"><label for="card-holder-name">${langData.cardholder_name_label}</label><input type="text" id="card-holder-name" required placeholder="${langData.cardholder_name_placeholder || ''}"></div>
              <div class="form-group"><label for="card-number">${langData.card_number_label}</label><div class="card-input-wrapper"><input type="tel" id="card-number" required autocomplete="cc-number" placeholder="0000 0000 0000 0000" maxlength="19"><img id="card-logo" class="card-logo" src="img/card-generic.svg" alt="Card Logo"></div></div>
              <div class="form-row"><div class="form-group"><label for="expiry-date">${langData.expiry_label}</label><input type="tel" id="expiry-date" required autocomplete="cc-exp" placeholder="MM/YY" maxlength="5"></div><div class="form-group"><label for="cvv">${langData.cvv_label}</label><input type="tel" id="cvv" required autocomplete="cc-csc" placeholder="123" maxlength="4"></div></div>
            </form>
          </div>
        </div>
      </div>

      <div class="page-actions payment-actions">
          <button type="submit" form="payment-form" class="submit-btn" id="pay-btn">
              <span class="btn-text">${langData.pay_button}</span>
              <span class="spinner" style="display: none;"></span>
          </button>
      </div>

      <p class="legal-text">
        ${langData.legal_text_part_1}
        <a href="/terms-of-service" target="_blank">${langData.legal_text_link}</a>
        ${langData.legal_text_part_2}
      </p>

      <div class="faq-section">
         <h3 class="faq-title">${langData.faq_title}</h3>
         <div class="faq-item"><details><summary>${langData.faq_q1}</summary><div class="faq-content"><p>${langData.faq_a1}</p></div></details></div>
         <div class="faq-item"><details><summary>${langData.faq_q2}</summary><div class="faq-content"><p>${langData.faq_a2}</p></div></details></div>
         <div class="faq-item"><details><summary>${langData.faq_q3}</summary><div class="faq-content"><p>${langData.faq_a3}</p></div></details></div>
      </div>
    </div>
  `;
}

function init(appState, navigation) {
    const backArrowButton = document.getElementById('back-arrow-btn');
    backArrowButton.addEventListener('click', () => navigation.back());

    const form = document.getElementById('payment-form');
    const payButton = document.getElementById('pay-btn');
    const btnText = payButton.querySelector('.btn-text');
    const spinner = payButton.querySelector('.spinner');
    
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date'); // <-- Get expiry input
    const cardLogo = document.getElementById('card-logo');
    
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
        const cardType = detectCardType(value.replace(/\s/g, ''));
        cardLogo.src = `img/card-${cardType}.svg`;
    });

    // --- NEW: Expiry date auto-formatting ---
    expiryDateInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formValues = {
            cardHolder: document.getElementById('card-holder-name').value,
            cardNumber: document.getElementById('card-number').value.replace(/\s/g, ''),
            expiry: expiryDateInput.value,
            cvv: document.getElementById('cvv').value,
        };

        if (!formValues.cardHolder || !formValues.cardNumber || !formValues.expiry || !formValues.cvv) {
            alert('Please fill all payment fields.');
            return;
        }
        
        payButton.disabled = true;
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';
        
        api.submitPayment(formValues, appState).then(response => {
            if (response.success) {
                console.log("Payment successful!", response.data);
                // --- NEW: Navigate to success page ---
                navigation.next();
            } else {
                console.error("Payment failed:", response.error);
                alert(`Payment failed: ${response.error}`);
                payButton.disabled = false;
                btnText.style.display = 'inline-block';
                spinner.style.display = 'none';
            }
        });
    });
}

function detectCardType(number) {
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    return 'generic';
}

export { getHtml, init };