import appendChatMessage from "../chat.js";

let processMsg = {
    chat: (msg) => {
        appendChatMessage(msg.chat);
    },
    init: (msg, player, handler) => {
        handler.game.initState(msg.init);
        
        handler.client.inputHandler.start();
        handler.client.game.start();
    },
    // update: Map object {players, obstacles, settings, name}
    update: (msg, player, handler) => {
        handler.map.updatePack(msg.update);
    } 
}

export default class MessageHandler {
    constructor(client){
        this.client = client;
        this.game = this.client.game;
        this.map = this.game.map;
        this.me = null;
    }
    processMsg(msg={}){
        for(let key in msg){
            if(processMsg[key] !== undefined){
                processMsg[key](msg, this.me, this);
            }
        }
    }
}