function generateDefaultState(map, mapName) {
    return {
        xv: 0, x: 0,
        yv: 0, y: 0,
        r: 24.5,
        angle: 0,
        magnitude: 0,
        dev: false, god: false,
        map, mapName
    }
}

if(typeof module !== 'undefined'){
    module.exports = generateDefaultState;
} else {
    window.generateDefaultState = generateDefaultState;
}