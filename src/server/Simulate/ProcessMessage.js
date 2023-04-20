let processMsg = {
    chat: (msg, player, handler) => {
        handler.server.broadcastInMap(player.map, {chat: /*processChat module if anything more than slice is needed*/msg.chat.slice(0,100)});
    },
    angle: (msg, player, handler) => {
        player.angle = msg.angle;
        player.magnitude = Math.min(300, msg.magnitude);
    },
    input: (msg, player, handler) => {
        player.input = msg.input;
        // player's input is not broadcast here; this will be taken care of in updatepack
    },
    update: (msg, player, handler) => {
        // TODO: decide if we really need to have update and input separately and merge them if not
        // my original idea was that input could be sent 60tps and we could get away with updating like 15tps so maybe test that
        player.updateState(msg.update);
    },
    changeMap: (msg, player, handler) => {
        handler.server.movePlayerToMap(player.id, msg.changeMap);// TODO: add some anti-cheat measures here so that you can't just send to wahtever map you want lol
    },
    mapData: (msg, player, handler) => {
        // sending the map back to the server either for anti cheat or init
        handler.server.recievedMap(msg.idfor, msg.mapData);
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