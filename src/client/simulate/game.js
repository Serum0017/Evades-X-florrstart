import Renderer from '../render/!render.js';
import Map from '../map.js';

// this file handles all of the game state but other things like simulatePhysics or render actually do most of the work

export default class Game {
    constructor(client){
        this.client = client;

        this.renderer = new Renderer(this.client);
        this.map = new Map(this.client);
    }
    start() {
        this.renderer.start();
    }
    initState(data){
        // initializes map client side
        this.map.init(data);
    }
    simulate(){
        // simulate 1 tick
        // refer to miro for ordering
    }
}