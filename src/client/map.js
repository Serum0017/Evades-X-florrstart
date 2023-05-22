import Player from './player.js';
import ObstacleManager from './simulate/obstacles/!simulateObstacles.js';
import satFactory from './simulate/obstacles/satFactory.js';
import interpolateManager from './render/interpolateObstacle.js';

export default class Map {
    constructor(client){
        this.client = client;

        this.players = {};
        this.obstacles = {};

        this.settings = {dimensions: {x: 1000, y: 1000}, spawn: {x: 50, y: 50}, difficulty: 'Peaceful'};
        this.name = "Planet of Unnamed";

        this.selfId = null;
        this.self = null;
    }
    init(data){
        if(this.self !== null){
            this.players = {[this.selfId]: this.self};
        }

        for(let id in data.players){
            this.players[id] = new Player(id, data.players[id]);
        }

        this.obstacles = data.obstacles;
        // console.log({data});

        // console.log(data.obstacles);

        for(let i = 0; i < this.obstacles.length; i++){
            this.obstacles[i].body = satFactory.generateSAT(this.obstacles[i].body, this.obstacles[i]);
            if(this.obstacles[i].parametersToReset !== undefined){
                this.resetObstacleParameters(this.obstacles[i], this.obstacles[i].parametersToReset);
            }
        }

        console.log(this.obstacles);

        this.settings = data.settings;
        this.name = data.name;

        this.selfId = data.selfId;
        this.self = this.players[this.selfId];
        
        this.client.reset();

        this.tick = data.tick;

        this.createRenderState(performance.now());
    }
    resetObstacleParameters(o, parametersToReset) {
        for(let key in parametersToReset){
            // if(typeof parametersToReset[key] === 'object' && Array.isArray(parametersToReset[key]) === false){
            //     this.resetObstacleParameters(o[key], parametersToReset[key]);// if this is ever needed, use applyKeychain
            // } else {
                o[key] = parametersToReset[key];
            // }
        }
    }
    updatePack(playerData){
        for(let id in playerData){
            if(id !== this.selfId.toString()){
                this.players[id].updatePack(playerData[id]);

                // simulate extra ticks
                for(let i = 0; i < Math.min(30,this.tick - playerData[id].lastTick); i++){
                    this.players[id].simulate(this);
                }
                this.players[id].updateInterpolate();
            }
        }

        // obstacles will be simulated server side, rest is client side.
    }
    simulate(){
        // refer to miro for ordering
        // simulate everything
        // Full simulation structure with player prediction and server sided objects:

        // TODO: implement simulation culling (only simulate other players that are inside the client's screen)
        for(let id in this.players){
            this.players[id].simulate(this);
        }

        ObstacleManager.simulateObstacles(this.self, this.players, this.obstacles, this.tick, this.client);
        ObstacleManager.runObstacleCollisions(this.self, this.players, this.obstacles, this.tick, this.client);

        this.tick++;

        const time = performance.now();

        for(let id in this.players){
            this.players[id].createSimulateState(time);
        }

        this.createRenderState(time);

        // - simulate player
        // - update the player's sat
        // - simulate other players in player's screen with small movement simulation function (although follow the <2x last update state's distance covered rule - see arrow)
        // -- refer to !simulateObstacles.js for how we simulate obstacles --
        // -- refer to !simulateObstacles.js for how we collide with obstacles --
    }
    addPlayer(id, init){
        this.players[id] = new Player(id, init);
    }
    removePlayer(id){
        delete this.players[id];
    }
    initPack(){
        return {
            obstacles: this.obstacles,
            settings: this.settings,
            name: this.name,
            players: this.players,
            tick: this.tick
        };
    }
    createRenderState(time){
        for(let i = 0; i < this.obstacles.length; i++){
            interpolateManager.createInterpolateState(this.obstacles[i]);
        }
        this.lastInterpolateTime = time;
    }
}