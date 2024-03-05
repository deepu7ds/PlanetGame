import Config from '../../constants/utils';
import Asteroid from './Asteroid';
const c = new Config();
// Class definition for AsteroidController
export default class AsteroidController {
  constructor(asteroidSprite) {
    this.asteroidSprite = asteroidSprite;
    this.asteroids = [];
    this.numAsteroids = 5;
    this.edgePositions = [
      { x: 0, y: Math.random() * c.canvasHeight }, // Left edge
      { x: c.canvasWidth, y: Math.random() * c.canvasHeight }, // Right edge
      { x: Math.random() * c.canvasWidth, y: 0 }, // Top edge
      { x: Math.random() * c.canvasWidth, y: c.canvasHeight }, // Bottom edge
    ];
  }

  draw() {
    for (let asteroid of this.asteroids) {
      asteroid.update();
      asteroid.display();
    }
  }

  update() {
    // Randomly select positions from the edgePositions array and create asteroids
    for (let i = this.asteroids.length; i < this.numAsteroids; i++) {
      const edgeIndex = Math.floor(Math.random() * this.edgePositions.length);
      const edgePosition = this.edgePositions[edgeIndex];
      this.asteroids.push(
        new Asteroid(edgePosition.x, edgePosition.y, 10, this.asteroidSprite)
      );
    }
  }
  collideWith(sprite) {
    return this.asteroids.some((asteroid) => {
      if (asteroid.collidesWith(sprite)) {
        this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
        return true;
      }
      return false;
    });
  }
}
