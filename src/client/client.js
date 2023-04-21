// the equivalent of server.js on server side
import MessageHandler from './simulate/processMessage.js';
import InputHandler from './input.js';
import Game from './simulate/game.js';

export default class Client {
    constructor(){
        this.setupWS();

        this.defineModules();

        this.connected = false;
        this.disconnected = false;
    }
    setupWS() {
        this.ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
        this.ws.binaryType = "arraybuffer";
    }
    defineModules() {
        this.game = new Game(this);
        this.messageHandler = new MessageHandler(this);
        this.inputHandler = new InputHandler(this);

        this.map = this.game.map;
    }
    start() {
        this.ws.addEventListener("message", ( datas ) => {
            this.messageHandler.processMsg(msgpack.decode(new Uint8Array(datas.data)));
        });

        this.ws.addEventListener('close', (event) => {
            this.disconnected = true;
            this.game.renderer.stop();
        })
    }
    reset() {
        this.inputHandler.applyInputs(this.game.map.self.input);
        console.log(this.game.map.self.input);
        this.game.reset();
    }
    send(msg){
        this.ws.send(msgpack.encode(msg));;
    }
    me(){
        return this.map.self;
    }
}