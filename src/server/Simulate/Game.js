const Player = require('./Player.js');
const Map = require('./Map.js');
const mapData = require('../mapData.js');
// run all maps basically

module.exports = class Game {
    constructor(server){
        this.players = {};
        this.server = server;
        this.mapData = mapData;//{[testmap.name]: testmap};// data required to unload/ load maps
        this.maps = {};
        for(let key in this.mapData){
            this.maps[key] = new Map();
        }
        this.defaultState = {
            xv: 0,
            yv: 0,
            r: 24.5,
            angle: 0,
            magnitude: 0,
            dev: false,
            map: this.maps.Hub,
            mapName: 'Hub',
        }
    }
    loadMap(mapName){
        this.maps[mapName] = this.maps[mapName].load(this.mapData[mapName]);
    }
    unloadMap(mapName){
        this.maps[mapName] = this.maps[mapName].unload();
    }
    addPlayerToMap(id, mapName=this.defaultState.mapName) {
        if(Object.keys(this.maps[mapName].players).length === 0){
            this.loadMap(mapName);
        }

        this.players[id] = new Player(id, this.defaultState);

        this.maps[mapName].addPlayer(this.players[id]);
        this.players[id].map = mapName;

        this.server.broadcastInMap(mapName, {join: this.players[id].initPack()});
    }
    removePlayerFromMap(id){
        this.server.broadcastInMap(this.players[id].map, {leave: id});

        const mapName = this.players[id].map;
        this.maps[mapName].removePlayer(this.players[id]);
        delete this.players[id];

        if(Object.keys(this.maps[mapName].players).length === 0){
            this.unloadMap(mapName);
        }
    }
    start(){
        setInterval(() => {
            this.run();
        }, 1000/60)// if needed for optimization, this can be 30tps
    }
    run(){
        // send update pack
        
        // TODO: updatepack (also rerun this function for every leftovers tick)
        for(let mapId in this.maps){
            this.server.broadcastInMap(mapId, this.updatePackMap(mapId));
            this.maps[mapId].tick++;
        }

        // simulate anti cheat and stuff
    }
    packMap(mapName){
        return this.maps[mapName].initPack();
    }
    updatePackMap(mapId){
        return this.maps[mapId].updatePack();
    }
    moveToMap(id, mapName){
        this.removePlayerFromMap(id);
        this.addPlayerToMap(id, mapName);
    }
}