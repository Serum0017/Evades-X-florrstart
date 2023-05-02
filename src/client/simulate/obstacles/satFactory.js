// IMPORTANT: make sure to copy any changes made to this map to the server sided satFactory.js
const generateSATMap = {
    square: ({ x,y,w,h }) => {
        return new SAT.Box(new SAT.Vector(x-w/2, y-h/2), w, h).toPolygon();
    },
    circle: ({ x,y,r }) => {
        return new SAT.Circle(new SAT.Vector(x, y), r);
    },
    poly: ({ points }) => {
        return new SAT.Polygon(new SAT.Vector(), [...points.map((p) => new SAT.Vector(p[0], p[1]))]);
    }
};

function generateSAT(obstacle){
    let sat = generateSATMap[obstacle.shape](obstacle);

    sat.angle = obstacle.body.angle;
    sat.pos = new SAT.Vector(obstacle.body.pos.x, obstacle.body.pos.y);
    sat.offset = new SAT.Vector(obstacle.body.offset.x, obstacle.body.offset.y);

    if(sat._recalc !== undefined)sat._recalc();

    return sat;
}

export default {generateSAT};