const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,BreakableObstacle,
	Lava, RotatingLava, SpeedObstacle,MovingTpObstacle, GravObstacle,
	 MovingSafe, RotatingSafe,
	Tp, MovingObstacle, StoryDisplay, Pusher, TransObstacle, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const poss = {
  arena: { width: 2000, height: 5000 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
	playerSpawn: { x: 100, y: 75 },
	name: 'PoSS',
	longName: 'Planet of Slight Sadness',
  bgColor: '#1a1a1a', //'#B8860B',
  tileColor: '#454545', //'#CC9900',
  difficulty: "Moderate",
    addedObstacles: [],
}
let { texts, obstacles, safes, spawns, playerSpawn, arena } = poss;


// (for zone 2 rotating) layering
obstacles.push(new RotatingLava(1550, 1525, 250, 25, 0, 140));
obstacles.push(new RotatingLava(1550, 1275, 250, 25, 0, 40));


// ZONE 1
texts.push(new Text(100, -25, 'Sorrow'))


obstacles.push(new RotatingLava(495 - 300/2, 175 - 20/2, 300, 20, 90, 0))
obstacles.push(new RotatingLava(150 - 300/2, 375 - 20/2, 300, 20, -90, 0))

obstacles.push(new NormalObstacle(0, 150, 400, 50));
obstacles.push(new NormalObstacle(200, 0, 50, 100));
obstacles.push(new NormalObstacle(300, 50, 50, 100))
obstacles.push(new CircularNormalObstacle(495, 175, 105));
obstacles.push(new NormalObstacle(650, 0, 50, 400));
obstacles.push(new NormalObstacle(245, 350, 405, 50));
obstacles.push(new CircularNormalObstacle(150, 375, 100));
obstacles.push(new NormalObstacle(300, 250, 50, 100));
obstacles.push(new NormalObstacle(50, 375, 50, 325));
obstacles.push(new NormalObstacle(0, 750, 2000, 50));
obstacles.push(new NormalObstacle(100, 650, 1850, 50));
obstacles.push(new GravObstacle(0, 700, 1950, 50, 'right', 1500))
obstacles.push(new NormalObstacle(1925, 50, 25, 600));
obstacles.push(new GravObstacle(1950, 50, 50, 700, 'up', 1500))
obstacles.push(new GravObstacle(1600, 0, 400, 50, 'left', 1500));
obstacles.push(new NormalObstacle(0, 1200, 2000, 25));
obstacles.push(new SizePlayer(0, 700, 1950, 50, 15))
obstacles.push(new Lava(250, 700, 150, 15))
obstacles.push(new Lava(550, 735, 150, 15))
obstacles.push(new Lava(1100, 700, 25, 15))
obstacles.push(new Lava(1300, 735, 25, 15))
obstacles.push(new Lava(1500, 700, 25, 15))
// obstacles.push(new BreakableObstacle(1700, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1725, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1750, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1775, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1800, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1825, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1850, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1875, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1900, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1925, 700,  25, 50, 1, 0.02))
// obstacles.push(new BreakableObstacle(1950, 700,  25, 50, 1, 0.02))

// obstacles.push(new RotatingLava(800, 325, 650, 50, 90, 0));

// obstacles.push(new RotatingLava(1525, 350, 150, 15, -120, 0))
// obstacles.push(new RotatingLava(1525, 375, 100, 10, 120, 0));
// obstacles.push(new RotatingLava(1525, 450, 150, 15, 120, 0))
//  obstacles.push(new RotatingLava(1600, 450, 75, 15, -120, 0))
// obstacles.push(new RotatingLava(1525, 550, 150, 15, -120, 0))
obstacles.push(new WB(1525, 435, 75, 20, 100, 300))
// obstacles.push(new RotatingLava(1500, 430, 200, 10, 120, 90))
obstacles.push(new Lava(1600, 325,75, 50))
obstacles.push(new NormalObstacle(1525, 425, 75, 25))
obstacles.push(new CircularNormalObstacle(1600, 425 + 25/2, 12.5))
obstacles.push(new NormalObstacle(1500, 550, 175, 50));

// obstacles.push(new RotatingLava(1525, 475, 100, 10, 120, 0))

// safes.push(new Safe(1575, 400, 50, 50))

obstacles.push(new NormalObstacle(1500, 0, 50, 200));
obstacles.push(new NormalObstacle(1600, 50, 325, 50));
obstacles.push(new NormalObstacle(1500, 200, 350, 50));
// obstacles.push(new TransObstacle(1850, 200, 75, 50, false, 0.8));
obstacles.push(new Pusher(1600, 100, 25, 100, 'left', 300, 0));
obstacles.push(new NormalObstacle(1800, 250, 50, 350));
obstacles.push(new CircularNormalObstacle(1825, 450, 50))
// obstacles.push(new GravObstacle(0, 0, 5000, 5000, 'right', 15000))

// obstacles.push(new MovingLavaObstacle(35, 35, [[1725, 350], [1875, 350]], 100, 1));
obstacles.push(new MovingLavaObstacle(25, 100, [[1725, 350], [1875, 350]], 100, 0));
obstacles.push(new MovingLavaObstacle(25, 100, [[1725, 450], [1875, 450]], 100, 1));
// obstacles.push(new MovingLavaObstacle(35, 35, [[1725, 500], [1875, 500]], 100, 0));
obstacles.push(new NormalObstacle(1675, 325, 50, 400-75));
obstacles.push(new Pusher(1725, 575, 75, 25, 'down', 325, 0));



obstacles.push(new NormalObstacle(1500, 250, 25, 350));
safes.push(new Safe(900, 600, 775, 50));
obstacles.push(new NormalObstacle(850, 50, 50, 600));
obstacles.push(new Pusher(900, 550, 600, 50, 'down', 700, 20))
safes.push(new Safe(700, 0, 800, 50));
safes.push(new Safe(900, 550, 600, 50));
spawns.push(new Spawner(900, 50, 600, 500, { type: 'tp', amount: 5, radius: 30, speed: 200, time: 2.5 }))

// second section
obstacles.push(new VinetteIncrease(700, 50, 150, 600, 0.5, 1, 3));
obstacles.push(new WB(775, 390, 75, 15, 50, 75))
obstacles.push(new NormalObstacle(775, 50, 75, 50))
obstacles.push(new CircularNormalObstacle(850, 100, 50));
obstacles.push(new NormalObstacle(700, 200, 75, 50));
obstacles.push(new CircularNormalObstacle(700, 200, 50));
obstacles.push(new CircularNormalObstacle(775, 225, 25));
obstacles.push(new CircularNormalObstacle(775, 75, 25));
obstacles.push(new NormalObstacle(775, 350, 75, 50));
obstacles.push(new CircularNormalObstacle(775, 375, 25));
obstacles.push(new CircularNormalObstacle(850, 350, 50));
obstacles.push(new NormalObstacle(650, 400, 50, 250))
obstacles.push(new Tp(700, 600, 150, 50, 50, 850))

for (let i = 0; i < 20; i++) {
	obstacles.push(new CircularNormalObstacle(700 + i * (150/20), 500, 5))
}


// first section

obstacles.push(new NormalObstacle(0, 900, 500, 50))
obstacles.push(new TransObstacle(150, 800, 50, 100, false, 0.8));
obstacles.push(new VinetteIncrease(0, 800, 1000, 400, 0.5, 0.9, 10));
obstacles.push(new TransObstacle(250, 800, 50, 50, false, 0.8));
obstacles.push(new TransObstacle(350, 850, 50, 50, false, 0.8));
obstacles.push(new NormalObstacle(350, 800, 50, 50));
obstacles.push(new NormalObstacle(250, 850, 50, 50));
obstacles.push(new NormalObstacle(450, 875, 50, 25));
obstacles.push(new NormalObstacle(450, 800, 50, 25));
obstacles.push(new TransObstacle(450, 825, 50, 75, false, 0.8));
// obstacles.push(new Winpad(500, 400, 150, 150));

obstacles.push(new NormalObstacle(500, 875, 400, 75));
obstacles.push(new NormalObstacle(500, 800, 500, 25));
obstacles.push(new Pusher(500, 825, 50, 50, 'left', 450, 35));
obstacles.push(new NormalObstacle(950, 825, 50, 125));
obstacles.push(new Pusher(900, 900, 50, 50, 'up', 250, 35));
obstacles.push(new NormalObstacle(950, 950, 50, 250));
obstacles.push(new NormalObstacle(850, 950, 50, 150));
obstacles.push(new NormalObstacle(550, 1150, 450, 50))
obstacles.push(new NormalObstacle(550, 1050, 350, 50))
obstacles.push(new Lava(0, 1150, 550, 50))
obstacles.push(new NormalObstacle(0, 1149, 50, 1))
obstacles.push(new Lava(50, 1050, 500, 50))
obstacles.push(new Pusher(0, 1050, 50, 50, 'down', 100, 35))
obstacles.push(new Pusher(500, 1100, 50, 50, 'right', 550, 0));
obstacles.push(new Lava(150, 1000, 100, 50));
obstacles.push(new Lava(350, 950, 100, 25));
obstacles.push(new Tp(800, 950, 50, 100, 1000, 800))
obstacles.push(new RotatingLava(575 - 100/2, 1015, 100, 20, 180));
obstacles.push(new RotatingLava(725 - 100/2, 1015, 100, 20, 180));

// second section 
obstacles.push(new VinetteIncrease(1000, 800, 1000, 400, 0.2, 0.8, 20))
obstacles.push(new NormalObstacle(1000, 1150, 1000, 50));
obstacles.push(new NormalObstacle(1000, 950, 100, 25))
obstacles.push(new RotatingLava(1000, 950, 200, 15, 100))
obstacles.push(new RotatingLava(1135, 1050, 200, 15,  -100, 45))
obstacles.push(new NormalObstacle(1225, 800, 25, 250))
obstacles.push(new Lava(1000, 1100, 50, 50))
obstacles.push(new RotatingLava(1235, 900, 200, 15, 100, 0))
obstacles.push(new NormalObstacle(1250, 1000, 100, 15))
// safes.push(new Safe(1000, 800, 100, 100))
obstacles.push(new NormalObstacle(1425, 800, 25, 350))
obstacles.push(new Lava(1350, 1100, 75, 50))
safes.push(new Safe(1350, 1000, 75,15))
obstacles.push(new WB(1250, 800, 5, 50, 300, 200))
obstacles.push(new Pusher(1450, 850, 150, 50, 'up',  250, 40))
obstacles.push(new NormalObstacle(1500, 800, 50, 250))
obstacles.push(new NormalObstacle(1600, 850, 50, 300))
obstacles.push(new MovingTpObstacle(50, 50, [[1450, 900], [1550, 900]], 100, 0, 50, 850));

obstacles.push(new RotatingLava(1800 - 150, 960, 350, 25, 100))
obstacles.push(new RotatingLava(1800 - 150, 960, 350, 25, 100, 90))
obstacles.push(new Lava(1650, 950, 200, 50))
obstacles.push(new Tp(1650, 1100, 50, 25, 25, 1275, '#121212', '#575757'))


// ZONE 2
texts.push(new Text(125, 1250, 'Darkness'))
obstacles.push(new NormalObstacle(0, 1225, 300, 75))
obstacles.push(new NormalObstacle(250, 1300, 50, 800))
obstacles.push(new VinetteIncrease(0, 1225, 2000, 1075, 0.2, 0.4, 40))

safes.push(new Safe(0, 1300, 250, 100))
spawns.push(new Spawner(0, 1500, 250, 700, { type: 'flashlight', amount: 5, radius: 20, speed: 200, flashlightSize: 70, flashlightAngle: 69  }))
spawns.push(new Spawner(300, 1225, 300,975, { type: 'flashlight', amount: 4, radius: 35, speed: 150, flashlightSize: 100, flashlightAngle: 69  }))
obstacles.push(new NormalObstacle(0, 2200, 650, 50))
obstacles.push(new NormalObstacle(600, 1300, 50, 900))
safes.push(new Safe(250, 2100, 50, 100));
safes.push(new Safe(600, 1225, 50, 75))
obstacles.push(new NormalObstacle(650, 1600, 950, 50))
obstacles.push(new TransObstacle(1450, 1275, 50, 275, 0.9));
// obstacles.push(new TransObstacle(1025, 1225, 50, 150, 0.9));
// obstacles.push(new TransObstacle(1025, 1450, 50, 150, 0.9))
spawns.push(new Spawner(650, 1225, 800, 375, { type: 'square', amount: 4, size: 60, speed: 125 }));
spawns.push(new Spawner(650, 1225, 800, 375, { type: 'flashlight', amount: 3, radius: 25, speed: 75, flashlightSize: 90, flashlightAngle: 69 }));
safes.push(new Safe(1450, 1225, 50, 50))
safes.push(new Safe(1450, 1550, 50, 50))
obstacles.push(new CircularNormalObstacle(1050, 1225, 50))
obstacles.push(new CircularNormalObstacle(1050, 1600, 50));
obstacles.push(new Tp(1950, 1375, 50, 75, 725, 1700))
obstacles.push(new NormalObstacle(1760, 1355, 240, 25))
obstacles.push(new NormalObstacle(1760, 1445, 240, 25))
obstacles.push(new Lava(800, 1650, 25, 150))
obstacles.push(new Lava(725, 1775, 75, 25))
obstacles.push(new Lava(650, 1875, 250, 25))
obstacles.push(new Lava(900, 1725, 25, 175))
obstacles.push(new Lava(1000, 1650, 25, 350))
obstacles.push(new Lava(725, 2000, 300, 25));
obstacles.push(new Pusher(925, 1750, 75, 50, 'up', 225, 10))
safes.push(new Safe(650, 1650, 150, 100))
obstacles.push(new RotatingLava(650, 2000, 150, 25, -75))
obstacles.push(new Lava(650, 2150, 500, 25))
obstacles.push(new MovingLavaObstacle(175, 125, [[850, 2025],[850, 2025]], 0, 0, false))
obstacles.push(new MovingSafe(75, 75, [[825, 2050], [975, 2050]], 75, 0))
obstacles.push(new GrowingCircleLavaObstacle(1150, 2150, 50, 50, 0, false))

obstacles.push(new Winpad(1650, 1650, 100, 100))

module.exports = poss;