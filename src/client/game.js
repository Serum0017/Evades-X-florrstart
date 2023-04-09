import Renderer from './render.js';

// this file handles all of the game state but other things like simulatePhysics or render actually do most of the work

class Game {
    constructor(){
        this.renderer = new Renderer();
    }
    initState(){
        // initializes map
    }
    simulate(){
        // simulate 1 tick
        // refer to miro
    }
    renderGame(){
        Renderer.renderGame();
    }
}