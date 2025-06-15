// js/pension-calculator.js
document.addEventListener('DOMContentLoaded', function () {
    const pensionTypeSelect = document.getElementById('pension-type');
    const koseiOnlyGroup = document.querySelector('.kosei-only');
    const calculateBtn = document.getElementById('calculate-pension-btn');
    const resultsDiv = document.getElementById('pension-results');
    
    // Ensure the results div and its children are accessible
    if (!pensionTypeSelect || !koseiOnlyGroup || !calculateBtn || !resultsDiv) {
        console.error("Pension calculator elements not found!");
        return;
    }

    const explanationDiv = document.getElementById('pension-explanation');
    if (!explanationDiv) {
        console.error("Pension explanation element not found!");
        return;
    }

    function handlePensionTypeChange() {
        koseiOnlyGroup.style.display = pensionTypeSelect.value === 'kosei' ? 'block' : 'none';
    }

    // Set initial visibility
    handlePensionTypeChange();
    
    pensionTypeSelect.addEventListener('change', handlePensionTypeChange);

    calculateBtn.addEventListener('click', function() {
        const pensionType = pensionTypeSelect.value;
        const avgIncome = parseFloat(document.getElementById('avg-income').value) || 0;
        const contributionYears = Math.min(parseFloat(document.getElementById('contribution-years').value) || 0, 40);

        if (contributionYears === 0) {
            alert("Please enter the number of years you have contributed.");
            return;
        }

        // --- Calculations ---
        const maxKokuminAnnual = 816000; // As of 2024, approx. ¥68,000/month
        const kokuminAnnual = (contributionYears / 40) * maxKokuminAnnual;

        let koseiAnnual = 0;
        if (pensionType === 'kosei' && avgIncome > 0) {
            const averageMonthlyRemuneration = avgIncome / 12;
            const monthsOfEnrollment = contributionYears * 12;
            // The 5.481/1000 is a simplified factor based on the official post-2003 formula.
            const multiplier = 5.481 / 1000;
            koseiAnnual = averageMonthlyRemuneration * multiplier * monthsOfEnrollment;
        }

        const totalAnnualPension = kokuminAnnual + koseiAnnual;
        const totalMonthlyPension = totalAnnualPension / 12;
        
        // --- Populate Results ---
        document.getElementById('pension-amount').textContent = `¥${totalMonthlyPension.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}`;
        document.getElementById('kokumin-part').textContent = `¥${(kokuminAnnual / 12).toLocaleString('ja-JP', { maximumFractionDigits: 0 })}`;
        document.getElementById('kosei-part').textContent = `¥${(koseiAnnual / 12).toLocaleString('ja-JP', { maximumFractionDigits: 0 })}`;
        
        let explanationText = '';
        if (totalMonthlyPension < 100000) {
            explanationText = `<strong>IMPACT:</strong> This amount is significantly below the cost of living in most of Japan. Relying on this alone would require drastic lifestyle changes or continuing to work well into retirement. This is the "Retirement Crisis" reality many face.`;
        } else if (totalMonthlyPension < 200000) {
            explanationText = `<strong>IMPACT:</strong> This is a common projection, but is it enough for the life you want? With rising inflation and healthcare costs, this amount can feel tight. The gap between this number and your desired lifestyle is what you must fill through your own smart savings and investments.`;
        } else {
            explanationText = `<strong>IMPACT:</strong> This is a relatively healthy projection. However, it's crucial to remember this is not guaranteed. System changes or higher-than-expected inflation could still impact your future. Protecting and growing your own assets remains the wisest strategy to secure true peace of mind.`;
        }

        explanationDiv.innerHTML = `
            <h4 style="text-align:center;">What This Means For You</h4>
            <p>${explanationText}</p>
            <p style="margin-top:1rem; text-align:center;">Your next step is to check your official "Nenkin Teikibin" (年金定期便) or register for the "Nenkin Net" portal to verify your exact numbers.</p>
        `;
        
        resultsDiv.style.display = 'block';
    });
});