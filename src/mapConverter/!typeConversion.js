const Obstacles = require('./!conversionClasses.js');

class Spawner{
    constructor(){}
};
class Safe{
    constructor(){}
};
class Text{
    constructor(){}
};

const supportedObjects = {
	'spawner': Spawner,
	'turret': Spawner,
	'square': Spawner,
	'switch': Spawner,
	'flashlight': Spawner,
	'enemymove': Spawner,
	
	'normal': Obstacles.NormalObstacle,
	'lava': Obstacles.Lava,
	'safe': Safe,
	'winpad': Obstacles.Winpad,
	'rotate-lava': Obstacles.RotatingLava,
	'rotate-normal': Obstacles.RotatingNormal,
	'rotate-tp': Obstacles.RotatingTp,
	'rotatingsafe': Obstacles.RotatingSafe,
	'tp': Obstacles.Tp,
	'text': Text,
	'coin': Obstacles.Coin,
	'coindoor': Obstacles.CoinDoor,
	'trans': Obstacles.TransObstacle,
	'check': Obstacles.Checkpoint,
	'bounce': Obstacles.BouncyObstacle,
	'grav': Obstacles.GravObstacle,
	'push': Obstacles.Pusher,
	'timetrap': Obstacles.TimeTrap,
	'breakable': Obstacles.BreakableObstacle,
	'circle-normal': Obstacles.CircularNormalObstacle,
	'circle-lava': Obstacles.CircularLavaObstacle,
	'circle-safe': Obstacles.CircularSafeObstacle,
	'circle-tp': Obstacles.CircularTpObstacle,
	'circle-hollow': Obstacles.CircularHollowObstacle,
	'circle-slice': Obstacles.CircularSliceObstacle,
	'circle-hollow-slice': Obstacles.CircularHollowSlice,
	'color': Obstacles.ColorChange,
	'lavamove': Obstacles.MovingLavaObstacle,
	'move': Obstacles.MovingObstacle,
	'movingsafe': Obstacles.MovingSafe,
	'tpmove': Obstacles.MovingTpObstacle,
	'portal': Obstacles.Portal,
	'typing': Obstacles.Typing,
	'speed': Obstacles.SpeedObstacle,
	'size': Obstacles.SizePlayer,
	'poly': Obstacles.Polygon,
	'mark': Obstacles.Deathmark,
	'cure': Obstacles.Deathcure,
	'poly-lava': Obstacles.Polygon,
	'poly-safe': Obstacles.Polygon,
	'poly-tp': Obstacles.Polygon,
	'zone': Obstacles.Zone,
	'platformer': Obstacles.PlatformerGrav,
	'raxis': Obstacles.RestrictAxis,
	'block': Obstacles.Block,
	'ship': Obstacles.Ship,
	'musicchange': Obstacles.MusicChange,
	'playercollide': Obstacles.PlayerCollide,
	'pushbox': Obstacles.Pushbox,
	'circularpushbox': Obstacles.CircularPushbox,
	'roundedcorners': Obstacles.RoundedCorners,
	'roundedlava': Obstacles.RoundedLava,
	'circle-coin': Obstacles.CircularCoin,
	
	'grapplepoint': Obstacles.GrapplePoint,

	'invpu': Obstacles.InvincibilityPowerup,
	'grpu': Obstacles.GrapplePowerup,
	'snap': Obstacles.SnapGrid,
	'vinette': Obstacles.VinetteIncrease,
	'tornado': Obstacles.Tornado,

	'door': Obstacles.Door,
	'button': Obstacles.Button,
	'mashing': Obstacles.Mashing,
	'bbutton': Obstacles.BoxButton,
	'circle-sentry': Obstacles.Sentry,
	'tptrap': Obstacles.TpTrap,
	'movinggrapplepoint': Obstacles.MovingGrapplePoint,
	'oval': Obstacles.Oval,
	'lava-oval': Obstacles.LavaOval,
	'resetcoins': Obstacles.ResetCoins,
	'switchlava': Obstacles.SwitchLava,
	'switchnormal': Obstacles.SwitchObstacle,
	'fulldeath': Obstacles.FullDeath,
	'morphbutton': Obstacles.MorphButton,
	'morphnormal': Obstacles.MorphObstacle,
	'morphbuttontimed': Obstacles.MorphButtonTimed,
	'morphmove': Obstacles.MorphMoving,
	'directionnormal': Obstacles.directionNormal,
	'pushboxreset': Obstacles.PushboxResetButton,
	'z-mode': Obstacles.ZMode,
}

const mappedPara = {
	'spawner': ['x', 'y', 'w', 'h', 'spawnData'],
	'turret': ['x', 'y', 'w', 'h', 'spawnData'],
	'square': ['x', 'y', 'w', 'h', 'spawnData'],
	'switch': ['x', 'y', 'w', 'h', 'spawnData'],
	'flashlight': ['x', 'y', 'w', 'h', 'spawnData'],
	'enemymove': ['x', 'y', 'w', 'h', 'spawnData'],
	
	'normal': ['x', 'y', 'w', 'h', 'canJump', 'angle'],
	'lava': ['x', 'y', 'w', 'h', 'canCollide', 'angle'],
	'safe': ['x', 'y', 'w', 'h', 'renderAbove'],
	'winpad': ['x', 'y', 'w', 'h'],
	'rotate-lava': ['x', 'y', 'w', 'h', 'rotateSpeed', 'angle', 'pivotX', 'pivotY', 'distToPivot', 'canCollide'],
	'rotate-normal': ['x', 'y', 'w', 'h', 'rotateSpeed', 'angle', 'pivotX', 'pivotY', 'distToPivot', 'canCollide'],
	'rotatingsafe': ['x', 'y', 'w', 'h', 'rotateSpeed', 'angle', 'pivotX', 'pivotY', 'distToPivot', 'canCollide'],
	'rotate-tp': ['x', 'y', 'w', 'h', 'rotateSpeed', 'angle', 'tpx', 'tpy', 'pivotX', 'pivotY', 'distToPivot', 'canCollide'],
	'tp': ['x', 'y', 'w', 'h', 'tpx', 'tpy', 'bgColor', 'tileColor', 'changeColor'],
	'text': ['x', 'y', 'text', 'story', 'size', 'angle'],
	'coin': ['x', 'y', 'w', 'h'],
	'coindoor': ['x', 'y', 'w', 'h', 'coins'],
	'trans': ['x', 'y', 'w', 'h', 'collide', 'opaq'],
	'check': ['x', 'y', 'w', 'h'],
	'bounce': ['x', 'y', 'w', 'h', 'effect'],
	'grav': ['x', 'y', 'w', 'h', 'direction', 'force'],
	'push': ['x', 'y', 'w', 'h', 'direction', 'max', 'pushBack'],
	'timetrap': ['x', 'y', 'w', 'h', 'maxTime'],
	'breakable': ['x', 'y', 'w', 'h', 'strength', 'time', 'regenTime'],
	'circle-normal': ['x', 'y', 'radius'],
	'circle-lava': ['x', 'y', 'radius'],
	'circle-safe': ['x', 'y', 'radius'],
	'circle-tp': ['x', 'y', 'radius', 'tpx', 'tpy'],
	'circle-hollow': ['x', 'y', 'r', 'innerRadius'],
	'color': ['x', 'y', 'w', 'h', 'bgColor', 'tileColor'],
	'lavamove': ['w', 'h', 'points', 'speed', 'currentPoint', 'collidable'],
	'move': ['w', 'h', 'points', 'speed', 'currentPoint', 'alongWith'],
	'tpmove': ['w', 'h', 'points', 'speed', 'currentPoint', 'tpx', 'tpy'], 
	'movingsafe': ['w', 'h', 'points', 'speed', 'currentPoint'],
	'portal': ['x', 'y', 'size', 'name', 'acronym', 'difficulty', 'difficultyNumber', 'musicPath'],
	'typing': ['x', 'y', 'w', 'h', 'text'],
	'speed': ['x', 'y', 'w', 'h', 'speedInc'],
	'size': ['x', 'y', 'w', 'h', 'size'],
	'poly': ['points', 'type'],
	'poly-lava': ['points', 'type'],
	'poly-safe': ['points', 'type'],
	'poly-tp': ['points', 'type', 'tpx', 'tpy'],
	'mark': ['x', 'y', 'w', 'h', 'time'],
	'cure': ['x', 'y', 'w', 'h'],
	'zone': ['x', 'y', 'w', 'h', 'data'],
	'platformer': ['x', 'y', 'w', 'h', 'direction', 'jumpHeight', 'force'],
	'raxis': ['x', 'y', 'w', 'h', 'rx', 'ry'],
	'block': ['x', 'y', 'w', 'h', 'color'],
	'ship': ['x', 'y', 'w', 'h', 'state'],
	'circle-slice': ['x', 'y', 'r', 'startAngle', 'endAngle'],
	'circle-hollow-slice': ['x', 'y', 'r', 'startAngle', 'endAngle', 'innerRadius', 'rotateSpeed'],
	'musicchange': ['x', 'y', 'w', 'h', 'musicPath'],
	'playercollide': ['x', 'y', 'w', 'h', 'bounciness'],
	'pushbox': ['x', 'y', 'w', 'h', 'weight', 'resetId'],
	'circularpushbox': ['x', 'y', 'r', 'weight', 'resetId'],
	'roundedcorners': ['x', 'y', 'w', 'h', 'roundRadius'],
	'roundedlava': ['x', 'y', 'w', 'h', 'roundRadius'],
	'grapplepoint': ['x', 'y'],
	'circle-coin': ['x', 'y', 'r'],
	'snap': ['x', 'y', 'w', 'h', 'snapX', 'snapY', 'snapDistance', 'snapWait'],

	'invpu': ['x', 'y', 'w', 'h', 'amount'],
	'grpu': ['x', 'y', 'w', 'h', 'state'],
	'vinette': ['x', 'y', 'w', 'h', 'innerRadius', 'outerRadius', 'opacity'], 
	'tornado': ['x', 'y', 'w', 'h', 'spinRadius'],
	'door': ['x', 'y', 'w', 'h', 'id', 'active'],
	'button': ['x', 'y', 'w', 'h', 'id'],
	'mashing': ['x', 'y', 'w', 'h', 'amount'],
	'bbutton': ['x', 'y', 'w', 'h', 'id'],
	'circle-sentry': ['x', 'y', 'r', 'lw', 'lh', 'speed', 'rest'],
	'tptrap': ['x', 'y', 'w', 'h', 'maxTime', 'tpx', 'tpy'],
	'movinggrapplepoint': ['points', 'speed', 'currentPoint'],
	'oval': ['x', 'y', 'r0', 'r1'],
	'lava-oval': ['x', 'y', 'r0', 'r1'],
	'resetcoins': ['x', 'y', 'w', 'h'],
	'switchlava': ['x', 'y', 'w', 'h', 'offTime', 'onTime', 'state', 'offset'],
	'switchnormal': ['x', 'y', 'w', 'h', 'offTime', 'onTime', 'state', 'offset'],
	'fulldeath': ['x', 'y', 'w', 'h'],
	'morphbutton': ['x', 'y','w', 'h', 'id'],
	'morphnormal': ['x', 'y', 'w', 'h', 'morphId', 'active'],
	'morphbuttontimed': ['x', 'y', 'w', 'h', 'id', 'time'],
	'morphmove': ['w', 'h', 'points', 'speed', 'currentPoint', 'morphId'],
	'dirnormal': ['x', 'y', 'w', 'h', 'direction'],
	'pushboxreset': ['x', 'y', 'w', 'h', 'resetId'],
	'z-mode': ['x', 'y', 'w', 'h', 'state'],
}

module.exports = {
    supportedObjects,
    mappedPara
}