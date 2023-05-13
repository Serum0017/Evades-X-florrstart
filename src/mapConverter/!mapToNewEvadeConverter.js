const map = require('./poca.js');
const typeConversion = require('./!typeConversion.js')
const obstacles = require('./!conversionClasses.js');
// const clipboardy = require('clipboardy');

let converted = newEvade(map, false);

// Copy
// clipboardy.writeSync(converted);
// console.log(JSON.stringify(converted))

// converting old evade maps to new Evade
function newEvade(map, isSerialized=false){
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
        initObstacle(map.obstacles[i], newMap.init, isSerialized);
    }

    // making obselete settings into obstacles
    newMap.init.push({
        type: 'square-normal-changeColor',
        x: map.playerSpawn.x,
        y: map.playerSpawn.y,
        w: 1, h: 1,
        tileColor: map.bgColor,
        backgroundColor: map.tileColor
    })

    // console.log(newMap);
    
    // handling other types like safes and texts

    // we're finished!
    return newMap;
}

function initObstacle(o, init, isSerialized){
    if(isSerialized === false){
        if(typeConversion.supportedObjects[o.type] === undefined)return;
        o = serializeObstacle(o);
    }
    if(Array.isArray(o)){
        o.map(subO => initObstacle(subO, init, isSerialized));
    } else {
        init.push(o);
    }
}

function serializeObstacle(o){
    return new typeConversion.supportedObjects[o.type](...typeConversion.mappedPara[o.type].map(parameter => o[parameter]));
}

module.exports = converted;// newEvade;