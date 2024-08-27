
        function toggleTheme() {
            const themeLink = document.getElementById('theme-link');
            const themeIcon = document.getElementById('theme-icon');
            const currentTheme = themeLink.getAttribute('href');

            // Check the current theme and switch
            if (themeLink.getAttribute('href') === 'styles.css') {
                themeLink.setAttribute('href', 'dark-css.css');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeLink.setAttribute('href', 'styles.css');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }

        const slogans = [
            "Website Development",
            "Software Development",
            "App Development",
            "Web Hosting",
            "E commerce Solutions",
            "Digital Marketing",
            "Consulting Services",
        ];
        
        let index = 0;
        
        setInterval(() => {
            document.getElementById('slogan').textContent = slogans[index];
            index = (index + 1) % slogans.length;
        }, 2000);  // Change every 5 seconds
        
