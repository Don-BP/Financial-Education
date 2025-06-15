// js/chart-integration.js

function createCompoundChart(contributions, interest) {
    const ctx = document.getElementById('compound-pie-chart');
    if (!ctx) return;
    if (window.myCompoundChart instanceof Chart) window.myCompoundChart.destroy();
    window.myCompoundChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Your Contributions', 'Interest Earned'],
            datasets: [{
                data: [contributions, interest],
                backgroundColor: ['#457b9d', '#2a9d8f'],
                borderColor: 'var(--bg-secondary)', borderWidth: 2
            }]
        },
        options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });
}

function createInsuranceChart(cashValue, investmentValue) {
    const ctx = document.getElementById('insurance-bar-chart');
    if (!ctx) return;
    if (window.myInsuranceChart instanceof Chart) window.myInsuranceChart.destroy();
    window.myInsuranceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Final Payout if you LIVE'],
            datasets: [
                { label: 'Insurance Policy', data: [cashValue], backgroundColor: '#e63946' },
                { label: 'Investment Plan', data: [investmentValue], backgroundColor: '#2a9d8f' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' }, title: { display: true, text: 'Insurance Cash Value vs. Investment Growth' } },
            scales: { y: { beginAtZero: true, ticks: { callback: (value) => '¥' + value.toLocaleString() } } }
        }
    });
}

function createRetirementChart(pension, target) {
    const ctx = document.getElementById('retirement-bar-chart');
    if(!ctx) return;
    if (window.myRetirementChart instanceof Chart) window.myRetirementChart.destroy();
    window.myRetirementChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Your Monthly Retirement Income'],
            datasets: [
                { label: 'Estimated Pension', data: [pension], backgroundColor: '#457b9d' },
                { label: 'Target Income', data: [target], backgroundColor: '#2a9d8f' }
            ]
        },
        options: {
            indexAxis: 'y', responsive: true,
            plugins: { legend: { position: 'top' }, title: { display: true, text: 'Your Estimated Pension vs. Your Goal' } },
            scales: { x: { ticks: { callback: (value) => '¥' + value.toLocaleString() } } }
        }
    });
}