const hashDistance = /*2*/50;// memory vs efficiency tradeoff

// TODO: fix this relying on top/ bottom

export default class SpatialHash {
    constructor(){
        // positions: { x: {y: [entities at this hash] } }
        this.positions = {};
        this.hashId = 0;
    }
    addEntity(entity){
        entity.hashId = this.hashId;
        this.hashId++;

        entity.hashPositions = [];
        const hashPoints = this.calculateHashPoints(entity);
        for(let x in hashPoints){
            for(let y in hashPoints[x]){
                this.addPosition({x,y}, entity);
            }
        }

        Object.defineProperty(entity, 'spatialHash', {
            value: this,
            enumerable: false,
            configurable: false,
        })
    }
    addPosition({x,y}, entity){
        if(this.positions[x] === undefined){
            this.positions[x] = {};
        }
        if(this.positions[x][y] === undefined){
            this.positions[x][y] = {};
        }
        this.positions[x][y][entity.hashId] = entity;
        entity.hashPositions.push({x,y});
    }
    calculateHashPoints(entity){
        const positions = {};

        const topSpatial = {
            x: Math.floor((entity.x - entity.difference.x/2) / hashDistance) * hashDistance,
            y: Math.floor((entity.y - entity.difference.y/2) / hashDistance) * hashDistance
        }
        const bottomSpatial = {
            x: Math.ceil((entity.x + entity.difference.x/2) / hashDistance) * hashDistance,
            y: Math.ceil((entity.y + entity.difference.y/2) / hashDistance) * hashDistance
        }
        for(let x = topSpatial.x; x <= bottomSpatial.x; x += hashDistance){
            if(!positions[x]){
                positions[x] = {};
            }
            for(let y = topSpatial.y; y <= bottomSpatial.y; y += hashDistance){
                positions[x][y] = true;
            }
        }

        return positions;
    }
    updateEntity(entity){
        // deleting all the current hash positions
        for(let point of entity.hashPositions){
            delete this.positions[point.x][point.y][entity.hashId];
            if(Object.keys(this.positions[point.x][point.y]).length === 0){
                delete this.positions[point.x][point.y];
            }
            if(Object.keys(this.positions[point.x]).length === 0){
                delete this.positions[point.x];
            }
        }
        this.addEntity(entity);
    }
    getCollisions(/*player: */entity){
        // const hashPoints = this.calculateHashPoints(entity);
        // const collisions = {};
        // for(let x in hashPoints){
        //     for(let y in hashPoints[x]){
        //         const intersectingEntities = Object.values(this.positions[x][y]);
        //         for(let e in intersectingEntities){
        //             if(collisions[e.hashId] === undefined){
        //                 collisions[e.hashId] = e;
        //             }
        //         }
        //     }
        // }
        // return Object.values(collisions);
        const hashPoints = this.calculateHashPoints(entity);

        const collisions = {};

        for(let x in hashPoints){
            for(let y in hashPoints[x]){
                if(this.positions[x] === undefined)continue;
                if(this.positions[x][y] === undefined)continue;
                const intersectingEntities = Object.values(this.positions[x][y]);
                for(let i = 0; i < intersectingEntities.length; i++){
                    collisions[intersectingEntities[i].hashId] = intersectingEntities[i];
                }
            }
        }
        return Object.values(collisions);
    }
    renderDebug(canvas,ctx,entities){
        ctx.globalAlpha = 0.65;
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 4;
        for(let i = 0; i < entities.length; i++){
            if(entities[i].renderFlag === 'square' || entities[i].shape !== 'poly')continue;
            // ctx.strokeRect(entities[i].x-entities[i].difference.x/2, entities[i].y - entities[i].difference.y/2, entities[i].difference.x, entities[i].difference.y);
            const e = entities[i];
            ctx.fillStyle = 'red';
            for(let i = 0; i < e.hashPositions.length; i++){
                const {x,y} = e.hashPositions[i];
                ctx.beginPath();
                ctx.arc(parseInt(x), parseInt(y), 15, 0, Math.PI*2);
                ctx.fill();
                ctx.closePath();
            }
            if(Math.random() < 0.001){
                console.log(e.body);
            }
        }
        ctx.globalAlpha = 1;
        // ctx.globalAlpha = 0.8;
        // ctx.fillStyle = 'red';
        // for(let x in this.positions){
        //     for(let y in this.positions[x]){
        //         ctx.beginPath();
        //         ctx.arc(parseInt(x), parseInt(y), 15, 0, Math.PI*2);
        //         ctx.fill();
        //         ctx.closePath();
        //     }
        // }
        // ctx.globalAlpha = 1;
    }
}