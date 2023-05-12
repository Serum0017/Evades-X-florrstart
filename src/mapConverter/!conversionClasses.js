//OldHub todo: ✅NormalObstacle, ✅BouncyObstacle, ✅CircularNormalObstacle, ✅CircularBouncyObstacle, ✅Lava, ✅RotatingLava, ✅SpeedObstacle, ✅GravObstacle, ✅Tp, ✅MovingObstacle,

class NormalObstacle {
	constructor(x, y, w, h, canJump=true, angle=0) {
        if (angle % 360 !== 0) {
			return new RotatingNormal(x, y, w, h, 0, angle);
		}
        //type: 'square-normal-normal', x: 250, y: 150, w: 50, h: 50,
		return {
            type: 'square-normal-normal',
            x:x+w/2,y:y+h/2,w,h,isGround: canJump
        }
	}
}

class Lava extends NormalObstacle {
	constructor(x, y, w, h, canCollide = true, angle=0) {
        // {type: 'square-normal-lava', x: 400, y: 150, w: 50, h: 50, bounciness: 1, friction: 0.98 },
		if (angle % 360 !== 0) {
			return new RotatingLava(x, y, w, h, 0, angle, undefined, undefined, 0, canCollide);
		}
        return {
            type: 'square-normal-lava',x:x+w/2,y:y+h/2,w,h,solid: canCollide
        }
	}
}

class RotatingLava {
	constructor(x, y, w, h, spd, angle=0, pivotX, pivotY, distToPivot, canCollide) {
		// rotation: 0, pivot: {x: 200, y: 200}, rotateSpeed: .5,
        let pivot = {x: w/2, y: h/2};
        // if(pivotX !== undefined && pivotY !== undefined){
        //     pivot = {x: pivotX-x+w/2, y: pivotY-y+h/2}
        // } else if(distToPivot !== undefined){
        //     pivot = {x: w/2+distToPivot, y: h/2};
        // }
        return {
            type: 'square-rotate-lava',
            x:x+w/2,y:y+h/2,w,h,rotateSpeed: spd/eq400,rotation: angle, pivot, solid: canCollide
        }
	}
}

class RotatingNormal{
    constructor(x, y, w, h, spd, angle=0, pivotX, pivotY, distToPivot=0, canCollide=true){
        let pivot = {x: w/2, y: h/2};
        // if(pivotX !== undefined && pivotY !== undefined){
        //     pivot = {x: pivotX-x+w/2, y: pivotY-y+h/2}
        // } else if(distToPivot !== undefined){
        //     pivot = {x: w/2+distToPivot, y: h/2};
        // }
        return {
            type: 'square-rotate-normal',
            x:x+w/2,y:y+h/2,w,h,rotateSpeed: spd/1000,rotation: angle, pivot, solid: canCollide
        }
    }
}

class BouncyObstacle {
	constructor(x, y, w, h, effect=30) {
        //{type: 'square-rotate-bounce', w: 50, h: 50, x: 100, y: 0, rotation: 0, rotateSpeed: -1, pivot: {x: 150, y: 150}},
        return {
            type: 'square-normal-bounce',
            x:x+w/2,y:y+h/2,w,h,bounciness: effect, friction: 0.4
        }
	}
}

class CircularNormalObstacle {
	constructor(x, y, r) {
		return {
            type: 'circle-normal-normal',
            x,y,r
        }
	}
}

class CircularBouncyObstacle {
	constructor(x, y, r, effect=30) {
		return {
            type: 'circle-normal-bounce',
            x,y,r,bounciness: effect, friction: 0.4
        }
	}
}

class SpeedObstacle {
    constructor(x, y, w, h, speedInc = 1.5){
        return {
            type: 'circle-normal-changeSpeed',
            x:x+w/2,y:y+h/2,w,h,speedMult: speedInc
        }
    }
}

class GravObstacle {
    constructor(x, y, w, h, dir, force = 500){
        this.dir = { x: 0, y: 0 };
		let direction = dir;
		if (dir == null) {
			direction = 'up';
		}
		this.direction = direction;
		if (direction === 'down') {
			this.dir.y = force;
		}
		if (direction === 'up') {
			this.dir.y = -force;
		}
		if (direction === 'left') {
			this.dir.x = -force;
		}
		if (direction === 'right') {
			this.dir.x = force;
		}
        return {
            // obs.conveyorForce = init.conveyorForce ?? 0.3;
            // obs.conveyorAngle = init.conveyorAngle ?? 0;
            // obs.conveyorAngle *= Math.PI/180;
            // obs.conveyorAngleRotateSpeed = init.conveyorAngleRotateSpeed ?? 0;
            // obs.conveyorAngleRotateSpeed *= Math.PI/180;
            // obs.conveyorFriction = init.conveyorFriction ?? 0.8;
            type: 'square-normal-conveyor',
            x:x+w/2,y:y+h/2,w,h,
            conveyorForce: force/5000,
            conveyorAngle: Math.atan2(this.dir.y,this.dir.x)*180/Math.PI
        }
    }
}

class Tp {
    constructor(x, y, w, h, tpx, tpy, bgColor, tileColor, changeColor=true){
        let a = [{
            type: 'square-normal-tp',
            x:x+w/2,y:y+h/2,w,h,tp: {x: tpx, y: tpy},
        }]
        // if(changeColor === true){
        //     // usually false
        //     a.push({
        //         type: 'square-normal-changeColor',
        //         x: tpx, y: tpy, w: 50, h: 50,
        //         colorsToChange: {background: bgColor, tile: tileColor}
        //     })
        //     // obs.colorsToChange = {
        //     //     background: toHex(init.backgroundColor,'#000000'),
        //     //     tile: toHex(init.tileColor,'#000000'),
        //     //     safe: toHex(init.safeColor,'#000000')
        //     // };
        // }
        return a;
    }
}

class MovingObstacle {
    constructor(w, h, points = [[50, 50]], speed = 30, currentPoint=0, alongWith = false){
        return {
            type: 'square-move-normal',
            x: points[currentPoint][0]+w/2,y: points[currentPoint][1]+h/2,w,h,
            speed:speed/100,currentPoint,
            path: points.map(p => {return {x: p[0]+w/2, y: p[1]+h/2}})
        }
    }
}

class Coin {
    constructor(x,y,w,h){
        return {
            x:x+w/2,y:y+h/2,w,h,type:'square-normal-coin'
        }
    }
}

module.exports = {
    NormalObstacle, BouncyObstacle, CircularNormalObstacle, CircularBouncyObstacle, Lava, RotatingLava, SpeedObstacle, GravObstacle, Tp, MovingObstacle, Coin
}