var initObstacle = initObstacle ?? require('./Init/!initObstacle.js');
if(typeof require !== 'undefined'){
    var {toBoolean, toNumber, toString, toHex, toStructure} = require('./Init/convertType.js');
} else {
    var {toBoolean, toNumber, toString, toHex, toStructure} = window.typeConverter;
}

class Map {
    constructor(){
        this.players = {};
        this.obstacles = [];
        this.settings = {dimensions: {x: 1000, y: 1000}, spawn: {x: 25, y: 25}, difficulty: 'Peaceful'};
        this.name = 'Planet Of Unnamed';
    }
    load(data, game){
        const {init, name} = data;
        for(let i = 0; i < init.length; i++){
            if(init[i].type === 'settings'){
                this.loadSettings(init[i]);
            } else {
                this.obstacles.push(initObstacle(init[i], {map: this, game}));
            }
        }
        this.name = name;
        this.tick = 0;

        return this;
    }
    loadSettings(data){
        // we always have to make sure that every value that the user
        // can put in (reguardless of if it's a string or not, because
        // map json can be manipulated in the txt)
        // is safe and will not result in the server crashing
        this.settings.dimensions.x = toNumber(data?.dimensions?.x, 1000);
        this.settings.dimensions.y = toNumber(data?.dimensions?.y, 1000);
        this.settings.spawn.x = toNumber(data?.spawn?.x, 25);
        this.settings.spawn.y = toNumber(data?.spawn?.y, 25);
        this.settings.difficulty = ['Peaceful','Moderate','Difficult','Hardcore','Exhausting','Agonizing','Terrorizing','Cataclysmic','Grass','Undefined'].includes(data?.difficulty) ? data.difficulty : 'Peaceful';
        this.settings.difficultyNumber = data.difficultyNumber === undefined ? undefined : toNumber(data?.difficultyNumber);
    }
    unload(){
        return new Map();
    }
    initPack(){
        return this;
    }
    updatePack(){
        // todo: return minpack optimization
        const payload = {players: {}};
        for(let key in this.players){
            payload.players[key] = this.players[key].updatePack();
        }
        return {...payload, update: true};
    }
    addPlayer(p){
        this.players[p.id] = p;

        this.players[p.id].x = this.settings.spawn.x;
        this.players[p.id].y = this.settings.spawn.y;
    }
    removePlayer(p){
        delete this.players[p.id];
    }
}

function mapObject(obj, fn){
    Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))
}

if(typeof module !== 'undefined'){
    module.exports = Map;
} else {
    window.Map = Map;
}