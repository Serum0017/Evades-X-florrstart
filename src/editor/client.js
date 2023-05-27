import Game from "../client/simulate/game.js";
import InputHandler from "../client/input.js";
import initDefaultMap from "./initDefaultMap.js";
import UIManager from "./ui/!uiManager.js";
import SelectionManager from "./selectionManager.js";

export default class EditorClient {
    constructor(){
        this.clientType = 'editor';
        this.playerActive = false;
        
        this.defineModules();

        this.start();
    }
    defineModules() {
        this.game = new Game(this);
        this.inputHandler = new InputHandler(this);
        this.selectionManager = new SelectionManager(this);
        this.uiManager = new UIManager(this);
        initDefaultMap(this);
    }
    start() {
        this.game.start();
        this.inputHandler.start();
        this.selectionManager.start();
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