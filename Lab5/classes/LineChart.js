class LineChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 400;
        this.margin = obj.margin || 15;

        this.gap = (this.chartWidth - (this.margin * 2)) / (this.data.length - 1);
        let maxYValue = Math.max(...this.data.map(row => row[this.yValue]));
        this.scaler = maxYValue > 0 ? this.chartHeight / maxYValue : 1;

        this.axisThickness = obj.axisThickness || -1;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;
        this.axisColour = color(0, 0, 0);
        this.lineColour = color(random(100, 250), random(100, 250), random(100, 250));
        this.axisTextColour = color(0, 0, 0);

        // Customizable Tick Count
        this.tickCount = obj.tickCount || 5;
    }

    renderLines() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.lineColour);
        strokeWeight(2);
        noFill();
        beginShape();
        
        for (let i = 0; i < this.data.length; i++) {
            let xPos = this.margin + (this.gap * i);
            let yPos = -this.data[i][this.yValue] * this.scaler;
            vertex(xPos, yPos);
        }
        
        endShape();
        pop();
    }

    renderPoints() {
        push();
        translate(this.chartPosX, this.chartPosY);
        fill(this.lineColour);
        noStroke();
        
        for (let i = 0; i < this.data.length; i++) {
            let xPos = this.margin + (this.gap * i);
            let yPos = -this.data[i][this.yValue] * this.scaler;
            ellipse(xPos, yPos, 5, 5);
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
            let xPos = this.margin + (this.gap * i);
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
        text("Displaying: " + this.yValue + " data", this.chartWidth / 2, -this.chartHeight - 10);
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);

        let maxValue = Math.max(...this.data.map(row => row[this.yValue]));
        let roundedMax = Math.ceil(maxValue / 10) * 10;

        // Customizable Tick Increment
        let tickIncrement = this.chartHeight / this.tickCount;
        let valueIncrement = Math.ceil(roundedMax / this.tickCount / 10) * 10;

        for (let i = 0; i <= this.tickCount; i++) {
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
