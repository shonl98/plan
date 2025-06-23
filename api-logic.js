const api = {
    /**
     * @_DOC: Called from the Plan Selection page.
     * It sends the user's chosen product and plan.
     * @param {object} planData - { product: 'attendance', plan: 'advanced', price: 7 }
     * @returns {Promise<object>}
     */
    submitPlanSelection: async (planData) => {
        // ... (existing function) ...
        console.log("API: Submitting plan selection...", planData);
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        console.log("API: Plan selection saved successfully (mock).");
        return { success: true, data: { subscriptionId: 'sub_mock_12345' } };
    },

    /**
     * @_DOC: Called from the Payment page.
     * It assembles the final payload and sends it to create a subscription.
     * All business logic for the final submission should be here.
     * @param {object} formValues - Raw values from the payment form { cardHolder, cardNumber, expiry, cvv }
     * @param {object} appState - The entire application state.
     * @returns {Promise<object>}
     */
    submitPayment: async (formValues, appState) => {
        // --- 1. Assemble the final payload for the server ---
        const paymentDataForApi = {
            clientId: appState.clientId,
            employeeCount: appState.activeEmployees,
            subscriptionDetails: appState.selectedPlan,
            paymentMethod: { // In a real app, this would be a token from Stripe/etc.
                cardHolder: formValues.cardHolder,
                cardNumber: formValues.cardNumber, // This is sent only in mock. NEVER IN REAL APP.
                expiry: formValues.expiry,
                cvv: formValues.cvv
            }
        };

        // --- 2. Log the data for debugging (don't log full card details) ---
        console.log("API: Submitting final payment payload (mock)...", {
            clientId: paymentDataForApi.clientId,
            employeeCount: paymentDataForApi.employeeCount,
            subscription: paymentDataForApi.subscriptionDetails,
            cardHolder: paymentDataForApi.paymentMethod.cardHolder,
            cardNumber: '**** **** **** ' + paymentDataForApi.paymentMethod.cardNumber.slice(-4),
        });

        // --- 3. Simulate the API call ---
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network latency

        // Simulate a potential failure based on the card number
        if (paymentDataForApi.paymentMethod.cardNumber.endsWith('0000')) {
            console.error("API: Payment failed (mock).");
            return { success: false, error: 'Your card was declined.' };
        }
        
        console.log("API: Payment successful (mock).");
        return { 
            success: true, 
            data: { 
                transactionId: 'txn_mock_67890', 
                newlyCreatedClientId: paymentDataForApi.clientId // Echoing back the ID
            } 
        };
    },
};