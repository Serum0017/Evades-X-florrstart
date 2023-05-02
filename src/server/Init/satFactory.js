// SATFactory.generateSAT.square(x,y,w,h);
const SAT = require('sat');//require('sat');

const SATMap = {
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

SAT.Circle.prototype['translate'] = function (x, y) {
    this.pos.x += x;
    this.pos.y += y;
}

SAT.Circle.prototype['rotate'] = function (angle) {
    this.angle += angle;
    this.pos.rotate(angle);
}

function generateBody(obstacle) {
    const init = {};
    init.body = SATMap[obstacle.shape](obstacle);
    obstacle.pivot = {x: obstacle.pivot?.x ?? obstacle.x, y: obstacle.pivot?.y ?? obstacle.y};
    // initPivot(init.body, obstacle.pivot);
    init.body.angle = obstacle.rotation ?? 0;// TODO: replace with math.atan2 calc

    init.body.translate(-obstacle.pivot.x,-obstacle.pivot.y);
    init.body.setOffset(new SAT.Vector(obstacle.pivot.x, obstacle.pivot.y));

    init.body.rotate(init.body.angle);

    return init;
}

// SCRAPPED - we should only do this on client side
// function initPivot(body, pivot){
//     if(body.translate !== undefined){
//         body.translate(-pivot.x,-pivot.x);
//         body.setOffset(new SAT.Vector(pivot.x, pivot.y));
//     } else {
//         // body.pos.x -= pivot.x;
//         // body.pos.y -= pivot.y;
//         body.setOffset(new SAT.Vector(pivot.x, pivot.y));
//         body.rotate = (angle) => {
//             let nextAngle = Math.atan2(this.offset.y, this.offset.x) + angle;
//             let magnitude = Math.sqrt(this.offset.y**2, this.offset.x**2);
//             this.setOffset(new SAT.Vector(Math.cos(nextAngle) * magnitude, Math.sin(nextAngle) * magnitude));
//         }
//         body.angle = 0;// not defined on circles so might as well do it here
//     }
// }

const DimensionsMap = {
    square: ({w, h}) => {
        return {difference: {x: w, y: h}};
    },
    circle: ({ r }) => {
        return {difference: {x: r*2, y: r*2}};
    },
    poly: ({ points }) => {
        var top, right, bottom, left;
        top = right = bottom = left = null;
        for(let [x, y] of points){
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

        return {
            difference: {x: left - right, y: bottom - top},
            x: (left + right)/2,
            y: (bottom + top)/2
        };
    }
}

function generateDimensions(obstacle){
    return DimensionsMap[obstacle.shape](obstacle);
}

module.exports = {generateBody, generateDimensions};