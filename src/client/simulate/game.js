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

        this.mapRequestedTime = 0;

        this.serverTimeOffset = 0;
    }
    start() {
        this.renderer.start();
        requestAnimationFrame(this.run.bind(this));
    }
    reset() {
        this.renderer.reset();
    }
    initState(data){
        // initializes map client side
        this.map.init(data);

        this.accum += performance.now()-this.getServerTime();
        this.serverTimeOffset = data.initTime-performance.now();
        // this.accum += performance.now() - this.mapRequestedTime;
        // console.log(performance.now(), this.mapRequestedTime);
        // console.log('simulating for ' + ((performance.now() - this.mapRequestedTime) * 60/1000) + ' ticks');
    }
    getServerTime(){
        // server time is the server's time + one way ping to client
        return this.serverTimeOffset + performance.now();
        // when we send it in the init map, we recieve time offset by oneWayClientPing - otherWayClientPing at the server. This effectively cancels out.
    }
    // tick every 1/60th of a second no matter the fps
    run(){
        this.accum += performance.now() - this.lastTime;
        this.lastTime = performance.now();
        
        if(this.accum > 1000 / 60){
            while(this.accum >= 1000 / 60){
                this.simulate();
                this.accum -= 1000 / 60;
            }
        }

        requestAnimationFrame(this.run.bind(this));
    }
    simulate(){
        // simulate 1 tick
        this.map.simulate();

        this.sendState();
    }
    sendState(){
        this.client.send({update: this.map.self.pack()});
    }
    addPlayer(id, init){
        this.map.addPlayer(id, init);
    }
    removePlayer(id){
        this.map.removePlayer(id);
    }
}