class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues; // Array of keys for stacked values
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 400;
        this.margin = obj.margin || 15;

        this.barWidth = obj.barWidth || 20;
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        let maxYValue = Math.max(...this.data.map(row => this.yValues.reduce((sum, key) => sum + row[key], 0)));
        this.scaler = maxYValue > 0 ? this.chartHeight / maxYValue : 1;

        this.axisThickness = obj.axisThickness || -1;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;
        this.axisColour = color(0, 0, 0);
        this.barColours = this.yValues.map(() => color(random(100, 250), random(100, 250), random(100, 250)));
        this.axisTextColour = color(0, 0, 0);
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i + this.margin;
            let yOffset = 0;
            
            for (let j = 0; j < this.yValues.length; j++) {
                let yValue = this.data[i][this.yValues[j]];
                let barHeight = yValue * this.scaler;
                
                fill(this.barColours[j]);
                stroke(0, 0, 0);
                rect(xPos, -yOffset, this.barWidth, -barHeight);
                
                yOffset += barHeight;
            }
        }
        pop();
    }

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);
        fill(this.axisTextColour);
        textSize(10);
        textAlign(LEFT, CENTER);
        
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i + this.margin;
            push();
            translate(xPos, 15);
            rotate(45);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
    }

    renderChartLabel() {
        push();
        fill(0, 0, 0);
        translate(this.chartPosX, this.chartPosY);
        textAlign(CENTER);
        text("Displaying: Stacked Bar Chart", this.chartWidth / 2, -this.chartHeight - 10);
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        let maxValue = Math.max(...this.data.map(row => this.yValues.reduce((sum, key) => sum + row[key], 0)));
        let roundedMax = Math.ceil(maxValue / 10) * 10;
        let tickIncrement = this.chartHeight / 5;
        let valueIncrement = Math.ceil(roundedMax / 5 / 10) * 10;

        for (let i = 0; i <= 5; i++) {
            let yPos = -tickIncrement * i;
            line(0, yPos, -10, yPos);
            line(0, yPos, this.chartWidth, yPos);
            textAlign(RIGHT, CENTER);
            textSize(10);
            text((valueIncrement * i).toFixed(0), -15, yPos);
        }
        pop();
    }
}
