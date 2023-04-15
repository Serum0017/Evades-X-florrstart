function simulate(player) {
	const delta = 1 / 60;
	let xSpeed = (input.right - input.left) * player.speed;
	let ySpeed = (input.down - input.up) * player.speed;
	// apply velocity
	player.xv += xSpeed * delta;
	player.yv += ySpeed * delta;
	player.xv *= Math.pow(player.friction, delta * 60);
	player.yv *= Math.pow(player.friction, delta * 60);
    
    // frictions coeff: {vec of amount}
    for(let key in player.frictions){
        const {x, y} = player.frictions[key];
        player.x += x;
        player.y += y;
        player.frictions[key].x *= key;
        player.frictions[key].y *= key;
    }
	// move player
	player.x += player.xv * (60 * delta);
	player.y += player.yv * (60 * delta);
	// player.x +=  (input.right - input.left) * 5;
	// constraint player
	if (player.x - player.radius < 0) {
		player.x = player.radius;
	}
	if (player.x + player.radius > map.settings.arena.width) {
		player.x = map.settings.arena.width - player.radius;
	}
	if (player.y - player.radius < 0) {
		player.y = player.radius;
	}
	if (player.y + player.radius > map.settings.arena.height) {
		player.y = map.settings.arena.height - player.radius;
	}

    // temp
    player.shape = 'circle';
    player.top = {x: player.x - player.radius/2, y: player.y - player.radius/2}
    player.bottom = {x: player.x + player.radius/2, y: player.y + player.radius/2};
    
	return player;
}

function deepCopy(obj) {
	const object = {};
	for (const key of Object.keys(obj)) {
		object[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
	}
	return object;
}

export default simulate;