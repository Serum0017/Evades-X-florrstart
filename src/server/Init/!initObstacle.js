const satFactory = require('./satFactory.js');
const initEffect = require('./initEffect.js');
const initShape = require('./initShape.js');
const initSimulate = require('./initSimulate.js');
const EnemyFactory = require('./initEnemy.js');

// combination of other modules that are required to intialize obstacles
module.exports = function intializeObstacle(init, advanced) {
    // TODO: check miro for order, idk if this is right
    const type = init.type.split('-');
    const obstacle = {
        shape: type[0],
        simulate: type[1],
        effect: type[2],
    };

    assign(obstacle, init);

    assign(obstacle, initShape(obstacle, advanced));
    assign(obstacle, initSimulate(obstacle, advanced));
    assign(obstacle, initEffect(obstacle, advanced));

    assign(obstacle, satFactory.generateDimensions(obstacle));

    // TODO: Make SATs an array (so that polygons dont have to be convex + other cool stuff)
    assign(obstacle, {sat: satFactory.generateSAT(obstacle)});

    if(obstacle.simulate === 'enemy'){
        assign(obstacle, EnemyFactory.initEnemyPosition(obstacle, advanced));
    }

    definePosition(obstacle);

    return obstacle;
}

function assign(prev, next){
    for(let key in next){
        prev[key] = next[key];
    }
}

function definePosition(o){
    o.x = (o.top.x + o.bottom.x)/2;
    o.y = (o.top.y + o.bottom.y)/2;
    o.difference = {x: o.bottom.x - o.top.x, y: o.bottom.y - o.top.y};
}