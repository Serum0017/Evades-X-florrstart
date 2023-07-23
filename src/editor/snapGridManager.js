export default class SnapGridManager {
    constructor(client){
        this.client = client;
        this.enabled = true;
        this.snapDistance = 25;
    }
    snapToGrid({x,y}){
        if(this.enabled === false)return({x,y});
        return {
            x: Math.round(x / this.snapDistance) * this.snapDistance,
            y: Math.round(y / this.snapDistance) * this.snapDistance
        }
    }
}