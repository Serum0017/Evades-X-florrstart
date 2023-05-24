import Game from "../client/simulate/game.js";
import InputHandler from "../client/input.js";
import defaultMapData from "./defaultMap.js";

export default class EditorClient {
    constructor(){
        this.defineModules();

        this.start();
    }
    defineModules() {
        this.game = new Game(this);
        this.inputHandler = new InputHandler(this);
        this.map = this.game.map;
    }
    start() {
        this.game.initState(defaultMapData);
        this.game.start();
        this.inputHandler.start();
    }
    reset() {
        // this.inputHandler.applyInputs(this.game.map.self.input);
        this.game.reset();
    }
    send (){}
    me() {
        return this.map.self;
    }
}