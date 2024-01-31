// Global Constants
const SCREEN_WIDTH = 1000;
const SCREEN_HEIGHT = 1000;


const COLORS = {
  DEFAULT: [255, 255, 255],
};

class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 50;
    this.color = [0, 0, 0];
  }

  update(deltaTime) {
    this.x = this.x + this.dx * deltaTime;
    this.y = this.y + this.dy * deltaTime
  }

  draw() {
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    color(COLORS.DEFAULT);
  }
};

class Player extends GameObject {
  constructor(x, y, radius) {
    // Call the super function
    super(x, y);
    // The radius from the planet
    this.radius = radius;

    // The angular speed of the player
    this.omega = 0;

    // Acceleration of the player
    this.alpha = 10;

    // Define the color
    this.color = COLORS.DEFAULT;
    this.size = 50;
  }

  input(keyCode) {
    if(keyCode == LEFT_ARROW) {
      this.omega += this.alpha * deltaTime;
    }
    if(keyCode == RIGHT_ARROW) {
      this.omega -= this.alpha * deltaTime;
    }
  }

  update(deltaTime) {
  
    // this.x = this.radius * (Math.sin(this.omega) * deltaTime);
    // this.y = this.radius * (Math.cos(this.omega) * deltaTime);


    super.update(deltaTime);
  }

  draw() {
    fill(this.color);
    super.draw();
  }
};

class Planet extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.color = [241, 0, 244];
    this.size = 125;
  }

  update(deltaTime) {
    super.update(deltaTime);
  }

  draw() {
    fill(this.color);
    super.draw();
  }
};



// Global definitions
const player = new Player(SCREEN_WIDTH/2, (SCREEN_HEIGHT/2)-200, 200);

// Planet
const planet = new Planet(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);


function setup() {

  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

  frameRate(60);
}

function update(deltaTime) {
  player.update(deltaTime);
}

function draw() {
  update(deltaTime);

  background(0);

  planet.draw();
  player.draw();
}

function keyReleased() {
  player.input(keyCode);
}
