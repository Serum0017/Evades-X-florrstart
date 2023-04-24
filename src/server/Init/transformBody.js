// IMPORTANT: if any changes are made, make sure to copy them to the client transformBody file as well
const SAT = require('sat');

const transformMap = {
    poly: (o, { x,y }) => {
        for(let p of o.points){
            p[0] += x;
            p[1] += y;
        }
    }
};

function transformBody(obstacle, delta){
    obstacle.top.x += delta.x;
    obstacle.top.y += delta.y;
    obstacle.bottom.x += delta.x;
    obstacle.bottom.y += delta.y;

    // no need to create new sats every frame :)
    // console.log(obstacle);
    obstacle.sat.setOffset(new SAT.Vector(obstacle.sat.offset.x+delta.x, obstacle.sat.offset.y+delta.y));
    runTransformMap(obstacle, delta);
}

function runTransformMap(obstacle, delta){
    if(transformMap[obstacle.shape] !== undefined){
        transformMap[obstacle.shape](obstacle,delta);
    }
}

module.exports = {transformBody, runTransformMap};

// this.rotate = ({top, bottom}, /*pivot*/{x,y}, rotation) => {
//     const c = {x, y};

//     // top
//     let trig = {cos: Math.cos(rotation), sin: Math.sin(rotation)};
//     top = {
//         x: (trig.cos * (top.x - c.x)) + (trig.sin * (top.y - c.y)) + c.x,
//         y: (trig.cos * (top.y - c.y)) - (trig.sin * (top.x - c.x)) + c.y
//     }

//     // bottom
//     trig = {cos: Math.cos(rotation), sin: Math.sin(rotation)};
//     bottom = {
//         x: (trig.cos * (bottom.x - c.x)) + (trig.sin * (bottom.y - c.y)) + c.x,
//         y: (trig.cos * (bottom.y - c.y)) - (trig.sin * (bottom.x - c.x)) + c.y
//     };
// }