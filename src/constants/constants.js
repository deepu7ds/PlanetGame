// The constants for out game
const constants = {
  CANVAS: {
    WIDTH_PERCENTAGE: 80,
    HEIGHT_PERCENTAGE: 80,
    CENTER_ANGLE: 0,
  },

  PLAYER: {
    HEALTH: 50,
    SIZE: 30,
    ORBITAL_DISTANCE: 140,
    BULLET: {
      SPEED: 5,
      HIT: 5,
      DELAY: 10,
      SHOOT_CODE: 32, // For space
    },
  },

  ENEMY: {
    HEALTH: 10,
    SIZE: 40,
    BULLET: {
      SPEED: 15,
      HIT: 10,
      DELAY: 50,
      SHOOT_RANGE_DEGREES: 10,
    },
  },

  EARTH: {
    RADIUS_PERCENTAGE: 25,
  },

  ENTITIY: {
    BULLET: {
      WIDTH: 15,
      HEIGHT: 2,
    },
  },

  ID: {
    PLAYER: 0,
    ENEMY: 1,
    EARTH: 2,
  },
};

// Set calculated parameters
(constants.CANVAS.WIDTH =
  (window.innerWidth * constants.CANVAS.WIDTH_PERCENTAGE) / 100),
  (constants.CANVAS.HEIGHT =
    (window.innerHeight * constants.CANVAS.HEIGHT_PERCENTAGE) / 100),
  (constants.CANVAS.CENTER_X = constants.CANVAS.WIDTH / 2);
constants.CANVAS.CENTER_Y = constants.CANVAS.HEIGHT / 2;

// Make setters
constants.CANVAS.setCanvasHeight = (height) => {
  constants.CANVAS.HEIGHT = height;
  constants.CANVAS.CENTER_Y = height / 2;
};
constants.CANVAS.setCanvasWidth = (width) => {
  constants.CANVAS.WIDTH = width;
  constants.CANVAS.CENTER_X = width / 2;
};
constants.CANVAS.setCenterAngle = (angle) => {
  constants.CANVAS.CENTER_ANGLE = angle;
};

// Export the constants
export default constants;
