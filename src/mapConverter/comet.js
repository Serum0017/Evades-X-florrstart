const { TransObstacle, NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, RotatingTp, PlatformerGrav, MovingSafe, RotatingSafe}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const comet = {
  arena: { width: 1500, height: 2500 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
	playerSpawn: { x: 0, y: 0 },
	name: 'CoMET',
	longName: 'Comet of Mini Extra Tests',
  bgColor: '#9e391c',
  tileColor: '#cc6243',
  difficulty: "Peaceful",
    addedObstacles: [],
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = comet;
obstacles.push(new NormalObstacle(0, 100, 75, 50));
obstacles.push(new CircularNormalObstacle(100, 125, 50));
obstacles.push(new NormalObstacle(130, 240, 70, 50));
obstacles.push(new NormalObstacle(200, 0, 50, 500));
obstacles.push(new NormalObstacle(50, 400, 100, 50));
obstacles.push(new TransObstacle(0, 400, 150, 50, false, 1));
obstacles.push(new WB(0, 520, 1, 50, 100, 150))
obstacles.push(new Lava(0, 650, 300, 50));
obstacles.push(new NormalObstacle(300, 450, 50, 250));
obstacles.push(new Lava(250, 310, 180, 55));
obstacles.push(new Lava(525, 200, 75, 250));
obstacles.push(new Lava(350, 450, 250, 50));
obstacles.push(new Lava(300, 50, 300, 150));
obstacles.push(new WB(750, 0, 50, 50, 100, 200))

obstacles.push(new NormalObstacle(600, 100, 900, 25));
obstacles.push(new NormalObstacle(875, 0, 625, 100));
obstacles.push(new NormalObstacle(850, 0, 25, 350));
obstacles.push(new NormalObstacle(400, 700, 50, 50));
obstacles.push(new NormalObstacle(500, 700, 1000, 50));
obstacles.push(new TransObstacle(450, 700, 50, 50, false, 1));
obstacles.push(new NormalObstacle(0, 800, 600, 50));
obstacles.push(new NormalObstacle(150, 749, 250, 2));

obstacles.push(new Lava(600, 400, 350, 100));
obstacles.push(new Lava(950, 200, 300, 300));
obstacles.push(new Lava(1250, 300, 200, 200));
obstacles.push(new Lava(600, 750, 900, 400, false));

obstacles.push(new CircularNormalObstacle(1375, 175, 60));

obstacles.push(new NormalObstacle(650, 250, 200, 100));

obstacles.push(new CircularNormalObstacle(130, 265, 50));

obstacles.push(new Pusher(1300, 500, 50, 100, 'left', 5, 900));
obstacles.push(new Pusher(900, 600, 50, 100, 'left', 5, 900));

// see renderAbove true
safes.push(new Safe(550, 760, 250, 10, true));
safes.push(new Safe(800, 760, 10, 90, true));
safes.push(new Safe(800, 850, 200, 10, true));
safes.push(new Safe(1000, 820, 200, 10, true));
safes.push(new Safe(1200, 790, 200, 10, true));
safes.push(new Safe(1400, 790, 10, 500, true));
safes.push(new Safe(750, 1000, 0, 200, true));
safes.push(new Safe(450, 1000, 300, 0, true));

obstacles.push(new CircularNormalObstacle(1075, 1225, 100));
obstacles.push(new CircularNormalObstacle(1075, 1425, 60));
obstacles.push(new CircularNormalObstacle(875, 1325, 100));


obstacles.push(new WB(600, 1300, 50, 50, 100, 100))
obstacles.push(new NormalObstacle(650, 1250, 50, 150));
obstacles.push(new NormalObstacle(600, 1150, 50, 150));
obstacles.push(new NormalObstacle(600, 1350, 50, 50));
obstacles.push(new WB(350, 1400, 50, 50, 100, 100))
obstacles.push(new NormalObstacle(300, 900, 50, 600));
obstacles.push(new NormalObstacle(400, 1350, 50, 150));
obstacles.push(new NormalObstacle(350, 1450, 50, 50));
obstacles.push(new NormalObstacle(0, 1500, 1500, 200));
obstacles.push(new Tp(147, 1297, 6, 6, 150, 1700));
obstacles.push(new GravObstacle(0, 1000, 300, 500, 'down', 3500))
obstacles.push(new NormalObstacle(0, 1750, 650, 50));
obstacles.push(new NormalObstacle(600, 1750, 50, 700));
obstacles.push(new NormalObstacle(50, 2400, 550, 50));
obstacles.push(new NormalObstacle(50, 1850, 50, 550));
obstacles.push(new NormalObstacle(100, 1850, 450, 50));
obstacles.push(new NormalObstacle(500, 1900, 50, 450));
obstacles.push(new NormalObstacle(150, 2300, 350, 50));
obstacles.push(new NormalObstacle(150, 1950, 50, 350));
obstacles.push(new NormalObstacle(200, 1950, 250, 50));
obstacles.push(new NormalObstacle(400, 2000, 50, 250));
obstacles.push(new NormalObstacle(250, 2200, 150, 50));
obstacles.push(new Winpad(200, 2000, 200, 200));
obstacles.push(new NormalObstacle(700, 1500, 800, 1000));
obstacles.push(new SizePlayer(0, 1700, 700, 800, 20));
obstacles.push(new Lava(690, 1950, 10, 100));
obstacles.push(new Lava(650, 2250, 10, 100));
obstacles.push(new Lava(400, 2490, 100, 10));
obstacles.push(new Lava(200, 2450, 100, 10));
obstacles.push(new Lava(40, 2300, 10, 10));
obstacles.push(new Lava(0, 2200, 10, 10));
obstacles.push(new Lava(40, 2100, 10, 10));
obstacles.push(new Lava(0, 2000, 10, 10));
obstacles.push(new Lava(40, 1900, 10, 10));
obstacles.push(new Lava(590, 1800, 10, 10));
obstacles.push(new Lava(550, 2000, 10, 20));
obstacles.push(new Lava(590, 2100, 10, 20));

obstacles.push(new Lava(200, 2350, 200, 50, false));
safes.push(new Safe(310, 2390, 150, 10, true))
safes.push(new Safe(140, 2350, 150, 10, true))
obstacles.push(new Lava(100, 2050, 10, 30));
obstacles.push(new Lava(300, 1900, 10, 10));
obstacles.push(new Lava(400, 1940, 10, 10));
obstacles.push(new Lava(450, 2050, 10, 10));
obstacles.push(new Lava(490, 2200, 10, 10));
obstacles.push(new Lava(200, 2285, 15, 15));

obstacles.push(new GravObstacle(450, 1900, 50, 400, 'down', 3500))

module.exports = comet;