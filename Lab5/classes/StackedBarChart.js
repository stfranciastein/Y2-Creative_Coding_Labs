class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 400;
        this.margin = obj.margin || 15;
        this.barWidth = obj.barWidth || 20;
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        this.data = this.data.map(row => {
            let total = this.yValues.reduce((sum, key) => sum + row[key], 0);
            return {
                ...row,
                ...Object.fromEntries(this.yValues.map(key => [key, (row[key] / total) * 100]))
            };
        });
        
        // For non 100% stacked data. I didn't keep this in because it makes no sense to do with my data I used for 100% stacked.
        // this.maxValue = Math.max(...this.data.map(row => 
        //     this.yValues.reduce((sum, key) => sum + row[key], 0)
        // ));

        // this.scaler = this.chartHeight / this.maxValue;
        this.scaler = this.chartHeight / 100;

        this.axisThickness = obj.axisThickness || -1;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;
        this.axisColour = color(0, 0, 0);

        this.barColours = this.yValues.map((_, i) => {
            if (obj.barColours && obj.barColours[i]) {
                return color(obj.barColours[i]);
            }
            return color(random(100, 250), random(100, 250), random(100, 250));
        });

        this.axisTextColour = color(0, 0, 0);
        this.tickCount = obj.tickCount || 5;
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
        textSize(15);
        textAlign(CENTER, CENTER);
    
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i + this.margin + this.barWidth / 2; // u forgot to enter on bar width
            let yPos = 15;
            
            push();
            translate(xPos, yPos);
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
            text("Song Moods", this.chartWidth / 2, -this.chartHeight - 70);

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
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
    
        let valueIncrement = 100 / this.tickCount;
    
        for (let i = 0; i <= this.tickCount; i++) {
            let yPos = -(this.chartHeight / this.tickCount) * i;
            line(0, yPos, -10, yPos);
            line(0, yPos, this.chartWidth, yPos);
            noFill();
            textAlign(RIGHT, CENTER);
            textSize(10);
            text(valueIncrement * i + "%", -15, yPos);
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
            
            fill(this.barColours[i]);
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
