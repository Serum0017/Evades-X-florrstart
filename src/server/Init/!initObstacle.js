const satFactory = require('./satFactory.js');
const initEffect = require('./initEffect.js');
const initShape = require('./initShape.js');
const initSimulate = require('./initSimulate.js');

// combination of other modules that are required to intialize obstacles
module.exports = function intializeObstacle(init, advanced) {
    // TODO: check miro for order, idk if this is right
    const type = init.type.split('-');
    const obstacle = {
        shape: type[0],
        simulate: type[1].split(','),
        effect: type[2],
        difference: {},
    };

    assign(obstacle, init);

    // to only be used in init
    assign(obstacle, satFactory.generateDimensions(obstacle));

    assign(obstacle, initShape(obstacle, advanced));
    assign(obstacle, initSimulate(obstacle, advanced));
    assign(obstacle, initEffect(obstacle, advanced));

    assign(obstacle, satFactory.generateBody(obstacle));

    return obstacle;
}

function assign(prev, next){
    for(let key in next){
        prev[key] = next[key];
    }
}