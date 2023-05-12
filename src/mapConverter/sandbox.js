const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, BoostPad, Tornado, SnapGrid, VinetteIncrease }= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const sandbox = {
  arena: { width: 2000, height: 3000 },
  enemy: [],
  safes: [],
  texts: [],
  obstacles: [],
  spawns: [],
  playerSpawn: { x: 50, y: 50 },
  name: 'SB',
  longName: 'Sandbox',
  bgColor: '#1f2229',
  tileColor: '#323645',
  difficulty: 'Peaceful',
    addedObstacles: [],
}

let { texts, obstacles, safes, spawns, playerSpawn, arena} = sandbox;

safes.push(new Safe(0, 0, 250, 3000));
safes.push(new Safe(1750, 0, 250, 3000));

/*texts.push(new Text(115, -25, 'Enemy Showcase', false));
texts.push(new Text(115, -75, 'Properties in [] are replacable and () are for clarification', false));
texts.push(new Text(300, 125, 'Normal Enemy: ([x], [y], [w], [h], {[type (normal)], [amount], [radius], [speed]})', true));
texts.push(new Text(300, 150, 'Example of Normal Enemy: spawns.push(new Spawner(250, 0, 750, 300, { type: normal, amount: 10, radius: 35, speed: 120 })', true));
texts.push(new Text(1800, 125, 'Square Enemy: ([x], [y], [w], [h], {[type (square)], [amount], [size], [speed]})', true));
texts.push(new Text(300, 475, 'Tp Enemy: ([x], [y], [w], [h], {[type (tp)], [amount], [radius], [speed], [time (to create clone in seconds)]})', true))
texts.push(new Text(1815, 475, 'Switch Enemy: ([x], [y], [w], [h], {[type (switch)], [amount], [radius], [speed], [time (to switch in seconds)]})', true))
texts.push(new Text(150, 775, 'Dasher Enemy: ([x], [y], [w], [h], {[type (dasher)], [amount], [radius], [speed]})', true))
texts.push(new Text(1700, 775, 'Gravity Aura Enemy: ([x], [y], [w], [h], {[type (gaura)], [amount], [radius], [speed], [auraStrength (can be - or +)]})', true))
texts.push(new Text(300, 1075, 'Turning Enemy: ([x], [y], [w], [h], {[type (turning)], [amount], [radius], [speed], [turnDir (turn speed)]})', true))
texts.push(new Text(1700, 1075, 'Enemygrav Enemy: ([x], [y], [w], [h], {[type (enemygrav)], [amount], [radius], [speed], [auraStrength (pull strength)]})', true))*/


obstacles.push(new NormalObstacle(100,300,1800,50))
obstacles.push(new NormalObstacle(100,600,1800,50))
obstacles.push(new NormalObstacle(100,900,1800,50))
obstacles.push(new NormalObstacle(100,1200,1800,50))
obstacles.push(new NormalObstacle(100,1500,1800,50))
obstacles.push(new NormalObstacle(100,1800,1800,50))
obstacles.push(new NormalObstacle(100,2100,1800,50))
obstacles.push(new NormalObstacle(100,2400,1800,50))
obstacles.push(new NormalObstacle(100,2700,1800,50))
/*obstacles.push(new StoryDisplay(250,0,100,100))
obstacles.push(new StoryDisplay(1650,0,100,100))
obstacles.push(new StoryDisplay(250,350,100,100))
obstacles.push(new StoryDisplay(1650,350,100,100))
obstacles.push(new StoryDisplay(250,650,100,100))
obstacles.push(new StoryDisplay(1650,650,100,100))
obstacles.push(new StoryDisplay(250,950,100,100))
obstacles.push(new StoryDisplay(1650,950,100,100))
obstacles.push(new StoryDisplay(250,1250,100,100))
obstacles.push(new StoryDisplay(1650,1250,100,100))*/

spawns.push(new Spawner(250, 0, 750, 300, { type: 'normal', amount: 10, radius: 35, speed: 120 }))
spawns.push(new Spawner(1000, 0, 750, 300, { type: 'square', amount: 10, size: 35, speed: 120 }))
spawns.push(new Spawner(250, 350, 750, 250, { type: 'tp', amount: 6, time: 0.8, radius: 20, speed: 100 }))
spawns.push(new Spawner(1000, 350, 750, 250, { type: 'switch', amount: 4, radius: 30, speed: 100, time: 1 }))
spawns.push(new Spawner(250, 650, 750, 250, { type: 'dasher', amount: 10, radius: 20, speed: 125 }))
spawns.push(new Spawner(1000, 650, 750, 250, { type: 'gaura', amount: 3, radius: 80, speed: 100, auraStrength: -2, }))
spawns.push(new Spawner(1000, 650, 750, 250, { type: 'gaura', amount: 3, radius: 80, speed: 100, auraStrength: 2, }))
spawns.push(new Spawner(250, 950, 750, 250, { type: 'turning', amount: 10, radius: 20, speed: 125, changeDir: 5 }))
/*spawns.push(new Spawner(1000, 950, 750, 250, { type: 'enemygrav', amount: 1, radius: 25, speed: 100, auraStrength: 5, }))*/
spawns.push(new Spawner(1000, 950, 750, 250, { type: 'normal', amount: 10, radius: 35, speed: 120 }))

obstacles.push(new GrowingObstacle(500, 1325, 50, 100, 30));
obstacles.push(new GrowingLavaObstacle(700, 1325, 50, 100, 30));
obstacles.push(new GrowingCircleObstacle(925, 1350, 25, 50, 30));
obstacles.push(new GrowingCircleLavaObstacle(1125, 1350, 25, 50, 30));
obstacles.push(new SizePlayer(1350, 1250, 150, 250, 100));
obstacles.push(new SizePlayer(1550, 1250, 150, 250, 10));
obstacles.push(new BoostPad(300, 1250, 100, 250, 200));
obstacles.push(new Tornado(300, 1550, 150, 250, 5));
obstacles.push(new SnapGrid(500, 1550, 150, 250, true, true, 50, 0.5));
obstacles.push(new Tornado(700, 1550, 150, 250, 5));
obstacles.push(new SnapGrid(700, 1550, 150, 250, true, true, 50, 0.5));
obstacles.push(new SnapGrid(900, 1550, 150, 250, true, false, 25, 3));
obstacles.push(new VinetteIncrease(1100, 1550, 150, 250, 0.1, 0.1, 5));

spawns.push(new Spawner(250, 1850, 750, 250, { type: 'flashlight', amount: 6, radius: 35, speed: 100, flashlightSize: 90, flashlightAngle: 75 }));

spawns.push(new Spawner(250, 2150, 750, 250, { x: 350, y: 2275, type: 'turret', amount: 1, radius: 35, speed: 0, shootSpeed: 0.1, pRadius: 12, pSpeed: 120, shootDirections: [Math.PI*10/20,Math.PI*9/20,Math.PI*8/20,Math.PI*7/20,Math.PI*6/20,Math.PI*5/20,Math.PI*4/20,Math.PI*3/20,Math.PI*2/20,Math.PI*1/20,0,-Math.PI*1/20,-Math.PI*2/20,-Math.PI*3/20,-Math.PI*4/20,-Math.PI*5/20,-Math.PI*6/20,-Math.PI*7/20,-Math.PI*8/20,-Math.PI*9/20,-Math.PI*10/20,]}));

obstacles.push(new Winpad(1950, 2950, 50, 50));

module.exports = sandbox;