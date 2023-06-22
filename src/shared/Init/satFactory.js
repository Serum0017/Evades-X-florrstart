let canvas;
if(typeof window === 'undefined'){
    var { registerFont, createCanvas } = require('canvas');
    registerFont('./src/shared/init/inter.ttf', { family: 'Inter' });
    canvas = createCanvas(1,1);
} else {
    canvas = document.createElement('canvas');
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
        // TODO: investigate if this is actually needed or not
        points = toStructure({type: "array", minLength: 2, sub: {type: "array", sub: {type: "number"}}}, points, [[100, 0], [200, 0], [150, 75]]);

        var top, right, bottom, left;
        top = right = bottom = left = null;
        for(let [px, py] of points){
            if(px < left || left === null){
                left = px;
            }
            if(px > right || right === null){
                right = px;
            }
            if(py > bottom || bottom === null){
                bottom = py;
            }
            if(py < top || top === null){
                top = py;
            }
        }

        const middle = {
            x: (right + left)/2,
            y: (top + bottom)/2
        };

        return new SAT.Polygon(new SAT.Vector(), [...points.map((p) => new SAT.Vector(p[0] + x - middle.x, p[1] + y - middle.y))]).addOffset(middle);
    },
    oval: ({ x,y,rw,rh }) => {
        const points = [];
        const angleIncrement = Math.PI*2/(Math.max(4,rw/25)*Math.max(4,rh/25));
        const cornerAngles = [Math.PI/2, Math.PI, Math.PI*3/2];
        points.push([rw, 0]);// top
        for(let a = 0; a < Math.PI*2; a += angleIncrement){// TODO: maybe make a smarter algorithm to put more points at the edges
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
        return new SAT.Box(new SAT.Vector(x-w/2, y-h/2), w, h).toPolygon();
    }
};

SAT.Circle.prototype['translate'] = function (x, y) {
    this.pos.x += x;
    this.pos.y += y;
}

SAT.Circle.prototype['rotate'] = function (angle) {
    this.angle += angle;
    this.pos.rotate(this.angle);
}

SAT.Circle.prototype['setAngle'] = function (angle) {
    this.pos.rotate(angle-this.angle);
    this.angle = angle;
}

SAT.Circle.prototype['addOffset'] = function (v) {
    return this.setOffset(new SAT.Vector(v.x + this.offset.x, v.y + this.offset.y));
}

SAT.Polygon.prototype['addOffset'] = function (v) {
    return this.setOffset(new SAT.Vector(v.x + this.offset.x, v.y + this.offset.y));
}

SAT.Polygon.prototype['getBoundingBox'] = function () {
    var points = this['calcPoints'];
    var len = points.length;
    var xMin = points[0]['x'];
    var yMin = points[0]['y'];
    var xMax = points[0]['x'];
    var yMax = points[0]['y'];
    for (var i = 1; i < len; i++) {
      var point = points[i];
      if (point['x'] < xMin) {
        xMin = point['x'];
      }
      else if (point['x'] > xMax) {
        xMax = point['x'];
      }
      if (point['y'] < yMin) {
        yMin = point['y'];
      }
      else if (point['y'] > yMax) {
        yMax = point['y'];
      }
    }
    return new SAT.Box(this['pos'].clone().add(new SAT.Vector(xMin, yMin)), xMax - xMin, yMax - yMin);
  };
  
  SAT.Circle.prototype['getBoundingBox'] = function () {
    var r = this['r'];
    var corner = this['pos'].clone().add(this['offset']).sub(new SAT.Vector(r, r));
    return new SAT.Box(corner, r * 2, r * 2);
  };

function generateBody(obstacle) {
    const init = {};
    init.body = SATMap[obstacle.shape](obstacle);

    obstacle.pivot = {x: toNumber(obstacle?.pivot?.x, obstacle.x), y: toNumber(obstacle?.pivot?.y, obstacle.y)};
    obstacle.rotation = toNumber(obstacle.rotation);

    init.body.translate(-obstacle.pivot.x,-obstacle.pivot.y);
    init.body.addOffset(new SAT.Vector(obstacle.pivot.x, obstacle.pivot.y));

    init.body.angle = 0;
    init.body.rotate(obstacle.rotation);

    // init.body.setAngle(/*obstacle.rotation ?? */0);// TODO: replace with math.atan2 calc
    init.initialShape = obstacle.shape;
    if(obstacle.shape === 'square'){
        init.shape = 'poly';
        init.renderFlag = 'square';// TODO: actually do this render optimization
    } else if(obstacle.shape === 'oval'){
        init.shape = 'poly';
        init.renderFlag = 'oval';
    }

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

// this function is slower but is needed for rotations
function generateRotatedDimensions(obstacle){
    const rotatedBody = generateBody(obstacle).body;
    if(obstacle.renderFlag !== undefined){
        obstacle.shape = obstacle.renderFlag;
        delete obstacle.renderFlag;
    }
    const boundingBox = rotatedBody.getBoundingBox();
    return {difference: {x: boundingBox.w, y: boundingBox.h}};
}

function generateDimensions(obstacle){
    obstacle.x = toNumber(obstacle.x);
    obstacle.y = toNumber(obstacle.y);
    if(obstacle.rotation === 0){
        if(!DimensionsMap[obstacle.shape])console.log('dimensionMap not defined for: ' + JSON.stringify(obstacle.shape));
        return DimensionsMap[obstacle.shape](obstacle);
    } else {
        return generateRotatedDimensions(obstacle);
    }
}

if(typeof module !== 'undefined'){
    module.exports = {generateBody, generateDimensions};
} else {
    window.satFactory = {generateBody, generateDimensions};
}