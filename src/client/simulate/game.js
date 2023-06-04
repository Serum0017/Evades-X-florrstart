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

        this.ticksPerSecond = 60;
        this.ticksPerSecond /= 1000;

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
    }
    initState(data){
        // initializes map client side
        this.map.init(data);

        if(data.requestTime !== undefined){
            this.accum +=/*-= if using catch up/ slow down approximate simulation system*/ (performance.now() - this.lastRequestedMapTime - data.requestTime)/2;
        }
    }
    run(time){
        // each tick should happen every 1 / this.ticksPerSecond seconds.
        // Thus, simulating 1 tick as a given and then compensate if necessary
        this.accum += time - this.lastTime;
        this.lastTime = time;

        if(this.accum > 1 / this.ticksPerSecond){
            this.map.createSimulateState();
            while(this.accum > 1 / this.ticksPerSecond){
                this.simulateTick();
            }
        }

        this.renderer.render();

        // if(Math.abs(this.accum) < 1 / this.ticksPerSecond){
            // everything's good, just tick once
            // this.simulateTick();
        // } else if(this.accum < 0){
        //     // we oversimulated and now there's a debt! This means we have to wait for more time to come in.
        //     return;
        // } else {
        //     // we're falling behind! catch up however many ticks we have to to be within the 1 / this.ticksPerSecond range
        //     // while its outside the range simulate. if we break that means that we must be inside
        //     // we only want to simulate twice instead of doing a while loop because that might cause a recurring spiral of lag
        //     this.simulateTick();
        //     this.simulateTick();
        // }

        requestAnimationFrame(this.run.bind(this));
    }
    simulateTick(){
        this.accum -= 1 / this.ticksPerSecond;
        this.map.simulate();

        // run tickwise rendering stuff
        this.renderer.updateState();

        this.sendState();
    }
    getInterpolationRatio(){
        // return (performance.now() - this.lastTime) * this.ticksPerSecond;
        return this.accum * this.ticksPerSecond;
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