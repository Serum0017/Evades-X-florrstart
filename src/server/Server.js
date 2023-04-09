const express = require('express');
const WebSocket = require('ws');
const msgpack = require("msgpack-lite");


const Map = require('./Simulate/Map.js');
const Player = require('./Player.js');
const newId = require('./Modules/GenerateId.js');

class Server {
    constructor(){
        this.clients = {};

        this.defineModules();

        this.defaultState = {
            x: 25,
            y: 25,
            angle: 0,
            magnitude: 0,
            dev: false
        }
    }
    run() {
        this.setupWS();

        this.game.run();
    }
    defineModules(){
        this.messageHandler = new MessageHandler(this);
        this.game = new Game();
    }
    setupWS(){
        this.app = express();
        this.wss = new WebSocket.Server({ noServer: true });

        this.app.use(express.static("src/client"));

        this.app.get("/", function (req, res) {
            res.sendFile("index.html");
        });

        const srvr = app.listen(3000);
        srvr.on('upgrade', (request, socket, head) => {
            wss.handleUpgrade(request, socket, head, socket => {
                wss.emit('connection', socket, request);
            });
        });

        this.wss.on("connection", ws=>{
            // player opens new tab
            ws.binaryType = "arraybuffer"
        
            const clientId = newId();
            this.clients[clientId] = ws;
        
            this.addPlayer(clientId, defaultState);
            
            ws.on("message",(data)=>{
                MessageHandler.processMsg(msgpack.decode(new Uint8Array(data)));
            })
            ws.on('close',() => {
                this.removePlayer(clientId);
            })
        })
    }
    addPlayer(id, init){
        // add player to the game
        this.game.addPlayerToMap(new Player(id, init));
    }
    removePlayer(id) {
        this.game.removePlayerFromMap(players[id], players[id].map);
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