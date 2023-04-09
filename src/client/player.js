import simulatePlayer from './somewhere.js';

const playerSpeed = 1;
const petalDistance = 61.1;
const maxHp = 100;

class Player{
    constructor(id, init){
        this.id = id;
        this.x = init.x;
        this.y = init.y;
        this.r = init.r;

        this.frictions = {};

        // input
        this.angle = 0;
        this.magnitude = 0;

        this.dev = init.dev;

        this.lastRenderState = this.createRenderState();
    }
    simulate(){
        simulatePlayer(this);// run the mini simulate function for 1 tick
    }
    render() {
        ctx.fillStyle = 'black';
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        this.lastRenderState = this.createRenderState();
    }
    createRenderState(){
        return {
            x: this.x,
            y: this.y,
            hp: this.hp
        }
    }
    updatePack(data){
        // TODO: implement differencePack data optimization
        for(let key in data){
            this[key] = data[key];
        }
    }
}