// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    const seminars = [
        {
            date: "October 10, 2024 - 7:00 PM JST",
            title: "The Pension & Savings Wake-Up Call",
            language: "English",
            description: "A hard-hitting look at the reality of retirement in Japan and why your bank savings are shrinking.",
            registrationLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform?usp=sf_link" 
        },
        {
            date: "October 12, 2024 - 7:00 PM JST",
            title: "日本の保険と資産形成の真実",
            language: "日本語 (Japanese)",
            description: "「貯蓄型保険」の罠と、アインシュタインも絶賛した「複利」の力を解説します。",
            registrationLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform?usp=sf_link"
        },
        {
            date: "October 17, 2024 - 7:00 PM JST",
            title: "For Foreigners: Secure Your Assets In & Out of Japan",
            language: "English",
            description: "Specific strategies for expats covering pensions, international investments, and protecting your money from inflation.",
            registrationLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform?usp=sf_link"
        }
    ];

    const seminarContainer = document.getElementById('seminar-list-container');
    
    if (seminarContainer) {
        seminarContainer.innerHTML = ''; 
        if (seminars.length > 0) {
            seminars.forEach(seminar => {
                const seminarCard = document.createElement('div');
                seminarCard.className = 'seminar-card';
                seminarCard.setAttribute('data-aos', 'fade-up');

                seminarCard.innerHTML = `
                    <div class="seminar-details">
                        <h3>${seminar.title}</h3>
                        <p><strong>Date:</strong> ${seminar.date} <span class="seminar-tag">${seminar.language}</span></p>
                        <p>${seminar.description}</p>
                    </div>
                    <div class="seminar-cta">
                        <a href="${seminar.registrationLink}" target="_blank" class="btn btn-primary" data-lang-key="seminar_card_btn">Register Now</a>
                    </div>
                `;
                seminarContainer.appendChild(seminarCard);
            });
            
        } else {
            seminarContainer.innerHTML = '<p>No upcoming seminars are scheduled at this time. Please check back soon!</p>';
        }
    }
});