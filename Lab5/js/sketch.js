let data;
let canvas;
let myFont;
let cleanedData = [];
let charts = [];

function updateChart() {
    charts.length = 0; // Clear previous charts. Do not delete.

    // Get the active tab pane container
    const activeTabPane = document.querySelector(".tab-pane.active");
    if (!activeTabPane) return;

    // Query inputs from only the active tab pane
    const chartHeightInput = activeTabPane.querySelector("input#chartHeight");
    const chartWidthInput = activeTabPane.querySelector("input#chartWidth");
    const chartPosXInput = activeTabPane.querySelector("input#chartPosX");
    const chartPosYInput = activeTabPane.querySelector("input#chartPosY");

    const tickCountInput = activeTabPane.querySelector("input#tickCount");
    const barWidthInput = activeTabPane.querySelector("input#barWidth");
    const barWidth = barWidthInput ? parseInt(barWidthInput.value) || 10 : null; // Only use barWidth if it exists. Otherwise this will make all the non-bars display blank.

    const colourOneInput = activeTabPane.querySelector("input#colourOne");
    const colourTwoInput = activeTabPane.querySelector("input#colourTwo");
    const colourThreeInput = activeTabPane.querySelector("input#colourThree");

    // Chart Dimension Parses
    // You need to parse the values for them to be useable.
    // The purpose of the ? is to check if it exists first. Otherwise the chart will refuse to load because it's expecting properties it doesn't have.
    let chartHeight = parseInt(chartHeightInput.value) || 400;
    let chartWidth = parseInt(chartWidthInput.value) || 400;
    let chartPosX = parseInt(chartPosXInput.value) || 100;
    let chartPosY = parseInt(chartPosYInput.value) || 450;
    let tickCount = parseInt(tickCountInput.value) || 5;

    // Bar/Line Customisation Initialisers
    // let barWidth = barWidthInput ? parseInt(barWidthInput.value) || 10;
    let colourOne = colourOneInput ? colourOneInput.value : "#ff0000";
    let colourTwo = colourTwoInput ? colourTwoInput.value : "#ff0000";
    let colourThree = colourThreeInput ? colourThreeInput.value : "#ff0000";

    // Create the appropriate chart based on the active tab's id
    if (activeTabPane.id === "barChart") {
        charts.push(new BarChart({
            data: cleanedDataSets.topDanceableGenres, // <-- This is where you set the dataset. You can set these to be different eventually if you had time to refactor.
            chartHeight: chartHeight,
            chartWidth: chartWidth,
            chartPosX: chartPosX,
            chartPosY: chartPosY,
    
            tickCount: tickCount,
            barWidth: barWidth,
            xValue: "genre",
            yValue: "danceability",
            barColour: colourOne,
    
        }));
    } else if (activeTabPane.id === "horBarChart") {
        charts.push(new HorizontalBarChart({
            data: cleanedDataSets.songsByYear, 
            chartHeight: chartHeight,
            chartWidth: chartWidth,
            chartPosX: chartPosX,
            chartPosY: chartPosY,
    
            tickCount: tickCount,
            barHeight: barWidth,
            xValue: "release_year", 
            yValue: "song_count",
            barColour: colourOne
        }));
    } else if (activeTabPane.id === "stackedChart") {
        charts.push(new StackedBarChart({
            data: cleanedDataSets.stackedChartData,
            chartHeight: chartHeight,
            chartWidth: chartWidth,
            chartPosX: chartPosX,
            chartPosY: chartPosY,
    
            tickCount: tickCount,
            barWidth: barWidth,
            xValue: "genre",
            yValues: ["danceability", "valence", "energy"],
            barColours: [colourOne, colourTwo, colourThree]
        }));
    } else if (activeTabPane.id === "lineChart") {
        charts.push(new LineChart({
            data: cleanedDataSets.topInstrumentalGenres,
            chartHeight: chartHeight,
            chartWidth: chartWidth,
            chartPosX: chartPosX,
            chartPosY: chartPosY,
    
            tickCount: tickCount,
            xValue: "genre",
            lineColour: colourOne,
            yValue: "instrumentalness",
        }));
    } else if (activeTabPane.id === "areaChart") {
        charts.push(new AreaChart({
            data: cleanedDataSets.areaChartData,
            xValue: "genre",
            chartHeight: chartHeight,
            chartWidth: chartWidth,

            tickCount: tickCount,
            chartPosX: chartPosX,
            chartPosY: chartPosY,
            yValues: ["valence", "acousticness", "instrumentalness", "loudness"], // Loudness doesn't work, the value is TINY. This is why you reused valence!
            areaColours: [colourOne, colourTwo, colourThree]
        }));
    }
    

    redraw(); // Forces canvas to update. 
    
}

document.addEventListener("DOMContentLoaded", function () {
    // Listen for input events within the tab content container
    const tabContent = document.querySelector(".tab-content");
    tabContent.addEventListener("input", function (event) {
        if (event.target.closest(".tab-pane.active")) {
            updateChart();
        }
    });

    // This will update the chart when a new tab is shown. Find a way to show a chart by default but probably can't?
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener("shown.bs.tab", updateChart);
    });

    updateChart();
});

function preload() {
    data = loadTable('data/tcc_ceds_music.csv', 'csv', 'header');
    // Note for future self, can probably connect this to a button with html to swap data.
}

function setup() {
    canvas = createCanvas(1000, 1000);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    textFont("Jost"); //To import font you just need the name if it's from Google.
    
    cleanedDataSets = cleanData();
    canvas.parent("canvasContainer");
}

//Hello future me. The or statements are because multiple classes use their own version of renderBars. Revisit this after summer.
function draw() {
    background(255, 255, 255);
    charts.forEach(chart => {
        chart.renderAxis();
        chart.renderLabels();
        chart.renderTicks();

        if (chart instanceof BarChart || chart instanceof HorizontalBarChart || chart instanceof StackedBarChart) {
            chart.renderBars(); 
        }

        if (chart instanceof LineChart) {
            chart.renderLines();
            chart.renderPoints();
        }

        if (chart instanceof StackedBarChart || chart instanceof AreaChart){
            chart.renderLegend();
        }

        if (chart instanceof AreaChart) {
            chart.renderAreas();
        }

        chart.renderChartLabel();
    });
}

////////////////////////////////////////////////////////////////////////////////////
// DATA PROCCESSING //
// I was going to move this to a different file but it's too difficult to do lmao //
////////////////////////////////////////////////////////////////////////////////////

function cleanData() {
    let genreStats = {};
    let yearStats = {};
    let genreBreakdown = {};

    // Group by genre and sum values
    for (let i = 0; i < data.rows.length; i++) {
        let row = data.rows[i].obj;
        let genre = row["genre"];
        let year = parseInt(row["release_date"]);
        let danceability = parseFloat(row["danceability"]);
        let instrumentalness = parseFloat(row["instrumentalness"]);
        let valence = parseFloat(row["valence"]);
        let energy = parseFloat(row["energy"]);
        let loudness = parseFloat(row["loudness"]);
        let acousticness = parseFloat(row["acousticness"]);

        // Group years by 5s, remainder as 4-year group
        // You have to do this because there's way too many values otherwise.
        let baseYear = year - (year % 5);
        if (year % 5 === 4) {
            baseYear = year - 4; // Last group takes 4 years. CSV starts at 1950 but only goes up to 2019
        }
        let groupedYear = `${baseYear}-${baseYear + 4}`;

        // Process genre stats
        if (!genreStats[genre]) {
            genreStats[genre] = { 
                danceabilitySum: 0, instrumentalnessSum: 0, valenceSum: 0, 
                energySum: 0, loudnessSum: 0, acousticnessSum: 0, count: 0
            };
        }
        genreStats[genre].danceabilitySum += danceability;
        genreStats[genre].instrumentalnessSum += instrumentalness;
        genreStats[genre].valenceSum += valence;
        genreStats[genre].energySum += energy;
        genreStats[genre].loudnessSum += loudness;
        genreStats[genre].acousticnessSum += acousticness;
        genreStats[genre].count += 1;

        // Process year stats
        if (!yearStats[groupedYear]) {
            yearStats[groupedYear] = 0;
        }
        yearStats[groupedYear] += 1;

        // Process genre breakdown
        if (!genreBreakdown[genre]) {
            genreBreakdown[genre] = 0;
        }
        genreBreakdown[genre] += 1;
    }

    // This part of the code computes averages & converts them to percentages
    // If you don't do this the chart will use decimals and it makes no sense to display.
    // Too bad you figured this out like way too late.
    let cleanedData = Object.keys(genreStats).map(genre => ({
        genre: genre,
        danceability: (genreStats[genre].danceabilitySum / genreStats[genre].count) * 100,
        instrumentalness: (genreStats[genre].instrumentalnessSum / genreStats[genre].count) * 100,
        valence: (genreStats[genre].valenceSum / genreStats[genre].count) * 100,
        energy: (genreStats[genre].energySum / genreStats[genre].count) * 100,
        loudness: (genreStats[genre].loudnessSum / genreStats[genre].count) * 100,
        acousticness: (genreStats[genre].acousticnessSum / genreStats[genre].count) * 100,
        song_count: genreStats[genre].count
    }));

    //These two basic arrays are for the vertical bar chart and the regular line chart.
    let topDanceableGenres = [...cleanedData].sort((a, b) => b.danceability - a.danceability).slice(0, 10);
    let topInstrumentalGenres = [...cleanedData].sort((a, b) => b.instrumentalness - a.instrumentalness).slice(0, 10);

    //Maps a bunch of stats together for specific use on specific charts.
    //Ideally you could have a button of these stats grouped together to toggle but you can do it manually in the mean time.

    // Convert grouped year stats into an array for horizontal bar chart
    let songsByYear = Object.keys(yearStats).map(yearRange => ({
        release_year: yearRange,
        song_count: yearStats[yearRange]
    })).sort((a, b) => parseInt(a.release_year) - parseInt(b.release_year));

    // Convert genre breakdown into an array sorted by song count
    let genreBreakdownData = Object.keys(genreBreakdown).map(genre => ({
        genre: genre,
        song_count: genreBreakdown[genre]
    })).sort((a, b) => b.song_count - a.song_count);

    // Stacked chart dataset
    let stackedChartData = cleanedData.slice(0, 10).map(genre => ({
        genre: genre.genre,
        danceability: genre.danceability,
        valence: genre.valence,
        energy: genre.energy,
    }));

    // Area chart dataset
    let areaChartData = cleanedData.slice(0, 10).map(genre => ({
        genre: genre.genre,
        danceability: genre.danceability,
        instrumentalness: genre.instrumentalness,
        valence: genre.valence,
        energy: genre.energy,
        loudness: genre.loudness,
        acousticness: genre.acousticness
    }));

    //Debussy Code. Comment out when done.
    // console.log("Top 10 Most Danceable Genres:", topDanceableGenres);
    // console.log("Top 10 Most Instrumental Genres:", topInstrumentalGenres);
    // console.log("Songs Released Per Year (Grouped):", songsByYear);
    // console.log("Genre Breakdown:", genreBreakdownData);

    // Store all datasets
    // Hello hi. You access these datasets by doing the following:
    //  cleanedDataSets.[your array here]
    return {
        topDanceableGenres,
        topInstrumentalGenres,
        songsByYear,
        genreBreakdown: genreBreakdownData,
        stackedChartData,
        areaChartData
    };
}


