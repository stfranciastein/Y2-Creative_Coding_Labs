let data;
let cleanedData = [];
let charts = [];

// DOM ELEMENTS
document.addEventListener("DOMContentLoaded", function () {
    const firstData = document.getElementById("optionOne");
    const secondData = document.getElementById("optionTwo");
    const thirdData = document.getElementById("optionThree");
    const chartHeightInput = document.getElementById("chartHeight");
    const displayHeight = document.getElementById("displayHeight")

    chartHeightInput.addEventListener("input", function(){
        displayHeight.textContent = chartHeightInput.value;
    })

    function updateChart() {
        charts.length = 0; // Clears previous charts

        if (firstData.checked) {
            charts.push(new BarChart({
                data: cleanedData,
                xValue: "genre",
                yValue: "danceability",
                barWidth: 20,
                tickCount: 5 // remove when finished testing!!
            }));
        } else if (secondData.checked) {
            charts.push(new LineChart({
                data: cleanedData,
                xValue: "Age_Group",
                yValue: "Female",
            }));
        } else if (thirdData.checked) {
            charts.push(new AreaChart({
                data: cleanedData,
                xValue: "genre",
                chartWidth: 1000,
                yValues: ["danceability", "energy", "valence"], // Stacked values
            }));
        }

        redraw(); // Forces the canvas to update
    }

    firstData.addEventListener("change", updateChart);
    secondData.addEventListener("change", updateChart);
    thirdData.addEventListener("change", updateChart);

    updateChart();
});

function preload() {
    data = loadTable('data/tcc_ceds_music.csv', 'csv', 'header');
}

function setup() {
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    noLoop();
    cleanData();
}

function draw() {
    background(255, 255, 255);
    charts.forEach(chart => {
        chart.renderAxis();
        chart.renderLabels();
        chart.renderTicks();

        //The reason your linechart wasn't showing up before was because you were still rendering bars during debugging.
        //To get the linechart to show up, you need to only render bars if you have a barchart. Remember this for future chart types pls thanks.
        if (chart instanceof BarChart || chart instanceof StackedBarChart) {
            chart.renderBars(); 
        }

        if (chart instanceof LineChart) {
            chart.renderLines();
            chart.renderPoints();
        }

        if (chart instanceof AreaChart) {
            chart.renderAreas();
        }

        chart.renderChartLabel();
        chart.renderLines();
        chart.renderPoints();
    });
}

function cleanData() {
    let genreDanceability = {};

    // Group by genre and sum danceability values
    for (let i = 0; i < data.rows.length; i++) {
        let row = data.rows[i].obj;
        let genre = row["genre"];
        let danceability = parseFloat(row["danceability"]);

        if (!genreDanceability[genre]) {
            genreDanceability[genre] = { sum: 0, count: 0 };
        }
        genreDanceability[genre].sum += danceability;
        genreDanceability[genre].count += 1;
    }

    // Compute the average danceability per genre
    cleanedData = Object.keys(genreDanceability).map(genre => ({
        genre: genre,
        danceability: genreDanceability[genre].sum / genreDanceability[genre].count
    }));

    // Sort genres by average danceability and keep only the top 10 for readability
    cleanedData.sort((a, b) => b.danceability - a.danceability);
    cleanedData = cleanedData.slice(0, 10);
}

