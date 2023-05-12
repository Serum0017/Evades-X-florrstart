const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, SwitchLava}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');
const parseAddedObs = require('../addedobsparser.js');

const goat = {
  arena: { width: 10000, height: 10000 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
	playerSpawn: { x: 25, y: 25 },
	name: 'GoAT',
	longName: 'Galaxy of Arduous Trials',
  bgColor: '#1d0a57', //'#B8860B',
  tileColor: '#310f99', //'#CC9900',
  difficulty: "Hardcore",
    addedObstacles: []
}
let { texts, obstacles, safes, spawns, playerSpawn, arena } = goat;
texts.push(new Text(100, -25, "You're in for quite a ride."));
//obstacles.push(new NormalObstacle(0, 100, 900, 50));
spawns.push(new Spawner(150, 0, 100, 100, { type: 'switch', amount: 1, radius: 49, speed: 1, time: 0.52173913043, defaultSwitch: false }))
eval(parseAddedObs('[{"x":0,"y":150,"w":950,"h":200,"type":"tp","tpx":25,"tpy":1325},{"x":0,"y":100,"w":900,"h":50,"type":"normal"},{"x":555.557023301964,"y":-33.146961230251975,"w":100,"h":100,"type":"rotate-lava","angle":94263.75,"rotateSpeed":90,"pivotX":500,"pivotY":50,"distToPivot":100},{"x":444.4429766980274,"y":133.14696123024626,"w":100,"h":100,"type":"rotate-lava","angle":94443.75,"rotateSpeed":90,"pivotX":500,"pivotY":50,"distToPivot":100},{"x":1500,"y":500,"w":1000,"h":100,"type":"rotate-lava","angle":31421.25,"rotateSpeed":30,"pivotX":1500,"pivotY":500,"distToPivot":0},{"x":1421.9638711935427,"y":107.68588783870905,"w":200,"h":100,"type":"rotate-lava","angle":-31421.25,"rotateSpeed":-30,"pivotX":1500,"pivotY":500,"distToPivot":400},{"x":1480.4909677983858,"y":401.92147195967726,"w":200,"h":100,"type":"rotate-lava","angle":-31421.25,"rotateSpeed":-30,"pivotX":1500,"pivotY":500,"distToPivot":100},{"x":1578.0361288064169,"y":892.314112161299,"w":200,"h":100,"type":"rotate-lava","angle":-31241.25,"rotateSpeed":-30,"pivotX":1500,"pivotY":500,"distToPivot":400},{"x":1519.5090322016042,"y":598.0785280403247,"w":200,"h":100,"type":"rotate-lava","angle":-31241.25,"rotateSpeed":-30,"pivotX":1500,"pivotY":500,"distToPivot":100},{"x":1941.353376181457,"y":412.20935509275824,"w":100,"h":100,"type":"rotate-lava","angle":-31331.25,"rotateSpeed":-30,"pivotX":1500,"pivotY":500,"distToPivot":450},{"x":1647.1177920604857,"y":470.73645169758606,"w":300,"h":100,"type":"rotate-lava","angle":-31331.25,"rotateSpeed":-30,"pivotX":1500,"pivotY":500,"distToPivot":150},{"x":1058.646623818544,"y":587.7906449072465,"w":100,"h":100,"type":"rotate-lava","angle":-31151.25,"rotateSpeed":-30,"pivotX":1500,"pivotY":500,"distToPivot":450},{"x":1352.8822079395147,"y":529.2635483024155,"w":300,"h":100,"type":"rotate-lava","angle":-31151.25,"rotateSpeed":-30,"pivotX":1500,"pivotY":500,"distToPivot":150},{"x":950,"y":100,"w":50,"h":900,"type":"normal"},{"x":900,"y":100,"w":50,"h":50,"type":"normal"},{"x":1000,"y":250,"w":50,"h":50,"type":"normal"},{"x":1000,"y":150,"w":100,"h":50,"type":"normal"},{"x":1000,"y":200,"w":75,"h":50,"type":"normal"},{"x":1000,"y":100,"w":150,"h":50,"type":"normal"},{"x":1250,"y":0,"w":50,"h":50,"type":"normal"},{"x":1200,"y":0,"w":50,"h":100,"type":"normal"},{"x":1000,"y":450,"w":500,"h":100,"type":"normal"},{"x":1500,"y":500,"w":125,"h":100,"type":"circle-normal","radius":50},{"x":1700,"y":0,"w":50,"h":50,"type":"normal"},{"x":1650,"y":0,"w":50,"h":25,"type":"normal"},{"x":1750,"y":0,"w":50,"h":75,"type":"normal"},{"x":1800,"y":0,"w":50,"h":100,"type":"normal"},{"x":2000,"y":0,"w":50,"h":1000,"type":"normal"},{"x":1850,"y":0,"w":50,"h":150,"type":"normal"},{"x":1900,"y":0,"w":50,"h":200,"type":"normal"},{"x":1950,"y":0,"w":50,"h":325,"type":"normal"},{"x":1950,"y":700,"w":50,"h":50,"type":"normal"},{"x":1925,"y":750,"w":75,"h":50,"type":"normal"},{"x":1900,"y":800,"w":100,"h":50,"type":"normal"},{"x":1850,"y":850,"w":150,"h":50,"type":"normal"},{"x":1800,"y":900,"w":200,"h":50,"type":"normal"},{"x":1725,"y":950,"w":275,"h":50,"type":"normal"},{"x":1100,"y":1000,"w":950,"h":50,"type":"normal"},{"x":950,"y":1000,"w":50,"h":50,"type":"normal"},{"x":1000,"y":700,"w":50,"h":50,"type":"normal"},{"x":1000,"y":750,"w":75,"h":50,"type":"normal"},{"x":1000,"y":800,"w":100,"h":50,"type":"normal"},{"x":1000,"y":850,"w":150,"h":50,"type":"normal"},{"x":1000,"y":900,"w":200,"h":50,"type":"normal"},{"x":1000,"y":950,"w":300,"h":100,"type":"revive"},{"x":1100,"y":1050,"w":200,"h":200,"type":"normal"},{"x":0,"y":1200,"w":1100,"h":50,"type":"normal"},{"x":0,"y":1250,"w":1300,"h":50,"type":"normal"},{"x":0,"y":150,"w":950,"h":1050,"type":"size","size":100},{"x":200,"y":900,"w":750,"h":100,"type":"normal"},{"x":0,"y":600,"w":750,"h":100,"type":"normal"},{"x":200,"y":350,"w":750,"h":50,"type":"normal"},{"x":0,"y":350,"w":950,"h":850,"type":"switchlava","onTime":2,"offTime":9,"state":false,"timer":5}]'))
/*obstacles.push(new RotatingLava(350, 0, 100, 100, 90, 0, 500, 50))
obstacles.push(new RotatingLava(350, 0, 100, 100, 90, 180, 500, 50))
obstacles.push(new RotatingLava(1000, 450, 1000, 100, 30, 0))

obstacles.push(new RotatingLava(1000, 450, 200, 100, -30, 0, 1500, 500))
obstacles.push(new RotatingLava(1300, 450, 200, 100, -30, 0, 1500, 500))
obstacles.push(new RotatingLava(1000, 450, 200, 100, -30, 180, 1500, 500))
obstacles.push(new RotatingLava(1300, 450, 200, 100, -30, 180, 1500, 500))
obstacles.push(new RotatingLava(1000, 450, 100, 100, -30, 90, 1500, 500))
obstacles.push(new RotatingLava(1200, 450, 300, 100, -30, 90, 1500, 500))
obstacles.push(new RotatingLava(1000, 450, 100, 100, -30, 270, 1500, 500))
obstacles.push(new RotatingLava(1200, 450, 300, 100, -30, 270, 1500, 500))*/

module.exports = goat;