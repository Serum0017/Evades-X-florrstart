import Ref from './editorRef.js';
import transformBody from '../client/simulate/obstacles/transformBody.js';
import Collide from '../client/simulate/obstacles/collisionManager.js';

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

// manages the "select" element of the [select, rotate, resize] trio
class SelectionTransformManager {
    constructor(client, selectionManager){
        initClass(this, client, selectionManager);

        this.transformActive = false;
    }
    start(){
        defineOtherClasses(this, 'transformManager');
    }
    run(){
        this.updateTransforms();
        this.inputManager.mouse.worldLast = this.selectionManager.screenToWorld(this.inputManager.mouse.pos);
    }
    updateTransforms(){
        const mouse = this.selectionManager.inputManager.mouse;
        const worldMousePos = this.selectionManager.screenToWorld(mouse.pos);
        
        mouse.worldDelta = {x: worldMousePos.x - mouse.worldLast.x, y: worldMousePos.y - mouse.worldLast.y};

        if((mouse.worldDelta.x === 0 && mouse.worldDelta.y === 0) || (this.previewManager.previewObstacle === null && this.transformActive === false && this.scaleManager.transformActive === false)){
            return;
        }
        
        if(this.previewManager.previewObstacle !== null){
            this.transformObstacle(this.previewManager.previewObstacle, {x: worldMousePos.x - this.previewManager.previewObstacle.x, y: worldMousePos.y - this.previewManager.previewObstacle.y});
        }

        if(this.transformActive === true){
            this.transformGroup(this.collisionManager.selectedObstacles, mouse, mouse.worldDelta, worldMousePos);
        }
    }
    transformObstacle(obstacle, {x,y}){
        if(x === 0 && y === 0){
            return;
        }

        let difference;
        if(this.selectionManager.settings.toSnap === true){
            const snapDistance = this.selectionManager.settings.snapDistance;
            difference = {
                x: Math.round((x + obstacle.x) / snapDistance) * snapDistance - obstacle.x,
                y: Math.round((y + obstacle.y) / snapDistance) * snapDistance - obstacle.y,
            }
        } else {
            difference = {x,y};
        }

        if(difference.x === 0 && difference.y === 0){
            return;
        }

        obstacle.x += difference.x;
        obstacle.y += difference.y;
        transformBody(obstacle, {x: difference.x, y: difference.y, rotation: 0});
    }
    transformGroup(obstacles, mouse, worldMouseDelta, worldMousePos){
        let difference;
        if(this.selectionManager.settings.toSnap === true){
            const snapDistance = this.selectionManager.settings.snapDistance;
            difference = {
                x: (Math.round(worldMousePos.x / snapDistance) - Math.round(mouse.worldLast.x / snapDistance)) * snapDistance,
                y: (Math.round(worldMousePos.y / snapDistance) - Math.round(mouse.worldLast.y / snapDistance)) * snapDistance
            };
        } else {
            difference = {x: worldMouseDelta.x, y: worldMouseDelta.y};
        }

        for(let i = 0; i < obstacles.length; i++){
            obstacles[i].x += difference.x;
            obstacles[i].y += difference.y;
            transformBody(obstacles[i], {x: difference.x, y: difference.y, rotation: 0});
        }
    }
}

// manager the "rotate" element of the [select, rotate, resize] trio
class SelectionRotateManager {
    constructor(client, selectionManager){
        initClass(this, client, selectionManager);

        this.transformActive = false;
    }
    start(){
        defineOtherClasses(this, 'rotateManager');
    }
}

// selectedScaleManager manages the scaling points and all of their collisions and transformations. Another class will be created for managing rotation
class SelectionScaleManager {
    constructor(client, selectionManager){
        initClass(this, client, selectionManager);

        this.transformActive = false;

        this.selectedPoints = [];
    }
    start(){
        defineOtherClasses(this, 'scaleManager');

        this.defineResizeMap();

        setInterval(this.run.bind(this), 1000/60);
    }
    run(){
        for(let i = 0; i < this.selectionManager.map.obstacles.length; i++){
            const obstacle = this.selectionManager.map.obstacles[i];
            this.updateResizePoints(obstacle);
        }

        if(this.transformActive === true){
            for(let i = 0; i < this.selectedPoints.length; i++){
                this.transformResizePoints(this.selectedPoints[i].parentObstacle, this.selectedPoints[i], i);
            }
        }
    }
    defineResizeMap(){
        this.resizeMap = {
            poly: (o) => {
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
                    {x: o.difference.x/2, y: 0},
                    {x: -o.difference.x/2, y: 0},
                ];
            }
        }
        this.resizeUpdateMap = {
            circle: (o) => {
                if(this.transformResizePointsActive === true){
                    return;
                }
                const worldMousePos = this.selectionManager.screenToWorld(this.selectionManager.inputManager.mouse.pos);
                const angle = Math.atan2(worldMousePos.y - o.y, worldMousePos.x - o.x);

                o.resizePoints[0].x = Math.cos(angle) * o.body.r;
                o.resizePoints[0].y = Math.sin(angle) * o.body.r;
            }
        }
        this.resizeTransformMap = {
            poly: (o, pt, index, delta) => {
                // const points = o.body.points;
                // points[index] = new SAT.Vector(pt.x, pt.y);
                // o.body.setPoints(points);
                // console.log(o);
                o.points[index][0] = pt.x;
                o.points[index][1] = pt.y;
                // console.log(o.inputRef);
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
                o.resizePoints[0].y = 0;
                o.resizePoints[1].y = 0;

                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');

                ctx.font = `1px Inter`;
                o.fontSize = Math.abs(o.resizePoints[0].x - o.resizePoints[1].x) / ctx.measureText(o.text).width;
                // o.x += delta.x;
                // o.y += delta.y;
                this.client.updateObstacle(o);

                o.resizePoints[0].x = o.difference.x / 2;
                o.resizePoints[1].x = -o.difference.x / 2;
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
        if(this.resizeMap[o.initialShape] === undefined){
            console.error('shape does not have a resizemap definition! selectionManager.js ' + o.initialShape);
        }
        this.resizeMap[o.initialShape](o);
        for(let i = 0; i < o.resizePoints.length; i++){
            o.resizePoints[i].parentObstacle = o;
            o.resizePoints[i].parentIndex = i;
        }
    }

    transformResizePoints(parent, pt, index){
        const worldMousePos = this.selectionManager.screenToWorld(this.selectionManager.inputManager.mouse.pos)
        const last = {x: pt.x, y: pt.y};
        pt.x = worldMousePos.x - parent.x;
        pt.y = worldMousePos.y - parent.y;
        const positionDelta = {
            x: pt.x - last.x,
            y: pt.y - last.y
        }
        this.resizeTransformMap[parent.initialShape](parent, pt, index, positionDelta);
    }

    updateResizePoints(o) {
        if(this.resizeUpdateMap[o.initialShape] !== undefined){
            this.resizeUpdateMap[o.initialShape](o);
        }
    }

    
    // updateTransforms(){
    //     if(this.transformMode !== 'resize' || this.scaleManager.transformActive !== true){
    //         return;
    //     }
    //     if(this.transformResizePointsActive === true){
    //         for(let i = 0; i < this.selectedPoints.length; i++){
    //             const resizePoint = this.selectedPoints[i];
    //             const parentObstacle = resizePoint.parentObstacle;
    //             const transformDelta = {
    //                 x: this.toSnap === true ? this.snapDifference.x : mouse.worldDelta.x,
    //                 y: this.toSnap === true ? this.snapDifference.y : mouse.worldDelta.y
    //             }
    //             if(parentObstacle.initialShape === 'square' || parentObstacle.shape === 'text'){
    //                 transformDelta.x /= 2;
    //                 transformDelta.y /= 2;
    //             }
    //             resizePoint.x += transformDelta.x;
    //             resizePoint.y += transformDelta.y;
    //             this.resizeTransformMap[parentObstacle.initialShape](parentObstacle, resizePoint, resizePoint.parentIndex, transformDelta);
    //             this.client.updateObstacle(parentObstacle);
    //         }
    //     }
    //     for(let i = 0; i < this.map.obstacles.length; i++){
    //         this.updateResizePoints(this.map.obstacles[i]);
    //     }
    // }
    
    // selectResizePoints({x,y,w,h}){
    //     const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w, h});
    //     this.selectedPoints = [];
    //     // TODO: spatial hash this so that larger maps dont lag exponentially more
    //     outerLoop: for(let i = 0; i < this.map.obstacles.length; i++){
    //         const obstacle = this.map.obstacles[i];
    //         const obstacleselectedPoints = [];
    //         innerLoop: for(let j = 0; j < obstacle.resizePoints.length; j++){
    //             const resizePoint = obstacle.resizePoints[j];
    //             const resizePointObstacle = window.initObstacle({type: 'circle-normal-normal', x: resizePoint.x + obstacle.x, y: resizePoint.y + obstacle.y, r: 12.5});

    //             if(Collide(resizePointObstacle, selectionObstacle) !== false){
    //                 obstacleselectedPoints.push(resizePoint);
    //                 if(obstacle.initialShape !== 'poly'){
    //                     // we can't select multiple points because the shape is not a poly. Push the singular selected point and continue
    //                     this.selectedPoints.push(obstacleselectedPoints[0]);
    //                     continue outerLoop;
    //                 }
    //             }
    //         }
    //         // we are a poly or something with no intersections. Either way, push all points
    //         for(let k = 0; k < obstacleselectedPoints.length; k++){
    //             this.selectedPoints.push(obstacleselectedPoints[k]);
    //         }
    //     }
    //     // in order to trigger the "set"
    //     this.selectedPoints = this.selectedPoints;
    // }

    collide(object1, object2){
        return Collide(object1, object2);
    }

    findFirstCollision({x,y,w=0.01,h=0.01}, obstacles=this.selectionManager.map.obstacles){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w, h});

        for(let i = obstacles.length-1; i >= 0; i--){
            for(let j = 0; j < obstacles[i].resizePoints.length; j++){
                const resizePointObstacle = window.initObstacle({type: 'circle-normal-normal', x: obstacles[i].x + obstacles[i].resizePoints[j].x, y: obstacles[i].y + obstacles[i].resizePoints[j].y, r: 12.5});
                if(this.collide(selectionObstacle, resizePointObstacle) !== false){
                    return obstacles[i].resizePoints[j];
                }
            }
        }
        return false;
    }

    findAllCollisionsAsObject({x,y,w=0.01,h=0.01}, obstacles=this.selectionManager.map.obstacles){
        const selectionObstacle = window.initObstacle({type: 'square-normal-normal', x, y, w, h});

        const collision = {};
        for(let i = 0; i < obstacles.length; i++){
            for(let j = 0; j < obstacles[i].resizePoints.length; j++){
                const resizePointObstacle = window.initObstacle({type: 'circle-normal-normal', x: obstacles[i].x + obstacles[i].resizePoints[j].x, y: obstacles[i].y + obstacles[i].resizePoints[j].y, r: 12.5})
                if(this.collide(selectionObstacle, resizePointObstacle) !== false){
                    if(collision[i] === undefined){
                        collision[i] = {};
                    }
                    collision[i][j] = obstacles[i].resizePoints[j];
                }
            }
        }
        return collision;
    }
    findAllCollisions({x,y,w=0.1,h=0.1}, obstacles=this.selectionManager.map.obstacles){
        const collisionArray = [];
        const collisionObject = this.findAllCollisionsAsObject({x,y,w,h}, obstacles);
        for(let key in collisionObject){
            for(let key2 in collisionObject[key]){
                collisionArray.push(collisionObject[key][key2]);
            }
        }
        return collisionArray;
    }

    selectResizePoints({x,y,w=0.1,h=0.1}){
        // TODO: spatial hash
        this.selectedPoints = [];
        this.selectedPoints.push(...this.findAllCollisions({x,y,w,h}));
    }
    findFirstSelectedCollision({x,y,w=0.1,h=0.1}){
        return this.findFirstCollision({x,y,w,h}, {resizePoints: this.selectedPoints});
    }
    // findAllSelectedCollisionsAsObject({x,y,w=0.1,h=0.1}){// this shouldn't be used...
    //     return this.findAllCollisionsAsObject({x,y,w,h}, {resizePoints: this.selectedPoints});
    // }
    findAllSelectedCollisions({x,y,w=0.1,h=0.1}){
        return this.findFirstCollision(selectionObstacle, {x,y,w,h}, {resizePoints: this.selectedPoints});
    }
    
    deleteSelectedPoints(){
        for(let i = 0; i < this.selectedPoints.length; i++){
            this.selectedPoints[i].toRemoveSelector = true;
        }

        for(let i = 0; i < this.selectionManager.map.obstacles.length; i++){
            const obstacle = this.selectionManager.map.obstacles[i];
            if(obstacle.initialShape !== 'poly'){
                continue;
            }

            const lastLen = obstacle.points.len;
            obstacle.points = obstacle.points.filter((p,i) => obstacle.selectedPoints[i].toRemoveSelector !== true);
            if(obstacle.points.length !== lastLen){
                this.client.updateObstacle(obstacle);
            }
        }

        this.selectedPoints = [];
    }

    handleDirectClick(event, firstPointCollision){
        if(event.ctrlKey === true){
            this.selectedPoints.push(firstPointCollision);
        } else if(event.shiftKey === true){
            this.selectedPoints = [...firstPointCollision.parentObstacle.resizePoints];
        } else {
            this.selectedPoints = [firstPointCollision];
        }
    }

    handleSpecialKeyOnClick(event, firstCollision){
        if(event.shiftKey === true){
            // shift click
            this.resizePoints = [];
            this.resizePoints.push(...firstCollision.resizePoints);
            this.transformActive = true;
        }
    }
    deselectFirstPoint(event, firstCollision, {x,y,w=0.01,h=0.01}){
        // ctrl click
        // TODO
        const firstSelectedCollision = this.findFirstSelectedCollision(this.screenToWorld(this.inputManager.mouse.pos));
        this.selectedPoints.forEach((o, i) => {
            if(o === firstSelectedCollision){
                this.selectedPoints.splice(i, 1);
                return;
            }
        })
    }
}

export default {SelectionTransformManager, SelectionRotateManager, SelectionScaleManager};