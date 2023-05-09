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
    },
    coindoor: (obs, init) => {
        obs.maxCoins = toNumber(init.coins, 1);
        obs.coins = toNumber(init.coins, 1);
        obs.color = init.color ?? '#d6d611';
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
        if(obs.map === 'Hub'){obs.acronym = 'Hub';}
        const mapData = advanced.game.mapData[init.map ?? 'Winroom'];
        for(let i = 0; i < mapData.init.length; i++){
            if(mapData.init[i].type === 'settings'){
                obs.difficulty = ['Peaceful','Moderate','Difficult','Hardcore','Exhausting','Agonizing','Terrorizing','Cataclysmic','Grass','Undefined'].includes(mapData.init[i].difficulty) ? mapData.init[i].difficulty : 'Peaceful';
                obs.difficultyNumber = Math.max(0,Math.min(1,toNumber(mapData.init[i].difficultyNumber)));
                return;
            }
        }
        obs.difficulty = 'Peaceful';
    },
    changeColor: (obs, init) => {
        obs.colorsToChange = {
            background: toHex(init.backgroundColor,'#000000'),
            tile: toHex(init.tileColor,'#000000'),
            safe: toHex(init.safeColor,'#000000')
        };
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
                size: toNumber(init?.vinetteToChange?.outer?.size, 1),
                alpha: toNumber(init?.vinetteToChange?.outer?.alpha, 0.5)
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
    safe: (obs, init) => {},
    breakable: (obs, init) => {
        // all timings are in frames
        obs.strength = toNumber(init.maxStrength, 5);
        obs.maxStrength = toNumber(init.maxStrength, 5);
        obs.regenTime = toNumber(init.regenTime, 1E99);
        obs.lastBrokeTime = -1E99;
        obs.healSpeed = toNumber(init.healSpeed, 1E99);
    },
    tp: (obs, init) => {
        obs.tp = {x: toNumber(init.tp.x, 0), y: toNumber(init.tp.y, 0)};
    },
    // TODO: make the rest of these toNumber/ toHex/ toWhatever
    platformer: (obs, init) => {
        obs.platformerForce = init.platformerForce ?? 1;
        obs.platformerAngle = init.platformerAngle ?? 90;
        obs.platformerAngle *= Math.PI/180;
        obs.platformerAngleRotateSpeed = init.platformerAngleRotateSpeed ?? 0;
        obs.platformerAngleRotateSpeed *= Math.PI/180;
        obs.platformerFriction = init.platformerFriction ?? 0.875;

        obs.maxJumps = init.maxJumps ?? 1;// TODO: IMPLEMENT JUMPS
        obs.maxJumpCooldown = init.maxJumpCooldown ?? 30;// in ticks
        obs.jumpCooldown = obs.initJumpCooldown ?? obs.maxJumpCooldown;
        obs.jumpForce = init.jumpForce ?? 20;
        obs.jumpFriction = init.jumpFriction ?? 0.95;

        obs.initJumpInput = toString(init.jumpInput, 'undecided');
        obs.jumpInput = obs.initJumpInput === 'undecided' ? 'up' : obs.initJumpInput;
    },
    conveyor: (obs, init) => {
        obs.conveyorForce = init.conveyorForce ?? 0.3;
        obs.conveyorAngle = init.conveyorAngle ?? 0;
        obs.conveyorAngle *= Math.PI/180;
        obs.conveyorAngleRotateSpeed = init.conveyorAngleRotateSpeed ?? 0;
        obs.conveyorAngleRotateSpeed *= Math.PI/180;
        obs.conveyorFriction = init.conveyorFriction ?? 0.8;
    },
    rotateMovement: (obs, init) => {
        obs.axisSpeedMult = init.axisSpeedMult ?? 1;
        obs.rotateMovementAngle = init.rotateMovementAngle ?? 0;
        obs.rotateMovementAngle *= Math.PI/180;
        obs.rotateMovementAngleRotateSpeed = init.rotateMovementAngleRotateSpeed ?? 0;
        obs.rotateMovementAngleRotateSpeed *= Math.PI/180;
    },
    restrictAxis: (obs, init) => {
        obs.axisSpeedMults = init.axisSpeedMults ?? {x: 0, y: 1};
    },
    snapGrid: (obs, init) => {
        obs.toSnap = init.toSnap ?? {x: true, y: true};
        obs.snapDistance = init.snapDistance ?? {x: 50, y: 50};
        obs.maxSnapCooldown = init.snapCooldown ?? 40;
        obs.snapCooldown = obs.maxSnapCooldown;
        obs.snapAngle = init.snapAngle ?? 0;
        obs.snapAngle *= Math.PI/180;
        obs.snapAngleRotateSpeed = init.snapAngleRotateSpeed ?? 0;
        obs.snapAngleRotateSpeed *= Math.PI/180;
        obs.interpolatePlayerData = {};
        // obs.snapDistance.x = Math.max(35, obs.snapDistance.x);
        // obs.snapDistance.y = Math.max(35, obs.snapDistance.y);
        obs.snapToShowVelocity = Math.min(obs.snapDistance.x, obs.snapDistance.y) > 40;
        obs.snapMagnitude = init.snapMagnitude ?? (obs.snapDistance.x + obs.snapDistance.y)/2;
    }
};

function toBoolean(key, defaultValue=false){
    return (key !== false && key !== true) ? defaultValue : key;
}

function toNumber(num, defaultNumber=0){
    return Number.isFinite(num) ? num : defaultNumber;
}

function toString(str, defaultString="Hello World!"){
    return typeof str === 'string' ? str : defaultString;
}

function toHex(hex, defaultHex="#ff0000"){
    if(typeof hex !== 'string'){
        return defaultHex;
    }
    for(let i = 0; i < hex.length; i++){
        if(i === 0 && hex[i] === '#')continue;
        if(Number.isFinite(hex[i]) === true)continue;
        return defaultHex;
    }
    return hex;
}

module.exports = function initEffect(params, advanced) {
    let init = {};
    if(params.effect === undefined){
        console.error("Obstacle effects undefined! " + JSON.stringify(params)); return;
    }
    if(initEffectMap[params.effect] !== undefined){
        initEffectMap[params.effect](init, params, advanced);
    }
    return init;
}