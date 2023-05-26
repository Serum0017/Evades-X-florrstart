const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, Coin, Typing, CircularLavaObstacle, PlatformerGrav, Checkpoint, TimeTrap, Redirect, BreakableObstacle, Polygon, Revive}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');
const parseAddedObs = require('../addedobsparser.js');

const pod = {
  arena: { width: 1750, height: 10000 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
    safeColor: '#363636',
	playerSpawn: { x: 25, y: 25 },
	name: 'PoED',
	longName: 'Planet of Extreme Dexterity',
    bgColor: '#7C6D8C',
    tileColor: '#AD9EB8',
    difficulty: "Difficult",
    addedObstacles: [],
    // renderRaycasting: true,
}
let { texts, obstacles, safes, spawns, playerSpawn, arena } = pod;

//1. basic lava dodging/ filler

//2. quiz w/ conveyor

//3. precision

//4. reaction time (conveyor where it tells u the right way to go)

//5. typing test

//obstacles.push(new Typing(200, 0, 200, 200, `50 wpm or more is advised.`));

// ez
eval(parseAddedObs('[{"x":100,"y":9650,"w":1100,"h":350,"type":"speed","speedInc":0},{"x":0,"y":500,"w":1750,"h":450,"type":"normal","canJump":true},{"x":300,"y":300,"w":50,"h":175,"type":"lava","canCollide":true},{"x":300,"y":25,"w":50,"h":175,"type":"lava","canCollide":true},{"x":1650,"y":300,"w":50,"h":175,"type":"lava","canCollide":true},{"x":1650,"y":25,"w":50,"h":175,"type":"lava","canCollide":true},{"x":300,"y":450,"w":1400,"h":50,"type":"lava","canCollide":true},{"x":300,"y":0,"w":1400,"h":50,"type":"lava","canCollide":true},{"x":400,"y":25,"r":70,"type":"circle-lava","radius":70},{"x":600,"y":25,"r":70,"type":"circle-lava","radius":70},{"x":800,"y":25,"r":70,"type":"circle-lava","radius":70},{"x":1000,"y":25,"r":70,"type":"circle-lava","radius":70},{"x":1200,"y":25,"r":70,"type":"circle-lava","radius":70},{"x":1400,"y":25,"r":70,"type":"circle-lava","radius":70},{"x":1600,"y":25,"r":70,"type":"circle-lava","radius":70},{"x":1600,"y":450,"r":70,"type":"circle-lava","radius":70},{"x":1400,"y":450,"r":70,"type":"circle-lava","radius":70},{"x":1200,"y":450,"r":70,"type":"circle-lava","radius":70},{"x":1000,"y":450,"r":70,"type":"circle-lava","radius":70},{"x":800,"y":450,"r":70,"type":"circle-lava","radius":70},{"x":600,"y":450,"r":70,"type":"circle-lava","radius":70},{"x":400,"y":450,"r":70,"type":"circle-lava","radius":70},{"x":500,"y":450,"r":40,"type":"circle-lava","radius":40},{"x":700,"y":450,"r":40,"type":"circle-lava","radius":40},{"x":900,"y":450,"r":40,"type":"circle-lava","radius":40},{"x":1100,"y":450,"r":40,"type":"circle-lava","radius":40},{"x":1300,"y":450,"r":40,"type":"circle-lava","radius":40},{"x":1500,"y":450,"r":40,"type":"circle-lava","radius":40},{"x":1500,"y":50,"r":40,"type":"circle-lava","radius":40},{"x":1300,"y":50,"r":40,"type":"circle-lava","radius":40},{"x":1100,"y":50,"r":40,"type":"circle-lava","radius":40},{"x":900,"y":50,"r":40,"type":"circle-lava","radius":40},{"x":700,"y":50,"r":40,"type":"circle-lava","radius":40},{"x":500,"y":50,"r":40,"type":"circle-lava","radius":40},{"x":475,"y":175,"r":20,"type":"circle-lava","radius":20},{"x":700,"y":250,"r":20,"type":"circle-lava","radius":20},{"x":1100,"y":150,"r":20,"type":"circle-lava","radius":20},{"x":1300,"y":350,"r":20,"type":"circle-lava","radius":20},{"x":1500,"y":200,"r":20,"type":"circle-lava","radius":20},{"x":950,"y":325,"r":20,"type":"circle-lava","radius":20},{"x":475,"y":325,"r":40,"type":"circle-lava","radius":40},{"x":550,"y":200,"r":40,"type":"circle-lava","radius":40},{"x":700,"y":350,"r":40,"type":"circle-lava","radius":40},{"x":900,"y":175,"r":40,"type":"circle-lava","radius":40},{"x":1175,"y":325,"r":40,"type":"circle-lava","radius":40},{"x":1325,"y":175,"r":40,"type":"circle-lava","radius":40},{"x":1550,"y":275,"r":40,"type":"circle-lava","radius":40},{"x":1050,"y":350,"r":60,"type":"circle-lava","radius":60},{"x":825,"y":375,"r":60,"type":"circle-lava","radius":60},{"x":1200,"y":100,"r":60,"type":"circle-lava","radius":60},{"x":950,"y":100,"r":60,"type":"circle-lava","radius":60},{"x":650,"y":125,"r":60,"type":"circle-lava","radius":60},{"x":400,"y":125,"r":40,"type":"circle-lava","radius":40},{"x":600,"y":375,"r":40,"type":"circle-lava","radius":40},{"x":400,"y":375,"r":40,"type":"circle-lava","radius":40},{"x":1000,"y":275,"r":40,"type":"circle-lava","radius":40},{"x":1200,"y":265,"r":40,"type":"circle-lava","radius":40},{"x":1265,"y":120,"r":35,"type":"circle-lava","radius":35},{"x":1460,"y":350,"r":35,"type":"circle-lava","radius":35},{"x":750,"y":345,"r":35,"type":"circle-lava","radius":35},{"x":925,"y":370,"r":35,"type":"circle-lava","radius":35},{"x":745,"y":100,"r":35,"type":"circle-lava","radius":35},{"x":820,"y":165,"r":35,"type":"circle-lava","radius":35},{"x":500,"y":370,"r":35,"type":"circle-lava","radius":35},{"x":505,"y":110,"r":35,"type":"circle-lava","radius":35},{"x":650,"y":365,"r":55,"type":"circle-lava","radius":55},{"x":845,"y":100,"r":55,"type":"circle-lava","radius":55},{"x":1050,"y":100,"r":55,"type":"circle-lava","radius":55},{"x":1235,"y":365,"r":55,"type":"circle-lava","radius":55},{"x":1585,"y":80,"r":55,"type":"circle-lava","radius":55},{"x":1385,"y":115,"r":55,"type":"circle-lava","radius":55},{"x":1550,"y":350,"r":55,"type":"circle-lava","radius":55},{"x":1700,"y":300,"w":50,"h":200,"type":"normal","canJump":true},{"x":1700,"y":0,"w":50,"h":200,"type":"normal","canJump":true},{"x":600,"y":950,"w":800,"h":3275,"type":"normal","canJump":true},{"x":1575,"y":1450,"w":175,"h":50,"type":"lava","canCollide":true},{"x":1700,"y":200,"w":50,"h":100,"type":"tp","tpx":300,"tpy":975,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1400,"y":1500,"w":350,"h":2750,"type":"normal","canJump":true},{"x":0,"y":4200,"w":1400,"h":50,"type":"normal","canJump":true},{"x":0,"y":3800,"w":600,"h":400,"type":"normal","canJump":true},{"x":0,"y":1000,"w":600,"h":2750,"type":"platformer","force":2000,"dir":{"x":0,"y":2000},"direction":"down","jumpHeight":0},{"x":0,"y":950,"w":275,"h":50,"type":"normal","canJump":true},{"x":325,"y":950,"w":275,"h":50,"type":"normal","canJump":true},{"x":0,"y":2350,"w":275,"h":50,"type":"lava","canCollide":true},{"x":275,"y":1700,"w":50,"h":700,"type":"normal","canJump":true},{"x":275,"y":1675,"w":50,"h":25,"type":"lava","canCollide":true},{"x":275,"y":2600,"w":50,"h":650,"type":"normal","canJump":true},{"x":175,"y":3550,"w":25,"h":200,"type":"normal","canJump":true},{"x":375,"y":3550,"w":25,"h":200,"type":"normal","canJump":true},{"x":275,"y":2575,"w":50,"h":25,"type":"lava","canCollide":true},{"x":325,"y":3200,"w":275,"h":50,"type":"lava","canCollide":true},{"x":200,"y":3750,"w":175,"h":50,"type":"tp","tpx":25,"tpy":4275,"bgColor":null,"tileColor":null,"changeColor":true},{"x":0,"y":3750,"w":200,"h":50,"type":"tp","tpx":300,"tpy":975,"bgColor":null,"tileColor":null,"changeColor":true},{"x":375,"y":3750,"w":225,"h":50,"type":"tp","tpx":300,"tpy":975,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1400,"y":950,"w":350,"h":500,"type":"platformer","force":4500,"dir":{"x":0,"y":4500},"direction":"down","jumpHeight":0},{"x":0,"y":4300,"w":900,"h":450,"type":"normal","canJump":true},{"x":200,"y":4250,"w":700,"h":50,"type":"normal","canJump":true},{"x":150,"y":4250,"w":50,"h":50,"type":"tp","tpx":1575,"tpy":975,"bgColor":null,"tileColor":null,"changeColor":true},{"x":900,"y":4250,"w":100,"h":500,"type":"normal","canJump":true},{"x":1000,"y":4250,"w":750,"h":450,"type":"normal","canJump":true},{"x":1000,"y":4700,"w":700,"h":50,"type":"normal","canJump":true},{"x":1400,"y":1450,"w":175,"h":50,"type":"tp","tpx":1725,"tpy":4725,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1700,"y":4700,"w":50,"h":50,"spawn":{"x":1725,"y":4725},"type":"check","collected":false},{"x":0,"y":4750,"w":1750,"h":1250,"type":"timetrap","time":0,"maxTime":30,"resetTime":false},{"x":1600,"y":4750,"w":100,"h":300,"type":"normal","canJump":true},{"x":1550,"y":5100,"w":200,"h":100,"type":"normal","canJump":true},{"x":1450,"y":4800,"w":100,"h":400,"type":"normal","canJump":true},{"x":1400,"y":4850,"w":50,"h":350,"type":"normal","canJump":true},{"x":1350,"y":4900,"w":50,"h":300,"type":"normal","canJump":true},{"x":1300,"y":4950,"w":50,"h":250,"type":"normal","canJump":true},{"x":1250,"y":5000,"w":50,"h":200,"type":"normal","canJump":true},{"x":1200,"y":5050,"w":50,"h":150,"type":"normal","canJump":true},{"x":1150,"y":5100,"w":50,"h":100,"type":"normal","canJump":true},{"x":1100,"y":5050,"w":50,"h":150,"type":"normal","canJump":true},{"x":1050,"y":5000,"w":50,"h":200,"type":"normal","canJump":true},{"x":1000,"y":4950,"w":50,"h":250,"type":"normal","canJump":true},{"x":950,"y":4900,"w":50,"h":300,"type":"normal","canJump":true},{"x":900,"y":4850,"w":50,"h":350,"type":"normal","canJump":true},{"x":850,"y":4800,"w":50,"h":400,"type":"normal","canJump":true},{"x":1300,"y":4750,"w":50,"h":50,"type":"normal","canJump":true},{"x":1250,"y":4750,"w":50,"h":100,"type":"normal","canJump":true},{"x":1200,"y":4750,"w":50,"h":150,"type":"normal","canJump":true},{"x":1150,"y":4750,"w":50,"h":200,"type":"normal","canJump":true},{"x":1100,"y":4750,"w":50,"h":150,"type":"normal","canJump":true},{"x":1050,"y":4750,"w":50,"h":100,"type":"normal","canJump":true},{"x":1000,"y":4750,"w":50,"h":50,"type":"normal","canJump":true},{"x":950,"y":4750,"w":50,"h":25,"type":"normal","canJump":true},{"x":1350,"y":4750,"w":50,"h":25,"type":"normal","canJump":true},{"x":100,"y":5100,"w":750,"h":100,"type":"normal","canJump":true},{"x":750,"y":4880,"radius":60,"type":"circle-normal"},{"x":670,"y":5020,"radius":60,"type":"circle-normal"},{"x":455,"y":4855,"radius":60,"type":"circle-normal"},{"x":335,"y":5010,"radius":60,"type":"circle-normal"},{"x":500,"y":5090,"radius":60,"type":"circle-normal"},{"x":145,"y":4815,"radius":60,"type":"circle-normal"},{"x":145,"y":5070,"radius":60,"type":"circle-normal"},{"x":300,"y":4825,"radius":60,"type":"circle-normal"},{"x":840,"y":5015,"radius":60,"type":"circle-normal"},{"x":725,"y":5070,"radius":60,"type":"circle-normal"},{"x":735,"y":4980,"radius":60,"type":"circle-normal"},{"x":800,"y":4890,"radius":60,"type":"circle-normal"},{"x":780,"y":4945,"radius":60,"type":"circle-normal"},{"x":850,"y":4950,"radius":60,"type":"circle-normal"},{"x":780,"y":5040,"radius":60,"type":"circle-normal"},{"x":795,"y":5050,"radius":60,"type":"circle-normal"},{"x":855,"y":5105,"radius":60,"type":"circle-normal"},{"x":605,"y":5070,"radius":60,"type":"circle-normal"},{"x":680,"y":5095,"radius":60,"type":"circle-normal"},{"x":840,"y":4855,"radius":60,"type":"circle-normal"},{"x":390,"y":4780,"radius":60,"type":"circle-normal"},{"x":210,"y":5060,"radius":60,"type":"circle-normal"},{"x":265,"y":5055,"radius":60,"type":"circle-normal"},{"x":380,"y":5070,"radius":60,"type":"circle-normal"},{"x":415,"y":5080,"radius":60,"type":"circle-normal"},{"x":300,"y":5080,"radius":60,"type":"circle-normal"},{"x":-5,"y":4900,"radius":60,"type":"circle-normal"},{"x":35,"y":4820,"radius":60,"type":"circle-normal"},{"x":195,"y":4800,"radius":60,"type":"circle-normal"},{"x":95,"y":4820,"radius":60,"type":"circle-normal"},{"x":10,"y":4745,"radius":60,"type":"circle-normal"},{"x":100,"y":4750,"radius":60,"type":"circle-normal"},{"x":265,"y":4755,"radius":60,"type":"circle-normal"},{"x":340,"y":4770,"radius":60,"type":"circle-normal"},{"x":530,"y":4770,"radius":60,"type":"circle-normal"},{"x":445,"y":4760,"radius":60,"type":"circle-normal"},{"x":375,"y":4825,"radius":60,"type":"circle-normal"},{"x":535,"y":4740,"radius":60,"type":"circle-normal"},{"x":300,"y":5500,"radius":200,"type":"circle-normal"},{"x":0,"y":5300,"w":300,"h":400,"type":"normal","canJump":true},{"x":450,"y":5250,"radius":50,"type":"circle-normal"},{"x":525,"y":5325,"radius":50,"type":"circle-normal"},{"x":575,"y":5425,"radius":50,"type":"circle-normal"},{"x":575,"y":5600,"radius":50,"type":"circle-normal"},{"x":525,"y":5700,"radius":50,"type":"circle-normal"},{"x":400,"y":5775,"radius":50,"type":"circle-normal"},{"x":475,"y":5750,"radius":50,"type":"circle-normal"},{"x":575,"y":5650,"radius":50,"type":"circle-normal"},{"x":600,"y":5500,"radius":50,"type":"circle-normal"},{"x":600,"y":5550,"radius":50,"type":"circle-normal"},{"x":550,"y":5350,"radius":50,"type":"circle-normal"},{"x":500,"y":5275,"radius":50,"type":"circle-normal"},{"x":450,"y":5200,"w":350,"h":100,"type":"normal","canJump":true},{"x":575,"y":5300,"w":225,"h":525,"type":"normal","canJump":true},{"x":525,"y":5700,"w":50,"h":125,"type":"normal","canJump":true},{"x":400,"y":5750,"w":125,"h":75,"type":"normal","canJump":true},{"x":550,"y":5300,"w":25,"h":25,"type":"normal","canJump":true},{"x":400,"y":5200,"w":50,"h":50,"type":"normal","canJump":true},{"x":100,"y":5750,"w":700,"h":200,"type":"normal","canJump":true},{"x":0,"y":5700,"w":50,"h":300,"type":"lava","canCollide":true},{"x":150,"y":5950,"w":25,"h":25,"type":"lava","canCollide":true},{"x":325,"y":5975,"w":25,"h":25,"type":"lava","canCollide":true},{"x":500,"y":5950,"w":25,"h":25,"type":"lava","canCollide":true},{"x":675,"y":5975,"w":25,"h":25,"type":"lava","canCollide":true},{"x":775,"y":5950,"w":25,"h":25,"type":"lava","canCollide":true},{"x":100,"y":5950,"w":750,"h":50,"type":"size","size":12},{"x":1600,"y":5200,"w":150,"h":800,"type":"normal","canJump":true},{"x":800,"y":5900,"w":700,"h":50,"type":"normal","canJump":true},{"x":1450,"y":5300,"w":50,"h":600,"type":"normal","canJump":true},{"x":900,"y":5300,"w":550,"h":50,"type":"normal","canJump":true},{"x":900,"y":5350,"w":50,"h":450,"type":"normal","canJump":true},{"x":950,"y":5750,"w":400,"h":50,"type":"normal","canJump":true},{"x":1300,"y":5450,"w":50,"h":300,"type":"normal","canJump":true},{"x":1050,"y":5450,"w":250,"h":50,"type":"normal","canJump":true},{"x":1050,"y":5500,"w":50,"h":150,"type":"normal","canJump":true},{"x":1100,"y":5600,"w":100,"h":50,"type":"normal","canJump":true},{"x":1500,"y":5900,"w":50,"h":50,"type":"normal","canJump":true},{"x":1550,"y":5750,"w":50,"h":50,"type":"normal","canJump":true},{"x":1500,"y":5600,"w":50,"h":50,"type":"normal","canJump":true},{"x":1550,"y":5450,"w":50,"h":50,"type":"normal","canJump":true},{"x":1500,"y":5300,"w":50,"h":50,"type":"normal","canJump":true},{"x":800,"y":5200,"w":800,"h":100,"type":"size","size":12},{"x":1350,"y":5200,"w":25,"h":25,"type":"normal","canJump":true},{"x":1125,"y":5200,"w":25,"h":75,"type":"normal","canJump":true},{"x":1100,"y":5200,"w":25,"h":50,"type":"normal","canJump":true},{"x":1075,"y":5200,"w":25,"h":25,"type":"normal","canJump":true},{"x":1050,"y":5275,"w":25,"h":25,"type":"normal","canJump":true},{"x":1025,"y":5250,"w":25,"h":50,"type":"normal","canJump":true},{"x":1000,"y":5225,"w":25,"h":75,"type":"normal","canJump":true},{"x":1300,"y":5275,"w":25,"h":25,"type":"normal","canJump":true},{"x":1300,"y":5225,"w":25,"h":25,"type":"normal","canJump":true},{"x":975,"y":5250,"w":25,"h":50,"type":"normal","canJump":true},{"x":950,"y":5275,"w":25,"h":25,"type":"normal","canJump":true},{"x":925,"y":5200,"w":25,"h":25,"type":"normal","canJump":true},{"x":900,"y":5200,"w":25,"h":50,"type":"normal","canJump":true},{"x":800,"y":5200,"w":100,"h":50,"type":"normal","canJump":true},{"x":1200,"y":5225,"w":25,"h":75,"type":"normal","canJump":true},{"x":1225,"y":5250,"w":25,"h":50,"type":"normal","canJump":true},{"x":1250,"y":5275,"w":25,"h":25,"type":"normal","canJump":true},{"x":1350,"y":5250,"w":25,"h":25,"type":"normal","canJump":true},{"x":1400,"y":5225,"w":25,"h":25,"type":"normal","canJump":true},{"x":1400,"y":5275,"w":25,"h":25,"type":"normal","canJump":true},{"x":1450,"y":5250,"w":25,"h":25,"type":"normal","canJump":true},{"x":1450,"y":5200,"w":25,"h":25,"type":"normal","canJump":true},{"x":800,"y":5325,"radius":25,"type":"circle-normal"},{"x":900,"y":5325,"radius":25,"type":"circle-normal"},{"x":875,"y":5425,"radius":25,"type":"circle-normal"},{"x":825,"y":5550,"radius":25,"type":"circle-normal"},{"x":800,"y":5700,"radius":25,"type":"circle-normal"},{"x":900,"y":5700,"radius":25,"type":"circle-normal"},{"x":800,"y":5525,"w":25,"h":50,"type":"normal","canJump":true},{"x":875,"y":5400,"w":25,"h":50,"type":"normal","canJump":true},{"x":900,"y":5800,"w":550,"h":100,"type":"speed","speedInc":3},{"x":1350,"y":5350,"w":100,"h":450,"type":"tornado","spinRadius":3},{"x":950,"y":5450,"w":100,"h":300,"type":"tornado","spinRadius":3},{"x":1200,"y":5500,"w":100,"h":150,"type":"tornado","spinRadius":3},{"x":950,"y":5350,"w":400,"h":100,"type":"speed","speedInc":3},{"x":1050,"y":5650,"w":250,"h":100,"type":"speed","speedInc":3},{"x":900,"y":5975,"w":25,"h":25,"type":"normal","canJump":true},{"x":1000,"y":5950,"w":25,"h":25,"type":"normal","canJump":true},{"x":1100,"y":5975,"w":25,"h":25,"type":"normal","canJump":true},{"x":1225,"y":5950,"w":25,"h":25,"type":"normal","canJump":true},{"x":1350,"y":5975,"w":25,"h":25,"type":"normal","canJump":true},{"x":1475,"y":5950,"w":25,"h":25,"type":"normal","canJump":true},{"x":1525,"y":5975,"w":25,"h":25,"type":"normal","canJump":true},{"x":925,"y":5650,"w":75,"h":125,"type":"normal","canJump":true},{"x":975,"y":5700,"w":75,"h":75,"type":"normal","canJump":true},{"x":1000,"y":5550,"w":75,"h":50,"type":"normal","canJump":true},{"x":925,"y":5450,"w":75,"h":50,"type":"normal","canJump":true},{"x":1300,"y":5350,"w":50,"h":25,"type":"normal","canJump":true},{"x":1300,"y":5425,"w":50,"h":25,"type":"normal","canJump":true},{"x":1200,"y":5400,"w":50,"h":50,"type":"normal","canJump":true},{"x":1100,"y":5350,"w":50,"h":50,"type":"normal","canJump":true},{"x":1200,"y":5550,"w":50,"h":100,"type":"normal","canJump":true},{"x":1175,"y":5600,"w":50,"h":50,"type":"normal","canJump":true},{"x":950,"y":5350,"radius":50,"type":"circle-normal"},{"x":1175,"y":5675,"radius":25,"type":"circle-normal"},{"x":1275,"y":5725,"radius":25,"type":"circle-normal"},{"x":1150,"y":5650,"w":50,"h":25,"type":"normal","canJump":true},{"x":1250,"y":5725,"w":50,"h":50,"type":"normal","canJump":true},{"x":1275,"y":5700,"w":50,"h":50,"type":"normal","canJump":true},{"x":900,"y":5950,"w":700,"h":50,"type":"size","size":10},{"x":850,"y":5950,"w":50,"h":50,"type":"size","size":10},{"x":0,"y":6000,"w":1750,"h":500,"type":"normal","canJump":true},{"x":400,"y":6500,"w":800,"h":850,"type":"normal","canJump":true},{"x":0,"y":6900,"w":400,"h":450,"type":"normal","canJump":true},{"x":1600,"y":6500,"w":150,"h":850,"type":"normal","canJump":true},{"x":1200,"y":6900,"w":400,"h":450,"type":"normal","canJump":true},{"x":175,"y":6700,"w":50,"h":150,"type":"normal","canJump":true},{"x":1300,"y":6700,"w":50,"h":150,"type":"normal","canJump":true},{"x":1450,"y":6700,"w":50,"h":150,"type":"normal","canJump":true},{"x":0,"y":6500,"w":1600,"h":400,"type":"vinette","ir":0.1,"or":0.9,"o":0.9},{"x":1100,"y":5500,"w":100,"h":100,"type":"tp","tpx":200,"tpy":6525,"bgColor":null,"tileColor":null,"changeColor":true},{"x":200,"y":6850,"w":200,"h":50,"type":"tp","tpx":1725,"tpy":4725,"bgColor":null,"tileColor":null,"changeColor":true},{"x":0,"y":6850,"w":200,"h":50,"type":"tp","tpx":1400,"tpy":6525,"bgColor":null,"tileColor":null,"changeColor":true},{"x":0,"y":7550,"w":1550,"h":100,"type":"normal","canJump":true},{"x":50,"y":8400,"w":1700,"h":450,"type":"normal","canJump":true},{"x":0,"y":8450,"w":50,"h":400,"type":"normal","canJump":true},{"x":50,"y":8900,"w":50,"h":50,"type":"normal","canJump":true},{"x":100,"y":8850,"w":1650,"h":100,"type":"normal","canJump":true},{"x":100,"y":7350,"w":200,"h":200,"type":"typing","text":"Type me!","active":true,"currentChar":0},{"x":450,"y":7350,"w":250,"h":200,"type":"typing","text":"A typing speed of 50 wpm is recommended.","active":true,"currentChar":0},{"x":1050,"y":7450,"w":200,"h":100,"type":"typing","text":"If you need practice, go in the portal above.","active":true,"currentChar":0},{"x":0,"y":7350,"w":100,"h":200,"spawn":{"x":50,"y":7450},"type":"check","collected":false},{"x":1350,"y":7350,"w":200,"h":200,"type":"typing","text":"Good Luck!","active":true,"currentChar":0},{"x":0,"y":7650,"w":1750,"h":750,"type":"timetrap","time":0,"maxTime":240},{"x":0,"y":8400,"w":50,"h":50,"type":"normal","canJump":true},{"x":200,"y":7850,"w":1350,"h":100,"type":"normal","canJump":true},{"x":200,"y":7950,"w":100,"h":250,"type":"normal","canJump":true},{"x":300,"y":8100,"w":1050,"h":100,"type":"normal","canJump":true},{"x":1450,"y":7850,"w":300,"h":550,"type":"normal","canJump":true},{"x":300,"y":7950,"w":50,"h":150,"type":"tp","tpx":75,"tpy":8875,"bgColor":null,"tileColor":null,"changeColor":true},{"x":0,"y":7650,"w":200,"h":200,"type":"typing","text":"You will never be a crewmate. You have no purpose on this ship, you have no tasks, you have no mini games to play. You are an impostor twisted into a crude mockery of crewmatery.","active":true,"currentChar":0},{"x":0,"y":8200,"w":200,"h":200,"type":"typing","text":"All the validation you get is two-faced and halfhearted. In emergency meetings people call you sus. The other players are disgusted and ashamed of you, your friends laugh at your sussy appearance in ghost chat.","active":true,"currentChar":0},{"x":1350,"y":8100,"w":100,"h":100,"type":"typing","text":"You will never be a winner. You wrench out a fake task every single game and tell yourself it is going to be a win, but deep inside you feel the depression creeping up like a weed, ready to crush you under the unbearable weight.","active":true,"currentChar":0},{"x":350,"y":7950,"w":150,"h":150,"type":"typing","text":"Eventually it will be too much to bear - people will vote you out for being sus and will plunge you into the cold abyss. Your parents will report your body, heartbroken but relieved that they no longer have to live with the unbearable shame and disappointment. They will eject you with a headstone marked with your birth tag, and every passerby for the rest of eternity will know an impostor is drifting there. Your body will decay and go back to the dust, and all that will remain of your legacy is a skeleton that is unmistakably sus.","active":true,"currentChar":0},{"x":0,"y":9250,"w":1700,"h":50,"type":"normal","canJump":true},{"x":50,"y":9600,"w":1700,"h":50,"type":"normal","canJump":true},{"x":1700,"y":4700,"w":50,"h":50,"type":"color","bgColor":"#785E72","tileColor":"#B89AA0"},{"x":175,"y":6500,"w":50,"h":50,"type":"color","bgColor":"#2D405B","tileColor":"#4B7469"},{"x":0,"y":7350,"w":100,"h":200,"type":"color","bgColor":"#1E2625","tileColor":"#3A5451"},{"x":50,"y":8850,"w":50,"h":50,"type":"color","bgColor":"#202124","tileColor":"#BEB9B4"},{"x":1500,"y":950,"w":150,"h":50,"type":"color","bgColor":"#202124","tileColor":"#BABCBE"},{"x":0,"y":0,"w":300,"h":500,"type":"color","bgColor":"#7C6D8C","tileColor":"#AD9EB8"},{"x":0,"y":7350,"w":100,"h":200,"type":"color","bgColor":"#400F0F","tileColor":"#6E006E"},{"x":0,"y":8950,"w":1750,"h":300,"type":"grav","force":3000,"dir":{"x":3000,"y":0},"direction":"right"},{"x":0,"y":9650,"w":1700,"h":350,"type":"grav","force":400,"dir":{"x":400,"y":0},"direction":"right"},{"x":0,"y":9300,"w":1750,"h":300,"type":"grav","force":3000,"dir":{"x":-3000,"y":0},"direction":"left"},{"x":250,"y":9750,"w":450,"h":250,"type":"lava","canCollide":true},{"x":250,"y":9650,"w":50,"h":40,"type":"lava","canCollide":true},{"x":400,"y":9710,"w":50,"h":40,"type":"lava","canCollide":true},{"x":550,"y":9650,"w":150,"h":20,"type":"lava","canCollide":true},{"x":550,"y":9730,"w":150,"h":20,"type":"lava","canCollide":true},{"x":800,"y":9780,"w":20,"h":20,"type":"lava","canCollide":true},{"x":800,"y":9720,"w":20,"h":20,"type":"lava","canCollide":true},{"x":800,"y":9650,"w":20,"h":70,"type":"lava","canCollide":true},{"x":800,"y":9800,"w":20,"h":200,"type":"lava","canCollide":true},{"x":880,"y":9830,"w":20,"h":20,"type":"lava","canCollide":true},{"x":880,"y":9880,"w":20,"h":20,"type":"lava","canCollide":true},{"x":880,"y":9650,"w":20,"h":180,"type":"lava","canCollide":true},{"x":880,"y":9900,"w":20,"h":100,"type":"lava","canCollide":true},{"x":960,"y":9730,"w":20,"h":270,"type":"lava","canCollide":true},{"x":960,"y":9710,"w":20,"h":20,"type":"lava","canCollide":true},{"x":960,"y":9650,"w":20,"h":20,"type":"lava","canCollide":true},{"x":1070,"y":9650,"w":20,"h":150,"type":"lava","canCollide":true},{"x":1070,"y":9800,"w":20,"h":20,"type":"lava","canCollide":true},{"x":1070,"y":9880,"w":20,"h":20,"type":"lava","canCollide":true},{"x":1070,"y":9970,"w":20,"h":20,"type":"lava","canCollide":true},{"x":1070,"y":9990,"w":20,"h":10,"type":"lava","canCollide":true},{"x":1200,"y":9750,"w":100,"h":250,"type":"lava","canCollide":true},{"x":1600,"y":9650,"w":100,"h":250,"type":"lava","canCollide":true},{"x":700,"y":9650,"w":500,"h":350,"type":"size","size":10},{"x":50,"y":8850,"w":50,"h":50,"spawn":{"x":75,"y":8875},"type":"check","collected":false},{"x":150,"y":9075,"w":250,"h":50,"type":"lava","canCollide":true},{"x":500,"y":9075,"w":300,"h":50,"type":"lava","canCollide":true},{"x":900,"y":9075,"w":350,"h":50,"type":"lava","canCollide":true},{"x":1350,"y":9075,"w":400,"h":50,"type":"lava","canCollide":true},{"x":1200,"y":9040.166666726183,"w":50,"h":125,"type":"lavamove","points":[[1200,8950],[1200,9125]],"speed":20,"currentPoint":1,"collidable":true,"pointTo":{"x":1200,"y":8950},"pointOn":{"x":1200,"y":9125}},{"x":350,"y":8950,"w":50,"h":125,"type":"tp","tpx":75,"tpy":8875,"bgColor":null,"tileColor":null,"changeColor":true},{"x":750,"y":9125,"w":50,"h":125,"type":"tp","tpx":75,"tpy":8875,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1350,"y":8950,"w":400,"h":125,"type":"tp","tpx":75,"tpy":8875,"bgColor":null,"tileColor":null,"changeColor":true},{"x":350,"y":9125,"w":50,"h":125,"type":"tp","tpx":430,"tpy":9100,"bgColor":null,"tileColor":null,"changeColor":true},{"x":750,"y":8950,"w":50,"h":125,"type":"tp","tpx":830,"tpy":9100,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1350,"y":9125,"w":400,"h":125,"type":"tp","tpx":1725,"tpy":9275,"bgColor":null,"tileColor":null,"changeColor":true},{"x":400,"y":9075,"w":5,"h":50,"type":"normal","canJump":true},{"x":800,"y":9075,"w":5,"h":50,"type":"normal","canJump":true},{"x":1450,"y":9850,"w":425,"h":50,"type":"rotate-lava","angle":65441.428229022655,"rotateSpeed":80,"pivotX":1450,"pivotY":9850,"distToPivot":0,"canCollide":true},{"x":1700,"y":9650,"w":50,"h":350,"type":"winpad"},{"x":0,"y":9300,"w":1750,"h":300,"type":"timetrap","time":0,"maxTime":40,"resetTime":false},{"x":1325,"y":9400,"radius":60,"type":"circle-normal"},{"x":1450,"y":9525,"radius":60,"type":"circle-normal"},{"x":1275,"y":9550,"radius":60,"type":"circle-normal"},{"x":1125,"y":9425,"radius":60,"type":"circle-normal"},{"x":1075,"y":9575,"radius":60,"type":"circle-normal"},{"x":1475,"y":9350,"radius":60,"type":"circle-normal"},{"x":1650,"y":9475,"radius":60,"type":"circle-normal"},{"x":1600,"y":9325,"radius":60,"type":"circle-normal"},{"x":850,"y":9350,"w":50,"h":250,"type":"normal","canJump":true},{"x":750,"y":9300,"w":50,"h":250,"type":"normal","canJump":true},{"x":650,"y":9350,"w":50,"h":250,"type":"normal","canJump":true},{"x":50,"y":9350,"w":600,"h":50,"type":"normal","canJump":true},{"x":0,"y":9500,"w":600,"h":50,"type":"normal","canJump":true},{"x":0,"y":9450,"w":10,"h":50,"type":"bounce","effect":50},{"x":80,"y":9400,"w":10,"h":50,"type":"bounce","effect":50},{"x":160,"y":9450,"w":10,"h":50,"type":"bounce","effect":50},{"x":250,"y":9420,"radius":30,"type":"circle-bounce","effect":60},{"x":380,"y":9480,"radius":30,"type":"circle-bounce","effect":60},{"x":550,"y":9400,"w":50,"h":100,"type":"breakable","maxStrength":10,"currentStrength":10,"time":-0.39166666666666705,"timer":0,"regenTime":5,"healTimer":0},{"x":450,"y":9400,"w":40,"h":40,"type":"bounce","effect":100},{"x":50,"y":9400,"w":600,"h":100,"type":"size","size":15},{"x":0,"y":1900,"w":200,"h":50,"type":"lava","canCollide":true},{"x":425,"y":2350,"w":175,"h":50,"type":"lava","canCollide":true},{"x":150,"y":2800,"radius":60,"type":"circle-normal"},{"x":150,"y":3075,"radius":60,"type":"circle-normal"},{"points":[[450,2750],[525,2875],[375,2875]],"type":"poly"},{"points":[[450,3000],[525,3125],[375,3125]],"type":"poly"},{"x":100,"y":2125,"w":175,"h":50,"type":"lava","canCollide":true},{"x":325,"y":1900,"w":75,"h":50,"type":"lava","canCollide":true},{"x":500,"y":1900,"w":100,"h":50,"type":"lava","canCollide":true},{"x":325,"y":2125,"w":175,"h":50,"type":"lava","canCollide":true},{"x":445,"y":9400,"w":5,"h":40,"type":"normal","canJump":true},{"x":75,"y":9400,"w":5,"h":50,"type":"normal","canJump":true},{"x":155,"y":9450,"w":5,"h":50,"type":"normal","canJump":true},{"x":220,"y":9385,"w":30,"h":65,"type":"normal","canJump":true},{"x":235,"y":9380,"w":45,"h":20,"type":"normal","canJump":true},{"x":350,"y":9450,"w":30,"h":75,"type":"normal","canJump":true},{"x":360,"y":9500,"w":50,"h":25,"type":"normal","canJump":true},{"x":150,"y":9750,"w":100,"h":250,"type":"grav","force":2000,"dir":{"x":0,"y":-2000},"direction":"up"},{"x":150,"y":9650,"w":100,"h":40,"type":"grav","force":2000,"dir":{"x":0,"y":2000},"direction":"down"},{"x":500,"y":9650,"w":50,"h":20,"type":"grav","force":2000,"dir":{"x":0,"y":2000},"direction":"down"},{"x":750,"y":9650,"w":50,"h":90,"type":"grav","force":2000,"dir":{"x":0,"y":2000},"direction":"down"},{"x":850,"y":9740,"w":30,"h":110,"type":"grav","force":2000,"dir":{"x":0,"y":2000},"direction":"down"},{"x":1070,"y":9900,"w":20,"h":100,"type":"lava","canCollide":true},{"x":350,"y":9700,"w":50,"h":50,"type":"grav","force":2000,"dir":{"x":0,"y":-2000},"direction":"up"},{"x":500,"y":9730,"w":50,"h":20,"type":"grav","force":2000,"dir":{"x":0,"y":-2000},"direction":"up"},{"x":750,"y":9780,"w":50,"h":60,"type":"grav","force":2000,"dir":{"x":0,"y":-2000},"direction":"up"},{"x":1150,"y":9700,"w":50,"h":300,"type":"grav","force":2000,"dir":{"x":0,"y":-2000},"direction":"up"},{"x":920,"y":9650,"w":40,"h":20,"type":"grav","force":2000,"dir":{"x":0,"y":2000},"direction":"down"},{"x":0,"y":9650,"w":50,"h":300,"type":"grav","force":2000,"dir":{"x":0,"y":2000},"direction":"down"},{"x":50,"y":9650,"w":50,"h":300,"type":"normal","canJump":true},{"x":850,"y":9880,"w":30,"h":120,"type":"grav","force":2000,"dir":{"x":0,"y":-2000},"direction":"up"},{"x":1050,"y":7350,"w":200,"h":100,"type":"redirect","url":"https:play.typeracer.com","cookie":"undefined"},{"x":920,"y":9720,"w":40,"h":180,"type":"grav","force":2000,"dir":{"x":0,"y":-2000},"direction":"up"},{"x":1025,"y":9880,"w":45,"h":40,"type":"grav","force":2000,"dir":{"x":0,"y":-2000},"direction":"up"},{"x":1025,"y":9650,"w":45,"h":170,"type":"grav","force":2000,"dir":{"x":0,"y":2000},"direction":"down"},{"x":1050,"y":7350,"w":200,"h":100,"type":"redirect","url":"https:play.typeracer.com","cookie":"null"},{"x":1550,"y":7550,"w":200,"h":100,"type":"grav","force":3000,"dir":{"x":0,"y":3000},"direction":"down"},{"x":1050,"y":7350,"w":200,"h":100,"type":"redirect","url":"https://play.typeracer.com/","cookie":null},{"x":1325,"y":6850,"w":150,"h":50,"type":"tp","tpx":25,"tpy":7375,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1200,"y":6850,"w":125,"h":50,"type":"tp","tpx":1725,"tpy":4725,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1475,"y":6850,"w":125,"h":50,"type":"tp","tpx":1725,"tpy":4725,"bgColor":null,"tileColor":null,"changeColor":true},{"x":495,"y":9075,"w":5,"h":50,"type":"normal"},{"x":145,"y":9075,"w":5,"h":50,"type":"normal"},{"x":895,"y":9075,"w":5,"h":50,"type":"normal"},{"x":1345,"y":9075,"w":5,"h":50,"type":"normal"}]'));
                   
texts.push(new Text(300, 1500, '9 + 12'));
texts.push(new Text(150, 1700, '20'));
texts.push(new Text(475, 1700, '21'));

texts.push(new Text(300, 2500, 'x^2 + y^2 = 1'));
texts.push(new Text(150, 2700, 'circle'));
texts.push(new Text(475, 2700, 'equilateral\ntriangle'));
// pos later
texts.push(new Text(300, 3300, 'Two trains, Train A and Train B, simultaneously depart Station A and Station B.', false, 18));
texts.push(new Text(300, 3320, 'Station A and Station B are 252.5 miles apart from each other.', false, 18));
texts.push(new Text(300, 3340, 'Train A is moving at 124.7mph towards station B, and Train B is moving at 253.5mph towards Station A.', false, 18));
texts.push(new Text(300, 3360, 'If both trains departed at 10:00AM and it is now 10:08, how much longer until both trains pass each other?', false, 18));

texts.push(new Text(87.5, 3600, '16.232 minutes', false, 24));
texts.push(new Text(285, 3600, '32.058 minutes', false, 24));
texts.push(new Text(500, 3600, '32.049 minutes', false, 24));

texts.push(new Text(1575, 975, 'Think fast!'));

texts.push(new Text(1725, 4650, 'Race!'));

texts.push(new Text(200, 6600, 'What comes next in the sequence ...', false, 18));
texts.push(new Text(200, 6620, '2, 3, 8, 63?', false, 18));
texts.push(new Text(100, 6730, '3968', false, 18));
texts.push(new Text(312.5, 6730, '1046', false, 18));

texts.push(new Text(1400, 6600, 'Who is the impostor?', false, 24));
texts.push(new Text(1250, 6730, 'Red', false, 24));
texts.push(new Text(1400, 6730, 'Cyan', false, 24));
texts.push(new Text(1550, 6730, 'Pink', false, 24));

obstacles.push(new Redirect(1050, 7350, 200, 100, 'https://play.typeracer.com/'));// or we could make it a 10% chance to redir to a rickroll with ? : :)

texts.push(new Text(250, 8925, 'What is 2^12?', false, 14));
texts.push(new Text(250, 9012, '2048'));
texts.push(new Text(250, 9186, '4096'));

texts.push(new Text(550, 8925, 'When was the decloration of independence signed?', false, 14));
texts.push(new Text(650, 9012, '1776'));
texts.push(new Text(650, 9186, '1876'));

texts.push(new Text(1000, 8925, 'Where is the moving lava gonna be?', false, 14));

texts.push(new Text(1425, 8925, 'What is the right answer?', false, 18));
texts.push(new Text(1300, 9012, 'up'));
texts.push(new Text(1300, 9186, 'down'));

/*
{"x":1325,"y":6850,"w":150,"h":50,"type":"tp","tpx":1725,"tpy":4725,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1200,"y":6850,"w":125,"h":50,"type":"tp","tpx":1725,"tpy":4725,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1475,"y":6850,"w":125,"h":50,"type":"tp","tpx":25,"tpy":7375,"bgColor":null,"tileColor":null,"changeColor":true}*/
let rand = Math.random()*3;
// randomizing impostor LOL
if(rand < 1){
    obstacles.push(new Tp(1325,6850,150,50,1725,4725))
    obstacles.push(new Tp(1200,6850,125,50,1725,4725))
    obstacles.push(new Tp(1475,6850,125,50,25,7375))
} else if(rand < 2){
    obstacles.push(new Tp(1325,6850,150,50,1725,4725))
    obstacles.push(new Tp(1200,6850,125,50,25,7375))
    obstacles.push(new Tp(1475,6850,125,50,1725,4725))
} else {
    obstacles.push(new Tp(1325,6850,150,50,25,7375))
    obstacles.push(new Tp(1200,6850,125,50,1725,4725))
    obstacles.push(new Tp(1475,6850,125,50,1725,4725))
}

module.exports = pod;