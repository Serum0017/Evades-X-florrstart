var initEnemy = initEnemy ?? require('./initEnemy.js');
if(typeof require !== 'undefined'){
    var {toBoolean, toNumber, toString, toHex, toStructure} = require('./convertType.js');
} else {
    var {toBoolean, toNumber, toString, toHex, toStructure} = window.typeConverter;
}

const initSimulateMap = {
    normal: () => {},
    move: (obs, init) => {
        // init: {currentPoint, path, speed, alongWith }
		obs.currentPoint = Math.floor(toNumber(init.currentPoint));
		obs.path = toStructure({type: 'array', sub: {type: "object", keys: {x: {type: 'number'}, y: {type: 'number'}}}}, init.path, [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}]);
        if(obs.currentPoint >= obs.path.length){
            obs.currentPoint = 0;
        }
		obs.speed = toNumber(init.speed, 1);// TODO: variable speed at each point, can be specified in the object or else defaults to the obs.speed instead of obs.point[i].speed
		// obs.top.x = obs.path[init.currentPoint][0];
		// obs.top.y = obs.path[init.currentPoint][1];
        // will fix later? idk

        obs.pointOn = obs.path[obs.currentPoint];
        
        let nextPointIndex = obs.currentPoint + 1;
        if (nextPointIndex >= obs.path.length) {
            nextPointIndex = 0;
        }
        
        obs.pointTo = obs.path[nextPointIndex];
        let angle = Math.atan2(obs.pointTo.y - obs.pointOn.y, obs.pointTo.x - obs.pointOn.x);
        obs.xv = Math.cos(angle) * obs.speed;
        obs.yv = Math.sin(angle) * obs.speed;

        obs.timeRemain = Math.sqrt((obs.pointOn.x - obs.pointTo.x)**2 + (obs.pointOn.y - obs.pointTo.y)**2) / obs.speed;

        const fractionalPointOffset = toNumber(init.currentPoint, 0) % 1;
        if(fractionalPointOffset !== 0){
            obs.timeRemain *= 1 - fractionalPointOffset;// 0.8 of the way there means timeRemain should be divided by 5
            obs.x = obs.pointOn.x * (1 - fractionalPointOffset) + fractionalPointOffset * obs.pointTo.x;
            obs.y = obs.pointOn.y * (1 - fractionalPointOffset) + fractionalPointOffset * obs.pointTo.y;
        } else {
            obs.x = obs.pointOn.x;
            obs.y = obs.pointOn.y;
        }
        obs.x = toNumber(init.x, obs.x);
        obs.y = toNumber(init.y, obs.y);
    },
    rotate: (obs, init) => {
        // init.x and y are the midpoint
		obs.rotateSpeed = toNumber(init.rotateSpeed, 1);
        if(init.refresh === undefined)obs.rotateSpeed *= Math.PI/180;
    },
    enemy: (obs, init) => {
        //{type: 'circle-enemy-normal', bound: {x: 0, y: 0, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/}
        init.enemyType = toString(init.enemyType,"normal").split(',');
        obs.enemyType = init.enemyType;// TODO: check if invalid enemy types can be inputted
        
        assign(obs, initEnemy(init));
    }
};

function assign(prev, next){
    for(let key in next){
        prev[key] = next[key];
    }
}

function assignIfUndefined(v1, v2){
    if(v1 === undefined){ v1 = v2; }
}

function initSimulate(params, advanced) {
    let init = {};// TODO: rethink if we should actually be assigning things twice or if we can just directly assign to obstacle once
    if(Array.isArray(params.simulate) === false) {
        console.error("Obstacle simulate is not an array! " + JSON.stringify(params)); return;
    }

    for(let i = 0; i < params.simulate.length; i++){
        if(initSimulateMap[params.simulate[i]] === undefined){console.error("Obstacle simulate map undefined! " + JSON.stringify(params)); return;}
        initSimulateMap[params.simulate[i]](init, params, advanced);
    }

    return init;
}

if(typeof module !== 'undefined'){
    module.exports = initSimulate;
} else {
    window.initSimulate = initSimulate;
    window.initSimulateMap = initSimulateMap;
}