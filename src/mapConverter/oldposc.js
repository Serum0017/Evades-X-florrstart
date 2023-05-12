const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, Checkpoint, Ship, CoinDoor, Coin, BreakableObstacle, TimeTrap, MovingTpObstacle }= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');
const parseAddedObs = require('../addedobsparser.js');

const posc = {
  arena: { width: 12000, height: 1000 },
  enemy: [],
  safes: [],
  texts: [],
  obstacles: [],
  spawns: [],
  playerSpawn: {x: 75, y: 50 }, //{ x: 50, y: 50 },
  name: 'PoSC',
  longName: 'Planet of Simple Challenges',
  bgColor: '#27811b',//'#815C1B',
  tileColor: '#6ab95a',//'#B9915A',
/*
  bgColor: '#68a30f',
  tileColor: '#8cdb16', */
  difficulty: "Peaceful",// can u do on poca instead ;c,
  addedObstacles: [],/**/
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = posc;

let text = '[{"x":50,"y":50,"w":100,"h":150,"type":"normal","canJump":true},{"x":0,"y":250,"w":250,"h":50,"type":"normal","canJump":true},{"x":100,"y":160,"w":200,"h":20,"type":"rotate-lava","angle":-46712.46243696027,"rotateSpeed":-120,"pivotX":100,"pivotY":160,"distToPivot":0,"canCollide":true},{"x":100,"y":0,"w":50,"h":50,"type":"normal","canJump":true},{"x":200,"y":0,"w":50,"h":250,"type":"normal","canJump":true},{"x":150,"y":0,"w":50,"h":50,"type":"tp","tpx":250,"tpy":0,"bgColor":null,"tileColor":null,"changeColor":true},{"x":300,"y":0,"w":50,"h":50,"type":"normal","canJump":true},{"x":250,"y":100,"w":100,"h":300,"type":"normal","canJump":true},{"x":400,"y":0,"w":50,"h":500,"type":"normal","canJump":true},{"x":200,"y":6015,"w":400,"h":30,"type":"rotate-lava","angle":-105099.76616435053,"rotateSpeed":-270,"pivotX":200,"pivotY":6015,"distToPivot":0,"canCollide":true},{"x":50,"y":450,"w":350,"h":50,"type":"normal","canJump":true},{"x":50,"y":350,"w":150,"h":100,"type":"normal","canJump":true},{"x":-40.66666666661475,"y":300,"w":50,"h":50,"type":"lavamove","points":[[-100,300],[200,300]],"speed":80,"currentPoint":1,"collidable":true,"pointTo":{"x":-100,"y":300},"pointOn":{"x":200,"y":300}},{"x":0,"y":350,"w":50,"h":150,"spawn":{"x":25,"y":425},"type":"check","collected":false},{"x":150,"y":500,"w":50,"h":450,"type":"normal","canJump":true},{"x":2.085981714540248e-14,"y":840.6666666654386,"w":150,"h":50,"type":"move","points":[[0,500],[0,900],[-150,900],[-150,500]],"speed":80,"currentPoint":0,"pointTo":{"x":0,"y":900},"pointOn":{"x":0,"y":500}},{"x":-150,"y":559.3333333345624,"w":150,"h":50,"type":"move","points":[[0,500],[0,900],[-150,900],[-150,500]],"speed":80,"currentPoint":2,"pointTo":{"x":-150,"y":500},"pointOn":{"x":-150,"y":900}},{"x":0,"y":500,"w":150,"h":100,"type":"grav","force":6000,"dir":{"x":0,"y":6000},"direction":"down"},{"x":0,"y":600,"w":150,"h":50,"type":"grav","force":6000,"dir":{"x":0,"y":-6000},"direction":"up"},{"x":0,"y":650,"w":150,"h":300,"type":"speed","speedInc":1.5},{"x":0,"y":725,"w":75,"h":50,"type":"tp","tpx":75,"tpy":600,"bgColor":null,"tileColor":null,"changeColor":true},{"x":75,"y":875,"w":75,"h":50,"type":"tp","tpx":75,"tpy":600,"bgColor":null,"tileColor":null,"changeColor":true},{"x":400,"y":550,"w":50,"h":450,"type":"normal","canJump":true},{"x":400,"y":500,"w":50,"h":50,"spawn":{"x":425,"y":525},"type":"check","collected":false},{"x":450,"y":450,"w":800,"h":50,"type":"normal","canJump":true},{"x":450,"y":500,"w":800,"h":500,"type":"size","size":18},{"x":1250,"y":450,"w":50,"h":550,"type":"normal","canJump":true},{"x":550,"y":500,"w":50,"h":450,"type":"normal","canJump":true},{"x":600,"y":900,"w":600,"h":50,"type":"normal","canJump":true},{"x":1150,"y":550,"w":50,"h":350,"type":"normal","canJump":true},{"x":650,"y":550,"w":500,"h":50,"type":"normal","canJump":true},{"x":650,"y":600,"w":50,"h":200,"type":"normal","canJump":true},{"x":650,"y":800,"w":500,"h":50,"type":"normal","canJump":true},{"x":1100,"y":850,"w":50,"h":50,"type":"tp","tpx":1325,"tpy":975,"bgColor":null,"tileColor":null,"changeColor":true},{"x":1300,"y":950,"w":50,"h":50,"spawn":{"x":1325,"y":975},"type":"check","collected":false},{"x":1300,"y":900,"w":450,"h":50,"type":"normal","canJump":true},{"x":1800,"y":0,"w":800,"h":1000,"type":"normal","canJump":true},{"x":550,"y":0,"w":50,"h":400,"type":"tp","tpx":2625,"tpy":null,"bgColor":null,"tileColor":null,"changeColor":true},{"x":450,"y":400,"w":1300,"h":50,"type":"normal","canJump":true},{"x":1750,"y":0,"w":50,"h":400,"spawn":{"x":1775,"y":200},"type":"check","collected":false},{"x":600,"y":0,"w":1140,"h":400,"type":"grav","force":1000,"dir":{"x":-1000,"y":0},"direction":"left"},{"x":2600,"y":0,"w":150,"h":150,"type":"color","bgColor":"#6376C1","tileColor":"#9EC0ED"},{"x":2600,"y":150,"w":1550,"h":50,"type":"normal","canJump":true},{"x":2600,"y":0,"w":150,"h":150,"spawn":{"x":2675,"y":75},"type":"check","collected":false},{"x":2750,"y":0,"w":750,"h":150,"type":"snap","snapDistance":50,"snapWait":0.5,"snapX":true,"snapY":true},{"x":3000,"y":0,"w":50,"h":60,"type":"lava","canCollide":true},{"x":3150,"y":90,"w":50,"h":60,"type":"lava","canCollide":true},{"x":3300,"y":0,"w":50,"h":60,"type":"lava","canCollide":true},{"x":3600,"y":0,"w":100,"h":150,"type":"speed","speedInc":0.1},{"x":3600,"y":0,"w":100,"h":150,"type":"size","size":10},{"x":3850,"y":0,"w":150,"h":150,"type":"snap","snapDistance":50,"snapWait":0.1,"snapX":true,"snapY":true},{"x":4100,"y":0,"w":25,"h":150,"type":"tp","tpx":2625,"tpy":225,"bgColor":null,"tileColor":null,"changeColor":true},{"x":2600,"y":200,"w":50,"h":50,"spawn":{"x":2625,"y":225},"type":"check","collected":false},{"x":2650,"y":200,"w":50,"h":400,"type":"normal","canJump":true},{"x":2750,"y":250,"w":50,"h":400,"type":"normal","canJump":true},{"x":2600,"y":650,"w":200,"h":50,"type":"normal","canJump":true},{"x":2675,"y":380,"w":200,"h":10,"type":"rotate-lava","angle":-70068.605171336,"rotateSpeed":-180,"pivotX":2675,"pivotY":380,"distToPivot":0,"canCollide":true},{"x":2675,"y":580,"w":200,"h":10,"type":"rotate-lava","angle":-70068.605171336,"rotateSpeed":-180,"pivotX":2675,"pivotY":580,"distToPivot":0,"canCollide":true},{"x":2700,"y":200,"w":50,"h":50,"spawn":{"x":2725,"y":225},"type":"check","collected":false},{"x":2850,"y":311,"w":50,"h":50,"type":"lavamove","points":[[2800,200],[2850,200],[2850,350],[2800,350]],"speed":120,"currentPoint":1,"collidable":true,"pointTo":{"x":2850,"y":350},"pointOn":{"x":2850,"y":200}},{"x":2800,"y":400,"w":100,"h":50,"type":"normal","canJump":true},{"x":2900,"y":250,"w":50,"h":200,"type":"normal","canJump":true},{"x":2950,"y":250,"w":150,"h":50,"type":"normal","canJump":true},{"x":3050,"y":300,"w":50,"h":150,"type":"normal","canJump":true},{"x":3100,"y":400,"w":1150,"h":50,"type":"normal","canJump":true},{"x":3200,"y":300,"r":71.25,"type":"growinglavacircle","minWidth":1,"maxWidth":90,"growSpeed":30,"growing":false,"radius":71.25},{"x":3400,"y":300,"r":71.25,"type":"growinglavacircle","minWidth":1,"maxWidth":90,"growSpeed":30,"growing":false,"radius":71.25},{"x":3600,"y":300,"r":71.25,"type":"growinglavacircle","minWidth":1,"maxWidth":90,"growSpeed":30,"growing":false,"radius":71.25},{"x":3750,"y":200,"w":400,"h":200,"type":"snap","snapDistance":25,"snapWait":0.25,"snapX":true,"snapY":true},{"x":4125,"y":0,"w":25,"h":150,"type":"tp","tpx":4275,"tpy":25,"bgColor":null,"tileColor":null,"changeColor":true},{"x":4200,"y":0,"w":50,"h":400,"type":"normal","canJump":true},{"x":4250,"y":0,"w":100,"h":50,"spawn":{"x":4300,"y":25},"type":"check","collected":false},{"x":4350,"y":0,"w":50,"h":350,"type":"normal","canJump":true},{"x":4250,"y":139,"w":50,"h":50,"type":"lavamove","points":[[4250,50],[4250,350]],"speed":120,"currentPoint":1,"collidable":true,"pointTo":{"x":4250,"y":50},"pointOn":{"x":4250,"y":350}},{"x":4300,"y":261,"w":50,"h":50,"type":"lavamove","points":[[4300,50],[4300,350]],"speed":120,"currentPoint":0,"collidable":true,"pointTo":{"x":4300,"y":350},"pointOn":{"x":4300,"y":50}},{"x":4250,"y":400,"w":650,"h":50,"type":"normal","canJump":true},{"x":4850,"y":50,"w":50,"h":350,"type":"normal","canJump":true},{"x":4850,"y":0,"w":150,"h":50,"spawn":{"x":4925,"y":25},"type":"check","collected":false},{"x":4900,"y":50,"w":50,"h":50,"type":"normal","canJump":true},{"x":4950,"y":190.66666667118434,"w":50,"h":50,"type":"lavamove","points":[[4900,100],[4950,100],[4950,200],[4900,200]],"speed":80,"currentPoint":1,"collidable":true,"pointTo":{"x":4950,"y":200},"pointOn":{"x":4950,"y":100}},{"x":4900,"y":259.3333333280593,"w":50,"h":50,"type":"lavamove","points":[[4900,250],[4950,250],[4950,350],[4900,350]],"speed":80,"currentPoint":3,"collidable":true,"pointTo":{"x":4900,"y":250},"pointOn":{"x":4900,"y":350}},{"x":4900,"y":400,"w":100,"h":25,"type":"tp","tpx":2700,"tpy":850,"bgColor":null,"tileColor":null,"changeColor":true},{"x":4900,"y":425,"w":100,"h":25,"type":"normal","canJump":true},{"x":2600,"y":700,"w":200,"h":300,"spawn":{"x":2700,"y":850},"type":"check","collected":false},{"x":2600,"y":700,"w":200,"h":300,"type":"color","bgColor":"#50466B","tileColor":"#885991"},{"x":2950,"y":300,"w":100,"h":150,"type":"normal","canJump":true},{"x":3350,"y":500,"w":50,"h":500,"type":"normal","canJump":true},{"x":3900,"y":450,"w":50,"h":500,"type":"normal","canJump":true},{"x":4500,"y":500,"w":50,"h":500,"type":"normal","canJump":true},{"x":3650,"y":727,"w":500,"h":30,"type":"rotate-lava","angle":46714.49784265972,"rotateSpeed":120,"pivotX":3650,"pivotY":727,"distToPivot":0,"canCollide":true},{"x":4550,"y":898.3333333347298,"w":100,"h":100,"type":"lavamove","points":[[4550,450],[4550,900]],"speed":200,"currentPoint":1,"collidable":true,"pointTo":{"x":4550,"y":450},"pointOn":{"x":4550,"y":900}},{"x":4650,"y":451.66666666527027,"w":100,"h":100,"type":"lavamove","points":[[4650,450],[4650,900]],"speed":200,"currentPoint":0,"collidable":true,"pointTo":{"x":4650,"y":900},"pointOn":{"x":4650,"y":450}},{"x":4750,"y":898.3333333347298,"w":100,"h":100,"type":"lavamove","points":[[4750,450],[4750,900]],"speed":200,"currentPoint":1,"collidable":true,"pointTo":{"x":4750,"y":450},"pointOn":{"x":4750,"y":900}},{"x":4850,"y":451.66666666527027,"w":100,"h":100,"type":"lavamove","points":[[4850,450],[4850,900]],"speed":200,"currentPoint":0,"collidable":true,"pointTo":{"x":4850,"y":900},"pointOn":{"x":4850,"y":450}},{"x":5000,"y":0,"w":850,"h":1000,"type":"normal","canJump":true},{"x":4950,"y":450,"w":50,"h":550,"type":"tp","tpx":5875,"tpy":25,"bgColor":null,"tileColor":null,"changeColor":true},{"x":5850,"y":0,"w":50,"h":50,"type":"color","bgColor":"#2B4280","tileColor":"#2F72A6"},{"x":5850,"y":100,"w":200,"h":50,"type":"normal","canJump":true},{"x":5850,"y":0,"w":50,"h":100,"spawn":{"x":5875,"y":50},"type":"check","collected":false},{"x":6050,"y":100,"w":200,"h":50,"type":"ship","state":true},{"x":6250,"y":0,"w":50,"h":800,"type":"normal","canJump":true},{"x":6300,"y":750,"w":950,"h":50,"type":"normal","canJump":true},{"x":7200,"y":150,"w":50,"h":600,"type":"normal","canJump":true},{"x":7500,"y":0,"w":50,"h":1000,"type":"normal","canJump":true},{"x":6450,"y":150,"w":750,"h":50,"type":"normal","canJump":true},{"x":6450,"y":200,"w":50,"h":400,"type":"normal","canJump":true},{"x":6500,"y":550,"w":550,"h":50,"type":"normal","canJump":true},{"x":7000,"y":300,"w":50,"h":250,"type":"normal","canJump":true},{"x":6600,"y":300,"w":400,"h":50,"type":"normal","canJump":true},{"x":6600,"y":350,"w":50,"h":100,"type":"normal","canJump":true},{"x":6650,"y":350,"w":150,"h":50,"type":"normal","canJump":true},{"x":6650,"y":400,"w":250,"h":50,"type":"normal","canJump":true},{"x":5850,"y":850,"w":50,"h":150,"type":"normal","canJump":true},{"x":5875,"y":950,"w":125,"h":50,"type":"normal","canJump":true},{"x":7550,"y":0,"w":850,"h":1000,"type":"normal","canJump":true},{"x":5900,"y":900,"w":50,"h":50,"type":"normal","canJump":true},{"x":7350,"y":950,"w":150,"h":50,"type":"normal","canJump":true},{"x":7450,"y":850,"w":50,"h":100,"type":"normal","canJump":true},{"x":7400,"y":900,"w":50,"h":50,"type":"normal","canJump":true},{"x":7350,"y":0,"w":150,"h":50,"type":"normal","canJump":true},{"x":7400,"y":50,"w":50,"h":50,"type":"normal","canJump":true},{"x":7450,"y":50,"w":50,"h":100,"type":"normal","canJump":true},{"x":7100,"y":700,"w":100,"h":50,"type":"normal","canJump":true},{"x":7150,"y":650,"w":50,"h":50,"type":"normal","canJump":true},{"x":6300,"y":0,"w":150,"h":50,"type":"normal","canJump":true},{"x":7150,"y":250,"w":50,"h":50,"type":"normal","canJump":true},{"x":6300,"y":50,"w":50,"h":100,"type":"normal","canJump":true},{"x":6300,"y":650,"w":50,"h":100,"type":"normal","canJump":true},{"x":6350,"y":50,"w":50,"h":50,"type":"normal","canJump":true},{"x":6350,"y":700,"w":50,"h":50,"type":"normal","canJump":true},{"x":6500,"y":200,"w":50,"h":50,"type":"normal","canJump":true},{"x":6500,"y":500,"w":50,"h":75,"type":"normal","canJump":true},{"x":6950,"y":500,"w":50,"h":50,"type":"normal","canJump":true},{"x":6300,"y":800,"radius":40,"type":"circle-normal"},{"x":6050,"y":300,"w":200,"h":50,"type":"normal","canJump":true},{"x":5850,"y":575,"w":200,"h":50,"type":"normal","canJump":true},{"x":6000,"y":750,"w":250,"h":50,"type":"normal","canJump":true},{"x":6050,"y":575,"w":100,"h":50,"type":"normal","canJump":true},{"x":6125,"y":450,"w":50,"h":125,"type":"normal","canJump":true},{"x":6150,"y":575,"w":25,"h":50,"type":"normal","canJump":true},{"x":6100,"y":800,"w":50,"h":100,"type":"normal","canJump":true},{"x":6250,"y":950,"w":100,"h":50,"type":"normal","canJump":true},{"x":6250,"y":800,"w":100,"h":50,"type":"normal","canJump":true},{"x":6150,"y":800,"w":100,"h":50,"type":"normal","canJump":true},{"x":6050,"y":800,"w":50,"h":50,"type":"normal","canJump":true},{"x":6350,"y":800,"w":100,"h":50,"type":"lava","canCollide":true},{"x":6350,"y":950,"w":100,"h":50,"type":"lava","canCollide":true},{"x":5950,"y":300,"w":50,"h":150,"type":"normal","canJump":true},{"x":6000,"y":300,"w":50,"h":50,"type":"normal","canJump":true},{"x":6450,"y":975,"w":300,"h":25,"type":"lava","canCollide":true},{"x":6450,"y":800,"w":300,"h":25,"type":"lava","canCollide":true},{"x":6450,"y":825,"w":300,"h":150,"type":"tornado","spinRadius":1.25},{"x":6525,"y":150,"radius":60,"type":"circle-normal"},{"x":6500,"y":200,"w":50,"h":50,"type":"normal","canJump":true},{"x":6550,"y":200,"w":25,"h":25,"type":"normal","canJump":true},{"x":6500,"y":250,"w":25,"h":25,"type":"normal","canJump":true},{"x":6550,"y":525,"w":25,"h":25,"type":"normal","canJump":true},{"x":6500,"y":500,"w":50,"h":50,"type":"normal","canJump":true},{"x":6950,"y":500,"w":50,"h":50,"type":"normal","canJump":true},{"x":6975,"y":475,"w":25,"h":25,"type":"normal","canJump":true},{"x":6925,"y":525,"w":25,"h":25,"type":"normal","canJump":true},{"x":6975,"y":350,"w":25,"h":25,"type":"normal","canJump":true},{"x":6600,"y":300,"w":400,"h":50,"type":"normal","canJump":true},{"x":6600,"y":350,"w":100,"h":100,"type":"normal","canJump":true},{"x":6700,"y":400,"w":200,"h":50,"type":"normal","canJump":true},{"x":6450,"y":600,"w":50,"h":100,"type":"normal","canJump":true},{"x":6500,"y":650,"w":550,"h":50,"type":"normal","canJump":true},{"x":6500,"y":600,"w":50,"h":50,"type":"coin","collected":false},{"x":6500,"y":600,"w":550,"h":50,"type":"size","size":10},{"x":7000,"y":600,"w":25,"h":25,"type":"normal","canJump":true},{"x":6550,"y":600,"w":25,"h":25,"type":"normal","canJump":true},{"x":6775,"y":625,"w":25,"h":25,"type":"normal","canJump":true},{"x":6750,"y":975,"w":150,"h":25,"type":"lava","canCollide":true},{"x":6900,"y":900,"w":50,"h":100,"type":"lava","canCollide":true},{"x":7200,"y":800,"w":50,"h":200,"type":"breakable","maxStrength":10,"currentStrength":10,"time":0.09166666666666695,"timer":0.1,"regenTime":5,"healTimer":0},{"x":7300,"y":575,"w":25,"h":25,"type":"normal","canJump":true},{"x":7300,"y":600,"w":200,"h":25,"type":"normal","canJump":true},{"x":7300,"y":500,"w":25,"h":75,"type":"normal","canJump":true},{"x":7300,"y":475,"w":150,"h":25,"type":"normal","canJump":true},{"x":7250,"y":350,"w":100,"h":50,"type":"normal","canJump":true},{"x":7250,"y":725,"w":75,"h":25,"type":"lava","canCollide":true},{"x":7050,"y":800,"w":50,"h":100,"type":"lava","canCollide":true},{"x":7425,"y":725,"w":75,"h":25,"type":"lava","canCollide":true},{"x":7325,"y":575,"w":175,"h":25,"type":"lava","canCollide":true},{"x":7325,"y":500,"w":25,"h":75,"type":"coin","collected":false},{"x":7300,"y":250,"w":25,"h":25,"type":"normal","canJump":true},{"x":7475,"y":300,"w":25,"h":25,"type":"normal","canJump":true},{"x":7250,"y":150,"w":25,"h":25,"type":"normal","canJump":true},{"x":7250,"y":325,"w":25,"h":25,"type":"normal","canJump":true},{"x":7425,"y":225,"w":25,"h":25,"type":"normal","canJump":true},{"x":7400,"y":300,"w":25,"h":25,"type":"normal","canJump":true},{"x":7325,"y":300,"w":25,"h":25,"type":"normal","canJump":true},{"x":7400,"y":175,"w":25,"h":25,"type":"normal","canJump":true},{"x":7375,"y":125,"w":25,"h":25,"type":"normal","canJump":true},{"x":7375,"y":225,"w":25,"h":25,"type":"normal","canJump":true},{"x":7325,"y":175,"w":25,"h":25,"type":"normal","canJump":true},{"x":7150,"y":0,"w":50,"h":75,"type":"normal","canJump":true},{"x":7000,"y":75,"w":50,"h":75,"type":"normal","canJump":true},{"x":6800,"y":50,"w":100,"h":50,"type":"normal","canJump":true},{"x":6700,"y":125,"w":25,"h":25,"type":"normal","canJump":true},{"x":6700,"y":0,"w":25,"h":25,"type":"normal","canJump":true},{"x":6975,"y":125,"w":25,"h":25,"type":"normal","canJump":true},{"x":7200,"y":0,"w":25,"h":25,"type":"normal","canJump":true},{"x":6725,"y":125,"w":25,"h":25,"type":"normal","canJump":true},{"x":6725,"y":0,"w":25,"h":25,"type":"normal","canJump":true},{"x":6450,"y":0,"w":825,"h":150,"type":"timetrap","time":0,"maxTime":7},{"x":7100,"y":250,"w":50,"h":50,"type":"normal","canJump":true},{"x":6375,"y":250,"w":75,"h":25,"type":"normal","canJump":true},{"x":8400,"y":450,"w":600,"h":50,"type":"normal","canJump":true},{"x":8950,"y":500,"w":50,"h":500,"type":"normal","canJump":true},{"x":8400,"y":0,"w":1350,"h":450,"type":"normal","canJump":true},{"x":9000,"y":450,"w":750,"h":550,"type":"normal","canJump":true},{"x":8400,"y":500,"w":550,"h":500,"type":"size","size":10},{"x":8400,"y":500,"w":550,"h":500,"type":"size","size":10},{"x":8746.666666641491,"y":450,"w":50,"h":50,"type":"move","points":[[8350,500],[8750,500],[8750,450],[8350,450]],"speed":400,"currentPoint":2,"pointTo":{"x":8350,"y":450},"pointOn":{"x":8750,"y":450}},{"x":8400,"y":550,"w":400,"h":50,"type":"normal","canJump":true},{"x":8750,"y":600,"w":50,"h":350,"type":"normal","canJump":true},{"x":8400,"y":500,"w":50,"h":50,"spawn":{"x":8425,"y":525},"type":"check","collected":false},{"x":8800,"y":766.75,"w":75,"h":75,"type":"tpmove","points":[[8800,550],[8800,925]],"speed":90,"currentPoint":1,"tpx":8875,"tpy":525,"pointTo":{"x":8800,"y":550},"pointOn":{"x":8800,"y":925}},{"x":8875,"y":708.25,"w":75,"h":75,"type":"tpmove","points":[[8875,550],[8875,925]],"speed":90,"currentPoint":0,"tpx":8875,"tpy":525,"pointTo":{"x":8875,"y":925},"pointOn":{"x":8875,"y":550}},{"x":8450,"y":800,"w":300,"h":50,"type":"normal","canJump":true},{"x":6300,"y":400,"w":50,"h":25,"type":"normal","canJump":true},{"x":8616.75,"y":900,"w":100,"h":100,"type":"lavamove","points":[[8600,850],[8650,850],[8650,900],[8600,900]],"speed":90,"currentPoint":2,"collidable":true,"pointTo":{"x":8600,"y":900},"pointOn":{"x":8650,"y":900}},{"x":8450,"y":700,"w":300,"h":100,"type":"normal","canJump":true},{"x":8550,"y":850,"w":50,"h":100,"type":"normal","canJump":true},{"x":8400,"y":700,"w":50,"h":50,"type":"coin","collected":false},{"x":8450,"y":916.75,"w":50,"h":50,"type":"lavamove","points":[[8450,850],[8450,950]],"speed":90,"currentPoint":1,"collidable":true,"pointTo":{"x":8450,"y":850},"pointOn":{"x":8450,"y":950}},{"x":8500,"y":916.75,"w":50,"h":50,"type":"lavamove","points":[[8500,850],[8500,950]],"speed":90,"currentPoint":1,"collidable":true,"pointTo":{"x":8500,"y":850},"pointOn":{"x":8500,"y":950}},{"x":8489,"y":650,"w":50,"h":50,"type":"lavamove","points":[[8700,650],[8400,650],[8400,950],[8400,650]],"speed":120,"currentPoint":0,"collidable":true,"pointTo":{"x":8400,"y":650},"pointOn":{"x":8700,"y":650}},{"x":7150,"y":200,"w":50,"h":50,"type":"tp","tpx":8425,"tpy":526,"bgColor":null,"tileColor":null,"changeColor":true},{"x":6675,"y":350,"w":175,"h":50,"type":"tp","tpx":9775,"tpy":25,"bgColor":null,"tileColor":null,"changeColor":true},{"x":8400,"y":600,"w":350,"h":50,"type":"tp","tpx":7075,"tpy":225,"bgColor":null,"tileColor":null,"changeColor":true},{"x":8400,"y":500,"w":50,"h":50,"type":"ship","state":false},{"x":7400,"y":350,"w":100,"h":50,"type":"normal","canJump":true},{"x":7350,"y":350,"w":50,"h":50,"type":"coindoor","coins":1,"currentCoins":0},{"x":6950,"y":200,"w":100,"h":100,"type":"coindoor","coins":3,"currentCoins":1},{"x":9750,"y":0,"w":50,"h":50,"spawn":{"x":9775,"y":25},"type":"check","collected":false},{"x":8550,"y":950,"w":50,"h":50,"type":"revive"}]'
eval(parseAddedObs(text));
texts.push(new Text(100, -25, 'Welcome to... The Planet of Simple Challenges :D'));

safes.push(new Safe(0, 0, 150, 100));
/*obstacles.push(new NormalObstacle(50, 50, 100, 150));
//obstacles.push(new NormalObstacle(150, 0, 50, 200));
obstacles.push(new NormalObstacle(0, 250, 250, 50));
obstacles.push(new RotatingLava(0, 150, 200, 20, -120, 90));
obstacles.push(new NormalObstacle(100, 0, 50, 50));
obstacles.push(new NormalObstacle(200, 0, 50, 250));
obstacles.push(new Tp(150, 0, 50, 50, 250, 0));
obstacles.push(new NormalObstacle(300, 0, 50, 50));
obstacles.push(new NormalObstacle(250, 100, 100, 300));
obstacles.push(new NormalObstacle(400, 0, 50, 500));
obstacles.push(new RotatingLava(0, 6000, 400, 30, -270, 0));*/

spawns.push(new Spawner(350, 0, 50, 450, { x: 375, y: 25, type: 'turret', amount: 1, radius: 24, speed: 0, shootSpeed: 2, pRadius: 24, pSpeed: 80, shootDirections: [Math.PI/2]}));

/*obstacles.push(new NormalObstacle(50, 450, 350, 50));
obstacles.push(new NormalObstacle(50, 350, 150, 100));

obstacles.push(new MovingLavaObstacle(50, 50, [[-100, 300], [200, 300]], 80, 1));

obstacles.push(new Checkpoint(0, 350, 50, 150));

obstacles.push(new NormalObstacle(150, 500, 50, 450));
obstacles.push(new MovingObstacle(150, 50, [[0, 500], [0, 900], [-150, 900], [-150, 500]], 80, 0));
obstacles.push(new MovingObstacle(150, 50, [[0, 500], [0, 900], [-150, 900], [-150, 500]], 80, 2));
obstacles.push(new GravObstacle(0, 500, 150, 100, "down", 6000));
obstacles.push(new GravObstacle(0, 600, 150, 50, "up", 6000));
obstacles.push(new SpeedObstacle(0, 650, 150, 300));
obstacles.push(new Tp(0, 725, 75, 50, 75, 600));
obstacles.push(new Tp(75, 875, 75, 50, 75, 600));

// 1st enemy section
obstacles.push(new NormalObstacle(400, 550, 50, 450));


// smol player section
obstacles.push(new Checkpoint(400, 500, 50, 50));

obstacles.push(new NormalObstacle(450, 450, 800, 50));
obstacles.push(new SizePlayer(450, 500, 800, 500, 18));
obstacles.push(new NormalObstacle(1250, 450, 50, 550));*/
spawns.push(new Spawner(200, 500, 200, 500, { type: 'normal', amount: 6
, radius: 12, speed: 80}));
spawns.push(new Spawner(450, 500, 800, 500, { x: 850, y: 750, type: 'turret', amount: 1, radius: 10, speed: 0, shootSpeed: 0.33, pRadius: 12, pSpeed: 100, shootDirections: [Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0]}));
/*obstacles.push(new NormalObstacle(550, 500, 50, 450));
obstacles.push(new NormalObstacle(600, 900, 600, 50));
obstacles.push(new NormalObstacle(1150, 550, 50, 350));
obstacles.push(new NormalObstacle(650, 550, 500, 50));
obstacles.push(new NormalObstacle(650, 600, 50, 200));
obstacles.push(new NormalObstacle(650, 800, 500, 50));
obstacles.push(new Tp(1100, 850, 50, 50, 1325, 975));*/

// switch section
/*obstacles.push(new Checkpoint(1300, 950, 50, 50));
safes.push(new Safe(1300, 950, 50, 50));
obstacles.push(new SpeedObstacle(1350, 950, 150, 50));
obstacles.push(new SpeedObstacle(1600, 950, 150, 50));
obstacles.push(new NormalObstacle(1300, 900, 450, 50));*/

// bouncy chaos part <- now octo part
//obstacles.push(new NormalObstacle(1800, 0, 800, 1000));
spawns.push(new Spawner(1300, 450, 500, 450, { x: 1550, y: 700, type: 'turret', amount: 1, radius: 24, speed: 0, shootSpeed: 0.05, pRadius: 9, pSpeed: 120, shootDirections: [Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0,Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0,'none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none']}));
/*obstacles.push(new Tornado(1300, 450, 500, 450, 8));
obstacles.push(new CircularBouncyObstacle(1550, 700, 75, 50));
obstacles.push(new BouncyObstacle(1550, 625, 250, 150));*/

//obstacles.push(new Tp(550, 0, 50, 400, 2625));

// turret spam before zone 2
/*obstacles.push(new NormalObstacle(450, 400, 1300, 50));
obstacles.push(new Checkpoint(1750, 0, 50, 400));
obstacles.push(new GravObstacle(600, 0, 1140, 400, "left", 1000));*/
spawns.push(new Spawner(450, 0, 1300, 450, { x: 500, y: 50, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 5, pRadius: 38, pSpeed: 100, shootDirections: [0]}));
spawns.push(new Spawner(450, 0, 1300, 450, { x: 500, y: 150, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 5, pRadius: 38, pSpeed: 100, shootDirections: [0], offset: 2.5}));
spawns.push(new Spawner(450, 0, 1300, 450, { x: 500, y: 250, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 5, pRadius: 38, pSpeed: 100, shootDirections: [0]}));
spawns.push(new Spawner(450, 0, 1300, 450, { x: 500, y: 350, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 5, pRadius: 38, pSpeed: 100, shootDirections: [0], offset: 2.5}));

//texts.push(new Text(3000, -25, 'Congrats, you have a working mouse and keyboard ...')); <- saving this text for the winscreen

// zone 2 start (with snapgrid section)

/*obstacles.push(new ColorChange(2600, 0, 150, 150, '#6376C1','#9EC0ED'));
safes.push(new Safe(2600, 0, 150, 150));
obstacles.push(new NormalObstacle(2600, 150, 1550, 50));
obstacles.push(new Checkpoint(2600, 0, 150, 150));
obstacles.push(new SnapGrid(2750, 0, 750, 150, true, true, 50, 0.5));
obstacles.push(new Lava(3000, 0, 50, 60));
obstacles.push(new Lava(3150, 90, 50, 60));
obstacles.push(new Lava(3300, 0, 50, 60));
obstacles.push(new SnapGrid(3600, 0, 100, 150, true, false, 150, 6));*/
spawns.push(new Spawner(3600, 0, 100, 150, { type: 'normal', amount: 3
, radius: 10, speed: 50}));
spawns.push(new Spawner(3750, 200, 400, 200, { type: 'normal', amount: 5
, radius: 8, speed: 60}))
/*obstacles.push(new SizePlayer(3600, 0, 100, 150, 10));
obstacles.push(new StoryDisplay(3600, 0, 100, 150));
texts.push(new Text(3675, 75, 'Care to wait a while?', true));
obstacles.push(new SnapGrid(3850, 0, 150, 150, true, true, 50, 0.1));
obstacles.push(new Tp(4100, 0, 25, 150, 2625, 225));

// relatively hard rotating lava section
obstacles.push(new Checkpoint(2600, 200, 50, 50));
obstacles.push(new NormalObstacle(2650, 200, 50, 400));
obstacles.push(new NormalObstacle(2750, 250, 50, 400));
obstacles.push(new NormalObstacle(2600, 650, 200, 50));
obstacles.push(new RotatingLava(2575, 375, 200, 10, -180, 0));
obstacles.push(new RotatingLava(2575, 575, 200, 10, -180, 0));
obstacles.push(new Checkpoint(2700, 200, 50, 50));

// short but hard? moving lava section
obstacles.push(new MovingLavaObstacle(50, 50, [[2800, 200], [2850, 200], [2850, 350], [2800, 350]], 120, 1));
obstacles.push(new NormalObstacle(2800, 400, 100, 50));
obstacles.push(new NormalObstacle(2900, 250, 50, 200));

// growing lava section
obstacles.push(new NormalObstacle(2950, 250, 150, 50));
obstacles.push(new NormalObstacle(3050, 300, 50, 150));
obstacles.push(new NormalObstacle(3100, 400, 1150, 50));
obstacles.push(new GrowingCircleLavaObstacle(3200, 300, 1, 90, 60));
obstacles.push(new GrowingCircleLavaObstacle(3400, 300, 1, 90, 60));
obstacles.push(new GrowingCircleLavaObstacle(3600, 300, 1, 90, 60));

// bigger snapgrid + enemies section
obstacles.push(new SnapGrid(3750, 200, 400, 200, true, true, 25, 0.25));
;
obstacles.push(new Tp(4125, 0, 25, 150, 4275, 25));
obstacles.push(new NormalObstacle(4200, 0, 50, 400));

// 2 lavas moving up and down puzzle
safes.push(new Safe(4250, 0, 100, 50));
obstacles.push(new Checkpoint(4250, 0, 100, 50));
obstacles.push(new NormalObstacle(4350, 0, 50, 350));
obstacles.push(new MovingLavaObstacle(50, 50, [[4250, 50], [4250, 350]], 120, 0));
obstacles.push(new MovingLavaObstacle(50, 50, [[4300, 50], [4300, 350]], 120, 1));
obstacles.push(new NormalObstacle(4250, 400, 650, 50));

// turning intro
obstacles.push(new NormalObstacle(4850, 50, 50, 350));

// 2 lavas going in circle "puzzle"
obstacles.push(new Checkpoint(4850, 0, 150, 50));
safes.push(new Safe(4850, 0, 150, 50));
obstacles.push(new NormalObstacle(4900, 50, 50, 50));
obstacles.push(new MovingLavaObstacle(50, 50, [[4900, 100], [4950, 100], [4950, 200], [4900, 200]], 80, 0));
obstacles.push(new MovingLavaObstacle(50, 50, [[4900, 250], [4950, 250], [4950, 350], [4900, 350]], 80, 2));
//obstacles.push(new Tp(4900, 400, 100, 25, 2625, 225));
obstacles.push(new Tp(4900, 400, 100, 25, 2700, 850));
obstacles.push(new NormalObstacle(4900, 425, 100, 25, 2700, 850));

// structure of final zone (WIP)

obstacles.push(new Checkpoint(2600, 700, 200, 300));
obstacles.push(new ColorChange(2600, 700, 200, 300, '#50466B','#885991'));
obstacles.push(new NormalObstacle(2950, 300, 100, 150));

obstacles.push(new NormalObstacle(3350, 500, 50, 500));
safes.push(new Safe(3350, 450, 50, 50));

obstacles.push(new NormalObstacle(3900, 450, 50, 500));
safes.push(new Safe(3900, 950, 50, 50));

obstacles.push(new NormalObstacle(4500, 500, 50, 500));
safes.push(new Safe(4500, 450, 50, 50));
*/
spawns.push(new Spawner(4400, 0, 450, 400, { type: 'turning', amount: 4, radius: 24, speed: 60, changeDir: 1.5 }))
// normal enemy challenge
spawns.push(new Spawner(2800, 450, 550, 550, { type: 'normal', amount: 8, radius: 18, speed: 150 }))
//safes.push(new Safe(1750,900,50,50));
// spinning lava challenge
//obstacles.push(new RotatingLava(3400, 712, 500, 30, 120, 0));
// turret challenge
spawns.push(new Spawner(3950, 450, 550, 550, { type: 'turret', amount: 1, radius: 24, speed: 80, shootSpeed: 0.4, pRadius: 12, pSpeed: 100, shootDirections: ['none','none','none','none','none',Math.PI*9/5,Math.PI*8/5,Math.PI*7/5,Math.PI*6/5,Math.PI*1,Math.PI*4/5,Math.PI*3/5,Math.PI*2/5,Math.PI*1/5,0]}));
spawns.push(new Spawner(3950, 450, 550, 550, { type: 'turret', amount: 1, radius: 24, speed: 80, shootSpeed: 0.4, pRadius: 12, pSpeed: 100, shootDirections: [Math.PI*9/5,Math.PI*8/5,Math.PI*7/5,Math.PI*6/5,Math.PI*1,Math.PI*4/5,Math.PI*3/5,Math.PI*2/5,Math.PI*1/5,0,'none','none','none','none','none'], offset: Math.PI}));

// moving lava challenge (difficult)
/*obstacles.push(new MovingLavaObstacle(100, 100, [[4550, 450], [4550, 900]], 200, 0));
obstacles.push(new MovingLavaObstacle(100, 100, [[4650, 450], [4650, 900]], 200, 1));
obstacles.push(new MovingLavaObstacle(100, 100, [[4750, 450], [4750, 900]], 200, 0));
obstacles.push(new MovingLavaObstacle(100, 100, [[4850, 450], [4850, 900]], 200, 1));*/

//obstacles.push(new Winpad(4950, 450, 50, 550));

// spawns.push(new Spawner(6300, 200, 150, 400, { type: 'growing', amount: 5, radius: 10, speed: 120, growSpeed: 20, growing: true, minRadius: 10, maxRadius: 30, bounceAmount: 40 }));

module.exports = posc;