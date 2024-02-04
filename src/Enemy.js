import Config from "./utils";

const c = new Config();

export default class Enemy {

    constructor(angle, earth) {
        this.enemyX = 0;
        this.enemyY = 0;
        this.angle = angle;
        this.theta = 0;
        this.earth = earth;

        this.health = 10;
    }

    update() {
        this.theta = radians(this.angle);
        this.enemyX = this.earth.earthX + (this.earth.earthDiameter / 2) * Math.cos(this.theta);
        this.enemyY = this.earth.earthY + (this.earth.earthDiameter / 2) * Math.sin(this.theta);    
    }
    
    draw() {
        fill(240, 248, 255);
        push();
        translate(this.enemyX, this.enemyY);
        rotate(this.theta);
        rect(0, 0, 30, 40);
        pop();
    }

    damage(damage){
        stroke(2, 5 ,5)
        this.health -= damage;
    }
}
