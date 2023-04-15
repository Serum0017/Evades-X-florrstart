let processMsg = {
    chat: (msg, player, handler) => {
        handler.server.broadcastInMap(player.map, {chat: /*processChat module if anything more than slice is needed*/msg.chat.slice(0,100)});
    },
    angle: (msg, player, handler) => {
        player.angle = msg.angle;
        player.magnitude = Math.min(300, msg.magnitude);
        player.lastInputTimer = Date.now();
    },
    input: (msg, player, handler) => {
        player.input = msg.input;
        // player's input is not broadcast here; this will be taken care of in updatepack
    }
}

module.exports = class MessageHandler {
    constructor(server){
        this.server = server;
    }
    processMsg(msg={}, id){
        for(let key in msg){
            if(processMsg[key] !== undefined){
                processMsg[key](msg, this.server.game.players[id], this);
            }
        }
    }
}