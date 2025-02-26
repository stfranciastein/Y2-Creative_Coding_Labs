class HorizontalBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 400;
        this.barHeight = obj.barHeight || 10;
        this.margin = obj.margin || 15;
        
        this.gap = (this.chartHeight - (this.data.length * this.barHeight) - (this.margin * 2)) / (this.data.length - 1);
        this.scaler = this.chartWidth / Math.max(...this.data.map(row => row[this.yValue]));
        
        this.axisThickness = obj.axisThickness || -1;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 450;
        this.axisColour = color(0, 0, 0);
        this.barColour = obj.barColour || color(random(100, 250), random(100, 250), random(100, 250));
        this.axisTextColour = color(0, 0, 0);

        // Customizable Tick Count
        this.tickCount = obj.tickCount || 5;
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        
        for (let i = 0; i < this.data.length; i++) {
            let value = this.data[i][this.yValue];
            let barWidth = value * this.scaler;
            let yPos = -i * (this.barHeight + this.gap);

            fill(this.barColour);
            rect(0, yPos, barWidth, -this.barHeight);
        }

        pop();
    }

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        
        // Y-axis
        line(0, 0, 0, -this.chartHeight);
        // X-axis
        line(0, 0, this.chartWidth, 0);
        
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        for (let i = 0; i < this.data.length; i++) {
            let yPos = -i * (this.barHeight + this.gap);
            
            fill(this.axisTextColour);
            noStroke();
            textAlign(RIGHT, CENTER);
            textSize(10);
            text(this.data[i][this.xValue], -10, yPos - this.barHeight / 2);
        }
        
        pop();
    }

    renderChartLabel() {
        push();
            fill(0, 0, 0);
            translate(this.chartPosX, this.chartPosY);
            textAlign(CENTER);
            textSize(20);
            textStyle(BOLD);
                
            //Chart Title (It's hard to not hardcode this)
            text("Songs Released Between 1950-2019", this.chartWidth / 2, -this.chartHeight - 40);
        
            // X-Axis Label
            textSize(15);
            text("Total Songs", this.chartWidth / 2, 60);
        
            // Y-Axis Label
            push();
                translate(-90, -this.chartHeight / 2);
                rotate(-90);
                text("Years Grouped", 0, 0);
            pop();
            textStyle(NORMAL);
        pop();
    }
    
    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        
        let maxValue = Math.max(...this.data.map(row => row[this.yValue]));
        let roundedMax = Math.ceil(maxValue / 10) * 10;

        let tickIncrement = this.chartWidth / this.tickCount;
        let valueIncrement = Math.ceil(roundedMax / this.tickCount / 10) * 10;

        for (let i = 0; i <= this.tickCount; i++) {
            let xPos = tickIncrement * i;

            line(xPos, 0, xPos, -this.chartHeight);
            line(xPos, 0, xPos, 10);

            textAlign(CENTER, TOP);
            textSize(10);
            text((valueIncrement * i).toFixed(0), xPos, 15);
        }

        pop();
    }
}
