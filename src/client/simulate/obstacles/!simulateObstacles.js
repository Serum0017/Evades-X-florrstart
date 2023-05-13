import Simulate from './simulateMap.js';
import Collide from './collisionManager.js';
import SpatialHash from './spatialHash.js';
import effectMap from './effectMap.js';
import eventSystem from './eventSystem.js';

const hash = new SpatialHash();

// literally just simulate obstacles, nothing else
function simulateObstacles(player, players, obstacles, tick, client){
    
    // simulating obstacles
    for(let i = 0; i < obstacles.length; i++){
        // simulate the obstacle
        Simulate(player, obstacles[i], {obstacles, players, tick});
        // simualteEffectsFunction
        effectMap.runIdleEffects(player, obstacles[i], {obstacles, players, tick, client});
        // TODO: if the obstacle is server sided, simulate it in relation to nearby players
    }

    // TODO: spatial hashing collisions
    // // adding to spatial hash
    // hash.addEntities(obstacles);

    // const collisions = hash.getCollisions(player);

    // for(let obstacle of collisions){
    //     const response = Collide(player, obstacle);
    //     if(response !== false){
    //         effectMap.runEffects(response, player, obstacle, { obstacles, players });
    //     }
    // }

    // - for each obstacle:
    //      - run obstacle's simulate function
    //      - run obstacle's simulateEffectsFunction if it exists
    //      - if the object is server sided:
    //          - simulate in relation to near players
}

function runObstacleCollisions(player, players, obstacles, tick, client){
    // - get all colliding objects (spatial hash)
    // - for each object:
    //  - run collision effects
    //  - update the player's sat
    // - for each server sided object:
    //  - if we have influenced it, then send changes to server

    // TODO: spatial hashing
    if(player.dead !== true && player.god !== true){
        for(let i = 0; i < obstacles.length; i++){
            const response = Collide(player, obstacles[i]);
            if(response !== false){
                // run collision response
                effectMap.runEffects(response, player, obstacles[i], {obstacles, players, tick, client});
                obstacles[i].lastCollidedTime = tick;
            } else {
                obstacles[i].lastCollidedTime = undefined;
            }
        }
    }

    eventSystem.checkEmmisions(obstacles, {obstacles, player, players, tick, client});

    if(player.touching.safe.length > 0){
		player.dead = false;
	}
}

export default {simulateObstacles, runObstacleCollisions};