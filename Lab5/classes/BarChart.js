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
        this.barColour = color(random(100, 250), random(100, 250), random(100, 250));
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
            textAlign(LEFT, CENTER);
            textSize(10);
            push();
            rotate(90);
            text(this.data[i][this.xValue], 10, -(xPos + (this.barWidth / 2)));
            pop();
        }
        pop();
        pop();
    }

    renderChartLabel() {
        push();
        fill(0, 0, 0);
        translate(this.chartPosX, this.chartPosY);
        textAlign(CENTER);
        text("Displaying: " + this.yValue + " data", this.chartWidth / 2, -this.chartHeight - 10);
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        // Step 1: Find the max value in the dataset
        
        let maxValue = Math.max(...this.data.map(row => row[this.yValue]));

        // Step 2: Round max value up to nearest 10
        let roundedMax = Math.ceil(maxValue / 10) * 10;

        // Customizable Tick Increment
        let tickIncrement = this.chartHeight / this.tickCount;
        let valueIncrement = Math.ceil(roundedMax / this.tickCount / 10) * 10;

        for (let i = 0; i <= this.tickCount; i++) {
            let yPos = -tickIncrement * i;

            // Draw tick marks
            line(0, yPos, -10, yPos);
            line(0, yPos, this.chartWidth, yPos);

            noFill();
            textAlign(RIGHT, CENTER);
            textSize(10);
            text((valueIncrement * i).toFixed(0), -15, yPos);
        }
        pop();
    }
}

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