import Collide from '../client/simulate/obstacles/collisionManager.js';
import transformBody from '../client/simulate/obstacles/transformBody.js';
import Ref from './editorRef.js';
// this class selects stuff when not in create mode. It has a drag of its own, like createModeManager.
// selected obstacles are highlighted in blue.
export default class SelectionManager {
    constructor(client){
        this.client = client;
        this.dragActive = false;
        this.transformActive = false;
        this.rect = {start: {x: 0, y: 0}, end: {x: 0, y: 0}};
        this.selectedObstacles = [];
    }
    start(){
        this.map = this.client.game.map;
        this.editorManager = this.client.editorManager;
        this.snapGridManager = this.client.editorManager.snapGridManager;
        this.createModeManager = this.client.editorManager.createManager.createModeManager;

        this.defineEventListeners();
    }
    defineEventListeners(){
        Ref.canvas.onmousedown = (event) => {
            if(this.createModeManager.active)return;
            const earlyOut = this.earlyOutTransformDetected(this.screenToWorld({x: event.pageX, y: event.pageY}));
            if(earlyOut !== false){
                if(earlyOut.selectionIndex !== undefined){
                    // its an already selected obstacle, transform existing ones
                } else {
                    // this isn't an existing obstacle, add it as the sole thing to transform
                    while(this.selectedObstacles.length > 0){
                        this.removeSelected(0);
                    }
                    this.addSelected(earlyOut);
                }
                
                this.transformActive = true;
                return;
            }
            this.dragActive = true;
            this.rect.start = this.screenToWorld({x: event.pageX, y: event.pageY});
            this.rect.end = {x: this.rect.start.x, y: this.rect.start.y};
        }
        // mouse move - move the end point todo snap to snap grid once implemented
        Ref.canvas.onmousemove = (event) => {
            if(this.createModeManager.active)return;
            if(this.transformActive === true){
                this.transformSelectedObstacles(event);
            } else {
                this.rect.end = this.screenToWorld({x: event.pageX, y: event.pageY});
            }
        },
        // mouse up - create obstacle
        Ref.canvas.onmouseup = (event) => {
            if(this.createModeManager.active)return;
            this.dragActive = false;
            
            if(this.transformActive === false){
                this.rect.end = this.screenToWorld({x: event.pageX, y: event.pageY});
                this.selectObstacles(this.rect);
            }
            this.transformActive = false;
        }

        Ref.deleteButton.onclick = () => {
            console.log(this.selectedObstacles);
            this.deleteAllSelected();
        }

        Ref.duplicateButton.onclick = () => {
            this.duplicateAllSelected();
        }
    }
    // enable both objects to collide, reguardless of if they're collidable or not. This is good for selected obstacles when we want everything to be collidable
    collideWithSelection(object1, object2){
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
    selectObstacles({start, end}){
        while(this.selectedObstacles.length > 0){
            this.removeSelected(0);
        }
        const x = (start.x + end.x)/2; const y = (start.y + end.y)/2;
        const w = Math.abs(start.x - end.x); const h = Math.abs(start.y - end.y);
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w, h});
        for(let i = 0; i < this.map.obstacles.length; i++){
            if(this.collideWithSelection(selectionObstacle, this.map.obstacles[i]) !== false){
                this.addSelected(this.map.obstacles[i]);
            }
        }
    }
    addSelected(o){
        this.selectedObstacles.push(o);
        o.selectionIndex = this.selectedObstacles.length - 1;
    }
    removeSelected(ind){
        delete this.selectedObstacles[ind].selectionIndex;
        this.selectedObstacles.splice(ind, 1);
    }
    deleteAllSelected(){
        for(let i = 0; i < this.map.obstacles.length; i++){
            if(this.map.obstacles[i].selectionIndex !== undefined){
                this.map.removeObstacle(i);
                i--; continue;// ig this works... dont judge
            }
        }
        this.selectedObstacles = [];
    }
    earlyOutTransformDetected({x,y}){
        // return an obstacle if there's a collision at the point, otherwise dont.
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w: 0.001, h: 0.001});
        for(let i = 0; i < this.map.obstacles.length; i++){
            if(this.collideWithSelection(selectionObstacle, this.map.obstacles[i]) !== false){
                return this.map.obstacles[i];
            }
        }
        return false;
    }
    transformSelectedObstacles(event){
        const snapEnabled = this.snapGridManager.enabled;
        const snapDistance = this.snapGridManager.snapDistance;
        const mouseWorldPos = this.screenToWorld({x: event.pageX, y: event.pageY});
        const lastMouseWorldPos = this.screenToWorld({x: event.pageX - event.movementX, y: event.pageY - event.movementY});
        const transformAmount = {
            x: snapEnabled ? Math.round(mouseWorldPos.x / snapDistance) * snapDistance - Math.round(lastMouseWorldPos.x / snapDistance) * snapDistance : mouseWorldPos.x - lastMouseWorldPos.x,
            y: snapEnabled ? Math.round(mouseWorldPos.y / snapDistance) * snapDistance - Math.round(lastMouseWorldPos.y / snapDistance) * snapDistance : mouseWorldPos.y - lastMouseWorldPos.y,
        }
        
        for(let i = 0; i < this.selectedObstacles.length; i++){
            const o = this.selectedObstacles[i];
            o.x += transformAmount.x;
            o.y += transformAmount.y;
            transformBody(o, {x: transformAmount.x, y: transformAmount.y, rotation: 0});
        }
    }
    duplicateAllSelected(){
        let newSelectedObstacles = [];
        for(let i = 0; i < this.selectedObstacles.length; i++){
            newSelectedObstacles.push(this.editorManager.addObstacle({...this.selectedObstacles[i], editorId: undefined, x: this.selectedObstacles[i].x + this.snapGridManager.snapDistance, y: this.selectedObstacles[i].y + this.snapGridManager.snapDistance}));
        }
        while(this.selectedObstacles.length > 0){
            this.removeSelected(0);
        }
        for(let i = 0; i < newSelectedObstacles.length; i++){
            this.addSelected(newSelectedObstacles[i]);
        }
    }
    screenToWorld({x,y}){
        return {
            x: this.client.me().render.x - Ref.canvas.w / 2 + x * (Ref.canvas.w / window.innerWidth),
            y: this.client.me().render.y - Ref.canvas.h / 2 + y * (Ref.canvas.h / window.innerHeight)
        }
    }
}

// manages the drag rectangle
// class SelectionDragManager {
//     constructor(client, selectionManager){
//         this.selectionRect = null;
//         this.mouseTransformActive = false;
//     }
//     start(){
//         this.defineEventListeners();

//         setInterval(this.run.bind(this), 1000/60);
//     }
//     defineEventListeners(){
//         document.onvisibilitychange = (event) => {
//             this.selectionRect = null;
//         }
//     }
//     run(){
//         if(this.selectionRect !== null){
//             this.selectionRect.end = this.selectionManager.screenToWorld(this.inputManager.mouse.pos);
//         }
//     }
//     startSelectionDrag({x,y}){
//         this.selectionRect = {start: this.selectionManager.screenToWorld({x,y}), end: this.selectionManager.screenToWorld({x,y})};
//     }
//     includePoint({x, y}, margin=100){
//         const me = this.client.me();
//         if(x > window.innerWidth - margin){
//             me.x += 8 / Ref.canvas.zoom;
//         } else if(x < margin) {
//             me.x -= 8 / Ref.canvas.zoom;
//         }
//         if(y > window.innerHeight - margin){
//             me.y += 8 / Ref.canvas.zoom;
//         } else if(y < margin) {
//             me.y -= 8 / Ref.canvas.zoom;
//         }
//     }
//     onMouseUp(event){
//         // TODO: make a setting so that stuff can be selected while u drag. This wont be that laggy once spatial hash is implemented?
//         if(this.selectionRect === null){
//             return;
//         }
//         this.collisionManager.selectObstacles({
//             x: (this.selectionRect.end.x + this.selectionRect.start.x)/2,
//             y: (this.selectionRect.end.y + this.selectionRect.start.y)/2,
//             w: Math.max(0.1, Math.abs(this.selectionRect.end.x - this.selectionRect.start.x)),
//             h: Math.max(0.1, Math.abs(this.selectionRect.end.y - this.selectionRect.start.y))
//         });

//         if(this.selectionManager.transformMode === 'resize'){
//             this.scaleManager.selectResizePoints({
//                 x: (this.selectionRect.end.x + this.selectionRect.start.x)/2,
//                 y: (this.selectionRect.end.y + this.selectionRect.start.y)/2,
//                 w: Math.max(0.1, Math.abs(this.selectionRect.end.x - this.selectionRect.start.x)),
//                 h: Math.max(0.1, Math.abs(this.selectionRect.end.y - this.selectionRect.start.y))
//             });
//         }

//         this.selectionRect = null;
//     }
//     endMiddleClickTransform(event){
//         Ref.canvas.style.cursor = 'auto';
//         this.mouseTransformActive = false;
//         return event.preventDefault();
//     }
//     updateMiddleClickTransform(mouseScreenDelta){
//         const me = this.client.me();
//         me.x -= mouseScreenDelta.x / Ref.canvas.zoom;
//         me.y -= mouseScreenDelta.y / Ref.canvas.zoom;
//     }
//     startMiddleClickTransform(event){
//         Ref.canvas.style.cursor = 'grabbing';
//         this.mouseTransformActive = true;
//         // console.log(event.movementX)
//         // const last = this.selectionManager.screenToWorld({x: event.pageX - event.movementX, y: event.pageY - event.movementY});
//         // const next = this.selectionManager.screenToWorld({x: event.pageX, y: event.pageY});
//         // console.log({x: next.x - last.x, y: next.y - last.y});
        
//         return event.preventDefault();
//     }
// }