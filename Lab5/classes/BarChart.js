class BarChart{
    
    constructor(_data, _chartHeight, _chartWidth, _barWidth, _margin, _axisThickness, _chartPosX, _chartPosY){
        this.data = _data;
        this.chartHeight = _chartHeight;
        this.chartWidth = _chartWidth;
        this.barWidth = _barWidth;
        this.margin = _margin;
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin*2))/(this.data.length-1);
        this.scaler = this.chartHeight / (max(this.data) );
        this.axisThickness = _axisThickness;
        this.chartPosX = _chartPosX;
        this.chartPosY = _chartPosY;
        this.axisColour = color(200,200,200);
        this.barColour = color(random(50,200), random(50,200), random(50,200));
        this.axisTextColour = this.barColour;
        
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