const express = require('express');
const WebSocket = require('ws');
const msgpack = require("msgpack-lite");

const newId = require('./Simulate/GenerateId.js');
const MessageHandler = require('./Simulate/ProcessMessage.js');
const Game = require('./Simulate/Game.js');

module.exports = class Server {
    constructor(){
        this.clients = {};

        this.defineModules();
    }
    run() {
        this.setupWS();

        this.game.start();
    }
    defineModules(){
        this.messageHandler = new MessageHandler(this);
        this.game = new Game(this);
    }
    setupWS(){
        this.app = express();
        this.wss = new WebSocket.Server({ noServer: true });

        this.app.use(express.static("src/client"));

        this.app.get("/", function (req, res) {
            res.sendFile("index.html");
        });
        
        const srvr = this.app.listen(3000);
        console.log('Server listing on port ' + 3000);
        srvr.on('upgrade', (request, socket, head) => {
            this.wss.handleUpgrade(request, socket, head, socket => {
                this.wss.emit('connection', socket, request);
            });
        });

        this.wss.on("connection", ws=>{
            // player opens new tab
            ws.binaryType = "arraybuffer"
        
            const clientId = newId();
            this.clients[clientId] = ws;
        
            this.initPlayer(clientId);
            
            ws.on("message",(data)=>{
                this.messageHandler.processMsg(msgpack.decode(new Uint8Array(data)), clientId);
            })
            ws.on('close',() => {
                this.removePlayer(clientId);
            })
        })
    }
    initPlayer(id){
        this.requestInitFor(id, this.game.defaultState.mapName);
    }
    removePlayer(id) {
        this.game.removePlayerFromMap(id);
        delete this.clients[id];
    }
    requestInitFor(id, mapName){
        if(Object.keys(this.game.maps[mapName].players).length === 0){
            if(this.game.players[id] !== undefined){
                this.game.removePlayerFromMap(id);
            }

            this.game.addPlayerToMap(id, mapName);

            this.send(id, {init: {selfId: id, initTick: 0, ...this.game.packMap(mapName)}});
        } else {
            // TODO: make sure this is safe and that the player will always recieve a map
            const idsInMap = Object.keys(this.game.maps[mapName].players).filter(playerId => playerId !== id);
            const idToRequest = idsInMap[Math.floor(Math.random()*idsInMap.length)];
            this.send(idToRequest, {requestMap: true, idfor: id});
        }
    }
    recievedMap(id, mapData){
        if(this.game.players[id] !== undefined){
            this.game.removePlayerFromMap(id);
        }
        
        this.game.addPlayerToMap(id, mapData.name);

        console.log(mapData.tick, this.game.maps[mapData.name].tick);
        this.send(id, {init: {selfId: id, initTick: mapData.tick-this.game.maps[mapData.name].tick, ...mapData, players: this.game.maps[mapData.name].players}});
    }
    send(id, msg){
        this.clients[id].send(msgpack.encode(msg));
    }
    broadcastInMap(mapName, msg){
        for(let id in this.game.maps[mapName].players){
            this.send(id, msg);
        }
    }
    forEachMap(fn){
        for(let mapName in this.game.maps){
            fn(this.game.maps[mapName]);
        }
    }
    movePlayerToMap(id, mapName){
        this.requestInitFor(id, mapName);
    }
}