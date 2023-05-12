const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, Checkpoint, InvincibilityPowerup }= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const poth = {
  arena: { width: 4000, height: 3000 },
  enemy: [],
  safes: [],
  texts: [],
  obstacles: [],
  spawns: [],
  playerSpawn: {x: 25, y: 25 }, //{ x: 50, y: 50 },
  name: 'PoTH',
  longName: 'Planet of Turret Hell',
  bgColor: '#7CB5D2',
  tileColor: '#DCF2EE',
  difficulty: "Relentless",
  addedObstacles: [],/*[{"x":0,"y":0,"w":1250,"h":550,"type":"size","size":15},{"x":125,"y":825,"w":1100,"h":175,"type":"size","size":5},{"x":0,"y":350,"w":1050,"h":50,"type":"normal"},{"x":1050,"y":100,"w":50,"h":300,"type":"normal"},{"x":1225,"y":0,"w":25,"h":400,"type":"normal"},{"x":250,"y":300,"w":50,"h":50,"type":"invpu","amount":0.5,"maxAmount":0.5},{"x":250,"y":0,"w":50,"h":300,"type":"normal"},{"x":350,"y":50,"w":50,"h":300,"type":"normal"},{"x":450,"y":0,"w":50,"h":300,"type":"normal"},{"x":550,"y":50,"w":50,"h":300,"type":"normal"},{"x":0,"y":400,"w":1250,"h":425,"type":"vinette","or":0.3,"ir":0.1,"o":2},{"x":100,"y":800,"w":1150,"h":25,"type":"normal"},{"x":1200,"y":400,"w":50,"h":400,"type":"normal"},{"x":1225,"y":400,"w":25,"h":25,"type":"circle-normal","radius":25},{"x":0,"y":825,"w":100,"h":75,"type":"check","collected":false},{"x":100,"y":825,"w":25,"h":75,"type":"normal"},{"x":0,"y":1000,"w":1250,"h":25,"type":"normal"},{"x":1225,"y":825,"w":25,"h":125,"type":"normal"},{"x":0,"y":975,"w":1175,"h":25,"type":"lava","canCollide":true},{"x":125,"y":825,"w":1100,"h":25,"type":"lava","canCollide":true},{"x":1250,"y":0,"w":800,"h":1600,"type":"normal"},{"x":0,"y":1025,"w":1250,"h":575,"type":"normal"},{"x":1225,"y":950,"w":25,"h":50,"type":"tp","tpx":25,"tpy":1625},{"x":0,"y":1600,"w":50,"h":50,"type":"color","bgColor":"#202326","tileColor":"#65147f"},{"x":0,"y":1650,"w":100,"h":350,"type":"normal"},{"x":100,"y":1900,"w":350,"h":100,"type":"normal"},{"x":350,"y":1600,"w":100,"h":200,"type":"normal"},{"x":200,"y":1600,"w":150,"h":150,"type":"normal"},{"x":275,"y":1750,"w":75,"h":25,"type":"normal"},{"x":450,"y":2100,"w":450,"h":100,"type":"normal"},{"x":900,"y":1600,"w":100,"h":400,"type":"normal"},{"x":900,"y":2100,"w":100,"h":100,"type":"normal"},{"x":350,"y":2000,"w":100,"h":200,"type":"normal"},{"x":1100,"y":1700,"w":100,"h":500,"type":"normal"},{"x":900,"y":2200,"w":300,"h":100,"type":"normal"},{"x":1200,"y":1900,"w":400,"h":100,"type":"normal"},{"x":1500,"y":1600,"w":100,"h":300,"type":"normal"},{"x":1200,"y":1700,"w":200,"h":100,"type":"normal"},{"x":1100,"y":1600,"w":100,"h":100,"type":"revive"},{"x":0,"y":2000,"w":350,"h":200,"type":"normal"},{"x":1200,"y":1800,"w":25,"h":100,"type":"tp","tpx":25,"tpy":2225},{"x":50,"y":2250,"w":50,"h":50,"type":"normal"},{"x":0,"y":2350,"w":50,"h":50,"type":"normal"},{"x":50,"y":2450,"w":50,"h":50,"type":"normal"},{"x":100,"y":2350,"w":50,"h":50,"type":"normal"},{"x":150,"y":2250,"w":50,"h":50,"type":"normal"},{"x":150,"y":2450,"w":50,"h":50,"type":"normal"},{"x":0,"y":2550,"w":50,"h":50,"type":"normal"},{"x":100,"y":2550,"w":50,"h":50,"type":"normal"},{"x":200,"y":2550,"w":50,"h":50,"type":"normal"},{"x":200,"y":2350,"w":50,"h":50,"type":"normal"},{"x":250,"y":2250,"w":50,"h":50,"type":"normal"},{"x":250,"y":2450,"w":50,"h":50,"type":"normal"},{"x":300,"y":2350,"w":50,"h":50,"type":"normal"},{"x":300,"y":2550,"w":50,"h":50,"type":"normal"},{"x":350,"y":2200,"w":850,"h":800,"type":"normal"},{"x":50,"y":2650,"w":50,"h":50,"type":"normal"},{"x":150,"y":2650,"w":50,"h":50,"type":"normal"},{"x":250,"y":2650,"w":50,"h":50,"type":"normal"},{"x":0,"y":2750,"w":50,"h":50,"type":"normal"},{"x":100,"y":2750,"w":50,"h":50,"type":"normal"},{"x":200,"y":2750,"w":50,"h":50,"type":"normal"},{"x":300,"y":2750,"w":50,"h":50,"type":"normal"},{"x":50,"y":2850,"w":50,"h":50,"type":"normal"},{"x":150,"y":2850,"w":50,"h":50,"type":"normal"},{"x":250,"y":2850,"w":50,"h":50,"type":"normal"},{"x":0,"y":2975,"w":350,"h":25,"type":"tp","tpx":1225,"tpy":2025},{"x":1200,"y":2050,"w":50,"h":50,"type":"normal"}],*/
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = poth;

safes.push(new Safe(0, 0, 250, 350));
/*obstacles.push(new SizePlayer(0, 0, 1250, 550, 15));
//obstacles.push(new NormalObstacle(1225, 0, 1000, 550, 15));
obstacles.push(new NormalObstacle(0, 350, 1050, 50));
obstacles.push(new NormalObstacle(1050, 100, 50, 300));
obstacles.push(new NormalObstacle(1225, 0, 25, 400));
obstacles.push(new InvincibilityPowerup(250, 300, 50, 50, 0.5));
*/

spawns.push(new Spawner(250, 0, 1050, 350, { x: 1200, y: 26, type: 'turret', amount: 1, radius: 25, speed: 0, shootSpeed: 3, pRadius: 25, pSpeed: 100, offset:1.5, shootDirections: [Math.PI]}));
spawns.push(new Spawner(250, 0, 1050, 350, { x: 1200, y: 75, type: 'turret', amount: 1, radius: 25, speed: 0, shootSpeed: 3, pRadius: 25, pSpeed: 100, shootDirections: [Math.PI]}));
spawns.push(new Spawner(250, 0, 1050, 350, { x: 1200, y: 125, type: 'turret', amount: 1, radius: 25, speed: 0, shootSpeed: 3, pRadius: 25, pSpeed: 100, offset:1.5, shootDirections: [Math.PI]}));
spawns.push(new Spawner(250, 0, 1050, 350, { x: 1200, y: 175, type: 'turret', amount: 1, radius: 25, speed: 0, shootSpeed: 3, pRadius: 25, pSpeed: 100, shootDirections: [Math.PI]}));
spawns.push(new Spawner(250, 0, 1050, 350, { x: 1200, y: 225, type: 'turret', amount: 1, radius: 25, speed: 0, shootSpeed: 3, pRadius: 25, pSpeed: 100, offset:1.5, shootDirections: [Math.PI]}));
spawns.push(new Spawner(250, 0, 1050, 350, { x: 1200, y: 275, type: 'turret', amount: 1, radius: 25, speed: 0, shootSpeed: 3, pRadius: 25, pSpeed: 100, shootDirections: [Math.PI]}));
spawns.push(new Spawner(250, 0, 1050, 400, { x: 1200, y: 325, type: 'turret', amount: 1, radius: 25, speed: 0, shootSpeed: 3, pRadius: 25, pSpeed: 100, offset:1.5, shootDirections: [Math.PI]}));

obstacles.push(new NormalObstacle(1200,2000,450,50));
obstacles.push(new NormalObstacle(1600,1600,50,450));
obstacles.push(new NormalObstacle(1600,1600,450,50));

// vinette part
spawns.push(new Spawner(0, 400, 1150, 400, { type: 'turret', amount: 3, radius: 12, speed: 140, shootSpeed: 0.3, pRadius: 8, pSpeed: 160, offset: 0, shootDirections: [Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0]}));
//"x":0,"y":400,"w":1250,"h":425,
module.exports = poth;

//obstacles.push(new NormalObstacle(250, 0, 50, 300));
//obstacles.push(new NormalObstacle(350, 50, 50, 300));
//obstacles.push(new NormalObstacle(450, 0, 50, 300));
//obstacles.push(new NormalObstacle(550, 50, 50, 300));

spawns.push(new Spawner(125, 850, 1100, 125, { type: 'turret', amount: 10, radius: 8, speed: 100, shootSpeed: 1.8, pRadius: 6, pSpeed: 110, offset: 0, shootDirections: [0]}));

spawns.push(new Spawner(50, 1650, 350, 300, { x: 225, y: 1800, type: 'spawn', amount: 1, radius: 30, speed: 0, spawnTime: 0.1, shootAngles:[Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0],
    spawnParams: {
        type: 'normal',
        radius: 12,
        speed: 100,
        life: 40,
    },
}))
spawns.push(new Spawner(450, 1600, 450, 500, { type: 'spawn', amount: 2, radius: 20, speed: 200, spawnTime: 0.25,
    spawnParams: {
        type: 'wavy',
        radius: 12,
        speed: 260,
        life: 50,
        dir: 1,
        timer: 0,
        maxTimer: 0.4,
    },
}))

spawns.push(new Spawner(1000, 1600, 100, 600, { type: 'turret',x: 1050, y: 2150, amount: 1, radius: 49, speed: 0, shootSpeed: 1, pRadius: 49, pSpeed: 220, offset: 0.5, shootDirections: [Math.PI*3/2]}));

spawns.push(new Spawner(1200, 1600, 300, 300, { type: 'spawn', amount: 1, x: 1350, y: 1750, radius: 1, speed: 0, spawnTime: 0.6,
    spawnParams: {
        type: 'growing',
        radius: 30,
        speed: 260,
        life: 150,
        maxTimer: 0.4,
        minRadius: 30,
        maxRadius: 30,
        growSpeed: 0,
        growing: true,
        bounceAmount: 30
    },
}))

spawns.push(new Spawner(0, 2250, 350, 725, { type: 'spawn', amount: 3, radius: 21, speed: 120, spawnTime: 2.5,
    spawnParams: {
        type: 'turret',
        radius: 14,
        life: 80,
        speed: 180,
        shootSpeed: 1.5,
        pRadius: 8,
        pSpeed: 60,
        offset: Math.random(),
        shootDirections: [Math.PI/2,Math.PI*3/2],
    },
}))

/*spawns.push(new Spawner(1200, 2000, 450, 50, { type: 'spawn', amount: 1, radius: 12, speed: 2000, spawnTime: 0.6,
    spawnParams: {
        type: 'growing',
        radius: 24,
        speed: 0,
        life: 80,
        maxTimer: 0.4,
        minRadius: 24,
        maxRadius: 24,
        growSpeed: 0,
        growing: true,
        bounceAmount: 80
    },
}))

spawns.push(new Spawner(1600, 1600, 50, 450, { type: 'spawn', amount: 1, radius: 12, speed: 2000, spawnTime: 0.5,
    spawnParams: {
        type: 'growing',
        radius: 24,
        speed: 0,
        life: 80,
        maxTimer: 0.4,
        minRadius: 24,
        maxRadius: 24,
        growSpeed: 0,
        growing: true,
        bounceAmount: 80
    },
}))

spawns.push(new Spawner(1600, 1600, 400, 50, { type: 'spawn', amount: 1, radius: 12, speed: 2000, spawnTime: 0.4,
    spawnParams: {
        type: 'growing',
        radius: 24,
        speed: 0,
        life: 80,
        maxTimer: 0.4,
        minRadius: 24,
        maxRadius: 24,
        growSpeed: 0,
        growing: true,
        bounceAmount: 80
    },
}))*/

safes.push(new Safe(0, 2200, 350, 50));

spawns.push(new Spawner(2050, 200, 1900, 250, { x: 2350, y: 325, type: 'spawn', amount: 1, radius: 10, speed: 0, spawnTime: 0.1, shootAngles:[Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0],
    spawnParams: {
        type: 'normal',
        radius: 12,
        speed: 100,
        life: 40,
    },
}))

spawns.push(new Spawner(2050, 200, 1900, 250, { x: 2975, y: 325, type: 'spawn', amount: 1, radius: 24, speed: 0, spawnTime: 0.1, shootAngles:[Math.PI/2],
    spawnParams: {
        type: 'normal',
        radius: 12,
        speed: 100,
        life: 40,
    },
}))

spawns.push(new Spawner(2050, 200, 1900, 250, { x: 3150, y: 325, type: 'spawn', amount: 1, radius: 24, speed: 0, spawnTime: 0.1, shootAngles:[Math.PI*3/2],
    spawnParams: {
        type: 'normal',
        radius: 12,
        speed: 100,
        life: 40,
    },
}))

spawns.push(new Spawner(2050, 200, 1900, 250, { x: 3825, y: 425, type: 'spawn', amount: 1, radius: 24, speed: 0, spawnTime: 0.5, shootAngles:[Math.PI*3.2/3],
    spawnParams: {
        type: 'normal',
        radius: 6,
        speed: 250,
        life: 60,
    },
}))

spawns.push(new Spawner(2050, 200, 1900, 250, { x: 3825, y: 225, type: 'spawn', amount: 1, radius: 24, speed: 0, spawnTime: 0.5, shootAngles:[Math.PI*2.8/3],
    spawnParams: {
        type: 'normal',
        radius: 6,
        speed: 250,
        life: 60,
    },
}))

spawns.push(new Spawner(2100, 900, 650, 250, {type: 'spawn', amount: 1, radius: 28, speed: 120, spawnTime: 5,
    spawnParams: {
        type: 'bomb',
        radius: 24,
        speed: 240,
        life: 500,
        bombNumber: 10,
        bombSpeed: 300,
        bombRadius: 8,
        bombLife: 3.5,
        bombDecay: 0.95,
    },
}))

spawns.push(new Spawner(2850, 900, 1150, 2100, {type: 'spawn', amount: 1, radius: 300, x: 3425, y: 1950, speed: 0, spawnTime: 4,
    spawnParams: {
        type: 'bomb',
        radius: 28,
        speed: 280,
        life: 500,
        bombNumber: 10,
        bombSpeed: 400,
        bombRadius: 18,
        bombLife: 3,
        bombDecay: 0.97,
    },
}))

spawns.push(new Spawner(2850, 900, 1150, 2100, {type: 'spawn', amount: 1, radius: 200, x: 3425, y: 1950, speed: 0, spawnTime: 4,
    spawnParams: {
        type: 'turret',
        radius: 21,
        life: 300,
        speed: 280,
        shootSpeed: 0.5,
        pRadius: 18,
        pSpeed: 100,
        offset: Math.random(),
        shootDirections: [Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0],
    },
}))

spawns.push(new Spawner(2850, 900, 1150, 2100, {type: 'spawn', amount: 1, radius: 100, x: 3425, y: 1950, speed: 0, spawnTime: 0.5,
    spawnParams: {
        type: 'normal',
        radius: 32,
        speed: 360,
        life: 300,
    },
}))

spawns.push(new Spawner(1250, 2550, 1400, 450, { type: 'spawn', amount: 3, radius: 10, speed: 100, spawnTime: 0.8,
    spawnParams: {
        type: 'selfcollide',
        radius: 32,
        speed: 300,
        life: 100,
    },
}))

// parsed obs
obstacles.push(new SizePlayer(0,0,1250,550,15))
obstacles.push(new SizePlayer(125,825,1100,175,5))
obstacles.push(new NormalObstacle(0,350,1050,50))
obstacles.push(new NormalObstacle(1050,99,50,301))
obstacles.push(new NormalObstacle(1225,0,25,400))
obstacles.push(new InvincibilityPowerup(250,300,50,50,0))
obstacles.push(new NormalObstacle(250,0,50,300))
obstacles.push(new NormalObstacle(350,50,50,300))
obstacles.push(new NormalObstacle(450,0,50,300))
obstacles.push(new NormalObstacle(550,50,50,300))
obstacles.push(new VinetteIncrease(0,400,1250,425,0.1,0.3,2))
obstacles.push(new NormalObstacle(100,800,1150,25))
obstacles.push(new NormalObstacle(1200,400,50,400))
obstacles.push(new Checkpoint(0,900,100,75))
obstacles.push(new Checkpoint(0,1600,50,50))
obstacles.push(new NormalObstacle(100,825,25,75))
obstacles.push(new NormalObstacle(0,1000,1250,25))
obstacles.push(new NormalObstacle(1225,825,25,125))
obstacles.push(new Lava(0,975,1175,25,true))
obstacles.push(new Lava(125,825,1100,25,true))
obstacles.push(new NormalObstacle(1250,0,800,1600))
obstacles.push(new NormalObstacle(0,1025,1250,575))
obstacles.push(new Tp(1225,950,25,50,25,1625))
obstacles.push(new ColorChange(0,1600,50,50,'#202326','#65147f'))
obstacles.push(new ColorChange(2050,0,50,200,'#101213','#340a42'))
obstacles.push(new NormalObstacle(0,1650,100,350))
obstacles.push(new NormalObstacle(100,1900,350,100))
obstacles.push(new NormalObstacle(350,1600,100,200))
obstacles.push(new NormalObstacle(200,1600,150,150))
obstacles.push(new NormalObstacle(275,1750,75,25))
obstacles.push(new NormalObstacle(450,2100,450,100))
obstacles.push(new NormalObstacle(900,1600,100,400))
obstacles.push(new NormalObstacle(900,2100,100,100))
obstacles.push(new NormalObstacle(350,2000,100,200))
obstacles.push(new NormalObstacle(1100,1700,100,500))
obstacles.push(new NormalObstacle(900,2200,300,100))
obstacles.push(new NormalObstacle(1200,1900,400,100))
obstacles.push(new NormalObstacle(1500,1600,100,300))
obstacles.push(new NormalObstacle(1200,1700,200,100))
obstacles.push(new NormalObstacle(0,2000,350,200))
obstacles.push(new Tp(1200,1800,25,100,25,2225))
obstacles.push(new NormalObstacle(50,2250,50,50))
obstacles.push(new NormalObstacle(0,2350,50,50))
obstacles.push(new NormalObstacle(50,2450,50,50))
obstacles.push(new NormalObstacle(100,2350,50,50))
obstacles.push(new NormalObstacle(150,2250,50,50))
obstacles.push(new NormalObstacle(150,2450,50,50))
obstacles.push(new NormalObstacle(0,2550,50,50))
obstacles.push(new NormalObstacle(100,2550,50,50))
obstacles.push(new NormalObstacle(200,2550,50,50))
obstacles.push(new NormalObstacle(200,2350,50,50))
obstacles.push(new NormalObstacle(250,2250,50,50))
obstacles.push(new NormalObstacle(250,2450,50,50))
obstacles.push(new NormalObstacle(300,2350,50,50))
obstacles.push(new NormalObstacle(300,2550,50,50))
obstacles.push(new NormalObstacle(350,2200,850,800))
obstacles.push(new NormalObstacle(50,2650,50,50))
obstacles.push(new NormalObstacle(150,2650,50,50))
obstacles.push(new NormalObstacle(250,2650,50,50))
obstacles.push(new NormalObstacle(0,2750,50,50))
obstacles.push(new NormalObstacle(100,2750,50,50))
obstacles.push(new NormalObstacle(200,2750,50,50))
obstacles.push(new NormalObstacle(300,2750,50,50))
obstacles.push(new NormalObstacle(50,2850,50,50))
obstacles.push(new NormalObstacle(150,2850,50,50))
obstacles.push(new NormalObstacle(250,2850,50,50))
obstacles.push(new Tp(0,2975,350,25,2075,25))
obstacles.push(new NormalObstacle(1200,2050,450,250))
obstacles.push(new NormalObstacle(1650,1650,200,650))
obstacles.push(new NormalObstacle(1850,1650,200,200))
//obstacles.push(new Tp(2000,1600,50,50,2075,25))
obstacles.push(new NormalObstacle(1200,2350,1100,200))
obstacles.push(new NormalObstacle(2050,1150,400,1400))
obstacles.push(new NormalObstacle(1900,1900,150,450))
obstacles.push(new NormalObstacle(1850,2300,50,50))
obstacles.push(new NormalObstacle(1850,1850,50,50))
obstacles.push(new NormalObstacle(1200,2300,50,50))
obstacles.push(new NormalObstacle(1250,2300,600,50))
obstacles.push(new NormalObstacle(1850,1850,200,450))
obstacles.push(new NormalObstacle(2100,0,1900,200))
obstacles.push(new NormalObstacle(2050,450,1950,450))
obstacles.push(new Tp(3950,200,50,250,2050,1025))
obstacles.push(new GravObstacle(2050,200,1900,250,'right',2000))
obstacles.push(new NormalObstacle(2450,1150,400,1400))
obstacles.push(new NormalObstacle(600,99,450,251))
obstacles.push(new NormalObstacle(650,0,50,50))
obstacles.push(new NormalObstacle(750,50,50,50))
obstacles.push(new NormalObstacle(850,0,50,50))
obstacles.push(new NormalObstacle(950,50,50,50))
obstacles.push(new NormalObstacle(1050,0,50,50))
obstacles.push(new Winpad(1200,2550,50,450))
safes.push(new Safe(2650,2550,200,450))
obstacles.push(new SpeedObstacle(2850,900,1150,2100,2))
safes.push(new Safe(2050,900,50,250))
safes.push(new Safe(2750,900,100,250))

module.exports = poth;