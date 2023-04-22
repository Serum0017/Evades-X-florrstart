// here we just define relevant parameters. We DO NOT define x or y
function defineSquare(obs, init) {
    obs.w = init.w;
    obs.h = init.h;
}

function defineCircle(obs, init) {
    obs.r = init.r;
}

const initShapeMap = {
    square: (obs, init) => {
        defineSquare(obs, init);
    },
    circle: (obs, init) => {
        defineCircle(obs, init);
    },
    poly: (obs, init) => {
        obs.points = init.points;
    },
    circleHollowSlice: (obs, init) => {
        defineCircle(obs, init);
        obs.innerRadius = init.innerRadius;
        obs.startAngle = init.startAngle;
        obs.endAngle = init.endAngle;
        obs.rotateSpeed = init.rotateSpeed;
    }
};

module.exports = function initShape(params, advanced) {
    let init = {};
    if(params.shape === undefined || !initShapeMap[params.shape] === undefined){
        console.error("Obstacle shape undefined! " + JSON.stringify(params)); return;
    }
    initShapeMap[params.shape](init, params, advanced);
    return init;
}