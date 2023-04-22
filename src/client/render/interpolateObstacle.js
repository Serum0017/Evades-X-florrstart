const interpolateMap = {
    shape: {
        
    },
    simulate: {

    }, 
    effect: {
        breakable: (interpolate, last, next, time) => {
            interpolateKey('strength', interpolate, last, next, time);
        }
    }
}

function interpolateKey(key, interpolate, last, next, time){
    interpolate[key] = linearInterpolate(last[key], next[key], time);
}

function linearInterpolate(start, end, time) {
    return start * (1 - time) + end * time;
}

// if amount is 1/8, then we get 1/8 closer to the target every frame
function expLerp(start, end, amount){
    const difference = end-start;
    return start + difference*amount;
}

function interpolateDirection(d1, d2, angleIncrement) {
    let dir;
    let dif = d1-d2;
    let angleDif = Math.atan2(Math.sin(dif), Math.cos(dif));
    if (Math.abs(angleDif) >= angleIncrement*clamp(0,10000,Math.abs(angleDif)**0.6*0.55)) {
        if (angleDif < 0) {
            dir = 1;
        } else {
            dir = -1;
        }
    } else {
        // we're close enough to snap
        return d1 ? interpolateLinearDirection(d1, d2, 0.1) : d2;
    }
    return d1 + dir*angleIncrement*clamp(0,10000,Math.abs(angleDif)**0.6*0.55);
}

function interpolateFixedDirection(d1, d2, angleIncrement) {
    let dir;
    let dif = d1-d2;
    let angleDif = Math.atan2(Math.sin(dif), Math.cos(dif));
    if (Math.abs(angleDif) >= angleIncrement) {
        if (angleDif < 0) {
            dir = 1;
        } else {
            dir = -1;
        }
    } else {
        return d1 ? interpolateLinearDirection(d1, d2, 0.1) : d2;
    }
    return d1 + dir*angleIncrement;
}

export default function interpolateObstacle(last, next, time/*0-1*/, advanced){
    // every obstacle interpolates position
    const interpolate = {
        x: last.x * (1 - time) + next.x * time,
        y: last.y * (1 - time) + next.y * time
    };

    // interpolate extra things if needed
    if(interpolateMap.shape[last.shape] !== undefined){
        interpolateMap.shape[last.shape](interpolate, last, next, time, advanced);
    }

    if(interpolateMap.simulate[last.simulate] !== undefined){
        interpolateMap.simulate[last.simulate](interpolate, last, next, time, advanced);
    }

    if(interpolateMap.effect[last.effect] !== undefined){
        interpolateMap.effect[last.effect](interpolate, last, next, time, advanced);
    }

    return interpolate;
}