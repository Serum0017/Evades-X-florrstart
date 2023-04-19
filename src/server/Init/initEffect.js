const initEffectMap = {
    lava: (obs, init) => {
        obs.solid = toBoolean(init.solid, true);
    },
    bounce: (obs, init) => {
        obs.bounciness = toNumber(init.bounciness, 10);
        obs.friction = Math.min(1, toNumber(init.friction, 0.2));
    },
    // TODO: make sure all of these are safe for any input (same for other files)
    changeMap: (obs, init) => {
        obs.map = init.map ?? 'Winroom';
    },
    changeColor: (obs, init) => {
        obs.colorsToChange = {background: init.backgroundColor, tile: init.tileColor, safe: init.safeColor};
    },
    breakable: (obs, init) => {
        // all timings are in frames
        obs.strength = init.maxStrength;
        obs.maxStrength = init.maxStrength;
        obs.regenTime = init.regenTime??1E99;
        obs.lastBrokeTime = -1E99;
        obs.healSpeed = init.healSpeed??1E99;
    },
    tp: (obs, init) => {
        obs.tp = {x: init.tp.x??0, y: init.tp.y??0};
    },
    button: (obs, init) => {
        obs.active = init.active;
        obs.buttonId = init.buttonId;
    }
};

function toBoolean(key, defaultValue=false){
    return (key !== false && key !== true) ? defaultValue : key;
}

function toNumber(num, defaultNumber=0){
    return Number.isFinite(num) ? num : defaultNumber;
}

module.exports = function initEffect(params) {
    let init = {};
    if(params.effect === undefined){
        console.error("Obstacle effects undefined! " + JSON.stringify(params)); return;
    }
    if(initEffectMap[params.effect] !== undefined){
        initEffectMap[params.effect](init, params);
    }
    return init;
}