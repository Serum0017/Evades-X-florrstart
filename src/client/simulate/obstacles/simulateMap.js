import transformBody from './transformBody.js';
import effectMap from './effectMap.js';
import SimulateEnemy from './simulateEnemy.js';

const SimulateMap = {
    normal: () => {},
    
    move: (player, obstacle, other, timeStep=1) => {
        obstacle.x += obstacle.xv * timeStep;
        obstacle.y += obstacle.yv * timeStep;

        obstacle.timeRemain--;
        // let over = false;
        // if (Math.abs(obstacle.yv) > Math.abs(obstacle.xv)) {
        //     if (obstacle.pointTo.y > obstacle.pointOn.y) {
        //         if (obstacle.y > obstacle.pointTo.y) {
        //             over = true;
        //         }
        //     }
        //     else {
        //         if (obstacle.y < obstacle.pointTo.y) {
        //             over = true;
        //         }
        //     }
        // }
        // else {
        //     if (obstacle.pointTo.x > obstacle.pointOn.x) {
        //         if (obstacle.x > obstacle.pointTo.x) {
        //             over = true;
        //         }
        //     }
        //     else {
        //         if (obstacle.x < obstacle.pointTo.x) {
        //             over = true;
        //         }
        //     }
        // }
        if (/*over === true*/obstacle.timeRemain <= 0) {
            obstacle.currentPoint++;
            if (obstacle.currentPoint > obstacle.path.length - 1) {
                obstacle.currentPoint = 0;
            }
    
            // let timeRemain = Math.sqrt(Math.pow(obstacle.y - obstacle.pointTo.y, 2) + Math.pow(obstacle.x - obstacle.pointTo.x, 2))/obstacle.speed;
            
            obstacle.pointOn = obstacle.path[obstacle.currentPoint];
    
            // snapping back to the point that we should be on
            obstacle.x += obstacle.xv * obstacle.timeRemain;
            obstacle.y += obstacle.yv * obstacle.timeRemain;
    
            let nextPointIndex = obstacle.currentPoint + 1;
            if (nextPointIndex >= obstacle.path.length) {
                nextPointIndex = 0;
            }
            
            obstacle.pointTo = obstacle.path[nextPointIndex];
    
            let angle = Math.atan2(obstacle.pointTo.y - obstacle.pointOn.y, obstacle.pointTo.x - obstacle.pointOn.x);
            obstacle.xv = Math.cos(angle) * obstacle.speed;
            obstacle.yv = Math.sin(angle) * obstacle.speed;
            // SimulateMap.move(player, obstacle, {}, timeRemain);

            // distance / speed
            obstacle.timeRemain = Math.sqrt((obstacle.pointOn.x - obstacle.pointTo.x)**2 + (obstacle.pointOn.y - obstacle.pointTo.y)**2) / obstacle.speed;
        }
    },

    rotate: (player, obstacle, other) => {
        obstacle.rotation += obstacle.rotateSpeed;
    },

    enemy: (player, obstacle, other) => {
        SimulateEnemy(player, obstacle, other);
    }
};

export default function Simulate(player, o, other){
    // const last = {x: o.x, y: o.y, rotation: o.rotation, pivot: o.pivot/*TODO*/};
    if(o.simulate.length !== 1 || o.simulate[0] !== 'normal'){
        const bound = o.body.getBoundingBox();
        o.x = bound.pos.x + bound.w/2;
        o.y = bound.pos.y + bound.h/2;
        o.difference = {x: bound.w, y: bound.h};
    }
    
    const last = {x: o.x, y: o.y, rotation: o.rotation};

    for(let i = 0; i < o.simulate.length; i++){
        SimulateMap[o.simulate[i]](player, o, other);
    }
    
    effectMap.runIdleEffects(player, o, other);
    
    transformBody(o, { x: o.x-last.x, y: o.y-last.y, rotation: o.rotation-last.rotation });
}