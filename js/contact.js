// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const serviceSelect = document.getElementById('service');
    const paymentSection = document.getElementById('paymentSection');

    // Pre-select service from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');

    if (serviceParam && serviceSelect) {
        serviceSelect.value = serviceParam;
    }

    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!validateForm(formData)) {
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            submitBtn.disabled = true;

            try {
                // Send email using FormSubmit or similar service
                const response = await sendEmail(formData);

                if (response.success) {
                    // Show success message
                    showSuccessMessage();

                    // Reset form
                    contactForm.reset();

                    // Show payment section if budget is selected
                    if (formData.budget && formData.budget !== 'discuss') {
                        showPaymentSection(formData);
                    }
                } else {
                    throw new Error('Email sending failed');
                }
            } catch (error) {
                console.error('Error:', error);
                showErrorMessage('Something went wrong. Please try calling or emailing directly.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Form validation
    function validateForm(data) {
        let isValid = true;

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            showFieldError('name', 'Please enter your full name');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Service validation
        if (!data.service) {
            showFieldError('service', 'Please select a service type');
            isValid = false;
        }

        // Budget validation
        if (!data.budget) {
            showFieldError('budget', 'Please select a budget range');
            isValid = false;
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            showFieldError('message', 'Please provide more details about your project');
            isValid = false;
        }

        return isValid;
    }

    // Send email function
    async function sendEmail(data) {
        // Option 1: Use FormSubmit.co (free)
        const formSubmitUrl = 'https://formsubmit.co/divineelectricsllc@gmail.com';

        const formBody = new FormData();
        formBody.append('name', data.name);
        formBody.append('email', data.email);
        formBody.append('service', data.service);
        formBody.append('budget', data.budget);
        formBody.append('message', data.message);
        formBody.append('_subject', `New Project Inquiry: ${data.service}`);
        formBody.append('_captcha', 'false');
        formBody.append('_template', 'table');

        try {
            const response = await fetch(formSubmitUrl, {
                method: 'POST',
                body: formBody
            });

            return { success: response.ok };
        } catch (error) {
            console.error('Email error:', error);

            // Fallback: Open mailto link
            const subject = encodeURIComponent(`New Project Inquiry: ${data.service}`);
            const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Service: ${data.service}
Budget: ${data.budget}

Message:
${data.message}
            `);

            window.location.href = `mailto:divineelectricsllc@gmail.com?subject=${subject}&body=${body}`;

            return { success: true };
        }
    }

    // Show field error
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('error');

        // Remove existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);

        // Remove error on input
        field.addEventListener('input', () => {
            field.classList.remove('error');
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        }, { once: true });
    }

    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Message sent successfully!</strong> I'll get back to you within 24 hours.
        `;

        contactForm.insertAdjacentElement('beforebegin', successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Show error message
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.padding = '20px';
        errorDiv.style.background = 'rgba(255, 68, 68, 0.1)';
        errorDiv.style.border = '1px solid #ff4444';
        errorDiv.style.borderRadius = '8px';
        errorDiv.style.textAlign = 'center';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        `;

        contactForm.insertAdjacentElement('beforebegin', errorDiv);

        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Show payment section
    function showPaymentSection(formData) {
        if (!paymentSection) return;

        paymentSection.style.display = 'block';
        paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Initialize PayPal button
        initializePayPal(formData);
    }

    // Initialize PayPal
    function initializePayPal(formData) {
        // Check if PayPal SDK is loaded
        if (typeof paypal === 'undefined') {
            console.error('PayPal SDK not loaded');
            return;
        }

        const container = document.getElementById('paypal-button-container');
        if (!container) return;

        // Clear existing buttons
        container.innerHTML = '';

        // Calculate amount based on budget
        const amounts = {
            '1k-3k': '50.00',      // 50% deposit
            '3k-5k': '100.00',     // 50% deposit
            '5k-10k': '250.00',    // 50% deposit
            '10k+': '500.00'       // Minimum deposit
        };

        const amount = amounts[formData.budget] || '100.00';

        // Render PayPal button
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'paypal'
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: `GmanGizmos - ${formData.service} - Project Deposit`,
                        amount: {
                            currency_code: 'USD',
                            value: amount
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    // Show success message
                    alert('Payment successful! Transaction ID: ' + details.id);

                    // Send confirmation email
                    sendPaymentConfirmation(details, formData);

                    // Redirect or show thank you message
                    window.location.href = 'index.html?payment=success';
                });
            },
            onError: function(err) {
                console.error('PayPal error:', err);
                alert('Payment failed. Please try again or contact us directly.');
            }
        }).render('#paypal-button-container');
    }

    // Send payment confirmation
    async function sendPaymentConfirmation(paymentDetails, formData) {
        const confirmationData = {
            ...formData,
            paymentId: paymentDetails.id,
            amount: paymentDetails.purchase_units[0].amount.value,
            payerEmail: paymentDetails.payer.email_address
        };

        // Send confirmation email to client and yourself
        console.log('Payment confirmation:', confirmationData);
        // Implement email sending here
    }
});
