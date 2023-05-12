const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, Coin, Typing, CircularLavaObstacle, PlatformerGrav, Checkpoint, TimeTrap, Redirect, BreakableObstacle, Polygon, CookieCheck, CoinDoor }= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');
const parseAddedObs = require('../addedobsparser.js');

const map = {
  arena: { width: 1600, height: 1700 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
    safeColor: '#363636',
	playerSpawn: { x: 800, y: 800 },
	name: 'PoM',
	longName: 'Planet of Misdirection',
    bgColor: '#062F4D',
    tileColor: '#1B4C6D',
    difficulty: "Peaceful",
    addedObstacles: []
}
let { texts, obstacles, safes, spawns, playerSpawn, arena } = map;

//1. basic lava dodging/ filler

//2. quiz w/ conveyor

//3. precision

//4. reaction time (conveyor where it tells u the right way to go)

//5. typing test

//obstacles.push(new Typing(200, 0, 200, 200, `50 wpm or more is advised.`));

// ez
console.log(parseAddedObs('[]'));

texts.push(new Text(100, -35, `Beat area 40 of Calamatous Cavern in evades3!`));/*, false, 24*/
texts.push(new Text(100, 1635, `Get eX dev perks!`));
texts.push(new Text(1500, 1635, `Check out the old eX demo!`));
texts.push(new Text(950, -35, `Get an evades2 account to unlock this door!`));

obstacles.push(new NormalObstacle(0,100,100,50))
obstacles.push(new NormalObstacle(100,0,50,50))
obstacles.push(new NormalObstacle(650,700,100,50))
obstacles.push(new NormalObstacle(700,550,50,100))
obstacles.push(new NormalObstacle(650,600,50,50))
obstacles.push(new NormalObstacle(550,650,50,100))
obstacles.push(new NormalObstacle(500,650,50,50))
obstacles.push(new NormalObstacle(350,500,50,100))
obstacles.push(new NormalObstacle(400,500,100,50))
obstacles.push(new NormalObstacle(400,650,50,100))
obstacles.push(new NormalObstacle(550,350,50,200))
obstacles.push(new NormalObstacle(550,250,150,50))
obstacles.push(new NormalObstacle(650,300,50,50))
obstacles.push(new NormalObstacle(650,550,50,50))
obstacles.push(new NormalObstacle(700,750,50,50))
obstacles.push(new NormalObstacle(750,700,50,50))
obstacles.push(new NormalObstacle(550,600,50,50))
obstacles.push(new NormalObstacle(350,750,100,50))
obstacles.push(new NormalObstacle(150,600,100,100))
obstacles.push(new NormalObstacle(50,450,50,100))
obstacles.push(new NormalObstacle(100,450,100,50))
obstacles.push(new NormalObstacle(200,250,50,150))
obstacles.push(new NormalObstacle(150,300,50,50))
obstacles.push(new NormalObstacle(350,300,150,50))
obstacles.push(new NormalObstacle(450,250,50,50))
obstacles.push(new NormalObstacle(300,100,250,50))
obstacles.push(new NormalObstacle(650,0,50,150))
obstacles.push(new NormalObstacle(700,50,50,50))
obstacles.push(new NormalObstacle(300,400,200,50))
obstacles.push(new NormalObstacle(800,150,50,150))
obstacles.push(new NormalObstacle(750,250,50,50))
obstacles.push(new NormalObstacle(700,400,150,50))
obstacles.push(new NormalObstacle(750,450,50,50))
obstacles.push(new NormalObstacle(0,200,100,100))
obstacles.push(new NormalObstacle(800,0,50,750))
obstacles.push(new NormalObstacle(950,700,650,50))
obstacles.push(new NormalObstacle(850,350,650,50))
obstacles.push(new NormalObstacle(0,850,750,50))
obstacles.push(new NormalObstacle(800,850,50,750))
obstacles.push(new NormalObstacle(50,950,750,50))
obstacles.push(new NormalObstacle(50,1150,750,50))
obstacles.push(new NormalObstacle(50,1350,750,50))
obstacles.push(new NormalObstacle(0,1450,750,50))
obstacles.push(new NormalObstacle(0,1250,750,50))
obstacles.push(new NormalObstacle(0,1050,750,50))
obstacles.push(new CircularNormalObstacle(1075,950,75))
obstacles.push(new CircularNormalObstacle(1000,1225,75))
obstacles.push(new CircularNormalObstacle(1375,1050,75))
obstacles.push(new CircularNormalObstacle(1225,1300,75))
obstacles.push(new CircularNormalObstacle(950,1450,75))
obstacles.push(new CircularNormalObstacle(1500,1300,75))
obstacles.push(new CircularNormalObstacle(1200,1575,75))
obstacles.push(new CircularNormalObstacle(1550,850,75))
obstacles.push(new CircularNormalObstacle(1275,825,75))
obstacles.push(new Redirect(0,1550,50,50,`https://www.youtube.com/watch?v=dQw4w9WgXcQ`,`rolled=lmao`))
obstacles.push(new CookieCheck(50,1500,50,50,`rolled`,`lmao`))
obstacles.push(new NormalObstacle(0,1600,700,100))
obstacles.push(new NormalObstacle(800,1600,800,100))
obstacles.push(new CoinDoor(700,1600,100,50,3))
obstacles.push(new Coin(0,1500,50,50))
obstacles.push(new Coin(1550,1550,50,50))
obstacles.push(new Coin(850,0,50,50))
obstacles.push(new Coin(200,0,50,50))
obstacles.push(new Redirect(1450,1500,100,100,`https://oldevade.zerotixdev.repl.co`,`oldevade=checkedout`))
obstacles.push(new CookieCheck(1550,1500,50,50,`oldevade`,`checkedout`))
obstacles.push(new Winpad(700,1650,100,50))
obstacles.push(new Redirect(850,50,50,50,`https://evade2.herokuapp.com`,`beentoe2=true`))
obstacles.push(new CookieCheck(900,0,50,50,`beentoe2`,`true`))
obstacles.push(new Redirect(0,0,100,100,`http://evades3.azurewebsites.net/`,`eva3=visited`))
obstacles.push(new CookieCheck(200,50,50,50,`eva3`,`visited`))
obstacles.push(new NormalObstacle(150,0,50,100))
obstacles.push(new NormalObstacle(250,0,100,100))
obstacles.push(new NormalObstacle(850,100,50,250))
spawns.push(new Spawner(900, 0, 700, 350, { type: 'normal', amount: 24, radius: 18, speed: 90 }))
spawns.push(new Spawner(850, 400, 750, 300, { type: 'normal', amount: 12, radius: 24, speed: 100 }))

module.exports = map;