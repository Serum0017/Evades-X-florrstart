function defineNormal(e, init){
    e.speed = init.speed;
    e.angle = init.angle ?? Math.random() * Math.PI * 2;
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
        e.direction = init.direction;
        e.period = init.period;// we can actually implement this later, rn this is just an example
    },
    etcetera: (e, init) => {
        
    },
};

function initPosition(e, init){
    // TODO: fix poly not translating to bound in some global system
    if(!isNaN(init.x)){
        e.x = init.x;
    } else {
        e.x = init.bound.x + init.difference.x/2 + Math.random() * (init.bound.w - init.difference.x);
    }
    
    if(!isNaN(init.y)){
        e.y = init.y;
    } else {
        e.y = init.bound.y + init.difference.y/2 + Math.random() * (init.bound.h - init.difference.y);
    }
}

module.exports = function initEnemy(params, advanced) {
    let init = {};
    if(params.enemyType === undefined || initEnemyMap[params.enemyType] === undefined) {
        console.error("Obstacle enemyType undefined! " + JSON.stringify(params)); return;
    }
    initPosition(init, params);
    initEnemyMap[params.enemyType](init, params, advanced);
    return init;
}