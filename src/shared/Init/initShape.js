if(typeof require !== 'undefined'){
    var {toBoolean, toNumber, toString, toHex} = require('./convertType.js');
} else {
    var {toBoolean, toNumber, toString, toHex} = window.typeConverter;
}

// // here we just define relevant parameters. We DO NOT define x or y
// function defineSquare(obs, init) {
//     obs.w = init.w;
//     obs.h = init.h;
// }

// function defineCircle(obs, init) {
//     obs.r = init.r;
// }

const initShapeMap = {
    square: (obs, init) => {
        obs.x = toNumber(init.x);
        obs.y = toNumber(init.y);
        obs.w = toNumber(init.w,50);
        obs.h = toNumber(init.h,50);
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
    }
};

// module.exports = function initShape(params, advanced) {
//     let init = {};
//     if(params.shape === undefined || !initShapeMap[params.shape] === undefined){
//         console.error("Obstacle shape undefined! " + JSON.stringify(params)); return;
//     }
//     initShapeMap[params.shape](init, params, advanced);
//     return init;
// }

// as we are migrating to using sats and only sats as collision detec, rendering, etc.
// we don't need to define relevant parameters. Stuff that is just passed in to init will suffice
// TODO: revamp this once safety checks are a thing (probably wont need to bring this file back, do it in satFactory)
if(typeof module !== 'undefined'){
    module.exports = () => {};
} else {
    window.initShape = () => {};
}