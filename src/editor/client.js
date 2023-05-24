import Game from "../client/simulate/game.js";
import InputHandler from "../client/input.js";

export default class EditorClient {
    constructor(){
        this.defineModules();
    }
    defineModules() {
        this.game = new Game(this);
        this.messageHandler = new MessageHandler(this);
        this.inputHandler = new InputHandler(this);

        this.map = this.game.map;
    }
}