function calculateRate() {
    // Get form values
    const projectType = document.getElementById('projectType').value;
    const pages = parseInt(document.getElementById('pages').value);
    const complexity = document.getElementById('complexity').value;
    const additionalFeatures = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    // Base rates in INR
    let baseRate;
    let projectName;
    
    if (projectType === 'website') {
        baseRate = 5000; // Base price for a basic website in INR
        projectName = 'Website';
    } else if (projectType === 'app') {
        baseRate = 11000; // Base price for a basic app in INR
        projectName = 'Mobile App';
    } else {
        alert('Please select a project type.');
        return;
    }

    // Validate pages
    if (isNaN(pages) || pages < 1) {
        alert('Please enter a valid number of pages/screens.');
        return;
    }

    // Pages/Screens cost in INR
    const pagesCost = 3000 + pages * 500;

    // Complexity multiplier
    let complexityMultiplier;
    let complexityText;
    switch (complexity) {
        case 'basic':
            complexityMultiplier = 0.9;
            complexityText = 'Basic';
            break;
        case 'intermediate':
            complexityMultiplier = 1.1;
            complexityText = 'Intermediate';
            break;
        case 'advanced':
            complexityMultiplier = 1.3;
            complexityText = 'Advanced';
            break;
        default:
            complexityMultiplier = 1.1;
            complexityText = 'Intermediate';
    }

    // Additional features cost in INR
    let featuresCost = 0;
    let featuresList = [];
    
    additionalFeatures.forEach(feature => {
        switch (feature) {
            case 'responsive':
                featuresCost += 5000;
                featuresList.push('Responsive Design');
                break;
            case 'ecommerce':
                featuresCost += 5000;
                featuresList.push('E-commerce Features');
                break;
            case 'cms':
                featuresCost += 3000;
                featuresList.push('Content Management System');
                break;
            default:
                break;
        }
    });

    // Calculate total cost in INR
    const subtotal = baseRate + pagesCost + featuresCost;
    const total = subtotal * complexityMultiplier;
    const tax = total * 0.18; // 18% GST
    const finalTotal = total + tax;

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="estimate-details">
            <h3>Project Estimate</h3>
            <div class="estimate-breakdown">
                <p><strong>Project Type:</strong> ${projectName}</p>
                <p><strong>Pages/Screens:</strong> ${pages}</p>
                <p><strong>Complexity:</strong> ${complexityText}</p>
                ${featuresList.length > 0 ? `<p><strong>Additional Features:</strong> ${featuresList.join(', ')}</p>` : ''}
                <hr>
                <p><strong>Base Rate:</strong> ₹${baseRate.toLocaleString('en-IN')}</p>
                <p><strong>Pages Cost:</strong> ₹${pagesCost.toLocaleString('en-IN')}</p>
                ${featuresCost > 0 ? `<p><strong>Features Cost:</strong> ₹${featuresCost.toLocaleString('en-IN')}</p>` : ''}
                <p><strong>Subtotal:</strong> ₹${subtotal.toLocaleString('en-IN')}</p>
                <p><strong>Complexity Adjustment:</strong> ${complexityMultiplier}x</p>
                <p><strong>Development Cost:</strong> ₹${total.toLocaleString('en-IN')}</p>
                <p><strong>GST (18%):</strong> ₹${tax.toLocaleString('en-IN')}</p>
                <h4 class="final-total"><strong>Final Estimate:</strong> ₹${finalTotal.toLocaleString('en-IN')}</h4>
            </div>
            <p class="note">Note: This is an estimated price. Contact us for an exact quote.</p>
            <div class="action-buttons">
                <a href="https://wa.me/917249785423?text=I%20got%20an%20estimate%20of%20₹${finalTotal.toLocaleString('en-IN')}%20for%20${projectName}%20project" 
                   class="btn btn-success" target="_blank">
                   <i class="fab fa-whatsapp"></i> Get Quote on WhatsApp
                </a>
                <button onclick="window.print()" class="btn btn-warning">
                    <i class="fas fa-print"></i> Print Estimate
                </button>
            </div>
        </div>
    `;

    // Add smooth scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Add event listeners for real-time calculation
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#rateCalculator input, #rateCalculator select');
    formInputs.forEach(input => {
        input.addEventListener('change', calculateRate);
    });
    
    // Initialize calculation
    calculateRate();
});

// Contact form handling
const form = document.getElementById('feedback-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const feedbackData = {};

        for (const [key, value] of formData.entries()) {
            feedbackData[key] = value;
        }

        console.log('Feedback submitted:', feedbackData);
        
        // Show success message
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-success');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-primary');
                form.reset();
                
                // Show thank you message
                const thankYou = document.createElement('div');
                thankYou.className = 'alert alert-success mt-3';
                thankYou.innerHTML = 'Thank you for your feedback! We\'ll get back to you soon.';
                form.appendChild(thankYou);
                
                setTimeout(() => thankYou.remove(), 5000);
            }, 2000);
        }, 1500);

        // In production, uncomment this:
        /*
        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert('Thank you for your feedback!');
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting your feedback.');
        });
        */
    });
}

// Project inquiry form handling
const projectForm = document.getElementById('projectInquiryForm');
if (projectForm) {
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent!';
            submitBtn.classList.remove('btn-success');
            submitBtn.classList.add('btn-warning');
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'alert alert-success mt-3';
            successMsg.innerHTML = `
                <h5><i class="fas fa-check-circle"></i> Thank You!</h5>
                <p>Your project inquiry has been submitted successfully.</p>
                <p>We'll contact you within 24 hours to discuss your requirements.</p>
                <p>For immediate assistance, call us at <a href="tel:+917249785423">+91 7249785423</a></p>
            `;
            
            this.parentNode.insertBefore(successMsg, this.nextSibling);
            
            // Scroll to success message
            successMsg.scrollIntoView({ behavior: 'smooth' });
            
            // Reset form after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-warning');
                submitBtn.classList.add('btn-success');
                this.reset();
                successMsg.remove();
            }, 5000);
        }, 1500);
    });
}

// Image lazy loading enhancement
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add CSS for calculator results
const style = document.createElement('style');
style.textContent = `
.estimate-details {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 25px;
    border-radius: 15px;
    margin: 20px 0;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.estimate-breakdown {
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin: 15px 0;
}

.estimate-breakdown p {
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
}

.estimate-breakdown hr {
    margin: 15px 0;
    border-color: #dee2e6;
}

.final-total {
    color: #28a745;
    font-size: 1.5em;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 2px dashed #28a745;
}

.note {
    font-size: 0.9em;
    color: #6c757d;
    text-align: center;
    margin-top: 15px;
    font-style: italic;
}

.action-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
    flex-wrap: wrap;
}

.action-buttons .btn {
    min-width: 200px;
}

@media (max-width: 768px) {
    .estimate-breakdown p {
        flex-direction: column;
    }
    
    .action-buttons {
        flex-direction: column;
    }
    
    .action-buttons .btn {
        width: 100%;
    }
}

.alert {
    padding: 15px;
    border-radius: 8px;
    margin: 15px 0;
    animation: fadeIn 0.5s ease;
}

.alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
}

.alert h5 {
    color: inherit;
    margin-bottom: 10px;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

document.head.appendChild(style);
