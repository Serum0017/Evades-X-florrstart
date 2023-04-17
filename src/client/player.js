import simulatePlayer from './simulate/simulatePlayer.js';

export default class Player{
    constructor(id, init){
        this.id = id;
        // this.x = init.x;
        // this.y = init.y;
        // this.r = init.r;

        this.frictions = {};

        // input
        this.angle = 0;
        this.magnitude = 0;

        this.dev = false;

        this.lastRenderState = this.createRenderState();

        for(let key in init){
            this[key] = init[key];
        }

        this.renderX = this.x;
        this.renderY = this.y;
    }
    simulate(map){
        // basic simulation that doesnt require anything else; same thing used in prediction
        simulatePlayer(this, map);
    }
    render(ctx, canvas, camera) {
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
        }
    }
    updatePack(data){
        // TODO: implement differencePack data optimization
        for(let key in data){
            this[key] = data[key];
        }
    }
    pack(){
        // what we send to the server (TODO: differencepack)
        return this;
    }
}