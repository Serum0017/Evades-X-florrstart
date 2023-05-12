const map = require('./oldhub.js');
// const clipboardy = require('clipboardy');

let converted = newEvade(map);

// Copy
// clipboardy.writeSync(converted);
console.log(JSON.stringify(converted))

// converting old evade maps to new Evade
function newEvade(map){
    // SECTIONS


    // arena: { width: 5000, height: 5000 },
    // enemy: [],
    // safes: [],
    // texts: [],
    // obstacles: [],
    // npcs: [],
    // spawns: [],
    // playerSpawn: { x: 2500, y: 2500 },
    // name: 'Hub',
    // longName: 'Hub',
    // // bgColor: '#27c274',
    // // tileColor: '#03a379',
    // bgColor: '#1f2229',
    // tileColor: '#323645',
    // difficulty: 'Peaceful',
    // addedObstacles: [],

    // init newMap and global properties
    let newMap = {
        name: map.longName,
        init: [{type: 'settings', dimensions: {x: map.arena.width, y: map.arena.height}, spawn: {x: map.playerSpawn.x, y: map.playerSpawn.y}, difficulty: map.difficulty}],
    }

    // convert obstacles to classes
    for(let i = 0; i < map.obstacles.length; i++){
        if(Array.isArray(map.obstacles[i]) == true){
            // for example, if we have a tp obstacle that changes color, we want the tp and colorchange obstacle to be 2 separate obstacles instead of 1
            for(let j = 0; j < map.obstacles[i].length; j++){
                newMap.init.push(map.obstacles[i][j]);
            }
        } else {
            newMap.init.push(map.obstacles[i]);
        }
    }
    
    // handling other types like safes and texts

    // we're finished!
    return newMap;
}

module.exports = newEvade;