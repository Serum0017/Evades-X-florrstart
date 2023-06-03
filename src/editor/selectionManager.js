import Ref from './editorRef.js';
import transformBody from '../client/simulate/obstacles/transformBody.js';
import Collide from '../client/simulate/obstacles/collisionManager.js';
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
        this.selectionRect = null;
        this.transformMode = 'select';
        this.transformActive = false;
        this.snapDistance = 25;
        this.toSnap = true;
    }
    start(){
        this.game = this.client.game;
        this.map = this.client.game.map;
        this.renderer = this.client.game.renderer;

        this._selectedObstacles = [];
        Object.defineProperty(this, "selectedObstacles", {
            set(value) {
                this._selectedObstacles = value;
                if(Ref.toggleGui.isOpen === true){
                    this.client.uiManager?.editMenuManager?.reloadMenu();
                }
            },
            get() {
                return this._selectedObstacles;
            },
            enumerable: true,
            configurable: true,
        });

        this.addEventListeners();

        setInterval(this.run.bind(this), 1000/60);
    }
    run(){
        const stw = this.screenToWorld(this.mouse.pos);
        this.mouse.delta = {
            x: stw.x - this.mouse.last.x,
            y: stw.y - this.mouse.last.y
        }
        if(this.previewObstacle !== null){
            this.transformPreviewObstacle({
                x: stw.x - this.previewObstacle.x,
                y: stw.y - this.previewObstacle.y
            })
        }
        if(this.transformActive === true){
            for(let i = 0; i < this.selectedObstacles.length; i++){
                if(this.toSnap === true){
                    const difference = {
                        x: Math.round(stw.x / this.snapDistance) * this.snapDistance - this.selectedObstacles[i].x,
                        y: Math.round(stw.y / this.snapDistance) * this.snapDistance - this.selectedObstacles[i].y,
                    }
                    transformBody(this.selectedObstacles[i], {
                        x: difference.x,
                        y: difference.y,
                        rotation: 0
                    })
                    this.selectedObstacles[i].x += difference.x;
                    this.selectedObstacles[i].y += difference.y;
                } else {
                    transformBody(this.selectedObstacles[i], {
                        x: this.mouse.delta.x,
                        y: this.mouse.delta.y,
                        rotation: 0
                    })
                }
            }
        }
        this.mouse.last = {x: stw.x, y: stw.y};
    }
    addEventListeners(){
        this.mouse = {pos: {x: 0, y: 0}, last: {x: 0, y: 0}, delta: {x: 0, y: 0}};
        Ref.canvas.onmouseup = (event) => {
            this.mouse.pos = {x: event.pageX, y: event.pageY};
            if(this.selectionRect !== null){
                this.selectObstacles({
                    x: (this.selectionRect.end.x + this.selectionRect.start.x)/2,
                    y: (this.selectionRect.end.y + this.selectionRect.start.y)/2,
                    w: Math.max(0.1, Math.abs(this.selectionRect.end.x - this.selectionRect.start.x)),
                    h: Math.max(0.1, Math.abs(this.selectionRect.end.y - this.selectionRect.start.y))
                });
                this.selectionRect = null;
            }
            this.transformActive = false;
        }
        window.onmousemove = (event) => {
            this.mouse.pos = {x: event.pageX, y: event.pageY};
            if(this.selectionRect !== null){
                this.selectionRect.end = this.screenToWorld(this.mouse.pos);
            }
        }
        Ref.canvas.onmousedown = (event) => {
            this.mouse.pos = {x: event.pageX, y: event.pageY};
            if(this.previewObstacle !== null){
                this.placePreviewObstacle();
                return;
            } else if(this.client.playerActive === false){
                const collidingObstacle = this.collidingWithObstacle(this.screenToWorld(this.mouse.pos));
                if(this.collidingWithSelectedObstacle(this.screenToWorld(this.mouse.pos)) !== false){
                    // if we already have a selection, drag those
                    this.transformActive = true;
                } else if(collidingObstacle !== false){
                    // if we're immediately intersecting something, start the drag
                    this.selectedObstacles = [collidingObstacle];
                    this.transformActive = true;
                } else {
                    // otherwise, start multi select
                    this.startSelectionDrag(this.mouse.pos);
                }
            }
        }
        document.onvisibilitychange = (event) => {
            this.selectionRect = null;
        }
    }
    addPreviewObstacle(obj){
        this.previewObstacle = window.initObstacle(obj);
        this.transformPreviewObstacle({x: this.map.self.renderX - Ref.canvas.w/2, y: this.map.self.renderY - Ref.canvas.h/2});
    }
    transformPreviewObstacle({x,y}){
        if(this.toSnap === true){
            const difference = {
                x: Math.round((x + this.previewObstacle.x) / this.snapDistance) * this.snapDistance - this.previewObstacle.x,
                y: Math.round((y + this.previewObstacle.y) / this.snapDistance) * this.snapDistance - this.previewObstacle.y,
            }
            transformBody(this.previewObstacle, {
                x: difference.x,
                y: difference.y,
                rotation: 0
            })
            this.previewObstacle.x += difference.x;
            this.previewObstacle.y += difference.y;
        } else {
            this.previewObstacle.x += x;
            this.previewObstacle.y += y;
            transformBody(this.previewObstacle, {x, y, rotation: 0});
        }
        // console.log(this.previewObstacle.x, this.previewObstacle.y);
    }
    placePreviewObstacle(){
        this.map.addObstacle(this.previewObstacle);
        this.previewObstacle = null;
    }

    startSelectionDrag({x,y}){
        this.selectionRect = {start: this.screenToWorld({x,y}), end: this.screenToWorld({x,y})};
    }

    selectObstacles({x,y,w,h}){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w, h});
        this.selectedObstacles = [];
        for(let i = 0; i < this.map.obstacles.length; i++){
            if(Collide(this.map.obstacles[i], selectionObstacle) !== false){
                this.selectedObstacles.push(this.map.obstacles[i]);
            }
        }
        // in order to trigger the "set"
        this.selectedObstacles = this.selectedObstacles;
    }
    collidingWithSelectedObstacle({x,y}){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w: 0.1, h: 0.1});
        for(let i = 0; i < this.selectedObstacles.length; i++){
            if(Collide(this.selectedObstacles[i], selectionObstacle) !== false){
                return this.selectedObstacles[i];
            }
        }
        return false;
    }
    collidingWithObstacle({x,y}){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w: 0.1, h: 0.1});
        for(let i = 0; i < this.map.obstacles.length; i++){
            if(Collide(this.map.obstacles[i], selectionObstacle) !== false){
                return this.map.obstacles[i];
            }
        }
        return false;
    }
    deleteSelectedObstacles(){
        for(let i = 0; i < this.selectedObstacles.length; i++){
            this.selectedObstacles[i].toRemoveSelector = true;
        }
        
        this.map.obstacles = this.map.obstacles.filter(o => o.toRemoveSelector !== true);
        this.selectedObstacles = [];
    }

    screenToWorld({x,y}){
        return {
            x: this.client.me().renderX - Ref.canvas.w / 2 + x / Ref.canvas.zoom,
            y: this.client.me().renderY - Ref.canvas.h / 2 + y / Ref.canvas.zoom
        }
    }

    enterPlayMode(){
        // reset params
        // previewObstacle excluded because we want ppl to be able to create stuff while playing :D
        // this.previewObstacle = null;
        this.selectedObstacles = [];
        this.selectionRect = null;
        this.transformActive = false;
        this.client.game.renderer.lastRenderScale = this.client.game.renderer.renderScale;
        this.client.game.renderer.renderScale = 1;
    }
    exitPlayMode(){
        this.client.game.renderer.renderScale = this.client.game.renderer.lastRenderScale;
    }
    // ok so this can do 2 things
    // a) manage click and drag selection box (like in the old editor)
    // and move/rotate/scale those things
    // b) manage preview obs + snap it to mouse pos that's 
    // interesting idea: c) if you hover over a parameter it will make the obs .5 opaq and show 2 variations of it. For example, if the parameter is a number it would render the parameter as 2x and 0.5x its size. Also for strings it can render "Hello World" or "abc" for example
}