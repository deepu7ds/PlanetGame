import Bullet from './Bullet';
import Config from '../../constants/utils';

const c = new Config();

export default class BulletController {
  constructor(earth, enemyBulletSprite, playerBulletSprite) {
    this.bullets = [];
    this.timeTillNextEnemyBullet = 0;
    this.timeTillNextPlayerBullet = 0;
    this.earth = earth;
    this.enemyBulletSprite = enemyBulletSprite;
    this.playerBulletSprite = playerBulletSprite;
  }

  draw() {
    this.bullets.forEach((bullet) => {
      if (this.isBulletOffScreen(bullet)) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      this.earth.update();
      if (
        this.isBulletOnEarth(
          bullet,
          this.earth.earthX,
          this.earth.earthY,
          this.earth.earthDiameter
        ) &&
        bullet.id === 'player'
      ) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
      }
      bullet.draw();
    });
  }

  shoot(x, y, speed, damage, delay, theta, id) {
    if (this.timeTillNextEnemyBullet <= 0 && id === 'enemy') {
      this.bullets.push(
        new Bullet(
          x,
          y,
          damage,
          speed,
          theta,
          id,
          this.enemyBulletSprite,
          this.playerBulletSprite
        )
      );
      this.timeTillNextEnemyBullet = delay;
    }

    if (this.timeTillNextPlayerBullet <= 0 && id === 'player') {
      this.bullets.push(
        new Bullet(
          x,
          y,
          damage,
          speed,
          theta,
          id,
          this.enemyBulletSprite,
          this.playerBulletSprite
        )
      );
      this.timeTillNextPlayerBullet = delay;
    }

    this.timeTillNextEnemyBullet = Math.max(
      0,
      this.timeTillNextEnemyBullet - 1
    );
    this.timeTillNextPlayerBullet = Math.max(
      0,
      this.timeTillNextPlayerBullet - 1
    );
  }

  isBulletOffScreen(bullet) {
    return (
      bullet.bulletX < -c.canvasWidth ||
      bullet.bulletX > c.canvasWidth * 4 ||
      bullet.bulletY < -c.canvasHeight ||
      bullet.bulletY > c.canvasHeight * 4
    );
  }

  isBulletOnEarth(bullet, earthX, earthY, earthDiameter) {
    let distanceToEarth = dist(bullet.bulletX, bullet.bulletY, earthX, earthY);
    return distanceToEarth <= earthDiameter / 2;
  }

  collidedWith(sprite) {
    return this.bullets.some((bullet) => {
      if (bullet.collideWith(sprite)) {
        this.bullets.splice(this.bullets.indexOf(bullet, 1));
        return true;
      }
      return false;
    });
  }
}
