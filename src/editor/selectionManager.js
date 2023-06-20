import Ref from './editorRef.js';
import transformBody from '../client/simulate/obstacles/transformBody.js';
import Collide from '../client/simulate/obstacles/collisionManager.js';
import satFactory from '../client/simulate/obstacles/satFactory.js';
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
        this.transformResizePointsActive = false;
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

        this._selectedResizePoints = [];
        Object.defineProperty(this, "selectedResizePoints", {
            set(value) {
                this._selectedResizePoints = value;
                if(Ref.toggleGui.isOpen === true){
                    this.client.uiManager?.editMenuManager?.reloadMenu();
                }
            },
            get() {
                return this._selectedResizePoints;
            },
            enumerable: true,
            configurable: true,
        });

        this.addEventListeners();

        this.defineResizeMap();

        setInterval(this.run.bind(this), 1000/60);
    }
    run(){
        if(this.selectionRect !== null){
            this.selectionRect.end = this.screenToWorld(this.mouse.pos);
        }
        this.updateTransforms();
    }
    includePoint({x, y}, margin=100){
        const me = this.client.me();
        if(x > window.innerWidth - margin){
            me.x += 8 / Ref.canvas.zoom;
        } else if(x < margin) {
            me.x -= 8 / Ref.canvas.zoom;
        }
        if(y > window.innerHeight - margin){
            me.y += 8 / Ref.canvas.zoom;
        } else if(y < margin) {
            me.y -= 8 / Ref.canvas.zoom;
        }
    }
    updateTransforms(){
        const mousePos = this.screenToWorld(this.mouse.pos);
        this.mouse.delta = {x: mousePos.x - this.mouse.last.x, y: mousePos.y - this.mouse.last.y};
        if(this.mouse.delta.x === 0 && this.mouse.delta.y === 0){
            this.mouse.last = this.screenToWorld(this.mouse.pos);
            return;
        }
        const stw = this.screenToWorld(this.mouse.pos);
        if(this.toSnap === true && (this.previewObstacle !== null || this.transformActive === true || this.transformResizePointsActive === true)){
            this.snapDifference = {
                x: Math.round(stw.x / this.snapDistance) * this.snapDistance - Math.round(this.mouse.last.x / this.snapDistance) * this.snapDistance,
                y: Math.round(stw.y / this.snapDistance) * this.snapDistance - Math.round(this.mouse.last.y / this.snapDistance) * this.snapDistance
            }
            if(this.snapDifference.x === 0 && this.snapDifference.y === 0){
                this.mouse.last = this.screenToWorld(this.mouse.pos);
                return;
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
                this.client.updateObstacle(this.selectedObstacles[i]);
            }
        }

        if(this.transformMode === 'resize'){
            if(this.transformResizePointsActive === true){
                for(let i = 0; i < this.selectedResizePoints.length; i++){
                    const resizePoint = this.selectedResizePoints[i];
                    const parentObstacle = resizePoint.parentObstacle;
                    const transformDelta = {
                        x: this.toSnap === true ? this.snapDifference.x : this.mouse.delta.x,
                        y: this.toSnap === true ? this.snapDifference.y : this.mouse.delta.y
                    }
                    if(parentObstacle.shape === 'poly' && parentObstacle.renderFlag === 'square'){
                        transformDelta.x /= 2;
                        transformDelta.y /= 2;
                    }
                    resizePoint.x += transformDelta.x;
                    resizePoint.y += transformDelta.y;
                    this.resizeTransformMap[parentObstacle.shape](parentObstacle, resizePoint, resizePoint.parentIndex, transformDelta);
                    this.client.updateObstacle(parentObstacle);
                }
            }
            for(let i = 0; i < this.map.obstacles.length; i++){
                this.updateResizePoints(this.map.obstacles[i]);
            }
        }

        // relative to world, unlike this.mouse.pos which is relative to screen
        this.mouse.last = this.screenToWorld(this.mouse.pos);
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
                if(this.transformMode === 'resize'){
                    this.selectResizePoints({
                        x: (this.selectionRect.end.x + this.selectionRect.start.x)/2,
                        y: (this.selectionRect.end.y + this.selectionRect.start.y)/2,
                        w: Math.max(0.1, Math.abs(this.selectionRect.end.x - this.selectionRect.start.x)),
                        h: Math.max(0.1, Math.abs(this.selectionRect.end.y - this.selectionRect.start.y))
                    });
                }
                this.selectionRect = null;
            }
            this.transformActive = false;
            this.transformResizePointsActive = false;
        }
        window.onmousemove = (event) => {
            this.mouse.pos = {x: event.pageX, y: event.pageY};
            this.run();
        },
        Ref.canvas.onmousedown = (event) => {
            if(this.previewObstacle !== null){
                this.placePreviewObstacle();
                return;
            } else if(this.client.playerActive === false){
                if(this.transformMode === 'resize'){
                    // TODO: we really need to spatial hash this since its gonna be hella expensive
                    const collidingPoint = this.collidingWithResizePoints(this.screenToWorld(this.mouse.pos));
                    if(collidingPoint !== false){
                        const obstacle = collidingPoint.obstacle;
                        const point = collidingPoint.point;
                        
                        if(obstacle.shape === 'poly' && obstacle.renderFlag === undefined && event.ctrlKey === true){
                            // if the obstacle is a poly then we can multiselect
                            this.selectedResizePoints.push(point);
                        } else {
                            // otherwise just select one point
                            this.selectedResizePoints = [point];
                        }

                        this.transformResizePointsActive = true;
                        return;
                    }
                }
                const collidingObstacle = this.collidingWithObstacle(this.screenToWorld(this.mouse.pos));
                if(event.altKey === true && collidingObstacle !== false){
                    // if the alt key is pressed, initiate an alt drag

                    // TODO: add multiple obstacles and start a transform if multiple are selected (move this if statement after this.collidingWithSelectedObstacles)
                    this.addPreviewObstacle(window.structuredCloneWithoutKey({...collidingObstacle, shape: collidingObstacle.renderFlag === 'square' ? 'square' : collidingObstacle.shape}, ['resizePoints','_inputRef']));
                } else if(event.shiftKey === true && collidingObstacle !== false){
                    // initiate a shift click
                    this.selectAllOfType(collidingObstacle);
                    this.transformActive = true;
                } else if(this.collidingWithSelectedObstacle(this.screenToWorld(this.mouse.pos)) !== false){
                    // if we're pressing the ctrl key, then deselect this obstacle
                    if(event.ctrlKey === true){
                        this.selectedObstacles = this.selectedObstacles.filter(s => s !== this.collidingWithSelectedObstacle(this.screenToWorld(this.mouse.pos)));
                        return;
                    }
                    // if we already have a selection, drag those
                    this.transformActive = true;
                } else if(collidingObstacle !== false){
                    // if we're immediately intersecting something, start the drag
                    if(event.ctrlKey === true){
                        this.selectedObstacles.push(collidingObstacle);
                    } else {
                        this.selectedObstacles = [collidingObstacle];
                    }
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
            this.transformResizePointsActive = false;
            this.selectedResizePoints = [];
        }
        Ref.rotateButton.onmousedown = (event) => {
            this.transformMode = 'rotate';
            Ref.rotateText.classList.add('red');
            Ref.selectText.classList.remove('red');
            Ref.resizeText.classList.remove('red');
            this.transformResizePointsActive = false;
            this.selectedResizePoints = [];
        }
        Ref.resizeButton.onmousedown = (event) => {
            this.transformMode = 'resize';
            Ref.resizeText.classList.add('red');
            Ref.rotateText.classList.remove('red');
            Ref.selectText.classList.remove('red');
        }
        Ref.duplicateButton.onmousedown = (event) => {
            this.copy();
            this.paste();
        }
    }
    addPreviewObstacle(obj){
        this.previewObstacle = window.initObstacle(obj);
        const mousePos = this.screenToWorld(this.mouse.pos);
        this.transformPreviewObstacle({x: mousePos.x - this.previewObstacle.x, y: mousePos.y - this.previewObstacle.y});
    }
    transformPreviewObstacle({x,y}){
        if(x === 0 && y === 0){
            return;
        }
        if(this.toSnap === true){
            const difference = {
                x: Math.round((x + this.previewObstacle.x) / this.snapDistance) * this.snapDistance - this.previewObstacle.x,
                y: Math.round((y + this.previewObstacle.y) / this.snapDistance) * this.snapDistance - this.previewObstacle.y,
            }
            if(difference.x === 0 && difference.y === 0){
                return;
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
        this.client.addObstacle(this.previewObstacle);
        this.previewObstacle = null;
    }

    startSelectionDrag({x,y}){
        this.selectionRect = {start: this.screenToWorld({x,y}), end: this.screenToWorld({x,y})};
    }
    selectAll(){
        this.selectedObstacles = [];
        for(let i = 0; i < this.map.obstacles.length; i++){
            this.selectedObstacles.push(this.map.obstacles[i]);
        }
        this.selectedObstacles = this.selectedObstacles;
    }
    selectAllOfType({shape, simulate, effect, renderFlag}){
        this.selectedObstacles = [];
        for(let i = 0; i < this.map.obstacles.length; i++){
            if(this.map.obstacles[i].shape === shape && this.arrayEquals(this.map.obstacles[i].simulate, simulate) === true && this.map.obstacles[i].effect === effect){
                // special poly thing
                if(this.map.obstacles[i].shape === 'poly' && (this.map.obstacles[i].renderFlag !== renderFlag)){
                    continue;
                }
                this.selectedObstacles.push(this.map.obstacles[i]);
            }
        }
        this.selectedObstacles = this.selectedObstacles;
    }
    arrayEquals(arr1, arr2){
        for(let i = 0; i < arr1.length; i++){
            if(arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true;
    }
    selectObstacles({x,y,w,h}){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w, h});
        this.selectedObstacles = [];
        // TODO: spatial hash this so that larger maps dont lag exponentially more
        for(let i = 0; i < this.map.obstacles.length; i++){
            if(this.collideWithFirstEnabled(this.map.obstacles[i], selectionObstacle) !== false){
                this.selectedObstacles.push(this.map.obstacles[i]);
            }
        }
        // in order to trigger the "set"
        this.selectedObstacles = this.selectedObstacles;
    }
    collidingWithSelectedObstacle({x,y}){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w: 0.1, h: 0.1});
        for(let i = 0; i < this.selectedObstacles.length; i++){
            if(this.collideWithFirstEnabled(this.selectedObstacles[i], selectionObstacle) !== false){
                return this.selectedObstacles[i];
            }
        }
        return false;
    }
    collidingWithObstacle({x,y}){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w: 0.1, h: 0.1});
        for(let i = 0; i < this.map.obstacles.length; i++){
            if(this.collideWithFirstEnabled(this.map.obstacles[i], selectionObstacle) !== false){
                return this.map.obstacles[i];
            }
        }
        return false;
    }
    collideWithFirstEnabled(object1, object2){
        let resetFirst = false;
        if(object1.shapeCollidable === false){
            object1.shapeCollidable = true;
            resetFirst = true;
        }
        const response = Collide(object1, object2);
        if(resetFirst){
            object1.shapeCollidable = false;
        }
        return response;
    }
    deleteSelectedObstacles(){
        for(let i = 0; i < this.selectedObstacles.length; i++){
            this.selectedObstacles[i].toRemoveSelector = true;
            this.client.deleteObstacle(this.selectedObstacles[i]);
        }
        
        this.map.obstacles = this.map.obstacles.filter(o => o.toRemoveSelector !== true);
        this.selectedObstacles = [];
    }
    copy(){
        // TODO: make offsetting by 25px both directions a setting (on by default, most ppl will turn it off)
        if(this.selectedObstacles.length === 0){
            return;
        }
        this.clipboard = [];
        for(let i = 0; i < this.selectedObstacles.length; i++){
            const o = this.selectedObstacles[i];
            this.clipboard.push(
                window.initObstacle(window.structuredCloneWithoutKey({...o, x: o.x + 25, y: o.y + 25, shape: o.renderFlag === 'square' ? 'square' : o.shape}, ['resizePoints','_inputRef']))
            );
        }
    }
    paste(){
        if(this.clipboard === undefined){
            return;
        }
        this.selectedObstacles = [];
        for(let i = 0; i < this.clipboard.length; i++){
            this.client.addObstacle(this.clipboard[i]);
            this.selectedObstacles.push(this.map.obstacles[this.map.obstacles.length-1]);
        }
        this.clipboard = window.structuredClone(this.clipboard);
    }

    defineResizeMap(){
        this.resizeMap = {
            poly: (o) => {
                if(o.renderFlag !== undefined){
                    this.resizeMap[o.renderFlag](o);
                    return;
                }
                o.resizePoints = o.body.calcPoints.map(c => {return {x: c.x - o.x, y: c.y - o.y}})
            },
            circle: (o) => {
                o.resizePoints = [{x: 0, y: o.difference.y/2}];
            },
            square: (o) => {
                o.resizePoints = [
                    {x: o.difference.x/2, y: o.difference.y/2},
                    {x: -o.difference.x/2, y: o.difference.y/2},
                    {x: o.difference.x/2, y: -o.difference.y/2},
                    {x: -o.difference.x/2, y: -o.difference.y/2},
                ];
            },
            oval: (o) => {
                o.resizePoints = [
                    {x: o.difference.x/2, y: o.difference.y/2},
                    {x: -o.difference.x/2, y: o.difference.y/2},
                    {x: o.difference.x/2, y: -o.difference.y/2},
                    {x: -o.difference.x/2, y: -o.difference.y/2},
                ];
            },
            text: (o) => {
                o.resizePoints = [
                    {x: o.difference.x/2, y: o.difference.y/2},
                    {x: -o.difference.x/2, y: o.difference.y/2},
                    {x: o.difference.x/2, y: -o.difference.y/2},
                    {x: -o.difference.x/2, y: -o.difference.y/2},
                ];
            }
        }
        this.resizeUpdateMap = {
            circle: (o) => {
                if(this.transformResizePointsActive === true){
                    return;
                }
                const stw = this.screenToWorld(this.mouse.pos)
                const angle = Math.atan2(stw.y - o.y, stw.x - o.x);

                o.resizePoints[0].x = Math.cos(angle) * o.body.r;
                o.resizePoints[0].y = Math.sin(angle) * o.body.r;
            }
        }
        this.resizeTransformMap = {
            poly: (o, pt, index, delta) => {
                if(o.renderFlag !== undefined){
                    this.resizeTransformMap[o.renderFlag](o, pt, index, delta);
                    return;
                }
                // const points = o.body.points;
                // points[index] = new SAT.Vector(pt.x, pt.y);
                // o.body.setPoints(points);
                // console.log(o);
                // o.points[index][0] = pt.x;
                // o.points[index][1] = pt.y;
                // console.log(o.points[index]);
            },
            // TODO: update this to be maintainable when scaling is a thing
            circle: (o, pt, index) => {
                const dist = Math.sqrt(pt.x**2+pt.y**2);
                o.body.r = dist;
                o.r = dist;
            },
            square: (o, pt, index, delta) => {
                o.x += delta.x;
                o.y += delta.y;
                o.w = Math.abs(pt.x) * 2;
                o.h = Math.abs(pt.y) * 2;

                o.difference = {x: o.w, y: o.h};

                this.defineResizePoints(o);

                this.client.updateObstacle(o);
            },
            text: (o, pt, index, delta) => {
                this.resizeTransformMap.square(o, pt, index, delta);
                // TODO: update fontsize prop as well
            },
            oval: (o, pt, index) => {
                o.rw = Math.abs(pt.x);
                o.rh = Math.abs(pt.y);
                o.difference = {x: o.rw*2, y: o.rh*2};

                this.defineResizePoints(o);

                // updating resize points
                this.client.updateObstacle(o);
            }
        }
    }

    defineResizePoints(o) {
        if(this.resizeMap[o.shape] === undefined){
            console.error('shape does not have a resizemap definition! selectionManager.js');
        }
        this.resizeMap[o.shape](o);
        for(let i = 0; i < o.resizePoints.length; i++){
            o.resizePoints[i].parentObstacle = o;
            o.resizePoints[i].parentIndex = i;
        }
    }
    updateResizePoints(o) {
        if(this.resizeUpdateMap[o.shape] !== undefined){
            this.resizeUpdateMap[o.shape](o);
        }
    }
    collidingWithResizePoints({x,y}){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w: 0.1, h: 0.1});
        for(let i = 0; i < this.map.obstacles.length; i++){
            const obstacle = this.map.obstacles[i];
            for(let j = 0; j < obstacle.resizePoints.length; j++){
                const resizePoint = obstacle.resizePoints[j];
                const resizePointObstacle = window.initObstacle({type: 'circle-normal-normal', x: resizePoint.x + obstacle.x, y: resizePoint.y + obstacle.y, r: 12.5});
                if(Collide(selectionObstacle, resizePointObstacle) !== false){
                    return {obstacle: obstacle, point: resizePoint}; 
                }
            }
        }
        return false;
    }
    selectResizePoints({x,y,w,h}){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w, h});
        this.selectedResizePoints = [];
        // TODO: spatial hash this so that larger maps dont lag exponentially more
        outerLoop: for(let i = 0; i < this.map.obstacles.length; i++){
            const obstacle = this.map.obstacles[i];
            const obstacleSelectedResizePoints = [];
            innerLoop: for(let j = 0; j < obstacle.resizePoints.length; j++){
                const resizePoint = obstacle.resizePoints[j];
                const resizePointObstacle = window.initObstacle({type: 'circle-normal-normal', x: resizePoint.x + obstacle.x, y: resizePoint.y + obstacle.y, r: 12.5});

                if(Collide(resizePointObstacle, selectionObstacle) !== false){
                    obstacleSelectedResizePoints.push(resizePoint);
                    if(obstacle.shape !== 'poly' || obstacle.renderFlag !== undefined){
                        // we can't select multiple points because the shape is not a poly. Push the singular selected point and continue
                        this.selectedResizePoints.push(obstacleSelectedResizePoints[0]);
                        continue outerLoop;
                    }
                }
            }
            // we are a poly or something with no intersections. Either way, push all points
            for(let k = 0; k < obstacleSelectedResizePoints.length; k++){
                this.selectedResizePoints.push(obstacleSelectedResizePoints[k]);
            }
        }
        // in order to trigger the "set"
        this.selectedResizePoints = this.selectedResizePoints;
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
        this.selectedResizePoints = [];
        this.transformResizePointsActive = false;
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