function bound(sat, player, obstacle){
    player.x += sat.overlapV.x;
    player.y += sat.overlapV.y;
    if(obstacle.isGround !== false){
        player.touching.ground.push(obstacle);
    }
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
    normal: (sat, player, obstacle) => {
        bound(sat, player, obstacle);
    },
    lava: (sat, player, obstacle) => {
        if(sat.overlap < 0.01){
            return;
        }
        if(obstacle.solid === true){
            bound(sat, player, obstacle);
        }
        player.dead = true;
    },
    bounce: (sat, player, obstacle) => {
        bound(sat, player, obstacle);
        bounce({
            x: obstacle.bounciness*sat.overlapN.x,
            y: obstacle.bounciness*sat.overlapN.y
        }, player, obstacle.friction);
    },
    coin: (sat, player, obstacle, {obstacles}) => {
        if(obstacle.collected === true){
            return;
        }
        obstacle.collected = true;
        for(let i = 0; i < obstacles.length; i++){
            if(obstacles[i].effect === 'coindoor' && obstacles[i].color === obstacle.color){
                obstacles[i].coins -= obstacle.coinAmount;
            }
        }
    },
    coindoor: (sat, player, obstacle) => {
        if(obstacle.coins > 0){
            bound(sat, player, obstacle);
        }
    },
    changeMap: (sat, player, obstacle, {client}) => {
        bound(sat, player, obstacle);
        if(obstacle.hasTriggeredWin !== true){
            obstacle.hasTriggeredWin = true;
            client.send({changeMap: obstacle.map});
            client.game.lastRequestedMapTime = performance.now();
        }
    },
    changeColor: (sat, player, obstacle, {client}) => {
        client.game.renderer.colors = obstacle.colorsToChange;
    },
    breakable: (sat, player, obstacle, {tick}) => {
        if(obstacle.strength > 0){
            bound(sat, player, obstacle);
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
    conveyor: (sat, player, obstacle) => {
        bounce({
            x: Math.cos(obstacle.conveyorAngle) * obstacle.conveyorForce,
            y: Math.sin(obstacle.conveyorAngle) * obstacle.conveyorForce
        }, player, obstacle.conveyorFriction);
    },
    platformer: (sat, player, obstacle) => {
        player.touching.platformer.push(obstacle);
        obstacle.jumpCooldown--;

        // add conveyor force
        bounce({
            x: Math.cos(obstacle.platformerAngle) * obstacle.platformerForce,
            y: Math.sin(obstacle.platformerAngle) * obstacle.platformerForce
        }, player, obstacle.platformerFriction);

        if(obstacle.jumpInput === 'up' || obstacle.jumpInput === 'down'){
            player.axisSpeedMult.y = 0;
        } else if(obstacle.jumpInput === 'left' || obstacle.jumpInput === 'right'){
            player.axisSpeedMult.x = 0;
        }
    },
    restrictAxis: (sat, player, obstacle) => {
        player.axisSpeedMult.x *= Math.cos(obstacle.restrictAxisAngle) * obstacle.axisSlowdown.x;
        player.axisSpeedMult.y *= Math.sin(obstacle.restrictAxisAngle) * obstacle.axisSlowdown.y;
        player.axisSpeedMult.angle = obstacle.restrictAxisAngle;
    },
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
    },
    platformer: (player, obstacle, advanced) => {
        obstacle.platformerAngle += obstacle.platformerAngleRotateSpeed;
        if(obstacle.platformerAngle > Math.PI*2) {
            obstacle.platformerAngle -= Math.PI*2;
        } else if(obstacle.platformerAngle < 0){
            obstacle.platformerAngle += Math.PI*2;
        }

        if(obstacle.initJumpInput === 'undecided'){
            // determining input angle based in inv of plat angle
            const relativeAngle = (obstacle.platformerAngle % (Math.PI*2)) * 180/Math.PI;
            if(relativeAngle > -45 && relativeAngle <= 45){
                obstacle.jumpAngle = 'left';
            } else if (relativeAngle > 45 && relativeAngle <= 135){
                obstacle.jumpAngle = 'up';
            } else if (relativeAngle > 135 && relativeAngle <= 225){
                obstacle.jumpAngle = 'right';
            } else if (relativeAngle > 225 && relativeAngle <= 315){
                obstacle.jumpAngle = 'down';
            }
        }
    },
    conveyor: (player, obstacle, advanced) => {
        obstacle.conveyorAngle += obstacle.conveyorAngleRotateSpeed;
    },
    restrictAxis: (player, obstacle, advanced) => {
        obstacle.restrictAxisAngle += obstacle.restrictAxisAngleRotateSpeed;
    }
}

function runEffects(sat, player, obstacle, other){
    Effects[obstacle.effect](sat, player, obstacle, other);
}

function runIdleEffects(player, obstacle, other){
    IdleEffects[obstacle.effect]?.(player, obstacle, other);
}

export default { runEffects, runIdleEffects };