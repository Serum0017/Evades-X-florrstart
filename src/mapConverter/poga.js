const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, Coin, Typing, CircularLavaObstacle, PlatformerGrav, Checkpoint, TimeTrap, Redirect, BreakableObstacle, Polygon, Gun}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');
const parseAddedObs = require('../addedobsparser.js');

const map = {
  arena: { width: 8000, height: 3800 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
    safeColor: '#363636',
	playerSpawn: { x: 25, y: 25 },
	name: 'PoGA',
	longName: 'Planet of Gun Abuse',
    bgColor: '#393A3C',
    tileColor: '#E5493A',
    difficulty: "Difficult",
    addedObstacles: []
}
let { texts, obstacles, safes, spawns, playerSpawn, arena } = map;

// ez
eval(parseAddedObs('[{"x":0,"y":100,"w":1100,"h":600,"type":"normal","canJump":true},{"x":350,"y":0,"w":750,"h":100,"type":"normal","canJump":true},{"x":1050,"y":0,"w":100,"h":700,"type":"normal","canJump":true},{"x":0,"y":0,"w":100,"h":100,"type":"gun","state":true,"gunType":"normal","fireCooldown":0.5,"speed":200,"radius":30,"life":2},{"x":0,"y":1200,"w":1900,"h":450,"type":"normal","canJump":true},{"x":1150,"y":0,"w":750,"h":1200,"type":"normal","canJump":true},{"x":0,"y":950,"w":100,"h":250,"type":"gun","state":true,"gunType":"stun","fireCooldown":0.4,"speed":350,"radius":24,"life":3},{"x":0,"y":700,"w":100,"h":250,"type":"gun","state":true,"gunType":"push","fireCooldown":0.4,"speed":350,"radius":24,"life":3},{"x":300,"y":0,"w":50,"h":100,"type":"tp","tpx":50,"tpy":825,"bgColor":null,"tileColor":null,"changeColor":true},{"x":0,"y":1650,"w":1900,"h":100,"type":"normal","canJump":true},{"x":1900,"y":1200,"w":6100,"h":550,"type":"normal","canJump":true},{"x":1100,"y":700,"w":50,"h":500,"type":"tp","tpx":1925,"tpy":25,"bgColor":null,"tileColor":null,"changeColor":true},{"x":3250,"y":0,"w":800,"h":1200,"type":"normal","canJump":true},{"x":3200,"y":0,"w":50,"h":1200,"type":"tp","tpx":4075,"tpy":1175,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1900,"y":0,"w":100,"h":100,"type":"gun","state":true,"gunType":"normal","fireCooldown":0.2,"speed":400,"radius":18,"life":3},{"x":7950,"y":0,"w":50,"h":1200,"type":"tp","tpx":25,"tpy":1775,"bgColor":null,"tileColor":null,"changeColor":true},{"x":4050,"y":1100,"w":100,"h":100,"type":"gun","state":true,"gunType":"push","fireCooldown":2,"speed":280,"radius":80,"life":10},{"x":0,"y":1750,"w":100,"h":100,"type":"gun","state":true,"gunType":"stun","fireCooldown":0.3,"speed":400,"radius":14,"life":4},{"x":0,"y":3350,"w":8000,"h":550,"type":"normal","canJump":true},{"x":2850,"y":1750,"w":900,"h":1600,"type":"normal","canJump":true},{"x":2800,"y":1750,"w":50,"h":1600,"type":"tp","tpx":3775,"tpy":1775,"bgColor":null,"tileColor":null,"changeColor":true},{"x":3750,"y":1900,"w":300,"h":100,"type":"normal"},{"x":4100,"y":1750,"w":3900,"h":250,"type":"normal"},{"x":7950,"y":2000,"w":50,"h":1350,"type":"winpad"},{"x":3750,"y":1800,"w":100,"h":100,"type":"gun","gunType":"normal","state":true,"fireCooldown":0.2,"speed":580,"radius":18,"life":6},{"x":3850,"y":1800,"w":100,"h":100,"type":"gun","gunType":"push","state":true,"fireCooldown":2,"speed":520,"radius":200,"life":12},{"x":3950,"y":1800,"w":100,"h":100,"type":"gun","gunType":"stun","state":true,"fireCooldown":0.1,"speed":800,"radius":14,"life":6},{"x":3750,"y":1950,"w":300,"h":1400,"type":"normal"}]'));

texts.push(new Text(85, -35, 'Shift to shoot.'));
texts.push(new Text(4300, 1930, 'Good Luck!'));
spawns.push(new Spawner(155, 0, 101, 101, { type: 'normal', amount: 1, radius: 50, speed: 0 }));
spawns.push(new Spawner(100, 700, 1000, 500, { type: 'normal', amount: 12, radius: 50, speed: 280 }));
spawns.push(new Spawner(1900, 0, 1300, 1200, { type: 'growing', amount: 40, radius: 40, speed: 320, growSpeed: 60, growing: true, minRadius: 40, maxRadius: 120 }));
spawns.push(new Spawner(4050, 0, 3900, 1200, { type: 'turning', amount: 360, radius: 36, speed: 120, changeDir: 2 }))
spawns.push(new Spawner(0, 1750, 2800, 1600, { type: 'polygon', amount: 150, sides: 5, size: 38, speed: 380 }));
safes.push(new Safe(0, 700, 100, 500));
safes.push(new Safe(1900, 0, 100, 100));
safes.push(new Safe(4050, 1100, 100, 100));
safes.push(new Safe(0, 1750, 100, 100));

// final section
spawns.push(new Spawner(4050, 2000, 3900, 1350, { type: 'normal', amount: 30, radius: 50, speed: 320 }));
spawns.push(new Spawner(4050, 2000, 3900, 1350, { type: 'polygon', amount: 30, sides: 5, size: 38, speed: 300 }));
spawns.push(new Spawner(4050, 2000, 3900, 1350, { type: 'growing', amount: 30, radius: 40, speed: 360, growSpeed: 100, growing: true, minRadius: 40, maxRadius: 80 }));
spawns.push(new Spawner(4050, 2000, 3900, 1350, { type: 'turning', amount: 30, radius: 36, speed: 280, changeDir: 1 }))

module.exports = map;