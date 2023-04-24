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
        obs.pivot = init.pivot ?? {x: init.x, y: init.y};
        obs.distToPivot = Math.sqrt((init.x-obs.pivot.x)**2+(init.y-obs.pivot.y)**2);
    },
    circle: (obs, init) => {
        defineCircle(obs, init);
        obs.pivot = init.pivot ?? {x: init.x, y: init.y};
        obs.distToPivot = Math.sqrt((init.x-obs.pivot.x)**2+(init.y-obs.pivot.y)**2);
    },
    poly: (obs, init) => {
        obs.points = init.points;
        obs.pivot = init.pivot ?? {x: init.x, y: init.y};
        obs.distToPivot = Math.sqrt((init.x-obs.pivot.x)**2+(init.y-obs.pivot.y)**2);
    },
    circleHollowSlice: (obs, init) => {
        defineCircle(obs, init);
        obs.innerRadius = init.innerRadius;
        obs.startAngle = init.startAngle;
        obs.endAngle = init.endAngle;
        obs.rotateSpeed = init.rotateSpeed;
        obs.pivot = init.pivot ?? {x: init.x, y: init.y};
        obs.distToPivot = Math.sqrt((init.x-obs.pivot.x)**2+(init.y-obs.pivot.y)**2);
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