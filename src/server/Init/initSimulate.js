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
        obs.type = 'enemy';
        obs.enemyType = init.enemyType;
        obs.bound = {
            x: init.bound.x,
            y: init.bound.y,
            w: init.bound.w,
            h: init.bound.h
        };
        obs.x ||= init.x;
        obs.y ||= init.y;
    }
};

module.exports = function initSimulate(params) {
    let init = {};
    if(params.simulate === undefined || initSimulateMap[params.simulate] === undefined) {
        console.error("Obstacle simulate undefined! " + JSON.stringify(params)); return;
    }
    initSimulateMap[params.simulate](init, params);
    init.type = params.simulate;
    return init;
}