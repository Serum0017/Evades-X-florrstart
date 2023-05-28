import Player from './player.js';
import ObstacleManager from './simulate/obstacles/!simulateObstacles.js';
import satFactory from './simulate/obstacles/satFactory.js';
import interpolateManager from './render/interpolateObstacle.js';

export default class Map {
    constructor(client){
        this.client = client;

        this.players = {};
        this.obstacles = [];

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
            this.addPlayer(id, data.players[id]);
        }

        this.obstacles = data.obstacles;
        // console.log({data});

        // console.log(data.obstacles);

        for(let i = 0; i < this.obstacles.length; i++){
            this.initObstacle(this.obstacles[i]);
        }

        console.log(this.obstacles);

        this.settings = data.settings ?? this.settings;
        this.name = data.name;

        this.selfId = data.selfId;
        this.self = this.players[this.selfId];
        if(this.self !== undefined){
            this.self.isSelf = true;
        }
        
        this.client.reset();

        // idk why this works but it does
        this.tick = data.tick + Math.round((data.requestTime ?? 0) / 2 * 60 / 1000);

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
                this.players[id].predictionLimit.ticksBehind = Math.min(30,Math.max(0,this.tick - playerData[id].lastTick));
                for(let i = 0; i < this.players[id].predictionLimit.ticksBehind; i++){
                    this.players[id].simulate(this);
                }
                // this.players[id].createSimulateState();
            }
        }

        // obstacles will be simulated server side, rest is client side.
    }
    simulate(){
        // refer to miro for ordering
        // simulate everything
        // Full simulation structure with player prediction and server sided objects:

        // TODO: implement simulation culling (only simulate other players that are inside the client's screen)
        // TODO: make sure players look realistic by simulating them against obstacles. This can only be done when spatial hashing is a thing, otherwise it'll be hella inefficient
        // thus, TODO: spatial hashing!
        for(let id in this.players){
            this.players[id].simulate(this);
        }

        ObstacleManager.simulateObstacles(this.self, this.players, this.obstacles, this.tick, this.client);

        if(this.client.clientType !== 'editor' || this.client.playerActive === true){
            ObstacleManager.runObstacleCollisions(this.self, this.players, this.obstacles, this.tick, this.client);
        }

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
    addObstacle(o){
        this.initObstacle(o);
        this.obstacles.push(o);
    }
    initObstacle(o){
        o.body = satFactory.generateSAT(o.body, o);
        if(o.parametersToReset !== undefined){
            this.resetObstacleParameters(o, o.parametersToReset);
        }
        interpolateManager.createInterpolateState(o);
    }
    removeObstacle(index){
        this.obstacles.splice(index, 1);
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