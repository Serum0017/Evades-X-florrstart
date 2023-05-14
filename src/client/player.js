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

        for(let key in init){
            this[key] = init[key];
        }

        this.body = new SAT.Box(new SAT.Vector(this.x - this.r,this.y-this.r),this.r*2,this.r*2).toPolygon();//new SAT.Circle(new SAT.Vector(this.x, this.y), this.r);
        this.shape = 'circle';
        this.body.angle = 0;
        this.isPlayer = true;

        this.renderX = this.x;
        this.renderY = this.y;
        this.renderR = this.r/4;

        this.createSimulateState(performance.now());
    }
    simulate(map){
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
        if(this.shape === 'circle'){
            ctx.arc(this.renderX, this.renderY, this.renderR, 0, Math.PI*2);
        } else if(this.shape === 'poly') {
            ctx.translate(this.renderX - this.x, this.renderY - this.y);
            ctx.moveTo(this.body.calcPoints[0].x + this.body.pos.x, this.body.calcPoints[0].y + this.body.pos.y);
            for(let i = 1; i < this.body.calcPoints.length; i++){
                ctx.lineTo(this.body.calcPoints[i].x + this.body.pos.x, this.body.calcPoints[i].y + this.body.pos.y);
            }
            ctx.lineTo(this.body.calcPoints[0].x + this.body.pos.x, this.body.calcPoints[0].y + this.body.pos.y);
            ctx.translate(this.x - this.renderX, this.y - this.renderY);
        }
        ctx.fill();

        if(this.god === true){
            ctx.strokeStyle = 'purple';
            ctx.lineWidth = 5;
            ctx.stroke();
        }

        ctx.closePath();

        this.updateInterpolate();
    }
    updateInterpolate(){
        this.renderR = this.renderR * 0.917 + this.r * 0.083;
        if(this.dead === true)return;
        const time = (performance.now() - this.lastSimulateState.time) * (60/1000);
        this.renderX = this.lastSimulateState.x * (1-time) + this.x * time;
        this.renderY = this.lastSimulateState.y * (1-time) + this.y * time;
    }
    createSimulateState(time){
        this.lastSimulateState = {
            x: this.x,
            y: this.y,
            time
        }
        this.updateInterpolate();
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