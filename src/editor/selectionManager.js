import Ref from './editorRef.js';
import transformBody from '../client/simulate/obstacles/transformBody.js';
// TODO:
// basically in order to move obstacles, we want to be able to select things. Now how do we do this? 
// we treat the mouse like an object in the environment. When it's intersecting with an obstacle and
// mouse is down, then we check for collisions. We loop backwards through obstacles (to select the
// one that appears last on the render order) and activate drag if so. Drag will have snap system
// but for now we can just keep track of the delta and move the obstacle accordingly. Mouse positon
// should be updated if either the camera or the mouse moves.

export default class SelectionManager {
    constructor(client){
        this.client = client;
        this.previewObstacle = null;
        this.sectedObjects = [];
        this.selectionRect = null;
    }
    start(){
        this.game = this.client.game;
        this.map = this.client.game.map;
        this.renderer = this.client.game.renderer;

        this.addEventListeners();

        setInterval(this.run.bind(this), 1000/60);
    }
    run(){
        if(this.previewObstacle !== null){
            let stw = this.screenToWorld(this.mouse)
            this.transformPreviewObstacle({
                x: stw.x - this.previewObstacle.x,
                y: stw.y - this.previewObstacle.y
            })
        }
    }
    addEventListeners(){
        this.mouse = {x: 0, y: 0};
        window.onmouseup = (event) => {
            this.mouse = {x: event.pageX, y: event.pageY};
            if(this.selectionRect !== null){
                this.selectionRect = null;
                // select objs
            }
        }
        window.onmousemove = (event) => {
            this.mouse = {x: event.pageX, y: event.pageY};
            if(this.selectionRect !== null){
                this.selectionRect.end = this.screenToWorld(this.mouse);
            }
        }
        window.onmousedown = (event) => {
            this.mouse = {x: event.pageX, y: event.pageY};
            if(this.previewObstacle !== null){
                this.placePreviewObstacle();
                return;
            } else {
                // start a drag
                this.selectionRect = {start: this.screenToWorld(this.mouse), end: this.screenToWorld(this.mouse)};
            }
        }
    }
    addPreviewObstacle(obj){
        this.previewObstacle = window.initObstacle(obj);
        this.transformPreviewObstacle({x: this.map.self.renderX - Ref.canvas.w/2, y: this.map.self.renderY - Ref.canvas.h/2});
    }
    transformPreviewObstacle({x,y}){
        this.previewObstacle.x += x;
        this.previewObstacle.y += y;
        transformBody(this.previewObstacle, {x, y, rotation: 0});
        // console.log(this.previewObstacle.x, this.previewObstacle.y);
    }
    placePreviewObstacle(){
        this.map.addObstacle(this.previewObstacle);
        this.previewObstacle = null;
    }
    screenToWorld({x,y}){
        return {
            x: this.client.me().renderX - Ref.canvas.w / 2 + x * Ref.canvas.w / Ref.canvas.width,
            y: this.client.me().renderY - Ref.canvas.h / 2 + y * Ref.canvas.w / Ref.canvas.width
        }
    }
    // ok so this can do 2 things
    // a) manage click and drag selection box (like in the old editor)
    // and move/rotate/scale those things
    // b) manage preview obs + snap it to mouse pos that's 
    // interesting idea: c) if you hover over a parameter it will make the obs .5 opaq and show 2 variations of it. For example, if the parameter is a number it would render the parameter as 2x and 0.5x its size. Also for strings it can render "Hello World" or "abc" for example
}