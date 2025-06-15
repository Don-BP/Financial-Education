// js/compound-calculator.js
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-compound-btn');
    if (!calculateBtn) return; 

    calculateBtn.addEventListener('click', function() {
        const principal = parseFloat(document.getElementById('initial-investment').value) || 0;
        const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value) || 0;
        const years = parseFloat(document.getElementById('investment-years').value) || 0;
        const annualRate = (parseFloat(document.getElementById('ci-annual-return').value) || 0) / 100;

        if (years === 0) {
            alert("Please enter a valid number of years.");
            return;
        }

        const monthlyRate = annualRate / 12;
        const months = years * 12;

        let futureValue = principal * Math.pow(1 + monthlyRate, months);
        if (monthlyContribution > 0) {
            futureValue += monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        }

        const totalContributions = principal + (monthlyContribution * months);
        const totalInterest = futureValue - totalContributions;

        const resultsDiv = document.getElementById('compound-results');
        
        resultsDiv.innerHTML = `
            <h4>Future Value After ${years} Years:</h4>
            <p class="result-value" id="compound-amount">¥${futureValue.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}</p>
            <canvas id="compound-pie-chart" style="margin: 1.5rem 0;"></canvas>
            <hr>
            <div class="two-col-layout" style="text-align: left; gap: 1rem; margin-bottom: 1.5rem;">
                <div>
                    <p>What You Paid In:</p>
                    <p><strong>¥${totalContributions.toLocaleString()}</strong></p>
                </div>
                <div>
                    <p>What Your Money Earned:</p>
                    <p><strong style="color: var(--color-success);">¥${totalInterest.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}</strong></p>
                </div>
            </div>
            <div class="results-explanation">
                <h4 style="text-align:center;">What This Means For You</h4>
                <p>This demonstrates the power of compounding. Notice how the 'What Your Money Earned' amount can grow to be a huge portion of your final wealth. Over long periods, the growth from compounding can vastly exceed your own contributions. This is the fundamental difference between simply saving and actively building wealth.</p>
            </div>
        `;
        resultsDiv.style.display = 'block';

        if (typeof createCompoundChart === 'function') {
            createCompoundChart(totalContributions, totalInterest);
        }
    });
});