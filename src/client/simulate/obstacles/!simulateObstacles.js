import Simulate from './simulateMap.js';
import Collide from './collisionManager.js';
import SpatialHash from './spatialHash.js';
import effectMap from './effectMap.js';

const hash = new SpatialHash();

// simulate obstacles, run collision, run collision effects
// run this for one player
export default function simulateObstacles(player, players, obstacles){
    // simulating obstacles
    
    const other = {obstacles, players};
    for(let i = 0; i < obstacles.length; i++){
        // simulate the obstacle
        Simulate(player, obstacles[i], other);
        // simualteEffectsFunction
        effectMap.runIdleEffects(player, obstacles[i], other);
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