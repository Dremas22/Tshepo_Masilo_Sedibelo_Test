
/**
 * This is a function that fetches data from barGraph.json file and extracts it to render a
 * Pie chart.
 * @param { BarProp } Month - It is property that stores a date in a format of a year and a month only.
 * @param { BarProp } numInstalls - It is property that stores number of intallations performed.
 */

fetch('pieChart.json')
    .then(response => response.json())
    .then(data => {
        
        const labelsYear = data.map(item => item.year);
        const valuesNumInstalls = data.map(item => item.numInstalls);

        data = {
            labels: labelsYear,
            datasets: [{
                label: 'Number of Installations',
                data: valuesNumInstalls,
                backgroundColor: [
                    'rgba(204, 142, 53, 0.2)',
                    'rgba(236, 240, 241, 0.2)',
                    'rgba(149, 165, 166, 0.2)'
                ],
                borderColor: [
                    'rgba(204, 142, 53, 1)',
                    'rgba(236, 240, 241, 1)',
                    'rgba(149, 165, 166, 1)'
                ],
                borderWidth: 1
            }]
        };
        
        const config = {
            type: 'pie',
            data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
        
            },
            plugins: [ChartDataLabels],
        };
        
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
        
        // Instantly assign Chart.js version
        const chartVersion = document.getElementById('chartVersion');
        chartVersion.innerText = Chart.version;

    })
    
