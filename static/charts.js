google.charts.load('current', {'packages':['corechart']});

// Fetch the data from the JSON file and draw the charts
fetch('data/medal_tally.json')
    .then(response => response.json())
    .then(data => {
        drawCharts(data);
    })
    .catch(error => console.error('Error fetching the data:', error));

// Function to draw the charts
function drawCharts(data) {
    const medalDataArray = [['Country', 'Medals']];
    for (let country in data) {
        medalDataArray.push([country, data[country]]);
    }

    // Draw Pie Chart
    google.charts.setOnLoadCallback(() => {
        const pieData = google.visualization.arrayToDataTable(medalDataArray);
        const pieOptions = {
            title: 'Olympic Medal Distribution',
            backgroundColor: '#08743c',
            titleTextStyle: { color: '#ffffff' },
            legendTextStyle: { color: '#ffffff' }
        };
        const pieChart = new google.visualization.PieChart(document.getElementById('piechart'));
        pieChart.draw(pieData, pieOptions);
    });

    // Draw Bar Chart
    google.charts.setOnLoadCallback(() => {
        const barData = google.visualization.arrayToDataTable(medalDataArray);
        const barOptions = {
            title: 'Olympic Medal Distribution',
            backgroundColor: '#08743c',
            titleTextStyle: { color: '#ffffff' },
            legendTextStyle: { color: '#ffffff' },
            hAxis: { title: 'Country', titleTextStyle: { color: '#ffffff' }, textStyle: { color: '#ffffff' } },
            vAxis: { title: 'Medals', titleTextStyle: { color: '#ffffff' }, textStyle: { color: '#ffffff' } }
        };
        const barChart = new google.visualization.BarChart(document.getElementById('barchart'));
        barChart.draw(barData, barOptions);
    });
}