var satFactory = satFactory ?? require('./satFactory.js');
if(typeof require !== 'undefined'){
    var {toBoolean, toNumber, toString, toHex, toStructure} = require('./convertType.js');
} else {
    var {toBoolean, toNumber, toString, toHex, toStructure} = window.typeConverter;
}


const initEffectMap = {
    lava: (obs, init) => {
        obs.solid = toBoolean(init.solid, true);
    },
    bounce: (obs, init) => {
        obs.bounciness = toNumber(init.bounciness, 10);
        obs.friction = toNumber(init.friction, 0.2);
    },
    coin: (obs, init) => {
        obs.collected = false;
        obs.color = init.color ?? '#d6d611';
        obs.coinAmount = toNumber(init.coinAmount, 1);
        obs.parametersToReset = {
            collected: false
        };
    },
    coindoor: (obs, init) => {
        obs.maxCoins = toNumber(init.coins, 1);
        obs.coins = toNumber(init.coins, 1);
        obs.color = init.color ?? '#d6d611';
        obs.parametersToReset = {
            coins: obs.maxCoins
        };
    },
    // TODO: make sure all of these are safe for any input (same for other files)
    changeMap: (obs, init, advanced) => {
        obs.map = toString(init.map, 'Winroom');
        obs.acronym = '';
        for(let i = 0; i < obs.map.length-1; i++) {
            if(obs.map[i] === ' '){
                obs.acronym += obs.map[i+1];
            } else if(i === 0){
                obs.acronym += obs.map[0];
            }
        }
        if(advanced === undefined){
            // editor
            obs.difficulty = 'Peaceful';
            obs.difficultyNumber = 0;
            obs.map = 'Winroom';
            obs.acronym = 'W';
            return;
        }
        if(obs.map === 'Hub'){obs.acronym = 'Hub';}
        const mapData = advanced.game.mapData[obs.map] ?? advanced.game.mapData.Winroom;
        if(mapData.init === undefined){console.log('Portal points to an invalid map! initEffect.js.' + JSON.stringify(obs)); return;}
        for(let i = 0; i < mapData.init.length; i++){
            if(mapData.init[i].type === 'settings'){
                obs.difficulty = ['Peaceful','Moderate','Difficult','Hardcore','Exhausting','Agonizing','Terrorizing','Cataclysmic','Grass','Undefined'].includes(mapData.init[i].difficulty) ? mapData.init[i].difficulty : 'Peaceful';
                obs.difficultyNumber = Math.max(0,Math.min(1,toNumber(mapData.init[i].difficultyNumber,0.5)));
                return;
            }
        }
        obs.difficulty = 'Peaceful';
    },
    changeColor: (obs, init) => {
        obs.colorsToChange = {
            tile: toHex(init?.colorsToChange?.tile, '#0d0d0d'),// the stroke and outside of arena
            background: toHex(init?.colorsToChange?.background, '#383838'),// the fillcolor
            safe: toHex(init?.colorsToChange?.safe, '#8c8c8c'),// the safe
        }
    },
    changeSpeed: (obs, init) => {
        obs.speedMult = toNumber(init.speedMult, 1.5);
    },
    changeRadius: (obs, init) => {
        obs.radiusMult = toNumber(init.radiusMult, 0.5);
    },
    changeFriction: (obs, init) => {
        // changes player movement friction, not those applied to it
        obs.frictionValue = toNumber(init.frictionValue, 0.9);
    },
    changeVinette: (obs, init) => {
        obs.vinetteToChange = {
            outer:  {
                color: {
                    r: toNumber(init?.vinetteToChange?.outer?.color?.r, 0),
                    g: toNumber(init?.vinetteToChange?.outer?.color?.g, 0),
                    b: toNumber(init?.vinetteToChange?.outer?.color?.b, 0)
                },
                size: toNumber(init?.vinetteToChange?.outer?.size, /*1*/0.8),
                alpha: toNumber(init?.vinetteToChange?.outer?.alpha, /*0.5*/1)
            },
            inner:  {
                color: {
                    r: toNumber(init?.vinetteToChange?.inner?.color?.r, 0),
                    g: toNumber(init?.vinetteToChange?.inner?.color?.g, 0),
                    b: toNumber(init?.vinetteToChange?.inner?.color?.b, 0)
                },
                size: toNumber(init?.vinetteToChange?.inner?.size, 0.5),
                alpha: toNumber(init?.vinetteToChange?.inner?.alpha, 0)
            },
        }
    },
    changeShape: (obs, init) => {
        obs.shapeType = init.shapeType;
        if(['square','poly','circle'].includes(obs.shapeType) === false){
            obs.shapeType = 'poly';
        }
        if(obs.shapeType === 'square'){
            obs.shapeWidth = Math.abs(toNumber(init.shapeWidth, 50));
            obs.shapeHeight = Math.abs(toNumber(init.shapeHeight, 50));
            obs.shapePoints = [
                {x: 0, y: 0},
                {x: obs.shapeWidth, y: 0},
                {x: obs.shapeWidth, y: obs.shapeHeight},
                {x: 0, y: obs.shapeHeight},
            ];
            obs.shapeType = 'poly';
        } else if(obs.shapeType === 'poly'){
            // obs.shapePoints = init.shapePoints ?? [{x: 0, y: -50},{x: 40, y: 30},{x: -40, y: 30}];
            obs.shapePoints = toStructure({type: 'array', sub: {type: "object", keys: {x: {type: 'number'}, y: {type: 'number'}}}}, init.shapePoints, [{x: 0, y: -50},{x: 40, y: 30},{x: -40, y: 30}]);
        } else if(obs.shapeType === 'circle'){
            obs.r = Math.abs(toNumber(init.shapeRadius,24.5));
        }
        if(obs.shapePoints !== undefined){
            var top, right, bottom, left;
            top = right = bottom = left = null;
            for(let {x,y} of obs.shapePoints){
                if(x < left || left === null){
                    left = x;
                }
                if(x > right || right === null){
                    right = x;
                }
                if(y > bottom || bottom === null){
                    bottom = y;
                }
                if(y < top || top === null){
                    top = y;
                }
            }
            const middle = {
                x: (left+right)/2,
                y: (top+bottom)/2,
            };

            // making them all fit in the bounding box
            for(let i = 0; i < obs.shapePoints.length; i++){
                obs.shapePoints[i].x -= middle.x;
                obs.shapePoints[i].y -= middle.y;
            }
        }
    },
    safe: (obs, init) => {},
    checkpoint: (obs, init) => {
        obs.collected = false;
        obs.checkpointOffset = {
            x: toNumber(init?.checkpointOffset?.x, 0),
            y: toNumber(init?.checkpointOffset?.y, 0)
        }
        obs.parametersToReset = {
            collected: false
        };
    },
    breakable: (obs, init) => {
        // all timings are in frames
        obs.maxStrength = toNumber(init.maxStrength, 60);
        obs.strength = obs.maxStrength;
        obs.regenTime = toNumber(init.regenTime, 1E99);
        obs.lastBrokeTime = -1E99;
        obs.healSpeed = toNumber(init.healSpeed, 1E99);
    },
    tp: (obs, init) => {
        obs.tp = {x: toNumber(init?.tp?.x, 0), y: toNumber(init?.tp?.y, 0)};
    },
    customRender: (obs, init) => {
        obs.opacity = toNumber(init.opacity, 0.5);
        obs.collidable = toBoolean(init.collidable, true);
        obs.color = toHex(init.color, 'tileColor');
        obs.toDrawImage = toBoolean(init.toDrawImage, false);
        obs.imageUrl = toString(init.imageUrl, 'https://i1.sndcdn.com/artworks-Uii8SMJvNPxy8ePA-romBoQ-t500x500.jpg');// TODO: research if letting user pick arbitrary url is safe
    },
    platformer: (obs, init) => {
        obs.platformerForce = toNumber(init.platformerForce, 1);
        obs.platformerAngle = toNumber(init.platformerAngle, 90);
        obs.platformerAngle *= Math.PI/180;
        obs.platformerAngleRotateSpeed = toNumber(init.platformerAngleRotateSpeed, 0);
        obs.platformerAngleRotateSpeed *= Math.PI/180;
        obs.platformerFriction = toNumber(init.platformerFriction, 0.875);

        obs.maxJumps = toNumber(init.maxJumps, 1);// TODO: IMPLEMENT JUMPS. also TODO: add a preserve jump parameter that makes jumps conserve even if you are not bounded that frame. If disabled, platformer only lets you jump when you're on a plat THAT FRAME
        obs.maxJumpCooldown = toNumber(init.maxJumpCooldown, 30);// in ticks
        obs.jumpCooldown = toNumber(obs.initJumpCooldown, 0);
        obs.jumpForce = toNumber(init.jumpForce, 20);
        obs.jumpFriction = toNumber(init.jumpFriction, 0.95);

        obs.initJumpInput = toString(init.jumpInput, 'undecided');
        obs.jumpInput = obs.initJumpInput === 'undecided' ? 'up' : obs.initJumpInput;
    },
    conveyor: (obs, init) => {
        obs.conveyorForce = toNumber(init.conveyorForce, 0.3);
        obs.conveyorAngle = toNumber(init.conveyorAngle, 0);
        obs.conveyorAngle *= Math.PI/180;
        obs.conveyorAngleRotateSpeed = toNumber(init.conveyorAngleRotateSpeed, 0);
        obs.conveyorAngleRotateSpeed *= Math.PI/180;
        obs.conveyorFriction = toNumber(init.conveyorFriction, 0.8);
    },
    hole: (obs, init) => {
        // TODO: add specific obs ids to apply hole to
    },
    rotateMovement: (obs, init) => {
        obs.axisSpeedMult = toNumber(init.axisSpeedMult, 1);
        obs.rotateMovementAngle = toNumber(init.rotateMovementAngle, 45);
        obs.rotateMovementAngle *= Math.PI/180;
        obs.rotateMovementAngleRotateSpeed = toNumber(init.rotateMovementAngleRotateSpeed, 0);
        obs.rotateMovementAngleRotateSpeed *= Math.PI/180;
    },
    restrictAxis: (obs, init) => {
        obs.axisSpeedMults = {
            x: toNumber(init?.axisSpeedMults?.x, 0),
            y: toNumber(init?.axisSpeedMults?.y, 1)
        }
    },
    snapGrid: (obs, init) => {
        obs.toSnap = {
            x: toBoolean(init?.toSnap?.x, true),
            y: toBoolean(init?.toSnap?.y, true)
        }
        obs.snapDistance = {
            x: toNumber(init?.snapDistance?.x, 50),
            y: toNumber(init?.snapDistance?.y, 50)
        }
        obs.maxSnapCooldown = toNumber(init.snapCooldown, 40);
        obs.snapCooldown = obs.maxSnapCooldown;
        obs.snapAngle = toNumber(init.snapAngle, 0);
        obs.snapAngle *= Math.PI/180;
        obs.snapAngleRotateSpeed = toNumber(init.snapAngleRotateSpeed, 0);
        obs.snapAngleRotateSpeed *= Math.PI/180;
        obs.interpolatePlayerData = {};
        // obs.snapDistance.x = Math.max(35, obs.snapDistance.x);
        // obs.snapDistance.y = Math.max(35, obs.snapDistance.y);
        obs.snapToShowVelocity = Math.min(obs.snapDistance.x, obs.snapDistance.y) > 40;
        obs.snapMagnitude = toNumber(init.snapMagnitude, (obs.snapDistance.x + obs.snapDistance.y)/2);
    },
    timeTrap: (obs, init) => {
        obs.timeTrapMaxTime = toNumber(init.timeTrapMaxTime, 300);
        obs.timeTrapTime = obs.timeTrapMaxTime;
        obs.timeTrapRecoverySpeed = toNumber(init.timeTrapRecoverySpeed, 1);
        obs.timeTrapToKill = toBoolean(init.timeTrapToKill, true);
        obs.timeTrapToShowTenth = toBoolean(init.timeTrapToShowTenth, false);
    },
};

function initEffect(params, advanced) {
    let init = {};
    if(params.effect === undefined){
        console.error("Obstacle effects undefined! " + JSON.stringify(params)); return;
    }
    if(initEffectMap[params.effect] !== undefined){
        initEffectMap[params.effect](init, params, advanced);
    }
    return init;
}

if(typeof module !== 'undefined'){
    module.exports = initEffect;
} else {
    window.initEffect = initEffect;
    window.initEffectMap = initEffectMap;
}