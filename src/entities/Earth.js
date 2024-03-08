import Config from '../constants/utils.js';
const c = new Config();

let earthRadiusPercentage = 25;
// let earthMajotAxis = 250;
// let earthMinorAxis = 230;

export default class Earth {
  constructor(earthSprite) {
    this.earthX = 0;
    this.earthY = 0;
    this.earthDiameter = 0;
    this.id = 'earth';
    this.health = 500;
    this.earthSprite = earthSprite;
  }

  update() {
    // perpendicular and base the find tan inverse
    // let a = -(window.mouseX - c.getCenterX());
    // let b = -(window.mouseY - c.getCenterY());
    // let theta = c.getCenterAngle(c.setCenterAngle(Math.atan2(b, a)));
    // this.earthX = c.getCenterX() + earthMajotAxis * Math.cos(theta);
    // this.earthY = c.getCenterY() + earthMinorAxis * Math.sin(theta);

    this.earthX = c.canvasWidth / 2;
    this.earthY = c.canvasHeight / 2;
    this.earthDiameter =
      1.5 * c.getCanvasWidth() * (earthRadiusPercentage / 100);
  }

  draw() {
    imageMode(CENTER);
    image(
      this.earthSprite,
      this.earthX,
      this.earthY,
      this.earthDiameter,
      this.earthDiameter
    );
  }

  damage(damage) {
    this.health -= damage;
    console.log('earth health', this.health);
  }
}
