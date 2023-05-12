const { TransObstacle, NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, RotatingTp, PlatformerGrav, MovingSafe, RotatingSafe, Checkpoint, MovingTpObstacle}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const pos = {
  arena: { width: 3000, height: 3000 },
  enemy: [],
  safes: [],
  texts: [],
  obstacles: [],
  spawns: [],
  playerSpawn: { x: 50, y: 50 },
  name: 'PoS',
  longName: 'Planet of Safezones',
  bgColor: "#7e43cc",
  tileColor: "#a06ce6",
  safeColor: "#000000",
  difficulty: "Moderate",
    addedObstacles: [],
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = pos;
//Zone 1
obstacles.push(new RotatingLava(700, 290, 600, 20, -150, 0, 700, 290, 0, false));
obstacles.push(new NormalObstacle(0, 100, 100, 300));
obstacles.push(new NormalObstacle(200, 0, 100, 400));
safes.push(new Safe(100, 175, 100, 50));
obstacles.push(new MovingLavaObstacle(100, 100, [[100, 0], [100, 300]], 120, 1, collidable=false));
obstacles.push(new MovingLavaObstacle(100, 100, [[0, 400], [300, 400]], 120, 1, collidable=false));
obstacles.push(new MovingSafe(100, 100, [[300, 100], [300, 400]], 120, 0));
obstacles.push(new Lava(0, 500, 400, 100));
obstacles.push(new Lava(300, 200, 100, 50, false));
obstacles.push(new Lava(400, 100, 100, 500));
safes.push(new Safe(750, 0, 100, 50));
obstacles.push(new NormalObstacle(500, 100, 400, 100));
obstacles.push(new Lava(500, 500, 500, 100));
obstacles.push(new Lava(1000, 0, 100, 400));
safes.push(new Safe(900, 150, 100, 50));
safes.push(new Safe(1000, 400, 100, 200));
obstacles.push(new NormalObstacle(1100, 0, 100, 800));
obstacles.push(new Lava(100, 700, 1000, 100));
obstacles.push(new MovingLavaObstacle(100, 100, [[0, 600], [1000, 600]], 600, 1, collidable=false));
obstacles.push(new MovingLavaObstacle(100, 100, [[0, 600], [1000, 600]], 600, 0, collidable=false));
safes.push(new Safe(850, 600, 50, 50));
safes.push(new Safe(700, 650, 50, 50));
safes.push(new Safe(400, 600, 50, 50));
safes.push(new Safe(250, 650, 50, 50));
obstacles.push(new RotatingLava(0, 800, 300, 300, 0, 0));
obstacles.push(new Lava(300, 800, 300, 200));
obstacles.push(new Lava(0, 1100, 600, 100));
safes.push(new Safe(0, 750, 50, 100));
safes.push(new Safe(250, 1050, 100, 50));
obstacles.push(new RotatingSafe(0, 925, 50, 50, -100, 0, 150, 950));
obstacles.push(new RotatingSafe(0, 925, 50, 50, -100, 180, 150, 950));
obstacles.push(new MovingLavaObstacle(200, 200, [[800, 1000], [600, 1000], [600, 800], [800, 800]], 600, 0, collidable=false));
obstacles.push(new MovingLavaObstacle(200, 200, [[800, 1000], [600, 1000], [600, 800], [800, 800]], 600, 2, collidable=false));
obstacles.push(new RotatingSafe(600, 950, 100, 100, -100, 180, 800, 1000));
safes.push(new Safe(550, 1000, 50, 100));

obstacles.push(new RotatingSafe(700, 950, 100, 100, 100, 0, 800, 1000));
obstacles.push(new RotatingSafe(600, 950, 100, 100, -100, 0, 800, 1000));
obstacles.push(new RotatingSafe(700, 950, 100, 100, 100, 180, 800, 1000));
obstacles.push(new NormalObstacle(1000, 800, 200, 400));
obstacles.push(new NormalObstacle(0, 1200, 1200, 300));
obstacles.push(new Tp(775, 975, 50, 50, 25, 1525));

//Zone 2
obstacles.push(new Checkpoint(0, 1500, 100, 100));
obstacles.push(new GravObstacle(100, 1500, 700, 550, 'right', 15000))
obstacles.push(new NormalObstacle(0, 1600, 100, 100))
obstacles.push(new NormalObstacle(200, 1500, 100, 100))
obstacles.push(new Lava(600, 1500, 100, 500));
obstacles.push(new MovingSafe(100, 50, [[500, 1500], [500, 1850]], 200, 0));
obstacles.push(new MovingSafe(50, 50, [[700, 1800], [700, 2000]], 200, 0));
obstacles.push(new MovingSafe(50, 50, [[700, 1750], [700, 1550]], 200, 0));
safes.push(new Safe(700, 1500, 50, 50, true));
safes.push(new Safe(700, 1775, 50, 50, true));
obstacles.push(new NormalObstacle(1000, 1500, 200, 1100))
obstacles.push(new GravObstacle(800, 1550, 200, 550, 'down', 1500))
safes.push(new Safe(900, 1550, 50, 200, true));
safes.push(new Safe(850, 1700, 50, 200, true));
safes.push(new Safe(900, 1850, 50, 200, true));
safes.push(new Safe(950, 2000, 50, 100, true));

obstacles.push(new Lava(800, 1550, 200, 550, false))


safes.push(new Safe(500, 1900, 100, 150, true));
obstacles.push(new Lava(100, 2000, 400, 100));
obstacles.push(new Lava(750, 1550, 50, 500));
obstacles.push(new NormalObstacle(500, 2050, 300, 50));

obstacles.push(new MovingSafe(100, 100, [[700, 2100], [900, 2100], [900, 2300], [700, 2300]], 100, 0));
obstacles.push(new MovingSafe(100, 100, [[700, 2100], [900, 2100], [900, 2300], [700, 2300]], 100, 2));
obstacles.push(new Lava(700, 2200, 300, 100));
obstacles.push(new RotatingLava(847, 2100, 6, 100, 0, 0))
obstacles.push(new RotatingLava(846, 2300, 8, 100, 0, 0))
obstacles.push(new RotatingLava(0, 2100, 700, 300, 0, 0))

obstacles.push(new MovingSafe(100, 100, [[400, 2100], [600, 2100], [600, 2300], [400, 2300]], 100, 1));
obstacles.push(new MovingSafe(100, 100, [[400, 2100], [600, 2100], [600, 2300], [400, 2300]], 100, 3));
obstacles.push(new MovingSafe(100, 100, [[0, 2100], [0, 2300], [200, 2300], [200, 2100]], 100, 1));
obstacles.push(new MovingSafe(100, 100, [[0, 2100], [0, 2300], [200, 2300], [200, 2100]], 100, 3));
obstacles.push(new Lava(100, 2400, 850, 100));
obstacles.push(new NormalObstacle(0, 2600, 1200, 400));
obstacles.push(new MovingLavaObstacle(100, 100, [[0, 2500], [900, 2500]], 1000, 0, collidable=false));
safes.push(new Safe(100, 2500, 50, 100, true));
safes.push(new Safe(500, 2500, 50, 100, true));
safes.push(new Safe(900, 2500, 50, 100, true));
obstacles.push(new MovingTpObstacle(10, 10, [[195, 1795], [195, 1895]], 100, 0, 1225, 2975));


module.exports = pos;