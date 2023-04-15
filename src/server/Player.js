module.exports = class Player{
    constructor(id, init){
        this.id = id;
        this.x = init.x;
        this.y = init.y;
        this.r = init.r;

        this.frictions = {};

        this.speed = 430 / 100;
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
            right: false
        }

        this.shape = 'circle';
        
        this.xv = init.xv;
        this.yv = init.yv;

        this.top = {x: this.x - this.r, y: this.y - this.r};
        this.bottom = {x: this.x + this.r, y: this.y + this.r};
    }
    initPack(){
        return this;
    }
    updatePack() {
        // TODO: implement differencePack optimization
        return this;
    }
}