//OldHub todo: ✅NormalObstacle, ✅BouncyObstacle, ✅CircularNormalObstacle, ✅CircularBouncyObstacle, ✅Lava, ✅RotatingLava, ✅SpeedObstacle, ✅GravObstacle, ✅Tp, ✅MovingObstacle,

class NormalObstacle {
	constructor(x, y, w, h, canJump=true, angle=0) {
        if (angle % 360 !== 0) {
			return new RotatingNormal(x, y, w, h, 0, angle);
		}
        //type: 'square-normal-normal', x: 250, y: 150, w: 50, h: 50,
		return {
            type: 'square-normal-normal',
            x:x+w/2,y:y+h/2,w,h/*,isGround: canJump*/
        }
	}
}

class Safe {
	constructor(x, y, w, h) {
		return {
            type: 'square-normal-safe',
            x:x+w/2,y:y+h/2,w,h
        }
	}
}

class MovingSafe {
	constructor(w, h, points = [[50, 50]], speed = 30, currentPoint=0, alongWith = false){
        return {
            type: 'square-move-safe',
            x: points[currentPoint][0]+w/2,y: points[currentPoint][1]+h/2,w,h,
            speed:speed/77.5,currentPoint,
            path: points.map(p => {return {x: p[0]+w/2, y: p[1]+h/2}})
        }
    }
}

class RotatingSafe {
	constructor(x, y, w, h, spd, angle=0, pivotX, pivotY, distToPivot) {
        let pivot = {x: w/2, y: h/2};
        // if(pivotX !== undefined && pivotY !== undefined){
        //     pivot = {x: pivotX-x+w/2, y: pivotY-y+h/2}
        /*} else*/ if(distToPivot !== undefined){
            pivot = {x: w/2-distToPivot, y: h/2};
            x += distToPivot;
        }
        return {
            type: 'square-rotate-safe',
            x:x,y:y,w,h,rotateSpeed: spd/77.5,rotation: angle*Math.PI/180, pivot
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
        let pivot = {x: w/2, y: h/2};
        // if(pivotX !== undefined && pivotY !== undefined){
        //     pivot = {x: pivotX-x+w/2, y: pivotY-y+h/2}
        /*} else*/ if(distToPivot !== undefined){
            pivot = {x: w/2-distToPivot, y: h/2};
            x += distToPivot;
        }
        return {
            type: 'square-rotate-lava',
            x:x,y:y,w,h,rotateSpeed: spd/77.5,rotation: angle*Math.PI/180, pivot, solid: canCollide
        }
	}
}

class Winpad {
    constructor(x,y,w,h){
        return {
            type: 'square-normal-changeMap', map: 'Winroom',
            x:x+w/2,y:y+h/2,w,h
        }
    }
}

class RotatingNormal{
    constructor(x, y, w, h, spd, angle=0, pivotX, pivotY, distToPivot=0){
        let pivot = {x: w/2, y: h/2};
        // if(pivotX !== undefined && pivotY !== undefined){
        //     pivot = {x: pivotX-x+w/2, y: pivotY-y+h/2}
        /*} else*/ if(distToPivot !== undefined){
            pivot = {x: w/2-distToPivot, y: h/2};
            x += distToPivot;
        }
        return {
            type: 'square-rotate-normal',
            x:x,y:y,w,h,rotateSpeed: spd/77.5,rotation: angle*Math.PI/180, pivot
        }
    }
}

class BouncyObstacle {
	constructor(x, y, w, h, effect=30) {
        //{type: 'square-rotate-bounce', w: 50, h: 50, x: 100, y: 0, rotation: 0, rotateSpeed: -1, pivot: {x: 150, y: 150}},
        return {
            type: 'square-normal-bounce',
            x:x+w/2,y:y+h/2,w,h,bounciness: effect*0.6, friction: 0.4
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
            x,y,r,bounciness: effect*0.6, friction: 0.4
        }
	}
}

class CircularLavaObstacle {
	constructor(x, y, r) {
		return {
            type: 'circle-normal-lava',
            x,y,r
        }
	}
}

class CircularTpObstacle {
	constructor(x, y, r,tpx,tpy) {
		return {
            type: 'circle-normal-tp',
            x,y,r,tp: {x:tpx,y:tpy},
        }
	}
}

class SpeedObstacle {
    constructor(x, y, w, h, speedInc = 1.5){
        return {
            type: 'square-normal-changeSpeed',
            x:x+w/2,y:y+h/2,w,h,speedMult: speedInc
        }
    }
}

class SizePlayer {
    constructor(x, y, w, h, size){
        return {
            type: 'square-normal-changeRadius',
            x:x+w/2,y:y+h/2,w,h,radiusMult: size/24.5
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
            conveyorForce: force/5050,
            conveyorAngle: Math.atan2(this.dir.y,this.dir.x)*180/Math.PI,
            conveyorFriction: 0.86,
        }
    }
}

class Tp {
    constructor(x, y, w, h, tpx, tpy, bgColor, tileColor, changeColor=true){
        let a = /*[*/{
            type: 'square-normal-tp',
            x:x+w/2,y:y+h/2,w,h,tp: {x: tpx, y: tpy},
        }/*]*/
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
            speed:speed/77.5,currentPoint,
            path: points.map(p => {return {x: p[0]+w/2, y: p[1]+h/2}})
        }
    }
}

class MovingLavaObstacle {
    constructor(w, h, points = [[50, 50]], speed = 30, currentPoint=0, collidable = false){
        return {
            type: 'square-move-lava',
            x: points[currentPoint][0]+w/2,y: points[currentPoint][1]+h/2,w,h,
            speed:speed/77.5,currentPoint,
            path: points.map(p => {return {x: p[0]+w/2, y: p[1]+h/2}}),
            solid: collidable
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

class CircularCoin {
    constructor(x,y,r){
        return {
            x,y,r,type:'circle-normal-coin'
        }
    }
}

class CoinDoor {
    constructor(x,y,w,h,coins){
        return {
            x:x+w/2,y:y+h/2,w,h,type:"square-normal-coindoor",coins
        }
    }
}

class BreakableObstacle {
    constructor(x, y, w, h, strength, time, regenTime = 10){
        // obs.strength = toNumber(init.maxStrength, 5);
        // obs.maxStrength = toNumber(init.maxStrength, 5);
        // obs.regenTime = toNumber(init.regenTime, 1E99);
        // obs.lastBrokeTime = -1E99;
        // obs.healSpeed = toNumber(init.healSpeed, 1E99);

        //maxStrength: 100, regenTime: 100, healSpeed: 10
        return {
            type: 'square-normal-breakable',
            x: x+w/2, y: y+h/2,w,h, maxStrength: strength/2,regenTime:regenTime, healSpeed: 1
        }
    }
}

class TransObstacle {
    constructor(x, y, w, h){
        return [];//new NormalObstacle(x, y, w, h);
    }
}

class PlatformerGrav {
	constructor(x, y, w, h, dir, jumpHeight, force = 500, maxForce, variableJumpHeight = false, friction = 0.8) {
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
            // obs.platformerForce = init.platformerForce ?? 1;
            // obs.platformerAngle = init.platformerAngle ?? 90;
            // obs.platformerAngle *= Math.PI/180;
            // obs.platformerAngleRotateSpeed = init.platformerAngleRotateSpeed ?? 0;
            // obs.platformerAngleRotateSpeed *= Math.PI/180;
            // obs.platformerFriction = init.platformerFriction ?? 0.875;
            // obs.maxJumps = init.maxJumps ?? 1;// TODO: IMPLEMENT JUMPS
            // obs.maxJumpCooldown = init.maxJumpCooldown ?? 30;// in ticks
            // obs.jumpCooldown = obs.initJumpCooldown ?? obs.maxJumpCooldown;
            // obs.jumpForce = init.jumpForce ?? 20;
            // obs.jumpFriction = init.jumpFriction ?? 0.95;
            type: 'square-normal-platformer',
            x:x+w/2,y:y+h/2,w,h,
            platformerForce: force/1050,
            platformerAngle: Math.atan2(this.dir.y,this.dir.x)*180/Math.PI,maxJumps:1,
            jumpForce: jumpHeight/8,
            jumpFriction: 0.92,
            platformerFriction: 0.4,
        }
    }
}

class RestrictAxis {
	constructor(x, y, w, h, rx, ry) {
        return {
            type: 'square-normal-restrictAxis',
            x: x+w/2,y:y+h/2,w,h,
            axisSpeedMults: {x: rx ? 0 : 1, y: ry ? 0 : 1}
        }
    }
}

class ColorChange {
	constructor(x, y, w, h, bgColor, tileColor) {
        return {
            type: 'square-normal-changeColor',
            x:x+w/2, y:y+h/2, w,h,
            backgroundColor: tileColor, tileColor: bgColor
        }
    }
}

// class Portal {
//     constructor(x, y, size, name, acronym, difficulty, difficultyNumber, musicPath) {
//         // obs.map = toString(init.map, 'Winroom');
//         // obs.acronym = '';
//         // for(let i = 0; i < obs.map.length-1; i++) {
//         //     if(obs.map[i] === ' '){
//         //         obs.acronym += obs.map[i+1];
//         //     } else if(i === 0){
//         //         obs.acronym += obs.map[0];
//         //     }
//         // }
//         // if(obs.map === 'Hub'){obs.acronym = 'Hub';}
//         // const mapData = advanced.game.mapData[init.map ?? 'Winroom'];
//         // for(let i = 0; i < mapData.init.length; i++){
//         //     if(mapData.init[i].type === 'settings'){
//         //         obs.difficulty = ['Peaceful','Moderate','Difficult','Hardcore','Exhausting','Agonizing','Terrorizing','Cataclysmic','Grass','Undefined'].includes(mapData.init[i].difficulty) ? mapData.init[i].difficulty : 'Peaceful';
//         //         obs.difficultyNumber = Math.max(0,Math.min(1,toNumber(mapData.init[i].difficultyNumber)));
//         //         return;
//         //     }
//         // }
//         // obs.difficulty = 'Peaceful';
//         return [];
//         // return {
//         //     x: x+w/2,y:y+h/2,w:size,h:size,acronym: name,difficultyNumber
//         // }
//     }
// }

class RoundedCorners {
    constructor(x,y,w,h,roundRadius){
        this.x = x;this.y=y;this.w=w;this.h=h;
        this.circles = [
            {x: this.x+roundRadius, y: this.y+roundRadius, radius: roundRadius},
            {x: this.x+this.w-roundRadius, y: this.y+roundRadius, radius: roundRadius},
            {x: this.x+roundRadius, y: this.y+this.h-roundRadius, radius: roundRadius},
            {x: this.x+this.w-roundRadius, y: this.y+this.h-roundRadius, radius: roundRadius},
        ];
        this.rects = [
            {x: this.x+roundRadius, y: this.y, w: this.w-roundRadius*2, h: this.h},
            {x: this.x, y: this.y+roundRadius, w: this.w, h: this.h-roundRadius*2}
        ]
        const a = [];
        for(let i = 0; i < this.circles.length; i++){
            const data = this.circles[i];
            a.push({
                type: 'circle-normal-normal',
                x: data.x,y:data.y,r:data.radius
            })
        }
        for(let i = 0; i < this.rects.length; i++){
            const data = this.rects[i];
            a.push({
                type: 'square-normal-normal',
                x: data.x+data.w/2,y:data.y+data.h/2,w:data.w,h:data.h
            })
        }
        return a;
    }
}

class RoundedLava {
    constructor(x,y,w,h,roundRadius){
        this.x = x;this.y=y;this.w=w;this.h=h;
        this.circles = [
            {x: this.x+roundRadius, y: this.y+roundRadius, radius: roundRadius},
            {x: this.x+this.w-roundRadius, y: this.y+roundRadius, radius: roundRadius},
            {x: this.x+roundRadius, y: this.y+this.h-roundRadius, radius: roundRadius},
            {x: this.x+this.w-roundRadius, y: this.y+this.h-roundRadius, radius: roundRadius},
        ];
        this.rects = [
            {x: this.x+roundRadius, y: this.y, w: this.w-roundRadius*2, h: this.h},
            {x: this.x, y: this.y+roundRadius, w: this.w, h: this.h-roundRadius*2}
        ]
        const a = [];
        for(let i = 0; i < this.circles.length; i++){
            const data = this.circles[i];
            a.push({
                type: 'circle-normal-lava',
                x: data.x,y:data.y,r:data.radius
            })
        }
        for(let i = 0; i < this.rects.length; i++){
            const data = this.rects[i];
            a.push({
                type: 'square-normal-lava',
                x: data.x+data.w/2,y:data.y+data.h/2,w:data.w,h:data.h
            })
        }
        return a;
    }
}

class Polygon {
    constructor(points = [], type = 'poly-normal', tpx = null, tpy = null){
        if(type === 'poly-tp'){
            return {
                type: 'poly-normal-tp', tp: {x: tpx, y: tpy}, x: 0, y: 0,
                points//: points.map(p => {return {x: p[0], y: p[1]}})
            }
        } else if(type == 'poly-lava'){
            return {
                type: 'poly-normal-lava', x: 0, y: 0,
                points//: points.map(p => {return {x: p[0], y: p[1]}})
            }
        } else {//points: [[0, 0], [100, 0], [50, 75]],
            return {
                type: 'poly-normal-normal', x: 0, y: 0,
                points//: points.map(p => {return {x: p[0], y: p[1]}})
            }
        }
    }
}

const { registerFont, createCanvas } = require('canvas');// TODO: load inter font manually because device might not hvae installed
registerFont('./src/server/init/inter.ttf', { family: 'Inter' });
const canvas = createCanvas(1,1);
const ctx = canvas.getContext('2d');

class Text {
	constructor(x, y, text, story, size, angle) {// text: 'Evades X', fontSize: 60
        ctx.font = `${size}px Inter`;
        const textMeasurements = ctx.measureText(text);
        const w = textMeasurements.width;
        const h = textMeasurements.actualBoundingBoxAscent;
        if(story){return [];}
		return {
            type: 'text-normal-coin',color: 'white',
            x:x-w/2,y:y-h/2,text, fontSize: size
        }
	}
}


class SnapGrid {
	constructor(x, y, w, h, snapX, snapY, snapDistance, snapWait) {
		return {
            type: 'square-normal-snapGrid',
            x:x+w/2,y:y+h/2,w,h,
            toSnap: {x: snapX, y: snapY},
            snapDistance: {x: snapDistance, y: snapDistance},snapCooldown: snapWait*60,
        }
	}
}

class Oval {
	constructor(x, y, rw, rh) {
		return {
            type: 'oval-normal-normal',
            x,y,rw,rh
        }
	}
}

class LavaOval {
	constructor(x, y, rw, rh) {
		return {
            type: 'oval-normal-lava',
            x:x+rw/2,y:y+rh/2,rw:rw/2,rh:rh/2,solid: true
        }
	}
}

class Spawner {
    constructor(x,y,w,h,spawnData){
        const enemies = [];
        for(let i = 0; i < spawnData.amount; i++){
            switch(spawnData.type){
                case 'normalEnemy':
                    enemies.push({
                        type: 'circle-enemy-lava',
                        solid: false,
                        bound: {x,y,w,h},
                        enemyType: 'normal',
                        speed: spawnData.speed/60,
                        r: spawnData.radius
                    })
                    break;
                case 'square':
                    enemies.push({
                        type: 'square-enemy-lava',
                        solid: false,
                        bound: {x,y,w,h},
                        enemyType: 'normal',
                        speed: spawnData.speed/60,
                        w: spawnData.size,
                        h: spawnData.size
                    });
                    break;
                default: 
                    break;
            }
        }
        return enemies;
    }
}

module.exports = {
    NormalObstacle, BouncyObstacle, CircularNormalObstacle, CircularBouncyObstacle, Lava, RotatingNormal, RotatingLava, SpeedObstacle, GravObstacle, Tp, MovingObstacle, Coin, BreakableObstacle, TransObstacle, Polygon,
    PlatformerGrav, RestrictAxis, CircularCoin, CoinDoor, ColorChange, MovingLavaObstacle, CircularLavaObstacle, RoundedCorners, RoundedLava, SnapGrid, Winpad, CircularTpObstacle, Spawner, Oval, LavaOval, Safe, /*Portal*/
    SizePlayer, MovingSafe, RotatingSafe, Text
}