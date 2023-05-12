const { NormalObstacle, BouncyObstacle,
  CircularNormalObstacle, CircularBouncyObstacle,
  Lava, RotatingLava, SpeedObstacle, GravObstacle,
  Checkpoint, Tp, MovingObstacle, StoryDisplay, MovingLavaObstacle, Winpad, WB, RotatingTp, MovingTpObstacle, Booster, WallBooster, SpeedTrap, SizePlayer, ColorChange, Slip, VinetteIncrease, GrowingLavaObstacle, Coin, SnapGrid, MovingSafe }= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const podd = {
  arena: { width: 4000, height: 10000 },
  enemy: [],
  safes: [],
  texts: [],
  obstacles: [],
  spawns: [],
  playerSpawn: { x: 50, y: 50 }, //{x: 975, y: 6200 }
  name: 'PoDD',
  longName: 'Planet of Deadly Descent',
  bgColor: '#483c33',
  tileColor: '#5A4A40',
  difficulty: "Agonizing",
    addedObstacles: [],
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = podd;
texts.push(new Text(100, -25, 'Welcome to.. HELL'));
obstacles.push(new NormalObstacle(0, 100, 600, 100));
obstacles.push(new NormalObstacle(0, 1010, 1000, 10));
obstacles.push(new NormalObstacle(0, 1130, 1000, 10));
obstacles.push(new NormalObstacle(0, 1250, 1000, 10));
obstacles.push(new NormalObstacle(0, 1370, 1000, 10));
obstacles.push(new NormalObstacle(0, 1490, 1000, 10));

obstacles.push(new NormalObstacle(100, 1000, 1000, 500));

obstacles.push(new Tp(0, 200, 900, 35, 950, 282));
obstacles.push(new Tp(50, 335, 950, 35, 950, 282));
obstacles.push(new Lava(50, 370, 950, 30, 950, 282));
obstacles.push(new Lava(0, 525, 950, 75, 950, 282));

obstacles.push(new GravObstacle(0, 235, 900, 100, "down", 1000));
obstacles.push(new GravObstacle(0, 400, 940, 125, "right", 1000));

//w, h, points = [[50,50]], speed = 30, currentPoint
obstacles.push(new MovingLavaObstacle(50, 50, [[900, 475], [0, 475]], 900, 0));
obstacles.push(new MovingLavaObstacle(50, 50, [[900, 400], [0, 400]], 900, 1));


obstacles.push(new MovingLavaObstacle(200, 100, [[0, 600], [0, 1400]], 400, 0));
obstacles.push(new MovingLavaObstacle(100, 100, [[200, 600], [200, 900]], 400, 0));
obstacles.push(new MovingLavaObstacle(100, 100, [[300, 600], [300, 900]], 400, 1));
obstacles.push(new MovingLavaObstacle(100, 100, [[400, 600], [400, 900]], 400, 0));
obstacles.push(new MovingLavaObstacle(100, 100, [[500, 600], [500, 900]], 400, 1));
obstacles.push(new MovingLavaObstacle(100, 100, [[600, 600], [600, 900]], 400, 0));
obstacles.push(new MovingLavaObstacle(100, 100, [[700, 600], [700, 900]], 400, 1));
obstacles.push(new MovingLavaObstacle(100, 100, [[800, 600], [800, 900]], 400, 0));
obstacles.push(new MovingLavaObstacle(100, 100, [[900, 600], [900, 900]], 400, 1));

obstacles.push(new Lava(700, 600, 100, 300));
obstacles.push(new Lava(400, 700, 100, 300));
obstacles.push(new Lava(0, 600, 200, 300));

safes.push(new Safe(0, 0, 150, 100));
safes.push(new Safe(775, 0, 75, 50));
safes.push(new Safe(0, 700, 100, 900));

obstacles.push(new NormalObstacle(550, 50, 50, 50));
obstacles.push(new NormalObstacle(600, 50, 25, 25));
obstacles.push(new NormalObstacle(675, 0, 50, 100));
obstacles.push(new NormalObstacle(775, 50, 75, 100));
obstacles.push(new NormalObstacle(600, 150, 300, 50));
obstacles.push(new RotatingLava(200, 0, 100, 10, -270, 0));
obstacles.push(new RotatingLava(200, 90, 100, 10, 270, 0));
obstacles.push(new RotatingLava(250, 0, 100, 10, -270, 90));
obstacles.push(new RotatingLava(250, 90, 100, 10, 270, 90));
obstacles.push(new RotatingLava(300, 0, 100, 10, -270, 0));
obstacles.push(new RotatingLava(300, 90, 100, 10, 270, 0));
obstacles.push(new RotatingLava(350, 0, 100, 10, -270, 0));
obstacles.push(new RotatingLava(350, 90, 100, 10, 270, 0)); 
obstacles.push(new RotatingLava(400, 0, 100, 10, -270, 90));
obstacles.push(new RotatingLava(400, 90, 100, 10, 270, 90));
obstacles.push(new RotatingLava(600, 0, 200, 10, 100, 90));
obstacles.push(new RotatingLava(600, 0, 200, 10, -100, 90));
obstacles.push(new RotatingLava(850, 70, 150, 10, 360, 0));

// Zone 2
texts.push(new Text(175, 1525, 'It only gets worse.'));

obstacles.push(new NormalObstacle(0, 1600, 950, 100));
obstacles.push(new NormalObstacle(50, 1800, 950, 100));
obstacles.push(new NormalObstacle(950, 1500, 50, 50));
obstacles.push(new NormalObstacle(950, 1750, 50, 50));
obstacles.push(new NormalObstacle(0, 2150, 950, 50));
obstacles.push(new NormalObstacle(50, 2500, 950, 500));
obstacles.push(new GravObstacle(0, 2500, 50, 500, "down", 15000));
obstacles.push(new Lava(50, 1900, 50, 50));
obstacles.push(new Lava(150, 2000, 50, 50));
obstacles.push(new Lava(50, 2100, 50, 50));
obstacles.push(new Lava(250, 1900, 50, 50));
obstacles.push(new Lava(350, 2000, 50, 50));
obstacles.push(new Lava(250, 2100, 50, 50));
obstacles.push(new Lava(450, 1900, 50, 50));
obstacles.push(new Lava(550, 2000, 50, 50));
obstacles.push(new Lava(450, 2100, 50, 50));
obstacles.push(new Lava(650, 1900, 50, 50));
obstacles.push(new Lava(750, 2000, 50, 50));
obstacles.push(new Lava(650, 2100, 50, 50));
obstacles.push(new Lava(850, 1900, 50, 50));
obstacles.push(new Lava(950, 2000, 50, 50));
obstacles.push(new Lava(850, 2100, 50, 50));

obstacles.push(new RotatingLava(200, 1645, 300, 10, 240, 0));
obstacles.push(new RotatingLava(300, 1645, 300, 10, 240, 90));
obstacles.push(new RotatingLava(400, 1645, 300, 10, 240, 0));
obstacles.push(new RotatingLava(500, 1645, 300, 10, 240, 90));
obstacles.push(new RotatingLava(600, 1645, 300, 10, 240, 0));
obstacles.push(new RotatingLava(700, 1645, 300, 10, 240, 90));
obstacles.push(new MovingLavaObstacle(50, 50, [[0,1925],[950, 1925]], 500, 0));
obstacles.push(new MovingLavaObstacle(50, 50, [[0,2000],[950, 2000]], 500, 1));
obstacles.push(new MovingLavaObstacle(50, 50, [[0,2075],[950, 2075]], 500, 0));

obstacles.push(new RotatingLava(650, 2345, 350, 10, 50, 0));
obstacles.push(new RotatingLava(350, 2345, 350, 10, 50, 0));
obstacles.push(new RotatingLava(0, 2345, 350, 10, 50, 0));
obstacles.push(new RotatingLava(0, 2345, 350, 10, -50, 0));
obstacles.push(new RotatingLava(0, 2345, 350, 10, 50, 90));
obstacles.push(new RotatingLava(0, 2345, 350, 10, -50, 90));

obstacles.push(new Lava(925, 2300, 75, 100));
obstacles.push(new Lava(800, 2425, 50, 75));
obstacles.push(new Lava(650, 2250, 50, 250));
obstacles.push(new Lava(550, 2200, 30, 250));
obstacles.push(new Lava(400, 2300, 30, 200));
obstacles.push(new Lava(400, 2250, 70, 50));

safes.push(new Safe(200, 2325, 25, 25));
safes.push(new Safe(150, 2365, 50, 50));
safes.push(new Safe(50, 2450, 55, 50));

//Zone 3 
texts.push(new Text(205, 3025, 'Take a break. You need it.'));
obstacles.push(new NormalObstacle(0, 3150, 900, 50));
obstacles.push(new NormalObstacle(50, 3300, 950, 50));
obstacles.push(new Lava(450, 3000, 50, 30));
obstacles.push(new Lava(500, 3000, 50, 40));
obstacles.push(new Lava(550, 3000, 50, 50));
obstacles.push(new Lava(600, 3000, 400, 60));
obstacles.push(new Lava(450, 3110, 50, 40));
obstacles.push(new Lava(500, 3120, 50, 30));
obstacles.push(new Lava(550, 3130, 50, 20));
obstacles.push(new Lava(600, 3140, 50, 10));
obstacles.push(new RotatingLava(700, 3170, 300, 10, 200, 90));
obstacles.push(new WB(0, 3400, 10, 150, 250, 100));
obstacles.push(new NormalObstacle(0, 3500, 950, 50));
obstacles.push(new NormalObstacle(50, 3850, 950, 50));

spawns.push(new Spawner(150, 3350, 150, 150, { type: 'switch', amount: 1, radius: 74, speed: 1, time: 0.45, defaultSwitch: false }))
spawns.push(new Spawner(300, 3350, 150, 150, { type: 'switch', amount: 1, radius: 74, speed: 1, time: 0.45, defaultSwitch: false }))

spawns.push(new Spawner(450, 3200, 100, 100, { type: 'switch', amount: 1, radius: 49, speed: 1, time: 0.6, defaultSwitch: true }))
spawns.push(new Spawner(250, 3200, 100, 100, { type: 'switch', amount: 1, radius: 49, speed: 1, time: 0.6, defaultSwitch: false }))
spawns.push(new Spawner(50, 3200, 100, 100, { type: 'switch', amount: 1, radius: 49, speed: 1, time: 0.6, defaultSwitch: true }))
// imagine grav + wallbounce

obstacles.push(new Lava(800, 3550, 50, 50, 1000, 3500));
obstacles.push(new Lava(600, 3600, 50, 250, 1000, 3500));
obstacles.push(new Lava(400, 3550, 50, 50, 1000, 3500));
obstacles.push(new Tp(200, 3550, 50, 200, 1000, 3500));
obstacles.push(new Tp(200, 3825, 50, 25, 1000, 3500));

obstacles.push(new GravObstacle(0, 3550, 1000, 300, "left", 6000));

obstacles.push(new MovingLavaObstacle(50, 50, [[0, 3900], [950, 3900]], 1000, 0));
obstacles.push(new NormalObstacle(0, 3950, 200, 50));
obstacles.push(new NormalObstacle(250, 3950, 200, 50));
obstacles.push(new NormalObstacle(500, 3950, 200, 50));
obstacles.push(new NormalObstacle(750, 3950, 200, 50));

obstacles.push(new NormalObstacle(0, 4000, 950, 1000));

obstacles.push(new GravObstacle(950, 3900, 50, 1100, "down", 5000));
obstacles.push(new Tp(950, 4200, 50, 0, 3025, 5025, '#690000', '#991111'));

//Zone 4
texts.push(new Text(750, 4950, "It's getting darker."));
obstacles.push(new Checkpoint(900, 5000, 100, 100));
obstacles.push(new NormalObstacle(700, 5100, 300, 100));
obstacles.push(new NormalObstacle(500, 5000, 100, 300));
obstacles.push(new NormalObstacle(500, 5300, 400, 100));
obstacles.push(new RotatingLava(550, 5145, 300, 10, -300, 0));
obstacles.push(new Slip(900, 5200, 100, 350));
obstacles.push(new Lava(850, 5400, 50, 50));
obstacles.push(new Lava(900, 5300, 50, 100));
obstacles.push(new Lava(950, 5500, 50, 50));
obstacles.push(new Coin(400, 5500, 50, 50));
obstacles.push(new RotatingLava(650, 5465, 150, 20, -360, 0));
obstacles.push(new RotatingLava(500, 5415, 150, 20, 360, 0));
obstacles.push(new RotatingLava(350, 5465, 150, 20, -360, 0));
obstacles.push(new RotatingLava(250, 5265, 250, 20, 360, -40));
obstacles.push(new RotatingLava(250, 5115, 250, 20, -360, 40));
obstacles.push(new RotatingLava(100, 4925, 250, 20, 360, 20));
//obstacles.push(new RotatingLava(100, 4930, 250, 20, 360, 40));
//obstacles.push(new SpeedTrap(50, 5000, 450, 50, 1));
obstacles.push(new RotatingLava(0, 5115, 200, 20, -360, 70));
obstacles.push(new RotatingLava(0, 5265, 200, 20, 360, -70));
obstacles.push(new RotatingLava(0, 5415, 200, 20, -360, 70));
obstacles.push(new RotatingLava(0, 5565, 200, 20, 360, -70));
obstacles.push(new NormalObstacle(500, 5500, 450, 50));
obstacles.push(new NormalObstacle(200, 5100, 50, 300))
obstacles.push(new NormalObstacle(200, 5400, 150, 150))
obstacles.push(new NormalObstacle(200, 5550, 800, 50))
obstacles.push(new NormalObstacle(0, 5650, 950, 50));
safes.push(new Safe(200, 5600, 50, 50));
obstacles.push(new SizePlayer(200, 5600, 800, 50, 10));
obstacles.push(new VinetteIncrease(200, 5600, 750, 50, 0.1, 0.1, 200));
obstacles.push(new MovingLavaObstacle(20, 20, [[250, 5600],[250, 5630]], 50, 0));
obstacles.push(new MovingLavaObstacle(20, 20, [[290, 5600],[290, 5630]], 50, 0));
obstacles.push(new MovingLavaObstacle(20, 20, [[250, 5630],[510, 5630]], 50, 0));
obstacles.push(new MovingLavaObstacle(20, 20, [[250, 5600],[510, 5600]], 50, 1));

obstacles.push(new MovingLavaObstacle(20, 20, [[470, 5600],[470, 5630]], 50, 0));
obstacles.push(new MovingLavaObstacle(20, 20, [[510, 5600],[510, 5630]], 50, 0));

obstacles.push(new MovingLavaObstacle(20, 20, [[600, 5630],[700, 5630]], 50, 0));
obstacles.push(new MovingLavaObstacle(20, 20, [[600, 5600],[700, 5600]], 50, 1));
obstacles.push(new MovingLavaObstacle(20, 20, [[700, 5630],[800, 5630]], 50, 0));
obstacles.push(new MovingLavaObstacle(20, 20, [[700, 5600],[800, 5600]], 50, 1));
obstacles.push(new MovingLavaObstacle(20, 20, [[800, 5630],[900, 5630]], 50, 0));
obstacles.push(new MovingLavaObstacle(20, 20, [[800, 5600],[900, 5600]], 50, 1));
obstacles.push(new NormalObstacle(50, 6000, 950, 50));

// 2nd smol section
obstacles.push(new SizePlayer(950, 5650, 50, 50, 15));//???
obstacles.push(new SizePlayer(0, 5700, 1000, 300, 15));
obstacles.push(new RotatingLava(900, 5750, 100, 10, 270, 0));
obstacles.push(new RotatingLava(900, 5800, 100, 10, 270, 90));
obstacles.push(new RotatingLava(900, 5850, 100, 10, 270, 0));
obstacles.push(new RotatingLava(900, 5900, 100, 10, 270, 90));
obstacles.push(new RotatingLava(900, 5950, 100, 10, 270, 0));

obstacles.push(new NormalObstacle(850, 5700, 50, 250));
obstacles.push(new NormalObstacle(750, 5750, 50, 250));
obstacles.push(new NormalObstacle(650, 5700, 50, 250));
obstacles.push(new NormalObstacle(550, 5750, 50, 250));
obstacles.push(new NormalObstacle(450, 5700, 50, 250));
obstacles.push(new RotatingLava(675, 5800, 200, 10, -270, 0));
obstacles.push(new RotatingLava(675, 5900, 200, 10, -270, 90));
obstacles.push(new RotatingLava(575, 5800, 200, 10, 270, 0));
obstacles.push(new RotatingLava(575, 5900, 200, 10, 270, 90));
obstacles.push(new RotatingLava(475, 5800, 200, 10, -270, 0));
obstacles.push(new RotatingLava(475, 5900, 200, 10, -270, 90));
obstacles.push(new RotatingLava(375, 5900, 200, 10, 270, 90));

obstacles.push(new NormalObstacle(350, 5800, 50, 200));
obstacles.push(new NormalObstacle(50, 5800, 300, 50));

obstacles.push(new NormalObstacle(0, 6250, 200, 50));
obstacles.push(new NormalObstacle(250, 6050, 50, 200));

obstacles.push(new RotatingLava(325, 5700, 75, 8, 90, 0));
obstacles.push(new RotatingLava(325, 5775, 75, 8, -90, 0));
obstacles.push(new RotatingLava(250, 5700, 75, 8, 90, 0));
obstacles.push(new RotatingLava(250, 5775, 75, 8, -90, 0));
obstacles.push(new RotatingLava(175, 5700, 75, 8, 90, 0));
obstacles.push(new RotatingLava(175, 5775, 75, 8, -90, 0));
obstacles.push(new RotatingLava(100, 5700, 75, 8, 90, 0));
obstacles.push(new RotatingLava(100, 5775, 75, 8, -90, 0));
obstacles.push(new RotatingLava(25, 5700, 75, 8, 90, 0));
obstacles.push(new RotatingLava(25, 5775, 75, 8, -90, 0));
//obstacles.push(new SnapGrid(500, 1550, 150, 250, true, true, 50, 0.5))
obstacles.push(new Coin(100, 5850, 50, 50));
obstacles.push(new Lava(0, 6150, 50, 100));
obstacles.push(new Lava(50, 6200, 50, 50));

// turrets Section
obstacles.push(new NormalObstacle(0, 6300, 950, 50));
obstacles.push(new NormalObstacle(300, 6200, 550, 25));
obstacles.push(new NormalObstacle(350, 6100, 550, 25));
obstacles.push(new NormalObstacle(900, 6100, 50, 200));

obstacles.push(new RotatingLava(0, 6000, 400, 30, -270, 0));
spawns.push(new Spawner(300, 6050, 700, 250, { x: 600, y: 6200, type: 'turret', amount: 1, radius: 10, speed: 0, shootSpeed: 0.12, pRadius: 10, pSpeed: 180, shootDirections: [Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,'none','none',Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10]}));


//Zone 5

obstacles.push(new GravObstacle(950, 6050, 50, 450, "down", 3000));
safes.push(new Safe(950, 6050, 50, 450, true));
obstacles.push(new NormalObstacle(0, 6350, 950, 150));
obstacles.push(new NormalObstacle(3100, 8900, 500, 300))
obstacles.push(new ColorChange(950, 6200, 50, 10, "#f76002", "#ff8b42"));
texts.push(new Text(725, 6430, 'Welcome to the Magma Lake.'))
texts.push(new Text(665, 6475, 'Acid returns you to the start of the lake.'))
obstacles.push(new RotatingLava(0, 6500, 1000, 1000, 0, 0));
safes.push(new Safe(950, 6500, 50, 100, true));
obstacles.push(new MovingSafe(50, 50, [[950, 6600], [950, 6700], [850, 6700], [850, 6600]], 100, 3));

//GBJ
//3050, 50 for zone 4
obstacles.push(new NormalObstacle(1000, 0, 2000, 10000));
texts.push(new Text(3150, 50, 'Zone 4 Deathbox'));
texts.push(new Text(3150, 350, 'Zone 5 Deathbox'));
texts.push(new Text(3150, 650, 'Zone 6 Deathbox'));
texts.push(new Text(3150, 950, 'Zone 7 Deathbox'));
obstacles.push(new NormalObstacle(3000, 100, 1000, 200));
obstacles.push(new NormalObstacle(3000, 400, 1000, 200));
obstacles.push(new NormalObstacle(3000, 700, 1000, 200));
obstacles.push(new NormalObstacle(3000, 1000, 1000, 4000));
obstacles.push(new NormalObstacle(3500, 5000, 500, 20000));



//3 Extension

//obstacles.push(new NormalObstacle(3000, 10000, 1000, 10000));
texts.push(new Text(3250, 4850, 'Not quite yet. Do these 5 boxes.'));
texts.push(new Text(3250, 4900, 'Each time you fail a box, you\'ll go back a box.'));
texts.push(new Text(3250, 4950, 'You don\'t want to fail the first box.'));

texts.push(new Text(3250, 5950, '1'));
texts.push(new Text(3250, 6750, '2'));
texts.push(new Text(3250, 7550, '3'));
texts.push(new Text(3250, 8350, '4'));
texts.push(new Text(3250, 9150, '5'));

obstacles.push(new NormalObstacle(3000, 5200, 500, 700))
obstacles.push(new NormalObstacle(3050, 5950, 500, 50))
obstacles.push(new NormalObstacle(3100, 5200, 500, 800))

obstacles.push(new NormalObstacle(3000, 6500, 500, 200))
obstacles.push(new NormalObstacle(3100, 6500, 500, 300))
obstacles.push(new NormalObstacle(3050, 6750, 500, 50))

obstacles.push(new NormalObstacle(3000, 7300, 500, 200))
obstacles.push(new NormalObstacle(3100, 7300, 500, 300))
obstacles.push(new NormalObstacle(3050, 7550, 500, 50))

obstacles.push(new NormalObstacle(3000, 8100, 500, 200))
obstacles.push(new NormalObstacle(3100, 8100, 500, 300))
obstacles.push(new NormalObstacle(3050, 8350, 500, 50))

obstacles.push(new NormalObstacle(3000, 8900, 500, 200))
obstacles.push(new NormalObstacle(3050, 9150, 500, 50))
obstacles.push(new NormalObstacle(3100, 8900, 500, 300))

obstacles.push(new NormalObstacle(3000, 9700, 500, 500));

obstacles.push(new Tp(3450, 6450, 50, 50, 3070, 6700));
obstacles.push(new Tp(3450, 7250, 50, 50, 3070, 7500));
obstacles.push(new Tp(3450, 8050, 50, 50, 3070, 8300));
obstacles.push(new Tp(3450, 8850, 50, 50, 3070, 9100));
obstacles.push(new Tp(3450, 9650, 50, 50, 950, 4400, '#080808', '#1c1c1c'));


obstacles.push(new Tp(3450, 5000, 50, 200, 3075, 5925));


obstacles.push(new MovingTpObstacle(50, 250, [[3000, 6000], [3450, 6000]], 500, 0, 3100, 60));
obstacles.push(new MovingTpObstacle(50, 250, [[3000, 6250], [3450, 6250]], 500, 1, 3100, 60));
obstacles.push(new RotatingTp(3000, 9440, 500, 20, 275, 0, 3070, 8325));

obstacles.push(new RotatingTp(3000, 8520, 250, 10, 250, 0, 3070, 7525));
obstacles.push(new RotatingTp(3250, 8520, 250, 10, 250, 0, 3070, 7525));
obstacles.push(new RotatingTp(3000, 8770, 250, 10, 250, 0, 3070, 7525));
obstacles.push(new RotatingTp(3250, 8770, 250, 10, 250, 0, 3070, 7525));


obstacles.push(new MovingTpObstacle(250, 250, [[3000, 6800], [3250, 6800], [3250, 7050], [3000, 7050]], 350, 0, 3070, 5930));
obstacles.push(new MovingTpObstacle(250, 250, [[3000, 6800], [3250, 6800], [3250, 7050], [3000, 7050]], 350, 2, 3070, 5930));
obstacles.push(new Tp(3050, 7600, 50, 200, 3075, 6725));
obstacles.push(new Tp(3150, 7850, 50, 250, 3075, 6725));
obstacles.push(new Tp(3250, 7600, 50, 200, 3075, 6725));
obstacles.push(new Tp(3350, 7850, 50, 250, 3075, 6725));
obstacles.push(new Tp(3450, 7600, 50, 200, 3075, 6725));



/*
obstacles.push(new SizePlayer(0, 5000, 1000, 1000, 200));
obstacles.push(new SizePlayer(0, 6000, 1000, 1000, 20));
*/

/*
obstacles.push(new RotatingTp(3250, 4500, 1000, 10, 500, 0, 3100, 60));
obstacles.push(new MovingTpObstacle(100, 100, [[3250, 9800], [3850, 9800]], 500, 0, 3100, 60));
*/
module.exports = podd;