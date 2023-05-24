import Renderer from '../render/!render.js';
import Map from '../map.js';

// this file handles all of the game state but other things like simulatePhysics or render actually do most of the work

export default class Game {
    constructor(client){
        this.client = client;

        this.renderer = new Renderer(this.client);
        this.map = new Map(this.client);

        this.lastTime = performance.now();
        this.accum = 0;

        this.lastRequestedMapTime = 0;
    }
    start() {
        this.gameLoop = requestAnimationFrame(this.run.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.gameLoop);
        this.renderer.renderDisconnectedText();
        this.renderer.stop();
    }
    reset() {
        this.renderer.reset();
        cancelAnimationFrame(this.gameLoop);
        clearInterval(this.gameLoop);
    }
    initState(data){
        // initializes map client side
        this.map.init(data);

        if(data.requestTime !== undefined){
            this.accum += (performance.now() - this.lastRequestedMapTime - data.requestTime)/2;
        }
    }
    run(){
        this.accum += performance.now() - this.lastTime;
        this.lastTime = performance.now();
        
        if(this.accum > 1000 / 60){
            while(this.accum >= 1000 / 60){
                this.simulate();
                this.accum -= 1000 / 60;
            }
        }

        this.renderer.render();

        this.gameLoop = requestAnimationFrame(this.run.bind(this));
    }
    simulate(){
        // simulate 1 tick
        this.map.simulate();

        // run tickwise rendering stuff
        this.renderer.updateState();

        this.sendState();
    }
    sendState(){
        this.client.send({update: this.map.self.pack(), mapTick: this.map.tick});
    }
    addPlayer(id, init){
        this.map.addPlayer(id, init);
    }
    removePlayer(id){
        this.map.removePlayer(id);
    }
}