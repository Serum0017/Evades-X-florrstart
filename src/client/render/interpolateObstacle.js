const interpolateMap = {
    shape: {
        
    },
    simulate: {

    }, 
    effect: {
        breakable: (interpolate, last, next, time) => {
            interpolateKey('strength', interpolate, last, next, time);
        },
        platformer: (interpolate, last, next, time) => {
            interpolateAngleKey('platformerAngle', interpolate, last, next, time);
        },
        conveyor: (interpolate, last, next, time) => {
            interpolateAngleKey('conveyorAngle', interpolate, last, next, time);
        },
        rotateMovement: (interpolate, last, next, time) => {
            interpolateAngleKey('rotateMovementAngle', interpolate, last, next, time);
        },
        snapGrid: (interpolate, last, next, time) => {
            interpolateAngleKey('snapCooldown', interpolate, last, next, time);
            interpolateAngleKey('snapAngle', interpolate, last, next, time);
        },
    }
}

let interpolateKey;
let interpolateAngleKey;

const interpolateKeysMap = {
    shape: {},
    simulate: {},
    effect: {/*breakable: ['strength']*/}
}

function calculateInterpolateKeysMap() {
    interpolateKey = (keyName, type, objectName) => {
        if(interpolateKeysMap[type][objectName] === undefined){
            interpolateKeysMap[type][objectName] = [];
        }
        interpolateKeysMap[type][objectName].push(keyName);
    }
    interpolateAngleKey = interpolateKey;
    for(let key in interpolateMap.shape){
        interpolateMap.shape[key]('shape', key);
    }
    for(let key in interpolateMap.simulate){
        interpolateMap.simulate[key]('simulate', key);
    }
    for(let key in interpolateMap.effect){
        interpolateMap.effect[key]('effect', key);
    }
}
calculateInterpolateKeysMap();

interpolateKey = (key, interpolate, last, next, time) => {
    interpolate[key] = linearInterpolate(last[key], next[key], time);
}

interpolateAngleKey = (key, interpolate, last, next, time) => {
    interpolate[key] = interpolateDirection(last[key], next[key], time);
}

function linearInterpolate(start, end, time) {
    return start * (1 - time) + end * time;
}

// if amount is 1/8, then we get 1/8 closer to the target every frame
function expLerp(start, end, amount){
    return start + (end-start)*amount;
}

function shortAngleDist(a0,a1) {
    var max = Math.PI*2;
    var da = (a1 - a0) % max;
    return 2*da % max - da;
}

function interpolateDirection(d1, d2, time) {
    return d1 + shortAngleDist(d1, d2) * time;
}

// function interpolateDirection(d1, d2, time) {
//     let dir;
//     let dif = d1 - d2;
//     let angleDif = Math.atan2(Math.sin(dif), Math.cos(dif));
//     if (Math.abs(angleDif) >= dif) {
//         if (angleDif < 0) {
//             dir = 1;
//         } else {
//             dir = -1;
//         }
//     } else {
//         dir = angleDif / time;
//     }
//     return d1 + dif * dir;
// };
function createInterpolateState(last){
    last.lastState = {
        x: last.x,
        y: last.y,
        rotation: last.rotation
    }

    // interpolate extra things if needed
    if(interpolateMap.shape[last.shape] !== undefined){
        for(let i = 0; i < interpolateKeysMap.shape[last.shape].length; i++){
            const key = interpolateKeysMap.shape[last.shape][i]
            last.lastState[key] = last[key];
        }
    }

    for(let j = 0; j < last.simulate.length; j++){
        if(interpolateMap.simulate[last.simulate[j]] !== undefined){
            for(let i = 0; i < interpolateKeysMap.simulate[last.simulate[j]].length; i++){
                const key = interpolateKeysMap.simulate[last.simulate[j]][i];
                last.lastState[key] = last[key];
            }
        }
    }

    if(interpolateMap.effect[last.effect] !== undefined){
        for(let i = 0; i < interpolateKeysMap.effect[last.effect].length; i++){
            const key = interpolateKeysMap.effect[last.effect][i];
            last.lastState[key] = last[key];
        }
    }
}

function interpolateObstacle(last, next, time/*0-1*/, advanced){
    // every obstacle interpolates position
    const interpolate = {
        x: last.x * (1 - time) + next.x * time,
        y: last.y * (1 - time) + next.y * time,
        rotation: interpolateDirection(last.rotation, next.rotation, time)
    };

    // interpolate extra things if needed
    if(interpolateMap.shape[next.shape] !== undefined){
        interpolateMap.shape[next.shape](interpolate, last, next, time, advanced);
    }

    for(let i = 0; i < next.simulate.length; i++){
        if(interpolateMap.simulate[next.simulate[i]] !== undefined){
            interpolateMap.simulate[next.simulate[i]](interpolate, last, next, time, advanced);
        }
    }

    if(interpolateMap.effect[next.effect] !== undefined){
        interpolateMap.effect[next.effect](interpolate, last, next, time, advanced);
    }

    return interpolate;
}

export default { interpolateObstacle, createInterpolateState };