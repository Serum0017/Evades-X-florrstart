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
            this.obstacles.push(initObstacle(init[i]));
        }
        this.name = name;
        return this;
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