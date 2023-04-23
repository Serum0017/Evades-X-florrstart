module.exports = class Player{
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

        this.input = {
            up: false,
            left: false,
            down: false,
            right: false,
            shift: false
        }

        this.shape = 'circle';
        
        this.xv = init.xv;
        this.yv = init.yv;

        this.top = {x: this.x - this.r, y: this.y - this.r};
        this.bottom = {x: this.x + this.r, y: this.y + this.r};

        this.spawn = init.map.settings.spawn;
        this.dead = false;

        this.lastTick = 0;
    }
    initPack(){
        return this;
    }
    updatePack() {
        // TODO: implement differencePack optimization
        return this;
    }
    updateState(data, tick) {
        // console.log(data);
        // TODO: make sure this is safe and wont crash the server (also difference pack)
        for(let key in data){
            this[key] = data[key];
        }

        this.lastTick = tick;
    }
}