// simple simulate function for simulating the p based on input
export default function simulatePlayer(p, map) {
	p.xv += (p.input.right - p.input.left) * p.speed;
	p.yv += (p.input.down - p.input.up) * p.speed;
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
	
    p.top = {x: p.x - p.r/2, y: p.y - p.r/2}
    p.bottom = {x: p.x + p.r/2, y: p.y + p.r/2};
	p.sat = new SAT.Circle(new SAT.Vector(p.x, p.y), p.r);// temp; will have generation later
}