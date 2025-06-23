// pages/page3-success.js

function getHtml(appState, langData) {
  // You might want to add success-specific translations to lang.js
  const successTitle = langData.success_title || "Subscription Activated!";
  const successSubtitle = langData.success_subtitle || "You now have full access to your new plan. You will be redirected shortly.";
  const redirectToAppButton = langData.success_cta || "Go to My Dashboard";

return `
    <div class="success-container">
      <div class="lottie-wrapper">
        <lottie-player 
          src="img/confetti.json"
          background="transparent" 
          speed="1" 
          style="width: 100%; height: 100%;" 
          autoplay>
        </lottie-player>
      </div>
      <h1 class="success-title">${successTitle}</h1>
      <p class="success-subtitle">${successSubtitle}</p>
      <div class="page-actions">
          <button class="submit-btn" id="redirect-btn">${redirectToAppButton}</button>
      </div>
    </div>
  `;
}

function init(appState, navigation) {
  const container = document.querySelector('.success-container');
  const redirectButton = document.getElementById('redirect-btn');

  // Fade-in animation for the page
  container.style.opacity = 0;
  container.style.transform = 'translateY(20px)';
  setTimeout(() => {
      container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      container.style.opacity = 1;
      container.style.transform = 'translateY(0)';
  }, 100);

  // Function to handle redirection
  const redirectToDashboard = () => {
    // In a real application, this would be the actual URL to the user's dashboard
    const dashboardUrl = `https://app.eztime.com/dashboard?clientId=${appState.clientId}`;
    console.log(`Redirecting to: ${dashboardUrl}`);
    alert(`Redirecting to: ${dashboardUrl}`); 
    // Uncomment the line below in a real environment
    // window.location.href = dashboardUrl;
  };
  
  redirectButton.addEventListener('click', redirectToDashboard);

  // Optional: Automatically redirect after a few seconds
  setTimeout(redirectToDashboard, 5000); // Redirect after 5 seconds
}

export { getHtml, init };