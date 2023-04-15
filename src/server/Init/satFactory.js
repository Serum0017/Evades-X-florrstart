// SATFactory.generateSAT.square(x,y,w,h);
// TODO: remove sat file and replace once internet is back
const SAT = require('sat');//require('sat');

class SATFactory {
    constructor() {
        // IMPORTANT: make sure to copy any changes made to this.generateSAT to the client sided satFactory.js
        this.generateSAT = {
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
        this.generateDimensions = {
            square: ({ x=0,y=0,w=0,h=0 }) => {
                return {
                    top: {x: x-w/2, y: y-h/2},
                    bottom: {x: x+w/2, y: y+h/2},
                };
            },
            circle: ({ x=0,y=0,r=0 }) => {
                return {
                    top: {x: x-r, y: y-r},
                    bottom: {x: x+r, y: y+r},
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
    }
}

const factory = new SATFactory();

function generateSAT(params) {
    return factory.generateSAT[params.shape](params);
}

function generateDimensions(params){
    return factory.generateDimensions[params.shape](params);
}

module.exports = { generateSAT, generateDimensions };