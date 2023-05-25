import Game from "../client/simulate/game.js";
import InputHandler from "../client/input.js";
import initDefaultMap from "./initDefaultMap.js";
import UIManager from "./uiManager.js";

export default class EditorClient {
    constructor(){
        this.defineModules();

        this.start();
    }
    defineModules() {
        this.game = new Game(this);
        this.inputHandler = new InputHandler(this);
        this.uiManager = new UIManager(this);
        initDefaultMap(this);
    }
    start() {
        this.game.start();
        this.inputHandler.start();
        this.uiManager.start();
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