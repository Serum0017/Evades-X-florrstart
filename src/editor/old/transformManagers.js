import Ref from './editorRef.js';
import transformBody from '../client/simulate/obstacles/transformBody.js';
import Collide from '../client/simulate/obstacles/collisionManager.js';
import editorUtils from './editorUtils.js';
const {defineAsUnEnumerable} = editorUtils;

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
        this.inputManager.mouse.screenLast = {x: this.inputManager.mouse.pos.x, y: this.inputManager.mouse.pos.y};
    }
    updateTransforms(){
        const mouse = this.selectionManager.inputManager.mouse;
        const worldMousePos = this.selectionManager.screenToWorld(mouse.pos);
        
        mouse.worldDelta = {x: worldMousePos.x - mouse.worldLast.x, y: worldMousePos.y - mouse.worldLast.y};
        mouse.screenDelta = {x: mouse.pos.x - mouse.screenLast.x, y: mouse.pos.y - mouse.screenLast.y};

        if(this.selectionManager.dragManager.mouseTransformActive === true && !(mouse.worldDelta.x === 0 && mouse.worldDelta.y === 0)){
            this.selectionManager.dragManager.updateMiddleClickTransform(mouse.screenDelta);
        }

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
    transformObstacle/*with snapDistance accounted for*/(obstacle, {x,y}){
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
        this.client.updateObstacle(obstacle);
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
            this.client.updateObstacle(obstacles[i]);
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
                return o.body.calcPoints.map((c, i) => {return {x: c.x - o.x, y: c.y - o.y, bodyPointIndex: i}})
            },
            circle: (o) => {
                return [{x: 0, y: o.difference.y/2}];
            },
            square: (o) => {
                return [
                    {x: o.difference.x/2, y: o.difference.y/2},
                    {x: -o.difference.x/2, y: o.difference.y/2},
                    {x: o.difference.x/2, y: -o.difference.y/2},
                    {x: -o.difference.x/2, y: -o.difference.y/2},
                ]
            },
            oval: (o) => {
                return [
                    {x: o.difference.x/2, y: o.difference.y/2},
                    {x: -o.difference.x/2, y: o.difference.y/2},
                    {x: o.difference.x/2, y: -o.difference.y/2},
                    {x: -o.difference.x/2, y: -o.difference.y/2},
                ];
            },
            text: (o) => {
                return [
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
            poly: (o, pt, index) => {
                // const points = o.body.points;
                // points[index] = new SAT.Vector(pt.x, pt.y);
                // o.body.setPoints(points);
                // console.log(o);
                o.points[pt.bodyPointIndex][0] = pt.x;
                o.points[pt.bodyPointIndex][1] = pt.y;
                o.body.points[pt.bodyPointIndex].x = pt.x + o.x;
                o.body.points[pt.bodyPointIndex].y = pt.y + o.y;
                o.body._recalc();

                // console.log(o.htmlRef);
                // console.log(o.points[index]);
            },
            // TODO: update this to be maintainable when scaling is a thing
            circle: (o, pt, index) => {
                const dist = Math.sqrt(pt.x**2+pt.y**2);
                o.body.r = dist;
                o.r = dist;
            },
            square: (o, pt, index) => {
                // o.x += delta.x;
                // o.y += delta.y;
                // const bound = {
                //     w: Math.abs(pt.x) * 2,
                //     h: Math.abs(pt.y) * 2
                // }//Math.abs(pt.x * Math.cos(o.rotation) + pt.y * Math.sin(o.rotation)) * 2;
                //Math.abs(pt.y * Math.cos(o.rotation) - pt.x * Math.sin(o.rotation)) * 2;

                // solved by systems of equations:
                // o.w * Math.cos(angle) + o.h * Math.sin(angle) = pt.x
                // o.w * Math.sin(angle) + o.h * Math.cos(angle) = pt.y
                // =>
                // o.w / Math.cos(angle) + o.h / Math.sin(angle) = pt.x * 2
                // o.w / Math.sin(angle) + o.h / Math.cos(angle) = pt.y * 2
                // o.w / Math.cos(angle) + o.h / Math.cos(angle)^2 * sin(angle) = pt.y * 2 / cos(angle) * sin(angle)
                // o.h = (pt.x * 2 - pt.y * 2 / cos(angle) * sin(angle)) * (1 / sin(angle) - 1 / cos(angle)^2 * sin(angle))
                // o.w = (pt.y * 2 - o.h / Math.cos(angle)) * sin(angle)
                // o.difference.x / 2 = pt.x;
                // o.difference.y / 2 = pt.y;
                // window.recalculateBound(o);

                // o.w = Math.abs(pt.x * 2);
                // o.h = Math.abs(pt.y * 2);

                // our goal is to get this to be aligned with the mouse. Thus, we calculate the ratio between this and the mouse pos and apply
                // const original = {x: pt.x, y: pt.y};

                // o.difference = {x: o.w, y: o.h};
                // const old = {x: o.w, y: o.h};

                // // we want to snap the points to the bounding box. using recalculateBound of the bigger box we can find the full dimensions
                // window.recalculateBound(o);

                // // now actually set the final dimensions using the ratio
                // o.w = Math.abs(pt.x) * 2 * old.x / o.difference.x;
                // o.h = Math.abs(pt.y) * 2 * old.y / o.difference.y;

                // solve o.w * Math.cos(angle) + 

                // calculate the difference between what the rect will be
                // const differenceRatio = {
                //     x: o.difference.x / o.w,
                //     y: o.difference.y / o.h
                // }

                // const bound = {
                //     w: Math.abs(Math.cos(o.rotation) * pt.x + pt.y * Math.sin(o.rotiation)) * 2,
                //     h: 1
                // }

                o.w = Math.abs(pt.x) * 2;
                o.h = Math.abs(pt.y) * 2;

                // o.w *= differenceRatio;
                // o.h *= differenceRatio;
                // o.difference = {x: o.w, y: o.h};
                // const firstDifference = {x: o.w, y: o.h};

                // window.recalculateBound(o);// TODO: make square and oval bounds right

                // o.w = Math.abs(pt.x) * 2 * firstDifference.x / o.difference.x;
                // o.h = Math.abs(pt.y) * 2 * firstDifference.y / o.difference.y;
                // o.difference = {x: firstDifference.x, y: firstDifference.y};

                // o.w = o.difference.x;
                // o.h = o.difference.y;

                o.difference = {x: o.w, y: o.h};

                this.defineResizePoints(o);

                // o.w = Math.abs(pt.x) * 2;
                // o.h = Math.abs(pt.y) * 2;
            },
            text: (o, pt, index) => {
                o.resizePoints[0].y = 0;
                o.resizePoints[1].y = 0;

                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');

                ctx.font = `1px Inter`;
                o.fontSize = Math.abs(o.resizePoints[0].x - o.resizePoints[1].x) / ctx.measureText(o.text).width;
                // o.x += delta.x;
                // o.y += delta.y;

                o.resizePoints[0].x = o.difference.x / 2;
                o.resizePoints[1].x = -o.difference.x / 2;
            },
            oval: (o, pt, index) => {
                o.rw = Math.abs(pt.x);
                o.rh = Math.abs(pt.y);
                o.difference = {x: o.rw*2, y: o.rh*2};

                this.defineResizePoints(o);
            }
        }
    }
    rotate({x,y}, angle) {
        const dist = Math.sqrt(x**2+y**2);
        const newAngle = Math.atan2(y,x) + angle;
        return {
            x: dist * Math.cos(newAngle),
            y: dist * Math.sin(newAngle)
        }
    }
    defineResizePoints(o) {
        if(this.resizeMap[o.initialShape] === undefined){
            console.error('shape does not have a resizemap definition! selectionManager.js ' + o.initialShape);
        }
        if(o.resizePoints === undefined){
            defineAsUnEnumerable(o, 'resizePoints', []);
        }
        
        let newResizePoints = this.resizeMap[o.initialShape](o);
        if(o.rotation !== 0){
            for(let i = 0; i < newResizePoints.length; i++){
                const rotated = this.rotate(newResizePoints[i], o.rotation);
                newResizePoints[i].x = rotated.x;
                newResizePoints[i].y = rotated.y;
            }
        }
        for(let i = 0; i < newResizePoints.length; i++){
            if(o.resizePoints[i] === undefined){
                o.resizePoints[i] = {};
            }
            for(let key in newResizePoints[i]){
                o.resizePoints[i][key] = newResizePoints[i][key]
            }
            
            defineAsUnEnumerable(o.resizePoints[i], 'parentObstacle', o);
            o.resizePoints[i].parentIndex = i;
        }
    }

    transformResizePoints(parent, pt, index){
        // rotate all points to be at 0 rotation
        for(let i = 0; i < parent.resizePoints.length; i++){
            const rotatedPos = new SAT.Vector(parent.resizePoints[i].x + parent.x, parent.resizePoints[i].y + parent.y).rotateRelative(parent.rotation, {x: 0, y: 0});
            parent.resizePoints[i].x = rotatedPos.x - parent.x;
            parent.resizePoints[i].y = rotatedPos.y - parent.y;
        }

        const worldMousePos = this.selectionManager.screenToWorld(this.selectionManager.inputManager.mouse.pos);

        // make point at mouse position
        pt.x = worldMousePos.x - parent.x;
        pt.y = worldMousePos.y - parent.y;

        // apply snapping
        if(this.selectionManager.settings.toSnap === true){
            const snapDistance = this.selectionManager.settings.snapDistance;
            pt.x = Math.round(pt.x / snapDistance) * snapDistance;
            pt.y = Math.round(pt.y / snapDistance) * snapDistance;
        }

        // unrotate the points
        for(let i = 0; i < parent.resizePoints.length; i++){
            const rotatedPos = new SAT.Vector(parent.resizePoints[i].x, parent.resizePoints[i].y).rotateRelative(-parent.rotation, {x: 0, y: 0});
            parent.resizePoints[i].x = rotatedPos.x - parent.x;
            parent.resizePoints[i].y = rotatedPos.y - parent.y;
        }

        // apply the transforms to the shape
        this.resizeTransformMap[parent.initialShape](parent, pt, index);

        if(parent.initialShape !== 'poly'){
            this.client.updateObstacle(parent);
        }
    }

    updateResizePoints(o) {
        if(this.selectionManager.transformMode !== 'resize'){
            return;
        }
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
    selectAll(obstacles=this.selectionManager.map.obstacles){
        this.selectedPoints = [];
        for(let i = 0; i < obstacles.length; i++){
            for(let j = 0; j < obstacles[i].resizePoints.length; j++){
                this.selectedPoints.push(obstacles[i].resizePoints[j]);
            }
        }
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

    handleSpecialKeyOnClick(event, firstPointCollision){
        if(event.shiftKey === true){
            // shift click
            this.selectedPoints = [];
            this.selectedPoints.push(...firstPointCollision.parentObstacle.resizePoints);
            this.transformActive = true;
        }
    }
    deselectFirstPoint(event, firstPointCollision, {x,y,w=0.01,h=0.01}){
        // ctrl click
        const firstSelectedCollision = this.findFirstSelectedCollision(this.selectionManager.screenToWorld(this.inputManager.mouse.pos));
        this.selectedPoints.forEach((o, i) => {
            if(o === firstSelectedCollision){
                this.selectedPoints.splice(i, 1);
                return;
            }
        })
    }

    removeResizePoints(o){
        this.selectedPoints = this.selectedPoints.filter(p => p.parentObstacle !== o);
    }

    onMouseUp(event){
        this.transformActive = false;

        // this could be more efficient but idc
        for(let i = 0; i < this.selectedPoints.length; i++){
            const obstacle = this.selectedPoints[i].parentObstacle;
            if(obstacle.initialShape === 'poly'){
                const last = {x: obstacle.x, y: obstacle.y};
                window.recalculateBound(obstacle);
                this.defineResizePoints(obstacle);
                if(last.x !== obstacle.x || last.y !== obstacle.y){
                    obstacle.pivot.x += obstacle.x - last.x;
                    obstacle.pivot.y += obstacle.y - last.y;
                }
            }
        }
    }
}

export default {SelectionTransformManager, SelectionRotateManager, SelectionScaleManager};