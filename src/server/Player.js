module.exports = class Player{
    constructor(id, init){
        this.id = id;
        this.x = init.x;
        this.y = init.y;
        this.r = init.r;

        this.frictions = {};

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
    }
    simulate(){
        // basic simulation that doesnt require anything else; same thing used in prediction
        simulatePlayer(this);
    }
    initPack(){
        return this;
    }
    updatePack() {
        // TODO: implement differencePack optimization
        return this;
    }
}