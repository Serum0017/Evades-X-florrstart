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
    lava: (sat, player, obstacle) => {
        if(sat.overlap < 0.01){
            return;
        }
        if(obstacle.solid === true){
            bound(sat, player);
        }
        player.dead = true;
    },
    bounce: (sat, player, obstacle) => {
        bound(sat, player);
        bounce({
            x: obstacle.bounciness*sat.overlapN.x,
            y: obstacle.bounciness*sat.overlapN.y
        }, player, obstacle.friction);
    },
    changeMap: (sat, player, obstacle, {client}) => {
        bound(sat, player);
        if(obstacle.hasTriggeredWin !== true){
            obstacle.hasTriggeredWin = true;
            client.send({changeMap: obstacle.map});
        }
        
    },
    changeColor: (sat, player, obstacle, {client}) => {
        client.game.renderer.colors = obstacle.colorsToChange;
    },
    breakable: (sat, player, obstacle, {tick}) => {
        if(obstacle.strength > 0){
            bound(sat, player);
            obstacle.strength--;
            if(obstacle.strength < 0){
                obstacle.strength = 0;
            }
        }

        // we dont want breakable obstacles to be able to regenerate on top of you
        // if you see this past uni 4 then make a canRegenOnTop param ;)
        obstacle.lastBrokeTime = tick;
    },
    resetFriction: (sat, player, obstacle) => {
        player.frictions = {};
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
        if (obstacle.strength < obstacle.maxStrength && tick-obstacle.lastBrokeTime > obstacle.regenTime) {
            obstacle.strength += obstacle.healSpeed;
            if(obstacle.strength >= obstacle.maxStrength){
                obstacle.lastBrokeTime = tick;
                obstacle.strength = obstacle.maxStrength;
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