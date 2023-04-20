const flip = fn => (b, a) => fn(a, b);

// we want to be able to call Collisions.collide(square)(circle)
class Collision {
    constructor(){
        this.collisionMap = {};
        // idea: since this is in a hashmap anyways why dont just make a function that checks the type of 2 sats and then checks colliswion accordingly
        // if there's special cases maybe we can have a prelim check function or something for collision cases that don't count
        // another idea/ necessity: in order for the game to be sucessful at all we need decoration blocks right on release
        
        // these need to be specified in the same order
        this.addCollisionMap('circle', 'square', (circle, square) => {
            if(!intersectingBoundingBox(circle, square)){
                return false;
            }
            // if (
            //     /*distX*/Math.abs(circle.x - square.top.x/2 - square.bottom.x/2) < square.w / 2 + circle.r &&
            //     /*distY*/Math.abs(circle.y - square.top.y/2 - square.bottom.y/2) < square.h / 2 + circle.r
            // ) {
                const res = new SAT.Response();
                if (SAT.testPolygonCircle(square.sat, circle.sat, res)) {
                    return res;
                }
            // }
            return false;
        });

        this.addCollisionMap('circle', 'circle', (circle1, circle2) => {
            if((circle1.x-circle2.x)**2+(circle1.y-circle2.y)**2 < (circle1.r+circle2.r)**2){
                const res = new SAT.Response();
                SAT.testCircleCircle(circle2.sat, circle1.sat, res);
                return res;
            }
            return false;
        });

        this.addCollisionMap('square', 'square', (square1, square2) => {
            // if(square1.x > square2.x + square2.w || square1.x+square1.w < square2.x) return false;
            // if(square1.y > square2.y + square2.h || square2.y > square1.y + square1.h) return false;
            if(!intersectingBoundingBox(square1, square2)){
                return false;
            }
            const res = new SAT.Response();
            SAT.testPolygonPolygon(square1.sat, square2.sat, res);
            return res;
        });

        this.addCollisionMap('poly', 'square', (poly, square) => {
            if(!intersectingBoundingBox(poly, square)){
                return false;
            }
            const res = new SAT.Response();
            if (SAT.testPolygonPolygon(poly.sat, square.sat, res)) {
                return res;
            }
            return false;
        });

        this.addCollisionMap('circle', 'poly', (circle, poly) => {
            if(!intersectingBoundingBox(circle, poly)){
                return false;
            }
            
            const res = new SAT.Response();
            if (SAT.testPolygonCircle(poly.sat, circle.sat, res)) {
                return res;
            }
            return false;
        });

        this.addCollisionMap('poly1', 'poly2', (poly1, poly2) => {
            if(!intersectingBoundingBox(poly1, poly2)){
                return false;
            }
            const res = new SAT.Response();
            if (SAT.testPolygonPolygon(poly1.sat, poly2.sat, res)) {
                return res;
            }
            return false;
        });
    }
	// outsource this later
    addCollisionMap(type1, type2, fn) {
        if(this.collisionMap[type1] === undefined){
            this.collisionMap[type1] = {};
        }
        if(this.collisionMap[type2] === undefined){
            this.collisionMap[type2] = {};
        }
        this.collisionMap[type1][type2] = fn;
        if(type1 !== type2){
            this.collisionMap[type2][type1] = flip(fn);
        }
    }
}

function intersectingBoundingBox(obj1, obj2){
    if(obj1.top.x > obj2.bottom.x || obj1.bottom.x < obj2.top.x) return false;
    if(obj1.top.y > obj2.bottom.y || obj1.top.y > obj2.bottom.y) return false;
    return true;
}

const collisions = new Collision();
function Collide(body1, body2){
    return collisions.collisionMap[body1.shape][body2.shape](body1, body2);
}

export default Collide;