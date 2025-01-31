let data;
let cleanedData = [];
let chartHeight = 500;
let chartWidth = 500;
let barWidth = 10;
let margin = 15;
let gap;
 
function preload(){
    data = loadTable('data/Combined.csv','csv','header');
}
 
function setup(){
    createCanvas(500,500);
    angleMode(DEGREES);
    noLoop();
    // i ="john";
    cleanData();
}
 
function draw(){
        // let femaleAges = [] <-------- Uncomment this as well if you're going to test the other methods (1,2,3)


        /////////////////////////////////////////////////////////
        // Method One //

        // for (let i=0; i<cleanedData.length; i++){
        //     console.log(i);
        //     femaleAges.push(cleanedData[i].Female)
        //     console.log(femaleAges)
        // }

        /////////////////////////////////////////////////////////
        // Method Two // (Regular Function)

        // cleanedData.forEach(
        //     function(woman){ //this can be named anything
        //         femaleAges.push(woman.Female)
        //     }
        // )
        // console.log(femaleAges)

        ////////////////////////////////////////////////////////
        // Method Three // (Arrow Function)
        // cleanedData.forEach(
        //     row => {femaleAges.push(row.Female)}
        // )

        // console.log(femaleAges)

        ////////////////////////////////////////////////////////
        // Method Four // (Mapping)

        let femaleScores = cleanedData.map(row => row.Female)
        let maleScores = cleanedData.map(row => row.Male)

        let ageGroups = cleanedData.map(row => row.Age_Group)


        console.log(femaleScores)
        console.log(maleScores)
        console.log(ageGroups)
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