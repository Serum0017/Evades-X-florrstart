import Player from './player.js';
import ObstacleManager from './simulate/obstacles/!simulateObstacles.js';
import generateSAT from './simulate/obstacles/satFactory.js';
import transformManager from './simulate/obstacles/transformBody.js';

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

        for(let i = 0; i < this.obstacles.length; i++){
            this.obstacles[i].sat = generateSAT(this.obstacles[i]);
            transformManager.setPivot(this.obstacles[i]);
        }

        this.settings = data.settings;
        this.name = data.name;

        this.selfId = data.selfId;
        this.self = this.players[this.selfId];
        
        this.client.reset();

        this.tick = data.tick;

        this.lastState = this.createRenderState();

        this.playerSimulateAccum = 0;
    }
    updatePack(playerData){
        for(let id in playerData){
            if(id !== this.selfId.toString()){
                this.players[id].updatePack(playerData[id]);

                // simulate extra ticks
                for(let i = 0; i < Math.min(100,this.tick - playerData[id].lastTick); i++){
                    this.players[id].simulate(this);
                }
                this.players[id].updateInterpolate();
            }
        }

        // obstacles will be simulated server side, rest is client side.
    }
    simulate(){
        // create a deep copy of the last state for rendering
        this.lastState = this.createRenderState();

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
    createRenderState(){
        return window.structuredClone({
            obstacles: this.obstacles,
            time: performance.now()
        });
    }
}