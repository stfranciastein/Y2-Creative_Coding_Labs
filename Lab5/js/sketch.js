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
            }));
        } else if (secondData.checked) {
            charts.push(new BarChart({
                data: cleanedData,
                xValue: "Age_Group",
                yValue: "Female",
            }));
        } else if (thirdData.checked){
            charts.push(new BarChart ({
                data: cleanedData,
                xValue: "Age_Group",
                yValue: "Total",
            }))
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
        chart.renderBars();
        chart.renderChartLabel();
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
