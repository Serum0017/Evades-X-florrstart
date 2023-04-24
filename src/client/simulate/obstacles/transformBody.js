// IMPORTANT: if any changes are made, make sure to copy them to the client simulateMap file as well
const transformMap = {
    square: (o, { rotation }) => {
        o.sat.rotate(rotation);
    },
    circle: (o, { rotation }) => {
    },
    poly: (o, { x,y,rotation }) => {
        for(let p of o.points){
            p[0] += x;
            p[1] += y;
        }
        o.sat.rotate(rotation);
    }
};

function recalculateBoundingBox(obstacle, sat, delta){
    // from calcpoints of the sat
    if(sat.calcPoints !== undefined){
        // polygon
        var top, right, bottom, left;
        top = right = bottom = left = null;
        for(let {x, y} of sat.calcPoints){
            if(x < left || left === null){
                left = x;
            }
            if(x > right || right === null){
                right = x;
            }
            if(y > bottom || bottom === null){
                bottom = y;
            }
            if(y < top || top === null){
                top = y;
            }
        }
        const last = {x: obstacle.x, y: obstacle.y};
        obstacle.top = {x: left, y: top};
        obstacle.bottom = {x: right, y: bottom};

        obstacle.difference = {x: obstacle.bottom.x - obstacle.top.x, y: obstacle.bottom.y - obstacle.top.y}
        
        obstacle.x = (obstacle.top.x + obstacle.bottom.x)/2;
        obstacle.y = (obstacle.top.y + obstacle.bottom.y)/2;

        // delta.x += obstacle.x - last.x;
        // delta.y += obstacle.y - last.y;
    } else {
        // circle
        const last = {x: obstacle.x, y: obstacle.y};
        obstacle.top = {x: sat.offset.x+sat.pos.x-obstacle.difference.x/2, y: sat.offset.y+sat.pos.y-obstacle.difference.x/2};
        obstacle.bottom = {x: sat.offset.x+sat.pos.x+obstacle.difference.x/2, y: sat.offset.y+sat.pos.y+obstacle.difference.x/2};
        
        obstacle.x = (obstacle.top.x + obstacle.bottom.x)/2;
        obstacle.y = (obstacle.top.y + obstacle.bottom.y)/2;

        // delta.x += obstacle.x - last.x;
        // delta.y += obstacle.y - last.y;
    }
}

function transformBody(obstacle, delta){
    obstacle.top.x += delta.x;
    obstacle.top.y += delta.y;
    obstacle.bottom.x += delta.x;
    obstacle.bottom.y += delta.y;

    // no need to create new sats every frame :)
    // console.log(obstacle);
    obstacle.sat.setOffset(new SAT.Vector(obstacle.sat.offset.x+delta.x, obstacle.sat.offset.y+delta.y));
    if(delta.angle !== 0){
        recalculateBoundingBox(obstacle, obstacle.sat, delta);
    }
    runTransformMap(obstacle, delta);
}

function runTransformMap(obstacle, delta){
    if(transformMap[obstacle.shape] !== undefined){
        transformMap[obstacle.shape](obstacle,delta);
    }
}

function setPivot(obstacle){
    if(obstacle.sat.translate !== undefined){
        obstacle.sat.translate(-obstacle.pivot.x,-obstacle.pivot.x);
        obstacle.sat.setOffset(new SAT.Vector(obstacle.pivot.x, obstacle.pivot.y));
    }
    return { rotation: obstacle.rotation ?? 0 };
}

export default {transformBody, runTransformMap, setPivot};