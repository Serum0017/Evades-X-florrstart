import Collide from './collisionManager.js';
import transformBody from './transformBody.js';

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
    changeColor: (sat, player, obstacle, { client }) => {
        client.game.renderer.colors = obstacle.colorsToChange;
    },
    changeSpeed: (sat, player, obstacle, advanced) => {
        player.axisSpeedMult.x *= obstacle.speedMult;
        player.axisSpeedMult.y *= obstacle.speedMult;
    },
    changeRadius: (sat, player, obstacle, advanced) => {
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
    changeFriction: (sat, player, obstacle, advanced) => {
        player.friction = obstacle.frictionValue;
    },
    changeVinette: (sat, player, obstacle, {client, tick}) => {
        // TODO: average w/ existing instead of set?
        client.game.renderer.vinette.outer.interpolate = obstacle.vinetteToChange.outer;
        client.game.renderer.vinette.inner.interpolate = obstacle.vinetteToChange.inner;
    },
    changeShape: (sat, player, obstacle, advanced) => {
        player.touching.changeShape.push(obstacle);
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
    hole: (sat, player, obstacle, { tick }) => {
        return;
        // general idea: subtract player's sat by what's inside the hole
        
        // convert both sats to poly (for testing: assume that the obstacle is circular and dont)

        // get all intersections points between the player and obstacle
        const intersections = [];

        const samplePoints = 20;
        const playerSamplePoints = [];
        const obstacleSamplePoints = [];
        for(let i = 0; i < Math.PI*2; i += Math.PI*2/samplePoints){
            playerSamplePoints.push({x: player.x + Math.cos(i) * player.r, y: player.x + Math.sin(i) * player.r});
            obstacleSamplePoints.push({x: obstacle.x + Math.cos(i) * obstacle.r, y: obstacle.x + Math.sin(i) * obstacle.r});
        }

        // looping through all lines of both objs and checking them against another
        for(let i = 0; i < playerSamplePoints.length-1; i++){
            for(let j = 0; j < obstacleSamplePoints.length-1; j++){
                const intersection = lineLineIntersection(playerSamplePoints[i], playerSamplePoints[i+1], obstacleSamplePoints[j], obstacleSamplePoints[j+1]);
                if(intersection !== false){
                    intersections.push({x: intersection[0], y: intersection[1], playerLine: i, obstacleLine: j});
                }
            }
        }
        
        // the first intersection will always be in -> out and 2nd will always be out -> in
        // (unless the lines are exactly tangent, but that wont be included for testing) (TODO include)
        // thus, loop through 2 at a time and do this to the sat for each: 

        // this wont work for multiple collision indicies because array will get shifted around (TODO: fix this)
        for(let i = 0; i < intersections.length-1; i+=2){
            // slice off all points of the player's sat between the point before the first intersection and the point after the second intersection
            playerSamplePoints.splice(intersections[i].playerLine, intersections[i+1].playerLine-intersections[i].playerLine);
            
            // create a new point at the first intersection and 2nd intersection
            playerSamplePoints.splice(intersections[i].playerLine, 0, {
                x: intersections[i].x,
                y: intersections[i].y
            })
            playerSamplePoints.splice(intersections[i].playerLine+1, 0, {
                x: intersections[i+1].x,
                y: intersections[i+1].y
            })

            // insert all points from the point after the first intersection and the point before the second intersection between the intersection points
            playerSamplePoints.splice(intersections[i].playerLine+1, 0, ...obstacleSamplePoints.slice(intersections[i].obstacleLine+1,intersections[i+1].obstacleLine));
        }

        player.shape = 'poly';
        player.sat = new SAT.Polygon(new SAT.Vector(), ...playerSamplePoints.map(p => new SAT.Vector(p.x, p.y)));
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

// TODO: put this in satFactory or somewhere global. Also clean up the function
function lineLineIntersection(A,B,C,D) {
    const x1 = A.x;
    const y1 = A.y;
    const x2 = B.x;
    const y2 = B.y;
    const x3 = C.x;
    const y3 = C.y;
    const x4 = D.x;
    const y4 = D.y;

  // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
    }

  // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return [x, y];
}

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
    const last = {x: player.x, y: player.y};
    Effects[obstacle.effect](sat, player, obstacle, other);
    if(last.x !== player.x || last.y !== player.y){
        transformBody(player, {x: player.x - last.x, y: player.y - last.y, rotation: 0});
    }
}

function runIdleEffects(player, obstacle, other){
    const last = {x: player.x, y: player.y};
    IdleEffects[obstacle.effect]?.(player, obstacle, other);
    if(last.x !== player.x || last.y !== player.y){
        transformBody(player, {x: player.x - last.x, y: player.y - last.y, rotation: 0});
    }
}

export default { runEffects, runIdleEffects };