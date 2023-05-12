/*const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, Coin}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const goat = {
  arena: { width: 1750, height: 1500 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
    safeColor: '#363636',
	playerSpawn: { x: 25, y: 25 },
	name: 'PoTT',
	longName: 'Planet of Traditional Terrors',
  bgColor: '#5A574E', //'#B8860B',
  tileColor: '#C3BAAD', //'#CC9900',
  difficulty: "Moderate",
    addedObstacles: []
}
let { texts, obstacles, safes, spawns, playerSpawn, arena } = goat;
//ZEROTIX MAP (1750 x 7500)

texts.push(new Text(100, -25, 'Intimidation!'));


// obstacles.push(new NormalObstacle(100, 1000, 1000, 500));


// First part/section
obstacles.push(new NormalObstacle(0, 250, 675, 50));

safes.push(new Safe(675, 250, 75, 50));

// obstacles.push(new NormalObstacle(550, 50, 50, 50));
// obstacles.push(new NormalObstacle(600, 50, 25, 25));
// obstacles.push(new NormalObstacle(675, 0, 50, 100));
// obstacles.push(new NormalObstacle(775, 50, 75, 100));
// obstacles.push(new NormalObstacle(600, 150, 350, 50));
obstacles.push(new Tp(570, 300, 80, 50, 525, 375))

obstacles.push(new RotatingLava(200, 60, 100, 10, -240, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(200, 180, 100, 10, 240, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(300, 60, 100, 10,  240, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(300, 180, 100, 10, -240, 0, undefined, undefined, 0, false));

obstacles.push(new NormalObstacle(450, 50, 50, 200));
safes.push(new Safe(450, 0, 50, 50));

obstacles.push(new RotatingLava(500, 125, 250, 10, 110, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(500, 125, 250, 10, 110, 180, undefined, undefined, 0, false));

obstacles.push(new RotatingLava(500, 125, 250, 10, 110, 270, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(500, 125, 250, 10, 110, 90, undefined, undefined, 0, false));
// theyre rly easy tho, we can buff second part,
// really? idk but the 2nd trick kinda inconsistent; 1 sec
// ?? idk i just wanna nerf 1st and 2nd obstacle because it seems too hard in comparison
// obstacles.push(new RotatingLava(500, 125, 250, 10, 720, 270));
obstacles.push(new Lava(750, 0, 20, 600));
obstacles.push(new Lava(650, 300, 20, 225));
obstacles.push(new Lava(550, 300, 20, 300));
obstacles.push(new Lava(550, 600, 220, 20));
obstacles.push(new Lava(100, 500, 450, 20));
obstacles.push(new RotatingLava(650, 250, 15, 350, 100, 0, undefined, undefined, 0, false));
// HOW DO I ADD TELEPORTER HELP only 6 params, 4 basic and tpx and tpy
safes.push(new Safe(500, 300, 50, 200));
// obstacles.push(new RotatingLava(0, 300, 10, 100, 100, 0));
// obstacles.push(new RotatingLava(0, 400, 10, 100, -100, 0));// its a new Tp(params)
// obstacles.push(new RotatingLava(100, 300, 10, 100, 100, 0));
// obstacles.push(new RotatingLava(100, 400, 10, 100, -100, 0));
obstacles.push(new RotatingLava(190, 300, 10, 100, 100, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(190, 400, 10, 100, -100, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(300, 300, 10, 100, 100, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(300, 400, 10, 100, -100, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(410, 300, 10, 100, 100, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(410, 400, 10, 100, -100, 0, undefined, undefined, 0, false));



// Safes

safes.push(new Safe(775, 0, 75, 50));

safes.push(new Safe(0, 300, 100, 220));
safes.push(new Safe(0, 520, 350, 75))

obstacles.push(new NormalObstacle(350, 520, 20, 850));
obstacles.push(new RotatingLava(600, 600, 15, 400, -175, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(600, 800, 15, 400, 175, 180, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(600, 1000, 15, 400, -175, 0, undefined, undefined, 0, false));

obstacles.push(new RotatingLava(500, 1300, 15, 200, -175, 90, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(700, 1300, 15, 200, 175, 90, undefined, undefined, 0, false));

obstacles.push(new RotatingLava(100, 600, 10, 200, 180, 90, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(250, 600, 10, 200, 180, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(100, 750, 10, 200, -180, 90, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(250, 750, 10, 200, -180, 0, undefined, undefined, 0, false));

obstacles.push(new RotatingLava(100, 900, 10, 200, 180, 90, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(250, 900, 10, 200, 180, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(100, 1050, 10, 200, -180, 90, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(250, 1050, 10, 200, -180, 0, undefined, undefined, 0, false));

obstacles.push(new RotatingLava(100, 1200, 10, 200, 180, 90, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(250, 1200, 10, 200, 180, 0, undefined, undefined, 0, false));

obstacles.push(new Lava(0, 675, 250, 50));
obstacles.push(new Lava(100, 825, 250, 50));
obstacles.push(new Lava(0, 975, 250, 50));
obstacles.push(new Lava(100, 1125, 250, 50));
obstacles.push(new Lava(0, 1275, 250, 50));

obstacles.push(new NormalObstacle(0, 1480, 870, 20));
obstacles.push(new Lava(850, 520, 20, 980));

safes.push(new Safe(750, 300, 100, 300));

obstacles.push(new RotatingLava(1300, -350, 40, 1000, 120, 0, undefined, undefined, 0, false));

obstacles.push(new Lava(850, 100, 20, 600));

obstacles.push(new Lava(850, 850, 20, 300));

obstacles.push(new Lava(1550, 0, 20, 400));
obstacles.push(new Lava(1000, 100, 20, 300));
obstacles.push(new Lava(1550, 500, 20, 150));
obstacles.push(new Lava(1000, 500, 20, 150));
obstacles.push(new Lava(1000, 650, 570, 20));
obstacles.push(new Coin(975, 400));
obstacles.push(new Coin(1525, 400));
obstacles.push(new Coin(975, 450));
obstacles.push(new Coin(1525, 450));

safes.push(new Safe(850, 700, 900, 100));

obstacles.push(new Winpad(870, 1350, 1750-870, 150));

obstacles.push(new RotatingLava(850, 1000, 500, 20, 220, 90, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(1300, 1000, 500, 20, -220, 90, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(850, 1250, 500, 20, 220, 0, undefined, undefined, 0, false));
obstacles.push(new RotatingLava(1300, 1250, 500, 20, -220, 0, undefined, undefined, 0, false));

module.exports = goat;*/

const parseMap = require('../parser.js');

let text = `{"arena":{"width":10000,"height":10000},"enemy":[],"safes":[{"x":400,"y":0,"w":50,"h":50,"renderAbove":true},{"x":2350,"y":0,"w":100,"h":250,"renderAbove":true},{"x":0,"y":700,"w":400,"h":400,"renderAbove":true},{"x":0,"y":0,"w":100,"h":250,"renderAbove":true}],"spawns":[],"playerSpawn":{"x":50,"y":125},"name":"PoTT","longName":"Planet of Traditional Terrors","tileColor":"#c3baad","bgColor":"#5a574e","safeColor":"#8c8c8c","difficulty":"Moderate","texts":[{"x":8250,"y":125,"w":25,"h":25,"size":30,"text":"2 x 2","angle":0,"story":false},{"x":8500,"y":50,"w":25,"h":25,"size":30,"text":"4","angle":0,"story":false},{"x":8500,"y":175,"w":25,"h":25,"size":30,"text":"3","angle":0,"story":false}],"obstacles":[{"type":"normal","x":0,"y":250,"w":675,"h":50},{"type":"normal","x":400,"y":50,"w":50,"h":200},{"type":"rotate-lava","x":200,"y":60,"w":100,"h":10,"rotateSpeed":-240,"angle":0,"pivotX":200,"pivotY":60,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":300,"y":60,"w":100,"h":10,"rotateSpeed":240,"angle":0,"pivotX":300,"pivotY":60,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":200,"y":180,"w":100,"h":10,"rotateSpeed":240,"angle":0,"pivotX":200,"pivotY":180,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":300,"y":180,"w":100,"h":10,"rotateSpeed":-240,"angle":0,"pivotX":300,"pivotY":180,"distToPivot":0,"canCollide":true},{"type":"spawner","x":0,"y":1100,"w":800,"h":750,"spawnData":{"type":"normal","amount":15,"radius":10,"speed":240,"isLava":true}},{"type":"circle-normal","x":575,"y":125,"r":56},{"type":"circle-normal","x":775,"y":125,"r":56},{"type":"rotate-lava","x":575,"y":125,"w":225,"h":25,"rotateSpeed":240,"angle":0,"pivotX":575,"pivotY":125,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":775,"y":125,"w":225,"h":25,"rotateSpeed":-240,"angle":0,"pivotX":775,"pivotY":125,"distToPivot":0,"canCollide":true},{"type":"normal","x":650,"y":250,"w":650,"h":50},{"type":"circle-normal","x":975,"y":125,"r":56},{"type":"circle-normal","x":1175,"y":125,"r":56},{"type":"rotate-lava","x":975,"y":125,"w":225,"h":25,"rotateSpeed":240,"angle":0,"pivotX":975,"pivotY":125,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":1175,"y":125,"w":225,"h":25,"rotateSpeed":-240,"angle":0,"pivotX":1175,"pivotY":125,"distToPivot":0,"canCollide":true},{"type":"push","x":1300,"y":0,"w":50,"h":250,"dir":"left","max":300,"pushBack":10},{"type":"normal","x":1200,"y":250,"w":8500,"h":50},{"type":"tp","x":1550,"y":0,"w":50,"h":250,"tpx":1725,"tpy":125,"changeColor":false,"bgColor":"#5a574e","tileColor":"#c3baad"},{"type":"normal","x":1600,"y":0,"w":100,"h":250},{"type":"lava","x":1750,"y":200,"w":600,"h":50,"canCollide":true},{"type":"lava","x":1750,"y":0,"w":600,"h":50,"canCollide":true},{"type":"lava","x":1850,"y":50,"w":50,"h":50,"canCollide":true},{"type":"lava","x":2025,"y":150,"w":50,"h":50,"canCollide":true},{"type":"lava","x":2250,"y":50,"w":50,"h":50,"canCollide":true},{"type":"grav","x":1750,"y":0,"w":600,"h":250,"dir":"right","force":3000},{"type":"lavamove","points":[[2450,0],[2450,150]],"w":100,"h":100,"speed":180,"currentPoint":0,"collidable":true},{"type":"lavamove","points":[[2550,0],[2550,150]],"w":100,"h":100,"speed":180,"currentPoint":1,"collidable":true},{"type":"lavamove","points":[[2650,0],[2650,150]],"w":100,"h":100,"speed":180,"currentPoint":0,"collidable":true},{"type":"lavamove","points":[[2900,0],[3500,0]],"w":125,"h":125,"speed":250,"currentPoint":0,"collidable":true},{"type":"lavamove","points":[[2900,125],[3500,125]],"w":125,"h":125,"speed":250,"currentPoint":1,"collidable":true},{"type":"lava","x":4050,"y":0,"w":50,"h":150,"canCollide":true},{"type":"lava","x":4450,"y":100,"w":50,"h":150,"canCollide":true},{"type":"lava","x":4850,"y":0,"w":50,"h":100,"canCollide":true},{"type":"lava","x":4850,"y":200,"w":50,"h":50,"canCollide":true},{"type":"lava","x":5200,"y":150,"w":50,"h":100,"canCollide":true},{"type":"lava","x":5200,"y":0,"w":50,"h":50,"canCollide":true},{"type":"lava","x":5550,"y":0,"w":50,"h":25,"canCollide":true},{"type":"lava","x":5600,"y":0,"w":50,"h":50,"canCollide":true},{"type":"lava","x":5650,"y":0,"w":50,"h":75,"canCollide":true},{"type":"lava","x":5700,"y":0,"w":50,"h":100,"canCollide":true},{"type":"lava","x":5750,"y":0,"w":50,"h":125,"canCollide":true},{"type":"lava","x":5800,"y":0,"w":50,"h":150,"canCollide":true},{"type":"lava","x":5850,"y":0,"w":50,"h":175,"canCollide":true},{"type":"lava","x":5900,"y":0,"w":50,"h":150,"canCollide":true},{"type":"lava","x":5950,"y":0,"w":50,"h":125,"canCollide":true},{"type":"lava","x":6000,"y":0,"w":50,"h":100,"canCollide":true},{"type":"lava","x":6050,"y":0,"w":50,"h":50,"canCollide":true},{"type":"lava","x":6100,"y":0,"w":50,"h":25,"canCollide":true},{"type":"lava","x":6200,"y":225,"w":50,"h":25,"canCollide":true},{"type":"lava","x":6250,"y":200,"w":50,"h":50,"canCollide":true},{"type":"lava","x":6300,"y":175,"w":50,"h":75,"canCollide":true},{"type":"lava","x":6350,"y":150,"w":50,"h":100,"canCollide":true},{"type":"lava","x":6400,"y":125,"w":50,"h":125,"canCollide":true},{"type":"lava","x":6450,"y":100,"w":50,"h":150,"canCollide":true},{"type":"lava","x":6500,"y":75,"w":50,"h":175,"canCollide":true},{"type":"lava","x":6550,"y":100,"w":50,"h":150,"canCollide":true},{"type":"lava","x":6600,"y":125,"w":50,"h":125,"canCollide":true},{"type":"lava","x":6650,"y":150,"w":50,"h":100,"canCollide":true},{"type":"lava","x":6700,"y":175,"w":50,"h":75,"canCollide":true},{"type":"lava","x":6750,"y":200,"w":50,"h":50,"canCollide":true},{"type":"lava","x":6800,"y":225,"w":50,"h":25,"canCollide":true},{"type":"spawner","x":7000,"y":0,"w":875,"h":250,"spawnData":{"type":"normal","amount":3,"radius":45,"speed":20,"isLava":true}},{"type":"lava","x":6950,"y":0,"w":50,"h":75,"canCollide":true},{"type":"lava","x":6950,"y":175,"w":50,"h":75,"canCollide":true},{"type":"lava","x":7875,"y":175,"w":50,"h":75,"canCollide":true},{"type":"lava","x":7875,"y":0,"w":50,"h":75,"canCollide":true},{"type":"lava","x":8450,"y":100,"w":700,"h":50,"canCollide":true},{"type":"lava","x":9100,"y":100,"w":50,"h":150,"canCollide":true},{"type":"rotate-lava","x":9325,"y":125,"w":200,"h":20,"rotateSpeed":150,"angle":0,"pivotX":9325,"pivotY":125,"distToPivot":0,"canCollide":true},{"type":"lavamove","points":[[9600,0],[9600,150]],"w":100,"h":100,"speed":150,"currentPoint":0,"collidable":true},{"type":"grav","x":3750,"y":0,"w":5950,"h":250,"dir":"right","force":3500},{"type":"spawner","x":9700,"y":0,"w":300,"h":300,"spawnData":{"type":"normal","amount":3,"radius":25,"speed":200,"isLava":true}},{"type":"normal","x":9300,"y":350,"w":600,"h":50},{"type":"normal","x":9350,"y":400,"w":500,"h":50},{"type":"normal","x":9400,"y":450,"w":400,"h":50},{"type":"normal","x":9450,"y":500,"w":300,"h":50},{"type":"normal","x":9500,"y":550,"w":200,"h":50},{"type":"normal","x":9550,"y":600,"w":100,"h":50},{"type":"normal","x":9950,"y":400,"w":50,"h":50},{"type":"normal","x":9900,"y":450,"w":125,"h":50},{"type":"normal","x":9850,"y":500,"w":150,"h":50},{"type":"normal","x":9800,"y":550,"w":200,"h":50},{"type":"normal","x":9750,"y":600,"w":250,"h":50},{"type":"normal","x":9700,"y":650,"w":300,"h":50},{"type":"normal","x":9150,"y":700,"w":850,"h":50},{"type":"normal","x":9150,"y":650,"w":350,"h":50},{"type":"normal","x":9150,"y":600,"w":300,"h":50},{"type":"normal","x":9150,"y":550,"w":250,"h":50},{"type":"normal","x":9150,"y":500,"w":200,"h":50},{"type":"normal","x":9150,"y":450,"w":150,"h":50},{"type":"normal","x":9150,"y":400,"w":100,"h":50},{"type":"normal","x":9150,"y":350,"w":50,"h":50},{"type":"normal","x":9250,"y":300,"w":700,"h":50},{"type":"lavamove","points":[[9175,300],[9950,300],[9575,650]],"w":50,"h":50,"speed":200,"currentPoint":0,"collidable":true},{"type":"lavamove","points":[[9175,300],[9950,300],[9575,650]],"w":50,"h":50,"speed":200,"currentPoint":1,"collidable":true},{"type":"lavamove","points":[[9175,300],[9950,300],[9575,650]],"w":50,"h":50,"speed":200,"currentPoint":2,"collidable":true},{"type":"normal","x":400,"y":700,"w":8750,"h":50},{"type":"timetrap","x":8450,"y":300,"w":700,"h":400,"maxTime":6.999},{"type":"normal","x":8450,"y":300,"w":50,"h":350},{"type":"normal","x":8550,"y":400,"w":50,"h":300},{"type":"normal","x":8550,"y":300,"w":50,"h":50},{"type":"normal","x":8650,"y":300,"w":50,"h":250},{"type":"normal","x":8750,"y":300,"w":50,"h":200},{"type":"normal","x":8750,"y":550,"w":50,"h":150},{"type":"normal","x":8850,"y":400,"w":50,"h":300},{"type":"normal","x":8650,"y":600,"w":50,"h":125},{"type":"normal","x":8950,"y":650,"w":50,"h":50},{"type":"normal","x":8950,"y":300,"w":50,"h":300},{"type":"normal","x":9050,"y":300,"w":50,"h":150},{"type":"normal","x":8850,"y":300,"w":50,"h":50},{"type":"normal","x":9050,"y":500,"w":50,"h":200},{"type":"circle-lava","x":8125,"y":500,"r":35},{"type":"circle-lava","x":7900,"y":425,"r":112},{"type":"circle-lava","x":8125,"y":650,"r":56},{"type":"circle-lava","x":7600,"y":525,"r":56},{"type":"circle-lava","x":7750,"y":625,"r":35},{"type":"circle-lava","x":7375,"y":350,"r":56},{"type":"circle-lava","x":7225,"y":550,"r":90},{"type":"circle-lava","x":8100,"y":400,"r":50},{"type":"circle-lava","x":8350,"y":375,"r":35},{"type":"circle-lava","x":8350,"y":500,"r":71},{"type":"circle-lava","x":7425,"y":600,"r":71},{"type":"circle-lava","x":7700,"y":350,"r":56},{"type":"circle-lava","x":7875,"y":675,"r":25},{"type":"circle-lava","x":8225,"y":350,"r":50},{"type":"circle-lava","x":7000,"y":375,"r":71},{"type":"spawner","x":5550,"y":300,"w":1350,"h":400,"spawnData":{"type":"normal","amount":4,"radius":35,"speed":20,"isLava":true}},{"type":"spawner","x":5550,"y":300,"w":1350,"h":400,"spawnData":{"type":"normal","amount":3,"radius":50,"speed":20,"isLava":true}},{"type":"spawner","x":5550,"y":300,"w":1350,"h":400,"spawnData":{"type":"normal","amount":2,"radius":63,"speed":20,"isLava":true}},{"type":"spawner","x":5550,"y":300,"w":1350,"h":400,"spawnData":{"type":"normal","amount":4,"radius":25,"speed":20,"isLava":true}},{"type":"normal","x":6900,"y":300,"w":50,"h":300},{"type":"normal","x":5500,"y":400,"w":50,"h":300},{"type":"grav","x":4100,"y":300,"w":1400,"h":400,"dir":"left","force":3000},{"type":"coin","x":5175,"y":575,"w":50,"h":50},{"type":"coin","x":4800,"y":350,"w":50,"h":50},{"type":"coin","x":4725,"y":600,"w":50,"h":50},{"type":"coin","x":4500,"y":425,"w":50,"h":50},{"type":"coin","x":5000,"y":625,"w":50,"h":50},{"type":"coin","x":5175,"y":325,"w":50,"h":50},{"type":"coin","x":5375,"y":525,"w":50,"h":50},{"type":"coin","x":5375,"y":375,"w":50,"h":50},{"type":"coin","x":5100,"y":450,"w":50,"h":50},{"type":"coin","x":4975,"y":375,"w":50,"h":50},{"type":"coin","x":4875,"y":550,"w":50,"h":50},{"type":"coin","x":4650,"y":450,"w":50,"h":50},{"type":"coin","x":4250,"y":350,"w":50,"h":50},{"type":"coin","x":4350,"y":500,"w":50,"h":50},{"type":"coin","x":4225,"y":625,"w":50,"h":50},{"type":"coin","x":4200,"y":475,"w":50,"h":50},{"type":"coin","x":4475,"y":625,"w":50,"h":50},{"type":"tp","x":4050,"y":550,"w":50,"h":150,"tpx":5475,"tpy":625,"changeColor":false,"bgColor":"#5a574e","tileColor":"#c3baad"},{"type":"tp","x":4050,"y":300,"w":50,"h":150,"tpx":5475,"tpy":375,"changeColor":false,"bgColor":"#5a574e","tileColor":"#c3baad"},{"type":"coindoor","x":4050,"y":450,"w":50,"h":100,"coins":15},{"type":"normal","x":4000,"y":300,"w":50,"h":150},{"type":"normal","x":3950,"y":300,"w":50,"h":100},{"type":"normal","x":3900,"y":300,"w":50,"h":50},{"type":"normal","x":4000,"y":550,"w":50,"h":150},{"type":"normal","x":3950,"y":600,"w":50,"h":100},{"type":"normal","x":3900,"y":650,"w":50,"h":50},{"type":"normal","x":3850,"y":300,"w":50,"h":50},{"type":"normal","x":3850,"y":650,"w":50,"h":50},{"type":"normal","x":3800,"y":600,"w":50,"h":100},{"type":"normal","x":3750,"y":550,"w":50,"h":150},{"type":"normal","x":3800,"y":300,"w":50,"h":100},{"type":"normal","x":3750,"y":300,"w":50,"h":150},{"type":"rotate-lava","x":3900,"y":425,"w":150,"h":25,"rotateSpeed":300,"angle":0,"pivotX":3900,"pivotY":425,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":3900,"y":575,"w":150,"h":25,"rotateSpeed":-300,"angle":0,"pivotX":3900,"pivotY":575,"distToPivot":0,"canCollide":true},{"type":"normal","x":3450,"y":400,"w":50,"h":300},{"type":"normal","x":3150,"y":300,"w":50,"h":300},{"type":"normal","x":2850,"y":400,"w":50,"h":300},{"type":"normal","x":2550,"y":300,"w":50,"h":300},{"type":"normal","x":3100,"y":300,"w":150,"h":100},{"type":"normal","x":3050,"y":300,"w":250,"h":50},{"type":"normal","x":2800,"y":600,"w":150,"h":100},{"type":"normal","x":2750,"y":650,"w":250,"h":50},{"type":"normal","x":3400,"y":600,"w":150,"h":100},{"type":"normal","x":3350,"y":650,"w":250,"h":50},{"type":"normal","x":2500,"y":300,"w":150,"h":100},{"type":"normal","x":2450,"y":300,"w":250,"h":50},{"type":"normal","x":3650,"y":300,"w":100,"h":50},{"type":"normal","x":3700,"y":350,"w":50,"h":50},{"type":"normal","x":3650,"y":650,"w":100,"h":50},{"type":"normal","x":3700,"y":600,"w":50,"h":50},{"type":"rotate-lava","x":3475,"y":500,"w":375,"h":25,"rotateSpeed":-125,"angle":0,"pivotX":3475,"pivotY":500,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":2875,"y":500,"w":375,"h":25,"rotateSpeed":-125,"angle":0,"pivotX":2875,"pivotY":500,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":3175,"y":500,"w":375,"h":25,"rotateSpeed":125,"angle":90,"pivotX":3175,"pivotY":500,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":2575,"y":500,"w":375,"h":25,"rotateSpeed":125,"angle":90,"pivotX":2575,"pivotY":500,"distToPivot":0,"canCollide":true},{"type":"normal","x":2300,"y":400,"w":50,"h":300},{"type":"normal","x":2250,"y":600,"w":150,"h":100},{"type":"normal","x":2200,"y":650,"w":250,"h":50},{"type":"lavamove","points":[[400,300],[900,300]],"w":200,"h":200,"speed":250,"currentPoint":0,"collidable":true},{"type":"lavamove","points":[[400,500],[900,500]],"w":200,"h":200,"speed":250,"currentPoint":1,"collidable":true},{"type":"lavamove","points":[[1100,300],[1600,300]],"w":200,"h":200,"speed":250,"currentPoint":0,"collidable":true},{"type":"lavamove","points":[[1100,500],[1600,500]],"w":200,"h":200,"speed":250,"currentPoint":1,"collidable":true},{"type":"rotate-lava","x":2100,"y":400,"w":25,"h":200,"rotateSpeed":150,"angle":0,"pivotX":2100,"pivotY":400,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":2100,"y":600,"w":25,"h":200,"rotateSpeed":-150,"angle":0,"pivotX":2100,"pivotY":600,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":1900,"y":400,"w":25,"h":200,"rotateSpeed":150,"angle":0,"pivotX":1900,"pivotY":400,"distToPivot":0,"canCollide":true},{"type":"rotate-lava","x":1900,"y":600,"w":25,"h":200,"rotateSpeed":-150,"angle":0,"pivotX":1900,"pivotY":600,"distToPivot":0,"canCollide":true},{"type":"check","x":0,"y":700,"w":400,"h":400},{"type":"lava","x":0,"y":300,"w":50,"h":400,"canCollide":true},{"type":"lava","x":50,"y":300,"w":50,"h":300,"canCollide":true},{"type":"lava","x":100,"y":300,"w":50,"h":150,"canCollide":true},{"type":"lava","x":150,"y":300,"w":50,"h":50,"canCollide":true},{"type":"lava","x":350,"y":400,"w":50,"h":300,"canCollide":true},{"type":"lava","x":300,"y":500,"w":50,"h":200,"canCollide":true},{"type":"lava","x":250,"y":550,"w":50,"h":150,"canCollide":true},{"type":"lava","x":200,"y":650,"w":50,"h":50,"canCollide":true},{"type":"normal","x":400,"y":750,"w":400,"h":350},{"type":"normal","x":800,"y":775,"w":50,"h":1075},{"type":"normal","x":775,"y":725,"w":75,"h":75},{"type":"normal","x":0,"y":1850,"w":300,"h":250},{"type":"normal","x":500,"y":1850,"w":300,"h":250},{"type":"normal","x":800,"y":1850,"w":50,"h":250}]}`;

module.exports = parseMap(text);