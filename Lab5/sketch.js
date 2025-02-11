let data;
let cleanedData = [];
// let femaleScores;
// let maleScores;
// let ageGroups;
let charts = [];


function preload(){
    data = loadTable('data/Combined.csv','csv','header');
}
 
function setup(){
    createCanvas(1500,1500);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    charts.push(new BarChart({
        data:cleanedData, 
        xValue: "Age_Group", 
        yValue: "Female", 
    }
    ));

    charts.push(new BarChart({
        data:cleanedData, 
        xValue: "Age_Group", 
        yValue: "Male",
        chartPosX: 600
    }
    ));
    
    
    // charts.push(new BarChart(cleanedData, "Age_Group", "Male", 400, 400, 10 , 15, -1, 600, 450));

    // charts.push(new BarChart(cleanedData, "Age_Group", "Total", 400, 800, 30 , 15, -1, 150, 950));
}
 
function draw(){
    background(25,90,200)
    charts.forEach(chart => {
        chart.renderBars();
        chart.renderAxis();
        chart.renderLabels();
        chart.renderTicks();
    });
}


 
function cleanData(){
    for(let i = 0; i < data.rows.length; i++){
        cleanedData.push(data.rows[i].obj);
    }
 
    for(let i = 0; i < cleanData.length; i++){
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
    }
}

