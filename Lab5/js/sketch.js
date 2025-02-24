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
                xValue: "Age_Group",
                yValue: "Male",
                tickCount: 11 // remove when finished testing!!
            }));
        } else if (secondData.checked) {
            charts.push(new BarChart({
                data: cleanedData,
                xValue: "Age_Group",
                yValue: "Female",
            }));
        } else if (thirdData.checked) {
            charts.push(new StackedBarChart({
                data: cleanedData,
                xValue: "Age_Group",
                yValues: ["Male", "Female", "Total"], // Stacked values
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
    data = loadTable('data/Combined.csv', 'csv', 'header');
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


        chart.renderChartLabel();
        chart.renderLines();
        chart.renderPoints();
    });
}

function cleanData() {
    for (let i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }

    for (let i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
    }
}
