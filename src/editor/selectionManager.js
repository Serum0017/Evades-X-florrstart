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
        this.updateTransforms();
    }
    updateTransforms(){
        const mousePos = this.screenToWorld(this.mouse.pos);
        const lastMousePos = this.screenToWorld(this.mouse.last);
        this.mouse.delta = {x: mousePos.x - lastMousePos.x, y: mousePos.y - lastMousePos.y};
        const stw = this.screenToWorld(this.mouse.pos);
        if(this.toSnap === true && (this.previewObstacle !== null || this.transformActive === true)){
            this.snapDifference = {
                x: Math.round(stw.x / this.snapDistance) * this.snapDistance - Math.round(lastMousePos.x / this.snapDistance) * this.snapDistance,
                y: Math.round(stw.y / this.snapDistance) * this.snapDistance - Math.round(lastMousePos.y / this.snapDistance) * this.snapDistance
            }
        }
        if(this.previewObstacle !== null){
            if(this.toSnap === true){
                this.transformPreviewObstacle(this.snapDifference);
            } else {
                this.transformPreviewObstacle({
                    x: this.mouse.delta.x,
                    y: this.mouse.delta.y
                })
            }
            
        }
        if(this.transformActive === true){
            for(let i = 0; i < this.selectedObstacles.length; i++){
                if(this.toSnap === true){
                    transformBody(this.selectedObstacles[i], {
                        x: this.snapDifference.x,
                        y: this.snapDifference.y,
                        rotation: 0
                    })
                    this.selectedObstacles[i].x += this.snapDifference.x;
                    this.selectedObstacles[i].y += this.snapDifference.y;
                } else {
                    transformBody(this.selectedObstacles[i], {
                        x: this.mouse.delta.x,
                        y: this.mouse.delta.y,
                        rotation: 0
                    })
                }
            }
        }
        this.mouse.last = {x: this.mouse.pos.x, y: this.mouse.pos.y};
    }
    addEventListeners(){
        this.mouse = {pos: {x: 0, y: 0}, delta: {x: 0, y: 0}, last: {x: 0, y: 0}};
        Ref.canvas.onmouseup = (event) => {
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
            this.updateTransforms();
        },
        Ref.canvas.onmousedown = (event) => {
            if(this.previewObstacle !== null){
                this.placePreviewObstacle();
                return;
            } else if(this.client.playerActive === false){
                const collidingObstacle = this.collidingWithObstacle(this.screenToWorld(this.mouse.pos));
                if(event.altKey === true && collidingObstacle !== false){
                    // if the alt key is pressed, initiate an alt drag
                    this.addPreviewObstacle({...collidingObstacle, shape: collidingObstacle.renderFlag === 'square' ? 'square' : collidingObstacle.shape});
                } else if(this.collidingWithSelectedObstacle(this.screenToWorld(this.mouse.pos)) !== false){
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
        Ref.selectButton.onmousedown = (event) => {
            this.transformMode = 'select';
            Ref.selectText.classList.add('red');
            Ref.resizeText.classList.remove('red');
            Ref.rotateText.classList.remove('red');
        }
        Ref.rotateButton.onmousedown = (event) => {
            this.transformMode = 'rotate';
            Ref.rotateText.classList.add('red');
            Ref.selectText.classList.remove('red');
            Ref.resizeText.classList.remove('red');
        }
        Ref.resizeButton.onmousedown = (event) => {
            this.transformMode = 'resize';
            Ref.resizeText.classList.add('red');
            Ref.rotateText.classList.remove('red');
            Ref.selectText.classList.remove('red');
        }
    }
    addPreviewObstacle(obj){
        this.previewObstacle = window.initObstacle(obj);
        const mousePos = this.screenToWorld(this.mouse.pos);
        this.transformPreviewObstacle({x: mousePos.x - this.previewObstacle.x, y: mousePos.y - this.previewObstacle.y});
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
    copy(){
        // TODO: make offsetting by 25px both directions a setting (on by default, most ppl will turn it off)
        this.clipboard = this.selectedObstacles.map(o => window.initObstacle({...o, x: o.x + 25, y: o.y + 25, shape: o.renderFlag === 'square' ? 'square' : o.shape}));
        console.log(this.clipboard);
    }
    paste(){
        if(this.clipboard === undefined){
            return;
        }
        this.selectedObstacles = [];
        for(let i = 0; i < this.clipboard.length; i++){
            this.map.addObstacle(this.clipboard[i]);
            this.selectedObstacles.push(this.map.obstacles[this.map.obstacles.length-1]);
        }
        this.clipboard = window.structuredClone(this.clipboard);
    }

    screenToWorld({x,y}){
        return {
            x: this.client.me().render.x - Ref.canvas.w / 2 + x * (Ref.canvas.w / window.innerWidth),
            y: this.client.me().render.y - Ref.canvas.h / 2 + y * (Ref.canvas.h / window.innerHeight)
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