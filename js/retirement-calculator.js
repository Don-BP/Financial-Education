// js/retirement-calculator.js
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-retirement-btn');
    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', () => {
        const desiredIncome = parseFloat(document.getElementById('desired-income').value) || 0;
        const pensionIncome = parseFloat(document.getElementById('pension-income').value) || 0;
        const retirementYears = parseFloat(document.getElementById('retirement-years').value) || 0;
        
        if (desiredIncome === 0 || retirementYears === 0) {
            alert('Please enter your desired income and expected retirement duration.');
            return;
        }

        const monthlyGap = desiredIncome - pensionIncome;
        const totalGap = monthlyGap * 12 * retirementYears;

        const resultsDiv = document.getElementById('retirement-results');
        const nestEggEl = document.getElementById('nest-egg-amount');
        const explanationEl = document.getElementById('retirement-explanation');
        
        if (totalGap <= 0) {
            nestEggEl.textContent = '¥0';
            explanationEl.innerHTML = `<p>Congratulations! Your estimated pension covers your desired monthly income. You have built a solid foundation, but building personal wealth is still crucial to protect against inflation and unforeseen costs.</p>`;
        } else {
            nestEggEl.textContent = `¥${totalGap.toLocaleString()}`;
            explanationEl.innerHTML = `<p>To cover a monthly shortfall of <strong>¥${monthlyGap.toLocaleString()}</strong> for <strong>${retirementYears} years</strong>, this is the total amount you need to build through your personal investments and savings. This is your tangible goal.</p>`;
        }
        
        resultsDiv.style.display = 'block';
        
        if (typeof createRetirementChart === 'function') {
            createRetirementChart(pensionIncome, desiredIncome);
        }
    });
});