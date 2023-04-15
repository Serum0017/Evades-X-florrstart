const satFactory = require('../../Init/satFactory.js');
const effectMap = require('./effectMap.js');

const SimulateEnemy = require('./simulateEnemy.js');

const SimulateMap = {
    normal: () => {},
    
    move: (player, obstacle, other, timeStep=1) => {
        obstacle.x += obstacle.xv * timeStep;
        obstacle.y += obstacle.yv * timeStep;
        let over = false;
        if (Math.abs(obstacle.yv) > Math.abs(obstacle.xv)) {
            if (obstacle.pointTo.y > obstacle.pointOn.y) {
                if (obstacle.y > obstacle.pointTo.y) {
                    over = true;
                }
            }
            else {
                if (obstacle.y < obstacle.pointTo.y) {
                    over = true;
                }
            }
        }
        else {
            if (obstacle.pointTo.x > obstacle.pointOn.x) {
                if (obstacle.x > obstacle.pointTo.x) {
                    over = true;
                }
            }
            else {
                if (obstacle.x < obstacle.pointTo.x) {
                    over = true;
                }
            }
        }
        if (over === true) {
            obstacle.currentPoint++;
            if (obstacle.currentPoint > obstacle.path.length - 1) {
                obstacle.currentPoint = 0;
            }
    
            let timeRemain = Math.sqrt(Math.pow(obstacle.y - obstacle.pointTo.y, 2) + Math.pow(obstacle.x - obstacle.pointTo.x, 2))/obstacle.speed;
            
            let pointOn = obstacle.path[obstacle.currentPoint];
            obstacle.pointOn = {x: pointOn[0], y: pointOn[1]};
    
            obstacle.x = obstacle.pointOn.x;
            obstacle.y = obstacle.pointOn.y;
    
            let nextPointIndex = obstacle.currentPoint + 1;
            if (nextPointIndex >= obstacle.path.length) {
                nextPointIndex = 0;
            }
            let nextPoint = obstacle.path[nextPointIndex];
            obstacle.pointTo = { x: nextPoint[0], y: nextPoint[1] };
    
            let angle = Math.atan2(obstacle.pointTo.y - obstacle.pointOn.y, obstacle.pointTo.x - obstacle.pointOn.x);
            obstacle.xv = Math.cos(angle) * obstacle.speed;
            obstacle.yv = Math.sin(angle) * obstacle.speed;
            SimulateMap.move(player, obstacle, {}, 1);
        }
    },

    enemy: (player, obstacle, other) => {
        SimulateEnemy(player, obstacle, other);
    }
};

module.exports = function Simulate(player, o, other){
    const last = {x: o.x, y: o.y};
    SimulateMap[o.simulate](player, o, other);
    effectMap.runIdleEffects(player, o, other);
    if(last.x !== o.x || last.y !== o.y){
        satFactory.transformBody(o, /*positional delta: */{ x: o.x-last.x, y: o.y-last.y });
    }
}