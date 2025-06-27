// js/language.js
document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const originalTexts = new Map();

    function storeOriginalTexts() {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            if (!originalTexts.has(element)) {
                // Store based on the key to avoid issues with elements that might not have text content initially
                originalTexts.set(element.getAttribute('data-lang-key'), element.innerHTML);
            }
        });
    }

    function translatePage(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (lang === 'ja' && translations.ja[key]) {
                element.innerHTML = translations.ja[key];
            } else if (lang === 'en' && originalTexts.has(key)) {
                // Restore from the map using the key
                element.innerHTML = originalTexts.get(key);
            }
        });
    }
    
    // Make setLanguage globally available for dynamic content updates (e.g., in main.js)
    window.setLanguage = (lang) => {
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);
        
        // Ensure original texts are stored before any translation happens
        if (originalTexts.size === 0) {
            storeOriginalTexts();
        }

        translatePage(lang);

        if (languageSwitcher) {
            if (lang === 'en') {
                languageSwitcher.innerHTML = '日本語';
                languageSwitcher.setAttribute('aria-label', 'Switch language');
            } else { // lang is 'ja'
                languageSwitcher.innerHTML = 'E<br>n<br>g';
                languageSwitcher.setAttribute('aria-label', '言語を切り替える');
            }
        }
    };
    
    // Initial load
    storeOriginalTexts(); // Store texts on initial load
    const currentLang = localStorage.getItem('language') || 'en';
    window.setLanguage(currentLang);

    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', () => {
            const newLang = document.documentElement.lang === 'en' ? 'ja' : 'en';
            window.setLanguage(newLang);
        });
    }

    // Observer for dynamic content (e.g., seminar cards)
    const seminarObserver = new MutationObserver((mutations) => {
        // When new cards are added, we just need to re-run the translation
        translatePage(localStorage.getItem('language') || 'en');
    });

    const seminarContainer = document.getElementById('seminar-list-container');
    if (seminarContainer) {
        seminarObserver.observe(seminarContainer, { childList: true });
    }
});