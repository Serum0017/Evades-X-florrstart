import Ref from './editorRef.js';
import transformBody from '../client/simulate/obstacles/transformBody.js';
import Collide from '../client/simulate/obstacles/collisionManager.js';
import transformationManagers from './transformManagers.js';
const {SelectionTransformManager, SelectionRotateManager, SelectionScaleManager} = transformationManagers;

const classNames = ['dragManager','previewManager','collisionManager','inputManager','transformManager','rotateManager','scaleManager']
function defineOtherClasses(obj, classNameToExclude){
    for(let i = 0; i < classNames.length; i++){
        if(classNames[i] !== classNameToExclude){
            obj[classNames[i]] = obj.selectionManager[classNames[i]];
        }
    }
    obj.game = obj.selectionManager.game;
    obj.map = obj.selectionManager.map;
    obj.renderer = obj.selectionManager.renderer;
}

function initClass(obj, client, selectionManager){
    obj.client = client;
    obj.selectionManager = selectionManager;
}

// the manager of all the subclasses
export default class SelectionManager {
    constructor(client){
        this.client = client;
        this.dragManager = new SelectionDragManager(client, this);
        this.previewManager = new SelectionPreviewManager(client, this);
        this.collisionManager = new SelectionCollisionManager(client, this);
        this.inputManager = new SelectionInputManager(client, this);

        this.transformManager = new SelectionTransformManager(client, this);
        this.rotateManager = new SelectionRotateManager(client, this);
        this.scaleManager = new SelectionScaleManager(client, this);

        this.settings = {
            snapDistance: 25,
            toSnap: true,
        };

        this.transformMode = 'select';
    }
    start(){
        this.game = this.client.game;
        this.map = this.client.game.map;
        this.renderer = this.client.game.renderer;

        this.forEachSubClass('start');
    }

    forEachSubClass(functionName, params=[]){
        for(let i = 0; i < classNames.length; i++){
            if(this[classNames[i]][functionName] === undefined){
                continue;
            }
            this[classNames[i]][functionName](...params);
        }
    }

    screenToWorld({x,y}){
        return {
            x: this.client.me().render.x - Ref.canvas.w / 2 + x * (Ref.canvas.w / window.innerWidth),
            y: this.client.me().render.y - Ref.canvas.h / 2 + y * (Ref.canvas.h / window.innerHeight)
        }
    }

    enterPlayMode(){
        // reset params
        this.forEachSubClass('enterPlayMode');
        
        this.client.game.renderer.lastRenderScale = this.client.game.renderer.renderScale;
        this.client.game.renderer.renderScale = 1;
    }

    exitPlayMode(){
        this.forEachSubClass('exitPlayMode');

        this.client.game.renderer.renderScale = this.client.game.renderer.lastRenderScale;

        for(let i = 0; i < this.map.obstacles.length; i++){
            if(this.map.obstacles[i].parametersToReset !== undefined){
                this.map.resetObstacleParameters(this.map.obstacles[i], this.map.obstacles[i].parametersToReset);
            }
        }   
    }
    // ok so this can do 2 things
    // a) manage click and drag selection box (like in the old editor)
    // and move/rotate/scale those things
    // b) manage preview obs + snap it to mouse pos that's 
    // interesting idea: c) if you hover over a parameter it will make the obs .5 opaq and show 2 variations of it. For example, if the parameter is a number it would render the parameter as 2x and 0.5x its size. Also for strings it can render "Hello World" or "abc" for example
}

// manages the drag rectangle
class SelectionDragManager {
    constructor(client, selectionManager){
        initClass(this, client, selectionManager);

        this.selectionRect = null;
    }
    start(){
        defineOtherClasses(this, 'dragManager');

        this.defineEventListeners();

        setInterval(this.run.bind(this), 1000/60);
    }
    defineEventListeners(){
        document.onvisibilitychange = (event) => {
            this.selectionRect = null;
        }
    }
    run(){
        if(this.selectionRect !== null){
            this.selectionRect.end = this.selectionManager.screenToWorld(this.inputManager.mouse.pos);
        }
    }
    startSelectionDrag({x,y}){
        this.selectionRect = {start: this.selectionManager.screenToWorld({x,y}), end: this.selectionManager.screenToWorld({x,y})};
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
    onMouseUp(event){
        // TODO: make a setting so that stuff can be selected while u drag. This wont be that laggy once spatial hash is implemented?
        if(this.selectionRect === null){
            return;
        }
        this.collisionManager.selectObstacles({
            x: (this.selectionRect.end.x + this.selectionRect.start.x)/2,
            y: (this.selectionRect.end.y + this.selectionRect.start.y)/2,
            w: Math.max(0.1, Math.abs(this.selectionRect.end.x - this.selectionRect.start.x)),
            h: Math.max(0.1, Math.abs(this.selectionRect.end.y - this.selectionRect.start.y))
        });

        if(this.selectionManager.transformMode === 'resize'){
            this.scaleManager.selectResizePoints({
                x: (this.selectionRect.end.x + this.selectionRect.start.x)/2,
                y: (this.selectionRect.end.y + this.selectionRect.start.y)/2,
                w: Math.max(0.1, Math.abs(this.selectionRect.end.x - this.selectionRect.start.x)),
                h: Math.max(0.1, Math.abs(this.selectionRect.end.y - this.selectionRect.start.y))
            });
        }

        this.selectionRect = null;
    }
}

// manages the preview obstacle before its placed
class SelectionPreviewManager {
    constructor(client, selectionManager){
        initClass(this, client, selectionManager);

        this.previewObstacle = null;
    }
    start(){
        defineOtherClasses(this, 'previewObstacleManager');
    }
    addPreviewObstacle(obj){
        this.previewObstacle = window.initObstacle(obj);

        const worldMousePos = this.selectionManager.screenToWorld(this.inputManager.mouse.pos);
        this.selectionManager.transformManager.transformObstacle(this.previewObstacle, {x: worldMousePos.x - this.previewObstacle.x, y: worldMousePos.y - this.previewObstacle.y});
    }
    placePreviewObstacle(){
        this.client.addObstacle(this.previewObstacle);
        this.previewObstacle = null;
    }
}

// selectionCollisionManager manages selectedObstacles
class SelectionCollisionManager {
    constructor(client, selectionManager){
        initClass(this, client, selectionManager);

        this.selectedObstacles = [];
        Object.defineProperty(this, 'selectedObstaclesChanged', {
            set(value) {
                this.reloadMenu();
            }
        })
    }
    start(){
        defineOtherClasses(this, 'collisionManager');

        this.clipboardManager = new CollisionClipboardManager(this.client, this);
    }

    collideWithEnabled(object1, object2){
        let resetFirst = false;
        let resetSecond = false;
        if(object1.shapeCollidable === false){
            object1.shapeCollidable = true;
            resetFirst = true;
        }
        if(object2.shapeCollidable === false){
            object2.shapeCollidable = true;
            resetSecond = true;
        }
        const response = Collide(object1, object2);

        if(resetFirst === true)object1.shapeCollidable = false;
        if(resetSecond === true)object2.shapeCollidable = false;
        return response;
    }

    findFirstCollision({x,y,w=0.01,h=0.01}, obstacles=this.selectionManager.map.obstacles){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w, h});

        for(let i = obstacles.length-1; i >= 0; i--){
            if(this.collideWithEnabled(obstacles[i], selectionObstacle) !== false){
                return obstacles[i];
            }
        }
        return false;
    }

    findAllCollisionsAsObject({x,y,w=0.01,h=0.01}, obstacles=this.selectionManager.map.obstacles){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w, h});

        const collision = {};
        for(let i = 0; i < obstacles.length; i++){
            if(this.collideWithEnabled(obstacles[i], selectionObstacle) !== false){
                collision[i] = obstacles[i];
            }
        }
        return collision;
    }
    findAllCollisions({x,y,w=0.1,h=0.1}, obstacles=this.selectionManager.map.obstacles){
        return Object.values(this.findAllCollisionsAsObject({x,y,w,h}, obstacles));
    }

    selectObstacles({x,y,w=0.1,h=0.1}){
        // TODO: spatial hash
        this.selectedObstacles = [];
        this.selectedObstacles.push(...this.findAllCollisions({x,y,w,h}));
        this.selectedObstaclesChanged = true;
    }
    findFirstSelectedCollision({x,y,w=0.1,h=0.1}){
        return this.findFirstCollision({x,y,w,h}, this.selectedObstacles);
    }
    findAllSelectedCollisionsAsObject({x,y,w=0.1,h=0.1}){
        return this.findAllCollisionsAsObject({x,y,w,h}, this.selectedObstacles);
    }
    findAllSelectedCollisions({x,y,w=0.1,h=0.1}){
        return this.findFirstCollision(selectionObstacle, {x,y,w,h}, this.selectedObstacles);
    }
    
    deleteSelectedObstacles(){
        for(let i = 0; i < this.selectedObstacles.length; i++){
            this.selectedObstacles[i].toRemoveSelector = true;
            this.client.deleteObstacle(this.selectedObstacles[i]);
        }

        this.map.obstacles = this.map.obstacles.filter(o => o.toRemoveSelector !== true);

        this.selectedObstacles = [];
        this.selectedObstaclesChanged = true;
    }

    selectAll(obstacles=this.selectionManager.map.obstacles){
        this.selectedObstacles = [];
        this.selectedObstacles.push(...obstacles);
        this.selectedObstaclesChanged = true;
    }
    selectAllOfType({shape, simulate, effect}, obstacles=this.selectionManager.map.obstacles){
        this.selectedObstacles = [];
        this.selectedObstacles.push(...obstacles.filter(o => this.typesEqual({shape, simulate, effect}, o) === true))
        this.selectedObstaclesChanged = true;
    }
    typesEqual(o1, o2){
        return o1.initialShape === o2.shape && this.arrayEquals(o1.simulate, o2.simulate) === true && o1.effect === o2.effect;
    }
    arrayEquals(arr1, arr2){
        for(let i = 0; i < arr1.length; i++){
            if(arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true;
    }

    handleSpecialKeyOnClick(event, firstCollision){
        if(event.altKey === true && firstCollision !== false){
            // alt drag
            this.previewManager.addPreviewObstacle({...firstCollision, shape: firstCollision.initialShape});// TODO: add multiple obstacles and start a transform if multiple are selected
            // window.structuredCloneWithoutKey({...firstCollision, shape: firstCollision.initialShape}, ['resizePoints','inputRef'])
        } else if(event.shiftKey === true){
            // shift click
            this.selectAllOfType(firstCollision);
            this.transformManager.transformActive = true;
        }
    }
    deselectFirstObstacle(event, firstCollision, {x,y,w=0.01,h=0.01}){
        // ctrl click
        const firstSelectedCollision = this.findFirstSelectedCollision(this.selectionManager.screenToWorld(this.inputManager.mouse.pos));
        this.selectedObstacles.forEach((o, i) => {
            if(o === firstSelectedCollision){
                this.selectedObstacles.splice(i, 1);
                return;
            }
        })
        this.selectedObstaclesChanged = true;
    }
    handleDirectClick(event, firstCollision){
        if(event.ctrlKey === true){
            this.selectedObstacles.push(firstCollision);
        } else {
            this.selectedObstacles = [firstCollision];
        }
        this.selectedObstaclesChanged = true;
    }

    reloadMenu(){
        this.selectionManager.client.uiManager.editMenuManager.editMenuGenerator.reloadMenu();
    }
}

// helper class to collisionManager that manages clipboard
class CollisionClipboardManager {
    constructor(client, collisionManager){
        this.client = client;
        this.collisionManager = collisionManager;

        this.clipboard = [];
        this.clientSettings = this.collisionManager.client.settings;
    }
    copy(selectedObstacles=this.collisionManager.selectedObstacles){
        if(selectedObstacles.length === 0)return;
        this.clipboard = [];
        for(let i = 0; i < selectedObstacles.length; i++){
            const o = selectedObstacles[i];
            this.clipboard.push(window.initObstacle({
                ...o,
                x: o.x + this.clientSettings.snapDistance,
                y: o.y + this.clientSettings.snapDistance,
                shape: o.initialShape
                /*window.initObstacle(window.structuredCloneWithoutKey({...o, x: o.x + 25, y: o.y + 25, shape: o.initialShape}, ['resizePoints','inputRef']))*/
            }));
        }// TODO: make offsetting by 25px a setting on by default
    }
    paste(){
        this.collisionManager.selectedObstacles = [];
        for(let i = 0; i < this.clipboard.length; i++){
            this.client.addObstacle(this.clipboard[i]);
            this.collisionManager.selectedObstacles.push(this.map.obstacles[this.map.obstacles.length-1]);
        }
        this.collisionManager.selectedObstaclesChanged = true;

        this.clipboard = window.structuredClone(this.clipboard);

        for(let i = 0; i < this.clipboard.length; i++){
            this.clipboard[i].x += this.clientSettings.snapDistance;
            this.clipboard[i].y += this.clientSettings.snapDistance;
            transformBody(this.clipboard[i], {x: this.clientSettings.snapDistance, y: this.clientSettings.snapDistance});
        }
    }
}

class SelectionInputManager {
    constructor(client, selectionManager){
        initClass(this, client, selectionManager);

        this.mouse = {pos: {x: 0, y: 0}, worldDelta: {x: 0, y: 0}, worldLast: {x: 0, y: 0}};
    }
    start(){
        defineOtherClasses(this, 'inputManager');

        this.addEventListeners();
    }
    addEventListeners(){
        this.addMouseEventListeners();
    }
    addMouseEventListeners(){
        Ref.canvas.onmouseup = (event) => {
            this.dragManager.onMouseUp(event);
            this.scaleManager.onMouseUp(event);

            this.transformManager.transformActive = false;
            this.scaleManager.transformActive = false;
        }
        window.onmousemove = (event) => {
            this.mouse.pos = {x: event.pageX, y: event.pageY};
            this.selectionManager.forEachSubClass('run');
        },
        Ref.canvas.onmousedown = (event) => {
            if(this.previewManager.previewObstacle !== null){
                this.previewManager.placePreviewObstacle();
            } else if(this.client.playerActive === false){
                this.handleSelectionClick(event);
            }
        }
    }
    handleSelectionClick(event) {
        const worldMousePos = this.selectionManager.screenToWorld(this.mouse.pos);
        const firstCollision = this.collisionManager.findFirstCollision(worldMousePos);
        const firstPointCollision = this.selectionManager.transformMode === 'resize' ? this.scaleManager.findFirstCollision(worldMousePos) : false;

        if((event.altKey === true || event.shiftKey === true) && firstPointCollision !== false && this.selectionManager.transformMode === 'resize'){
            this.scaleManager.handleSpecialKeyOnClick(event, firstPointCollision);
        } else if((event.altKey === true || event.shiftKey === true) && firstCollision !== false){
            this.collisionManager.handleSpecialKeyOnClick(event, firstCollision);
        } else if(this.scaleManager.findFirstSelectedCollision(worldMousePos) !== false && this.selectionManager.transformMode === 'resize'){
            if(event.ctrlKey === true){
                this.scaleManager.deselectFirstPoint(event, firstPointCollision, worldMousePos);
            } else {
                this.scaleManager.transformActive = true;
            }
        } else if(this.collisionManager.findFirstSelectedCollision(worldMousePos) !== false){
            if(event.ctrlKey === true){
                this.collisionManager.deselectFirstObstacle(event, firstCollision, worldMousePos);
            } else {
                this.transformManager.transformActive = true;
            }
        } else if(firstPointCollision !== false){
            this.scaleManager.handleDirectClick(event, firstPointCollision);
            this.scaleManager.transformActive = true;
        } else if(firstCollision !== false){
            this.collisionManager.handleDirectClick(event, firstCollision);
            this.transformManager.transformActive = true;
        } else {
            this.dragManager.startSelectionDrag(this.mouse.pos);
        }
    }
}