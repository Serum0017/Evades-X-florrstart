if(require !== undefined){
    const minPacker = require('./minPack.js');
}

class Player{
    constructor(id, init){
        this.id = id;
        this.x = init.x;
        this.y = init.y;
        this.r = init.r;

        this.frictions = {};

        this.speed = 430 / 60 //equal to 430 / 60, the same speed from semioldevade
        this.friction = 0.4;

        this.map = init.map.name;

        // input
        this.angle = 0;
        this.magnitude = 0;

        this.dev = init.dev;
        this.god = init.god;

        this.input = {
            up: false,
            left: false,
            down: false,
            right: false,
            shift: false
        }

        this.shape = 'circle';
        this.shapePoints = [];
        
        this.xv = init.xv;
        this.yv = init.yv;

        // TODO: fix this; spawn just sets to 0,0
        this.spawn = init.map.settings.spawn;
        this.dead = false;

        this.touching = {ground: [], platformer: [], safe: [], changeRadius: [], changeShape: []};
        this.axisSpeedMult = {x: 1, y: 1, angle: 0};
        this.pivot = {x: 0, y: 0};
        this.difference = {x: this.r*2, y: this.r*2};

        this.lastTick = 0;

        this.packKeys = ['x','y','r','speed','friction','angle','magnitude','dev','god','input','shape','shapePoints','xv','yv','dead','axisSpeedMult','difference','pivot'];
        this.updateLastState();
    }
    initPack(){
        return this;
    }
    updatePack() {
        this.minPack = minPacker.minPack(this.lastUpdateState, this.getPackKeys());
        if(typeof this.minPack === 'object'){
            this.minPack.lastTick = this.lastTick;
        } else {
            // handling "NOTINCLUDED"
            this.minPack = {lastTick: this.lastTick};
        }
        this.updateLastState();
        return this.minPack;
    }
    updateLastState(){
        this.lastUpdateState = minPacker.cloneObject(this.getPackKeys());
    }
    getPackKeys(){
        return this.packKeys.reduce((acc, k) => {acc[k] = this[k]; return acc;}, {})
    }
    updateState(data, tick) {
        // console.log(data);
        // TODO: make sure this is safe and wont crash the server (also difference pack)
        // for(let key in data){
        //     if(key === 'lastUpdateState')continue;// TODO: remove this TEMP (this is only here when half of the sysetm is working)
        //     this[key] = data[key];
        // }

        minPacker.reconstructMinPack(this, data);
        this.lastTick = tick;
    }
}

if(module !== undefined){
    module.exports = Player;
}