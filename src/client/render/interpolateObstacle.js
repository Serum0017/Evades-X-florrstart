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
    }
}

function interpolateKey(key, interpolate, last, next, time){
    interpolate[key] = linearInterpolate(last[key], next[key], time);
}

function interpolateAngleKey(key, interpolate, last, next, time){
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

export default function interpolateObstacle(last, next, time/*0-1*/, advanced){
    // every obstacle interpolates position
    const interpolate = {
        x: last.x * (1 - time) + next.x * time,
        y: last.y * (1 - time) + next.y * time,
        rotation: interpolateDirection(last.rotation, next.rotation, time)
    };

    // interpolate extra things if needed
    if(interpolateMap.shape[last.shape] !== undefined){
        interpolateMap.shape[last.shape](interpolate, last, next, time, advanced);
    }

    for(let i = 0; i < last.simulate.length; i++){
        if(interpolateMap.simulate[last.simulate[i]] !== undefined){
            interpolateMap.simulate[last.simulate[i]](interpolate, last, next, time, advanced);
        }
    }

    if(interpolateMap.effect[last.effect] !== undefined){
        interpolateMap.effect[last.effect](interpolate, last, next, time, advanced);
    }

    return interpolate;
}