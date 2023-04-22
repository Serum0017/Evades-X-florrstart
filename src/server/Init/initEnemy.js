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

const transformManager = require('./transformBody.js');

function initEnemyPosition(e){
    const last = {x: e.top.x, y: e.top.y};
    // halfwidth? since we always div by 2?
    e.width = e.bottom.x - e.top.x;
    if(!isNaN(e.x)){
        e.top.x = e.x-e.width/2;
        e.bottom.x = e.x+e.width/2;
    } else {
        const top = e.bound.x + Math.random()*(e.bound.w-e.width);
        e.top.x = top;
        e.bottom.x = top + e.width;
    }

    e.height = e.bottom.x - e.top.x;
    if(!isNaN(e.y)){
        e.top.y = e.y-e.height/2;
        e.bottom.y = e.y+e.height/2;
    } else {
        const top = e.bound.y + Math.random()*(e.bound.h-e.height);
        e.top.y = top;
        e.bottom.y = top + e.height;
    }

    // making sure that things like poly are offset correctly
    transformManager.runTransformMap(e, {x: e.top.x - last.x, y: e.top.y - last.y});
}

function initEnemy(params, advanced) {
    let init = {};
    if(params.enemyType === undefined || initEnemyMap[params.enemyType] === undefined) {
        console.error("Obstacle enemyType undefined! " + JSON.stringify(params)); return;
    }
    initEnemyMap[params.enemyType](init, params, advanced);
    return init;
}

module.exports = {initEnemy, initEnemyPosition};