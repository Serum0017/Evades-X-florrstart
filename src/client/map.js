import Player from './player.js';

export default class Map {
    constructor(){
        this.players = {};
        this.obstacles = {};

        this.settings = {dimensions: {x: 1000, y: 1000}};
        this.name = "Planet of Unnamed";

        this.selfId = null;
        this.self = null;
    }
    init(data){
        for(let id in data.players){
            this.players[id] = new Player(id, data.players[id]);
        }

        this.obstacles = data.obstacles;
        console.log({obs: data.obstacles});
        this.settings = data.settings;
        this.name = data.name;

        this.selfId = data.selfId;
        this.self = this.players[this.selfId];
    }
}