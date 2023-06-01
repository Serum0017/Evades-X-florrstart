let canvas;
if(typeof window === 'undefined'){
    var { registerFont, createCanvas } = require('canvas');
    registerFont('./src/shared/init/inter.ttf', { family: 'Inter' });
    canvas = createCanvas(1,1);
} else {
    canvas = document.getElementById('canvas');
}
if(typeof require !== 'undefined'){
    var {toBoolean, toNumber, toString, toHex, toStructure} = require('./convertType.js');
} else {
    var {toBoolean, toNumber, toString, toHex, toStructure} = window.typeConverter;
}

const ctx = canvas.getContext('2d');

// SATFactory.generateSAT.circle(x,y,r);
var SAT = SAT ?? require('sat');

const SATMap = {
    square: ({ x,y,w,h }) => {
        return new SAT.Box(new SAT.Vector(x-w/2, y-h/2), w, h).toPolygon();
    },
    circle: ({ x,y,r }) => {
        return new SAT.Circle(new SAT.Vector(x, y), r);
    },
    poly: ({ points,x,y }) => {
        return new SAT.Polygon(new SAT.Vector(), [...points.map((p) => new SAT.Vector(p[0] + x, p[1] + y))]);
    },
    oval: ({ x,y,rw,rh }) => {
        const points = [];
        const angleIncrement = Math.PI*2/(Math.max(3,rw/25)*Math.max(3,rh/25));
        const cornerAngles = [Math.PI/2, Math.PI, Math.PI*3/2];
        points.push([rw, 0]);// top
        for(let a = 0; a < Math.PI*2; a += angleIncrement){// TODO: enable poly debug rendering to test if this actually works
            points.push([Math.cos(a) * rw, Math.sin(a) * rh]);
            if(cornerAngles[0] && a < cornerAngles[0] && a+angleIncrement > cornerAngles[0]){
                points.push([Math.cos(cornerAngles[0]) * rw, Math.sin(cornerAngles[0]) * rh])
                points.shift();
            }
        }
        return new SAT.Polygon(new SAT.Vector(), [...points.map((p) => new SAT.Vector(p[0] + x, p[1] + y))]);
    },
    text: ({ x,y,text,fontSize }) => {
        ctx.font = `${fontSize}px Inter`;
        const textMeasurements = ctx.measureText(text);
        const w = textMeasurements.width;
        const h = textMeasurements.actualBoundingBoxAscent;
        return new SAT.Box(new SAT.Vector(x, y), w, h).toPolygon();
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

SAT.Circle.prototype['setAngle'] = function (angle) {
    this.pos.rotate(angle-this.angle);
    this.angle = angle;
}

function generateBody(obstacle) {
    const init = {};
    init.body = SATMap[obstacle.shape](obstacle);

    obstacle.pivot = {x: obstacle.pivot?.x ?? obstacle.x, y: obstacle.pivot?.y ?? obstacle.y};
    obstacle.rotation = obstacle.rotation ?? 0;
    init.body.angle = obstacle.rotation ?? 0;

    init.body.translate(-obstacle.pivot.x,-obstacle.pivot.y);
    init.body.setOffset(new SAT.Vector(obstacle.pivot.x, obstacle.pivot.y));

    init.body.setAngle(/*obstacle.rotation ?? */0);// TODO: replace with math.atan2 calc
    init.body.rotate(obstacle.rotation);

    if(obstacle.shape === 'square'){
        init.shape = 'poly';
        init.renderFlag = 'square';// TODO: actually do this render optimization
    } else if(obstacle.shape === 'oval'){
        init.shape = 'poly';
        init.renderFlag = 'oval';
    }

    console.log(obstacle, init.body);

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
        w = toNumber(w, 50);
        h = toNumber(h, 50);

        return {difference: {x: w, y: h}};
    },
    circle: ({ r }) => {
        r = toNumber(r, 25);

        return {difference: {x: r*2, y: r*2}};
    },
    poly: ({ points }) => {
        points = toStructure({type: "array", minLength: 2, sub: {type: "array", sub: {type: "number"}}}, points, [[100, 0], [200, 0], [150, 75]]);

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
            difference: {x: right - left, y: bottom - top},
            // x: (left + right)/2,
            // y: (bottom + top)/2
        };
    },
    oval: ({ rw, rh }) => {
        rw = toNumber(rw, 50);
        rh = toNumber(rh, 25);

        return {difference: {x: rw*2, y: rh*2}};
    },
    text: ({ text,fontSize }) => {
        text = toString(text, `Evades ${Math.ceil(Math.random()*10) === 10 ? 'X' : Math.random()*10}`);
        fontSize = toNumber(fontSize, 32);

        ctx.font = `${fontSize}px Inter`;
        const textMeasurements = ctx.measureText(text);
        return {difference: {x: textMeasurements.width, y: textMeasurements.actualBoundingBoxAscent}};
    },
}

function generateDimensions(obstacle){
    obstacle.x = toNumber(obstacle.x);
    obstacle.y = toNumber(obstacle.y);
    if(!DimensionsMap[obstacle.shape])console.log('dimensionMap not defined for: ' + JSON.stringify(obstacle.shape));
    return DimensionsMap[obstacle.shape](obstacle);
}

if(typeof module !== 'undefined'){
    module.exports = {generateBody, generateDimensions};
} else {
    window.satFactory = {generateBody, generateDimensions};
}