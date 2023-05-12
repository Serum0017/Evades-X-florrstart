const { TransObstacle, NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,BreakableObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, RotatingTp, PlatformerGrav, MovingSafe, RotatingSafe}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');
const Npc = require('../npc.js');

const map = {
  arena: { width: 1500, height: 2500 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
	playerSpawn: { x: 50, y: 100 },
	name: 'MoBD',
	longName: 'Moon of Bouncy Delights',
   tileColor: '#3f2a91',
  bgColor: '#371173',
  difficulty: "Moderate",
    addedObstacles: [],
    npcs: [],
}

let { texts, obstacles, safes, spawns, playerSpawn, arena, npcs } = map;
npcs.push(new Npc(75, 75, 25, ['(this map is garbage; dont play)'],'gfx/hats/vibe-check.png'));
obstacles.push(new NormalObstacle(0, 150, 1200, 50));
// ok
// shouldve said something in chat lmao
// showing grandparents gamewho are u
obstacles.push(new GravObstacle(0, 50, 1200, 100, 'right', 8000))
obstacles.push(new NormalObstacle(0, 0, 1075, 50))
obstacles.push(new WB(1075, 0, 75, 50, 200, 100))
obstacles.push(new NormalObstacle(1150, 0, 50, 50))
obstacles.push(new Lava(1200, 0, 50, 150))
obstacles.push(new NormalObstacle(950, 200, 50, 150))
obstacles.push(new NormalObstacle(1000, 300, 500, 50))
obstacles.push(new NormalObstacle(1200, 150, 200, 50))
obstacles.push(new GravObstacle(1000, 200, 400, 100, 'down', 2500))
obstacles.push(new Lava(1000, 280, 400, 20))
obstacles.push(new GravObstacle(1400, 0, 100, 300, 'up', 4000))
obstacles.push(new GravObstacle(1250, 0, 150, 150, 'left', 4000))
// obstacles.push(new BreakableObstacle(1000, 50, 50, 100, 3, 0.2, 1))
// obstacles.push(new GravObstacle(1400, 0, 100, 300, 'up', 4000))
obstacles.push(new Tp(1250, 0, 15, 150, 50, 250))
obstacles.push(new Winpad(600, 400, 100, 100))
// obstacles.push(new GravObstacle(1000, 200, 400, 100, 'right', 5000))

module.exports = map;