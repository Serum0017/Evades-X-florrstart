const initEffectMap = {
    lava: (obs, init) => {
        obs.solid = toBoolean(init.solid, true);
    },
    bounce: (obs, init) => {
        obs.bounciness = toNumber(init.bounciness, 10);
        obs.friction = Math.min(1, toNumber(init.friction, 0.2));
    },
    coin: (obs, init) => {
        obs.collected = false;
        obs.color = init.color ?? '#d6d611';
        obs.coinAmount = toNumber(init.coinAmount, 1);
    },
    coindoor: (obs, init) => {
        obs.maxCoins = init.coins;
        obs.coins = init.coins;
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
        obs.colorsToChange = {background: init.backgroundColor, tile: init.tileColor, safe: init.safeColor};
    },
    breakable: (obs, init) => {
        // all timings are in frames
        obs.strength = init.maxStrength;
        obs.maxStrength = init.maxStrength;
        obs.regenTime = init.regenTime??1E99;
        obs.lastBrokeTime = -1E99;
        obs.healSpeed = init.healSpeed??1E99;
    },
    tp: (obs, init) => {
        obs.tp = {x: init.tp.x??0, y: init.tp.y??0};
    },
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
        obs.snapDistance.x = Math.max(35, obs.snapDistance.x);
        obs.snapDistance.y = Math.max(35, obs.snapDistance.y);
        obs.snapToShowVelocity = Math.min(obs.snapDistance.x, obs.snapDistance.y) > 40;
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