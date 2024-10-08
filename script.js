function calculateRate() {
    // Get form values
    const projectType = document.getElementById('projectType').value;
    const pages = parseInt(document.getElementById('pages').value);
    const complexity = document.getElementById('complexity').value;
    const additionalFeatures = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    // Base rates in INR
    let baseRate;
    if (projectType === 'website') {
        baseRate = 5000; // Base price for a basic website in INR
    } else if (projectType === 'app') {
        baseRate = 11000; // Base price for a basic app in INR
    } else {
        alert('Please select a project type.');
        return;
    }

    // Pages/Screens cost in INR
    const pagesCost = 3000 + pages * 500;

    // Complexity multiplier
    let complexityMultiplier;
    switch (complexity) {
        case 'basic':
            complexityMultiplier = 0.9;
            break;
        case 'intermediate':
            complexityMultiplier = 1.1;
            break;
        case 'advanced':
            complexityMultiplier = 1.3;
            break;
        default:
            complexityMultiplier = 1.1;
    }

    // Additional features cost in INR
    let featuresCost = 0;
    additionalFeatures.forEach(feature => {
        switch (feature) {
            case 'responsive':
                featuresCost += 5000;
                break;
            case 'ecommerce':
                featuresCost += 5000;
                break;
            default:
                break;
        }
    });

    // Calculate total cost in INR
    const total = (baseRate + pagesCost + featuresCost) * complexityMultiplier;

    // Display the result in INR
    document.getElementById('result').innerHTML = `<strong>Estimated Price:</strong> ₹${total.toLocaleString('en-IN')}`;
}


const form = document.getElementById('feedback-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const feedbackData = {};

    for (const [key, value] of formData.entries()) {
        feedbackData[key] = value;
    }

    console.log(feedbackData);

    // Send feedback data to server or API
    // fetch('/api/feedback', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(feedbackData)
    // })
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    // .catch((error) => console.error(error));
});
