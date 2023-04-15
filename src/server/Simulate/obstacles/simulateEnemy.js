function simulateNormal(e){
    e.x += e.xv;

    if (e.x + e.r.x >= e.bound.x + e.bound.w) {
        e.xv = -e.xv;
        e.x = (e.bound.x + e.bound.w) * 2 - e.x - e.r.x * 2;
    }
    else if (e.x - e.r.x <= e.bound.x) {
        e.xv = -e.xv;
        e.x = e.bound.x * 2 - e.x + e.r.x * 2;
    }
    e.y += e.yv;
    if (e.y + e.r.y >= e.bound.y + e.bound.h) {
        e.yv = -e.yv;
        e.y = (e.bound.y + e.bound.h) * 2 - e.y - e.r.y * 2;
    }
    else if (e.y - e.r.y <= e.bound.y) {
        e.yv = -e.yv;
        e.y = e.bound.y * 2 - e.y + e.r.y * 2;
    }
}

const SimulateEnemyMap = {
    normal: (player, e) => {
        simulateNormal(e);
    },
    
    // example of using "other" (destructured)
    attractObstacles: (player, enemy, { obstacles }) => {
        
    },
};

module.exports = function SimulateEnemy(player, e, other) {
    // radius
    e.r = {x: (e.top.x - e.bottom.x)/2, y: (e.bottom.y - e.top.y)/2};
    SimulateEnemyMap[e.enemyType](player, e, other);
}