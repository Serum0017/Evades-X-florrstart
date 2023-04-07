var HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);
ws.binaryType = "arraybuffer";

let players = {};
let enemies = [];
let dimensions = {x: 235, y: 235}; 

let petalSlots = [];

let equippedPetalSlots = [];

let processMsg = {
    chat: (msg) => {
        appendChatMessage(msg.chat);
    },
    connected: (msg) => {},
    selfId: (msg) => {},
    time: (msg) => {},
    playerId: (msg) => {},
    petalId: (msg) => {},
    initialState: (msg) => {
        players = {};
        enemies = [];
        
        for(let id in msg.initialState.players){
            players[id] = new Player(id, msg.initialState.players[id]);
        }

        window.selfId = msg.selfId;
        window.me = () => {
            return players[window.selfId];
        }
        
        for(let i = 0; i < msg.initialState.enemies.length; i++){
            enemies.push(new Enemy(msg.initialState.enemies[i]));
        }

        window.connected = true;

        dimensions = msg.initialState.dimensions;

        petalSlots = [];
    },
    newPlayer: (msg) => {
        players[msg.newPlayer.id] = new Player(msg.newPlayer.id, msg.newPlayer);
    },
    newEnemy: (msg) => {
        enemies.push(new Enemy(msg.newEnemy));
    },
    newPetal: (msg) => {
        players[msg.playerId].petals[msg.petalId] = new Petal(msg.newPetal);

        if(msg.playerId == window.selfId){
            const petalSlotPadding = 10;
            const petalSlotSize = 44.5;
            
            equippedPetalSlots[msg.petalId] = new PetalSlot({
                type: players[msg.playerId].petals[msg.petalId].petalSlotType,
                x: petalSlotPadding + petalSlotSize/2,
                y: (petalSlotPadding + petalSlotSize)*msg.petalId + petalSlotSize/2 + petalSlotPadding,
                rarity: players[msg.playerId].petals[msg.petalId].rarity,
                r: 44.5,
                isStationary: true
            });
        }
    },
    removePlayer: (msg) => {
        if(msg.removePlayer == window.selfId)return;// to prevent messages being sent out of order
        delete players[msg.removePlayer];
    },
    removeSelf: (msg) => {
        // reset game
        connected = false;
        location.reload();// temp (fr this time)
        // alert('dead');
    },
    state: (msg) => {
        for(let id in msg.state.players){
            players[id].updatePack(msg.state.players[id]);
        }

        for(let i = 0; i < msg.state.enemies.length; i++){
            enemies[i].updatePack(msg.state.enemies[i]);
        }
    },
    drops: (msg) => {
        for(let i = 0; i < msg.drops.length; i++){
            petalSlots.push(new PetalSlot(msg.drops[i]));
        }
    },
    collectPetal: (msg) => {
        for(let i = 0; i < petalSlots.length; i++){
            if(petalSlots[i].id === msg.collectPetal){
                petalSlots[i].deadTimer = 20;
                break;
            }
        }
    },
    win: (msg) => {
        console.log('win');
        ws.close();
        window.won = true;
    }
}

ws.addEventListener("message", ( datas ) => {
    const msg = msgpack.decode(new Uint8Array(datas.data));
    
    for(let key in msg){
        if(processMsg[key]){
            processMsg[key](msg);// hash table faster :D
        } else {
            console.log(`Client Sided response for ${key} isnt defined! go to index.js and define it rn.`);
        }
    }
});

ws.addEventListener('close', (event) => {
    window.disconnected = true;
    console.log('dc');
    ref.gui.style.display = 'none';
})

function send(msg){
    if(window.connected === true){
        ws.send(msgpack.encode(msg));
    }
}

window.onkeydown = (event) => trackKeys(event);
window.onkeyup = (event) => trackKeys(event);

render();