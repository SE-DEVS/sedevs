
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