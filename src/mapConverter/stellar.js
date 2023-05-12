const { TransObstacle, NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, RotatingTp, PlatformerGrav, MovingSafe, RotatingSafe}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const stellar = {
  arena: { width: 3000, height: 2000 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
	playerSpawn: { x: 50, y: 50 },
	name: 'Stellar',
	longName: 'Stellar System',
  bgColor: '#410259',
  tileColor: '#5d218f',
  difficulty: "Moderate",
    addedObstacles: [],
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = stellar;

obstacles.push(new Portal(900, 500, 100, 'comet but it\'s pain', 'cbip', 'Exhausting', 0.4, '/sounds/drip.mp3'));
obstacles.push(new Portal(2968, 1968, 1, 'Planet of The Hazy Maze', 'PoTHM', 'Peaceful', 0, '/sounds/as darkness falls.mp3'));
obstacles.push(new Portal(2968, 1868, 10, 'Planet of Misdirection', 'PoM', 'Peaceful', undefined, '/sounds/hotel giant interior theme.mp3'));
obstacles.push(new Portal(550, 300, 100, "Planet of Turret Hell", "PoTH", "Exhausting", 0, '/sounds/sapphire waves.mp3'));
obstacles.push(new Portal(250, 300, 100, "Moon of Bouncy Delights", "MoBD", 'Moderate', 0.9, '/sounds/tamacun.mp3'));
obstacles.push(new Portal(450, 600, 100, "Planet of Versatility", "PoV", 'Hardcore', 0, '/sounds/laser-groove.mp3'));
obstacles.push(new Portal(250, 0, 100, "Hub", "Hub", 'Peaceful', undefined, '/sounds/drip.mp3'));
obstacles.push(new Portal(0, 800, 100, 'Planet of Titans', 'PoT', 'Cataclysmic', undefined, '/sounds/egt201.mp3'));

obstacles.push(new NormalObstacle(350, 0, 200, 400))
obstacles.push(new NormalObstacle(550, 0, 450, 300))
obstacles.push(new NormalObstacle(650, 300, 350, 100))
obstacles.push(new NormalObstacle(100, 500, 800, 100))
obstacles.push(new NormalObstacle(750, 400, 250, 100))
obstacles.push(new NormalObstacle(100, 600, 350, 300))
obstacles.push(new NormalObstacle(550, 600, 350, 300))

safes.push(new Safe(550, 600, 350, 300))
safes.push(new Safe(450, 700, 100, 200))
obstacles.push(new Lava(500, 700, 50, 50))
obstacles.push(new Lava(450, 800, 50, 50))

obstacles.push(new Lava(900, 600, 20, 20))
obstacles.push(new Lava(980, 600, 20, 20))
// obstacles.push(new RotatingLava(200, 200, 400, 25, 70, 0, 550, 500))
// obstacles.push(new RotatingLava(200, 200, 400, 25, 70, 90, 550, 500))
// obstacles.push(new RotatingLava(200, 200, 400, 25, 70, 180, 550, 500))
// obstacles.push(new RotatingLava(200, 200, 400, 25, 70, 270, 550, 500))
safes.push(new Safe(0, 0, 100, 100))

spawns.push(new Spawner(0, 400, 751, 101, { x: 700, y: 450, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 5, pRadius: 49, pSpeed: 200, shootDirections: [Math.PI]}));

// obstacles.push(new RotatingLava(150, 0, 50, 400, 200, 0, undefined, undefined, 0, false))

module.exports = stellar;