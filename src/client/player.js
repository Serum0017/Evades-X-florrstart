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

        for(let key in init){
            this[key] = init[key];
        }

        this.renderX = this.x;
        this.renderY = this.y;

        this.lastSimulateState = this.createSimulateState();
    }
    simulate(map){
        // basic simulation that doesnt require anything else; same thing used in prediction
        simulatePlayer(this, map);

        this.lastSimulateState = this.createSimulateState();
    }
    respawn(){
        // TODO
        // this.renderRadius = 0;
        this.x = this.spawn.x;
        this.y = this.spawn.y;
        this.dead = false;
    }
    render(ctx, canvas, camera) {
        ctx.fillStyle = 'black';
        if(this.dead === true){
            ctx.fillStyle = 'red';
        }
        
        ctx.beginPath();
        ctx.arc(this.renderX, this.renderY, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        this.updateInterpolate();
    }
    updateInterpolate(){
        if(this.dead === true)return;
        const time = (performance.now() - this.lastSimulateState.time) * (60/1000);
        this.renderX = this.lastSimulateState.x * (1-time) + this.x * time;
        this.renderY = this.lastSimulateState.y * (1-time) + this.y * time;
    }
    createSimulateState(){
        return {
            x: this.x,
            y: this.y,
            time: performance.now()
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