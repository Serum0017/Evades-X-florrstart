// recreating the sat given the old sat
function generateSAT(body, obstacle){
    let sat;
    if(obstacle.shape === 'poly'){
        sat = new SAT.Polygon(new SAT.Vector());
        initPolySAT(sat, body);
    } else if(obstacle.shape === 'circle'){
        sat = new SAT.Circle(new SAT.Vector());
        initCircleSAT(sat, body);
    }

    return sat;
}

function initCircleSAT(sat, init) {
    sat.pos = toVec(init.pos);
    sat.offset = toVec(init.offset);
    sat.angle = init.angle;
    sat.r = init.r;
}

function initPolySAT(sat, init) {
    sat.angle = init.angle;
    sat.offset = toVec(init.offset);
    sat.points = toArrayVec(init.points);
    sat.calcPoints = toArrayVec(init.calcPoints);
    sat.edges = toArrayVec(init.edges);
    sat.normals = toArrayVec(init.normals);
    sat.pos = toVec(init.pos);
}

function toVec({x, y}){
    return new SAT.Vector(x, y);
}

function toArrayVec(array){
    return array.map(vec => new SAT.Vector(vec.x, vec.y));
}

export default {generateSAT};