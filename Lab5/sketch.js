let data;
let cleanedData = [];
let femaleScores;
let maleScores;
let ageGroups;


function preload(){
    data = loadTable('data/Combined.csv','csv','header');
}
 
function setup(){
    createCanvas(500,500);
    angleMode(DEGREES);
    noLoop();
    cleanData();
}
 
function draw(){
    background(25,90,200)

    push();
    translate(chartPosX, chartPosY);
    noFill();
    stroke(axisColour);
    strokeWeight(axisThickness);
    line(0,0,0,-chartHeight)
    line(0,0,chartWidth,0)
    
    push()
    translate(margin, 0)
    for(let i=0; i<femaleScores.length; i++){
        let xPos = (barWidth + gap) *i;
        fill(barColour);
        noStroke();
        rect(xPos,0,barWidth,-femaleScores[i] * scaler);

        textAlign(LEFT, CENTER);
        textSize(10);
        push();
        rotate(90);
        text(ageGroups[i], 10, -(xPos + (barWidth / 2 )));
        pop();

    }
    pop()
    pop()


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

