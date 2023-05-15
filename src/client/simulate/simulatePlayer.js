import transformBody from "./obstacles/transformBody.js";

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

	if(p.touching.changeShape.length > 0){
		if(p.touching.changeShape[0].shapeRadius !== undefined){
			p.r = p.shapeChanger.shapeRadius;
		}
		p.changeShape(p.touching.changeShape[0]);
	} else {
		p.body = new SAT.Circle(new SAT.Vector(p.x,p.y), p.r);
		p.shape = 'circle';
		p.difference = {x: p.r*2, y: p.r*2};
	}
	// transformBody(p, {x: p.x - p.last.x, y: p.y - p.last.y, rotation: 0});

	p.pivot = {x: p.x, y: p.y};// TODO: remove?

	// reset changable parameters
	p.axisSpeedMult = {x: 1, y: 1, angle: 0};
	p.friction = 0.4;
	p.r = 24.5;

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

	// TODO: make sure other players arent sending/ simulating with this (maybe isolate to a diff function?)
	if(p.touching.ground.length > 0){
		for(let i = 0; i < p.touching.platformer.length; i++){
			simulatePlatformer(p, p.touching.platformer[i]);
		}
	}
	
	for(let key in p.touching){
		p.touching[key] = [];
	}
}

function simulatePlatformer(p, obstacle){
	if(obstacle.jumpCooldown > 0){
		return;
	}
	
	if(p.input[obstacle.jumpInput] === true){
		obstacle.jumpCooldown = obstacle.maxJumpCooldown;
		bounce({
			x: -Math.cos(obstacle.platformerAngle) * obstacle.jumpForce,
			y: -Math.sin(obstacle.platformerAngle) * obstacle.jumpForce
		}, p, obstacle.jumpFriction);
	}
}

function bounce(/*amount: */{x, y}, player, friction){
    if(!player.frictions[friction]){
        // friction: amount
        player.frictions[friction] = {x: 0, y: 0};
    }
    player.frictions[friction].x += x;
    player.frictions[friction].y += y;
}