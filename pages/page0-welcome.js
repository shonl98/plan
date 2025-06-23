// pages/page0-welcome.js - NEW ARCHITECTURE

function getHtml(appState, langData) {
  const productKey = `product_${appState.userTrialProduct}`;
  return `
    <div class="welcome-container">
      <div class="lottie-wrapper">
        <lottie-player 
          src="img/shield-check-animation.json"
          background="transparent" 
          speed="1" 
          style="width: 100%; height: 100%;" 
          loop autoplay>
        </lottie-player>
      </div>
      <h1 class="welcome-title">${langData.welcome_v3_title || ''}</h1>
      <p class="welcome-subtitle">
        ${langData.welcome_v3_subtitle_1 || ''}
        <strong>${langData[productKey] || ''}</strong>
        ${langData.welcome_v3_subtitle_2 || ''}
      </p>
      <div class="page-actions">
          <button class="submit-btn" id="start-btn">${langData.welcome_v3_cta || ''}</button>
      </div>
    </div>
  `;
}

function init(appState, navigation) {
  const container = document.querySelector('.welcome-container');
  container.style.opacity = 0;
  container.style.transform = 'translateY(20px)';
  setTimeout(() => {
      container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      container.style.opacity = 1;
      container.style.transform = 'translateY(0)';
  }, 100);
  document.getElementById('start-btn').addEventListener('click', () => {
    navigation.next();
  });
}

export { getHtml, init };