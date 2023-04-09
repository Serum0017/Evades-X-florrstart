// run all maps basically


// when outsourcing this to another folder, make sure that you add maps in the game constructor to preserve modularity
// class Game {constructor(server, maps){}...}
const testmap = {
    name: 'Planet of Bad Commit Messages',
    init: [
        {type: 'empty-settings-none', width: 500, height: 500},// settings obstacle will always be the first obstacle, otherwise default to saved settings
        // shape, simulate, effect
        // {type: 'square-move-normal', /*x: 350, y: 350,*/ w: 60, h: 60, currentPoint: 0, path: [[350, 350], [350, 300], [400, 350]], speed: 2},
        // {type: 'circle-move-normal', /*x: 150, y: 150,*/ radius: 50, currentPoint: 0, path: [[150, 350], [150, 300], [200, 350]], speed: 1},
        // //{type: 'circle-move-bounce', /*x: 150, y: 150,*/ radius: 20, currentPoint: 0, path: [[10, 10], [490, 10], [490, 490], [0, 490]], bounciness: 120, speed: 1},
        
        {type: 'square-normal-normal', x: 400, y: 150, w: 50, h: 50, bounciness: 1, friction: 0.98 },
        {type: 'circle-normal-bounce', x: 75, y: 425, radius: 50, bounciness: 10, friction: 0.9 },
        {type: 'circle-normal-resetFriction', x: 250, y: 250, radius: 50},
        {type: 'circle-normal-tp', x: 250, y: 150, radius: 50, tp: {x: 450, y: 50}},
        //{type: 'poly-move-normal', x: 400, y: 400, w: 100, h: 100, points: [[100, 100], [150, 100], [150, 150]], path: [[400, 400], [350, 400], [350, 450]], currentPoint: 0, speed: 0.5},
        // {type: 'poly-normal-breakable', points: [[50, 50], [150, 50], [100, 125], [50, 100]], maxStrength: 100 },
        {type: 'poly-move-breakable', x: 0, y: 0, points: [[0, 0], [100, 0], [50, 75]], path: [[0, 0], [200, 200], [100, 200]], currentPoint: 0, speed: 3, maxStrength: 100, regenTime: 300, healSpeed: 10},

        {type: 'circle-enemy-breakable', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, radius: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        {type: 'circle-enemy-breakable', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, radius: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        {type: 'circle-enemy-breakable', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, radius: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        {type: 'circle-enemy-breakable', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, radius: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        // {type: 'circle-enemy-normal', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, radius: 10},
        // {type: 'circle-enemy-normal', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, radius: 10},
        // {type: 'circle-enemy-normal', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, radius: 10},
    ]
}

module.exports = class Game {
    constructor(server){
        this.players = {};
        this.server = server;
        this.mapData = {[testmap.name]: testmap};// data required to unload/ load maps
        this.maps = {};
        for(let key in this.mapData){
            this.maps[key] = new Map();
        }
    }
    loadMap(mapName){
        this.maps[mapName] = this.maps[mapName].load(this.mapData[mapName]);
    }
    unloadMap(mapName){
        this.maps[mapName] = this.maps[mapName].unload();
    }
    addPlayerToMap(p, mapName) {
        this.players[p.id] = p;
        this.maps[mapName].addPlayer(p);
    }
    removePlayerFromMap(p, mapName){
        delete this.players[p.id];
        this.maps[mapName].removePlayer(p);
    }
    moveToMap(p, mapName){
        this.removePlayerFromMap(p.map);
        p.map = mapName;
        this.addPlayerToMap(p, mapName);
    }
    run(){
        // simulate anti cheat and stuff
    }
}