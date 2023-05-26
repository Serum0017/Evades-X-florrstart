if(typeof require !== 'undefined'){
    var {toBoolean, toNumber, toString, toHex} = require('./convertType.js');
} else {
    var {toBoolean, toNumber, toString, toHex} = window.typeConverter;
}

function defineNormal(e, init){
    e.speed = toNumber(init.speed, 1);
    e.angle = toNumber(init.angle, Math.random() * Math.PI * 2);
    e.xv = Math.cos(e.angle) * e.speed;
    e.yv = Math.sin(e.angle) * e.speed;
}

const initEnemyMap = {
    // basically another map but instead of using simulate or bound or anything we use enemyType
    normal: (e, init) => {
        defineNormal(e, init);
    },
    wavy: (e, init) => {
        defineNormal(e, init);
        // if the direction is neither undefined nor a number, then we need to change it
        if(e.wavyEnemyDirection !== undefined && isNumber(e.wavyEnemyDirection, 'undef') === 'undef'){
            e.wavyEnemyDirection = 1;
        }
        e.wavyEnemyDirection = (init.wavyEnemyDirection/Math.sign(init.wavyEnemyDirection)) ?? Math.random() > 0.5 ? 1 : -1;
        e.wavyEnemyPeriod = toNumber(init.wavyEnemyPeriod, 20);// we can actually implement this later, rn this is just an example
        e.wavyEnemyTimer = e.wavyEnemyPeriod //* Math.random();
        e.wavyEnemyRotateSpeed = toNumber(init.wavyEnemyWaveLength, 6);
        e.wavyEnemyRotateSpeed *= Math.PI / 180;
    },
};

function initPosition(e, init){
    init.bound = {
        x: toNumber(init.bound.x),
        y: toNumber(init.bound.y),
        w: toNumber(init.bound.w, 100),
        h: toNumber(init.bound.h, 100),
    };
    if(toNumber(init.x, 'undef') !== 'undef'){
        e.x = init.x;
    } else {
        e.x = init.bound.x + init.difference.x/2 + Math.random() * (init.bound.w - init.difference.x);
    }
    
    if(toNumber(init.y, 'undef') !== 'undef'){
        e.y = init.y;
    } else {
        e.y = init.bound.y + init.difference.y/2 + Math.random() * (init.bound.h - init.difference.y);
    }
}

function initEnemy(params, advanced) {
    let init = {};
    if(Array.isArray(params.enemyType) === false) {
        console.error("Obstacle enemyType undefined! " + JSON.stringify(params)); return;
    }
    initPosition(init, params);

    for(let i = 0; i < params.enemyType.length; i++){
        if(initEnemyMap[params.enemyType[i]] === undefined){console.error("Obstacle enemyType map undefined! " + JSON.stringify(params)); return;}
        initEnemyMap[params.enemyType[i]](init, params, advanced);
    }
    
    return init;
}

if(typeof module !== 'undefined'){
    module.exports = initEnemy;
} else {
    window.initEnemy = initEnemy;
}