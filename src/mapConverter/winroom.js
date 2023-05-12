const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const winroom = {
  arena: { width: 1000, height: 1000 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
	playerSpawn: { x: 500, y: 500 },
	name: 'Winroom',
	longName: 'Winroom',
  bgColor: '#1d0a57', //'#B8860B',
  tileColor: '#310f99', //'#CC9900',
  difficulty: "Hardcore",
    addedObstacles: [],
}
let { texts, obstacles, safes, spawns, playerSpawn, arena } = winroom;
obstacles.push(new Winpad(475, 0, 50, 50));
/*
obstacles.push(new Winpad(0, 0, 50, 950));
obstacles.push(new Winpad(950, 0, 50, 950));
obstacles.push(new Winpad(0, 0, 950, 50));
obstacles.push(new Winpad(0, 950, 1000, 50));
*/

module.exports = winroom;