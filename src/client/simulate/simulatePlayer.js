import Collide from './obstacles/collisionManager.js';

// simple simulate function for simulating the p based on input
export default function simulatePlayer(p, map) {
	if(p.dead === true){
		return;
	}

	p.last = {x: p.x, y: p.y};
	
	if(p.axisSpeedMult.angle !== 0){
		p.xv +=
			Math.cos(p.axisSpeedMult.angle) * /*xv*/(p.input.right - p.input.left) * p.speed * (p.input.shift ? (p.god ? 3 : 0.5) : 1) * p.axisSpeedMult.x +
			- Math.sin(p.axisSpeedMult.angle) * /*yv*/(p.input.down - p.input.up) * p.speed * (p.input.shift ? (p.god ? 3 : 0.5) : 1) * p.axisSpeedMult.y;
		p.yv +=
			Math.sin(p.axisSpeedMult.angle) * /*xv*/(p.input.right - p.input.left) * p.speed * (p.input.shift ? (p.god ? 3 : 0.5) : 1) * p.axisSpeedMult.x +
			Math.cos(p.axisSpeedMult.angle) * /*yv*/(p.input.down - p.input.up) * p.speed * (p.input.shift ? (p.god ? 3 : 0.5) : 1) * p.axisSpeedMult.y;
	} else {
		p.xv += (p.input.right - p.input.left) * p.speed * (p.input.shift ? (p.god ? 3 : 0.5) : 1) * p.axisSpeedMult.x;
		p.yv += (p.input.down - p.input.up) * p.speed * (p.input.shift ? (p.god ? 3 : 0.5) : 1) * p.axisSpeedMult.y;
	}

	p.xv *= p.friction;
	p.yv *= p.friction;

	// minPack optimization
	if(Math.abs(p.xv) < 0.001)p.xv = 0;
	if(Math.abs(p.yv) < 0.001)p.yv = 0;
    
    // frictions coeff: {vec of amount}
    for(let key in p.frictions){
        const {x, y} = p.frictions[key];
        p.x += x;
        p.y += y;
        p.frictions[key].x *= key;
        p.frictions[key].y *= key;
    }

	// move player
	p.x += p.xv;
	p.y += p.yv;

	// bound player against the map
	if (p.x - p.difference.x/2 < 0) {
		p.x = p.difference.x/2;
	}
	if (p.x + p.difference.x/2 > map.settings.dimensions.x) {
		p.x = map.settings.dimensions.x - p.difference.x/2;
	}
	if (p.y - p.difference.x/2 < 0) {
		p.y = p.difference.x/2;
	}
	if (p.y + p.difference.x/2 > map.settings.dimensions.y) {
		p.y = map.settings.dimensions.y - p.difference.x/2;
	}

	if(p.id === map.selfId){
		p.axisSpeedMult = {x: 1, y: 1, angle: 0};
		p.friction = 0.4;
		p.r = 24.5;

		p.body = new SAT.Circle(new SAT.Vector(p.x,p.y), p.r);
		p.shape = 'circle';
		p.difference = {x: p.r*2, y: p.r*2};

		// simulate touching effects that need to occur at the end of the frame
		for(let i = 0; i < touchingSimulateMap.length; i++){
			for(let j = 0; j < p.touching[touchingSimulateMapKeys[i]].length; j++){
				touchingSimulateMap[i][touchingSimulateMapKeys[i]](p, p.touching[touchingSimulateMapKeys[i]][j], {map, index: j});
			}
		}
	}

	// transformBody(p, {x: p.x - p.last.x, y: p.y - p.last.y, rotation: 0});

	p.pivot = {x: p.x, y: p.y};
	p.lastSimulateShape = p.shape;
	
	for(let key in p.touching){
		p.touching[key] = [];
	}
}

const touchingSimulateMap = [
	{
		platformer: (p, obstacle) => {
			if(obstacle.jumpCooldown > 0){
				return;
			}
			
			if(p.input[obstacle.jumpInput] === true && p.touching.ground.length > 0){
				obstacle.jumpCooldown = obstacle.maxJumpCooldown;
				bounce({
					x: -Math.cos(obstacle.platformerAngle) * obstacle.jumpForce,
					y: -Math.sin(obstacle.platformerAngle) * obstacle.jumpForce
				}, p, obstacle.jumpFriction);
			}
		}
	},
	{
		changeRadius: (p, obstacle) => {
			p.r *= obstacle.radiusMult;
			if(obstacle.radiusMult < 1){
				const body = p.getShape({shapeType: p.shape, shapePoints: p.shapePoints});
				const boundingBox = p.body.getBoundingBox();
				if(Collide({x: p.x, y: p.y, r: p.r, shape: p.shape, difference: {x: boundingBox.w, y: boundingBox.h}, body}, obstacle) === false){
					p.r /= obstacle.radiusMult;
				}
			}
			p.changeShape({shapeType: p.shape, shapePoints: p.shapePoints});
		}
	},
	{
		changeShape: (p, obstacle, {index}) => {
			if(index !== 0){
				return;
			}
			if(obstacle.shapeRadius !== undefined){
				p.r = p.shapeChanger.shapeRadius;
			}
			p.changeShape(obstacle);
		}
	},
]

const touchingSimulateMapKeys = touchingSimulateMap.map(obj => Object.keys(obj)[0]);

function bounce(/*amount: */{x, y}, player, friction){
    if(!player.frictions[friction]){
        // friction: amount
        player.frictions[friction] = {x: 0, y: 0};
    }
    player.frictions[friction].x += x;
    player.frictions[friction].y += y;
}