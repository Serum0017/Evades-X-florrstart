// not going to be in uni 1, just temporary

const { TransObstacle, NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, RotatingTp, PlatformerGrav, MovingSafe, RotatingSafe}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const cbip = {
  arena: { width: 1500, height: 2500 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
	playerSpawn: { x: 0, y: 0 },
	name: 'cbip',
	longName: 'comet but it\'s pain',
  bgColor: '#913153',
  tileColor: '#ed5187',
  difficulty: "Exhausting",
  addedObstacles: [],
}
let { texts, obstacles, safes, spawns, playerSpawn, arena } = cbip;

obstacles.push(new NormalObstacle(0, 100, 75, 50));
obstacles.push(new CircularNormalObstacle(100, 125, 50));
obstacles.push(new NormalObstacle(130, 240, 70, 50));
obstacles.push(new NormalObstacle(200, 0, 50, 650));
obstacles.push(new NormalObstacle(50, 400, 100, 50));
obstacles.push(new TransObstacle(0, 400, 150, 50, false, 1));
obstacles.push(new WB(0, 520, 1, 50, 100, 250))
obstacles.push(new Lava(0, 650, 300, 50));
obstacles.push(new NormalObstacle(300, 450, 50, 250));
obstacles.push(new Lava(250, 280, 180, 115));
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
obstacles.push(new RotatingLava(600, 750, 900, 400, 0, 0));

obstacles.push(new CircularNormalObstacle(1375, 175, 60));

obstacles.push(new NormalObstacle(650, 250, 200, 100));

obstacles.push(new GrowingCircleLavaObstacle(1375, 175, 60, 110, 50));

obstacles.push(new Pusher(1300, 500, 50, 100, 'left', 5, 900));
obstacles.push(new Pusher(900, 600, 50, 100, 'left', 5, 900));

safes.push(new Safe(550, 760, 250, 10));
safes.push(new Safe(800, 760, 10, 90));
safes.push(new Safe(800, 850, 200, 10));
safes.push(new Safe(1000, 820, 200, 10));
safes.push(new Safe(1200, 790, 200, 10));
safes.push(new Safe(1400, 790, 10, 500));
safes.push(new Safe(750, 1000, 0, 200));
safes.push(new Safe(450, 1000, 300, 0));

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
obstacles.push(new RotatingLava(200, 2350, 200, 50, 0, 0));
safes.push(new Safe(310, 2390, 150, 10))
safes.push(new Safe(140, 2350, 150, 10))
obstacles.push(new Lava(100, 2050, 10, 30));
obstacles.push(new Lava(300, 1900, 10, 10));
obstacles.push(new Lava(400, 1940, 10, 10));
obstacles.push(new Lava(450, 2050, 10, 10));
obstacles.push(new Lava(490, 2200, 10, 10));
obstacles.push(new Lava(200, 2285, 15, 15));

obstacles.push(new GravObstacle(450, 1900, 50, 400, 'down', 3500))


//buff

obstacles.push(new Lava(100, 0, 10, 5));
obstacles.push(new Lava(100, 65, 10, 10));
obstacles.push(new Lava(140, 80, 10, 10));
obstacles.push(new Lava(185, 15, 10, 10));
obstacles.push(new Lava(140, 150, 10, 10));
obstacles.push(new Lava(0, 245, 15, 10));
obstacles.push(new Lava(75, 245, 10, 10));
obstacles.push(new Lava(0, 280, 5, 10));
obstacles.push(new Lava(65, 280, 10, 10));
obstacles.push(new Lava(100, 300, 10, 20));
obstacles.push(new Lava(100, 380, 10, 20));
obstacles.push(new Lava(120, 300, 10, 20));
obstacles.push(new Lava(120, 380, 10, 20));
obstacles.push(new Lava(140, 300, 10, 20));
obstacles.push(new Lava(140, 380, 10, 20));

obstacles.push(new Lava(440, 260, 10, 20));
obstacles.push(new Lava(340, 200, 10, 20));
obstacles.push(new Lava(260, 260, 10, 10));
obstacles.push(new Lava(250, 0, 10, 10));
obstacles.push(new Lava(640, 0, 10, 10));
obstacles.push(new Lava(680, 40, 10, 10));
obstacles.push(new Lava(800, 0, 50, 100));
obstacles.push(new Lava(780, 100, 50, 150));
obstacles.push(new Lava(655, 180, 70, 100));
obstacles.push(new Lava(875, 330, 15, 10));
obstacles.push(new Lava(935, 230, 15, 10));
obstacles.push(new Lava(875, 130, 15, 10));
obstacles.push(new Lava(1000, 125, 100, 15));
obstacles.push(new Lava(1150, 185, 100, 15));

spawns.push(new Spawner(450, 500, 800, 200, { x: 950, y: 600, type: 'turret', amount: 1, radius: 24, speed: 0, shootSpeed: 0.15, pRadius: 10, pSpeed: 140, shootDirections: [Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0]}));
obstacles.push(new SizePlayer(450,500,800,200,10));

spawns.push(new Spawner(450, 500, 800, 200, { x: 950, y: 600, type: 'turret', amount: 1, radius: 24, speed: 0, shootSpeed: 0.15, pRadius: 10, pSpeed: 140, shootDirections: [Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0,Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10]}));
/*spawns.push(new Spawner(350, 500, 1150, 200, { x: 950, y: 600, type: 'turret', amount: 1, radius: 24, speed: 0, shootSpeed: 0.1, pRadius: 20, pSpeed: 80, shootDirections: [Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0,Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10]));*/

module.exports = cbip;