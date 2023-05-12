const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, Checkpoint, Coin, PlatformerGrav, BreakableObstacle, RotatingTp, MovingTpObstacle }= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const povv = {
  arena: { width: 3000, height: 3000 },
  enemy: [],
  safes: [],
  texts: [],
  obstacles: [],
  spawns: [],
  playerSpawn: {x: 1500, y: 25 }, //{ x: 50, y: 50 },
  name: 'PoVV',
  longName: 'Planet of the Vibing Vault',
  bgColor: '#D89002',
  tileColor: '#FAC203',
  difficulty: "Moderate",
    addedObstacles: [],
  //addedObstacles: [{"x":450,"y":2350,"r":93.17833333388953,"type":"growinglavacircle","minWidth":0.001,"maxWidth":100,"growSpeed":20,"growing":true,"radius":41.018333332796004},{"x":450,"y":2150,"r":93.17833333388953,"type":"growinglavacircle","minWidth":0.001,"maxWidth":100,"growSpeed":20,"growing":true,"radius":41.018333332796004},{"x":450,"y":1950,"r":93.17833333388953,"type":"growinglavacircle","minWidth":0.001,"maxWidth":100,"growSpeed":20,"growing":true,"radius":41.018333332796004},{"x":450,"y":1750,"r":93.17833333388953,"type":"growinglavacircle","minWidth":0.001,"maxWidth":100,"growSpeed":20,"growing":true,"radius":41.018333332796004},{"x":400,"y":1550,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":500,"y":1550,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":400,"y":1450,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":500,"y":1450,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":400,"y":1350,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":500,"y":1350,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":400,"y":1250,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":500,"y":1250,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":400,"y":1150,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":500,"y":1150,"r":5.977666666946768,"type":"growinglavacircle","minWidth":0.001,"maxWidth":50,"growSpeed":20,"growing":false,"radius":40.2023333336038},{"x":1350,"y":2450,"w":300,"h":250,"spawn":{"x":1500,"y":2575},"type":"check","collected":false},{"x":4850,"y":50,"w":50,"h":350,"type":"normal"},{"x":4850,"y":50,"w":50,"h":350,"type":"normal"},{"x":2200.000000062662,"y":2700,"w":100,"h":100,"type":"lavamove","points":[[1850,2700],[2600,2700]],"speed":400,"currentPoint":0,"collidable":true,"pointTo":{"x":2600,"y":2700},"pointOn":{"x":1850,"y":2700}},{"x":2249.9999999373244,"y":2800,"w":100,"h":100,"type":"lavamove","points":[[1850,2800],[2600,2800]],"speed":400,"currentPoint":1,"collidable":true,"pointTo":{"x":1850,"y":2800},"pointOn":{"x":2600,"y":2800}},{"x":2200.000000062662,"y":2900,"w":100,"h":100,"type":"lavamove","points":[[1850,2900],[2600,2900]],"speed":400,"currentPoint":0,"collidable":true,"pointTo":{"x":2600,"y":2900},"pointOn":{"x":1850,"y":2900}},{"x":1712.4999999627028,"y":2900,"w":100,"h":100,"type":"lavamove","points":[[1675,2800],[1750,2800],[1750,2900],[1675,2900]],"speed":100,"currentPoint":2,"collidable":true,"pointTo":{"x":1675,"y":2900},"pointOn":{"x":1750,"y":2900}},{"x":4850,"y":50,"w":50,"h":350,"type":"normal"},{"x":2700,"y":300,"w":300,"h":300,"type":"grav","force":1500,"dir":{"x":-1500,"y":0},"direction":"left"},{"x":2700,"y":600,"w":300,"h":300,"type":"grav","force":1500,"dir":{"x":0,"y":1500},"direction":"down"},{"x":2700,"y":900,"w":300,"h":200,"type":"grav","force":1500,"dir":{"x":1500,"y":0},"direction":"right"},{"x":2700,"y":0,"w":300,"h":300,"spawn":{"x":2850,"y":150},"type":"check","collected":false},{"x":25,"y":1100,"w":50,"h":50,"type":"tpmove","points":[[0,1100],[250,1100]],"speed":300,"currentPoint":0,"tpx":150,"tpy":450,"pointTo":{"x":250,"y":1100},"pointOn":{"x":0,"y":1100}},{"x":225,"y":1250,"w":50,"h":50,"type":"tpmove","points":[[0,1250],[250,1250]],"speed":300,"currentPoint":1,"tpx":150,"tpy":450,"pointTo":{"x":0,"y":1250},"pointOn":{"x":250,"y":1250}},{"x":0,"y":300,"w":300,"h":1500,"type":"grav","force":4500,"dir":{"x":0,"y":4500},"direction":"down"},{"x":0,"y":1800,"w":300,"h":900,"type":"grav","force":3500,"dir":{"x":0,"y":3500},"direction":"down"},{"x":0,"y":1800,"w":300,"h":900,"type":"size","size":15},{"x":0,"y":1800,"w":300,"h":900,"type":"vinette","ir":0.4,"or":0.1,"o":1.8},{"x":0,"y":1700,"w":300,"h":100,"type":"grav","force":5500,"dir":{"x":5500,"y":0},"direction":"right"},{"x":269.2146188435322,"y":1462.411775061978,"w":50,"h":50,"type":"rotate-tp","angle":69462.5,"rotateSpeed":300,"tpx":100,"tpy":450,"pivotX":150,"pivotY":1500,"distToPivot":125},{"x":575,"y":2855,"w":248,"h":10,"type":"rotate-lava","angle":-34731.25,"rotateSpeed":-150,"pivotX":575,"pivotY":2855,"distToPivot":0},{"x":775,"y":2855,"w":248,"h":10,"type":"rotate-lava","angle":-34731.25,"rotateSpeed":-150,"pivotX":775,"pivotY":2855,"distToPivot":0},{"x":975,"y":2855,"w":248,"h":10,"type":"rotate-lava","angle":-34731.25,"rotateSpeed":-150,"pivotX":975,"pivotY":2855,"distToPivot":0},{"x":1175,"y":2855,"w":248,"h":10,"type":"rotate-lava","angle":-34731.25,"rotateSpeed":-150,"pivotX":1175,"pivotY":2855,"distToPivot":0},{"x":0,"y":1800,"w":300,"h":900,"type":"size","size":15},{"x":0,"y":1800,"w":300,"h":900,"type":"vinette","ir":0.4,"or":0.1,"o":1.8},{"x":300,"y":300,"w":2400,"h":50,"type":"normal"},{"x":2650,"y":300,"w":50,"h":2400,"type":"normal"},{"x":1650,"y":2650,"w":1050,"h":50,"type":"normal"},{"x":300,"y":2650,"w":1050,"h":50,"type":"normal"},{"x":300,"y":300,"w":50,"h":2400,"type":"normal"},{"x":550,"y":2400,"w":1900,"h":50,"type":"normal"},{"x":2400,"y":550,"w":50,"h":1900,"type":"normal"},{"x":1650,"y":550,"w":800,"h":50,"type":"normal"},{"x":550,"y":550,"w":800,"h":50,"type":"normal"},{"x":550,"y":550,"w":50,"h":1900,"type":"normal"},{"x":1200,"y":1100,"w":600,"h":50,"type":"normal"},{"x":1200,"y":1100,"w":50,"h":550,"type":"normal"},{"x":1750,"y":1100,"w":50,"h":550,"type":"normal"},{"x":1250,"y":1600,"w":150,"h":50,"type":"normal"},{"x":1600,"y":1600,"w":150,"h":50,"type":"normal"},{"x":1350,"y":1250,"w":50,"h":250,"type":"normal"},{"x":1600,"y":1250,"w":50,"h":250,"type":"normal"},{"x":1400,"y":1450,"w":200,"h":50,"type":"normal"},{"x":1400,"y":1250,"w":50,"h":50,"type":"normal"},{"x":1550,"y":1250,"w":50,"h":50,"type":"normal"},{"x":1400,"y":1300,"w":50,"h":150,"type":"lava"},{"x":1550,"y":1300,"w":50,"h":150,"type":"lava"},{"x":1250,"y":1150,"w":500,"h":450,"type":"size","size":10},{"x":1450,"y":1300,"w":100,"h":150,"type":"winpad"},{"x":1450,"y":1425,"w":100,"h":25,"type":"lava"},{"x":0,"y":300,"w":75,"h":50,"type":"normal"},{"x":225,"y":300,"w":75,"h":50,"type":"normal"},{"x":0,"y":350,"w":100,"h":200,"type":"tp","tpx":150,"tpy":175},{"x":200,"y":350,"w":100,"h":200,"type":"tp","tpx":150,"tpy":175},{"x":100,"y":700,"w":100,"h":50,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":900,"w":50,"h":50,"type":"tp","tpx":150,"tpy":175},{"x":125,"y":900,"w":50,"h":50,"type":"tp","tpx":150,"tpy":175},{"x":250,"y":900,"w":50,"h":50,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":950,"w":25,"h":650,"type":"tp","tpx":150,"tpy":175},{"x":275,"y":950,"w":25,"h":650,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":1800,"w":225,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":1900,"w":200,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":2000,"w":175,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":2100,"w":150,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":2200,"w":125,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":2300,"w":100,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":2400,"w":75,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":2500,"w":50,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":2600,"w":25,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":275,"y":2000,"w":25,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":250,"y":2100,"w":50,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":225,"y":2200,"w":75,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":200,"y":2300,"w":100,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":175,"y":2400,"w":125,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":150,"y":2500,"w":150,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":125,"y":2600,"w":175,"h":100,"type":"tp","tpx":150,"tpy":175},{"x":0,"y":2700,"w":25,"h":25,"type":"normal"},{"x":125,"y":2700,"w":175,"h":25,"type":"normal"},{"x":300,"y":2700,"w":25,"h":25,"type":"normal"},{"x":325,"y":2700,"w":25,"h":25,"type":"normal"},{"x":1450,"y":1250,"w":50,"h":50,"type":"coin","collected":false},{"x":1500,"y":1250,"w":50,"h":50,"type":"coin","collected":false},{"x":1350,"y":2650,"w":300,"h":350,"type":"lava"},{"x":1150,"y":2700,"w":50,"h":100,"type":"normal"},{"x":1200,"y":2750,"w":50,"h":50,"type":"normal"},{"x":1325,"y":2700,"w":25,"h":300,"type":"normal"},{"x":1650,"y":2700,"w":25,"h":300,"type":"normal"},{"x":1750,"y":2750,"w":100,"h":50,"type":"normal"},{"x":1800,"y":2700,"w":50,"h":50,"type":"normal"},{"x":1200,"y":2700,"w":50,"h":50,"type":"tp","tpx":1500,"tpy":2550},{"x":1750,"y":2700,"w":50,"h":50,"type":"tp","tpx":1500,"tpy":2550},{"x":1200,"y":2800,"w":50,"h":150,"type":"normal"},{"x":1050,"y":2750,"w":50,"h":250,"type":"normal"},{"x":950,"y":2700,"w":50,"h":250,"type":"normal"},{"x":850,"y":2750,"w":50,"h":250,"type":"normal"},{"x":750,"y":2700,"w":50,"h":250,"type":"normal"},{"x":650,"y":2750,"w":50,"h":250,"type":"normal"},{"x":550,"y":2700,"w":50,"h":250,"type":"normal"},{"x":450,"y":2750,"w":50,"h":250,"type":"normal"},{"x":350,"y":2700,"w":50,"h":250,"type":"normal"},{"x":300,"y":2725,"w":50,"h":225,"type":"normal"},{"x":1250,"y":2700,"w":50,"h":50,"type":"coin","collected":false},{"x":1300,"y":2700,"w":25,"h":50,"type":"coin","collected":false},{"x":2700,"y":300,"w":25,"h":2400,"type":"lava"},{"x":2975,"y":300,"w":25,"h":2400,"type":"lava"},{"x":2900,"y":1200,"w":25,"h":50,"type":"normal"},{"x":2775,"y":1300,"w":25,"h":50,"type":"normal"},{"x":2725,"y":1200,"w":175,"h":50,"type":"lava"},{"x":2800,"y":1300,"w":175,"h":50,"type":"lava"},{"x":2775,"y":1350,"w":25,"h":200,"type":"lava"},{"x":2725,"y":1600,"w":75,"h":25,"type":"normal"},{"x":2725,"y":1625,"w":175,"h":25,"type":"lava"},{"x":2900,"y":1600,"w":25,"h":50,"type":"normal"},{"x":2800,"y":1600,"w":100,"h":25,"type":"lava"},{"x":2875,"y":1500,"w":25,"h":100,"type":"lava"},{"x":2875,"y":1425,"w":25,"h":25,"type":"lava"},{"x":2800,"y":1450,"w":25,"h":50,"type":"normal"},{"x":2850,"y":1550,"w":25,"h":50,"type":"normal"},{"x":2800,"y":1425,"w":75,"h":25,"type":"normal"},{"x":2900,"y":1500,"w":75,"h":25,"type":"normal"},{"x":2900,"y":1350,"w":50,"h":25,"type":"normal"},{"x":2950,"y":1350,"w":25,"h":100,"type":"lava"},{"x":2950,"y":1450,"w":25,"h":50,"type":"normal"},{"x":2950,"y":1525,"w":25,"h":25,"type":"normal"},{"x":2800,"y":1700,"w":125,"h":25,"type":"lava"},{"x":2925,"y":1700,"w":50,"h":25,"type":"normal"},{"x":2725,"y":1650,"w":25,"h":75,"type":"normal"},{"x":2800,"y":1350,"w":25,"h":75,"type":"tp","tpx":2935,"tpy":1550},{"x":2725,"y":1175,"w":200,"h":25,"type":"normal"},{"x":1650,"y":2450,"w":800,"h":200,"type":"size","size":10},{"x":550,"y":2450,"w":800,"h":200,"type":"tornado","spinRadius":3},{"x":352.75,"y":552.75,"w":94.5,"h":394.5,"type":"growinglava","minWidth":1,"maxWidth":100,"growSpeed":30,"growing":true},{"x":497.5,"y":597.5,"w":5,"h":305,"type":"growinglava","minWidth":1,"maxWidth":100,"growSpeed":30,"growing":false},{"x":350,"y":550,"w":200,"h":450,"type":"size","size":5},{"x":350,"y":2450,"w":200,"h":200,"type":"check","collected":"false"},{"x":1350,"y":350,"w":300,"h":200,"type":"check","collected":"false"},{"x":550,"y":350,"w":25,"h":100,"type":"normal"},{"x":625,"y":400,"w":25,"h":150,"type":"normal"},{"x":650,"y":400,"w":150,"h":25,"type":"normal"},{"x":850,"y":350,"w":25,"h":100,"type":"normal"},{"x":700,"y":475,"w":175,"h":25,"type":"normal"},{"x":850,"y":450,"w":25,"h":25,"type":"normal"},{"x":925,"y":400,"w":25,"h":150,"type":"normal"},{"x":1000,"y":350,"w":175,"h":25,"type":"normal"},{"x":1000,"y":425,"w":175,"h":25,"type":"normal"},{"x":950,"y":425,"w":50,"h":25,"type":"normal"},{"x":1175,"y":350,"w":175,"h":25,"type":"normal"},{"x":1325,"y":375,"w":25,"h":125,"type":"normal"},{"x":1225,"y":425,"w":25,"h":25,"type":"normal"},{"x":1250,"y":425,"w":75,"h":25,"type":"normal"},{"x":1225,"y":450,"w":25,"h":50,"type":"normal"},{"x":1000,"y":475,"w":225,"h":25,"type":"normal"},{"x":1000,"y":500,"w":25,"h":25,"type":"normal"},{"x":1075,"y":525,"w":25,"h":25,"type":"normal"},{"x":1150,"y":500,"w":25,"h":25,"type":"normal"},{"x":1225,"y":525,"w":25,"h":25,"type":"normal"},{"x":1250,"y":450,"w":75,"h":50,"type":"normal"},{"x":950,"y":425,"w":400,"h":125,"type":"size","size":12},{"x":2425,"y":400,"w":25,"h":150,"type":"lava"},{"x":2325,"y":350,"w":25,"h":150,"type":"lava"},{"x":2175,"y":475,"w":150,"h":25,"type":"lava"},{"x":2075,"y":400,"w":25,"h":150,"type":"lava"},{"x":2175,"y":400,"w":150,"h":25,"type":"lava"},{"x":2275,"y":425,"w":50,"h":50,"type":"coin","collected":false},{"x":2000,"y":350,"w":25,"h":50,"type":"lava"},{"x":2000,"y":400,"w":75,"h":25,"type":"lava"},{"x":2000,"y":425,"w":25,"h":75,"type":"lava"},{"x":1750,"y":475,"w":250,"h":25,"type":"lava"},{"x":1650,"y":400,"w":25,"h":150,"type":"lava"},{"x":1675,"y":400,"w":250,"h":25,"type":"lava"},{"x":1650,"y":350,"w":375,"h":200,"type":"size","size":10},{"x":1975,"y":350,"w":25,"h":75,"type":"lava"},{"x":1650,"y":350,"w":20,"h":10,"type":"lava"},{"x":1650,"y":390,"w":20,"h":10,"type":"lava"},{"x":1640,"y":350,"w":10,"h":50,"type":"size","size":10},{"x":1350,"y":550,"w":300,"h":50,"type":"platformer","force":1500,"dir":{"x":0,"y":1500},"direction":"down","jumpHeight":0},{"x":2300,"y":350,"w":25,"h":50,"type":"tp","tpx":2050,"tpy":450},{"x":2025,"y":425,"w":50,"h":50,"type":"revive"},{"x":2450,"y":1150,"w":200,"h":50,"type":"revive"},{"x":600,"y":600,"w":1800,"h":500,"type":"vinette","ir":0.001,"or":0.1,"o":2.5},{"x":1800,"y":1100,"w":600,"h":550,"type":"platformer","force":1500,"dir":{"x":0,"y":1500},"direction":"down","jumpHeight":0},{"x":600,"y":1100,"w":600,"h":550,"type":"platformer","force":1500,"dir":{"x":0,"y":1500},"direction":"down","jumpHeight":0},{"x":1800,"y":1200,"w":600,"h":50,"type":"breakable","maxStrength":10,"currentStrength":10,"time":7.979727989493313e-17,"timer":0.05,"regenTime":5,"healTimer":0},{"x":1950,"y":1250,"w":50,"h":400,"type":"normal"},{"x":2150,"y":1250,"w":50,"h":400,"type":"normal"},{"x":2000,"y":1250,"w":150,"h":400,"type":"size","size":10},{"x":2200,"y":1250,"w":200,"h":400,"type":"size","size":50},{"x":1800,"y":1250,"w":150,"h":400,"type":"size","size":20},{"x":1800,"y":1600,"w":150,"h":50,"type":"tp","tpx":2075,"tpy":1260},{"x":2000,"y":1600,"w":150,"h":50,"type":"tp","tpx":2300,"tpy":1260},{"x":1800,"y":1325,"w":50,"h":50,"type":"lava"},{"x":1900,"y":1425,"w":50,"h":25,"type":"lava"},{"x":1800,"y":1530,"w":40,"h":70,"type":"lava"},{"x":1910,"y":1530,"w":40,"h":70,"type":"lava"},{"x":2000,"y":1330,"w":100,"h":20,"type":"lava"},{"x":2050,"y":1430,"w":100,"h":20,"type":"lava"},{"x":2020,"y":1530,"w":100,"h":20,"type":"lava"},{"x":2000,"y":1530,"w":20,"h":20,"type":"bounce","effect":80},{"x":2200,"y":1400,"w":100,"h":50,"type":"bounce","effect":80},{"x":2300,"y":1570,"w":100,"h":50,"type":"bounce","effect":80},{"x":1950,"y":1240,"w":450,"h":10,"type":"tp","tpx":1875,"tpy":1265},{"x":1800,"y":1300,"w":150,"h":25,"type":"breakable","maxStrength":10,"currentStrength":"10","time":0.05,"timer":0.05,"regenTime":2},{"x":2000,"y":1300,"w":150,"h":25,"type":"breakable","maxStrength":10,"currentStrength":"8","time":0.1,"timer":0.1,"regenTime":2},{"x":1350,"y":350,"w":300,"h":200,"type":"check"},{"x":1200,"y":1650,"w":50,"h":700,"type":"normal"},{"x":1750,"y":1650,"w":50,"h":700,"type":"normal"},{"x":1250,"y":2300,"w":200,"h":50,"type":"normal"},{"x":1550,"y":2300,"w":200,"h":50,"type":"normal"},{"x":1350,"y":1975,"w":300,"h":50,"type":"normal"},{"x":1250,"y":1650,"w":50,"h":100,"type":"normal"},{"x":1300,"y":1650,"w":50,"h":50,"type":"normal"},{"x":1650,"y":1650,"w":100,"h":50,"type":"normal"},{"x":1700,"y":1700,"w":50,"h":50,"type":"normal"},{"x":1300,"y":1550,"w":100,"h":10,"type":"rotate-lava","rotateSpeed":100,"angle":23154.166666661582,"distToPivot":0,"pivotX":1300,"pivotY":1550},{"x":1300,"y":1450,"w":100,"h":10,"type":"rotate-lava","rotateSpeed":100,"angle":23154.166666661582,"distToPivot":0,"pivotX":1300,"pivotY":1450},{"x":1300,"y":1350,"w":100,"h":10,"type":"rotate-lava","rotateSpeed":100,"angle":23154.166666661582,"distToPivot":0,"pivotX":1300,"pivotY":1350},{"x":1300,"y":1200,"w":150,"h":10,"type":"rotate-lava","rotateSpeed":100,"angle":23154.166666661582,"distToPivot":0,"pivotX":1300,"pivotY":1200},{"x":1450,"y":1200,"w":100,"h":10,"type":"rotate-lava","rotateSpeed":100,"angle":23154.166666661582,"distToPivot":0,"pivotX":1450,"pivotY":1200},{"x":1700,"y":1550,"w":100,"h":10,"type":"rotate-lava","rotateSpeed":-100,"angle":-23154.166666661582,"distToPivot":0,"pivotX":1700,"pivotY":1550},{"x":1700,"y":1450,"w":100,"h":10,"type":"rotate-lava","rotateSpeed":-100,"angle":-23154.166666661582,"distToPivot":0,"pivotX":1700,"pivotY":1450},{"x":1700,"y":1350,"w":100,"h":10,"type":"rotate-lava","rotateSpeed":-100,"angle":-23154.166666661582,"distToPivot":0,"pivotX":1700,"pivotY":1350},{"x":1700,"y":1200,"w":150,"h":10,"type":"rotate-lava","rotateSpeed":-100,"angle":-23154.166666661582,"distToPivot":0,"pivotX":1700,"pivotY":1200},{"x":1550,"y":1200,"w":100,"h":10,"type":"rotate-lava","rotateSpeed":-100,"angle":-23154.166666661582,"distToPivot":0,"pivotX":1550,"pivotY":1200},{"x":1500,"y":1600,"w":200,"h":10,"type":"rotate-lava","rotateSpeed":-50,"angle":-11577.083333330791,"distToPivot":0,"pivotX":1500,"pivotY":1600},{"x":1500,"y":1600,"w":200,"h":10,"type":"rotate-lava","rotateSpeed":50,"angle":11577.083333330791,"distToPivot":0,"pivotX":1500,"pivotY":1600},{"x":650,"y":1150,"w":550,"h":50,"type":"bounce","effect":20},{"x":900,"y":1200,"w":50,"h":250,"type":"bounce","effect":20},{"x":650,"y":1125,"w":550,"h":25,"type":"tp","tpx":625,"tpy":1165},{"x":650,"y":1600,"w":75,"h":25,"type":"circle-bounce","radius":40,"effect":35},{"x":775,"y":1600,"w":50,"h":50,"type":"circle-bounce","radius":40,"effect":35},{"x":900,"y":1600,"w":50,"h":50,"type":"circle-bounce","radius":40,"effect":35},{"x":1025,"y":1600,"w":50,"h":25,"type":"circle-bounce","radius":40,"effect":35},{"x":1150,"y":1600,"w":25,"h":25,"type":"circle-bounce","radius":40,"effect":35},{"x":1075,"y":1525,"w":25,"h":50,"type":"circle-bounce","radius":20,"effect":50},{"x":975,"y":1475,"w":50,"h":25,"type":"circle-bounce","radius":20,"effect":50},{"x":1050,"y":1375,"w":50,"h":25,"type":"circle-bounce","radius":20,"effect":50},{"x":1000,"y":1275,"w":25,"h":25,"type":"circle-bounce","radius":20,"effect":50},{"x":950,"y":1255,"w":50,"h":40,"type":"bounce","effect":20},{"x":1050,"y":1355,"w":150,"h":40,"type":"bounce","effect":20},{"x":1075,"y":1525,"w":25,"h":25,"type":"circle-bounce","radius":21,"effect":70},{"x":975,"y":1475,"w":25,"h":25,"type":"circle-bounce","radius":21,"effect":70},{"x":1075,"y":1350,"w":25,"h":25,"type":"circle-bounce","radius":11,"effect":110},{"x":1125,"y":1275,"w":25,"h":25,"type":"circle-bounce","radius":20,"effect":50},{"x":1125,"y":1255,"w":70,"h":35,"type":"bounce","effect":20},{"x":1125,"y":1290,"w":75,"h":5,"type":"bounce","effect":20},{"x":1190,"y":1255,"w":10,"h":35,"type":"bounce","effect":20},{"x":950,"y":1200,"w":250,"h":25,"type":"tp","tpx":1145,"tpy":1700},{"x":950,"y":1225,"w":20,"h":30,"type":"tp","tpx":1145,"tpy":1700},{"x":1180,"y":1225,"w":20,"h":30,"type":"tp","tpx":1145,"tpy":1700},{"x":950,"y":1300,"w":100,"h":250,"type":"grav","force":500,"dir":{"x":0,"y":-500},"direction":"up"},{"x":1360,"y":1986,"w":276,"h":24,"type":"lava"},{"x":1216,"y":2310,"w":216,"h":24,"type":"lava"},{"x":1564,"y":2310,"w":216,"h":24,"type":"lava"},{"x":1216,"y":1746,"w":24,"h":564,"type":"lava"},{"x":1756,"y":1746,"w":24,"h":564,"type":"lava"},{"x":1612,"y":1614,"w":168,"h":24,"type":"lava"},{"x":1216,"y":1614,"w":168,"h":24,"type":"lava"},{"x":1216,"y":1650,"w":72,"h":84,"type":"lava"},{"x":1300,"y":1650,"w":36,"h":36,"type":"lava"},{"x":1660,"y":1650,"w":36,"h":36,"type":"lava"},{"x":1708,"y":1650,"w":72,"h":84,"type":"lava"},{"x":1216,"y":1146,"w":24,"h":444,"type":"lava"},{"x":1216,"y":1110,"w":564,"h":24,"type":"lava"},{"x":600,"y":2350,"w":1800,"h":50,"type":"coin","collected":false},{"x":2450,"y":1200,"w":200,"h":1250,"type":"size","size":5},{"x":2450,"y":2450,"w":200,"h":200,"type":"revive"},{"x":2450,"y":350,"w":200,"h":200,"type":"revive"},{"x":350,"y":350,"w":200,"h":200,"type":"revive"},{"x":0,"y":2725,"w":300,"h":275,"type":"revive"},{"x":2700,"y":2700,"w":300,"h":300,"type":"revive"},{"x":0,"y":0,"w":350,"h":300,"type":"revive"}],
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = povv;
texts.push(new Text(1500, -25, 'Welcome to the Vibe!'));

//texts.push(new Text(100, -25, 'Welcome to the mapmaker :D'));
safes.push(new Safe(1300,0,400,300));

spawns.push(new Spawner(350, 0,950, 300, { type: 'turret', amount: 3, radius: 32, speed: 100, shootSpeed: 0.6, pRadius: 18, pSpeed: 180, shootDirections: [Math.PI*1.5,Math.PI,Math.PI*0.5,0]}));
spawns.push(new Spawner(1700, 0, 1000, 300, { type: 'square', amount: 20, size: 32, speed: 120 }));

safes.push(new Safe(2700,0,300,300));

safes.push(new Safe(2750,1700,50,25));
spawns.push(new Spawner(2750, 1700, 225, 1000, { type: 'flower', amount: 3, radius: 24, speed: 100, rotateSpeed: 10+Math.random()*20, clonesNumber: 2, clonesRadius: 10, clonesDistance: 20, layers: 4}));

safes.push(new Safe(2700,2700,300,300));

spawns.push(new Spawner(1650, 2450, 800, 200, { type: 'switch', amount: 16, radius: 12, speed: 120, time: 0.8 }));

spawns.push(new Spawner(2450, 550, 200, 600, { type: 'rain', amount: 10, radius: 12, speed: 150, waitTimer: 1, direction: 
'horizontal'})),
spawns.push(new Spawner(2450, 1200, 200, 1250, { type: 'rain', amount: 18, radius: 18, speed: 100, waitTimer: 3, direction: 
'vertical'})),

spawns.push(new Spawner(550, 2450, 800, 200, { type: 'flashlight', amount: 4, radius: 24, speed: 200, flashlightSize: 70, flashlightAngle: 100 }));
//"x":600,"y":600,"w":1800,"h":500
spawns.push(new Spawner(600, 600, 1800, 500, { type: 'flashlight', amount: 15, radius: 1, speed: 18, flashlightSize: 99, flashlightAngle: 12 }));
spawns.push(new Spawner(600, 600, 1800, 500, { type: 'flashlight', amount: 15, radius: 24, speed: 30, flashlightSize: 40, flashlightAngle: 160 }));

safes.push(new Safe(2900,1525,50,50));

safes.push(new Safe(1350,2450,300,200));

spawns.push(new Spawner(599, 1649, 1802, 802, { x: 650, y: 1900, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 3.25, pRadius: 49, pSpeed: 140, shootDirections: [0]}));
spawns.push(new Spawner(599, 1649, 1802, 802, { x: 650, y: 2100, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 3.25, pRadius: 49, pSpeed: 140, shootDirections: [0]}));
spawns.push(new Spawner(599, 1649, 1802, 802, { x: 650, y: 2300, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 3.25, pRadius: 49, pSpeed: 140, shootDirections: [0]}));

spawns.push(new Spawner(599, 1649, 1802, 802, { x: 2350, y: 1800, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 3.25, pRadius: 49, pSpeed: 140, shootDirections: [Math.PI]}));
spawns.push(new Spawner(599, 1649, 1802, 802, { x: 2350, y: 2000, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 3.25, pRadius: 49, pSpeed: 140, shootDirections: [Math.PI]}));
spawns.push(new Spawner(599, 1649, 1802, 802, { x: 2350, y: 2200, type: 'turret', amount: 1, radius: 49, speed: 0, shootSpeed: 3.25, pRadius: 49, pSpeed: 140, shootDirections: [Math.PI]}));

safes.push(new Safe(600,1650,600,100));
safes.push(new Safe(1800,1650,600,100));

// parsed from addedobs -------------------------------------
obstacles.push(new GrowingCircleLavaObstacle(450,2350,0.001,100,20,true))
obstacles.push(new GrowingCircleLavaObstacle(450,2150,0.001,100,20,true))
obstacles.push(new GrowingCircleLavaObstacle(450,1950,0.001,100,20,true))
obstacles.push(new GrowingCircleLavaObstacle(450,1750,0.001,100,20,true))
obstacles.push(new GrowingCircleLavaObstacle(400,1550,0.001,50,20,false))
obstacles.push(new GrowingCircleLavaObstacle(500,1550,0.001,50,20,false))
obstacles.push(new GrowingCircleLavaObstacle(400,1450,0.001,50,20,false))
obstacles.push(new GrowingCircleLavaObstacle(500,1450,0.001,50,20,false))
obstacles.push(new GrowingCircleLavaObstacle(400,1350,0.001,50,20,false))
obstacles.push(new GrowingCircleLavaObstacle(500,1350,0.001,50,20,false))
obstacles.push(new GrowingCircleLavaObstacle(400,1250,0.001,50,20,false))
obstacles.push(new GrowingCircleLavaObstacle(500,1250,0.001,50,20,false))
obstacles.push(new GrowingCircleLavaObstacle(400,1150,0.001,50,20,false))
obstacles.push(new GrowingCircleLavaObstacle(500,1150,0.001,50,20,false))
obstacles.push(new Checkpoint(1350,2450,300,250))
obstacles.push(new NormalObstacle(4850,50,50,350))
obstacles.push(new NormalObstacle(4850,50,50,350))
obstacles.push(new MovingLavaObstacle(100,100,[[1850,2700],[2600,2700]],400,0,true))
obstacles.push(new MovingLavaObstacle(100,100,[[1850,2800],[2600,2800]],400,1,true))
obstacles.push(new MovingLavaObstacle(100,100,[[1850,2900],[2600,2900]],400,0,true))
obstacles.push(new MovingLavaObstacle(100,100,[[1675,2800],[1750,2800],[1750,2900],[1675,2900]],100,2,true))
obstacles.push(new NormalObstacle(4850,50,50,350))
obstacles.push(new GravObstacle(2700,300,300,300,'left',1500))
obstacles.push(new GravObstacle(2700,600,300,300,'down',1500))
obstacles.push(new GravObstacle(2700,900,300,200,'right',1500))
obstacles.push(new Checkpoint(2700,0,300,300))
obstacles.push(new MovingTpObstacle(50,50,[[0,1100],[250,1100]],100,0,150,450))
obstacles.push(new MovingTpObstacle(50,50,[[0,1250],[250,1250]],100,1,150,450))
obstacles.push(new GravObstacle(0,300,300,1500,'down',4500))
obstacles.push(new GravObstacle(0,1800,300,900,'down',3500))
obstacles.push(new SizePlayer(0,1800,300,900,15))
obstacles.push(new VinetteIncrease(0,1800,300,900,0.4,0.1,1.8))
obstacles.push(new GravObstacle(0,1700,300,100,'right',5500))
obstacles.push(new RotatingTp(269.2146188435322,1462.411775061978,50,50,100,69462.5,100,450,150,1500,125,false))
obstacles.push(new RotatingLava(575,2855,248,10,-150,-34731.25,575,2855,0,false))
obstacles.push(new RotatingLava(775,2855,248,10,-150,-34731.25,775,2855,0,false))
obstacles.push(new RotatingLava(975,2855,248,10,-150,-34731.25,975,2855,0,false))
obstacles.push(new RotatingLava(1175,2855,248,10,-150,-34731.25,1175,2855,0,false))
obstacles.push(new SizePlayer(0,1800,300,900,15))
obstacles.push(new VinetteIncrease(0,1800,300,900,0.4,0.1,1.8))
obstacles.push(new NormalObstacle(300,300,2400,50))
obstacles.push(new NormalObstacle(2650,300,50,2400))
obstacles.push(new NormalObstacle(1650,2650,1050,50))
obstacles.push(new NormalObstacle(300,2650,1050,50))
obstacles.push(new NormalObstacle(300,300,50,2400))
obstacles.push(new NormalObstacle(550,2400,1900,50))
obstacles.push(new NormalObstacle(2400,550,50,1900))
obstacles.push(new NormalObstacle(1650,550,800,50))
obstacles.push(new NormalObstacle(550,550,800,50))
obstacles.push(new NormalObstacle(550,550,50,1900))
obstacles.push(new NormalObstacle(1200,1100,600,50))
obstacles.push(new NormalObstacle(1200,1100,50,550))
obstacles.push(new NormalObstacle(1750,1100,50,550))
obstacles.push(new NormalObstacle(1250,1600,150,50))
obstacles.push(new NormalObstacle(1600,1600,150,50))
obstacles.push(new NormalObstacle(1350,1250,50,250))
obstacles.push(new NormalObstacle(1600,1250,50,250))
obstacles.push(new NormalObstacle(1400,1450,200,50))
obstacles.push(new NormalObstacle(1400,1250,50,50))
obstacles.push(new NormalObstacle(1550,1250,50,50))
obstacles.push(new Lava(1400,1300,50,150,true))
obstacles.push(new Lava(1550,1300,50,150,true))
obstacles.push(new SizePlayer(1250,1150,500,450,10))
obstacles.push(new Winpad(1450,1300,100,150))
obstacles.push(new Lava(1450,1425,100,25,true))
obstacles.push(new NormalObstacle(0,300,75,50))
obstacles.push(new NormalObstacle(225,300,75,50))
obstacles.push(new Tp(0,350,100,200,150,175))
obstacles.push(new Tp(200,350,100,200,150,175))
obstacles.push(new Tp(100,700,100,50,150,175))
obstacles.push(new Tp(0,900,50,50,150,175))
obstacles.push(new Tp(125,900,50,50,150,175))
obstacles.push(new Tp(250,900,50,50,150,175))
obstacles.push(new Tp(0,950,25,650,150,175))
obstacles.push(new Tp(275,950,25,650,150,175))
obstacles.push(new Tp(0,1800,225,100,150,175))
obstacles.push(new Tp(0,1900,200,100,150,175))
obstacles.push(new Tp(0,2000,175,100,150,175))
obstacles.push(new Tp(0,2100,150,100,150,175))
obstacles.push(new Tp(0,2200,125,100,150,175))
obstacles.push(new Tp(0,2300,100,100,150,175))
obstacles.push(new Tp(0,2400,75,100,150,175))
obstacles.push(new Tp(0,2500,50,100,150,175))
obstacles.push(new Tp(0,2600,25,100,150,175))
obstacles.push(new Tp(275,2000,25,100,150,175))
obstacles.push(new Tp(250,2100,50,100,150,175))
obstacles.push(new Tp(225,2200,75,100,150,175))
obstacles.push(new Tp(200,2300,100,100,150,175))
obstacles.push(new Tp(175,2400,125,100,150,175))
obstacles.push(new Tp(150,2500,150,100,150,175))
obstacles.push(new Tp(125,2600,175,100,150,175))
obstacles.push(new NormalObstacle(0,2700,25,25))
obstacles.push(new NormalObstacle(125,2700,175,25))
obstacles.push(new NormalObstacle(300,2700,25,25))
obstacles.push(new NormalObstacle(325,2700,25,25))
obstacles.push(new Coin(1450,1250,50,50))
obstacles.push(new Coin(1500,1250,50,50))
obstacles.push(new Lava(1350,2650,300,350,true))
obstacles.push(new NormalObstacle(1150,2700,50,100))
obstacles.push(new NormalObstacle(1200,2750,50,50))
obstacles.push(new NormalObstacle(1325,2700,25,300))
obstacles.push(new NormalObstacle(1650,2700,25,300))
obstacles.push(new NormalObstacle(1750,2750,100,50))
obstacles.push(new NormalObstacle(1800,2700,50,50))
obstacles.push(new Tp(1200,2700,50,50,1500,2550))
obstacles.push(new Tp(1750,2700,50,50,1500,2550))
obstacles.push(new NormalObstacle(1200,2800,50,150))
obstacles.push(new NormalObstacle(1050,2750,50,250))
obstacles.push(new NormalObstacle(950,2700,50,250))
obstacles.push(new NormalObstacle(850,2750,50,250))
obstacles.push(new NormalObstacle(750,2700,50,250))
obstacles.push(new NormalObstacle(650,2750,50,250))
obstacles.push(new NormalObstacle(550,2700,50,250))
obstacles.push(new NormalObstacle(450,2750,50,250))
obstacles.push(new NormalObstacle(350,2700,50,250))
obstacles.push(new NormalObstacle(300,2725,50,225))
obstacles.push(new Coin(1250,2700,50,50))
obstacles.push(new Coin(1300,2700,25,50))
obstacles.push(new Lava(2700,300,25,2400,true))
obstacles.push(new Lava(2975,300,25,2400,true))
obstacles.push(new NormalObstacle(2900,1200,25,50))
obstacles.push(new NormalObstacle(2775,1300,25,50))
obstacles.push(new Lava(2725,1200,175,50,true))
obstacles.push(new Lava(2800,1300,175,50,true))
obstacles.push(new Lava(2775,1350,25,200,true))
obstacles.push(new NormalObstacle(2725,1600,75,25))
obstacles.push(new Lava(2725,1625,175,25,true))
obstacles.push(new NormalObstacle(2900,1600,25,50))
obstacles.push(new Lava(2800,1600,100,25,true))
obstacles.push(new Lava(2875,1500,25,100,true))
obstacles.push(new Lava(2875,1425,25,25,true))
obstacles.push(new NormalObstacle(2800,1450,25,50))
obstacles.push(new NormalObstacle(2850,1550,25,50))
obstacles.push(new NormalObstacle(2800,1425,75,25))
obstacles.push(new NormalObstacle(2900,1500,75,25))
obstacles.push(new NormalObstacle(2900,1350,50,25))
obstacles.push(new Lava(2950,1350,25,100,true))
obstacles.push(new NormalObstacle(2950,1450,25,50))
obstacles.push(new NormalObstacle(2950,1525,25,25))
obstacles.push(new Lava(2800,1700,125,25,true))
obstacles.push(new NormalObstacle(2925,1700,50,25))
obstacles.push(new NormalObstacle(2725,1650,25,75))
obstacles.push(new Tp(2800,1350,25,75,2935,1550))
obstacles.push(new NormalObstacle(2725,1175,200,25))
obstacles.push(new SizePlayer(1650,2450,800,200,10))
obstacles.push(new Tornado(550,2450,800,200,3))
obstacles.push(new GrowingLavaObstacle(352.75,552.75,1,100,30,true))
obstacles.push(new GrowingLavaObstacle(497.5,597.5,1,100,30,true))
obstacles.push(new SizePlayer(350,550,200,450,5))
obstacles.push(new Checkpoint(350,2450,200,200))
obstacles.push(new Checkpoint(1350,350,300,200))
obstacles.push(new NormalObstacle(550,350,25,100))
obstacles.push(new NormalObstacle(625,400,25,150))
obstacles.push(new NormalObstacle(650,400,150,25))
obstacles.push(new NormalObstacle(850,350,25,100))
obstacles.push(new NormalObstacle(700,475,175,25))
obstacles.push(new NormalObstacle(850,450,25,25))
obstacles.push(new NormalObstacle(925,400,25,150))
obstacles.push(new NormalObstacle(1000,350,175,25))
obstacles.push(new NormalObstacle(1000,425,175,25))
obstacles.push(new NormalObstacle(950,425,50,25))
obstacles.push(new NormalObstacle(1175,350,175,25))
obstacles.push(new NormalObstacle(1325,375,25,125))
obstacles.push(new NormalObstacle(1225,425,25,25))
obstacles.push(new NormalObstacle(1250,425,75,25))
obstacles.push(new NormalObstacle(1225,450,25,50))
obstacles.push(new NormalObstacle(1000,475,225,25))
obstacles.push(new NormalObstacle(1000,500,25,25))
obstacles.push(new NormalObstacle(1075,525,25,25))
obstacles.push(new NormalObstacle(1150,500,25,25))
obstacles.push(new NormalObstacle(1225,525,25,25))
obstacles.push(new NormalObstacle(1250,450,75,50))
obstacles.push(new SizePlayer(950,425,400,125,12))
obstacles.push(new Lava(2425,400,25,150,true))
obstacles.push(new Lava(2325,350,25,150,true))
obstacles.push(new Lava(2175,475,150,25,true))
obstacles.push(new Lava(2075,400,25,150,true))
obstacles.push(new Lava(2175,400,150,25,true))
obstacles.push(new Coin(2275,425,50,50))
obstacles.push(new Lava(2000,350,25,50,true))
obstacles.push(new Lava(2000,400,75,25,true))
obstacles.push(new Lava(2000,425,25,75,true))
obstacles.push(new Lava(1750,475,250,25,true))
obstacles.push(new Lava(1650,400,25,150,true))
obstacles.push(new Lava(1675,400,250,25,true))
obstacles.push(new SizePlayer(1650,350,375,200,10))
obstacles.push(new Lava(1975,350,25,75,true))
obstacles.push(new Lava(1650,350,20,10,true))
obstacles.push(new Lava(1650,390,20,10,true))
obstacles.push(new SizePlayer(1640,350,10,50,10))
obstacles.push(new PlatformerGrav(1350,550,300,50,'down',0,1500))
obstacles.push(new Tp(2300,350,25,50,2050,450))
safes.push(new Safe(2025,425,50,50))
safes.push(new Safe(2450,1150,200,50))
obstacles.push(new VinetteIncrease(600,600,1800,500,0.001,0.1,2.5))
obstacles.push(new PlatformerGrav(1800,1100,600,550,'down',0,1500))
obstacles.push(new PlatformerGrav(600,1100,600,550,'down',0,1500))
obstacles.push(new BreakableObstacle(1800,1200,600,50,10,0.05,5))
obstacles.push(new NormalObstacle(1950,1250,50,400))
obstacles.push(new NormalObstacle(2150,1250,50,400))
obstacles.push(new SizePlayer(2000,1250,150,400,10))
obstacles.push(new SizePlayer(2200,1250,200,400,50))
obstacles.push(new SizePlayer(1800,1250,150,400,20))
obstacles.push(new Tp(1800,1600,150,50,2075,1260))
obstacles.push(new Tp(2000,1600,150,50,2300,1260))
obstacles.push(new Lava(1800,1325,50,50,true))
obstacles.push(new Lava(1900,1425,50,25,true))
obstacles.push(new Lava(1800,1530,40,70,true))
obstacles.push(new Lava(1910,1530,40,70,true))
obstacles.push(new Lava(2000,1330,100,20,true))
obstacles.push(new Lava(2050,1430,100,20,true))
obstacles.push(new Lava(2020,1530,100,20,true))
obstacles.push(new BouncyObstacle(2000,1530,20,20,80))
obstacles.push(new BouncyObstacle(2200,1400,100,50,80))
obstacles.push(new BouncyObstacle(2300,1570,100,50,80))
obstacles.push(new Tp(1950,1240,450,10,1875,1265))
obstacles.push(new BreakableObstacle(1800,1300,150,25,10,0.05,2))
obstacles.push(new BreakableObstacle(2000,1300,150,25,10,0.1,2))
obstacles.push(new Checkpoint(1350,350,300,200))
obstacles.push(new NormalObstacle(1200,1650,50,700))
obstacles.push(new NormalObstacle(1750,1650,50,700))
obstacles.push(new NormalObstacle(1250,2300,200,50))
obstacles.push(new NormalObstacle(1550,2300,200,50))
obstacles.push(new NormalObstacle(1350,1975,300,50))
obstacles.push(new NormalObstacle(1250,1650,50,100))
obstacles.push(new NormalObstacle(1300,1650,50,50))
obstacles.push(new NormalObstacle(1650,1650,100,50))
obstacles.push(new NormalObstacle(1700,1700,50,50))
obstacles.push(new RotatingLava(1300,1550,100,10,100,23154.166666661582,1300,1550,0,false))
obstacles.push(new RotatingLava(1300,1450,100,10,100,23154.166666661582,1300,1450,0,false))
obstacles.push(new RotatingLava(1300,1350,100,10,100,23154.166666661582,1300,1350,0,false))
obstacles.push(new RotatingLava(1300,1200,150,10,100,23154.166666661582,1300,1200,0,false))
obstacles.push(new RotatingLava(1450,1200,100,10,100,23154.166666661582,1450,1200,0,false))
obstacles.push(new RotatingLava(1700,1550,100,10,-100,-23154.166666661582,1700,1550,0,false))
obstacles.push(new RotatingLava(1700,1450,100,10,-100,-23154.166666661582,1700,1450,0,false))
obstacles.push(new RotatingLava(1700,1350,100,10,-100,-23154.166666661582,1700,1350,0,false))
obstacles.push(new RotatingLava(1700,1200,150,10,-100,-23154.166666661582,1700,1200,0,false))
obstacles.push(new RotatingLava(1550,1200,100,10,-100,-23154.166666661582,1550,1200,0,false))
obstacles.push(new RotatingLava(1500,1600,200,10,-50,-11577.083333330791,1500,1600,0,false))
obstacles.push(new RotatingLava(1500,1600,200,10,50,11577.083333330791,1500,1600,0,false))
obstacles.push(new BouncyObstacle(650,1150,550,50,20))
obstacles.push(new BouncyObstacle(900,1200,50,250,20))
obstacles.push(new Tp(650,1125,550,25,625,1165))
obstacles.push(new CircularBouncyObstacle(650,1600,40,35))
obstacles.push(new CircularBouncyObstacle(775,1600,40,35))
obstacles.push(new CircularBouncyObstacle(900,1600,40,35))
obstacles.push(new CircularBouncyObstacle(1025,1600,40,35))
obstacles.push(new CircularBouncyObstacle(1150,1600,40,35))
obstacles.push(new CircularBouncyObstacle(1075,1525,20,50))
obstacles.push(new CircularBouncyObstacle(975,1475,20,50))
obstacles.push(new CircularBouncyObstacle(1050,1375,20,50))
obstacles.push(new CircularBouncyObstacle(1000,1275,20,50))
obstacles.push(new BouncyObstacle(950,1255,50,40,20))
obstacles.push(new BouncyObstacle(1050,1355,150,40,20))
obstacles.push(new CircularBouncyObstacle(1075,1525,21,70))
obstacles.push(new CircularBouncyObstacle(975,1475,21,70))
obstacles.push(new CircularBouncyObstacle(1075,1350,11,110))
obstacles.push(new CircularBouncyObstacle(1125,1275,20,50))
obstacles.push(new BouncyObstacle(1125,1255,70,35,20))
obstacles.push(new BouncyObstacle(1125,1290,75,5,20))
obstacles.push(new BouncyObstacle(1190,1255,10,35,20))
obstacles.push(new Tp(950,1200,250,25,1145,1700))
obstacles.push(new Tp(950,1225,20,30,1145,1700))
obstacles.push(new Tp(1180,1225,20,30,1145,1700))
obstacles.push(new GravObstacle(950,1300,100,250,'up',500))
obstacles.push(new Lava(1360,1986,276,24,true))
obstacles.push(new Lava(1216,2310,216,24,true))
obstacles.push(new Lava(1564,2310,216,24,true))
obstacles.push(new Lava(1216,1746,24,564,true))
obstacles.push(new Lava(1756,1746,24,564,true))
obstacles.push(new Lava(1612,1614,168,24,true))
obstacles.push(new Lava(1216,1614,168,24,true))
obstacles.push(new Lava(1216,1650,72,84,true))
obstacles.push(new Lava(1300,1650,36,36,true))
obstacles.push(new Lava(1660,1650,36,36,true))
obstacles.push(new Lava(1708,1650,72,84,true))
obstacles.push(new Lava(1216,1146,24,444,true))
obstacles.push(new Lava(1216,1110,564,24,true))
obstacles.push(new Coin(600,2350,1800,50))
obstacles.push(new SizePlayer(2450,1200,200,1250,5))
safes.push(new Safe(2450,2450,200,200))
safes.push(new Safe(2450,350,200,200))
safes.push(new Safe(350,350,200,200))
safes.push(new Safe(0,2725,300,275))
safes.push(new Safe(2700,2700,300,300))
safes.push(new Safe(0,0,350,300))

module.exports = povv;