let processMsg = {
    chat: (msg, player, messageHandler) => {
        messageHandler.server.broadcastInMap(player.map, {chat: /*processChat module if anything more than slice is needed*/msg.chat.slice(0,100)});
    },
    angle: (msg, player, handler) => {
        player.angle = msg.angle;
        player.magnitude = Math.min(300, msg.magnitude);
        player.lastInputTimer = Date.now();
    },
}

module.exports = class MessageHandler {
    constructor(server){
        this.server = server;
    }
    processMsg(msg={}, id){
        for(let key in msg){
            if(processMsg[key] !== undefined){
                processMsg[key](msg, server.players[id], this);
            }
        }
    }
}