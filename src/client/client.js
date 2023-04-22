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

        this.extraPing = Math.random()*1000;
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
        this.ws.addEventListener("open", (e) => {
            this.game.lastRequestedMapTime = performance.now()//+this.extraPing;//performance.now()+this.extraPing;
        });

        this.ws.addEventListener("message", ( datas ) => {
            // setTimeout(() => {
            //     this.messageHandler.processMsg(msgpack.decode(new Uint8Array(datas.data)));
            // }, this.extraPing)
            this.messageHandler.processMsg(msgpack.decode(new Uint8Array(datas.data)));
        });

        this.ws.addEventListener('close', (event) => {
            this.disconnected = true;
            this.game.renderer.stop();
        })
    }
    reset() {
        this.inputHandler.applyInputs(this.game.map.self.input);
        this.game.reset();
    }
    send(msg){
        // setTimeout(() => {
        //     this.ws.send(msgpack.encode(msg));
        // }, this.extraPing)
        this.ws.send(msgpack.encode(msg));
    }
    me(){
        return this.map.self;
    }
}