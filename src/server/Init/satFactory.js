// SATFactory.generateSAT.square(x,y,w,h);
// TODO: remove sat file and replace once internet is back
const SAT = require('../SAT.js');//require('sat');

class SATFactory {
    constructor() {
        this.generateSAT = {
            square: ({ x,y,w,h }) => {
                return new SAT.Box(new SAT.Vector(x-w/2, y-h/2), w, h).toPolygon();
            },
            circle: ({ x,y,radius }) => {
                return new SAT.Circle(new SAT.Vector(x, y), radius);
            },
            poly: ({ points }) => {
                return new SAT.Polygon(new SAT.Vector(), [...points.map((p) => new SAT.Vector(p[0], p[1]))]);
            }
        };
        this.generateDimensions = {
            square: ({ x=0,y=0,w=0,h=0 }) => {
                return {
                    top: {x: x-w/2, y: y-h/2},
                    bottom: {x: x+w/2, y: y+h/2},
                };
            },
            circle: ({ x=0,y=0,radius=0 }) => {
                return {
                    top: {x: x-radius, y: y-radius},
                    bottom: {x: x+radius, y: y+radius},
                };
            },
            poly: ({ points }) => {
                var top, right, bottom, left;
                top = right = bottom = left = null;
                for(let [x, y] of points){
                    x = x ?? 0;
                    y = y ?? 0;
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
                    top: {x: left, y: top},
                    bottom: {x: right, y: bottom},
                };
            }
        };
        this.transform = {
            poly: (o, { x,y }) => {
                for(let p of o.points){
                    p[0] += x;
                    p[1] += y;
                }
            }
        };
    }
}

const factory = new SATFactory();

function generateSAT(params) {
    return factory.generateSAT[params.shape](params);
}

function generateDimensions(params){
    return factory.generateDimensions[params.shape](params);
}

function transformBody(obstacle, delta){
    obstacle.top.x += delta.x;
    obstacle.top.y += delta.y;
    obstacle.bottom.x += delta.x;
    obstacle.bottom.y += delta.y;
    // no need to create new sats every frame :)
    obstacle.sat.setOffset(new SAT.Vector(obstacle.sat.offset.x+delta.x, obstacle.sat.offset.y+delta.y));
    if(factory.transform[obstacle.shape] !== undefined){
        factory.transform[obstacle.shape](obstacle,delta);
    }
}

module.exports = { generateSAT, generateDimensions, transformBody };