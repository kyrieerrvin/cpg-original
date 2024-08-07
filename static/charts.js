google.charts.load('current', {'packages':['corechart']});

// Function to draw the charts
function drawCharts(data) {
    const medalDataArray = [['Country', 'Medals']];
    for (let country in data) {
        medalDataArray.push([country, data[country]]);
    }

    // Draw Pie Chart
    const pieData = google.visualization.arrayToDataTable(medalDataArray);
    const pieOptions = {
        title: 'Olympic Medal Distribution',
        backgroundColor: '#08743c',
        titleTextStyle: { color: '#ffffff' },
        legendTextStyle: { color: '#ffffff' },
        chartArea: { width: '90%', height: '80%' }
    };
    const pieChart = new google.visualization.PieChart(document.getElementById('piechart'));
    pieChart.draw(pieData, pieOptions);

    // Draw Bar Chart
    const barData = google.visualization.arrayToDataTable(medalDataArray);
    const barOptions = {
        title: 'Olympic Medal Distribution',
        backgroundColor: '#08743c',
        titleTextStyle: { color: '#ffffff' },
        legendTextStyle: { color: '#ffffff' },
        hAxis: { title: 'Country', titleTextStyle: { color: '#ffffff' }, textStyle: { color: '#ffffff' } },
        vAxis: { title: 'Medals', titleTextStyle: { color: '#ffffff' }, textStyle: { color: '#ffffff' } },
        chartArea: { width: '90%', height: '80%' }
    };
    const barChart = new google.visualization.BarChart(document.getElementById('barchart'));
    barChart.draw(barData, barOptions);
}

// Function to draw the line chart
function drawLineChart() {
    fetch('data/sales_data.json') // Update the path to your JSON file
        .then(response => response.json())
        .then(data => {
            const salesDataArray = [['Month', 'Sales']];
            data.forEach(entry => {
                salesDataArray.push([entry.month, entry.sales]);
            });

            const lineData = google.visualization.arrayToDataTable(salesDataArray);
            const lineOptions = {
                title: 'Monthly Sales Data',
                curveType: 'function',
                legend: { position: 'bottom' },
                backgroundColor: '#ffffff',
                titleTextStyle: { color: '#333', fontSize: 18 },
                hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Sales', titleTextStyle: { color: '#333' } },
                chartArea: { width: '80%', height: '70%' }
            };
            const lineChart = new google.visualization.LineChart(document.getElementById('linechart'));
            lineChart.draw(lineData, lineOptions);
        })
        .catch(error => console.error('Error fetching the sales data:', error));
}

// Fetch the data for medals and draw the charts
fetch('data/medal_tally.json')
    .then(response => response.json())
    .then(data => {
        google.charts.setOnLoadCallback(() => drawCharts(data));
    })
    .catch(error => console.error('Error fetching the medal tally data:', error));

// Fetch the data for sales and draw the line chart
google.charts.setOnLoadCallback(drawLineChart);
