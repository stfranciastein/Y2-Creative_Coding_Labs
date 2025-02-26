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
        
        // Use provided areaColours if available and matching the number of yValues,
        // Otherwise generate random colours.
        // Reuse this code for stackedBarChart!!
        this.areaColours = this.yValues.map((_, i) => {
            if (obj.areaColours && obj.areaColours[i]) {
              return color(obj.areaColours[i]);
            }
            return color(random(100, 250), random(100, 250), random(100, 250), 100);
          });
          
        
        this.axisTextColour = color(0, 0, 0);

        // Customizable Tick Count
        this.tickCount = obj.tickCount || 5;
    }

    renderAreas() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noStroke();
        
        for (let j = 0; j < this.yValues.length; j++) {
            fill(this.areaColours[j]); // Use the assigned fill for each dataset
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
        textSize(15);
        textAlign(CENTER, CENTER);
        
        for (let i = 0; i < this.data.length; i++) {
            let xPos = this.margin + (this.gap * i);
            push();
            translate(xPos, 15);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
    }

    renderChartLabel() {
        let capitalizedXValue = this.xValue.charAt(0).toUpperCase() + this.xValue.slice(1);

        push();
            fill(0, 0, 0);
            translate(this.chartPosX, this.chartPosY);
            textAlign(CENTER);
            textSize(20);
            textStyle(BOLD);

            //Chart Title (It's hard to not hardcode this)
            text("Production", this.chartWidth / 2, -this.chartHeight - 70);

            // X-Axis Label
            textSize(15)
            text(capitalizedXValue, this.chartWidth / 2, 50);

            // Y-Axis Label
            push();
                translate(-60, -this.chartHeight / 2);
                rotate(-90);
                text("Percentage", 0, 0);
            pop();
            textStyle(NORMAL);

        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
    
        let maxValue = Math.max(...this.data.flatMap(row => this.yValues.map(key => row[key])));
        let roundedMax = Math.ceil(maxValue / 10) * 10;

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

    renderLegend() {
        push();
        translate(this.chartPosX + this.chartWidth / 2, this.chartPosY - this.chartHeight - 40); // Moves legend above the chart
        textSize(12);
        textAlign(LEFT, CENTER);
    
        let spacing = 120; // Distance between each item
        let startX = -(this.yValues.length - 1) * spacing / 2; // Centering logic
    
        for (let i = 0; i < this.yValues.length; i++) {
            push();
            translate(startX + i * spacing, 0); // Spaces out items evenly around center
            
            fill(this.areaColours[i]);
            stroke(0);
            rect(0, 0, 15, 15);
            
            fill(0);
            noStroke();
            text(this.yValues[i], 20, 9); // Moves text at least 10px away from rect
            pop();
        }
        
        pop();
    }
}
