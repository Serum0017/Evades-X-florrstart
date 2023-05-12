const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle, TimeTrap, MusicChange,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, Checkpoint, Coin, PlatformerGrav, BreakableObstacle, RotatingTp, MovingTpObstacle, InvincibilityPowerup }= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');
const Npc = require('../npc.js');

const poie = {
  arena: { width: 10000, height: 5000 },
  enemy: [],
  safes: [],
  texts: [],
  obstacles: [],
  spawns: [],
  npcs: [],
  playerSpawn: {x: 25, y: 25 }, //{ x: 50, y: 50 },
  name: 'PoIE',
    lighting: 0.1,
  longName: 'Planet of Inescapable Enemies',
  bgColor: '#2F3357',
  tileColor: '#41466B',// credits for color scheme >-< https://www.schemecolor.com/cool-gentleman.php
  difficulty: "Relentless",
	addedObstacles: [],/*[{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":8050,"y":1500,"w":550,"h":100,"type":"color","bgColor":"black","tileColor":"#1B1B1B"},{"x":0,"y":350,"w":1900,"h":500,"type":"normal"},{"x":1900,"y":0,"w":1000,"h":850,"type":"normal"},{"x":0,"y":950,"w":3000,"h":100,"type":"normal"},{"x":2900,"y":50,"w":50,"h":50,"type":"normal"},{"x":2950,"y":300,"w":50,"h":50,"type":"normal"},{"x":2900,"y":550,"w":50,"h":50,"type":"normal"},{"x":2950,"y":800,"w":50,"h":50,"type":"normal"},{"x":0,"y":850,"w":25,"h":100,"type":"tp","tpx":25,"tpy":1075},{"x":25,"y":850,"w":2875,"h":100,"type":"timetrap","maxTime":8,"time":0},{"x":2900,"y":0,"w":100,"h":950,"type":"vinette","or":0.2,"ir":0.1,"o":2},{"x":25,"y":850,"w":2875,"h":100,"type":"vinette","or":0.2,"ir":0.3,"o":4},{"x":0,"y":0,"w":1900,"h":350,"type":"vinette","or":0.2,"ir":0.3,"o":4},{"x":1850,"y":0,"w":50,"h":350,"type":"tp","tpx":2925,"tpy":25},{"x":0,"y":1050,"w":100,"h":250,"type":"color","bgColor":"#311649","tileColor":"#7E1DA2"},{"x":0,"y":1050,"w":100,"h":250,"type":"check","collected":false},{"x":0,"y":1050,"w":100,"h":250,"type":"revive"},{"x":0,"y":1300,"w":2450,"h":500,"type":"normal"},{"x":2500,"y":1050,"w":50,"h":1550,"type":"normal"},{"x":0,"y":2050,"w":2500,"h":550,"type":"normal"},{"x":2550,"y":1050,"w":800,"h":1550,"type":"normal"},{"x":2450,"y":1300,"w":50,"h":500,"type":"revive"},{"x":0,"y":1800,"w":2450,"h":250,"type":"vinette","or":1.5,"ir":1,"o":1},{"x":50,"y":1800,"w":250,"h":250,"type":"grav","force":1500,"dir":{"x":1500,"y":0},"direction":"right"},{"x":0,"y":2600,"w":100,"h":400,"type":"check","collected":false},{"x":0,"y":2600,"w":100,"h":400,"type":"revive"},{"x":0,"y":1800,"w":50,"h":250,"type":"tp","tpx":50,"tpy":2800},{"x":2450,"y":1750,"w":50,"h":50,"type":"invpu","amount":0.7,"maxAmount":0.7},{"x":100,"y":2600,"w":3250,"h":400,"type":"size","size":10},{"x":100,"y":2980,"w":3250,"h":20,"type":"lava"},{"x":100,"y":2600,"w":3250,"h":20,"type":"lava"},{"x":100,"y":2600,"w":3250,"h":400,"type":"vinette","or":2,"ir":0.3,"o":1.5},{"x":3350,"y":1400,"w":20,"h":1220,"type":"lava"},{"x":3980,"y":1400,"w":20,"h":1220,"type":"lava"},{"x":3370,"y":1400,"w":230,"h":50,"type":"lava"},{"x":3750,"y":1400,"w":230,"h":50,"type":"lava"},{"x":3350,"y":1400,"w":650,"h":1220,"type":"vinette","or":0.6,"o":0.8,"ir":0.01},{"x":3000,"y":0,"w":350,"h":1050,"type":"normal"},{"x":3700,"y":900,"w":300,"h":50,"type":"normal"},{"x":3350,"y":650,"w":300,"h":50,"type":"normal"},{"x":3350,"y":900,"w":100,"h":50,"type":"normal"},{"x":3900,"y":650,"w":100,"h":50,"type":"normal"},{"x":3450,"y":400,"w":50,"h":50,"type":"normal"},{"x":3850,"y":400,"w":50,"h":50,"type":"normal"},{"x":3550,"y":350,"w":50,"h":50,"type":"normal"},{"x":3750,"y":350,"w":50,"h":50,"type":"normal"},{"x":3350,"y":500,"w":50,"h":50,"type":"normal"},{"x":3950,"y":500,"w":50,"h":50,"type":"normal"},{"x":3950,"y":0,"w":50,"h":500,"type":"normal"},{"x":3350,"y":0,"w":50,"h":500,"type":"normal"},{"x":3450,"y":50,"w":50,"h":350,"type":"normal"},{"x":3550,"y":50,"w":50,"h":300,"type":"normal"},{"x":3750,"y":50,"w":50,"h":300,"type":"normal"},{"x":3850,"y":50,"w":50,"h":350,"type":"normal"},{"x":3650,"y":0,"w":50,"h":350,"type":"normal"},{"x":3350,"y":1150,"w":250,"h":50,"type":"normal"},{"x":3750,"y":1150,"w":250,"h":50,"type":"normal"},{"x":4000,"y":0,"w":850,"h":3000,"type":"normal"},{"x":3350,"y":0,"w":650,"h":1200,"type":"normal"},{"x":3350,"y":1200,"w":650,"h":200,"type":"tp","tpx":4875,"tpy":25},{"x":4900,"y":0,"w":50,"h":250,"type":"normal"},{"x":4850,"y":300,"w":200,"h":50,"type":"normal"},{"x":5000,"y":150,"w":50,"h":150,"type":"normal"},{"x":5400,"y":0,"w":50,"h":350,"type":"normal"},{"x":5000,"y":350,"w":50,"h":75,"type":"normal"},{"x":5000,"y":475,"w":50,"h":75,"type":"normal"},{"x":4850,"y":550,"w":600,"h":50,"type":"normal"},{"x":5400,"y":350,"w":50,"h":200,"type":"normal"},{"x":5000,"y":0,"w":50,"h":150,"type":"revive"},{"x":9300,"y":775,"w":700,"h":100,"type":"revive"},{"x":9350,"y":0,"w":600,"h":100,"type":"revive"},{"x":4850,"y":0,"w":50,"h":100,"type":"color","bgColor":"#27811b","tileColor":"#6ab95a"},{"x":5450,"y":0,"w":750,"h":1000,"type":"normal"},{"x":4850,"y":600,"w":600,"h":400,"type":"normal"},{"x":4850,"y":1600,"w":1450,"h":450,"type":"normal"},{"x":5500,"y":1000,"w":800,"h":600,"type":"normal"},{"x":4850,"y":1050,"w":450,"h":50,"type":"normal"},{"x":5250,"y":1150,"w":50,"h":450,"type":"normal"},{"x":5300,"y":1050,"w":100,"h":50,"type":"normal"},{"x":5350,"y":1100,"w":50,"h":450,"type":"normal"},{"x":5450,"y":1000,"w":50,"h":600,"type":"normal"},{"x":5850,"y":2050,"w":800,"h":950,"type":"normal"},{"x":4850,"y":2100,"w":100,"h":50,"type":"normal"},{"x":5000,"y":2050,"w":50,"h":150,"type":"normal"},{"x":4900,"y":2200,"w":150,"h":50,"type":"normal"},{"x":5050,"y":2050,"w":100,"h":900,"type":"normal"},{"x":4850,"y":2525,"w":75,"h":50,"type":"normal"},{"x":4975,"y":2525,"w":75,"h":50,"type":"normal"},{"x":4850,"y":2900,"w":75,"h":50,"type":"normal"},{"x":4975,"y":2900,"w":75,"h":50,"type":"normal"},{"x":5800,"y":2900,"w":50,"h":50,"type":"normal"},{"x":5750,"y":2850,"w":100,"h":50,"type":"normal"},{"x":5700,"y":2800,"w":150,"h":50,"type":"normal"},{"x":5650,"y":2750,"w":200,"h":50,"type":"normal"},{"x":5600,"y":2700,"w":250,"h":50,"type":"normal"},{"x":5550,"y":2650,"w":300,"h":50,"type":"normal"},{"x":5500,"y":2600,"w":350,"h":50,"type":"normal"},{"x":5450,"y":2550,"w":400,"h":50,"type":"normal"},{"x":5400,"y":2500,"w":450,"h":50,"type":"normal"},{"x":5350,"y":2450,"w":500,"h":50,"type":"normal"},{"x":5150,"y":2450,"w":50,"h":50,"type":"normal"},{"x":5150,"y":2500,"w":100,"h":50,"type":"normal"},{"x":5150,"y":2550,"w":150,"h":50,"type":"normal"},{"x":5150,"y":2600,"w":200,"h":50,"type":"normal"},{"x":5150,"y":2900,"w":500,"h":50,"type":"normal"},{"x":5150,"y":2850,"w":450,"h":50,"type":"normal"},{"x":5150,"y":2800,"w":400,"h":50,"type":"normal"},{"x":5150,"y":2750,"w":350,"h":50,"type":"normal"},{"x":5150,"y":2700,"w":300,"h":50,"type":"normal"},{"x":5150,"y":2650,"w":250,"h":50,"type":"normal"},{"x":4850,"y":350,"w":50,"h":200,"type":"tp","tpx":4875,"tpy":1025},{"x":5150,"y":2050,"w":50,"h":400,"type":"normal"},{"x":5650,"y":2050,"w":200,"h":400,"type":"normal"},{"x":5425,"y":2250,"w":25,"h":25,"type":"circle-normal","radius":150},{"x":4850,"y":1100,"w":50,"h":500,"type":"tp","tpx":4875,"tpy":2075},{"x":6200,"y":500,"w":1400,"h":50,"type":"normal"},{"x":7600,"y":0,"w":800,"h":550,"type":"normal"},{"x":6200,"y":550,"w":2175,"h":400,"type":"normal"},{"x":6200,"y":0,"w":100,"h":500,"type":"revive"},{"x":7450,"y":0,"w":100,"h":500,"type":"revive"},{"x":8000,"y":1325,"w":50,"h":475,"type":"breakable","maxStrength":50,"currentStrength":50,"time":0,"timer":0.2,"regenTime":10000,"healTimer":0},{"x":9350,"y":0,"w":650,"h":875,"type":"speed","speedInc":1.5},{"x":4850,"y":0,"w":50,"h":50,"type":"musicchange","musicPath":"/sounds/Bloo Bay Beach.mp3"},{"x":5600,"y":2050,"w":50,"h":400,"type":"tp","tpx":6250,"tpy":250},{"x":6200,"y":950,"w":100,"h":50,"type":"normal"},{"x":5200,"y":2450,"w":150,"h":50,"type":"revive"},{"x":5650,"y":2950,"w":200,"h":50,"type":"revive"},{"x":4850,"y":2950,"w":800,"h":50,"type":"grav","force":1000,"dir":{"x":1000,"y":0},"direction":"left"},{"x":4850,"y":1000,"w":50,"h":50,"type":"check","collected":false},{"x":6200,"y":0,"w":100,"h":500,"type":"check","collected":false},{"x":8000,"y":875,"w":1100,"h":425,"type":"normal"},{"x":8600,"y":875,"w":750,"h":1375,"type":"normal"},{"x":6300,"y":1825,"w":2300,"h":425,"type":"normal"},{"x":6300,"y":950,"w":1700,"h":350,"type":"normal"},{"x":6300,"y":1300,"w":50,"h":525,"type":"tp","tpx":6675,"tpy":2275},{"x":8000,"y":1300,"w":600,"h":200,"type":"normal"},{"x":8000,"y":1600,"w":600,"h":225,"type":"normal"},{"x":8550,"y":1500,"w":50,"h":100,"type":"musicchange","musicPath":"/sounds/Ravenhead.mp3"},{"x":8100,"y":1500,"w":500,"h":100,"type":"grav","force":4000,"dir":{"x":-4000,"y":0},"direction":"left"},{"x":8050,"y":1500,"w":50,"h":100,"type":"check","collected":false},{"x":7550,"y":0,"w":50,"h":500,"type":"tp","tpx":8575,"tpy":1550},{"x":6300,"y":1800,"w":1700,"h":25,"type":"normal"},{"x":6275,"y":1800,"w":125,"h":50,"type":"normal"},{"x":6650,"y":2825,"w":1350,"h":200,"type":"normal"},{"x":8000,"y":2250,"w":800,"h":750,"type":"normal"},{"x":9350,"y":1800,"w":650,"h":1200,"type":"normal"},{"x":8375,"y":550,"w":25,"h":325,"type":"normal"},{"x":8400,"y":0,"w":50,"h":50,"type":"revive"},{"x":8800,"y":2950,"w":50,"h":50,"type":"revive"},{"x":6650,"y":2250,"w":50,"h":50,"type":"revive"},{"x":4825,"y":575,"w":25,"h":25,"type":"normal"},{"x":4850,"y":0,"w":50,"h":250,"type":"platformer","force":2000,"dir":{"x":0,"y":2000},"direction":"down","jumpHeight":0},{"x":4850,"y":0,"w":550,"h":550,"type":"size","size":25},{"x":6650,"y":2800,"w":1350,"h":25,"type":"normal"},{"x":7950,"y":2750,"w":50,"h":50,"type":"tp","tpx":8825,"tpy":2975},{"x":9300,"y":2250,"w":50,"h":50,"type":"tp","tpx":8425,"tpy":25},{"x":9300,"y":0,"w":50,"h":825,"type":"normal"},{"x":9350,"y":875,"w":600,"h":50,"type":"normal"},{"x":9450,"y":100,"w":50,"h":775,"type":"normal"},{"x":9600,"y":0,"w":50,"h":775,"type":"normal"},{"x":9750,"y":100,"w":50,"h":775,"type":"normal"},{"x":9950,"y":0,"w":50,"h":825,"type":"normal"},{"x":0,"y":3000,"w":10000,"h":450,"type":"normal"},{"x":10000,"y":475,"w":1250,"h":1900,"type":"normal"},{"x":9350,"y":1750,"w":50,"h":50,"type":"tp","tpx":25,"tpy":3475},{"x":8400,"y":0,"w":50,"h":50,"type":"check","collected":false},{"x":9300,"y":0,"w":700,"h":1800,"type":"vinette","or":0.6,"ir":0.1,"o":1},{"x":9950,"y":875,"w":50,"h":50,"type":"revive"},{"x":0,"y":3450,"w":100,"h":100,"type":"color","bgColor":"#1C0909","tileColor":"#8A0303"},{"x":0,"y":3450,"w":50,"h":50,"type":"musicchange","musicPath":"/sounds/Starvation.mp3"},{"x":0,"y":3500,"w":2150,"h":50,"type":"normal"},{"x":2250,"y":3450,"w":800,"h":600,"type":"normal"},{"x":50,"y":3600,"w":2200,"h":50,"type":"normal"},{"x":0,"y":3700,"w":2200,"h":50,"type":"normal"},{"x":50,"y":3800,"w":2200,"h":50,"type":"normal"},{"x":0,"y":3900,"w":2200,"h":50,"type":"normal"},{"x":50,"y":4000,"w":2200,"h":50,"type":"normal"},{"x":0,"y":4050,"w":3050,"h":400,"type":"normal"},{"x":2150,"y":3500,"w":50,"h":50,"type":"normal"},{"x":50,"y":3550,"w":2200,"h":50,"type":"grav","force":3000,"dir":{"x":-3000,"y":0},"direction":"left"},{"x":50,"y":3750,"w":2200,"h":50,"type":"grav","force":3000,"dir":{"x":-3000,"y":0},"direction":"left"},{"x":50,"y":3950,"w":2200,"h":50,"type":"grav","force":3000,"dir":{"x":-3000,"y":0},"direction":"left"},{"x":0,"y":3450,"w":2250,"h":50,"type":"grav","force":3000,"dir":{"x":3000,"y":0},"direction":"right"},{"x":0,"y":3650,"w":2250,"h":50,"type":"grav","force":3000,"dir":{"x":3000,"y":0},"direction":"right"},{"x":0,"y":3850,"w":2250,"h":50,"type":"grav","force":3000,"dir":{"x":3000,"y":0},"direction":"right"},{"x":0,"y":3550,"w":50,"h":100,"type":"grav","force":3000,"dir":{"x":0,"y":3000},"direction":"down"},{"x":0,"y":3750,"w":50,"h":100,"type":"grav","force":3000,"dir":{"x":0,"y":3000},"direction":"down"},{"x":0,"y":3950,"w":50,"h":50,"type":"grav","force":3000,"dir":{"x":0,"y":3000},"direction":"down"},{"x":2200,"y":3850,"w":50,"h":100,"type":"grav","force":3000,"dir":{"x":0,"y":3000},"direction":"down"},{"x":2200,"y":3650,"w":50,"h":100,"type":"grav","force":3000,"dir":{"x":0,"y":3000},"direction":"down"},{"x":2200,"y":3450,"w":50,"h":100,"type":"grav","force":3000,"dir":{"x":0,"y":3000},"direction":"down"},{"x":0,"y":3450,"w":2250,"h":250,"type":"vinette","or":0.05,"ir":0.1,"o":1},{"x":0,"y":3700,"w":2250,"h":300,"type":"vinette","or":0.01,"ir":0.1,"o":1},{"x":0,"y":4000,"w":50,"h":50,"type":"tp","tpx":124,"tpy":4739},{"x":0,"y":4450,"w":100,"h":550,"type":"revive"},{"x":50,"y":4700,"w":50,"h":50,"type":"check","collected":false},{"x":2250,"y":4450,"w":800,"h":550,"type":"normal"},{"x":3300,"y":3500,"w":1675,"h":1500,"type":"normal"},{"x":4975,"y":3450,"w":775,"h":500,"type":"normal"},{"x":2200,"y":4450,"w":50,"h":550,"type":"tp","tpx":3165,"tpy":4975},{"x":3050,"y":4950,"w":250,"h":50,"type":"revive"},{"x":4975,"y":4500,"w":775,"h":500,"type":"normal"},{"x":5750,"y":3450,"w":800,"h":1550,"type":"normal"},{"x":4975,"y":3950,"w":775,"h":50,"type":"normal"},{"x":5500,"y":4000,"w":250,"h":500,"type":"normal"},{"x":4975,"y":4000,"w":25,"h":500,"type":"normal"},{"x":5225,"y":4225,"w":50,"h":50,"type":"revive"},{"x":5000,"y":4000,"w":500,"h":50,"type":"tp","tpx":6575,"tpy":3475},{"x":5000,"y":4050,"w":50,"h":450,"type":"tp","tpx":6575,"tpy":3475},{"x":5050,"y":4450,"w":450,"h":50,"type":"tp","tpx":6575,"tpy":3475},{"x":5450,"y":4050,"w":50,"h":400,"type":"tp","tpx":6575,"tpy":3475},{"x":4950,"y":3450,"w":25,"h":50,"type":"tp","tpx":5250,"tpy":4250},{"x":6550,"y":3800,"w":2150,"h":450,"type":"normal"},{"x":8700,"y":3450,"w":800,"h":800,"type":"normal"},{"x":6550,"y":4250,"w":100,"h":750,"type":"revive"},{"x":6550,"y":3450,"w":50,"h":50,"type":"revive"},{"x":6550,"y":3450,"w":50,"h":50,"type":"check","collected":false},{"x":9500,"y":3800,"w":500,"h":450,"type":"normal"},{"x":8650,"y":3450,"w":50,"h":350,"type":"tp","tpx":6575,"tpy":4275},{"x":9500,"y":3450,"w":100,"h":350,"type":"revive"},{"x":9500,"y":4250,"w":500,"h":750,"type":"normal"},{"x":9450,"y":4250,"w":50,"h":750,"type":"tp","tpx":9550,"tpy":3625},{"x":9950,"y":3450,"w":50,"h":350,"type":"winpad"},{"x":5050,"y":4050,"w":400,"h":150,"type":"vinette","or":0.2,"ir":0.1,"o":1},{"x":5050,"y":4300,"w":400,"h":150,"type":"vinette","or":0.2,"ir":0.1,"o":1},{"x":5300,"y":4200,"w":150,"h":100,"type":"vinette","or":0.2,"ir":0.1,"o":1},{"x":5050,"y":4200,"w":150,"h":100,"type":"vinette","or":0.2,"ir":0.1,"o":1},{"x":6550,"y":3450,"w":2100,"h":350,"type":"vinette","or":0.8,"ir":0.1,"o":1},{"x":9600,"y":3450,"w":350,"h":350,"type":"vinette","or":0.5,"ir":0.1,"o":1},{"x":9350,"y":875,"w":650,"h":925,"type":"size","size":5}]*/
}

let { texts, obstacles, safes, spawns, playerSpawn, arena, npcs } = poie;
npcs.push(new Npc(75, 75, 25, ['note: gonna get reworked soon :D'],'gfx/hats/autumn-wreath.png'));
spawns.push(new Spawner(250, 0, 1600, 350, { type: 'flashlight', amount: 7, radius: 30, speed: 50, flashlightSize: 90, flashlightAngle: 360 }));
spawns.push(new Spawner(2900, 50, 100, 750, { type: 'flashlight', amount: 3, radius: 1, speed: 160, flashlightSize: 15, flashlightAngle: 90 }));
spawns.push(new Spawner(25, 850, 2875, 100, { type: 'gaura', amount: 5, radius: 35, speed: 20, auraStrength: -2, }))
spawns.push(new Spawner(25, 850, 2875, 100, { type: 'gaura', amount: 5, radius: 35, speed: 20, auraStrength: 2, }))
spawns.push(new Spawner(100, 1050, 2400, 250, { type: 'normal', amount: 14, radius: 30, speed: 340 }))
spawns.push(new Spawner(50, 1800, 2450, 250, { type: 'normal', amount: 46, radius: 5, speed: 220 }))
spawns.push(new Spawner(100, 2600, 3250, 400, { type: 'normal', amount: 13, radius: 64, speed: 440 }))
spawns.push(new Spawner(3370, 1450, 610, 1150, { type: 'normal', amount: 3, radius: 74, speed: 180 }))
spawns.push(new Spawner(3370, 1450, 610, 1150, { type: 'normal', amount: 6, radius: 36, speed: 240 }))
spawns.push(new Spawner(3370, 1450, 610, 1150, { type: 'normal', amount: 12, radius: 16, speed: 300 }))
spawns.push(new Spawner(5050, 0, 350, 550, { type: 'growing', amount: 3, radius: 20, speed: 60, growSpeed: 50, growing: true, minRadius: 20, maxRadius: 60, bounceAmount: 32 }));
spawns.push(new Spawner(4900, 1100, 350, 500, { type: 'rain', amount: 8, radius: 18, speed: 80, waitTimer: 3, direction: 
'vertical'}));
spawns.push(new Spawner(4850, 2250, 200, 275, { type: 'turning', amount: 2, radius: 36, speed: 80, changeDir: 2 }))
spawns.push(new Spawner(4850, 2575, 200, 325, { type: 'wind', amount: 4, radius: 48, speed: 60, strength: 80 }));
spawns.push(new Spawner(5200, 2050, 400, 400, { x: 5400, y: 2250, type: 'turret', amount: 1, radius: 1, speed: 0, shootSpeed: 0.33, pRadius: 12, pSpeed: 100, shootDirections: [Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0]}));
spawns.push(new Spawner(5200, 2500, 650, 450, { type: 'memory', amount: 12, radius: 28, speed: 120, timeOn: 3, timeOff: 1.5, range: 0 }));
spawns.push(new Spawner(6300, 0, 1150, 500, { type: 'growing', amount: 20, radius: 20, speed: 100, growSpeed: 30, growing: true, minRadius: 20, maxRadius: 40 }));
obstacles.push(new ColorChange(8050,1500,550,100,"black","#1B1B1B"));

spawns.push(new Spawner(6350, 1300, 1650, 500, { type: 'flower', amount: 14, radius: 12, speed: 340, rotateSpeed: 60, clonesNumber: 2, clonesRadius: 8, clonesDistance: 8, layers: 2}));
spawns.push(new Spawner(6350, 1300, 1650, 500, { type: 'flower', amount: 6, radius: 12, speed: 380, rotateSpeed: 60, clonesNumber: 5, clonesRadius: 8, clonesDistance: 8, layers: 2}));
spawns.push(new Spawner(6650, 2250, 1350, 550, { type: 'flower', amount: 10, radius: 8, speed: 360, rotateSpeed: -60, clonesNumber: 3, clonesRadius: 8, clonesDistance: 8, layers: 3}));
spawns.push(new Spawner(6650, 2250, 1350, 550, { type: 'memory', amount: 6, radius: 28, speed: 120, timeOn: 2.5, timeOff: 2, range: 1 }));
///add,{"type":"vinette","or":0.8,"ir":0.1,"o":1}
spawns.push(new Spawner(8800, 2250, 500, 750, { type: 'memory', amount: 9, radius: 38, speed: 340, timeOn: 5, timeOff: 3, range: 8 }));
spawns.push(new Spawner(8400, 0, 900, 875, { type: 'normal', amount: 24, radius: 8, speed: 420 }))
spawns.push(new Spawner(9350, 0, 600, 875, { type: 'memory', amount: 1, radius: 196, speed: 825, timeOn: 1, timeOff: 2, range: 4 }));
spawns.push(new Spawner(9650, 1200, 50, 50, { type: 'flower', amount: 1, radius: 24.5, speed: 0, rotateSpeed: -6, clonesNumber: 4, clonesRadius: 15, clonesDistance: 25, layers: 13}));
spawns.push(new Spawner(9650, 1625, 50, 50, { type: 'flower', amount: 1, radius: 24.5, speed: 0, rotateSpeed: 6, clonesNumber: 4, clonesRadius: 15, clonesDistance: 25, layers: 13}));
spawns.push(new Spawner(100, 4450, 2100, 550, { type: 'normal', amount: 3, radius: 200, speed: 320 }))
spawns.push(new Spawner(3050, 3450, 250, 1500, { type: 'flashlight', amount: 10, radius: 26, speed: 220, flashlightSize: 60, flashlightAngle: 72 }));
safes.push(new Safe(2900, 850, 100, 100));
spawns.push(new Spawner(5050, 4050, 400, 400, { type: 'memory', amount: 4, radius: 170, speed: 825, timeOn: 2, timeOff: 1, range: 0 }));
spawns.push(new Spawner(6650, 3450, 2000, 350, { type: 'flower', amount: 12, radius: 21, speed: 220, rotateSpeed: 48, clonesNumber: 3, clonesRadius: 8, clonesDistance: 15, layers: 3, growingMultiple: 2.5, growingSpeed: 10}));
safes.push(new Safe(2900, 0, 100, 50));
spawns.push(new Spawner(6650, 4250, 2800, 750, { type: 'normal', amount: 18, radius: 22, speed: 540 }))
spawns.push(new Spawner(6650, 4250, 2800, 750, { type: 'memory', amount: 3, radius: 88, speed: 90, timeOn: 3, timeOff: 3, range: 0 }));
spawns.push(new Spawner(6650, 4250, 2800, 750, { type: 'flower', amount: 10, radius: 0.01, speed: 370, rotateSpeed: 20, clonesNumber: 3, clonesRadius: 10, clonesDistance: 18, layers: 2}));
spawns.push(new Spawner(6650, 4250, 2800, 750, { type: 'flashlight', amount: 10, radius: 26, speed: 480, flashlightSize: 60, flashlightAngle: 72 }));
safes.push(new Safe(2900, 850, 100, 100));
spawns.push(new Spawner(9600, 3450, 350, 350, { type: 'normal', amount: 1, radius: 99, speed: 30 }))
//texts.push(new Text(175, 1000, 'Let the Real fun begin!'));
texts.push(new Text(2200, 1700, 'Take some invincibility.'));
texts.push(new Text(2225, 1730, 'You\'ll need it.'));
texts.push(new Text(6250, -20, 'Final Boss!'));
texts.push(new Text(-130, 4723, 'flesruoY evaS'));
texts.push(new Text(9750, 3220, '❄︎□︎ ♌︎♏︎ ♍︎□︎■︎⧫︎♓︎■︎◆︎♏︎♎︎ 📬︎📬︎📬︎'));
//texts.push(new Text(8425, -21, 'Go on.'));
///add,{"type":"musicchange","musicPath":"/sounds/Starvation.mp3"}
///add,{"type":"color","bgColor":"#1C0909","tileColor":"#8A0303"}
safes.push(new Safe(3350, 2600, 650, 400));

// parsed addedobs
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new ColorChange(8050,1500,550,100,'black','#1B1B1B'))
obstacles.push(new NormalObstacle(0,350,1900,500))
obstacles.push(new NormalObstacle(1900,0,1000,850))
obstacles.push(new NormalObstacle(0,950,3000,100))
obstacles.push(new NormalObstacle(2900,50,50,50))
obstacles.push(new NormalObstacle(2950,300,50,50))
obstacles.push(new NormalObstacle(2900,550,50,50))
obstacles.push(new NormalObstacle(2950,800,50,50))
obstacles.push(new Tp(0,850,25,100,25,1075))
obstacles.push(new TimeTrap(25,850,2875,100,8))
obstacles.push(new VinetteIncrease(2900,0,100,950,0.1,0.2,2))
obstacles.push(new VinetteIncrease(25,850,2875,100,0.3,0.2,4))
obstacles.push(new VinetteIncrease(0,0,1900,350,0.3,0.2,4))
obstacles.push(new Tp(1850,0,50,350,2925,25))
obstacles.push(new ColorChange(0,1050,100,250,'#311649','#7E1DA2'))
obstacles.push(new Checkpoint(0,1050,100,250))
safes.push(new Safe(0,1050,100,250))
obstacles.push(new NormalObstacle(0,1300,2450,500))
obstacles.push(new NormalObstacle(2500,1050,50,1550))
obstacles.push(new NormalObstacle(0,2050,2500,550))
obstacles.push(new NormalObstacle(2550,1050,800,1550))
safes.push(new Safe(2450,1300,50,500))
obstacles.push(new VinetteIncrease(0,1800,2450,250,1,1.5,1))
obstacles.push(new GravObstacle(50,1800,250,250,'right',1500))
obstacles.push(new Checkpoint(0,2600,100,400))
safes.push(new Safe(0,2600,100,400))
obstacles.push(new Tp(0,1800,50,250,50,2800))
obstacles.push(new InvincibilityPowerup(2450,1750,50,50,0.7))
obstacles.push(new SizePlayer(100,2600,3250,400,10))
obstacles.push(new Lava(100,2980,3250,20,true))
obstacles.push(new Lava(100,2600,3250,20,true))
obstacles.push(new VinetteIncrease(100,2600,3250,400,0.3,2,1.5))
obstacles.push(new Lava(3350,1400,20,1220,true))
obstacles.push(new Lava(3980,1400,20,1220,true))
obstacles.push(new Lava(3370,1400,230,50,true))
obstacles.push(new Lava(3750,1400,230,50,true))
obstacles.push(new VinetteIncrease(3350,1400,650,1220,0.01,0.6,0.8))
obstacles.push(new NormalObstacle(3000,0,350,1050))
obstacles.push(new NormalObstacle(3700,900,300,50))
obstacles.push(new NormalObstacle(3350,650,300,50))
obstacles.push(new NormalObstacle(3350,900,100,50))
obstacles.push(new NormalObstacle(3900,650,100,50))
obstacles.push(new NormalObstacle(3450,400,50,50))
obstacles.push(new NormalObstacle(3850,400,50,50))
obstacles.push(new NormalObstacle(3550,350,50,50))
obstacles.push(new NormalObstacle(3750,350,50,50))
obstacles.push(new NormalObstacle(3350,500,50,50))
obstacles.push(new NormalObstacle(3950,500,50,50))
obstacles.push(new NormalObstacle(3950,0,50,500))
obstacles.push(new NormalObstacle(3350,0,50,500))
obstacles.push(new NormalObstacle(3450,50,50,350))
obstacles.push(new NormalObstacle(3550,50,50,300))
obstacles.push(new NormalObstacle(3750,50,50,300))
obstacles.push(new NormalObstacle(3850,50,50,350))
obstacles.push(new NormalObstacle(3650,0,50,350))
obstacles.push(new NormalObstacle(3350,1150,250,50))
obstacles.push(new NormalObstacle(3750,1150,250,50))
obstacles.push(new NormalObstacle(4000,0,850,3000))
obstacles.push(new NormalObstacle(3350,0,650,1200))
obstacles.push(new Tp(3350,1200,650,200,4875,25))
obstacles.push(new NormalObstacle(4900,0,50,250))
obstacles.push(new NormalObstacle(4850,300,200,50))
obstacles.push(new NormalObstacle(5000,150,50,150))
obstacles.push(new NormalObstacle(5400,0,50,350))
obstacles.push(new NormalObstacle(5000,350,50,75))
obstacles.push(new NormalObstacle(5000,475,50,75))
obstacles.push(new NormalObstacle(4850,550,600,50))
obstacles.push(new NormalObstacle(5400,350,50,200))
safes.push(new Safe(5000,0,50,150))
safes.push(new Safe(9300,775,700,100))
safes.push(new Safe(9350,0,600,100))
obstacles.push(new ColorChange(4850,0,50,100,'#27811b','#6ab95a'))
obstacles.push(new NormalObstacle(5450,0,750,1000))
obstacles.push(new NormalObstacle(4850,600,600,400))
obstacles.push(new NormalObstacle(4850,1600,1450,450))
obstacles.push(new NormalObstacle(5500,1000,800,600))
obstacles.push(new NormalObstacle(4850,1050,450,50))
obstacles.push(new NormalObstacle(5250,1150,50,450))
obstacles.push(new NormalObstacle(5300,1050,100,50))
obstacles.push(new NormalObstacle(5350,1100,50,450))
obstacles.push(new NormalObstacle(5450,1000,50,600))
obstacles.push(new NormalObstacle(5850,2050,800,950))
obstacles.push(new NormalObstacle(4850,2100,100,50))
obstacles.push(new NormalObstacle(5000,2050,50,150))
obstacles.push(new NormalObstacle(4900,2200,150,50))
obstacles.push(new NormalObstacle(5050,2050,100,900))
obstacles.push(new NormalObstacle(4850,2525,75,50))
obstacles.push(new NormalObstacle(4975,2525,75,50))
obstacles.push(new NormalObstacle(4850,2900,75,50))
obstacles.push(new NormalObstacle(4975,2900,75,50))
obstacles.push(new NormalObstacle(5800,2900,50,50))
obstacles.push(new NormalObstacle(5750,2850,100,50))
obstacles.push(new NormalObstacle(5700,2800,150,50))
obstacles.push(new NormalObstacle(5650,2750,200,50))
obstacles.push(new NormalObstacle(5600,2700,250,50))
obstacles.push(new NormalObstacle(5550,2650,300,50))
obstacles.push(new NormalObstacle(5500,2600,350,50))
obstacles.push(new NormalObstacle(5450,2550,400,50))
obstacles.push(new NormalObstacle(5400,2500,450,50))
obstacles.push(new NormalObstacle(5350,2450,500,50))
obstacles.push(new NormalObstacle(5150,2450,50,50))
obstacles.push(new NormalObstacle(5150,2500,100,50))
obstacles.push(new NormalObstacle(5150,2550,150,50))
obstacles.push(new NormalObstacle(5150,2600,200,50))
obstacles.push(new NormalObstacle(5150,2900,500,50))
obstacles.push(new NormalObstacle(5150,2850,450,50))
obstacles.push(new NormalObstacle(5150,2800,400,50))
obstacles.push(new NormalObstacle(5150,2750,350,50))
obstacles.push(new NormalObstacle(5150,2700,300,50))
obstacles.push(new NormalObstacle(5150,2650,250,50))
obstacles.push(new Tp(4850,350,50,200,4875,1025))
obstacles.push(new NormalObstacle(5150,2050,50,400))
obstacles.push(new NormalObstacle(5650,2050,200,400))
obstacles.push(new CircularNormalObstacle(5425,2250,100))
obstacles.push(new Tp(4850,1100,50,500,4875,2075))
obstacles.push(new NormalObstacle(6200,500,1400,50))
obstacles.push(new NormalObstacle(7600,0,800,550))
obstacles.push(new NormalObstacle(6200,550,2175,400))
safes.push(new Safe(6200,0,100,500))
safes.push(new Safe(7450,0,100,500))
obstacles.push(new BreakableObstacle(8000,1325,50,475,50,0.2,10000))
obstacles.push(new SpeedObstacle(9350,0,650,875,1.5))
obstacles.push(new MusicChange(4850,0,50,50,'/sounds/Bloo Bay Beach.mp3'))
obstacles.push(new Tp(5600,2050,50,400,6250,250))
obstacles.push(new NormalObstacle(6200,950,100,50))
safes.push(new Safe(5200,2450,150,50))
safes.push(new Safe(5650,2950,200,50))
obstacles.push(new GravObstacle(4850,2950,800,50,'right',1000))
obstacles.push(new Checkpoint(4850,1000,50,50))
obstacles.push(new Checkpoint(6200,0,100,500))
obstacles.push(new NormalObstacle(8000,875,1100,425))
obstacles.push(new NormalObstacle(8600,875,750,1375))
obstacles.push(new NormalObstacle(6300,1825,2300,425))
obstacles.push(new NormalObstacle(6300,950,1700,350))
obstacles.push(new Tp(6300,1300,50,525,6675,2275))
obstacles.push(new NormalObstacle(8000,1300,600,200))
obstacles.push(new NormalObstacle(8000,1600,600,225))
obstacles.push(new MusicChange(8550,1500,50,100,'/sounds/Ravenhead.mp3'))
obstacles.push(new GravObstacle(8100,1500,500,100,'left',4000))
obstacles.push(new Checkpoint(8050,1500,50,100))
obstacles.push(new Tp(7550,0,50,500,8575,1550))
obstacles.push(new NormalObstacle(6300,1800,1700,25))
obstacles.push(new NormalObstacle(6275,1800,125,50))
obstacles.push(new NormalObstacle(6650,2825,1350,200))
obstacles.push(new NormalObstacle(8000,2250,800,750))
obstacles.push(new NormalObstacle(9350,1800,650,1200))
obstacles.push(new NormalObstacle(8375,550,25,325))
safes.push(new Safe(8400,0,50,50))
safes.push(new Safe(8800,2950,50,50))
safes.push(new Safe(6650,2250,50,50))
obstacles.push(new NormalObstacle(4825,575,25,25))
obstacles.push(new PlatformerGrav(4850,0,50,250,'down',0,2000))
obstacles.push(new SizePlayer(4850,0,550,550,25))
obstacles.push(new NormalObstacle(6650,2800,1350,25))
obstacles.push(new Tp(7950,2750,50,50,8825,2975))
obstacles.push(new Tp(9300,2250,50,50,8425,25))
obstacles.push(new NormalObstacle(9300,0,50,825))
obstacles.push(new NormalObstacle(9350,875,600,50))
obstacles.push(new NormalObstacle(9450,100,50,775))
obstacles.push(new NormalObstacle(9600,0,50,775))
obstacles.push(new NormalObstacle(9750,100,50,775))
obstacles.push(new NormalObstacle(9950,0,50,825))
obstacles.push(new NormalObstacle(0,3000,10000,450))
obstacles.push(new NormalObstacle(10000,475,1250,1900))
obstacles.push(new Tp(9350,1750,50,50,25,3475))
obstacles.push(new Checkpoint(8400,0,50,50))
obstacles.push(new VinetteIncrease(9300,0,700,1800,0.1,0.6,1))
safes.push(new Safe(9950,875,50,50))
obstacles.push(new ColorChange(0,3450,100,100,'#1C0909','#8A0303'))
obstacles.push(new MusicChange(0,3450,50,50,'/sounds/Starvation.mp3'))
obstacles.push(new NormalObstacle(0,3500,2150,50))
obstacles.push(new NormalObstacle(2250,3450,800,600))
obstacles.push(new NormalObstacle(50,3600,2200,50))
obstacles.push(new NormalObstacle(0,3700,2200,50))
obstacles.push(new NormalObstacle(50,3800,2200,50))
obstacles.push(new NormalObstacle(0,3900,2200,50))
obstacles.push(new NormalObstacle(50,4000,2200,50))
obstacles.push(new NormalObstacle(0,4050,3050,400))
obstacles.push(new NormalObstacle(2150,3500,50,50))
obstacles.push(new GravObstacle(50,3550,2200,50,'left',3000))
obstacles.push(new GravObstacle(50,3750,2200,50,'left',3000))
obstacles.push(new GravObstacle(50,3950,2200,50,'left',3000))
obstacles.push(new GravObstacle(0,3450,2250,50,'right',3000))
obstacles.push(new GravObstacle(0,3650,2250,50,'right',3000))
obstacles.push(new GravObstacle(0,3850,2250,50,'right',3000))
obstacles.push(new GravObstacle(0,3550,50,100,'down',3000))
obstacles.push(new GravObstacle(0,3750,50,100,'down',3000))
obstacles.push(new GravObstacle(0,3950,50,50,'down',3000))
obstacles.push(new GravObstacle(2200,3850,50,100,'down',3000))
obstacles.push(new GravObstacle(2200,3650,50,100,'down',3000))
obstacles.push(new GravObstacle(2200,3450,50,100,'down',3000))
obstacles.push(new VinetteIncrease(0,3450,2250,250,0.1,0.05,1))
obstacles.push(new VinetteIncrease(0,3700,2250,300,0.1,0.01,1))
obstacles.push(new Tp(0,4000,50,50,124,4739))
safes.push(new Safe(0,4450,100,550))
obstacles.push(new Checkpoint(50,4700,50,50))
obstacles.push(new NormalObstacle(2250,4450,800,550))
obstacles.push(new NormalObstacle(3300,3500,1675,1500))
obstacles.push(new NormalObstacle(4975,3450,775,500))
obstacles.push(new Tp(2200,4450,50,550,3165,4975))
safes.push(new Safe(3050,4950,250,50))
obstacles.push(new NormalObstacle(4975,4500,775,500))
obstacles.push(new NormalObstacle(5750,3450,800,1550))
obstacles.push(new NormalObstacle(4975,3950,775,50))
obstacles.push(new NormalObstacle(5500,4000,250,500))
obstacles.push(new NormalObstacle(4975,4000,25,500))
safes.push(new Safe(5225,4225,50,50))
obstacles.push(new Tp(5000,4000,500,50,6575,3475))
obstacles.push(new Tp(5000,4050,50,450,6575,3475))
obstacles.push(new Tp(5050,4450,450,50,6575,3475))
obstacles.push(new Tp(5450,4050,50,400,6575,3475))
obstacles.push(new Tp(4950,3450,25,50,5250,4250))
obstacles.push(new NormalObstacle(6550,3800,2150,450))
obstacles.push(new NormalObstacle(8700,3450,800,800))
safes.push(new Safe(6550,4250,100,750))
safes.push(new Safe(6550,3450,50,50))
obstacles.push(new Checkpoint(6550,3450,50,50))
obstacles.push(new NormalObstacle(9500,3800,500,450))
obstacles.push(new Tp(8650,3450,50,350,6575,4275))
safes.push(new Safe(9500,3450,100,350))
obstacles.push(new NormalObstacle(9500,4250,500,750))
obstacles.push(new Tp(9450,4250,50,750,9550,3625))
obstacles.push(new Winpad(9950,3450,50,350))
obstacles.push(new VinetteIncrease(5050,4050,400,150,0.1,0.2,1))
obstacles.push(new VinetteIncrease(5050,4300,400,150,0.1,0.2,1))
obstacles.push(new VinetteIncrease(5300,4200,150,100,0.1,0.2,1))
obstacles.push(new VinetteIncrease(5050,4200,150,100,0.1,0.2,1))
obstacles.push(new VinetteIncrease(6550,3450,2100,350,0.1,0.8,1))
obstacles.push(new VinetteIncrease(9600,3450,350,350,0.1,0.5,1))
obstacles.push(new SizePlayer(9350,875,650,925,5))


module.exports = poie;