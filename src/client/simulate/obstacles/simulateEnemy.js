function simulateNormal(e){
    e.x += e.xv;

    if (e.x + e.difference.x/2 >= e.bound.x + e.bound.w) {
        e.xv = -e.xv;
        e.x = (e.bound.x + e.bound.w) * 2 - e.x - e.difference.x;
    }
    else if (e.x - e.difference.x/2 <= e.bound.x) {
        e.xv = -e.xv;
        e.x = e.bound.x * 2 - e.x + e.difference.x;
    }
    e.y += e.yv;
    if (e.y + e.difference.y/2 >= e.bound.y + e.bound.h) {
        e.yv = -e.yv;
        e.y = (e.bound.y + e.bound.h) * 2 - e.y - e.difference.y;
    }
    else if (e.y - e.difference.y/2 <= e.bound.y) {
        e.yv = -e.yv;
        e.y = e.bound.y * 2 - e.y + e.difference.y;
    }
    if(e.shape === 'poly' || e.shape === 'polygon'){
        console.log(e);
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

export default function SimulateEnemy(player, e, other) {
    SimulateEnemyMap[e.enemyType](player, e, other);
}