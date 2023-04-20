const initObstacle = require('../Init/!initObstacle.js');

module.exports = class Map {
    constructor(){
        this.players = {};
        this.obstacles = [];
        this.settings = {dimensions: {x: 1000, y: 1000}, spawn: {x: 25, y: 25}};
        this.name = 'Planet Of Unnamed';
    }
    load(data){
        const {init, name} = data;
        for(let i = 0; i < init.length; i++){
            if(init[i].type === 'settings'){
                this.loadSettings(init[i]);// FIX LATER
            } else {
                this.obstacles.push(initObstacle(init[i]));
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

function toNumber(num, defaultNumber=0){
    // try {
    //     let n = Number(num);
    //     if(isNaN(n)){
    //         return defaultNumber;
    //     } else {
    //         return n;
    //     }
    // } catch(e) {
    //     return defaultNumber;
    // }
    return Number.isFinite(num) ? num : defaultNumber;
}

function toHex(hex, defaultHex="#ff0000"){
    for(let i = 0; i < hex.length; i++){
        if(i === 0 && hex[i] === '#')continue;
        if(Number.isFinite(hex[i]) === true)continue;
        return defaultHex;
    }
    return hex;
}

function mapObject(obj, fn){
    Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))
}