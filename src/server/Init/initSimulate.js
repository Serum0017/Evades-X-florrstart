const enemyFactory = require('./initEnemy.js');

const initSimulateMap = {
    normal: () => {},
    move: (obs, init) => {
        // init: {currentPoint, path, speed, alongWith }
        // TODO: make fractional path supported! we want fine control
		obs.currentPoint = init.currentPoint;
		obs.path = init.path;
		obs.speed = init.speed;
		// obs.top.x = obs.path[init.currentPoint][0];
		// obs.top.y = obs.path[init.currentPoint][1];
        // will fix later? idk

        let pointOn = obs.path[obs.currentPoint];
        obs.pointOn = {x: pointOn[0], y: pointOn[1]};
        
        let nextPointIndex = obs.currentPoint + 1;
        if (nextPointIndex >= obs.path.length) {
            nextPointIndex = 0;
        }
        
        let nextPoint = obs.path[nextPointIndex];
        obs.pointTo = { x: nextPoint[0], y: nextPoint[1] };
        let angle = Math.atan2(obs.pointTo.y - obs.pointOn.y, obs.pointTo.x - obs.pointOn.x);
        obs.xv = Math.cos(angle) * obs.speed;
        obs.yv = Math.sin(angle) * obs.speed;
    },
    enemy: (obs, init) => {
        //{type: 'circle-enemy-normal', bound: {x: 0, y: 0, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/}
        assign(obs, enemyFactory.initEnemy(init));
        obs.type = 'enemy';
        obs.enemyType = init.enemyType;
        obs.bound = {
            x: init.bound.x,
            y: init.bound.y,
            w: init.bound.w,
            h: init.bound.h
        };

        // if this is undefined it will be assigned later
        obs.x = init.x;
        obs.y = init.y;
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

module.exports = function initSimulate(params, advanced) {
    let init = {};// TODO: rethink if we should actually be assigning things twice or if we can just directly assign to obstacle once
    if(params.simulate === undefined || initSimulateMap[params.simulate] === undefined) {
        console.error("Obstacle simulate undefined! " + JSON.stringify(params)); return;
    }
    initSimulateMap[params.simulate](init, params, advanced);
    init.type = params.simulate;
    return init;
}