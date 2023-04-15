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
    }
    start() {
        this.renderer.start();

        // simulate ticks with leftovers
        // setInterval(() => {
        //     // simulating lag (for testing)
        //     // if(Math.random() > 0.98){
        //     //     console.log('lag');
        //     //     for(let i = 0; i < 10000000000; i++){
        //     //         // this.tick();
        //     //     }
        //     // }
            
        //     this.simulationFrames = Date.now() - this.lastDate;
        //     this.lastDate = Date.now();
        
        //     let i = 0;
        //     while (i < this.simulationFrames) {
        //         this.simulate();
        //         i += 1000/60;// this.globalState.delta
        //     }
        
        //     // compensating for leftovers
        //     // this.lastDate += this.simulationFrames - i;
        // }, 1000/60);
        requestAnimationFrame(this.run.bind(this));
    }
    initState(data){
        // initializes map client side
        this.map.init(data);
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
    }
}