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
}

const SimulateEnemyMap = {
    normal: (player, e) => {
        simulateNormal(e);
    },

    wavy: (player, e) => {
        e.wavyEnemyTimer--;
        if(e.wavyEnemyTimer < 0){
            e.wavyEnemyTimer = e.wavyEnemyPeriod;
            e.wavyEnemyDirection *= -1;
        }

        e.speed = Math.sqrt(e.xv**2+e.yv**2);
        e.angle = Math.atan2(e.yv, e.xv) + e.wavyEnemyRotateSpeed * e.wavyEnemyDirection;

        e.xv = Math.cos(e.angle) * e.speed;
        e.yv = Math.sin(e.angle) * e.speed;
    },
    
    // example of using "other" (destructured)
    attractObstacles: (player, enemy, { obstacles }) => {
        
    },
};

export default function SimulateEnemy(player, e, other) {
    for(let i = 0; i < e.enemyType.length; i++){
        SimulateEnemyMap[e.enemyType[i]](player, e, other);
    }
}