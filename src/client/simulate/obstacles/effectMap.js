import Collide from './collisionManager.js';

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
    changeSpeed: (sat, player, obstacle, {client}) => {
        player.axisSpeedMult.x *= obstacle.speedMult;
        player.axisSpeedMult.y *= obstacle.speedMult;
    },
    changeRadius: (sat, player, obstacle, {client}) => {
        // TODO: revamp when multiple body types are added
        if(obstacle.radiusMult < 1){
            // since we dont want an infinite loop of getting smaller and then bigger, only trigger if we're colliding with the smaller player
            if(Collide({...player, body: new SAT.Circle(new SAT.Vector(player.x, player.y), player.r*obstacle.radiusMult)}, obstacle) !== false){
                player.r *= obstacle.radiusMult;
            }
        } else {
            player.r *= obstacle.radiusMult;
        }
    },
    changeFriction: (sat, player, obstacle, {client}) => {
        player.friction = obstacle.frictionValue;
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
    safe: (sat, player, obstacle) => {
        player.touching.safe.push(obstacle);
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
    rotateMovement: (sat, player, obstacle) => {
        player.axisSpeedMult.x *= obstacle.axisSpeedMult// * Math.cos(obstacle.rotateMovementAngle);
        player.axisSpeedMult.y *= obstacle.axisSpeedMult// * Math.sin(obstacle.rotateMovementAngle);
        player.axisSpeedMult.angle = obstacle.rotateMovementAngle;
    },
    restrictAxis: (sat, player, obstacle) => {
        player.axisSpeedMult.x *= obstacle.axisSpeedMults.x;
        player.axisSpeedMult.y *= obstacle.axisSpeedMults.y;
    },
    snapGrid: (sat, player, obstacle) => {
        obstacle.snapCooldown--;

        if(obstacle.snapCooldown <= 0 && (Math.abs(player.xv) > 0.01 || Math.abs(player.yv) > 0.01)){
            obstacle.snapCooldown = obstacle.maxSnapCooldown;
            obstacle.playerSnapAngle = Math.atan2(player.yv, player.xv);
            obstacle.interpolatePlayerData = {
                time: Math.min(obstacle.maxSnapCooldown-1, 5),
                nextX: player.x + Math.cos(obstacle.playerSnapAngle) * obstacle.snapMagnitude * 0.95,
                nextY: player.y + Math.sin(obstacle.playerSnapAngle) * obstacle.snapMagnitude * 0.95
            };
            // player.x += Math.cos(obstacle.playerSnapAngle) * obstacle.snapDistance.x;
            // player.y += Math.sin(obstacle.playerSnapAngle) * obstacle.snapDistance.y;
        }

        if(obstacle.interpolatePlayerData.time > 1){
            obstacle.interpolatePlayerData.time--;
            player.x = player.x * 0.8 + 0.2 * obstacle.interpolatePlayerData.nextX;
            player.y = player.y * 0.8 + 0.2 * obstacle.interpolatePlayerData.nextY;
        } else {
            // this code looks scary (it isnt)
            // in order to snap correctly, rotate both the player and the obstacle the negative snapAngle relative to the obstacle's center
            // this means that the player will be relatively correct to the obstacle and the obstacle will be axis-aligned
            obstacle.playerRelativeTransform = {
                angle: Math.atan2(player.y - obstacle.y, player.x - obstacle.x) - obstacle.snapAngle,
                distance: Math.sqrt((player.y - obstacle.y)**2 + (player.x - obstacle.x)**2)
            }

            obstacle.playerRelativeTransform.x = Math.cos(obstacle.playerRelativeTransform.angle) * obstacle.playerRelativeTransform.distance;
            obstacle.playerRelativeTransform.y = Math.sin(obstacle.playerRelativeTransform.angle) * obstacle.playerRelativeTransform.distance;

            obstacle.prt = obstacle.playerRelativeTransform;

            // applying the transform just like the norotate snap that i coded earlier
            // in other words, snap the relative player to the relative grid
            // player.x = player.x * 0.4 + 0.6 * (Math.round((player.x - obstacle.x % 50) / obstacle.snapDistance.x) * obstacle.snapDistance.x + obstacle.x % 50 + player.xv * (obstacle.snapToShowVelocity*2-1));
            // player.y = player.y * 0.4 + 0.6 * (Math.round((player.y - obstacle.y % 50) / obstacle.snapDistance.y) * obstacle.snapDistance.y + obstacle.y % 50 + player.yv * (obstacle.snapToShowVelocity*2-1));
            obstacle.prt.x = obstacle.prt.x * 0.4 + 0.6 * (Math.round((obstacle.prt.x - obstacle.x % 50) / obstacle.snapDistance.x) * obstacle.snapDistance.x + obstacle.x % 50 + player.xv * (obstacle.snapToShowVelocity*2-1));
            obstacle.prt.y = obstacle.prt.y * 0.4 + 0.6 * (Math.round((obstacle.prt.y - obstacle.y % 50) / obstacle.snapDistance.y) * obstacle.snapDistance.y + obstacle.y % 50 + player.yv * (obstacle.snapToShowVelocity*2-1));

            obstacle.prt.angle = Math.atan2(obstacle.prt.y, obstacle.prt.x) + obstacle.snapAngle;
            obstacle.prt.distance = Math.sqrt(obstacle.prt.y**2 + obstacle.prt.x**2);

            // rotating back
            // translating the relative coordinates back to absolute ones
            player.x = Math.cos(obstacle.prt.angle) * obstacle.prt.distance + obstacle.x;
            player.y = Math.sin(obstacle.prt.angle) * obstacle.prt.distance + obstacle.y;

            // checking if the original point was outside of the snapgrid as a result of rotation. If so, apply translations to make it right
            if(player.x < obstacle.x - obstacle.difference.x/2 - player.speed || player.x > obstacle.x + obstacle.difference.x/2 + player.speed){
                player.x += Math.sign(player.xv) * obstacle.snapDistance.x*0.6;
            }

            if(player.y < obstacle.y - obstacle.difference.y/2 - player.speed || player.y > obstacle.y + obstacle.difference.y/2 + player.speed){
                player.y += Math.sign(player.yv) * obstacle.snapDistance.y*0.6;
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
    rotateMovement: (player, obstacle, advanced) => {
        obstacle.rotateMovementAngle += obstacle.rotateMovementAngleRotateSpeed;
        if(obstacle.rotateMovementAngle > Math.PI*2) {
            obstacle.rotateMovementAngle -= Math.PI*2;
        } else if(obstacle.rotateMovementAngle < 0){
            obstacle.rotateMovementAngle += Math.PI*2;
        }
    },
    snapGrid: (player, obstacle, advanced) => {
        obstacle.snapAngle += obstacle.snapAngleRotateSpeed;
    },
}

function runEffects(sat, player, obstacle, other){
    Effects[obstacle.effect](sat, player, obstacle, other);
}

function runIdleEffects(player, obstacle, other){
    IdleEffects[obstacle.effect]?.(player, obstacle, other);
}

export default { runEffects, runIdleEffects };