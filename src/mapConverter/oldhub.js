const { TransObstacle, NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle, RotatingNormal,
	Lava, RotatingLava,CircularLavaObstacle, SpeedObstacle, GravObstacle,Air, Polygon,
	Tp, MovingObstacle, StoryDisplay, Pusher, Camera,Pushbox,Deathcure,CircularSafeObstacle, Zone, Deathmark, MovingLavaObstacle, CircularCoin, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, RotatingTp, PlatformerGrav, MovingSafe, RotatingSafe, BreakableObstacle, SwitchLava, SwitchObstacle, TimeTrap, InvincibilityPowerup, Filter, Particles, MovingSpeedTrap, RotatingSpeedTrap, DeadMove, Revive, DrawObstacle, Clone, Ship, CoinDoor, MusicChange, Redirect, CookieCheck, Typing, RevivePowerup, Raycasting, Spring, CircularSnap, IDIT, CameraChange, Gun, Mashing, Golf, Zoom, RestrictAxis, Custom, FallingArrow, CircularHollowObstacle, SwitchGrav, Door, Button, CircularDoor, ReusableButton, TimeButton, TimeTrapButton, LavaDoor, Invert, DragonPowerup, PlayerCollide, CrowdButton, Hole, GunslingerPowerup, AmogusPowerup, Demo, EnemyButton, CircularSliceObstacle, CircularHollowSlice, RoundedCorners, RoundedLava, GrapplePowerup, GrapplePoint, CircularHollowLava, CircularLavaSlice, CircularHollowLavaSlice, ResetCoins, Coin, Bezier, BoxButton, RotatingPause, RotatingLavaPause, MovingPause, MovingLavaPause }= require("./!conversionClasses.js");
// const Npc = require('../npc.js');
// const Spawner = require('../spawner.js');
// const Safe = require('../safe.js');
// const Text = require('../text.js');

class Npc{
  constructor(){

  }
};
class Spawner{
  constructor(){

  }
};
class Safe{
  constructor(){

  }
};
class Text{
  constructor(){

  }
};

const hub = {
  arena: { width: 4000, height: 2000 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
    npcs: [],
	spawns: [],
	playerSpawn: { x: 25, y: 25 },
	name: 'Oldhub',
	longName: 'Oldhub',
    bgColor: '#1f2229',
    tileColor: '#323645',
    difficulty: "Peaceful",
    addedObstacles: [],
}

hub.obstacles = [
  new MovingObstacle(150, 150, [[0,550],[400,550],[400,850],[0,850]],300,0),
  new MovingObstacle(150, 150, [[0,550],[0,850],[400,850],[400,550]],300,1),
  new NormalObstacle(262, 362, 75, 75, 30),
  new NormalObstacle(262, 362, 75, 75, 30), // Normal at beginning is back :D
  new BouncyObstacle(462, 362, 75, 75, 30),
  new CircularNormalObstacle(700, 400, 35),
  new CircularBouncyObstacle(900, 400, 35, 30),
  new Lava(1050, 362, 75, 75),
  new RotatingLava(1200, 375, 75, 15, 90),
  new GravObstacle(1300, 0, 200, 150, 'down', 5000),
  new GravObstacle(1300, 150, 200, 150, 'right', 5000),
  new GravObstacle(1500, 0, 200, 150, 'left', 5000),
  new GravObstacle(1500, 150, 200, 150, 'up', 5000),
  new NormalObstacle(0, 500, 1750, 50),
  new NormalObstacle(1750, 50, 50, 500),
  new NormalObstacle(2500, 0, 50, 1000),
  new NormalObstacle(250, 1000, 2300, 50),
  new NormalObstacle(1800, 500, 300, 50),
  // Conveyor + enemies Section
  // we have from (600,550) to (1800,1000)
  new GravObstacle(600, 550, 200, 150, 'right', 1250),
  new GravObstacle(800, 550, 200, 150, 'up', 1250),
  new GravObstacle(1000, 550, 200, 150, 'down', 1250),
  new GravObstacle(1200, 550, 200, 150, 'left', 1250),
  new GravObstacle(1400, 550, 200, 150, 'right', 1250),
  new GravObstacle(1600, 550, 200, 150, 'up', 1250),
  new GravObstacle(1800, 550, 200, 150, 'down', 1250),

  new GravObstacle(600, 700, 200, 150, 'down', 1250),
  new GravObstacle(800, 700, 200, 150, 'left', 1250),
  new GravObstacle(1000, 700, 200, 150, 'right', 1250),
  new GravObstacle(1200, 700, 200, 150, 'up', 1250),
  new GravObstacle(1400, 700, 200, 150, 'down', 1250),
  new GravObstacle(1600, 700, 200, 150, 'left', 1250),
  new GravObstacle(1800, 700, 200, 150, 'right', 1250),

  new GravObstacle(600, 850, 200, 150, 'left', 1250),
  new GravObstacle(800, 850, 200, 150, 'right', 1250),
  new GravObstacle(1000, 850, 200, 150, 'up', 1250),
  new GravObstacle(1200, 850, 200, 150, 'down', 1250),
  new GravObstacle(1400, 850, 200, 150, 'left', 1250),
  new GravObstacle(1600, 850, 200, 150, 'right', 1250),
  new GravObstacle(1800, 850, 200, 150, 'up', 1250),

  new NormalObstacle(550, 550, 50, 400),
  new NormalObstacle(2000, 600, 24, 400),

  new NormalObstacle(1800 + 400, 500, 300, 50),
  new Lava(1800 + 275, 550, 25, 150),
  new Lava(1800 + 300, 635, 250, 15),
  new RotatingLava(1800 + 550, 650, 150, 10, 90, 0),
  new RotatingLava(1800 + 550, 800, 150, 10, -90, 0),
  new RotatingLava(1800 + 550, 950, 150, 10, 90, 0),
  new Lava(1800 + 300 + 240, 635, 10, 250),
  new Lava(1800 + 350, 750, 10, 250),
  new SpeedObstacle(0, 450, 1750, 50),

  // Haha-inspired lava section
  new RotatingLava(300, 1500, 350, 10, 180, 0),
  new RotatingLava(500, 1500, 350, 10, -180, 0),
  new RotatingLava(700, 1500, 350, 10, 180, 0),
  new RotatingLava(900, 1500, 350, 10, -180, 0),
  new RotatingLava(300, 1200, 350, 10, 180, 0),
  new RotatingLava(500, 1200, 350, 10, -180, 0),
  new RotatingLava(700, 1200, 350, 10, 180, 0),
  new RotatingLava(900, 1200, 350, 10, -180, 0),

  new RotatingLava(1400, 1250, 500, 10, -90, 0),
  new RotatingLava(1400, 1250, 500, 10, -90, 15),
  new RotatingLava(1400, 1250, 500, 10, -90, 30),
  new RotatingLava(1400, 1250, 500, 10, -90, 45),
  new RotatingLava(1400, 1250, 500, 10, -90, 105),
  new RotatingLava(1400, 1250, 500, 10, -90, 120),
  new RotatingLava(1400, 1250, 500, 10, -90, 135),

  new RotatingLava(2000, 1250, 500, 10, 60, 90),
  new RotatingLava(2000, 1250, 500, 10, -60, 90),

  new Lava(2200, 1450, 150, 50),
  new Lava(2200, 1050, 150, 50),

  new Coin(2225, 1225,50,50),

  // Tp to lava section
  new Tp(250, 0, 50, 50, 2000, 1500),

  // Conveyor Section
  new GravObstacle(2600, 0, 250, 1500, 'up', 5250),
  new Tp(2850, 350, 50, 1150, 2500, 1500),
  new NormalObstacle(2850, 50, 50, 300),
  new Tp(2550, 0, 50, 1400, 2500, 1500),
  // Obstacles on track
  new Tp(2750, 1200, 100, 50, 2500, 1500),
  new Tp(2600, 1050, 100, 50, 2500, 1500),
  new Tp(2750, 900, 100, 50, 2500, 1500),
  new Tp(2600, 750, 100, 50, 2500, 1500),
  new Tp(2750, 600, 100, 50, 2500, 1500),
  new Tp(2700, 450, 150, 50, 2500, 1500),
  new Tp(2600, 250, 150, 50, 2500, 1500),
  new Tp(2600, 0, 200, 50, 2500, 1500),
  new Coin(2850, 0,50,50),

  // Bouncy Section
  new NormalObstacle(0, 1500, 3900, 200),
  new SpeedObstacle(300, 1700, 3600, 300),
  new GravObstacle(300, 1700, 3600, 300, 'left', 8000),
  new BouncyObstacle(300, 1700, 3600, 50, 100),
  new BouncyObstacle(300, 1950, 3600, 50, 100),

  new CircularBouncyObstacle(350, 1750, 45, 80),
  new CircularBouncyObstacle(350, 1950, 45, 80),

  new CircularBouncyObstacle(600, 1750, 45, 80),
  new CircularBouncyObstacle(600, 1850, 45, 80),

  new CircularBouncyObstacle(900, 1850, 45, 80),
  new CircularBouncyObstacle(900, 1950, 45, 80),

  new CircularBouncyObstacle(900, 1850, 15, 80),
  new CircularBouncyObstacle(900, 1950, 15, 80),
  new CircularBouncyObstacle(1100, 1800, 15, 80),
  new CircularBouncyObstacle(1100, 1900, 15, 80),

  new CircularBouncyObstacle(1300, 1750, 15, 80),
  new CircularBouncyObstacle(1300, 1850, 15, 80),
  new CircularBouncyObstacle(1300, 1950, 15, 80),
  new CircularBouncyObstacle(1500, 1800, 15, 80),
  new CircularBouncyObstacle(1500, 1900, 15, 80),

  new BouncyObstacle(1800, 1750, 50, 40, 80),
  new BouncyObstacle(1800, 1900, 50, 40, 80),

  new BouncyObstacle(2100, 1810, 50, 40, 80),
  new BouncyObstacle(2100, 1850, 50, 40, 80),
  new BouncyObstacle(2100, 1900, 50, 40, 80),

  new BouncyObstacle(2400, 1750, 50, 40, 80),
  new BouncyObstacle(2400, 1800, 50, 40, 80),
  new BouncyObstacle(2400, 1850, 50, 40, 80),

  new BouncyObstacle(2700, 1750, 50, 40, 80),
  new BouncyObstacle(2700, 1800, 50, 40, 80),
  new BouncyObstacle(2700, 1900, 50, 40, 80),

  new BouncyObstacle(3000, 1750, 50, 40, 80),
  new BouncyObstacle(3000, 1850, 50, 40, 80),
  new BouncyObstacle(3000, 1900, 50, 40, 80),

  new BouncyObstacle(3300, 1850, 100, 100, 40),
  new CircularBouncyObstacle(3600, 1800, 50, 40),
];

hub.texts = [
  new Text(100, -25, 'Sandbox'),
  new Text(2750, 1450, 'Hold Down Arrow Key'),
  new Text(150, 1850, 'Finish!'),
]
hub.safes = [
  new Safe(1250, 1050, 100, 450),
  new Safe(0, 0, 250, 450),
  new Safe(1700, 0, 50, 450),
  new Safe(1750, 0, 50, 50),
  new Safe(2100, 500, 100, 50),
  new Safe(2350, 1450, 250, 50),
  new Safe(3900, 1500, 100, 500),
  new Safe(0, 1700, 300, 300),
]

hub.spawns = [
  // was originally normal enemies
  new Spawner(250, 0, 200, 350/2, { type: 'gaura', amount: 2, radius: 80, speed: 100, auraStrength: -3, }),
  new Spawner(250, 350/2, 200, 350, { type: 'gaura', amount: 2, radius: 80, speed: 100, auraStrength: 3, }),
  new Spawner(1150, 0, 100, 300, { type: 'normal', amount: 3, radius: 40, speed: 100 }),
  new Spawner(500, 0, 200, 350, { type: 'square', amount: 3, size: 60, speed: 100 }),
  new Spawner(750, 0, 200, 350, { type: 'switch', amount: 3, radius: 30, speed: 100, time: 1 }),
  new Spawner(1000, 0, 200, 350, { type: 'tp', amount: 3, radius: 30, speed: 100, time: 2 }),
  new Spawner(1800, 0, 700, 500, { type: 'square', amount: 5, size: 40, speed: 150 }),
  new Spawner(1800, 0, 700, 500, { type: 'tp', amount: 3, time: 0.75, radius: 35, speed: 300 }),
  new Spawner(1800 + 350, 750, 200, 200, { type: 'switch', amount: 1, radius: 99, speed: 0, time: 0.9 }),
  new Spawner(2600, 50, 150, 200, { type: 'dasher', amount: 10, radius: 20, speed: 125 }),
  new Spawner(1200, 300, 50, 50, { type: 'dasher', amount: 3, radius: 10, speed: 100 }),
  new Spawner(600, 550, 1400, 450, { type: 'square', amount: 6, size: 75, speed: 100 }),
  new Spawner(0, 550, 550, 450, { type: 'square', amount: 1, size: 200, speed: 175 }),
  new Spawner(2900, 0, 1100, 300, { type: 'normal', amount: 9, radius: 32, speed: 150 }),
  new Spawner(2900, 300, 1100, 300, { type: 'square', amount: 8, size: 70, speed: 175 }),
  new Spawner(2900, 600, 1100, 300, { type: 'switch', amount: 10, radius: 40, speed: 125 }),
  new Spawner(2900, 900, 1100, 300, { type: 'tp', amount: 16, time: 0.5, radius: 10, speed: 100 }),
  new Spawner(2900, 1200, 1100, 300, { type: 'dasher', amount: 6, radius: 15, speed: 225 }),
  new Spawner(300, 1700, 3600, 300, { type: 'gaura', amount: 5, radius: 40, speed: 250, auraStrength: -5, }),
];

module.exports = hub;