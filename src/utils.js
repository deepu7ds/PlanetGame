export default class Config {
  constructor() {
    this.canvasHeightPercentage = 80;
    this.canvasWidthPercentage = 80;
    this.canvasHeight = (window.innerHeight * this.canvasHeightPercentage) / 100;
    this.canvasWidth = (window.innerWidth * this.canvasWidthPercentage) / 100;
    this.centerX = this.canvasWidth / 2;
    this.centerY = this.canvasHeight / 2;
    this.centerAngle = 0;
  }

  getCanvasHeight() {
    return this.canvasHeight;
  }
  getCanvasWidth() {
    return this.canvasWidth;
  }
  getCenterX(){
    return this.centerX;
  }
  getCenterY(){
    return this.centerY;
  }
  getCenterAngle(){
    return this.centerAngle
  }
  setCanvasHeight(height){
    this.canvasHeight = height; 
  }
  setCanvasWidth(width){
    this.canvasWidth = width;
  }
  setCenterAngle(angle){
    this.centerAngle = angle;
  }
}
