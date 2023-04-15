function bound(sat, player){
    player.x += sat.overlapV.x;
    player.y += sat.overlapV.y;
}

function bounce(/*amount: */{x, y}, player, friction){
    if(!player.frictions[friction]){
        // friction: amount
        player.frictions[friction] = {x: 0, y: 0};
    }
    player.frictions[friction].x += x;
    player.frictions[friction].y += y;
}

// defining different collision reactions
const Effects = {
    normal: (sat, player) => {
        bound(sat, player);
    },
    bounce: (sat, player, obstacle) => {
        bound(sat, player);
        bounce({
            x: obstacle.bounciness*sat.overlapN.x,
            y: obstacle.bounciness*sat.overlapN.y
        }, player, obstacle.friction);
    },
    breakable: (sat, player, obstacle, {tick}) => {
        if(obstacle.strength > 0){
            bound(sat, player);
            obstacle.strength--;
            obstacle.lastBrokeTime = tick;
        }
    },
    resetFriction: (sat, player, obstacle) => {
        player.frictions = {};
    },
    lava: (sat, player, obstacle) => {
        if(obstacle.collidable === true){
            bound(sat, player);
        }
        player.dead = true;// btw lava doesnt work yet
    },
    tp: (sat, player, obstacle) => {
        player.x = obstacle.tp.x;
        player.y = obstacle.tp.y;
    },
    button: (sat, player, obstacle, { obstacles }) => {
        if(obstacle.active === false){
            return;
        }
        for(let i = 0; i < obstacles.length; i++){
            if(obstracles[i].buttonId === obstacle.buttonId){
                obstacles[i].state = !obstacles[i].state;
                obstacle.active = false;
            }
        }
    }
};

// stuff that is mandatory for effects but shouldnt count as a simulation type
const IdleEffects = {
    breakable: (player, obstacle, { tick }) => {
        if (obstacle.strength < obstacle.maxStrength) {
            if(tick-obstacle.lastBrokeTime > obstacle.regenTime){
                obstacle.strength += obstacle.healSpeed;
                if(obstacle.strength >= obstacle.maxStrength){
                    obstacle.lastBrokeTime = tick;
                    obstacle.strength = obstacle.maxStrength;
                }
            }
        } 
    }
}

function runEffects(sat, player, obstacle, other){
    Effects[obstacle.effect](sat, player, obstacle, other);
}

function runIdleEffects(player, obstacle, other){
    IdleEffects[obstacle.effect]?.(player, obstacle, other);
}

export default { runEffects, runIdleEffects };