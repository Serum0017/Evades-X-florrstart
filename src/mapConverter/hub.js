const {
    TransObstacle,
    NormalObstacle,
    BouncyObstacle,
    CircularNormalObstacle,
    CircularBouncyObstacle,
    RotatingNormal,
    Lava,
    RotatingLava,
    CircularLavaObstacle,
    SpeedObstacle,
    GravObstacle,
    Air,
    Polygon,
    Tp,
    MovingObstacle,
    StoryDisplay,
    Pusher,
    Sentry,
    Camera,
    Pushbox,
    Deathcure,
    CircularSafeObstacle,
    Zone,
    Deathmark,
    MovingLavaObstacle,
    CircularCoin,
    Portal,
    Winpad,
    Booster,
    WallBooster,
    WB,
    SpeedTrap,
    GrowingObstacle,
    GrowingLavaObstacle,
    GrowingCircleObstacle,
    GrowingCircleLavaObstacle,
    SizePlayer,
    Slip,
    BoostPad,
    Tornado,
    SnapGrid,
    VinetteIncrease,
    ColorChange,
    RotatingTp,
    PlatformerGrav,
    MovingSafe,
    RotatingSafe,
    BreakableObstacle,
    SwitchLava,
    SwitchObstacle,
    TimeTrap,
    InvincibilityPowerup,
    Filter,
    Particles,
    MovingSpeedTrap,
    RotatingSpeedTrap,
    DeadMove,
    Revive,
    DrawObstacle,
    Clone,
    Ship,
    CoinDoor,
    MusicChange,
    Redirect,
    CookieCheck,
    Typing,
    RevivePowerup,
    Raycasting,
    Spring,
    CircularSnap,
    IDIT,
    HidePlayer,
    CameraChange,
    Gun,
    Mashing,
    Golf,
    Zoom,
    RestrictAxis,
    Custom,
    FallingArrow,
    CircularHollowObstacle,
    SwitchGrav,
    Door,
    Button,
    CircularDoor,
    ReusableButton,
    TimeButton,
    TimeTrapButton,
    LavaDoor,
    Invert,
    DragonPowerup,
    PlayerCollide,
    CrowdButton,
    Hole,
    GunslingerPowerup,
    AmogusPowerup,
    Demo,
    EnemyButton,
    CircularSliceObstacle,
    CircularHollowSlice,
    RoundedCorners,
    RoundedLava,
    GrapplePowerup,
    GrapplePoint,
    CircularHollowLava,
    CircularLavaSlice,
    CircularHollowLavaSlice,
    ResetCoins,
    Bezier,
    BoxButton,
    RotatingPause,
    RotatingLavaPause,
    MovingPause,
    MovingLavaPause,
    FrictionChanger,
    MovingGrapplePoint,
    Oval,
    LavaOval,
    EnemyEffector,
    EnemyTp,
    EnemyWall,
    EnemyPolyWall,
    EnemyPolyTp,
    CircularHollowSliceEnemyWall,
    CircularHollowSliceEnemyTp,
    Mirror,
    Rail,
    TpTrap,
    DeadPusher,
    Bonus,
    CircularBonus,ZMode,
    IFramePlayer, MorphButton,MorphObstacle,MorphButtonTimed,MorphMoving,MorphLavaMove,DirNormal,PushboxResetButton,MorphMoveReset,
    ResetTimeTraps,
    NoRespawn,
    RotateCanvas,
    ForceInput,
    BouncyBreakable,
    Torch,
    TurretSentry,
    PolygonBouncy,
    PolygonBreakable,
    PolygonBouncyBreakable,
} = require('./!conversionClasses.js');
// const Npc = require('../npc.js');
// const Spawner = require('../spawner.js');
// const Safe = require('../safe.js');
// const Text = require('../text.js');

class Npc{
    constructor(){
  
    }
  };
  class Safe{
    constructor(){
  
    }
  };
  class Text{
    constructor(){
  
    }
  };

const hub = {
    arena: { width: 5000, height: 5000 },
    enemy: [],
    safes: [],
    texts: [],
    obstacles: [],
    npcs: [],
    spawns: [],
    playerSpawn: { x: 2500, y: 2500 },
    name: 'Hub',
    longName: 'Hub',
    // bgColor: '#27c274',
    // tileColor: '#03a379',
    bgColor: '#1f2229',
    tileColor: '#323645',
    difficulty: 'Peaceful',
    addedObstacles: [],
};

let { texts, obstacles, safes, spawns, playerSpawn, arena, npcs } = hub;
//x, y, r, bulletRadius=25, shootSpeed=1, interpolateSpeed=180, restAngle=0 bulletLife=3, bulletSpeed=100
// obstacles.push(new TurretSentry(2450, 1700, 33, 24, 0.3, 120, 90, 0.6, 480));

//points = [], strength, effect, regenTime = 10
// obstacles.push(new PolygonBouncyBreakable([
// 	[2300, 1900],
// 	[2500, 1900],
// 	[2550, 2000],
// ],10,30,6));

// //points = [], strength, time, regenTime = 10
// obstacles.push(new PolygonBreakable([
// 	[2200, 1800],
// 	[2400, 1800],
// 	[2450, 1900],
// ],10,0.1,6));

// obstacles.push(new PolygonBouncy([
// 	[2200, 1600],
// 	[2400, 1600],
// 	[2450, 1700],
// ],30));

// obstacles.push(new Torch(2500, 2500, 100, 200));

// spawns.push(new Spawner(2400, 2400, 200, 200, {
//     type: 'switchaccel',
//     amount: 4,
//     radius: 18,
//     speed: 48,
//     firstSpeed: 400,
//     secondSpeed: 0,
//     accelAmount: 100,
//     //stickTypes: ['normal']
// }));

// obstacles.push(new HidePlayer(2400, 1900, 200, 200));

// obstacles.push(new MovingLavaObstacle(50, 50, [[2500, 2500], [2450, 2400]], 150, 0));

// spawns.push(new Spawner(2400, 1650, 200, 200, {
//     type: 'oscillating',
//     amount: 1,
//     radius: 18,
//     speed: 120,
//     pointSpeed: 22,
//     currentPoint: 0,
//     pointsNumber: 3
// }));

// spawns.push(new Spawner(2400, 1650, 200, 200, {
//     type: 'oscillating',
//     amount: 1,
//     radius: 12,
//     speed: 120,
//     pointSpeed: 0,
//     currentPoint: 0,
//     points: [
//         {x: 2400,y:1650,xv:0,yv:0,speed:0},
//         {x: 2600,y:1650,xv:0,yv:0,speed:0},
//         {x: 2600,y:1850,xv:0,yv:0,speed:0},
//         {x: 2400,y:1850,xv:0,yv:0,speed:0},
//     ]
// }));

//shouldtouchground is a flag to tell that only if u touch ground then u can switch with key
// obstacles.push(new SwitchGrav(2200, 1850, 200, 200, [
//     {direction:'down',force:3376.5,time:1E99,key:['up'],shouldTouchGround: false},
//     {direction:'up',force:3376.5,time:1E99,key:['down'],shouldTouchGround: false},
//     {direction:'left',force:3376.5,time:1E99,key:['right'],shouldTouchGround: false},
//     {direction:'right',force:3376.5,time:1E99,key:['left'],shouldTouchGround: false},
// ]));

// spawns.push(new Spawner(2400, 2400, 200, 200, {
//     type: 'normal',
//     amount: 5,
//     radius: 12,
//     speed: 22,
// }));

// spawns.push(new Spawner(2400, 1650, 200, 200, {
//     type: 'wavy',
//     amount: 3,
//     radius: 10,
//     speed: 48,
//     maxTimer: 0.48
// }));

// spawns.push(new Spawner(2400, 2400, 200, 200, {
//     type: 'killenemy',
//     amount: 2,
//     radius: 12,
//     speed: 12,
//     killAll: false,
//     killTypes: ['normal']
// }));

// spawns.push(new Spawner(2400, 1650, 200, 200, {
//     type: 'sticky',
//     amount: 2,
//     radius: 24,
//     speed: 24,
//     stickToPlayer: false,
//     stickToEnemy: true,
//     toBoundStick: true,
//     toKill: false,
//     stickAll: true,
//     //stickTypes: ['normal']
// }));

// spawns.push(new Spawner(2400, 2400, 200, 200, {
//     type: 'sticky',
//     amount: 25,
//     radius: 8,
//     speed: 68,
//     stickToPlayer: false,
//     stickToEnemy: true,
//     toBoundStick: false,
//     toKill: true,
// }));

// spawns.push(new Spawner(/*2300, 1700, 400, 350,*/2200,2200,600,600, {
//     type: 'combo',
//     amount: 1,
//     radius: 20,
//     speed: 120,
//     enemyTypes: ['e2dasher','jump'],
    
//     dashOffset: 0, randomDashOffset: 0.2, friction: 0.99, firstCooldown: 1.5, firstSpeed: 4, secondCooldown: 4, secondSpeed: 10,

//     gravity: 50, groundedTime: 2, jumpHeight: 50,
// }));

// obstacles.push(new Gun(2200, 2400, 50, 50, true, 'stun', 0.5, 300, 15, 3));
// spawns.push(new Spawner(2300, 1700, 400, 350, {
//     type: 'reflectbullet',
//     amount: 1,
//     radius: 20,
//     speed: 120,
//     hp: 3,
// }));

// spawns.push(new Spawner(/*2300, 1700, 400, 350,*/2200,2200,600,600, {
//     type: 'combo',
//     amount: 2,
//     radius: 20,
//     speed: 120,
//     enemyTypes: ['wavy','toxic'],
    
//     maxTimer: 0.48
// }));

// spawns.push(new Spawner(/*2300, 1700, 400, 350,*/2200,2200,600,600, {
//     type: 'combo',
//     amount: 1,
//     radius: 20,
//     speed: 120,
//     enemyTypes: ['flower','spawn'],
    
//     rotateSpeed: -2, clonesNumber: 3, clonesRadius: 10, clonesDistance: 10, layers: 8,

//     spawnTime: 0.16,
//     spawnParams: {
//         type: 'normal',
//         radius: 4,
//         speed: 200,
//         life: 12,
//     },
// }));

// spawns.push(new Spawner(0, 0, 25000, 25000, { type: 'enemyobstacle', toKill: false, amount: 1, radius: 0, speed: 30, /*offset: {x: 12.5, y: 8.33},*/
//    obstacle: new IDIT(0, 0, 50, 50, 4, 5),
//     childId: 16
// }));
// spawns.push(new Spawner(0, 0, 0, 0, { type: 'enemymove', amount: 1, radius: 0, speed: 100, points: [[2400,2400],[2600,2600],[2800,2400]], currentPoint: 0, parentId: 16}));

// obstacles.push(new ForceInput(2300,2300,100,100,['down','left','shift']));

// death (default)
// speed
// size
// normal
// tp
// safe
// morph
// conveyor?
// obstacles.push(new TpTrap(2300,2450,100,100,3,2600,2600,0));
// obstacles.push(new ResetTimeTraps(2350,2350,50,50));
// obstacles.push(new NoRespawn(2400,2600,150,150));

// spawns.push(new Spawner(2250, 1150, 500, 500, {
//     type: 'fire',
//     amount: 3,
//     radius: 5,
//     speed: 320,
//     maxTime: 3,
//     fireAmount: 10,
//     fireDistance: 0.5,
//     fireLife: 6,
//     pauseTime: 1
// }))

// obstacles.push(new Slip(2150, 0, 650, 2150, 10));
// obstacles.push(new SpeedObstacle(2400, 1800, 200, 150, 0.2));
// obstacles.push(new Oval(2500, 1700, 50, 300));
// obstacles.push(new Polygon([
// 	[2300, 1900],
// 	[2500, 1900],
// 	[2550, 2000],
// ]));

// obstacles.push(new MorphButton(2300, 2500, 50, 50, 1))
// obstacles.push(new MorphObstacle(2300, 2600, 50, 50, 1));
// obstacles.push(new MorphButtonTimed(2300, 2400, 50, 50, 3));
// obstacles.push(new MorphObstacle(2300, 2300, 50, 50, 3));
//obstacles.push(new MorphButton(2500, 2300, 50, 50, 3));
// obstacles.push(new MorphMoveReset(2500, 2600, 50, 50, 3, 1));
// obstacles.push(new MorphMoving(50, 50, [[2400, 2250], [2650, 2250]], 150, 0, 3));
//obstacles.push(new MorphLavaMove(50, 50, [[2400, 2250], [2650, 2250]], 18, 0, 3, false));
// obstacles.push(new PushboxResetButton(2650, 2600, 50, 50, 1));
// obstacles.push(new Pushbox(2450, 2550, 50, 50, 25, 1))
// obstacles.push(new ZMode(2450, 2350, 50, 50, true))
// obstacles.push(new ZMode(2550, 2350, 50, 50, false))

// obstacles.push(new DirNormal(2650, 2350, 100, 50, 'up'));
//obstacles.push(new CircularBonus(2250,1900,50));

// spawns.push(new Spawner(2250, 1650, 500, 500, { type: 'slower', amount: 2, radius: 50, speed: 10, speedMult: 3, parentId: 3 }))
// spawns.push(new Spawner(2250, 1650, 500, 500, { type: 'slower', amount: 2, radius: 50, speed: 80, speedMult: 0.5, parentId: 2, switchParentId: [[2,1],[-1,5]] }))
// spawns.push(new Spawner(2250, 1650, 500, 500, { type: 'wavy', amount: 2, radius: 38, speed: 120, childId: 1, dir: 1, timer: 0, maxTimer: 0.48, parentId: 2,
// switchChildId: [[-1,5],[1,5]],
// switchParentId: [[1,5],[-1,5]]
// }))
// spawns.push(new Spawner(2250, 1650, 500, 500, { type: 'normal', amount: 2, radius: 28, dashOffset: 0, randomDashOffset: 0.2, friction: 0.99, firstCooldown: .5, firstSpeed: 12, secondCooldown: 2, secondSpeed: 22, parentId: 4, childId: 3, speed: 100,
// switchChildId: [[1,5],[-1,5]],
// switchParentId: [[-1,5],[1,5]]
// }));
// obstacles.push(new IFramePlayer(2300, 1700, 100, 100, 'https://evade.zerotix.repl.co', 'winpredictiondodging'));

// obstacles.push(
//     new DeadPusher(
//         50,
//         50,
//         [
//             [2300, 1850],
//             [2700, 1875],
//         ],
//         80,
//         0
//     )
// );
// obstacles.push(new Lava(2375, 1925, 25, 25));
// obstacles.push(new SwitchLava(2250, 1500, 150, 150, 0.5, 0.5, false, 0, false));
// obstacles.push(
//     new SwitchLava(2450, 1500, 150, 150, 0.5, 0.5, false, 0.25, true)
// );
// obstacles.push(
//     new SwitchObstacle(2350, 1350, 150, 150, 0.5, 0.5, false, 0.75, true)
// );
//obstacles.push(new Raycasting(0, 0, hub.arena.width, hub.arena.height ));
//obstacles.push(new CookieCheck(2650, 2350, 50, 50, 'amogustest', 'amogus'));
/*spawns.push(new Spawner(2250, 400, 300, 400, { type: 'bomb', amount: 1, radius: 20, speed: 220, bombNumber: 28, bombSpeed: 400, bombRadius: 8, bombLife: 3, bombDecay: 0.97 }))
spawns.push(new Spawner(2250, 0, 300, 400, { type: 'jump', amount: 20, radius: 20, speed: 100, gravity: 50, groundedTime: 2, jumpHeight: 50 }))
spawns.push(new Spawner(2250, 1150, 500, 500, { type: 'outline', amount: 1, radius: 200, speed: 10 }))
spawns.push(new Spawner(2250, 1650, 500, 500, { type: 'slower', amount: 1, radius: 100, speed: 10, speedMult: 3 }))
spawns.push(new Spawner(2250, 1650, 500, 500, { type: 'selfcollide', amount: 5, radius: 30, speed: 300 }))*/
/*spawns.push(new Spawner(2250, 1650, 500, 500, { x: 2350, y: 2000, type: 'spawn', amount: 1, radius: 50, speed: 0, spawnTime: 0.1, shootAngles:[Math.PI*19/10,Math.PI*18/10,Math.PI*17/10,Math.PI*16/10,Math.PI*15/10,Math.PI*14/10,Math.PI*13/10,Math.PI*12/10,Math.PI*11/10,Math.PI*10/10,Math.PI*9/10,Math.PI*8/10,Math.PI*7/10,Math.PI*6/10,Math.PI*5/10,Math.PI*4/10,Math.PI*3/10,Math.PI*2/10,Math.PI*1/10,0],
    spawnParams: {
        type: 'normal',
        radius: 24,
        speed: 200,
        life: 60,
    },
}))
spawns.push(new Spawner(2250, 1300, 200, 400, { x: 2350, y: 1500, type: 'spawn', amount: 1, radius: 50, speed: 0, spawnTime: 1,
    spawnParams: {
        type: 'rain',
        radius: 12,
        speed: 100,
        life: 40,
        x: 2350, y: 1400,
        waitTimer: 3,
        timer: 3,
        toWait: true,
        toWarp: false,
    },
}))
obstacles.push(new Hole(2400,2100,100,200));
obstacles.push(new GunslingerPowerup(2600,2600,100,100,true));
obstacles.push(new AmogusPowerup(2600,2400,100,100,true));*/

// obstacles.push(new Pushbox(2400, 1800, 100, 100, 50));
// obstacles.push(new Pushbox(2500, 1800, 50, 50, 75));

// spawns.push(new Spawner(0, 0, 2800, 1800, { type: 'turret', amount: 1, radius: 25, speed: 0, shootSpeed: 1, pRadius: 12, pSpeed: 200, offset: 0, shootDirections: [0], x: 2600, y: 2700, parentId: -1, childId: -1}));
// spawns.push(new Spawner(0, 0, 2800, 1800, { type: 'turret', amount: 1, radius: 25, speed: 0, shootSpeed: 1, pRadius: 12, pSpeed: 200, offset: 0, shootDirections: [90], x: 2700, y: 2600, parentId: -1, childId: -1}));
// where pushbox ;-;
// i added before
// it was weight 25 ik where

// btw oval obs finally in game :D ik u saw but like it took a long time to actually get a real collision function working (rather than just approx with poly)
// spawns.push(new Spawner(2200, 100, 550, 500, { type: 'spawn', amount: 1, radius: 10, speed: 100, spawnTime: 0.2,
//     spawnParams: [{ type: 'enemyobstacle', amount: 20, radius: 100, speed: 30, obstacle: new Oval(0, 0, 10, 20), life: 200, x: 2450, y: 450 },{ type: 'enemyobstacle', amount: 20, radius: 100, speed: 30, obstacle: new Oval(0, 0, 20, 10), life: 250, x: 2450, y: 450 }]}));
// spawns.push(new Spawner(2250, 1450, 450, 250, { type: 'followaxis', x: 2250, y: 1450, amount: 1, radius: 10, axis: true, parentId: 1}));
//obstacles.push(new Pushbox(2300, 2600, 50, 50, 25))
/*
spawns.push(new Spawner(2250, 1450, 450, 250, { type: 'followaxis', x: 2250, y: 1450, amount: 1, radius: 10, axis: false, parentId: 2}));
spawns.push(new Spawner(0, 0, 2800, 1800, { type: 'turret', amount: 1, radius: 25, speed: 1, shootSpeed: 1, pRadius: 12, pSpeed: 200, offset: 0, shootDirections: [0], childId: 2, simulateBound: {x: 2250, y: 1450, w: 450, h: 250}}));
spawns.push(new Spawner(0, 0, 2800, 1800, { type: 'turret', amount: 1, radius: 25, speed: 1, shootSpeed: 1, pRadius: 12, pSpeed: 200, offset: 0, shootDirections: [90], childId: 1, simulateBound: {x: 2250, y: 1450, w: 450, h: 250}}));
obstacles.push(new NormalObstacle(2200,1400,50,350))
obstacles.push(new NormalObstacle(2200,1400,500,50))
obstacles.push(new NormalObstacle(2700,1400,50,300))
obstacles.push(new NormalObstacle(2350,1700,400,50))
obstacles.push(new NormalObstacle(2250,1700,50,50))
// obstacles.push(new InvincibilityPowerup(2200, 1950, 200, 200, 5));
// spawns.push(new Spawner(2450, 1400, 150, 150, { type: 'toxic', amount: 3, radius: 40, speed: 120}));
obstacles.push(new Mirror(2200, 1900, 100, 100, 200, 0));
//new Oval(2300, 2300, 50, 100)//new RotatingPause(2425, 1675, 50, 15, 0, [{angle: 0, speed: 100, pause: 2},{angle: 90, speed: 100, pause: 1},{angle: 180, speed: 200, pause: 1},{angle: 90, speed: 100, pause: 1}])//new Oval(2300, 2300, 10, 20)

// obstacles.push(new EnemyEffector(2500,1400,50,150,5,'xv'));
// obstacles.push(new EnemyEffector(2400,1400,50,150,10,'yv'));

// obstacles.push(new BoxButton(2500, 2600, 50, 50, 1));
// obstacles.push(new BoxButton(2700, 2600, 50, 50, 1));

obstacles.push(new Oval(2300, 2300, 10, 300));
/*obstacles.push(new LavaOval(2300, 1900, 50, 100));
// obstacles.push(new Door(2700, 1800, 50, 50, 8));



//obstacles.push(new FrictionChanger(2200,600,500,500,0.99,0.1))

obstacles.push(new RotatingPause(2425, 1675, 300, 50, 0, [{angle: 0, speed: 100, pause: 2},{angle: 90, speed: 100, pause: 1},{angle: 180, speed: 200, pause: 1},{angle: 90, speed: 100, pause: 1}]));

obstacles.push(new RotatingLavaPause(2275, 1675, 300, 50, 0, [{angle: 0, speed: -50, pause: 0},{angle: 90, speed: -500, pause: 0},{angle: 180, speed: -50, pause: 1},{angle: 270, speed: -100, pause: 0}]));

obstacles.push(new MovingPause(50, 50, points = [[2275, 1625, 100, 3],[2475, 1675, 200, 0],[2325, 1975, 400, 2]], 0));

obstacles.push(new MovingGrapplePoint([[2500,2500],[2600,2400]],30, 0));// wot

obstacles.push(new MovingLavaPause(50, 50, points = [[2275, 1675, 100, 3],[2475, 1725, 200, 0],[2325, 2025, 400, 2]], 0));

obstacles.push(new Door(2450, 2250, 50, 50, 1));
obstacles.push(new Button(2250, 2450, 50, 50, 1));*/

// obstacles.push(new Sentry(2450, 450, 37.5, 500, 25));
// obstacles.push(new Sentry(2450, 1000, 37.5, 500, 25));

// obstacles.push(new Clone(2400, 2300, 50, 50, 100, 0))

/*obstacles.push(new Lava(2400, 2300, 100, 100));*/
//obstacles.push(new Camera(2500, 1500, 37.5,2600, 1600, 100, 100));
/*obstacles.push(new RoundedCorners(2200,1550,150,150,50));

obstacles.push(new RoundedLava(2200,1750,150,120,25));*/

//obstacles.push(new GrapplePowerup(2200,2350,150,120,true));
/*obstacles.push(new GrapplePoint(2500,2500));
obstacles.push(new GrapplePoint(2500,1900));
obstacles.push(new GrapplePoint(2400,1800));
obstacles.push(new GrapplePoint(2600,1800));*/

//obstacles.push(new ResetCoins(2400,2400,200,200));

// obstacles.push(new CircularCoin(2425, 2325, 25))
// spawns.push(new Spawner(0, 0, 0, 0, { type: 'enemymove', amount: 1, radius: 1, speed: 100, points: [[2400,2400],[2600,2600],[2800,2400]], currentPoint: 0, parentId: 20}));
// spawns.push(new Spawner(0, 0, 5000, 5000, { type: 'flashlight', amount: 1, radius: 15, speed: 50, flashlightSize: 40, flashlightAngle: 75, childId: 20 }));
/*spawns.push(new Spawner(2250, 1650, 500, 500, { x: 2350, y: 2000, type: 'spawn', amount: 1, radius: 5, speed: 10, xv: 0, yv: 100, spawnTime: [0.1,0.1,0.1,0.1,0.1,0.1,5], color: 'purple', shootAngles:[0,90,180,270],
    spawnParams: [{
        type: 'normal',
        radius: 24,
        speed: 20,
        life: 120,
    },{
        type: 'normal',
        radius: 30,
        speed: 20,
        life: 140,
    },{
        type: 'normal',
        radius: 36,
        speed: 20,
        life: 160,
    }],
}))*/
// obstacles.push(new EnemyButton(2575,2575,50,50,100))
// obstacles.push(new Door(2325,2325,50,50,100))
/*obstacles.push(new CircularHollowLavaSlice(2350,1750,150,-90,90,100,30));
obstacles.push(new CircularHollowLava(2500,1500,150,100));
obstacles.push(new CircularLavaSlice(2500,1900,150,-90,10));*/
// obstacles.push(new CircularHollowSlice(2350,1750,150,-Math.PI/4,-Math.PI*2/4,100,1.5));
// obstacles.push(new CircularHollowSlice(2350,1750,150,Math.PI/4,Math.PI*2/4,100,-1));
// obstacles.push(new CircularHollowSlice(2350,1750,150,Math.PI*3/4,Math.PI*4/4,100,-1));
// obstacles.push(new CircularHollowSlice(2350,1750,150,Math.PI*5/4,Math.PI*6/4,100,-1));
// obstacles.push(new CircularHollowSlice(2350,1750,150,Math.PI*7/4,Math.PI*8/4,100,-1));

// //"type":"move","points":[[550,3900],[550,3975]],"speed":120,"currentPoint":1,"pointTo":{"x":550,"y":3900},"pointOn":{"x":550,"y":3975}
// obstacles.push(new Demo('[{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2500},{"x":2500,"y":2499},{"x":2500,"y":2497},{"x":2500,"y":2495},{"x":2500,"y":2492},{"x":2500,"y":2488},{"x":2500,"y":2485},{"x":2500,"y":2481},{"x":2500,"y":2477},{"x":2500,"y":2473},{"x":2500,"y":2468},{"x":2500,"y":2464},{"x":2500,"y":2460},{"x":2500,"y":2455},{"x":2500,"y":2451},{"x":2500,"y":2446},{"x":2500,"y":2442},{"x":2500,"y":2437},{"x":2500,"y":2433},{"x":2500,"y":2428},{"x":2500,"y":2423},{"x":2500,"y":2419},{"x":2500,"y":2414},{"x":2500,"y":2410},{"x":2500,"y":2405},{"x":2500,"y":2400},{"x":2500,"y":2396},{"x":2500,"y":2391},{"x":2500,"y":2387},{"x":2500,"y":2382},{"x":2500,"y":2377},{"x":2500,"y":2373},{"x":2500,"y":2368},{"x":2500,"y":2364},{"x":2500,"y":2361},{"x":2500,"y":2357},{"x":2500,"y":2354},{"x":2500,"y":2350},{"x":2500,"y":2347},{"x":2499,"y":2343},{"x":2498,"y":2340},{"x":2496,"y":2337},{"x":2494,"y":2334},{"x":2492,"y":2331},{"x":2490,"y":2328},{"x":2487,"y":2324},{"x":2485,"y":2321},{"x":2482,"y":2318},{"x":2479,"y":2315},{"x":2476,"y":2312},{"x":2473,"y":2309},{"x":2470,"y":2306},{"x":2467,"y":2303},{"x":2464,"y":2300},{"x":2461,"y":2299},{"x":2458,"y":2297},{"x":2455,"y":2296},{"x":2452,"y":2295},{"x":2449,"y":2294},{"x":2446,"y":2294},{"x":2443,"y":2294},{"x":2440,"y":2293},{"x":2437,"y":2293},{"x":2434,"y":2293},{"x":2431,"y":2293},{"x":2427,"y":2293},{"x":2424,"y":2292},{"x":2421,"y":2292},{"x":2418,"y":2292},{"x":2415,"y":2292},{"x":2412,"y":2292},{"x":2409,"y":2292},{"x":2406,"y":2292},{"x":2403,"y":2292},{"x":2400,"y":2292},{"x":2397,"y":2292},{"x":2394,"y":2292},{"x":2391,"y":2292},{"x":2387,"y":2292},{"x":2384,"y":2292},{"x":2381,"y":2292},{"x":2378,"y":2293},{"x":2375,"y":2294},{"x":2372,"y":2296},{"x":2369,"y":2298},{"x":2366,"y":2300},{"x":2363,"y":2302},{"x":2360,"y":2305},{"x":2357,"y":2308},{"x":2354,"y":2310},{"x":2350,"y":2313},{"x":2347,"y":2316},{"x":2344,"y":2319},{"x":2341,"y":2322},{"x":2338,"y":2325},{"x":2335,"y":2328},{"x":2332,"y":2331},{"x":2329,"y":2334},{"x":2326,"y":2337},{"x":2323,"y":2340},{"x":2322,"y":2343},{"x":2320,"y":2346},{"x":2319,"y":2349},{"x":2318,"y":2352},{"x":2318,"y":2356},{"x":2317,"y":2359},{"x":2317,"y":2362},{"x":2316,"y":2365},{"x":2316,"y":2368},{"x":2316,"y":2371},{"x":2316,"y":2374},{"x":2316,"y":2377},{"x":2316,"y":2380},{"x":2316,"y":2383},{"x":2315,"y":2386},{"x":2315,"y":2389},{"x":2315,"y":2392},{"x":2315,"y":2396},{"x":2315,"y":2399},{"x":2315,"y":2402},{"x":2315,"y":2405},{"x":2315,"y":2408},{"x":2315,"y":2411},{"x":2315,"y":2414},{"x":2315,"y":2417},{"x":2315,"y":2420},{"x":2315,"y":2423},{"x":2315,"y":2426},{"x":2315,"y":2429},{"x":2315,"y":2432},{"x":2315,"y":2436},{"x":2315,"y":2439},{"x":2315,"y":2442},{"x":2315,"y":2445},{"x":2315,"y":2448},{"x":2315,"y":2451},{"x":2315,"y":2454},{"x":2315,"y":2457},{"x":2315,"y":2460},{"x":2315,"y":2463},{"x":2315,"y":2466},{"x":2315,"y":2469},{"x":2315,"y":2472},{"x":2315,"y":2476},{"x":2315,"y":2479},{"x":2315,"y":2482},{"x":2315,"y":2485},{"x":2315,"y":2488},{"x":2315,"y":2491},{"x":2315,"y":2494},{"x":2315,"y":2497},{"x":2315,"y":2500},{"x":2315,"y":2503},{"x":2315,"y":2506},{"x":2315,"y":2509},{"x":2315,"y":2513},{"x":2315,"y":2516},{"x":2315,"y":2519},{"x":2315,"y":2522},{"x":2315,"y":2525},{"x":2315,"y":2528},{"x":2315,"y":2531},{"x":2315,"y":2534},{"x":2315,"y":2537},{"x":2315,"y":2540},{"x":2315,"y":2543},{"x":2315,"y":2546},{"x":2316,"y":2549},{"x":2317,"y":2553},{"x":2319,"y":2556},{"x":2321,"y":2559},{"x":2323,"y":2562},{"x":2325,"y":2565},{"x":2328,"y":2568},{"x":2331,"y":2571},{"x":2333,"y":2574},{"x":2336,"y":2577},{"x":2339,"y":2580},{"x":2342,"y":2583},{"x":2345,"y":2586},{"x":2348,"y":2589},{"x":2351,"y":2592},{"x":2354,"y":2594},{"x":2357,"y":2595},{"x":2360,"y":2596},{"x":2363,"y":2597},{"x":2366,"y":2598},{"x":2369,"y":2598},{"x":2372,"y":2599},{"x":2376,"y":2599},{"x":2379,"y":2599},{"x":2383,"y":2599},{"x":2387,"y":2600},{"x":2391,"y":2600},{"x":2395,"y":2600},{"x":2399,"y":2600},{"x":2403,"y":2600},{"x":2408,"y":2600},{"x":2412,"y":2600},{"x":2417,"y":2599},{"x":2421,"y":2597},{"x":2426,"y":2595},{"x":2430,"y":2592},{"x":2435,"y":2588},{"x":2440,"y":2585},{"x":2444,"y":2581},{"x":2449,"y":2577},{"x":2453,"y":2573},{"x":2458,"y":2569},{"x":2463,"y":2564},{"x":2467,"y":2560},{"x":2472,"y":2555},{"x":2476,"y":2551},{"x":2481,"y":2546},{"x":2486,"y":2542},{"x":2490,"y":2537},{"x":2495,"y":2533},{"x":2498,"y":2528},{"x":2501,"y":2523},{"x":2503,"y":2519},{"x":2505,"y":2514},{"x":2506,"y":2510},{"x":2507,"y":2505},{"x":2508,"y":2500},{"x":2509,"y":2496},{"x":2509,"y":2491},{"x":2510,"y":2487},{"x":2510,"y":2482},{"x":2510,"y":2477},{"x":2510,"y":2473},{"x":2510,"y":2468},{"x":2510,"y":2464},{"x":2511,"y":2459},{"x":2511,"y":2454},{"x":2511,"y":2450},{"x":2511,"y":2445},{"x":2511,"y":2440},{"x":2511,"y":2436},{"x":2511,"y":2431},{"x":2511,"y":2427},{"x":2511,"y":2422},{"x":2511,"y":2417},{"x":2511,"y":2413},{"x":2511,"y":2408},{"x":2511,"y":2404},{"x":2511,"y":2399},{"x":2511,"y":2394},{"x":2511,"y":2390},{"x":2511,"y":2385},{"x":2511,"y":2380},{"x":2511,"y":2376},{"x":2511,"y":2371},{"x":2511,"y":2367},{"x":2511,"y":2363},{"x":2513,"y":2359},{"x":2514,"y":2355},{"x":2516,"y":2352},{"x":2519,"y":2349},{"x":2521,"y":2345},{"x":2524,"y":2342},{"x":2526,"y":2339},{"x":2529,"y":2336},{"x":2532,"y":2332},{"x":2535,"y":2329},{"x":2538,"y":2326},{"x":2541,"y":2323},{"x":2544,"y":2320},{"x":2547,"y":2317},{"x":2550,"y":2314},{"x":2553,"y":2311},{"x":2556,"y":2307},{"x":2559,"y":2304},{"x":2562,"y":2301},{"x":2565,"y":2299},{"x":2568,"y":2297},{"x":2571,"y":2296},{"x":2574,"y":2294},{"x":2577,"y":2294},{"x":2580,"y":2293},{"x":2583,"y":2292},{"x":2586,"y":2292},{"x":2589,"y":2292},{"x":2593,"y":2291},{"x":2596,"y":2291},{"x":2599,"y":2291},{"x":2602,"y":2291},{"x":2605,"y":2291},{"x":2608,"y":2291},{"x":2611,"y":2291},{"x":2614,"y":2291},{"x":2617,"y":2291},{"x":2620,"y":2291},{"x":2623,"y":2293},{"x":2626,"y":2294},{"x":2629,"y":2296},{"x":2633,"y":2298},{"x":2636,"y":2301},{"x":2638,"y":2303},{"x":2640,"y":2306},{"x":2641,"y":2309},{"x":2642,"y":2312},{"x":2643,"y":2315},{"x":2644,"y":2318},{"x":2644,"y":2320},{"x":2645,"y":2323},{"x":2645,"y":2326},{"x":2645,"y":2330},{"x":2646,"y":2333},{"x":2646,"y":2336},{"x":2646,"y":2339},{"x":2646,"y":2342},{"x":2646,"y":2345},{"x":2646,"y":2348},{"x":2646,"y":2351},{"x":2646,"y":2354},{"x":2646,"y":2357},{"x":2646,"y":2360},{"x":2646,"y":2363},{"x":2646,"y":2366},{"x":2646,"y":2369},{"x":2646,"y":2372},{"x":2646,"y":2376},{"x":2646,"y":2379},{"x":2646,"y":2382},{"x":2646,"y":2385},{"x":2646,"y":2388},{"x":2644,"y":2391},{"x":2643,"y":2394},{"x":2641,"y":2397},{"x":2638,"y":2400},{"x":2636,"y":2403},{"x":2633,"y":2406},{"x":2631,"y":2409},{"x":2628,"y":2412},{"x":2625,"y":2416},{"x":2622,"y":2419},{"x":2619,"y":2422},{"x":2615,"y":2426},{"x":2612,"y":2430},{"x":2608,"y":2433},{"x":2603,"y":2435},{"x":2599,"y":2437},{"x":2595,"y":2438},{"x":2591,"y":2439},{"x":2586,"y":2440},{"x":2582,"y":2441},{"x":2577,"y":2441},{"x":2573,"y":2442},{"x":2568,"y":2442},{"x":2563,"y":2442},{"x":2559,"y":2442},{"x":2554,"y":2443},{"x":2550,"y":2443},{"x":2545,"y":2443},{"x":2540,"y":2443},{"x":2536,"y":2443},{"x":2531,"y":2443},{"x":2527,"y":2443},{"x":2522,"y":2443},{"x":2517,"y":2443},{"x":2513,"y":2443},{"x":2508,"y":2443},{"x":2504,"y":2443},{"x":2499,"y":2443},{"x":2494,"y":2443},{"x":2490,"y":2443},{"x":2485,"y":2443},{"x":2480,"y":2443},{"x":2476,"y":2443},{"x":2472,"y":2443},{"x":2469,"y":2443},{"x":2467,"y":2443},{"x":2466,"y":2443},{"x":2464,"y":2443},{"x":2463,"y":2443},{"x":2463,"y":2443},{"x":2462,"y":2443},{"x":2462,"y":2443},{"x":2461,"y":2443},{"x":2461,"y":2443},{"x":2461,"y":2443},{"x":2461,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443},{"x":2460,"y":2443}]'));

//spawns.push(new Spawner(2200, 2200, 600, 600, { type: 'pointaccel', accelFactor: 2, accelPower: 1.8, amount: 200, radius: 20, speed: 50, /*centerPoint: {x: 2200, y: 2200}*/ }))
// parented enemies :D
/*spawns.push(new Spawner(2250, 750, 500, 500, { type: 'spawn', amount: 1, radius: 20, speed: 200, spawnTime: 0.5,
    spawnParams: {
        type: 'wavy',
        radius: 50,
        speed: 40,
        life: 60,
        dir: 1,
        timer: 0,
        maxTimer: 0.32,
    },
}))
spawns.push(new Spawner(2200, 100, 550, 500, { type: 'spawn', amount: 4, radius: 10, speed: 100, spawnTime: 0.2,
    spawnParams: {
        type: 'selfcollide',
        radius: 32,
        speed: 300,
        life: 100,
    },
}))
npcs.push(new Npc(2525, 2375, 25, ['1','2'], 'gfx/hats/halo.png'));
npcs.push(new Npc(2475, 2375, 25, ['1','2'], 'gfx/shh.png'));
npcs.push(new Npc(2425, 2375, 25, ['1','2'], 'gfx/hats/gold-crown.png'));*/
// texts.push(new Text(2500, 2775, 'Pro Tip: press G to toggle the grid', false, 24));
// obstacles.push(new Pusher(2300, 1900, 50, 50, 'left', 400, 10));
// obstacles.push(new Pusher(2400, 1800, 50, 50, 'down', 400, 60));

// spawns.push(new Spawner(2550, 2850, 250, 250, { type: 'rotatearoundparent', speed: 10, amount: 2, radius: 21, childId: 63, parentId: 62, rotateSpeed: 1, rotateDist: 50 }));
// spawns.push(new Spawner(2550, 2850, 250, 250, { type: 'rotatearoundparent', speed: 10, amount: 2, radius: 21, childId: 62, rotateSpeed: -4, rotateDist: 50 }));
// spawns.push(new Spawner(2550, 2850, 250, 250, { type: 'normal', speed: 10, amount: 2, radius: 30, parentId: 63 }));
//obstacles.push(new Deathmark(2300, 2300, 50, 50, 7));
//obstacles.push(new Deathcure(2700, 2300, 50, 50))
// obstacles.push(new Zone(2450, 2450, 100, 100, '0'));
// obstacles.push(new Zone(2650, 2300, 50, 50, '1'));
// obstacles.push(new Zone(2650, 2400, 50, 50, '2'));
// obstacles.push(new Zone(2650, 2500, 50, 50, '2A'));
// obstacles.push(new Zone(2650, 2600, 50, 50, '2B'));
// obstacles.push(new Zone(2650, 2700, 50, 50, '69420'));

// array of arrays with points wtf bezier
// the arrays of points are individual curves while the points are the bounding points
// hm
// what are the nested arrays tho
// mutliple curves? idk
// tf
// idk if that would be codable in editor
// i thought it was just seperate
// not implemented well
// ill look for smth else
// ??
// wdym
// ye theres snapDistance

// like one bezier is just multiple [x,y]s4
// ok ye im not adding this rn
// btw did u finish all snapgrid props? u can make it snap like every 25 instead of 50 for example
// does that work in editor?
/*obstacles.push(new Bezier([
    [
        [2300, 1850],
    	[2350, 1700],
        [2450, 1775],
        [2450, 1650],
    	[2500, 1850]
    ],
    [
        [2500, 1850],
        [2400, 2000]
    ],
    [
        [2400, 2000],
        [2300, 1965],
        [2300, 1850]
    ],
]));

obstacles.push(new Rail([
	[2300, 800],
	[2500, 800],
	[2550, 900],
]));*/

/*obstacles.push(new Polygon([
	[2300, 2300],
	[2500, 2300],
	[2550, 2400],
]));
obstacles.push(new Polygon([
	[2500, 2650], 
	[2600, 2700],
	[2525, 2725],
	[2450, 2700],
]));	
obstacles.push(new Polygon([
	[2250, 2500],
	[2300, 2500],
	[2350, 2600],
	[2250, 2600],
]))
obstacles.push(new Polygon([
	[2800, 2400 ],
	[2800, 2550 ],
	[2750, 2600 ],
	[2700, 2550],
]))
obstacles.push(new Polygon([
	[2800, 2400 - 500],
	[2800, 2550 - 500],
	[2750, 2600 - 500],
	[2700, 2550 - 500],
], 'poly-lava'))*/
// obstacles.push(new Polygon([
// 	[2400, 1400],
// 	[2600, 1450],
// 	[2500, 1550],
// 	[2400, 1550],
// ], 'poly-tp', { tpx: 2450, tpy: 1200 }));

// obstacles.push(new RotatingNormal(2300, 2500, 250, 25, 90))
// obstacles.push(new RotatingLava(2600, 2500, 250, 25, -90))
// obstacles.push(new TransObstacle(2700, 2600, 50, 100, false));
// obstacles.push(new TransObstacle(2600, 2600, 50, 100, true));
//obstacles.push(new MovingSafe(50, 50, [[2250, 1750],[2250,1800]], 30, 0));*/
/*texts.push(new Text(2500, 2675, 'Traverse through planets'));
texts.push(new Text(2500, 2725, 'ranging from nice and chill'));
texts.push(new Text(2500, 2775, 'to screaming your head off!'));*/
//obstacles.push(new MovingLavaObstacle(50, 50, [[2300, 2000], [2400, 2100]], 50))

//obstacles.push(new VinetteIncrease(2450, 2250, 100, 100, 0.1, 0.1, 1.5, {r: 255, g: 0, b: 0}));
//x, y, w, h, innerRadius, outerRadius, opacity, vinetteColor

texts.push(new Text(1975, 2725, 'Tricky Planets'));
texts.push(new Text(2275, 2075, `Difficulty chart`));
texts.push(new Text(2975, 2225, 'Dangerous Planets'));
texts.push(new Text(2675, 2975, 'Friendly Planets'));
// obstacles.push(new GravObstacle(2700, 2750, 100, 100, "down", 2000));

// obstacles.push(new ColorChange(2300, 2300, 100, 100, 'black', 'white'));

// obstacles.push(new CircularSafeObstacle(2500, 1800, 50));
safes.push(new Safe(2200, 2200, 600, 600));
obstacles.push(new SpeedObstacle(2400, 2400, 200, 200));
// bug in mg3
//x, y, w, h, params, simulate, collidable, onCollision, render
/*obstacles.push(new Custom(2350,1700,200,200,//dimensions
    [{name: 'tpdist',value:100},{name: 'timer', value: 1},{name: 'time',value: 0}],//properties
    `this.time -= dt; if(this.time < 0){this.time = this.timer;}`,//simulate function
    false,//collidable
    'this.y -= this.tpdist',//onCollision function
    `ctx.fillRect(pos.x,pos.y,this.w,this.h);ctx.fillStyle = 'white';ctx.fillText('Custom Obstacle!',pos.x+this.w/2,pos.y+this.h/2)`// render function
));*/ // idea for this obs is to tp when player touches
//obstacles.push(new FallingArrow(2350,1700,200,200,[["right",2,100],["left",2,50],["up",4,300],["down",5,150]]))
//obstacles.push(new RestrictAxis(2350, 1450, 200, 200, false, true));
//obstacles.push(new RestrictAxis(2350, 1700, 200, 200, true, false));
/*obstacles.push(new Spring(2450, 1700, 50, 50,
    [
        {x: 2375, y: 1625, strength: 100},
        {x: 2625, y: 1750, strength: 70},
        {x: 2450, y: 1850, strength: 120}
    ],
));
obstacles.push(new Golf(2200, 750, 350, 350, 3, 0.98));
obstacles.push(new Zoom(2650, 1700, 150, 150, 0.25));
obstacles.push(new CircularSnap(2400, 1600, 100));
//x, y, w, h, state, gunType, fireCooldown, speed, radius, life
obstacles.push(new Gun(2200, 300, 100, 100, true, 'normal', 0.5, 300, 15, 3));
obstacles.push(new Gun(2350, 300, 100, 100, true, 'stun', 0.1, 800, 3, 1.5));
obstacles.push(new Gun(2650, 300, 100, 100, true, 'push', 1, 500, 60, 4));
obstacles.push(new Gun(2500, 300, 100, 100, false));
spawns.push(new Spawner(2350, 400, 300, 300, { type: 'normal', amount: 10, radius: 30, speed: 200}));
obstacles.push(new Tp(2500, 1600, 50, 50, 2500, 2500));
obstacles.push(new IDIT(2400, 1900, 200, 200, 50, 10));
obstacles.push(new CameraChange(2600, 1400, 200, 200, 2500, 2500));
obstacles.push(new Mashing(2600, 800, 200, 200, 1000));*/
// obstacles.push(new Typing(2200, 1800, 200, 200, 'When the person who pretends to be someone else in order to deceive others, especially for fraudulent gain is giving the impression that something is questionable or dishonest, causing one to have the idea or impression that they are of questionable, dishonest, or dangerous character or condition.'));

// obstacles.push(new Typing(2400, 350, 400, 100, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));
// obstacles.push(new Typing(2400, 250, 400, 100, `my crewmate, ur being sus to the 5th best impostor on among us over here. I have beaten multiple tier 16 crewmates and i have been into the amogus community for over a year now. I know what being sus does. It makes it so you are sus + you can troll people with  Sabotage. THUS, making killing crewmates from tier FREE. This is very coparabl to Hacking, as that is basically make deez nuts go in your moma as well. The excuse of being red is bullshit, since it literally makes killing miles easier. "Wee emergency meeting" emergency meetings BARELY change. U wouldnt even notice a difference if u have brain cell and nobody else know u sus. Final conclusin: if u call being sus legit, you calling dez nuts legit too. Stop defending yo mother and start getting some BITCHES. Ok bro, you "beat" a catastrophic. HOWEVER, the legitimacy of your run must be called into question. You see, on the 384th jump, you teleported forwards about 3 pixels. This implies exploits because otherwise it would be impossible to move that much. Clearly it isnt lag either because you said that you are not Lagging. It's also not ping because you are not far from the server. Furthermore, on the 710th jump, you speed glitched. My boy, ur talking to the 5th best jtoh player, I have been into the community for over a year now and have beaten multipie cata towers, and I know what a speed glich does. It makes it so you jump much much further, THUS making jumps LOW FREE. This is completely UNLEGIT and your run is thus invalid. Go cry about it, low Remorseless skill player.`));

// obstacles.push(new Typing(2450, 1800, 350, 50, `The FitnessGram PACER Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The test is used to measure a student's aerobic capacity as part of the FitnessGram assessment. Students run back and forth as many times as they can, each lap signaled by a beep sound. The test get progressively faster as it continues until the student reaches their max lap score. The PACER Test score is combined in the FitnessGram software with scores for muscular strength, endurance, flexibility and body composition to determine whether a student is in the Healthy Fitness Zone or the Needs Improvement Zone.`));
// obstacles.push(new Typing(2450, 1900, 50, 50, `Among us is such a fun game.`));
//obstacles.push(new Redirect(2400, 2200, 100, 100, 'https://www.youtube.com/watch?v=Yb6dZ1IFlKc'));
// obstacles.push(new CoinDoor(2200, 2200, 50, 50, 5));
// obstacles.push(new Ship(2175, 2000, 200, 50, true));
// obstacles.push(new Ship(2475, 2000, 200, 50));

//spawns.push(new Spawner(2150, 1950, 200, 200, { type: 'growing', amount: 1, radius: 1, speed: 120, growSpeed: 50, growing: true, minRadius: 1, maxRadius: 99, bounceAmount: 50 }));
/*obstacles.push(new MovingSpeedTrap(100,100,[[2300, 2200],[2400,2200]], 50, 1, 2, 4, 2500, 2500));
//x, y, w, h, spd, angle, pivotX, pivotY, minSpeed, maxSpeed, tpx, tpy
obstacles.push(new RotatingSpeedTrap(2350,2350,10,150,100, 0, 0, 0, 2, 4, 2500, 2500));*/
//obstacles.push(new DeadMove(2150, 1950, 200, 200,2));
//x, y, w, h, offsetX, offsetY, w, h, obstacle
//obstacles.push(new Clone(2600, 800, 200, 200, 200, -200));
//obstacles.push(new Clone(2400, 800, 200, 200, 200, 200));
//obstacles.push(new Revive(2150, 1950, 50, 50));
//obstacles.push(new Lava(2200, 2050, 100, 50));
//w, h, points = [[50, 50]], speed = 30, currentPoint minSpeed, maxSpeed
//x, y, w, h, spawnRate, particleSpeed, particleSize, particleColor, toDecay, decayTime
//obstacles.push(new Particles(2145, 2615, 50, 50,0.012,2,3,'white',0.4,true,-45,45));
// spawns.push(new Spawner(2400, 1750, 150, 150, { type: 'polygon', amount: 2, sides: 7, size: 60, speed: 90, startAngle: 0.1, rotateSpeed: 1 }));
// spawns.push(new Spawner(2200, 1750, 150, 150, { type: 'polygon', amount: 2, sides: 3, size: 20, speed: 20, startAngle: 2, rotateSpeed: 10 }));
// spawns.push(new Spawner(2505, 1875, 150, 150, { type: 'polygon', amount: 3, sides: 4, size: 35, speed: 40, startAngle: Math.PI, rotateSpeed: -5 }));
//obstacles.push(new Filter(2200, 2200, 200, 200, 'blur(10px)'));
// obstacles.push(new RevivePowerup(2600, 1950, 200, 200, 3));
/*
obstacles.push(new PlatformerGrav(2600, 2200, 200, 200, 'left', 120, 1000));
obstacles.push(new PlatformerGrav(2200, 2200, 200, 200, 'down', 120, 1000));
obstacles.push(new PlatformerGrav(2600, 2600, 200, 200, 'up', 120, 1000));*/
// obstacles.push(new PlatformerGrav(2200, 550, 500, 500, 'down', 200, 2800, 100000, true, 0.9));
//x, y, w, h, dir, jumpHeight, force = 500, maxForce, variableJumpHeight = false
/*
obstacles.push(new NormalObstacle(2150, 1925, 550, 50));
obstacles.push(new NormalObstacle(2250, 1725, 550, 50));
obstacles.push(new NormalObstacle(2150, 1525, 550, 50));
obstacles.push(new NormalObstacle(2250, 1325, 550, 50));
obstacles.push(new NormalObstacle(2150, 1125, 550, 50));
obstacles.push(new NormalObstacle(2250, 925, 550, 50));
texts.push(new Text(2500, 1250, 'Why are you still here??'));
texts.push(new Text(2500, 850, 'Go away.'));
obstacles.push(new NormalObstacle(2150, 725, 550, 50));
obstacles.push(new NormalObstacle(2250, 525, 600, 50));
texts.push(new Text(2500, 450, 'Fine, dodge some enemies.'));
spawns.push(new Spawner(2190, 100, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2140, 100, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2240, 100, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2165, 140, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2215, 140, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2190, 180, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2165, 220, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2215, 220, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2190, 260, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2165, 300, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));
spawns.push(new Spawner(2215, 300, 21, 21, { type: 'normal', amount: 1, radius: 10, speed: 0}));

spawns.push(new Spawner(2150, 375, 650, 150, { type: 'square', amount: 3, size: 50, speed: 200 }));
spawns.push(new Spawner(2300, 0, 100, 325, { type: 'memory', amount: 10, radius: 35, speed: 100, timeOn: 3, timeOff: 1, range: 0 }));
spawns.push(new Spawner(2450, 0, 100, 325, { type: 'flashlight', amount: 3, radius: 15, speed: 50, flashlightSize: 40, flashlightAngle: 75 }));
spawns.push(new Spawner(2673, 173, 2, 2, { type: 'flower', amount: 1, radius: 1, speed: 0, rotateSpeed: -8, clonesNumber: 3, clonesRadius: 10, clonesDistance: 10, layers: 8}));
obstacles.push(new SizePlayer(2150, 0, 650, 325, 10));
obstacles.push(new NormalObstacle(2150, 325, 550, 50));
obstacles.push(new NormalObstacle(2250, 0, 50, 250));
obstacles.push(new NormalObstacle(2400, 75, 50, 250));
obstacles.push(new NormalObstacle(2550, 0, 50, 250));
obstacles.push(new NormalObstacle(2650, 75, 50, 250));
obstacles.push(new NormalObstacle(2750, 0, 50, 325));
obstacles.push(new Winpad(2150, 0, 100, 100));
// list of additional props for the flower: layers, rotateSpeed, clonesNumber (per layer), clonesRadius, clonesDistance (from the central bulb, or the layer below), clonesEffect (currently can be 'slow', 'size', 'grav', 'vinette'), effectMagnitude (affects clonesEffect), growingMultiple (of original radius to max out growing at), growingSpeed, syncGrowing
/*spawns.push(new Spawner(2750, 2050, 50, 50, { type: 'flower', amount: 1, radius: 24, speed: 10, rotateSpeed: 20, clonesNumber: 5, clonesRadius: 10, clonesDistance: 40, layers: 2, growingMultiple: 3, growingSpeed: 10}));*/
/*spawns.push(new Spawner(2250, 00, 101, 101, { type: 'shh', amount: 1, radius: 50, speed: 10, ic: 0}));
spawns.push(new Spawner(2350, 00, 101, 101, { type: 'shh', amount: 1, radius: 50, speed: 10}));
spawns.push(new Spawner(2450, 00, 101, 101, { type: 'shh', amount: 1, radius: 50, speed: 10}));
spawns.push(new Spawner(2550, 00, 101, 101, { type: 'shh', amount: 1, radius: 50, speed: 10}));

spawns.push(new Spawner(2250, 100, 101, 101, { type: 'shh', amount: 1, radius: 50, speed: 10, ic: 0 }));
spawns.push(new Spawner(2350, 100, 101, 101, { type: 'shh', amount: 1, radius: 50, speed: 10}));
spawns.push(new Spawner(2450, 100, 101, 101, { type: 'shh', amount: 1, radius: 50, speed: 10}));
spawns.push(new Spawner(2550, 100, 101, 101, { type: 'shh', amount: 1, radius: 50, speed: 10}));*/
/*
rotateSpeed: this.rotateSpeed,
			clonesNumber: this.clonesNumber,
      clonesRadius: this.clonesRadius,
      clonesAngle: this.clonesAngle,
      clonesX: this.clonesX,
      clonesY: this.clonesY,
*/
/*spawns.push(new Spawner(2150, 2050, 650, 100, { type: 'memory', amount: 2, radius: 35, speed: 100, timeOn: 2, timeOff: 2, range: 0.2 }))
obstacles.push(new Booster(2150, 0, 650, 2150));
obstacles.push(new SpeedTrap(2150, 0, 650, 2150, 0.1))
spawns.push(new Spawner(2150, 0, 650, 2150, { type: 'rain', amount: 50, radius: 35, speed: 140, waitTimer: 1, direction: 
'horizontal', })),
obstacles.push(new WallBooster(1650, 2200, 10, 600));

// random test
spawns.push(new Spawner(3800, 1950, 350, 350, { type: 'rain', amount: 3, radius: 35, speed: 120, waitTimer: 1, direction: 
'vertical' })),*/

//spawns.push(new Spawner(3800, 1950, 350, 350, { type: 'square', amount: 100, size: 35, speed: 100 })),
/*
this.dashTimer = (spawn.data.dashOffset||0) + Math.random*()*(spawn.data.randomDashOffset||0);
this.dashDistance = spawn.data.dashDistance;
this.friction = spawn.data.friction||1;
this.firstCooldown = spawn.data.firstCooldown;
this.firstSpeed = spawn.data.firstSpeed;
this.secondCooldown = spawn.data.secondCooldown;
this.secondSpeed = spawn.data.secondSpeed;
*/
// spawns.push(new Spawner(3800, 1975, 350, 300, { type: 'e2dasher', amount: 3, radius: 35, dashOffset: 0, randomDashOffset: 0.2, friction: 0.99, firstCooldown: 1.5, firstSpeed: 10, secondCooldown: 4, secondSpeed: 50, parentId: 1,
// }));

// obstacles.push(new CircularNormalObstacle(3950,2050,25));
// obstacles.push(new EnemyTp(3950,2225,60,50,4050,2100));

// obstacles.push(new EnemyWall(3900,2050,80,80));
// obstacles.push(new EnemyPolyWall([
//  	[3850, 2100],
// 	[3900, 2100],
// 	[3950, 2200],
// ]));

// obstacles.push(new EnemyPolyTp([
//  	[4050, 2000],
// 	[4150, 2000],
// 	[4100, 2100],
// ], 4025, 2160));
// obstacles.push(new CircularHollowSliceEnemyWall(3975, 2125, 125/*50*/, 0, 180/*360*/, 100/*0*/, 100/*0*/));
// obstacles.push(new CircularHollowSliceEnemyTp(3975, 2125, 100, 0, 180, 75, 4100, 2017, -100));
//spawns.push(new Spawner(3800, 1950, 350, 350, { type: 'rchange', speed: 200, amount: 2, radius: 28, addRadius: -10, multiplyRadius: 0.5, childId: 1,
//}));
/*spawns.push(new Spawner(2200, 1000, 500, 200, { type: 'nokill', speed: 50, amount: 2, radius: 38, runCollision: true}));
spawns.push(new Spawner(2200, 750, 500, 200, { type: 'forcemove', speed: 20, amount: 6, radius: 45, runCollision: true}));
spawns.push(new Spawner(2200, 500, 500, 200, { type: 'forcestop', speed: 200, amount: 6, radius: 42, runCollision: true}));*/
/*spawns.push(new Spawner(2200, 500, 500, 500, { type: 'repel', speed: 100, amount: 20, radius: 42, repelAmount: 2.5, repelPower: 1 }));

spawns.push(new Spawner(3800, 1975, 350, 300, { type: 'rotatearoundparent', speed: 100, amount: 2, radius: 42, childId: 6, rotateSpeed: 1, rotateDist: 150 }));

spawns.push(new Spawner(3800, 1975, 350, 300, { type: 'rotatearoundparent', speed: 100, amount: 2, radius: 21, childId: 6, startAngle: 0, rotateSpeed: -4, rotateDist: 80, pushIndexOffset: 2 }));
spawns.push(new Spawner(3800, 1975, 350, 300, { type: 'rotatearoundparent', speed: 100, amount: 2, radius: 21, childId: 6, startAngle: Math.PI, rotateSpeed: -0.5, rotateDist: 80, pushIndexOffset: 2 }));

spawns.push(new Spawner(3800, 1975, 350, 300, { type: 'e2dasher', amount: 4, radius: 35, dashOffset: 0, randomDashOffset: 0.2, friction: 0.99, firstCooldown: 1.5, firstSpeed: 4, secondCooldown: 4, secondSpeed: 20, parentId: 6 }));*/
/*spawns.push(new Spawner(3800, 1950, 350, 350, { type: 'boomerang', amount: 1, radius: 35, speed: 0, throwCooldown: 0.08, x: 3975, y: 2100,
            throwAngle: 0,
            boomerangSpeed: 220,
            boomerangRadius: 14,
            shootAngles: [0,Math.PI/2,Math.PI,Math.PI*3/2]
}));*/
//obstacles.push(new CrowdButton(2200,1700,300,300,1,3,2));
//obstacles.push(new Door(2300,1550,50,50,1,true));
//obstacles.push(new PlayerCollide(2200,1700,300,300,100));
/*spawns.push(new Spawner(2250, 1500, 250, 250, { type: 'oval', amount: 1, radius: 15, radius2: 35, speed: 10, }));
spawns.push(new Spawner(2250, 1500, 250, 250, { type: 'oval', amount: 1, radius: 120, radius2: 10, speed: 0, }));
spawns.push(new Spawner(2250, 1500, 250, 250, { type: 'oval', amount: 1, radius: 80, radius2: 80, speed: 0, }));*/
//spawns.push(new Spawner(2250, 1500, 250, 250, { type: 'growingoval', amount: 3, radius: 80, radius2: 60, speed: 200, growSpeedX: 30, growSpeedY: 50, maxX: 120, maxY: 70, minX: 60, minY: 30, growingX: false, growingY: true, radiusOffset: 50, }));
//
// spawns.push(new Spawner(3800, 1950, 350, 350, { type: 'enemygrav', amount: 3, radius: 35, speed: 120, auraStrength: 0.1 }))
spawns.push(new Spawner(3800, 1950, 350, 350, { type: 'wind', amount: 12, radius: 40, speed: 200, strength: 20 }));
// obstacles.push(new Portal(2200, 2250, 50, "comet but it's pain", "cbip", "Exhausting", undefined));

obstacles.push(new NormalObstacle(2300, 2150, 550, 50));

//x, y, w, h, strength, effect, regenTime = 10
// obstacles.push(new BouncyBreakable(2550, 1700, 50, 50, 4, 30, 10));
/*obstacles.push(new BreakableObstacle(2600, 2000, 50, 50, 1, 0.1));
obstacles.push(new BreakableObstacle(2650, 2000, 50, 50, 1, 0.1));
*/
//sc
obstacles.push(new NormalObstacle(0, 2800, 2700, 50));
obstacles.push(new NormalObstacle(0, 2850, 2500, 2050));
obstacles.push(new NormalObstacle(2500, 3150, 300, 1850));
obstacles.push(new NormalObstacle(3000, 3650, 2000, 1350));
obstacles.push(new NormalObstacle(3450, 3050, 1550, 600));
obstacles.push(new NormalObstacle(1050, 1900, 50, 100));
obstacles.push(new TransObstacle(250, 1900, 850, 300, false, 1));
obstacles.push(new NormalObstacle(1000, 1900, 50, 100));

//COMET
//obstacles.push(new NormalObstacle(2800, 4250, 200, 750));
obstacles.push(new TransObstacle(2800, 3150, 200, 1850, false, 1));
obstacles.push(new TransObstacle(3000, 3200, 50, 50, false, 1));
// obstacles.push(new VinetteIncrease(2800, 3150, 200, 700, 0.1, 0.1, 200));
// obstacles.push(new VinetteIncrease(2800, 3850, 200, 100, 0.4, 0.4, 200));

obstacles.push(new NormalObstacle(2150, 2150, 50, 550));
obstacles.push(new NormalObstacle(2800, 2300, 5000, 750));
obstacles.push(new NormalObstacle(2500, 2800, 50, 350));
obstacles.push(new NormalObstacle(2500, 3100, 500, 50));
obstacles.push(new NormalObstacle(3000, 3100, 50, 100));
obstacles.push(new NormalObstacle(3000, 3250, 50, 350));

obstacles.push(new NormalObstacle(3000, 3600, 400, 50));
obstacles.push(new NormalObstacle(3400, 3000, 50, 650));
obstacles.push(new NormalObstacle(2800, 0, 550, 2150));
obstacles.push(new NormalObstacle(3350, 0, 1000, 1700));

obstacles.push(new NormalObstacle(3550, 1700, 50, 150));
obstacles.push(new NormalObstacle(3800, 1700, 350, 250));
obstacles.push(new NormalObstacle(4000, 0, 1000, 1000));
obstacles.push(new NormalObstacle(4750, 1000, 1000, 1300));
obstacles.push(new NormalObstacle(4350, 2100, 300, 200));
//posa
obstacles.push(new GravObstacle(4650, 2100, 100, 100, 'down', 1200));
// obstacles.push(
//     new Portal(
//         4650,
//         2200,
//         100,
//         'Planet of Speed Abuse',
//         'PoSA',
//         'Difficult',
//         0.2
//     )
// );

obstacles.push(
    new Portal(
        2700,
        1850,
        100,
        'Planet of Eternal Rightwards Motion',
        'PoERM',
        'Moderate',
        0.65
    )
);


obstacles.push(
    new Portal(
        2700,
        1700,
        100,
        'Planet of Quick Thinking',
        'PoQT',
        'Hardcore',
        0.55
    )
);

// obstacles.push(
//     new Portal(
//         2700,
//         1550,
//         100,
//         'Planet of Quick Thinking Remake',
//         'PoQT:R',
//         'Hardcore',
//         0.55
//     )
// );



obstacles.push(new NormalObstacle(3350, 1700, 100, 150));
obstacles.push(new NormalObstacle(3700, 1700, 100, 450));
obstacles.push(new NormalObstacle(3450, 2100, 350, 100));
obstacles.push(new NormalObstacle(4550, 1000, 450, 550));

obstacles.push(
    new Portal(
        3450,
        1700,
        100,
        'Planet of Inescapable Enemies',
        'PoIE',
        'Exhausting',
        0.5,
        '/sounds/cardplay.mp3'
    )
);
obstacles.push(
    new Portal(
        3600,
        1700,
        100,
        'Planet of Lost Sanity',
        'PoLS',
        'Relentless',
        0,
        '/sounds/local forecast.mp3'
    )
);
obstacles.push(
    new Portal(
        4350,
        1000,
        200,
        'Galaxy of Arduous Trials',
        'GoAT',
        'Hardcore',
        0.3,
        '/sounds/cool-friends.mp3'
    )
);
obstacles.push(
    new Portal(
        3300,
        3150,
        100,
        'Planet of Peaceful Beginning',
        'PoPB',
        'Peaceful',
        0.1,
        '/sounds/graze-the-roof.mp3'
    )
);
obstacles.push(
    new Portal(
        3050,
        3450,
        100,
        'Planet of Simple Challenges',
        'PoSC',
        'Peaceful',
        0.6,
        '/sounds/WarioWare Inc.mp3'
    )
);
obstacles.push(
    new Portal(
        2200,
        1075,
        100,
        'Planet of Slight Hurdles',
        'PoSH',
        'Moderate',
        0.9,
        '/sounds/black heat.mp3'
    )
);
obstacles.push(
    new Portal(
        2350,
        1225,
        100,
        'Minigames',
        'Minigames',
        'Peaceful',
        undefined,
        '/sounds/8 bit adventure.mp3'
    )
);
obstacles.push(
    new Portal(
        2350,
        1075,
        100,
        'Minigames3',
        'Minigames3',
        'Peaceful',
        undefined,
        '/sounds/brother johns farewell.mp3'
    )
);
obstacles.push(
    new Portal(
        2650,
        1225,
        100,
        'Minigames2',
        'Minigames2',
        'Peaceful',
        undefined,
        '/sounds/thats what it takes.mp3'
    )
);
obstacles.push(
    new Portal(
        3300,
        3450,
        100,
        'Planet of Slight Sadness',
        'PoSS',
        'Moderate',
        0.2,
        '/sounds/one-day.mp3'
    )
);
obstacles.push(
    new Portal(
        1400,
        2100,
        100,
        'Planet of Safezones',
        'PoS',
        'Moderate',
        0.2,
        '/sounds/how to train your dragon.mp3'
    )
);
obstacles.push(
    new Portal(
        1250,
        2100,
        100,
        'Planet of Conveyor Abuse',
        'PoCA',
        'Moderate',
        0.7,
        '/sounds/sunset city.mp3'
    )
);
obstacles.push(
    new Portal(
        1100,
        2100,
        100,
        'Planet of Wild Wasteland',
        'PoWW',
        'Difficult',
        0.3
    )
);
obstacles.push(
    new Portal(
        2400,
        4900,
        100,
        'Planet of Deadly Descent',
        'PoDD',
        'Agonizing',
        0,
        '/sounds/letGoOfFear.mp3'
    )
);
// obstacles.push(new Portal(0, 2100, 100, "Sandbox", "Sandbox", "Peaceful", 0, '/sounds/coffin-dance.mp3'));
obstacles.push(
    new Portal(
        2850,
        4150,
        100,
        'Comet of Mini Extra Tests',
        'CoMET',
        'Peaceful',
        1,
        '/sounds/drip.mp3'
    )
);
obstacles.push(new Portal(2800,3400, 100, 'Planet of Peaceful Origins', 'PoPO', 'Peaceful', 0.8, '/sounds/titlescreen-hat.mp3'));
obstacles.push(
    new Portal(
        2850,
        4900,
        100,
        'Comet of Mini Extra Tests Hard',
        'CoMET Hard',
        'Moderate',
        1,
        '/sounds/drip.mp3'
    )
);
obstacles.push(
    new Portal(
        0,
        2050,
        150,
        'Stellar System',
        'Stellar',
        'Moderate',
        undefined,
        '/sounds/heartache.mp3'
    )
);
obstacles.push(
    new Portal(
        2700,
        2450,
        100,
        'Planet of Everything',
        'PoE',
        'Relentless',
        undefined,
        '/sounds/turi ip ip ip.mp3' //'/sounds/one-day.mp3'
    )
);
obstacles.push(
    new Portal(
        2450,
        2700,
        100,
        'Planet of Claustrophobia',
        'PoC',
        'Hardcore',
        0.5,
        '/sounds/bonetrousle.mp3'
    )
);
obstacles.push(
    new Portal(
        2600,
        2700,
        100,
        'Planet of System Error',
        'PoSE',
        'Cataclysmic',
        0.1,
        '/sounds/shatter.mp3'
    )
);
obstacles.push(
    new Portal(
        2200,
        1225,
        100,
        'Zero Map Test',
        'ZMT',
        'Cataclysmic',
        undefined,
        '/sounds/bonetrousle.mp3'
    )
);
obstacles.push(
    new Portal(
        4650,
        2200,
        100,
        'Planet of Speed',
        'PoSPD',
        'Difficult',
        0.78,
        '/sounds/dead on arrival.mp3'
    )
);

obstacles.push(new CircularNormalObstacle(500, 2050, 100));
obstacles.push(new NormalObstacle(3250, 3050, 150, 100));
obstacles.push(new NormalObstacle(3250, 3250, 150, 150));
obstacles.push(new NormalObstacle(3250, 3400, 150, 50));
obstacles.push(new NormalObstacle(3050, 3550, 350, 50));
obstacles.push(new NormalObstacle(1800, 0, 350, 2650));
obstacles.push(new NormalObstacle(3050, 3250, 150, 50));
obstacles.push(
    new Portal(
        3050,
        3300,
        100,
        'Planet of the Vibing Vault',
        'PoVV',
        'Moderate',
        0.9,
        '/sounds/HolyWar.mp3'
    )
);
obstacles.push(
    new Portal(
        2150,
        0,
        50,
        'Planet of Perilous Platforming',
        'PoPP',
        'Difficult',
        0.6,
        '/sounds/mangdragora.mp3'
    )
);
obstacles.push(
    new Portal(
        2250,
        100,
        100,
        'Planet of Gun Abuse',
        'PoGA',
        'Difficult',
        0.4,
        '/sounds/the only thing they fear is u.mp3'
    )
);
obstacles.push(
    new Portal(
        2350,
        100,
        100,
        'Planet of Golf',
        'PoG',
        'Peaceful',
        0.8,
        '/sounds/Warm Nights.mp3'
    )
);
obstacles.push(
    new Portal(
        2500,
        -200,
        100,
        'Planet of Traditional Terrors',
        'PoTT',
        'Moderate',
        0.6,
        '/sounds/misplaced my keys.mp3'
    )
);
obstacles.push(
    new Portal(
        2350,
        -950,
        100,
        'Planet of Extreme Dexterity',
        'PoED',
        'Difficult',
        0.3,
        '/sounds/starry dream.mp3'
    )
); // to be moved to uni 2/3
obstacles.push(
    new Portal(
        2550,
        -950,
        100,
        'Planet of Sadistic and Ruthless Retribution',
        'PoSaRR',
        'Cataclysmic',
        0.9,
        '/sounds/shatter.mp3'
    )
);
obstacles.push(
    new Portal(
        2200,
        2600,
        69,
        'Planet of 3D',
        'Po3D',
        'Peaceful',
        2,
        '/sounds/HolyWar.mp3'
    )
);
//obstacles.push(new Portal(2550, -900, 100, "Planet of The Hazy Maze", "PoTHM", "Peaceful", 0, '/sounds/splicon.mp3'));// to be permanently removed or added as a complete joke map giving no reward
// yea ofc no reward
// at least comment it out ;-;
// like its juts more unique content not something for progression :rofl:
obstacles.push(new NormalObstacle(3050, 3400, 150, 50));
obstacles.push(new BreakableObstacle(3050, 3300, 150, 100, 10, 0.05));
obstacles.push(new NormalObstacle(0, 2200, 1650, 600));
obstacles.push(new NormalObstacle(0, 0, 1800, 1900));
obstacles.push(new NormalObstacle(1350, 2050, 50, 150));
obstacles.push(new NormalObstacle(1500, 2050, 50, 150));
obstacles.push(new NormalObstacle(1200, 2050, 50, 150));
obstacles.push(new NormalObstacle(1050, 2050, 50, 150));
obstacles.push(new NormalObstacle(950, 1900, 50, 250));
obstacles.push(new NormalObstacle(850, 1950, 50, 250));
obstacles.push(new NormalObstacle(750, 1900, 50, 250));
// obstacles.push(new NormalObstacle(4150, 2100, 200, 25));

obstacles.push(new NormalObstacle(4150, 2100, 200, 50));
obstacles.push(new NormalObstacle(4150, 2250, 200, 25));
obstacles.push(new NormalObstacle(4150, 2275, 200, 25));
obstacles.push(
    new Portal(
        4250,
        2150,
        100,
        'Planet of Intense Agony',
        'PoIA',
        'Exhausting',
        0.2,
        '/sounds/aiae.mp3'
    )
);
obstacles.push(
    new Portal(
        2500,
        1225,
        100,
        'Planet of Bear Induced Suffering',
        'PoBIS',
        'Exhausting',
        0.8
    )
);

obstacles.push(
    new Portal(
        2700,
        1950,
        100,
        'Planet of Trials of Survival',
        'PoTOS',
        'Relentless',
        0.3,
        '/sounds/howls moving castle.mp3'
    )
);

obstacles.push(
    new Portal(
        2700,
        1550,
        100,
        'Planet of Tower Defense',
        'PoTD',
        'Hardcore',
        0.8,
        '/sounds/deadchrome.mp3'
    )
);

obstacles.push(
    new Portal(
        2500,
        1950,
        100,
        'Planet of Looking Cool',
        'PoLC',
        'Peaceful',
        0.999,
        '/sounds/humanity.mp3'
    )
);


// texts.push(new Text(100, 2225, 'Nothing here, please leave...'));
//texts.push(new Text(250, 2275, 'Trust me. You\'re not ready.')); <- leaving this out will fool players to not check corner xD

obstacles.push(
    new Portal(
        2700,
        2050,
        100,
        'Planet of Deadly Descent: Revamp',
        'PoDD:R',
        'Agonizing',
        0,
        '/sounds/Death Note Dubstep.mp3'
    )
);
obstacles.push(
    new Portal(
        2500,
        2050,
        100,
        'Planet of Difficulty Chart',
        'PoDC',
        'Terrorizing',
        0.35,
        '/sounds/one last kiss.mp3'
    )
);

obstacles.push(
    new Portal(
        2350,
        2050,
        100,
        'Planet of Inspiration',
        'PoI',
        'Peaceful',
        0,
        '/sounds/aiae.mp3'
    )
);

obstacles.push(new Tp(15, 1915, 0, 0, 0, 5000));
obstacles.push(new Tp(3100, 2255, 50, 35, 2500, 2500));
obstacles.push(new Tp(3200, 2160, 50, 35, 2500, 2500));
obstacles.push(new Tp(3300, 2255, 50, 35, 2500, 2500));
obstacles.push(new Tp(2850, 2150, 500, 10, 2500, 2500));
obstacles.push(new Tp(2800, 2290, 1350, 10, 2500, 2500));
obstacles.push(new Tp(2970, 2150, 10, 60, 2500, 2500));
obstacles.push(new Tp(3800, 1950, 350, 10, 2500, 2500));
obstacles.push(new RotatingLava(4250, 1740, 600, 20, -160, 0));
obstacles.push(new RotatingLava(3150, 2175, 150, 20, -110, 0));
obstacles.push(new RotatingLava(2975, 2250, 200, 20, 110, 45));
obstacles.push(new RotatingLava(1650, 2365, 150, 10, 90, 0));
obstacles.push(new RotatingLava(1650, 2475, 150, 10, -90, 0));
obstacles.push(new RotatingLava(1650, 2585, 150, 10, 90, 0));
obstacles.push(new RotatingLava(1650, 2695, 150, 10, -90, 0));
obstacles.push(new RotatingLava(250, 4995, 200, 10, 240, 0));
obstacles.push(new RotatingLava(400, 4995, 200, 10, 240, 0));
obstacles.push(new RotatingLava(550, 4995, 200, 10, 240, 0));
obstacles.push(new RotatingLava(700, 4995, 200, 10, 240, 0));
obstacles.push(new RotatingLava(1000, 4995, 200, 10, 240, 0));
obstacles.push(new RotatingLava(1000, 4995, 200, 10, 240, 90));
obstacles.push(new RotatingLava(1000, 4995, 200, 10, 240, 45));
obstacles.push(new RotatingLava(1300, 4995, 400, 10, 240, 45));
obstacles.push(new RotatingLava(1800, 5015, 400, 10, 120, 0));
obstacles.push(new RotatingLava(1800, 5015, 400, 10, 120, 120));
obstacles.push(new RotatingLava(1800, 5015, 400, 10, 120, 60));
// obstacles.push(new Air(2300, -999, 500, 1000));

//obstacles.push(new TpTrap(2250, 1450, 450, 250, 5, 2500, 2500));
//obstacles.push(new WB(2200, 2150, 10, 550, 10, 80))

//TESTING NON CENTER PIVOT

/*obstacles.push(new RotatingSafe(2700, 1700, 200, 100, 50, 0, 2500, 1750))
obstacles.push(new RotatingLava(2600, 1700, 200, 100, 50, 30, 2500, 1750));
obstacles.push(new RotatingLava(2500, 1700, 200, 100, 50, 60, 2500, 1750))

obstacles.push(new RotatingTp(2700, 900, 100, 100, 120, 60, 2500, 2500, 2000, 950));*/

module.exports = hub;