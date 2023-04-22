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

        this.lastSimulateState = this.createSimulateState();

        for(let key in init){
            this[key] = init[key];
        }

        this.renderX = this.x;
        this.renderY = this.y;
    }
    simulate(map){
        this.lastSimulateState = this.createSimulateState();
        // basic simulation that doesnt require anything else; same thing used in prediction
        simulatePlayer(this, map);
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
    }
    updateInterpolate(map){
        // const time = (performance.now() - this.lastSimulateState.time) * (60/1000);
        // const interpolate = (start, end, time) => {
        //     return start * (1-time) + end * time;
        // }
        // this.renderX = interpolate(this.renderX, this.x, 0.2**time);
        // this.renderY = interpolate(this.renderY, this.y, 0.2**time);
        if(this.dead === true)return;
        const time = (performance.now() - this.lastSimulateState.time) * (60/1000);
        this.renderX = this.lastSimulateState.x * (1-time) + this.x * time;
        this.renderY = this.lastSimulateState.y * (1-time) + this.y * time;
        // this.renderX = this.x + Math.min(this.xv, this.x - this.lastSimulateState.x) * (performance.now() - this.lastSimulateState.time) * (60/1000);
        // this.renderY = this.y + Math.min(this.yv, this.y - this.lastSimulateState.y) * (performance.now() - this.lastSimulateState.time) * (60/1000);
        // if (this.renderX - this.r < 0) {
        //     this.renderX = this.r;
        // }
        // if (this.renderX + this.r > map.settings.dimensions.x) {
        //     this.renderX = map.settings.dimensions.x - this.r;
        // }
        // if (this.renderY - this.r < 0) {
        //     this.renderY = this.r;
        // }
        // if (this.renderY + this.r > map.settings.dimensions.y) {
        //     this.renderY = map.settings.dimensions.y - this.r;
        // }
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