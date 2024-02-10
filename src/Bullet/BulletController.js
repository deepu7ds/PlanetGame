import Bullet from "./Bullet";
import Config from "../utils";

const c = new Config();

export default class BulletController {
    bullets = [];
    timeTillNextBullet = 0;
    constructor(earth) {
        this.earth = earth;
    }

    draw() {
        this.bullets.forEach((bullet) => {
            if (this.isBulletOffScreen(bullet)) {
                const index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1)
            }
            this.earth.update()
            if (this.isBulletOnEarth(bullet, this.earth.earthX, this.earth.earthY, this.earth.earthDiameter) && bullet.id === 'player') {
                this.bullets.splice(this.bullets.indexOf(bullet), 1)
            }
            bullet.draw()
        })
    }

    shoot(x, y, speed, damage, delay, theta, id) {
        if (this.timeTillNextBullet <= 0) {
            this.bullets.push(new Bullet(x, y, damage, speed, theta, id));
            this.timeTillNextBullet = delay;
        }
        this.timeTillNextBullet--;
    }

    isBulletOffScreen(bullet) {
        return bullet.bulletX < 0 || bullet.bulletX > c.canvasWidth || bullet.bulletY < 0 || bullet.bulletY > c.canvasHeight;
    }

    isBulletOnEarth(bullet, earthX, earthY, earthDiameter) {
        let distanceToEarth = dist(bullet.bulletX, bullet.bulletY, earthX, earthY);
        return distanceToEarth <= earthDiameter / 2 - 2;
    }

    collidedWith(sprite) {
        return this.bullets.some(bullet => {
            if (bullet.collideWith(sprite)) {
                this.bullets.splice(this.bullets.indexOf(bullet, 1));
                return true;
            }
            return false;
        })
    }
}