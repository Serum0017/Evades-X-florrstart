const initEffectMap = {
    lava: (obs, init) => {
        obs.collidable = init.collidable;
    },
    bounce: (obs, init) => {
        obs.bounciness = init.bounciness;
        obs.friction = Math.min(1, init.friction);
        if(isNaN(obs.friction)){
            obs.friction = 0.2;
        }
    },
    changeMap: (obs, init) => {
        obs.map = init.map ?? 'Winroom';
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