import appendChatMessage from "../chat.js";

let processMsg = {
    chat: (msg) => {
        appendChatMessage(msg.chat);
    },
    init: (msg, player, messageHandler) => {
        messageHandler.map.init(msg.init);
        
        messageHandler.client.inputHandler.start();
        messageHandler.client.game.start();
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