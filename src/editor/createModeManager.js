import Ref from './editorRef.js';
export default class CreateModeManager {
    constructor(client){
        this.client = client;
    }
    start(){
        this.active = false;
        this.creatingActive = false;
        this.defineEventListeners();
        this.defineBodyToDimensionsMap();
        this.rect = {start: {x: 0, y: 0}, end: {x: 0, y: 0}};
        this.obstacleCreateData = {type: 'square-normal-normal'};
        this.lastObstacleCreateData = this.obstacleCreateData;
        this.editorManager = this.client.editorManager;
        this.snapGridManager = this.client.editorManager.snapGridManager;
    }
    defineEventListeners(){
        // mouse down - start create drag (start point)
        window.onmousedown = (event) => {
            if(!this.active)return;
            this.creatingActive = true;
            this.rect.start = this.snapGridManager.snapToGrid(this.screenToWorld({x: event.pageX, y: event.pageY}))
            this.rect.end = {x: this.rect.start.x, y: this.rect.start.y};
        }
        // mouse move - move the end point todo snap to snap grid once implemented
        window.onmousemove = (event) => {
            if(!this.active || !this.creatingActive)return;
            this.rect.end = this.snapGridManager.snapToGrid(this.screenToWorld({x: event.pageX, y: event.pageY}))
        },
        // mouse up - create obstacle
        window.onmouseup = (event) => {
            if(!this.active || !this.creatingActive)return;
            this.creatingActive = false;
            this.rect.end = this.snapGridManager.snapToGrid(this.screenToWorld({x: event.pageX, y: event.pageY}))
            this.createShape(this.rect, this.obstacleCreateData);
        }
    }
    defineBodyToDimensionsMap(){
        this.bodyToDimensionsMap = {
            square: ({w,h}) => {
                return {w,h};
            },
            circle: ({w,h}) => {
                return {r: Math.min(w,h)/2};
            },
            poly: ({w,h}) => {
                // basically make a square and scale it according to w and h
                const points = new SAT.Box(new SAT.Vector(0, 0), w, h).toPolygon().points.map(p => [p.x - w/2, p.y - h/2]);
                // making it into a triangle
                points.pop();
                points[2][0] = (points[0][0] + points[1][0])/2;
                return {points};
            },
            text: ({w,h}) => {
                // only scale based on width
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');

                ctx.font = `1px Inter`;
                return {fontSize: w / ctx.measureText('Evades X'/*default text*/).width};// font size = width / text size of 1 px
            },
            oval: ({w,h}) => {
                return {rw: w/2, rh: h/2};
            }
        }
    }
    enterCreateMode(createData=this.lastObstacleCreateData/*just {type: square-normal-lava} for now*/){
        this.lastObstacleCreateData = this.obstacleCreateData;
        this.obstacleCreateData = createData;
        this.active = true;
    }
    exitCreateMode(){
        this.active = false;
        this.creatingActive = false;
        this.rect = {start: {x: 0, y: 0}, end: {x: 0, y: 0}};
    }
    createShape({start, end}, {type}){
        const x = (start.x + end.x) / 2; const y = (start.y + end.y) / 2;
        const w = Math.abs(start.x - end.x); const h = Math.abs(start.y - end.y);
        if(w === 0 || h === 0)return;
        this.editorManager.addObstacle({x, y, type, ...this.bodyToDimensionsMap[type.split('-')[0]]({w,h})});
    }
    screenToWorld({x,y}){
        return {
            x: this.client.me().render.x - Ref.canvas.w / 2 + x * (Ref.canvas.w / window.innerWidth),
            y: this.client.me().render.y - Ref.canvas.h / 2 + y * (Ref.canvas.h / window.innerHeight)
        }
    }
}