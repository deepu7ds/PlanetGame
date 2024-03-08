export default class Zombie {
  constructor(angle, earth) {
    this.zombieX = 0;
    this.zombieY = 0;
    this.theta = radians(angle);
    this.earth = earth;
    this.color = color(255, 0, 0); // Assuming red color for zombie
    this.health = 10; // Assuming initial health for zombie
    this.diameter = 100; // Assuming initial diameter for zombie
    this.id = 1; // Assuming id for zombie
  }

  update() {
    this.zombieX =
      this.earth.earthX +
      (this.earth.earthDiameter / 2 - 10) * Math.cos(this.theta);
    this.zombieY =
      this.earth.earthY +
      (this.earth.earthDiameter / 2 - 10) * Math.sin(this.theta);
    this.earth.damage(0.05);
  }

  draw() {
    fill(this.color);
    push();
    translate(this.zombieX, this.zombieY);
    rotate(this.theta);
    circle(0, 0, this.diameter);
    pop();
  }

  damage(damage) {
    this.health -= damage;
  }
}
