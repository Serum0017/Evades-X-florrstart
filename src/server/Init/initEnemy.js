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
        e.wavyEnemyDirection = e.angle;
        e.wavyEnemyPeriod = init.wavyEnemyPeriod ?? 20;// we can actually implement this later, rn this is just an example
        e.wavyEnemyTimer = e.wavyEnemyPeriod //* Math.random();
        e.wavyEnemyRotateSpeed = init.wavyEnemyWaveLength ?? 6;
        e.wavyEnemyRotateSpeed *= Math.PI / 180;
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