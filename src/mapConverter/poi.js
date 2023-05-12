const {NormalObstacle,BouncyObstacle,Block,CircularNormalObstacle,CircularBouncyObstacle,CircularLavaObstacle,CircularSafeObstacle,Lava,RotatingLava,SpeedObstacle,GravObstacle,Checkpoint,Tp,Air,MovingObstacle,StoryDisplay,MovingLavaObstacle,Portal,Winpad,Zone,WB,RotatingTp,MovingTpObstacle,RotatingNormal,Booster,WallBooster,SpeedTrap,GrowingObstacle,GrowingLavaObstacle,GrowingCircleObstacle,GrowingCircleLavaObstacle,CircularTpObstacle,SizePlayer,Slip,BoostPad,Pushbox,Tornado,SnapGrid,VinetteIncrease,ColorChange,Pusher,Coin,CircularCoin,PlatformerGrav,TransObstacle,MovingSafe,RotatingSafe,BreakableObstacle,SwitchLava,SwitchObstacle,TimeTrap,InvincibilityPowerup,Filter,Particles,MovingSpeedTrap,RotatingSpeedTrap,DeadMove,Revive,DrawObstacle,Clone,Polygon,Ship,CoinDoor,MusicChange,Redirect,CookieCheck,Typing,Mashing,RevivePowerup,Raycasting,Spring,CircularSnap,IDIT,CameraChange,Gun,Golf,Zoom,Deathmark,RestrictAxis,Custom,FallingArrow,CircularHollowObstacle,Deathcure,SwitchGrav,Button,Door,CircularDoor,ReusableButton,ZombieMaker,TimeButton,TimeTrapButton,LavaDoor,Invert,DragonPowerup,PlayerCollide,CrowdButton,Hole,AmogusPowerup,GunslingerPowerup,Demo,EnemyButton,CircularSliceObstacle,CircularHollowSlice,Camera,RoundedCorners,RoundedLava,GrapplePowerup,CircularHollowLava,CircularLavaSlice,CircularHollowLavaSlice,GrapplePoint,ResetCoins,Bezier,BoxButton,RotatingPause,RotatingLavaPause,MovingPause,MovingLavaPause,FrictionChanger,MovingGrapplePoint,Sentry,Oval,LavaOval,EnemyEffector,Mirror,Rail,TpTrap,DeadPusher}= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');

const map = {
  arena: { width: 19400, height: 550 },
	enemy: [],
	safes: [],
	texts: [],
	obstacles: [],
	spawns: [],
	playerSpawn: { x: 0, y: 0 },
	name: 'PoI',
	longName: 'Planet of Inspiration',
    bgColor: '#0d0d0d',
    tileColor: '#383838',
    difficulty: "Peaceful",
    addedObstacles: [],
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = map;

// // getting any parameter names of a function
// var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
// var ARGUMENT_NAMES = /([^\s,]+)/g;
// function getParamNames(func) {
//   var fnStr = func.toString().replace(STRIP_COMMENTS, '');
//   var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
//   if(result === null)
//      result = [];
//   return result;
// }

const obs = [
	'NormalObstacle',
	'BouncyObstacle',
	'Block',
	'CircularNormalObstacle',
	'CircularBouncyObstacle',
	'CircularLavaObstacle',
	'CircularSafeObstacle',
	'Lava',
	'RotatingLava',
	'SpeedObstacle',
	'GravObstacle',
	'Checkpoint',
	'Tp',
	'Air',
	'MovingObstacle',
	'StoryDisplay',
	'MovingLavaObstacle',
	'Portal',
	'Winpad',
	'Zone',
	'WB',
	'RotatingTp',
	'MovingTpObstacle',
	'RotatingNormal',
	'Booster',
	'WallBooster',
	'SpeedTrap',
	'GrowingObstacle',
	'GrowingLavaObstacle',
	"GrowingCircleObstacle",
	'GrowingCircleLavaObstacle',
	'CircularTpObstacle',
	'SizePlayer',
	'Slip',
	'BoostPad',
	'Pushbox',
	'Tornado',
	'SnapGrid',
	'VinetteIncrease',
	'ColorChange',
	'Pusher',
    'Coin',
    'CircularCoin',
    'PlatformerGrav',
	'TransObstacle',
    'MovingSafe',
    'RotatingSafe',
    'BreakableObstacle',
    'SwitchLava',
    'SwitchObstacle',
    'TimeTrap',
    'InvincibilityPowerup',
    'Filter',
    'Particles',
    'MovingSpeedTrap',
    'RotatingSpeedTrap',
    'DeadMove',
    'Revive',
    'DrawObstacle',
    'Clone',
	'Polygon',
    'Ship',
    'CoinDoor',
    'MusicChange',
    'Redirect',
    'CookieCheck',
    'Typing',
    'Mashing',
    'RevivePowerup',
    'Raycasting',
    'Spring',
    'CircularSnap',
    'IDIT',
    'CameraChange',
    'Gun',
    'Golf',
    'Zoom',
	'Deathmark',
    'RestrictAxis',
    'Custom',
    'FallingArrow',
    'CircularHollowObstacle', 
	'Deathcure',
    'SwitchGrav',
    'Button',
    'Door',
    'CircularDoor',
    'ReusableButton',
    'ZombieMaker',
    'TimeButton',
    'TimeTrapButton',
    'LavaDoor',
    'Invert',
    'DragonPowerup',
    'PlayerCollide',
    'CrowdButton',
    'Hole',
    'AmogusPowerup',
    'GunslingerPowerup',
    'Demo',
    'EnemyButton',
    'CircularSliceObstacle',
    'CircularHollowSlice',
	'Camera',
    'RoundedCorners',
    'RoundedLava',
    'GrapplePowerup',
    'CircularHollowLava',
    'CircularLavaSlice',
    'CircularHollowLavaSlice',
    'GrapplePoint',
    'ResetCoins',
    'Bezier',
    'BoxButton',
    'RotatingPause',
    'RotatingLavaPause',
    'MovingPause',
    'MovingLavaPause',
    'FrictionChanger',
    'MovingGrapplePoint',
	'Sentry',
    'Oval',
    'LavaOval',
    'EnemyEffector',
    'Mirror',
    'Rail',
    'TpTrap',
    'DeadPusher',
];
// let i = 0;
// for(let o of obs){
//     i++;
//     const _class = eval(`${o}`);
//     console.log(`obstacles.push(new ${o}(${
//         JSON.stringify(getParamNames(_class))
//         .replaceAll('"','')
//         .replaceAll('[','')
//         .replaceAll(']','')
//         .replaceAll(',=,',',')
//         .replaceAll('x',`${50+i*150}`)
//         .replaceAll('y',`50`)
//         .replaceAll('w',`100`)
//         .replaceAll('h',`100`)
//     }))`);
// }
// i = 0;
// texts
// for(let o of obs){
//     i++;
//     console.log(`texts.push(new Text(${100+i*150},150,'${o}',false,16))`);
// }

obstacles.push(new NormalObstacle(200,50,100,100,true,0))
obstacles.push(new BouncyObstacle(350,50,100,100,30))
obstacles.push(new Block(500,50,100,100,'#000000'))
obstacles.push(new CircularNormalObstacle(700,100,50))
obstacles.push(new CircularBouncyObstacle(850,100,50,30))
obstacles.push(new CircularLavaObstacle(1000,100,50))
obstacles.push(new CircularSafeObstacle(1150,100,50))
obstacles.push(new Lava(1250,50,100,100,true,0))
obstacles.push(new RotatingLava(1450,100,100,100,20,0,1450,100,0,true))
obstacles.push(new SpeedObstacle(1550,50,100,100,1.5))
obstacles.push(new GravObstacle(1700,50,100,100,'down',500))
obstacles.push(new Checkpoint(1850,50,100,100))
obstacles.push(new Tp(2000,50,100,100,2000,175))
obstacles.push(new Air(2150,50,100,100))
//w, h, points = [[50, 50]], speed = 30, currentPoint=0, collidable=tru
obstacles.push(new MovingObstacle(50,50,[[2325,50],[2325,100]],30,0));
obstacles.push(new StoryDisplay(2450,50,100,100,true))
obstacles.push(new MovingLavaObstacle(50,50,[[2625,50],[2625,100]],30,1,true));
obstacles.push(new Portal(2750,50,100,'xd','Planet Name','Peaceful',0.5,undefined))
obstacles.push(new Winpad(2900,50,100,100))
obstacles.push(new Zone(3050,50,100,100,'2'))
obstacles.push(new WB(3200,50,100,100,40,80))
obstacles.push(new RotatingTp(3400,100,75,75,-20,0,0,0,3400,100,0,true))
obstacles.push(new MovingTpObstacle(50,50,[[3525,50],[3525,100]],30,0,0,0))
obstacles.push(new RotatingNormal(3700,100,100,100,50,0,3700,100,0,true))
obstacles.push(new Booster(3800,50,100,100))
obstacles.push(new WallBooster(3950,50,100,100))
//obstacles.push(new SpeedTrap(4100,50,100,100,2,4));
obstacles.push(new GrowingObstacle(4287.5,87.5,25,100,25,true))
obstacles.push(new GrowingLavaObstacle(4437.5,87.5,25,100,25,true))
obstacles.push(new GrowingCircleObstacle(4600,100,1,50,30,true))
obstacles.push(new GrowingCircleLavaObstacle(4750,100,1,50,30,true))
obstacles.push(new CircularTpObstacle(4900,100,50,4850,175))
obstacles.push(new SizePlayer(5000,50,100,100,35))
obstacles.push(new Slip(5150,50,100,100,20))
obstacles.push(new BoostPad(5300,50,100,100,20))
obstacles.push(new Pushbox(5450,50,100,100,20))
obstacles.push(new Tornado(5600,50,100,100,3))
obstacles.push(new SnapGrid(5750, 50, 100, 100, true, true, 50, 0.5));
obstacles.push(new VinetteIncrease(5900,50,100,100,0.1,0.1,2));
obstacles.push(new ColorChange(6050,50,100,100,'black','grey'))
obstacles.push(new Pusher(6200,50,100,100,'left',100,20))
obstacles.push(new Coin(6350,50,100,100))
obstacles.push(new CircularCoin(6550,100,50))
obstacles.push(new PlatformerGrav(6650,50,100,100,'down',200,500,30))
obstacles.push(new TransObstacle(6800,50,100,100,true,0.25));
obstacles.push(new MovingSafe(50,50,[[6975,50],[6975,100]],30,0));//wtf
obstacles.push(new RotatingSafe(7150,100,100,100,20,0,7150,100,0,true))
obstacles.push(new BreakableObstacle(7250,50,100,100,100,0.016,10))
obstacles.push(new SwitchLava(7400,50,100,100,2,2,false,0,true))
obstacles.push(new SwitchObstacle(7550,50,100,100,2,2,false,1))
obstacles.push(new TimeTrap(7700,50,100,100,4))
obstacles.push(new InvincibilityPowerup(7850,50,100,100,2))
obstacles.push(new Filter(8000,50,100,100,'blur(10px)'))
//x, y, w, h, spawnRate, particleSpeed, particleSize, particleColor, particleLifespan, toDecay, offsetX,offsetY
obstacles.push(new Particles(8150,50,100,100,0.012,2,3,'white',0.4,true,0,0));
// log currentpoint?
obstacles.push(new MovingSpeedTrap(50,50,[[8325,50],[8325,100]],30,0,2,4,8350,150))
//x, y, w, h, spd, angle, pivotX, pivotY, minSpeed, maxSpeed, tpx, tpy
obstacles.push(new RotatingSpeedTrap(8450,50,100,100,1000, 0, 0, 0, 2, 4, 8350, 150));
obstacles.push(new DeadMove(8600,50,100,100,5))
obstacles.push(new Revive(8750,50,100,100))
obstacles.push(new DrawObstacle(8900,50,100,100,0,-300,50,{type:"lava",w:50,h:50}));
obstacles.push(new Clone(9050,50,100,100,150,250))
obstacles.push(new Polygon([[9250,50],[9300,150],[9200,150]],'poly'));
obstacles.push(new Ship(9350,50,100,100,true))
obstacles.push(new CoinDoor(9500,50,100,100,1))
obstacles.push(new MusicChange(9650,50,100,100,'/sounds/misplaced my keys.mp3'))
obstacles.push(new Redirect(9800,50,100,100,'https://tenor.com/view/fight-bear-funny-mma-gif-5030266','inspired=true'))
obstacles.push(new CookieCheck(9950,50,100,100,'inspired','true'))
obstacles.push(new Typing(10100,50,100,100,'be inspired!'))
obstacles.push(new Mashing(10250,50,100,100,100))
obstacles.push(new RevivePowerup(10400,50,100,100,2))
obstacles.push(new Raycasting(10550,50,100,100))
obstacles.push(new Spring(10700,50,100,100,[{x: 10700, y: 50, strength: 100}],0.02))
obstacles.push(new CircularSnap(10900,100,50))
obstacles.push(new IDIT(11000,50,100,100,20,10))
obstacles.push(new CameraChange(11150,50,100,100,0,0))
obstacles.push(new Gun(11300,50,100,100,true,'normal',0.2,300,26,10))
obstacles.push(new Golf(11450,50,100,100,10,0.98))
obstacles.push(new Zoom(11600,50,100,100,0.1));
obstacles.push(new Deathmark(11750,50,100,100,5))
obstacles.push(new RestrictAxis(11900,50,100,100,true,false))
//obstacles.push(new Custom(12050,50,100,100,params,simulate,collidable,onCollision,render))
obstacles.push(new Custom(12050,50,100,100,//dimensions
    [{name: 'tpdist',value:20},{name: 'randomobs', value: obs[Math.floor(Math.random()*obs.length)]}],//properties
    ``,//simulate function
    false,//collidable
    'this.y -= this.tpdist',//onCollision function
    `ctx.fillRect(pos.x,pos.y,this.w,this.h);ctx.fillStyle = 'white';ctx.font = "20px Inter";ctx.fillText('Random Obstacle Name: ' + this.randomobs,pos.x+this.w/2,pos.y+this.h/2)`// render function
));
obstacles.push(new FallingArrow(12200,50,100,100,[['left',2,120],['up',3,100]]))
obstacles.push(new CircularHollowObstacle(12400,100,50,20))
obstacles.push(new Deathcure(12500,50,100,100))
obstacles.push(new SwitchGrav(12650,50,100,100,[{direction:'up',force:500,time:1},{direction:'down',force:1000,time:2}]))
obstacles.push(new Button(12800,50,100,100,6))
obstacles.push(new Door(12950,50,100,100,6,true))
obstacles.push(new CircularDoor(13150,100,50,5,false))
obstacles.push(new ReusableButton(13250,50,100,100,5))
obstacles.push(new ZombieMaker(13400,50,100,100,4,30))
//obstacles.push(new TimeButton(time,id))
obstacles.push(new TimeTrapButton(13700,50,100,100,3,4))
obstacles.push(new LavaDoor(13850,50,100,100,3,false))
obstacles.push(new Invert(14000,50,100,100,true,true))
obstacles.push(new DragonPowerup(14150,50,100,100,true))
obstacles.push(new PlayerCollide(14300,50,100,100,30))
obstacles.push(new CrowdButton(14450,50,100,100,3,2,10))
obstacles.push(new Hole(14600,50,100,100))
obstacles.push(new AmogusPowerup(14750,50,100,100,true))
obstacles.push(new GunslingerPowerup(14900,50,100,100,true))
obstacles.push(new Demo('[{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":117},{"x":15082,"y":116},{"x":15082,"y":114},{"x":15082,"y":112},{"x":15082,"y":109},{"x":15082,"y":106},{"x":15082,"y":103},{"x":15082,"y":100},{"x":15082,"y":97},{"x":15082,"y":94},{"x":15082,"y":91},{"x":15082,"y":88},{"x":15082,"y":85},{"x":15082,"y":82},{"x":15082,"y":79},{"x":15082,"y":76},{"x":15083,"y":73},{"x":15085,"y":70},{"x":15087,"y":68},{"x":15090,"y":67},{"x":15093,"y":66},{"x":15096,"y":65},{"x":15099,"y":65},{"x":15102,"y":65},{"x":15105,"y":65},{"x":15108,"y":65},{"x":15111,"y":65},{"x":15114,"y":65},{"x":15117,"y":65},{"x":15120,"y":65},{"x":15123,"y":65},{"x":15126,"y":65},{"x":15129,"y":65},{"x":15132,"y":65},{"x":15135,"y":65},{"x":15139,"y":65},{"x":15142,"y":65},{"x":15145,"y":66},{"x":15148,"y":67},{"x":15151,"y":70},{"x":15154,"y":72},{"x":15156,"y":75},{"x":15157,"y":78},{"x":15158,"y":81},{"x":15158,"y":84},{"x":15159,"y":87},{"x":15159,"y":90},{"x":15159,"y":93},{"x":15159,"y":96},{"x":15159,"y":99},{"x":15159,"y":102},{"x":15159,"y":105},{"x":15159,"y":109},{"x":15159,"y":112},{"x":15159,"y":115},{"x":15159,"y":118},{"x":15159,"y":121},{"x":15159,"y":124},{"x":15159,"y":127},{"x":15159,"y":130},{"x":15159,"y":133},{"x":15159,"y":136},{"x":15159,"y":139},{"x":15158,"y":142},{"x":15156,"y":146},{"x":15154,"y":147},{"x":15151,"y":149},{"x":15149,"y":149},{"x":15146,"y":150},{"x":15143,"y":150},{"x":15140,"y":150},{"x":15137,"y":151},{"x":15134,"y":151},{"x":15131,"y":151},{"x":15128,"y":151},{"x":15124,"y":151},{"x":15121,"y":151},{"x":15118,"y":151},{"x":15115,"y":151},{"x":15112,"y":151},{"x":15109,"y":151},{"x":15106,"y":150},{"x":15103,"y":148},{"x":15100,"y":146},{"x":15097,"y":143},{"x":15094,"y":140},{"x":15091,"y":137},{"x":15087,"y":134},{"x":15085,"y":131},{"x":15084,"y":128},{"x":15083,"y":125},{"x":15083,"y":122},{"x":15083,"y":119},{"x":15082,"y":116},{"x":15082,"y":113},{"x":15082,"y":110},{"x":15082,"y":107},{"x":15082,"y":104},{"x":15082,"y":101},{"x":15082,"y":98},{"x":15082,"y":94},{"x":15082,"y":91},{"x":15083,"y":88},{"x":15085,"y":85},{"x":15087,"y":82},{"x":15090,"y":79},{"x":15093,"y":76},{"x":15096,"y":73},{"x":15099,"y":71},{"x":15102,"y":70},{"x":15105,"y":69},{"x":15108,"y":68},{"x":15111,"y":68},{"x":15114,"y":68},{"x":15117,"y":68},{"x":15120,"y":68},{"x":15123,"y":68},{"x":15126,"y":68},{"x":15129,"y":68},{"x":15132,"y":68},{"x":15135,"y":68},{"x":15139,"y":68},{"x":15142,"y":68},{"x":15145,"y":68},{"x":15148,"y":68},{"x":15151,"y":69},{"x":15154,"y":71},{"x":15157,"y":73},{"x":15160,"y":75},{"x":15162,"y":78},{"x":15163,"y":81},{"x":15164,"y":84},{"x":15163,"y":87},{"x":15162,"y":90},{"x":15160,"y":93},{"x":15157,"y":96},{"x":15155,"y":99},{"x":15152,"y":102},{"x":15149,"y":105},{"x":15146,"y":109},{"x":15143,"y":112},{"x":15140,"y":115},{"x":15137,"y":118},{"x":15134,"y":121},{"x":15131,"y":124},{"x":15128,"y":127},{"x":15124,"y":130},{"x":15121,"y":133},{"x":15118,"y":136},{"x":15115,"y":139},{"x":15112,"y":142},{"x":15109,"y":146},{"x":15106,"y":149},{"x":15103,"y":152},{"x":15100,"y":154},{"x":15097,"y":155},{"x":15095,"y":156},{"x":15094,"y":156},{"x":15093,"y":156},{"x":15092,"y":157},{"x":15092,"y":157},{"x":15092,"y":157},{"x":15092,"y":157},{"x":15092,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157},{"x":15091,"y":157}]'))
obstacles.push(new EnemyButton(15200,50,100,100,1))
obstacles.push(new CircularSliceObstacle(15400,100,50,0,65))
obstacles.push(new CircularHollowSlice(15550,100,50,0,65,40,20))
obstacles.push(new Camera(15700,100,50,15650,15650,100,100))
obstacles.push(new RoundedCorners(15800,50,100,100,50))
obstacles.push(new RoundedLava(15950,50,100,100,50))
obstacles.push(new GrapplePowerup(16100,50,100,100,true))
obstacles.push(new CircularHollowLava(16300,100,50,10))
obstacles.push(new CircularLavaSlice(16450,100,50,0,180))
obstacles.push(new CircularHollowLavaSlice(16600,100,50,0,90,30,10))
obstacles.push(new GrapplePoint(16750,100))
obstacles.push(new ResetCoins(16850,50,100,100))
//obstacles.push(new Bezier(curves))
obstacles.push(new Bezier([
    [
        [17000, 50],
    	[17100, 75],
        [17100, 125],
        [17000, 150],
    ],
]));
obstacles.push(new BoxButton(17150,50,100,100,2))
obstacles.push(new RotatingPause(17300,50,50,100,0,[{angle: 0, speed: 100, pause: 2},{angle: 90, speed: 100, pause: 1},{angle: 180, speed: 200, pause: 1},{angle: 90, speed: 100, pause: 1}],undefined,undefined,0,true));
obstacles.push(new RotatingLavaPause(17450,50,50,100,0,[{angle: 0, speed: 100, pause: 2},{angle: 90, speed: 100, pause: 1},{angle: 180, speed: 200, pause: 1},{angle: 90, speed: 100, pause: 1}],undefined,undefined,0,true));// wtf
//w, h, points = [[50, 50, 30, 1]], currentPoint=0
obstacles.push(new MovingPause(50, 50,[[17600, 50, 30, 3],[17650, 50, 50, 0],[17625, 100, 20, 2]], 0));
obstacles.push(new MovingLavaPause(50, 50,[[17750, 50, 30, 3],[17800, 50, 50, 0],[17775, 100, 20, 2]], 0));
obstacles.push(new FrictionChanger(17900,50,100,100,0.9,0.1))
obstacles.push(new MovingGrapplePoint([[18050,100],[18150,100]],30,0))
obstacles.push(new Sentry(18250,100,30,100,30,60,0))
obstacles.push(new Oval(18375,50,50,100))
obstacles.push(new LavaOval(18500,75,100,50,true))
obstacles.push(new EnemyEffector(18650,50,100,100,2,'speed'))
obstacles.push(new Mirror(18800,50,100,100,150,0))
//obstacles.push(new Rail(points,))
obstacles.push(new TpTrap(19100,50,100,100,5,19100,300));
obstacles.push(new DeadPusher(50,50,[[19275,50],[19275,100]],30,0))// ik why it happened and it was bad parsing ;-;
texts.push(new Text(250,175,'NormalObstacle',false,16))
texts.push(new Text(400,175,'BouncyObstacle',false,16))
texts.push(new Text(550,175,'Block',false,16))
texts.push(new Text(700,150,'CircularNormalObstacle',false,16))
texts.push(new Text(850,175,'CircularBouncyObstacle',false,16))
texts.push(new Text(1000,150,'CircularLavaObstacle',false,16))
texts.push(new Text(1150,175,'CircularSafeObstacle',false,16))
texts.push(new Text(1300,175,'Lava',false,16))
texts.push(new Text(1450,175,'RotatingLava',false,16))
texts.push(new Text(1600,175,'SpeedObstacle',false,16))
texts.push(new Text(1750,175,'GravObstacle',false,16))
texts.push(new Text(1900,175,'Checkpoint',false,16))
texts.push(new Text(2050,175,'Tp',false,16))
texts.push(new Text(2200,175,'Air',false,16))
texts.push(new Text(2350,175,'MovingObstacle',false,16))
texts.push(new Text(2500,175,'StoryDisplay',true,16))
texts.push(new Text(2650,175,'MovingLavaObstacle',false,16))
texts.push(new Text(2800,175,'Portal',false,16))
texts.push(new Text(2950,175,'Winpad',false,16))
texts.push(new Text(3100,175,'Zone',false,16))
texts.push(new Text(3250,175,'WB',false,16))
texts.push(new Text(3400,175,'RotatingTp',false,16))
texts.push(new Text(3550,175,'MovingTpObstacle',false,16))
texts.push(new Text(3700,175,'RotatingNormal',false,16))
texts.push(new Text(3850,175,'Booster',false,16))
texts.push(new Text(4000,175,'WallBooster',false,16))
//texts.push(new Text(4150,175,'SpeedTrap',false,16))
texts.push(new Text(4300,175,'GrowingObstacle',false,16))
texts.push(new Text(4450,150,'GrowingLavaObstacle',false,16))
texts.push(new Text(4600,175,'GrowingCircleObstacle',false,16))
texts.push(new Text(4750,150,'GrowingCircleLavaObstacle',false,16))
texts.push(new Text(4900,175,'CircularTpObstacle',false,16))
texts.push(new Text(5050,175,'SizePlayer',false,16))
texts.push(new Text(5200,175,'Slip',false,16))
texts.push(new Text(5350,175,'BoostPad',false,16))
texts.push(new Text(5500,175,'Pushbox',false,16))
texts.push(new Text(5650,175,'Tornado',false,16))
texts.push(new Text(5800,175,'SnapGrid',false,16))
texts.push(new Text(5950,175,'VinetteIncrease',false,16))
texts.push(new Text(6100,175,'ColorChange',false,16))
texts.push(new Text(6250,175,'Pusher',false,16))
texts.push(new Text(6400,175,'Coin',false,16))
texts.push(new Text(6550,175,'CircularCoin',false,16))
texts.push(new Text(6700,175,'PlatformerGrav',false,16))
texts.push(new Text(6850,175,'TransObstacle',false,16))
texts.push(new Text(7000,175,'MovingSafe',false,16))
texts.push(new Text(7150,175,'RotatingSafe',false,16))
texts.push(new Text(7300,175,'BreakableObstacle',false,16))
texts.push(new Text(7450,175,'SwitchLava',false,16))
texts.push(new Text(7600,175,'SwitchObstacle',false,16))
texts.push(new Text(7750,175,'TimeTrap',false,16))
texts.push(new Text(7900,175,'InvincibilityPowerup',false,16))
//texts.push(new Text(8050,175,'Filter',false,16))
texts.push(new Text(8200,175,'Particles',false,16))
texts.push(new Text(8350,175,'MovingSpeedTrap',false,16))
texts.push(new Text(8500,175,'RotatingSpeedTrap',false,16))
texts.push(new Text(8650,175,'DeadMove',false,16))
texts.push(new Text(8800,175,'Revive',false,16))
texts.push(new Text(8950,175,'DrawObstacle',false,16))
texts.push(new Text(9100,175,'Clone',false,16))
texts.push(new Text(9250,175,'Polygon',false,16))
texts.push(new Text(9400,175,'Ship',false,16))
texts.push(new Text(9550,175,'CoinDoor',false,16))
texts.push(new Text(9700,175,'MusicChange',false,16))
texts.push(new Text(9850,175,'Redirect',false,16))
texts.push(new Text(10000,175,'CookieCheck',false,16))
texts.push(new Text(10150,175,'Typing',false,16))
texts.push(new Text(10300,175,'Mashing',false,16))
texts.push(new Text(10450,175,'RevivePowerup',false,16))
texts.push(new Text(10600,175,'Raycasting',false,16))
texts.push(new Text(10750,175,'Spring',false,16))
texts.push(new Text(10900,175,'CircularSnap',false,16))
texts.push(new Text(11050,175,'IDIT',false,16))
texts.push(new Text(11200,175,'CameraChange',false,16))
texts.push(new Text(11350,175,'Gun',false,16))
texts.push(new Text(11500,175,'Golf',false,16))
texts.push(new Text(11650,175,'Zoom',false,16))
texts.push(new Text(11800,175,'Deathmark',false,16))
texts.push(new Text(11950,175,'RestrictAxis',false,16))
texts.push(new Text(12100,175,'Custom',false,16))
texts.push(new Text(12250,175,'FallingArrow',false,16))
texts.push(new Text(12400,175,'CircularHollowObstacle',false,16))
texts.push(new Text(12550,175,'Deathcure',false,16))
texts.push(new Text(12700,175,'SwitchGrav',false,16))
texts.push(new Text(12850,175,'Button',false,16))
texts.push(new Text(13000,175,'Door',false,16))
texts.push(new Text(13150,175,'CircularDoor',false,16))
texts.push(new Text(13300,175,'ReusableButton',false,16))
texts.push(new Text(13450,175,'ZombieMaker',false,16))
//texts.push(new Text(13600,175,'TimeButton',false,16))
texts.push(new Text(13750,175,'TimeTrapButton',false,16))
texts.push(new Text(13900,175,'LavaDoor',false,16))
texts.push(new Text(14050,175,'Invert',false,16))
texts.push(new Text(14200,175,'DragonPowerup',false,16))
texts.push(new Text(14350,175,'PlayerCollide',false,16))
texts.push(new Text(14500,175,'CrowdButton',false,16))
texts.push(new Text(14650,175,'Hole',false,16))
texts.push(new Text(14800,175,'AmogusPowerup',false,16))
texts.push(new Text(14950,175,'GunslingerPowerup',false,16))
texts.push(new Text(15100,175,'Demo',false,16))
texts.push(new Text(15250,175,'EnemyButton',false,16))
texts.push(new Text(15400,150,'CircularSliceObstacle',false,16))
texts.push(new Text(15550,175,'CircularHollowSlice',false,16))
texts.push(new Text(15700,175,'Camera',false,16))
texts.push(new Text(15850,175,'RoundedCorners',false,16))
texts.push(new Text(16000,175,'RoundedLava',false,16))
texts.push(new Text(16150,175,'GrapplePowerup',false,16))
texts.push(new Text(16300,175,'CircularHollowLava',false,16))
texts.push(new Text(16450,175,'CircularLavaSlice',false,16))
texts.push(new Text(16600,150,'CircularHollowLavaSlice',false,16))
texts.push(new Text(16750,175,'GrapplePoint',false,16))
texts.push(new Text(16900,175,'ResetCoins',false,16))
texts.push(new Text(17050,175,'Bezier',false,16))
texts.push(new Text(17200,175,'BoxButton',false,16))
texts.push(new Text(17350,175,'RotatingPause',false,16))
texts.push(new Text(17500,175,'RotatingLavaPause',false,16))
texts.push(new Text(17650,175,'MovingPause',false,16))
texts.push(new Text(17800,175,'MovingLavaPause',false,16))
texts.push(new Text(17950,175,'FrictionChanger',false,16))
texts.push(new Text(18100,175,'MovingGrapplePoint',false,16))
texts.push(new Text(18250,175,'Sentry',false,16))
texts.push(new Text(18400,175,'Oval',false,16))
texts.push(new Text(18550,175,'LavaOval',false,16))
texts.push(new Text(18700,175,'EnemyEffector',false,16))
texts.push(new Text(18850,175,'Mirror',false,16))
//texts.push(new Text(19000,175,'Rail',false,16))
texts.push(new Text(19150,175,'TpTrap',false,16))
texts.push(new Text(19300,175,'DeadPusher',false,16))

// const enes = [ 'Normal', 'Square', 'Switch', 'TP', 'Dasher', 'GravAura', 'Turning', 'EnemyGrav', 'Rain', 'Flashlight', 'Memory', 'Flower', 'Shh', 'Turret', 'Growing', 'Accelerating', 'Wind', 'Polygon', 'Wavy', 'Bomb', 'Jumping', 'Outline', 'Slower', 'SelfCollide', 'Spawn', 'Fire', 'Boomerang', 'Oval', 'GrowingOval', 'E2Dasher', 'RadiusChange', 'TpPlayer', 'ForceMove', 'ForceStop', 'NoKill', 'PointAccel', 'Repel', 'RotateAroundParent', 'MovingEnemy', 'EnemyObstacle', 'Toxic', 'FollowAxis' ];

obstacles.push(new NormalObstacle(50,200,39900,50));
// i have no life so ima just do all these manually
spawns.push(new Spawner(50, 350, 100, 100, { type: 'normal', amount: 2, radius: 10, speed: 100}));
spawns.push(new Spawner(200, 350, 100, 100, { type: 'square', size:20, amount: 2, speed: 120}));
spawns.push(new Spawner(350, 350, 100, 100, { type: 'switch', time: 2, amount: 2, radius: 10, speed: 100}));
spawns.push(new Spawner(500, 350, 100, 100, { type: 'tp', radius:10, amount: 2, speed: 120,time:1}));
spawns.push(new Spawner(650, 350, 100, 100, { type: 'dasher', amount: 2, radius: 10, speed: 100}));
spawns.push(new Spawner(800, 350, 100, 100, { type: 'gaura', radius:10, amount: 2, speed: 120, auraStrength: 10}));
spawns.push(new Spawner(950, 350, 100, 100, { type: 'turning', amount: 2, radius: 10, speed: 100}));
spawns.push(new Spawner(1100, 350, 100, 100, { type: 'enemygrav', amount: 2, radius: 10, speed: 100, auraStrength: 0}));
spawns.push(new Spawner(1100, 350, 100, 100, { type: 'normal', amount: 2, radius: 10, speed: 100, auraStrength: 0}));
spawns.push(new Spawner(1250, 350, 100, 100, { type: 'rain', radius:10, amount: 1, speed: 120, direction: 'horizontal', waitTimer: 1}));
spawns.push(new Spawner(1250, 350, 100, 100, { type: 'rain', radius:10, amount: 1, speed: 120, direction: 'vertical', waitTimer: 1}));
spawns.push(new Spawner(1400, 350, 100, 100, { type: 'flashlight', amount: 2, radius: 10, speed: 100, flashlightSize: 20, flashlightAngle: 60}));
spawns.push(new Spawner(1550, 350, 100, 100, { type: 'memory', amount: 2, radius: 10, speed: 100, timeOn: 1, timeOff: 2, range: 1}));
spawns.push(new Spawner(1700, 350, 100, 100, { type: 'flower', amount: 2, radius: 10, speed: 100, rotateSpeed: 0.6, clonesNumber: 2, clonesRadius: 8, clonesDistance: 16, layers: 2}));
spawns.push(new Spawner(1850, 350, 100, 100, { type: 'shh', amount: 2, radius: 10, speed: 100}));
spawns.push(new Spawner(2000, 350, 100, 100, { type: 'turret', amount: 2, radius: 10, speed: 100, shootSpeed: 3, pRadius: 10, pSpeed: 200, offset: 1.5, shootDirections: [0,90,180,270]}));
spawns.push(new Spawner(2150, 350, 100, 100, { type: 'growing', amount: 1, radius: 10, speed: 100, minRadius: 10, maxRadius: 20, growSpeed: 5, startGrowing: true}));
spawns.push(new Spawner(2150, 350, 100, 100, { type: 'growing', amount: 1, radius: 10, speed: 100, minRadius: 10, maxRadius: 20, growSpeed: 5, startGrowing: true, bounceAmount: 30}));
spawns.push(new Spawner(2300, 350, 100, 100, { type: 'accelerating', radius:10, amount: 2, speed: 120, accelAmount: 0}));
spawns.push(new Spawner(2450, 350, 100, 100, { type: 'wind', amount: 2, radius: 10, speed: 100, strength: 10}));
spawns.push(new Spawner(2600, 350, 100, 100, { type: 'polygon', amount: 2, sides: 5, size: 20, speed: 100 }));
spawns.push(new Spawner(2750, 350, 100, 100, { type: 'wavy', radius:10, amount: 2, speed: 120}));
spawns.push(new Spawner(2900, 350, 100, 100, { type: 'bomb', amount: 2, radius: 10, speed: 100,bombNumber: 10,bombSpeed: 100,bombRadius: 8,bombLife: 2,bombDecay: 0.95}));
spawns.push(new Spawner(3050, 350, 100, 100, { type: 'jump', amount: 2, radius: 10, speed: 100, gravity: 50, groundedTime: 2, jumpHeight: 50 }))
spawns.push(new Spawner(3200, 350, 100, 100, { type: 'outline', radius:10, amount: 2, speed: 120}));
spawns.push(new Spawner(3350, 350, 100, 100, { type: 'slower', amount: 2, radius: 20, speed: 100, speedMult: 0.2}));
spawns.push(new Spawner(3500, 350, 100, 100, { type: 'selfcollide', amount: 20, radius: 10, speed: 100}));
spawns.push(new Spawner(3650, 350, 100, 100, { type: 'spawn', amount: 2, radius: 10, speed: 120, spawnTime: 1,
    spawnParams: {
        type: 'normal',
        radius: 8,
        speed: 100,
        life: 100,
    },
}))
spawns.push(new Spawner(3800, 350, 100, 100, { type: 'fire', amount: 2, radius: 5, speed: 100, maxTime: 3, fireAmount: 3, fireDistance: 0.1, fireLife: 3, pauseTime: 0.5}));
spawns.push(new Spawner(3950, 350, 100, 100, { type: 'boomerang', amount: 2, radius: 10, speed: 120, throwCooldown: 0.3,
    throwAngle: 0,
    boomerangSpeed: 60,
    boomerangRadius: 8,
    shootAngles: [0,Math.PI/2,Math.PI,Math.PI*3/2]
}));
spawns.push(new Spawner(4100, 350, 100, 100, { type: 'oval', amount: 2, radius: 8, radius2: 16, speed: 100}));
spawns.push(new Spawner(4250, 350, 100, 100, { type: 'growingoval', amount: 2, radius: 8, radius2: 16, speed: 100, growSpeedX: 3, growSpeedY: 5, maxX: 12, maxY: 20, minX: 6, minY: 15, growingX: false, growingY: true, radiusOffset: 0, }));
spawns.push(new Spawner(4400, 350, 100, 100, { type: 'e2dasher', amount: 2, radius: 10, dashOffset: 0, randomDashOffset: 0.2, friction: 0.99, firstCooldown: 1.5, firstSpeed: 4, secondCooldown: 4, secondSpeed: 20 }))

spawns.push(new Spawner(4550, 350, 100, 100, { type: 'radiuschange', amount: 2, radius: 10, speed: 100, addRadius: 10, multiplyRadius: 1.2}));
spawns.push(new Spawner(4550, 350, 100, 100, { type: 'normal', amount: 2, radius: 10, speed: 100}));

spawns.push(new Spawner(4700, 350, 100, 100, { type: 'tpplayer', radius: 10, amount: 1, speed: 80}));
spawns.push(new Spawner(4850, 350, 100, 100, { type: 'forcemove', amount: 2, radius: 10, speed: 100}));
spawns.push(new Spawner(5000, 350, 100, 100, { type: 'forcestop', radius:10, amount: 2, speed: 120}));
spawns.push(new Spawner(5150, 350, 100, 100, { type: 'nokill', amount: 2, radius: 10, speed: 100}));
spawns.push(new Spawner(5300, 350, 100, 100, { type: 'pointaccel', radius:10, amount: 2, speed: 360, accelFactor: 3}));
spawns.push(new Spawner(5450, 350, 100, 100, { type: 'repel', amount: 2, radius: 10, speed: 100, repelAmount: 2.5, repelPower: 1}));

spawns.push(new Spawner(5600, 350, 100, 100, { type: 'rotatearoundparent', radius:10, amount: 2, speed: 120,childId: 3, rotateSpeed: 10, rotateDist: 20}));
spawns.push(new Spawner(5600, 350, 100, 100, { type: 'normal', amount: 2, radius: 10, speed: 100, parentId: 3}));

spawns.push(new Spawner(5750, 350, 100, 100, { type: 'enemymove', points: [[5760,360],[5840,360],[5840,440],[5760,440]], currentPoint: 0, amount: 1, radius: 8, speed: 100}));
spawns.push(new Spawner(5750, 350, 100, 100, { type: 'enemymove', points: [[5760,360],[5840,360],[5840,440],[5760,440]], currentPoint: 2, amount: 1, radius: 8, speed: 100}));

spawns.push(new Spawner(5900, 350, 100, 100, { type: 'enemyobstacle', toKill: false, amount: 2, radius: 2, speed: 100, /*offset: {x: 50, y: 33.33},*/
   obstacle: new Lava(0, 0, 30, 10)
}));
spawns.push(new Spawner(6050, 350, 100, 100, { type: 'toxic', radius:10, amount: 2, speed: 120}));
spawns.push(new Spawner(6200, 350, 100, 100, { type: 'followaxis', amount: 1, radius: 10, speed: 100, axis: true}));
spawns.push(new Spawner(6200, 350, 100, 100, { type: 'followaxis', amount: 1, radius: 10, speed: 100, axis: false}));

// let i = 0;
// for(let o of enes){
//     i++;
//     console.log(`texts.push(new Text(${-50+i*150},475,'${o}',false,16))`);
// }

texts.push(new Text(100,475,'Normal',false,16))
texts.push(new Text(250,475,'Square',false,16))
texts.push(new Text(400,475,'Switch',false,16))
texts.push(new Text(550,475,'TP',false,16))
texts.push(new Text(700,475,'Dasher',false,16))
texts.push(new Text(850,475,'GravAura',false,16))
texts.push(new Text(1000,475,'Turning',false,16))
texts.push(new Text(1150,475,'EnemyGrav',false,16))
texts.push(new Text(1300,475,'Rain',false,16))
texts.push(new Text(1450,475,'Flashlight',false,16))
texts.push(new Text(1600,475,'Memory',false,16))
texts.push(new Text(1750,475,'Flower',false,16))
texts.push(new Text(1900,475,'Shh',false,16))
texts.push(new Text(2050,475,'Turret',false,16))
texts.push(new Text(2200,475,'Growing',false,16))
texts.push(new Text(2350,475,'Accelerating',false,16))
texts.push(new Text(2500,475,'Wind',false,16))
texts.push(new Text(2650,475,'Polygon',false,16))
texts.push(new Text(2800,475,'Wavy',false,16))
texts.push(new Text(2950,475,'Bomb',false,16))
texts.push(new Text(3100,475,'Jumping',false,16))
texts.push(new Text(3250,475,'Outline',false,16))
texts.push(new Text(3400,475,'Slower',false,16))
texts.push(new Text(3550,475,'SelfCollide',false,16))
texts.push(new Text(3700,475,'Spawn',false,16))
texts.push(new Text(3850,475,'Fire',false,16))
texts.push(new Text(4000,475,'Boomerang',false,16))
texts.push(new Text(4150,475,'Oval',false,16))
texts.push(new Text(4300,475,'GrowingOval',false,16))
texts.push(new Text(4450,475,'E2Dasher',false,16))
texts.push(new Text(4600,475,'RadiusChange',false,16))
texts.push(new Text(4750,475,'TpPlayer',false,16))
texts.push(new Text(4900,475,'ForceMove',false,16))
texts.push(new Text(5050,475,'ForceStop',false,16))
texts.push(new Text(5200,475,'NoKill',false,16))
texts.push(new Text(5350,475,'PointAccel',false,16))
texts.push(new Text(5500,475,'Repel',false,16))
texts.push(new Text(5650,475,'RotateAroundParent',false,16))
texts.push(new Text(5800,475,'MovingEnemy',false,16))
texts.push(new Text(5950,475,'EnemyObstacle',false,16))
texts.push(new Text(6100,475,'Toxic',false,16))
texts.push(new Text(6250,475,'FollowAxis',false,16))

obstacles.push(new NormalObstacle(6400,250,13700,300));


module.exports = map;