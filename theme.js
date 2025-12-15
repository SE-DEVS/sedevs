function toggleTheme() {
    const themeLink = document.getElementById('theme-link');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = themeLink.getAttribute('href');

    if (currentTheme === 'styles.css') {
        themeLink.setAttribute('href', 'dark-css.css');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeIcon.title = 'Switch to Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeLink.setAttribute('href', 'styles.css');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeIcon.title = 'Switch to Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Set initial theme based on user preference or localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeLink = document.getElementById('theme-link');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        themeLink.setAttribute('href', 'dark-css.css');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeIcon.title = 'Switch to Light Mode';
    } else {
        themeLink.setAttribute('href', 'styles.css');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeIcon.title = 'Switch to Dark Mode';
    }
    
    // Hero text rotation
    const heroTexts = ["WEB Development", "App Development", "Software Development"];
    const slogans = [
        "Crafting Digital Experiences",
        "Innovating with you", 
        "Building Digital Solutions",
        "Transforming Ideas into Reality",
        "Your Digital Growth Partner"
    ];
    let heroIndex = 0;
    let sloganIndex = 0;

    const heroTitle = document.querySelector('.hero h1');
    const heroSlogan = document.querySelector('.hero p');
    
    if (heroTitle && heroSlogan) {
        setInterval(() => {
            heroIndex = (heroIndex + 1) % heroTexts.length;
            sloganIndex = (sloganIndex + 1) % slogans.length;
            
            heroTitle.style.opacity = '0';
            heroSlogan.style.opacity = '0';
            
            setTimeout(() => {
                heroTitle.textContent = heroTexts[heroIndex];
                heroSlogan.textContent = slogans[sloganIndex];
                heroTitle.style.opacity = '1';
                heroSlogan.style.opacity = '1';
            }, 500);
        }, 5000);
    }

    // Auto-scroll for services and portfolio
    const scrollContainers = document.querySelectorAll('.services, .portfolio');
    
    scrollContainers.forEach(container => {
        let scrollAmount = 0;
        let scrollStep = 1;
        const scrollDelay = 20;
        let isPaused = false;
        
        // Pause on hover
        container.addEventListener('mouseenter', () => isPaused = true);
        container.addEventListener('mouseleave', () => isPaused = false);
        
        function scrollContent() {
            if (isPaused) return;
            
            scrollAmount += scrollStep;
            container.scrollLeft = scrollAmount;
            
            if (scrollAmount >= container.scrollWidth - container.clientWidth || scrollAmount <= 0) {
                scrollStep *= -1;
            }
        }
        
        setInterval(scrollContent, scrollDelay);
    });

    // Sidebar functions
    function openNav() {
        document.getElementById("mySidebar").style.width = "280px";
        document.getElementById("main").style.marginLeft = "280px";
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.body.style.overflow = 'auto';
    }

    // Attach functions to window object
    window.openNav = openNav;
    window.closeNav = closeNav;

    // Set active navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Back to top button
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.title = 'Back to Top';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Add loading state to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            img.addEventListener('load', () => {
                img.classList.remove('loading');
            });
            img.addEventListener('error', () => {
                img.classList.remove('loading');
            });
        }
    });

    // Form validation for contact forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff3860';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Sent Successfully!';
                    submitBtn.style.backgroundColor = '#2E8B57';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                        this.reset();
                    }, 2000);
                }, 1500);
            }
        });
    });

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[title]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.title;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0,0,0,0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '10000';
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 30) + 'px';
            
            document.body.appendChild(tooltip);
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
});

// Service button functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Attach to window
window.scrollToSection = scrollToSection;
