import Config from "./utils";

const c = new Config();

let earthRadiusPercentage = 25;
let earthMajotAxis = 250
let earthMinorAxis = 150

export default class Earth{
    
    constructor(){
        this.EarthComponentX = 0;
        this.EarthComponentY = 0;
        this.earthDiameter = 0;
    }

    update(){
      
        // perpendicular and base the find tan inverse
        let a = -(mouseX - c.getCenterX());
        let b = -(mouseY - c.getCenterY());
    
        let theta =  c.getCenterAngle(c.setCenterAngle((Math.atan2(b, a))));
        
        this.EarthComponentX = c.getCenterX() + earthMajotAxis*Math.cos(theta);
        this.EarthComponentY = c.getCenterY() + earthMinorAxis* Math.sin(theta);
      
        this.earthDiameter = c.getCanvasWidth() * (earthRadiusPercentage/100);
    }

    draw(){
        fill(30, 144, 255);
        circle(this.EarthComponentX, this.EarthComponentY, this.earthDiameter)
    }
  }
