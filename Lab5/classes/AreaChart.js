class AreaChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues; // Array of keys for multiple area plots
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 400;
        this.margin = obj.margin || 15;

        this.gap = (this.chartWidth - (this.margin * 2)) / (this.data.length - 1);

        // Get max Y value for scaling
        this.maxYValue = Math.max(...this.data.flatMap(row => this.yValues.map(key => row[key])));
        this.scaler = this.chartHeight / this.maxYValue;

        this.axisThickness = obj.axisThickness || -1;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;
        this.axisColour = color(0, 0, 0);
        this.areaColours = this.yValues.map(() => color(random(100, 250), random(100, 250), random(100, 250), 100));
        this.axisTextColour = color(0, 0, 0);
    }

    renderAreas() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noStroke();
        
        for (let j = 0; j < this.yValues.length; j++) {
            fill(this.areaColours[j]); // Ensure fill is used for each dataset
            beginShape();
            
            for (let i = 0; i < this.data.length; i++) {
                let xPos = this.margin + (this.gap * i);
                let yPos = -this.data[i][this.yValues[j]] * this.scaler;
                vertex(xPos, yPos);
            }
            
            vertex(this.margin + (this.gap * (this.data.length - 1)), 0);
            vertex(this.margin, 0);
            endShape(CLOSE);
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
        text("Displaying: Area Chart", this.chartWidth / 2, -this.chartHeight - 10);
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        let tickIncrement = this.chartHeight / 5;
        let valueIncrement = this.maxYValue / 5;

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
