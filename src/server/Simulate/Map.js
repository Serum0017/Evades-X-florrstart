const initObstacle = require('../Init/!initObstacle.js');

module.exports = class Map {
    constructor(){
        this.players = {};
        this.obstacles = [];
        this.settings = {dimensions: {x: 1000, y: 1000}};
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
        return this;
    }
    loadSettings(data){
        // we always have to make sure that every value that the user
        // can put in (reguardless of if it's a string or not, because
        // map json can be manipulated in the txt)
        // is safe and will not result in the server crashing
        this.settings.dimensions.x = toNumber(data?.dimensions?.x, 1000);
        this.settings.dimensions.y = toNumber(data?.dimensions?.y, 1000);
    }
    unload(){
        return new Map();
    }
    initPack(){
        return this;
        // return {
        //     name: this.name,
        //     obstacles: this.obstacles,
        //     players: this.players,
        //     dimensions: this.dimensions,
        // }
    }
    updatePack(){
        // todo: return minpack optimization
        return this;
    }
    addPlayer(p){
        this.players[p.id] = p;
    }
    removePlayer(p){
        delete this.players[p.id];
    }
}

function toNumber(num, defaultNumber=0){
    try {
        let n = Number(num);
        if(isNaN(n)){
            return defaultNumber
        } else {
            return n;
        }
    } catch(e) {
        return defaultNumber;
    }
}