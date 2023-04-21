import Player from './player.js';
import ObstacleManager from './simulate/obstacles/!simulateObstacles.js';
import generateSAT from './simulate/obstacles/satFactory.js';

export default class Map {
    constructor(client){
        this.client = client;
        this.game = this.client.game;

        this.players = {};
        this.obstacles = {};

        this.settings = {dimensions: {x: 1000, y: 1000}, spawn: {x: 50, y: 50}};
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
        console.log({data});

        for(let i = 0; i < this.obstacles.length; i++){
            // if(this.obstacles[i].sat.points === undefined){
            //     // no points - its a circle
            //     const lastData = {offset: {x: this.obstacles[i].sat.offset.x, y: this.obstacles[i].sat.offset.y}};
            //     this.obstacles[i].sat = new SAT.Circle(new SAT.Vector(this.obstacles[i].sat.pos.x, this.obstacles[i].sat.pos.y), this.obstacles[i].sat.r);
            //     this.obstacles[i].sat.setOffset(lastData.offset);
                
            //     // const sat = new SAT.Circle();
            //     // for(let key in this.obstacles[i].sat){
            //     //     const prop = this.obstacles[i].sat[key];
            //     //     // converting to SAT.vector if necessary
            //     //     if(Array.isArray(prop)){
            //     //         for(let p = 0; p < prop.length; p++){
            //     //             if(prop[p].x !== undefined && prop[p].y !== undefined){
            //     //                 sat[key] = new SAT.Vector(prop[p].x, prop[p].y);
            //     //             } else {
            //     //                 sat[key] = prop[p];
            //     //             }
            //     //         }
            //     //     } else {
            //     //         if(prop.x !== undefined && prop.y !== undefined){
            //     //             sat[key] = new SAT.Vector(prop.x, prop.y);
            //     //         } else {
            //     //             sat[key] = prop;
            //     //         }
            //     //     }
            //     // }
            //     // this.obstacles[i].sat = sat;
            // } else {
            //     // there are points - its a polygon
            //     const lastData = {angle: this.obstacles[i].sat.angle, offset: {x: this.obstacles[i].sat.offset.x, y: this.obstacles[i].sat.offset.y}};
            //     this.obstacles[i].sat = new SAT.Polygon(new SAT.Vector(), ...this.obstacles[i].sat.points.map(p => new SAT.Vector(p.x, p.y)));
            //     this.obstacles[i].sat.setOffset(lastData.offset);
            //     this.obstacles[i].sat.setAngle(lastData.angle);

            //     // const sat = new SAT.Polygon();
            //     // for(let key in this.obstacles[i].sat){
            //     //     const prop = this.obstacles[i].sat[key];
            //     //     // converting to SAT.vector if necessary
            //     //     if(Array.isArray(prop)){
            //     //         for(let p = 0; p < prop.length; p++){
            //     //             if(prop[p].x !== undefined && prop[p].y !== undefined){
            //     //                 sat[key] = new SAT.Vector(prop[p].x, prop[p].y);
            //     //             } else {
            //     //                 sat[key] = prop[p];
            //     //             }
            //     //         }
            //     //     } else {
            //     //         if(prop.x !== undefined && prop.y !== undefined){
            //     //             sat[key] = new SAT.Vector(prop.x, prop.y);
            //     //         } else {
            //     //             sat[key] = prop;
            //     //         }
            //     //     }
            //     // }
            //     // this.obstacles[i].sat = sat;
            // }
            this.obstacles[i].sat = generateSAT(this.obstacles[i]);
        }

        this.settings = data.settings;
        this.name = data.name;

        this.selfId = data.selfId;
        this.self = this.players[this.selfId];
        
        this.client.reset();

        this.tick = 0;

        this.initTime = performance.now();
    }
    updatePack(playerData){
        for(let id in playerData){
            if(id !== this.selfId.toString()){
                this.players[id].updatePack(playerData[id]);
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
}