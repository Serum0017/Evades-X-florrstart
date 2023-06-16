function transformBody(obstacle, delta){
    if(delta.x !== 0 || delta.y !== 0){
        obstacle.body.setOffset(new SAT.Vector(obstacle.body.offset.x+delta.x, obstacle.body.offset.y+delta.y));

        obstacle.pivot.x += delta.x;
        obstacle.pivot.y += delta.y;
    }
    if(delta.rotation !== 0){
        obstacle.body.rotate(delta.rotation);
        obstacle.rotation += delta.rotation;
        obstacle.spatialHash.updateEntity(obstacle);
    } else if((obstacle.x - delta.x) % hashDistance !== obstacle.x % hashDistance || (obstacle.y - delta.y) % hashDistance !== obstacle.y % hashDistance){
        obstacle.spatialHash.updateEntity(obstacle);
    }
}

export default transformBody;