class BarChart {
    
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 400;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 15;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.scaler = this.chartHeight / Math.max(...this.data.map(row => row[this.yValue]));

        this.axisThickness = obj.axisThickness || -1;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;
        this.axisColour = color(0, 0, 0);
        this.barColour = obj.barColour || color(random(100, 250), random(100, 250), random(100, 250));
        this.axisTextColour = color(0, 0, 0);

        // Customizable Tick Increment
        this.tickCount = obj.tickCount || 5;
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(this.barColour);
            stroke(0, 0, 0);
            rect(xPos, 0, this.barWidth, -this.data[i][this.yValue] * this.scaler);
        }
        pop();
        pop();
    }

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(this.axisTextColour);
            noStroke();
            textAlign(CENTER);
            textSize(15);

            push();
            translate(xPos + this.barWidth / 2, 15);
            rotate(0);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
        pop();
    }

    renderChartLabel() {
        let capitalizedXValue = this.xValue.charAt(0).toUpperCase() + this.xValue.slice(1);

        push();
            fill(0, 0, 0);
            translate(this.chartPosX, this.chartPosY);
            textAlign(CENTER);
            textSize(20);
            textStyle(BOLD); //Boldens This area

            //Chart Title (It's hard to not hardcode this)

            text("Danceability", this.chartWidth / 2, -this.chartHeight - 30);

            // X-Axis Label
            textSize(15)
            text(capitalizedXValue, this.chartWidth / 2, 50);

            // Y-Axis Label
            push();
                translate(-60, -this.chartHeight / 2);
                rotate(-90);
                text("Percentage", 0, 0);
            pop();
            textStyle(NORMAL); //Stops Bolding
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
    
        // Find the max value in dataset
        let maxValue = Math.max(...this.data.map(row => row[this.yValue]));
    
        console.log(`Max ${this.yValue}:`, maxValue);
    
        let roundedMax = Math.ceil(maxValue / 5) * 5; // Round to nearest 5 for better scaling
        let tickIncrement = this.chartHeight / this.tickCount;
        let valueIncrement = roundedMax / this.tickCount;
    
        for (let i = 0; i <= this.tickCount; i++) {
            let yPos = -tickIncrement * i;
            line(0, yPos, -10, yPos);
            line(0, yPos, this.chartWidth, yPos);
            noFill();
            textAlign(RIGHT, CENTER);
            textSize(10);
    
            let valueLabel = (this.yValue === "danceability" || this.yValue === "instrumentalness" || 
                              this.yValue === "valence" || this.yValue === "energy" || 
                              this.yValue === "acousticness") 
                             ? (valueIncrement * i).toFixed(0) + "%" 
                             : (valueIncrement * i).toFixed(0);
    
            text(valueLabel, -15, yPos);
        }
        pop();
    }    
}

    //Default Values don't delete for notation purposes.
    // this.chartHeight = 300;
    // this.chartWidth = 300;
    // this.barWidth = 10;
    // this.margin = 15;
    // this.gap;
    // this.scaler; 
    // this.axisThickness = -1;
    // this.chartPosX = 100;
    // this.chartPosY = 400;
    // this.axisColour;
    // this.barColour;