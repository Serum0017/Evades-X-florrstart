const express = require('express');
const WebSocket = require('ws');
const msgpack = require("msgpack-lite");

const Map = require('./Simulate/Map.js');
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

        this.game.run();
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
        
            this.addPlayer(clientId);

            this.send({init: {selfId: clientId, ...this.game.packMap(clientId)}}, clientId);
            
            ws.on("message",(data)=>{
                this.messageHandler.processMsg(msgpack.decode(new Uint8Array(data)), clientId);
            })
            ws.on('close',() => {
                this.removePlayer(clientId);
            })
        })
    }
    addPlayer(id){
        // add player to the game
        this.game.addPlayerToMap(id);

        // send init data as well
    }
    removePlayer(id) {
        this.game.removePlayerFromMap(id);
        delete this.clients[id];
    }
    send(msg,id){
        this.clients[id].send(msgpack.encode(msg));
    }
    broadcastInMap(mapName, msg){
        for(let id in this.game.maps[mapName].players){
            this.send(msg, id);
        }
    }
    forEachMap(fn){
        for(let mapName in this.game.maps){
            fn(this.game.maps[mapName]);
        }
    }
}