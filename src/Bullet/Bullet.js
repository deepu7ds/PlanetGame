import Earth from "../earth";

const e = new Earth();

export default class Bullet {
    constructor(bulletX, bulletY, damage, speed, theta) {
        this.bulletX = bulletX;
        this.bulletY = bulletY;
        this.damage = damage;
        this.speed = speed;
        this.theta = theta;

        this.width = 15;
        this.height = 2;
    }
    draw() {
        fill(240, 248, 255)
        push();
        translate(this.bulletX, this.bulletY)
        rotate(this.theta)
        rect(0, 0, this.width, this.height)
        this.moveBullet();
        pop();
    }

    moveBullet() {
        // Calculate the new position of the bullet
        this.bulletX += this.speed * -cos(this.theta);
        this.bulletY += this.speed * -sin(this.theta);
    }

    collideWith(enemy){
        if( this.bulletX >= enemy.enemyX && this.bulletX <= enemy.enemyX + 30 && this.bulletY >= enemy.enemyY && this.bulletY <= enemy.enemyY + 40){
            enemy.damage(this.damage)
            return true
        }
        return false;
    }
}