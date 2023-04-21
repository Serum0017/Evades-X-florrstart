import appendChatMessage from "../chat.js";

let processMsg = {
    chat: (msg) => {
        appendChatMessage(msg.chat);
    },
    init: (msg, handler, player) => {
        handler.game.initState(msg.init);
        
        handler.client.inputHandler.start();
        handler.client.game.start();

        handler.client.send({pong: handler.client.game.map.initTime});
    },
    // update: Map object {players, obstacles, settings, name}
    update: (msg, handler, player) => {
        handler.map.updatePack(msg.players);
    },
    leave: (msg, handler, player) => {
        handler.game.removePlayer(msg.leave);
    },
    join: (msg, handler, player) => {
        if(msg.join.id === handler.map.selfId){
            return;
        }
        handler.game.addPlayer(msg.join.id, msg.join);
    },
    requestMap: (msg, handler, player) => {
        handler.client.send({mapData: handler.map.initPack(), idfor: msg.idfor, initTime: handler.game.getServerTime()});
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
                processMsg[key](msg, this, this.me);
            }
        }
    }
}