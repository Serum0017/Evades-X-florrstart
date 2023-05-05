// simple simulate function for simulating the p based on input
export default function simulatePlayer(p, map) {
	if(p.dead === true){
		return;
	}
	
	p.xv += (p.input.right - p.input.left) * p.speed * (p.input.shift ? 0.5 : 1) * !p.restrictAxis.x;
	p.yv += (p.input.down - p.input.up) * p.speed * (p.input.shift ? 0.5 : 1) * !p.restrictAxis.y;
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

	// bound player against the map
	if (p.x - p.r < 0) {
		p.x = p.r;
	}
	if (p.x + p.r > map.settings.dimensions.x) {
		p.x = map.settings.dimensions.x - p.r;
	}
	if (p.y - p.r < 0) {
		p.y = p.r;
	}
	if (p.y + p.r > map.settings.dimensions.y) {
		p.y = map.settings.dimensions.y - p.r;
	}
	
	p.difference = {x: p.r*2, y: p.r*2};
	p.body = new SAT.Circle(new SAT.Vector(p.x, p.y), p.r);// temp; will have generation later
	
	p.restrictAxis = {x: false, y: false};

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

	let jump = false;
	// TODO: consider if we want it to restrict based on angle rater than input direction
	if(obstacle.jumpInput === 'undecided'){
		const relativeAngle = (obstacle.platformerAngle % (Math.PI*2)) * 180/Math.PI;
		if(relativeAngle > -45 && relativeAngle <= 45){
			if(p.input.left === true){
				jump = true;
			}
			p.restrictAxis.x = true;
		} else if (relativeAngle > 45 && relativeAngle <= 135){
			if(p.input.up === true){
				jump = true;
			}
			p.restrictAxis.y = true;
		} else if (relativeAngle > 135 && relativeAngle <= 225){
			if(p.input.right === true){
				jump = true;
			}
			p.restrictAxis.x = true;
		} else if (relativeAngle > 225 && relativeAngle <= 315){
			if(p.input.down === true){
				jump = true;
			}
			p.restrictAxis.y = true;
		}
	} else if(p.input[obstacle.jumpInput] === true){
		jump = true;
	}

	if(jump === true){
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