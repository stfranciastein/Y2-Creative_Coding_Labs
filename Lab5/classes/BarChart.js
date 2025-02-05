class BarChart{
    
    constructor(_data, _xValue, _yValue, _chartHeight, _chartWidth, _barWidth, _margin, _axisThickness, _chartPosX, _chartPosY){
        this.data = _data;
        this.xValue = _xValue;
        this.yValue = _yValue;
        this.chartHeight = _chartHeight;
        this.chartWidth = _chartWidth;
        this.barWidth = _barWidth;
        this.margin = _margin;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin*2))/(this.data.length-1);
        this.scaler = this.chartHeight / (max(cleanedData.map(row => row[this.yValue])));
        
        this.axisThickness = _axisThickness;
        this.chartPosX = _chartPosX;
        this.chartPosY = _chartPosY;
        this.axisColour = color(200,200,200);
        this.barColour = color(random(100,255), random(100,255), random(100,255));
        this.axisTextColour = this.barColour;
        
    }

    render(){
        push();
            translate(this.chartPosX, this.chartPosY);
            noFill();
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            line(0,0,0,-this.chartHeight)
            line(0,0,this.chartWidth,0)
            
                push()
                    translate(this.margin, 0)
                        for(let i=0; i<this.data.length; i++){
                            let xPos = (this.barWidth + this.gap) *i;
                            fill(this.barColour);
                            noStroke();
                            rect(xPos,0,this.barWidth,-this.data[i][this.yValue] * this.scaler);
                            
                            fill(this.axisTextColour);
                            noStroke();
                            textAlign(LEFT, CENTER);
                            textSize(10);
                            push();
                            rotate(90);
                            text(this.data[i][this.xValue], 10, -(xPos + (this.barWidth / 2 )));
                            pop();

                        }
                pop()
            pop()
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