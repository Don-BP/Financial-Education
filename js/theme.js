// js/theme.js
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const docElement = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'dark') {
            docElement.classList.add('dark-mode');
            if(themeSwitcher) themeSwitcher.textContent = '🌙';
        } else {
            docElement.classList.remove('dark-mode');
            if(themeSwitcher) themeSwitcher.textContent = '☀️';
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const newTheme = docElement.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});