import transformBody from './simulate/obstacles/transformBody.js';
import simulatePlayer from './simulate/simulatePlayer.js';
import minPacker from './minPack.js';

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

        this.changeShape({shapeType: this.shape, shapePoints: this.shapePoints})//new SAT.Circle(new SAT.Vector(this.x, this.y), this.r);
        this.body.angle = 0;
        this.shapePoints = init.shapePoints;
        this.last = {x: this.x, y: this.y};

        this.isPlayer = true;

        this.renderX = this.x;
        this.renderY = this.y;
        this.renderR = this.r/4;

        this.packKeys = init.packKeys;
        this.accumPack = this.getPackKeys();
        this.updateLastState();

        this.createSimulateState(performance.now());
    }
    simulate(map){
        // basic simulation that doesnt require anything else; same thing used in prediction
        simulatePlayer(this, map);
    }
    changeShape({shapeType, shapePoints}){
        // TODO
        // if(shapeType !== this.lastSimulateShape){
        //     this.renderR = 0;
        // }
        this.shape = shapeType;
        this.body = this.getShape({shapeType, shapePoints});
        this.shapePoints = shapePoints;
		this.boundingBox = this.body.getBoundingBox();
		this.difference = {x: this.boundingBox.w, y: this.boundingBox.h};
    }
    getShape({shapeType, shapePoints}){
        let body;
        switch (shapeType){
			case 'circle':
				body = new SAT.Circle(new SAT.Vector(this.x,this.y), this.r);
				break;
			case 'poly':
				body = new SAT.Polygon(new SAT.Vector(this.x,this.y), [...shapePoints.map(point => new SAT.Vector(point.x*this.r/24.5, point.y*this.r/24.5))]);
				break;
			default:
				body = new SAT.Circle(new SAT.Vector(this.x,this.y), this.r);
				break;
		}
        return body;
    }
    respawn(){
        // TODO
        this.renderR = 0;
        const last = {x: this.x, y: this.y};
        this.x = this.spawn.x;
        this.y = this.spawn.y;
        this.dead = false;
        transformBody(this, {x: this.x - last.x, y: this.y-last.y, rotation: 0});
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
            ctx.moveTo(this.body.calcPoints[0].x*this.renderR/this.r + this.body.pos.x, this.body.calcPoints[0].y*this.renderR/this.r + this.body.pos.y);
            for(let i = 1; i < this.body.calcPoints.length; i++){
                ctx.lineTo(this.body.calcPoints[i].x*this.renderR/this.r + this.body.pos.x, this.body.calcPoints[i].y*this.renderR/this.r + this.body.pos.y);
            }
            ctx.lineTo(this.body.calcPoints[0].x*this.renderR/this.r + this.body.pos.x, this.body.calcPoints[0].y*this.renderR/this.r + this.body.pos.y);
            ctx.translate(this.x - this.renderX, this.y - this.renderY);
        }
        this.lastRenderShape = this.shape;
        ctx.fill();

        if(this.god === true){
            ctx.strokeStyle = 'purple';
            ctx.lineWidth = 5;
            ctx.stroke();
        }

        ctx.closePath();

        // ctx.font = '30px Inter';
        // ctx.textAlign = 'middle';
        // ctx.textBaseline = 'center';
        // ctx.fillStyle = 'white';
        // ctx.fillText(`(${Math.round(this.x)}, ${Math.round(this.y)})`, this.renderX, this.renderY);

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
        // lmao this is so inefficient -- just to save a few bytes of data per sec ;c
        minPacker.reconstructMinPack(this, data, this.accumPack);
        for(let key in this.accumPack){
            this[key] = this.accumPack[key];
        }
        
        // TODO: fix bug where there's a small offset (probably bc of friction updating after) of players after being square and size getting changed
        if(data.shape !== undefined || data.r !== undefined){
            this.changeShape({shapeType: this.shape, shapePoints: this.shapePoints});
            this.radiusUpdateChanged = true;
        }
    }
    updateLastState(){
        this.lastUpdateState = minPacker.cloneObject(this.getPackKeys());
    }
    pack(){
        this.minPack = minPacker.minPack(this.lastUpdateState, this.getPackKeys());
        this.updateLastState();
        return this.minPack;
    }
    getPackKeys(){
        return this.packKeys.reduce((acc, k) => {acc[k] = this[k]; return acc;}, {})
    }
}


// this.packKeys = ['x','y','r','speed','friction','angle','magnitude','dev','god','input','shape','xv','yv','dead','axisSpeedMult','difference','pivot'];
//         this.updateLastState();
//     }
//     initPack(){
//         return this;
//     }
//     updatePack() {
//         this.minPack = minPacker.minPack(this.lastUpdateState, this.packKeys.reduce((acc, k) => {acc[k] = this[k]; return acc;}, {}));
//         this.updateLastState();
//         return this.minPack;
//     }
//     updateLastState(){
//         this.lastUpdateState = minPacker.cloneObject(this.packKeys.reduce((acc, k) => {acc[k] = this[k]; return acc;}, {}));
//     }