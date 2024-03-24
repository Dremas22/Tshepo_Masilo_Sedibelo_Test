/**
 * This is a function that fetches data from barGraph.json file and extracts it to render a
 * Bar chart.
 * @param { BarProp } Month - It is property that stores a date in a format of a year and a month only.
 * @param { BarProp } numInstalls - It is property that stores number of intallations performed.
 */


fetch('barGraph.json')
    .then(response => response.json())
    .then(data => {

        const labelsMonth = data.map(item => item.month);
        const valuesNumInstalls = data.map(item => item.numInstalls);

        data = {
            labels: labelsMonth,
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
            type: 'bar',
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

