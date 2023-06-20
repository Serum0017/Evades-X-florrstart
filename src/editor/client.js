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
    // shared methods for handling common things
    initObstacle(o){
        this.uiManager.addInitObstacle(o);
        this.selectionManager.defineResizePoints(o);
    }
    addObstacle(o){
        this.game.map.addObstacle(o);
        this.initObstacle(o);
    }
    updateObstacle(o){
        this.uiManager.editMenuManager.regenerateObstacle(o);
        this.uiManager.updateInitObstacle(o);
    }
    deleteObstacle(o){
        // note: this just updates the removal but doesn't actually remove the obstacle from the map
        this.uiManager.deleteInitObstacle(o);
    }
}