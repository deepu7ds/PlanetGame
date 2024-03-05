export default class Config {
  constructor() {
    this.canvasHeightPercentage = 80;
    this.canvasWidthPercentage = 80;

    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.centerX = 0;
    this.centerY = 0;

    this.centerAngle = 0;
    this.zoomFactor = 1;

    // Initialize the canvas
    this.initCanvas();

    console.log(this.centerX);
  }

  getCanvasHeight() {
    return this.canvasHeight;
  }

  initCanvas() {
    this.canvasHeight =
      (window.innerHeight * this.canvasHeightPercentage) / 100;
    this.canvasWidth = (window.innerWidth * this.canvasWidthPercentage) / 100;

    this.centerX = this.canvasWidth / 2;
    this.centerY = this.canvasHeight / 2;
  }

  getCanvasWidth() {
    return this.canvasWidth;
  }
  getCenterX() {
    return this.centerX;
  }
  getCenterY() {
    return this.centerY;
  }
  getCenterAngle() {
    return this.centerAngle;
  }
  setCanvasHeight(height) {
    this.canvasHeight = height;
  }
  setCanvasWidth(width) {
    this.canvasWidth = width;
  }
  setCenterAngle(angle) {
    this.centerAngle = angle;
  }
  setZoomFactor(zoomFactor) {
    this.zoomFactor = zoomFactor;
  }
}
