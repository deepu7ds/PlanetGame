import Config from "./utils";

const c = new Config();

let earthRadiusPercentage = 25;
let earthMajotAxis = 250
let earthMinorAxis = 70

export default class Earth{
    
    constructor(){
        this.earthX = 0;
        this.earthY = 0;
        this.earthDiameter = 0;
    }

    update(){
        // perpendicular and base the find tan inverse
        let a = -(window.mouseX - c.getCenterX());
        let b = -(window.mouseY - c.getCenterY());
    
        let theta =  c.getCenterAngle(c.setCenterAngle((Math.atan2(b, a))));
        
        // this.earthX = c.getCenterX() + earthMajotAxis*Math.cos(theta);
        // this.earthY = c.getCenterY() + earthMinorAxis* Math.sin(theta);
        this.earthX = c.canvasWidth/2;
        this.earthY = c.canvasHeight/2
        this.earthDiameter = c.getCanvasWidth() * (earthRadiusPercentage/100);
    }

    draw(){
        fill(30, 144, 255);
        circle(this.earthX, this.earthY, this.earthDiameter)
    }
  }
