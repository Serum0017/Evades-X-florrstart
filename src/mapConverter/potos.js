const parseMap = require('../parser.js');
const Spawner = require('../spawner.js');

const { Winpad, SizePlayer, ColorChange, MovingSafe } = require('../obstacle.js');

// Made by Serum
// I don't really think this is gonna turn out to be a legit map in the game
// Im making this more to be a test of what can be done in eX if things like
// the spawner enemy, enemyobstacles, etc. is added to editor. This is just
// the tip of the iceberg
// name inspired by trials of death.

let text = `{"arena":{"width":3000,"height":3000},"enemy":[],"safes":[],"spawns":[],"playerSpawn":{"x":2050,"y":25},"name":"PoTOS","longName":"Planet of Trials of Survival","tileColor":"#383838","bgColor":"#0d0d0d","safeColor":"#8c8c8c","difficulty":"Relentless","renderRaycasting":false,"texts":[{"x":500,"y":500,"w":25,"h":25,"size":22,"text":"!","angle":0,"story":false},{"x":500,"y":-50,"w":25,"h":25,"size":24,"text":"Refresh invincibility","angle":0,"story":false},{"x":500,"y":-25,"w":25,"h":25,"size":24,"text":"at corners!","angle":0,"story":false}],"obstacles":[{"type":"invpu","x":2025,"y":0,"w":50,"h":50,"amount":1},{"type":"circle-normal","x":500,"y":500,"r":62},{"type":"raxis","x":900,"y":0,"w":100,"h":100,"rx":true,"ry":true},{"type":"grav","x":950,"y":0,"w":50,"h":100,"dir":"down","force":3000},{"type":"raxis","x":0,"y":0,"w":100,"h":100,"rx":true,"ry":true},{"type":"grav","x":0,"y":50,"w":50,"h":50,"dir":"up","force":3000},{"type":"grav","x":0,"y":0,"w":100,"h":50,"dir":"right","force":3000},{"type":"button","x":0,"y":0,"w":50,"h":50,"id":1},{"type":"raxis","x":900,"y":900,"w":100,"h":100,"rx":true,"ry":true},{"type":"raxis","x":0,"y":900,"w":100,"h":100,"rx":true,"ry":true},{"type":"grav","x":900,"y":0,"w":50,"h":50,"dir":"right","force":3000},{"type":"grav","x":950,"y":900,"w":50,"h":50,"dir":"down","force":3000},{"type":"grav","x":900,"y":950,"w":100,"h":50,"dir":"left","force":3000},{"type":"grav","x":50,"y":950,"w":50,"h":50,"dir":"left","force":3000},{"type":"grav","x":1.5308084989341915e-15,"y":900,"w":50,"h":100,"dir":"up","force":3000},{"type":"invpu","x":0,"y":0,"w":50,"h":50,"amount":1},{"type":"button","x":950,"y":0,"w":50,"h":50,"id":2},{"type":"button","x":950,"y":950,"w":50,"h":50,"id":3},{"type":"button","x":0,"y":950,"w":50,"h":50,"id":4},{"type":"invpu","x":950,"y":0,"w":50,"h":50,"amount":1},{"type":"invpu","x":950,"y":950,"w":50,"h":50,"amount":1},{"type":"invpu","x":0,"y":950,"w":50,"h":50,"amount":1},{"type":"door","x":0,"y":50,"w":50,"h":50,"id":1,"active":false},{"type":"door","x":900,"y":0,"w":50,"h":50,"id":2,"active":false},{"type":"door","x":950,"y":900,"w":50,"h":50,"id":3,"active":false},{"type":"door","x":50,"y":950,"w":50,"h":50,"id":4,"active":false},{"type":"normal","x":1000,"y":0,"w":1000,"h":2000,"canJump":true,"angle":0},{"type":"normal","x":0,"y":1000,"w":1000,"h":1000,"canJump":true,"angle":0},{"type":"normal","x":1000,"y":2000,"w":1000,"h":1000,"canJump":true,"angle":0},{"type":"normal","x":2000,"y":1000,"w":1000,"h":1000,"canJump":true,"angle":0},{"type":"check","x":2000,"y":0,"w":250,"h":50},{"type":"portal","x":2950,"y":950,"w":50,"h":50,"size":50,"name":"Hub","acronym":"Hub","difficulty":"Peaceful","difficultyNumber":"0","musicPath":null},{"type":"tp","x":2025,"y":0,"w":50,"h":50,"tpx":500,"tpy":50,"changeColor":false,"bgColor":"#0d0d0d","tileColor":"#383838"},{"type":"normal","x":2000,"y":50,"w":950,"h":950,"canJump":true,"angle":0},{"type":"normal","x":2875,"y":25,"w":175,"h":925,"canJump":true,"angle":0},{"type":"tp","x":2100,"y":0,"w":50,"h":50,"tpx":2975,"tpy":975,"changeColor":false,"bgColor":"#0d0d0d","tileColor":"#383838"},{"type":"trans","x":1975,"y":-25,"w":300,"h":100,"collide":false,"opaq":1},{"type":"roundedcorners","x":50,"y":50,"w":100,"h":100,"roundRadius":25},{"type":"roundedcorners","x":850,"y":50,"w":100,"h":100,"roundRadius":25},{"type":"roundedcorners","x":850,"y":850,"w":100,"h":100,"roundRadius":25},{"type":"roundedcorners","x":50,"y":850,"w":100,"h":100,"roundRadius":25},{"type":"normal","x":2250,"y":-50,"w":750,"h":125,"canJump":true,"angle":0}]}`;

const { Custom }= require("./!conversionClasses.js");

let map = parseMap(text);
let { obstacles, spawns } = map;

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'normal',
        radius: 24,
        speed: 120,
        life: 12,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    },{
        type: 'normal',
        radius: 30,
        speed: 145,
        life: 12,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    },{
        type: 'normal',
        radius: 36,
        speed: 172,
        life: 12,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'normal',
        radius: 24,
        speed: 120,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    },{
        type: 'normal',
        radius: 30,
        speed: 145,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    },{
        type: 'normal',
        radius: 36,
        speed: 172,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [12,1E99],
    spawnParams: [{
        type: 'enemyobstacle',
        radius: 0,
        speed: 0,
        obstacle: new ColorChange(0, 0, 995, 995, '#0A1224', '#14467B'),
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500,
        y: 500,
        life: 15,
    }],
}))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [12,0,0,0,0,0,0,0,1E99],
//     spawnParams: [{
//         type: 'slower',
//         radius: 84, 
//         speedMult: 0.55,
//         life: 8.5,
//         speed: 180,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//         x: 500, y: 500,
//     }],
// }))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'e2dasher',
        radius: 35,//27, 
        dashOffset: 0,
        randomDashOffset: 0.2,
        friction: 0.985,
        firstCooldown: 0.75,
        firstSpeed: 6,
        secondCooldown: 2,
        secondSpeed: 52,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
        life: 8,
    },{
        type: 'e2dasher',
        radius: 27, 
        dashOffset: 0,
        randomDashOffset: 0.2,
        friction: 0.99,
        firstCooldown: 0.75,
        firstSpeed: 6,
        secondCooldown: 2,
        secondSpeed: 52,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
        life: 8,
    },{
        type: 'e2dasher',
        radius: 42, 
        dashOffset: 0,
        randomDashOffset: 0.2,
        friction: 0.972,
        firstCooldown: 0.75,
        firstSpeed: 6,
        secondCooldown: 2,
        secondSpeed: 52,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
        life: 8,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'normal',
        radius: 16,
        speed: 240,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    },{
        type: 'normal',
        radius: 19,
        speed: 255,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    },{
        type: 'normal',
        radius: 23,
        speed: 285,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'jump',
        gravity: 50, 
        groundedTime: 0.28, 
        jumpHeight: 50,
        radius: 30,
        speed: 262,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [28,1E99],
    spawnParams: [{
        type: 'enemyobstacle',
        radius: 0,
        speed: 0,
        obstacle: new ColorChange(0, 0, 995, 995, '#200404', '#473939'),
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500,
        y: 500,
        life: 35,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'normal',
        radius: 12, 
        speed: 156,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'normal',
        radius: 12, 
        speed: 156,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 100, y: 100,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'normal',
        radius: 12, 
        speed: 156,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 100, y: 900,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'normal',
        radius: 12, 
        speed: 156,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 900, y: 100,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'normal',
        radius: 12, 
        speed: 156,
        life: 8,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 900, y: 900,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [28,1E99],
    spawnParams: [{
        type: 'enemyobstacle',
        radius: 0,
        speed: 0,
        obstacle: new SizePlayer(0, 0, 995, 995, 10),
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500,
        y: 500,
        life: 16,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [36,0,0,0,1E99],
    spawnParams: [{
        type: 'bomb',
        radius: 28, 
        speed: 382,
        life: 8,
        bombNumber: 4, bombSpeed: 382, bombRadius: 28, bombLife: 8, bombDecay: 1,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [44,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'wavy',
        radius: 34,
        speed: 216,
        life: 20,
        x: 500, y: 500,
        maxTimer: 0.45,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    },{
        type: 'wavy',
        radius: 28,
        speed: 306,
        life: 20,
        x: 500, y: 500,
        maxTimer: 0.24,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    },{
        type: 'wavy',
        radius: 40,
        speed: 142,
        life: 20,
        x: 500, y: 500,
        maxTimer: 0.56,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [44,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'normal',
        radius: 33,
        speed: 216,
        life: 20,
        x: 500, y: 500,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    },{
        type: 'normal',
        radius: 30,
        speed: 250,
        life: 20,
        x: 500, y: 500,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    },{
        type: 'normal',
        radius: 36,
        speed: 192,
        life: 20,
        x: 500, y: 500,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [54,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1E99],
    spawnParams: [{
        type: 'selfcollide',
        radius: 8,
        speed: 216,
        life: 9.5,
        x: 500, y: 500,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    },{
        type: 'selfcollide',
        radius: 6,
        speed: 306,
        life: 9.5,
        x: 500, y: 500,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    },{
        type: 'selfcollide',
        radius: 12,
        speed: 142,
        life: 9.5,
        x: 500, y: 500,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    }],
}))

// flower, enemycollide spawners, spinning normals, and toxic + winpad

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [64,1E99],
    spawnParams: [{
        type: 'enemyobstacle',
        radius: 0,
        speed: 0,
        obstacle: new ColorChange(0, 0, 995, 995, '#4d3c00', '#7e7120'),
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500,
        y: 500,
        life: 100,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [64,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,1E99],
    spawnParams: [{
        type: 'flower',
        radius: 12,
        speed: 212,
        life: 8,
        x: 500, y: 500,
        rotateSpeed: -5.6, clonesNumber: 5, clonesRadius: 9, clonesDistance: 18, layers: 3,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    },{
        type: 'flower',
        radius: 12,
        speed: 212,
        life: 8,
        x: 500, y: 500,
        rotateSpeed: 5.6, clonesNumber: 5, clonesRadius: 9, clonesDistance: 18, layers: 3,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [72,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,1E99],
    spawnParams: [{
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
        type: 'spawn',
        radius: 22,
        speed: 142,
        life: 12,
        spawnTime: 1.3,
        spawnParams: {
            type: 'selfcollide',
            radius: 14,
            speed: 252,
            life: 4,
        },
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [88,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1E99],
         shootAngles: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 256, 260, 264, 268, 272, 276, 280, 284, 288, 292, 296, 300, 304, 308, 312, 316, 320, 324, 328, 332, 336, 340, 344, 348, 352, 356],
    spawnParams: [{
        type: 'normal',
        radius: 12, 
        speed: 360,
        life: 2,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [88,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1E99],
         shootAngles: [90, 94, 98, 102, 106, 110, 114, 118, 122, 126, 130, 134, 138, 142, 146, 150, 154, 158, 162, 166, 170, 174, 178, 182, 186, 190, 194, 198, 202, 206, 210, 214, 218, 222, 226, 230, 234, 238, 242, 246, 250, 254, 258, 262, 266, 270, 274, 278, 282, 286, 290, 294, 298, 302, 306, 310, 314, 318, 322, 326, 330, 334, 338, 342, 346, 350, 354, 358, 362, 366, 370, 374, 378, 382, 386, 390, 394, 398, 402, 406, 410, 414, 418, 422, 426, 430, 434, 438, 442, 446],
    spawnParams: [{
        type: 'normal',
        radius: 12, 
        speed: 360,
        life: 2,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [88,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1E99],
         shootAngles: [-90, -86, -82, -78, -74, -70, -66, -62, -58, -54, -50, -46, -42, -38, -34, -30, -26, -22, -18, -14, -10, -6, -2, 2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94, 98, 102, 106, 110, 114, 118, 122, 126, 130, 134, 138, 142, 146, 150, 154, 158, 162, 166, 170, 174, 178, 182, 186, 190, 194, 198, 202, 206, 210, 214, 218, 222, 226, 230, 234, 238, 242, 246, 250, 254, 258, 262, 266],
    spawnParams: [{
        type: 'normal',
        radius: 12, 
        speed: 360,
        life: 2,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [88,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.15,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1E99],
         shootAngles: [-180, -176, -172, -168, -164, -160, -156, -152, -148, -144, -140, -136, -132, -128, -124, -120, -116, -112, -108, -104, -100, -96, -92, -88, -84, -80, -76, -72, -68, -64, -60, -56, -52, -48, -44, -40, -36, -32, -28, -24, -20, -16, -12, -8, -4, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176],
    spawnParams: [{
        type: 'normal',
        radius: 12, 
        speed: 360,
        life: 2,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500, y: 500,
    }],
}))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [50,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1E99],
//     spawnParams: [{
//         type: 'wavy',
//         radius: 24,
//         speed: 360,
//         life: 18,
//         x: 500, y: 500,
//         maxTimer: 0.52,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [50,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1E99],
//     spawnParams: [{
//         type: 'selfcollide',
//         radius: 24,
//         speed: 180,
//         life: 18,
//         x: 500, y: 500,
//         maxTimer: 0.52,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [50,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1E99],
//     spawnParams: [{
//         type: 'pointaccel',
//         accelFactor: 1.5,
//         accelPower: 1.4,
//         radius: 24,
//         speed: 5,
//         life: 18,
//         x: 500, y: 500,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [50,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1E99],
//     spawnParams: [{
//         rotateSpeed: 1,
//         rotateDist: 48,
//         type: 'rotatearoundparent',
//         radius: 24,
//         chId: 23,
//         speed: 10,
//         life: 18,
//         x: 500, y: 500,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [50,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,0.025,1E99],
//     spawnParams: [{
//         type: 'wavy',
//         radius: 12, 
//         speed: 840,
//         maxTimer: 0.52,
//         life: 18,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//         x: 500, y: 500,
//     }],
// }))

//////////////////////////////////////////
// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [50.25,1E99],
//     spawnParams: [{
//         type: 'boomerang',
//         radius: 1, 
//         throwCooldown: 0.06,
//         throwAngle: 0,
//         speed: 0,
//         boomerangSpeed: 720,
//         boomerangRadius: 12,
//         shootAngles: [-86, -82, -78, -74, -70, -66, -62, -58, -54, -50, -46, -42, -38, -34, -30, -26, -22, -18, -14, -10, -6, -2, 2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94, 98, 102, 106, 110, 114, 118, 122, 126, 130, 134, 138, 142, 146, 150, 154, 158, 162, 166, 170, 174, 178, 182, 186, 190, 194, 198, 202, 206, 210, 214, 218, 222, 226, 230, 234, 238, 242, 246, 250, 254, 258, 262, 266, 270],
//         life: 4,//6,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//         x: 500, y: 500,
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
//     spawnParams: [{
//         type: 'e2dasher',
//         radius: 26, 
//         firstCooldown: 6, 
//         firstSpeed: 15, 
//         secondCooldown: 4, 
//         secondSpeed: 22,
//         life: 24,
//         friction: 0.972,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//         x: 500, y: 500,
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [20,0,0,0,0,0,0,0,1E99],
//     spawnParams: [{
//         type: 'slower',
//         radius: 54, 
//         speedMult: 0.5,
//         life: 24,
//         speed: 180,
//         friction: 0.96,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//         x: 500, y: 500,
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [42,0.25,0.25,0.25,0.25,0.25,1,1E99],
//     spawnParams: [{
//         type: 'flower',
//         radius: 16,
//         speed: 160,
//         life: 6,
//         x: 500, y: 500,
//         rotateSpeed: -5.6, clonesNumber: 3, clonesRadius: 14, clonesDistance: 16, layers: 3,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [42,1,1,1E99],
//     spawnParams: [{
//         type: 'boomerang',
//         radius: 32, 
//         throwCooldown: 0.16,
//         throwAngle: 0,
//         speed: 120,
//         boomerangSpeed: 260,
//         boomerangRadius: 12,
//         shootAngles: [0,Math.PI/2,Math.PI*3/2,Math.PI],
//         life: 42,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//         x: 500, y: 500,
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [48,0.25,0.25,0.25,0.25,0.25,0.25,1,1E99],
//     spawnParams: [{
//         type: 'wavy',
//         radius: 18,
//         speed: 220,
//         life: 36,
//         x: 500, y: 500,
//         maxTimer: 0.32,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [52,0.25,0.25,0.25,0.25,0.25,1,1E99],
//     spawnParams: [{
//         type: 'selfcollide',
//         radius: 20,
//         speed: 220,
//         life: 32,
//         x: 500, y: 500,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [60,0.25,0.25,0.25,0.25,0.25,0.25,1E99],
//     spawnParams: [{
//         type: 'pointaccel',
//         radius: 16,
//         speed: 6,
//         accelFactor: 1.5, accelPower: 1.4,
//         toWait: false,
//         toWarp: true,
//         life: 24,
//         x: 500, y: 500,
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//     }],
// }))

// spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [88,1,1,1,1,1,1,1,1,1,1E99],
//     spawnParams: [{
//         bound: {
//             x: 0,
//             y: 0,
//             w: 1000,
//             h: 1000,
//         },
//         x: 500, y: 500,
//         type: 'spawn',
//         amount: 1,
//         radius: 24,
//         speed: Math.random() * 40 + 60,
//         life: 18,
//         spawnTime: 1.2,
//         spawnParams: {
//             type: 'selfcollide',
//             radius: 12,
//             speed: 262,
//             life: 5,
//         },
//     }],
// }))

// // final wave

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [94,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1E99],
    spawnParams: [{
        type: 'toxic',
        radius: 24, 
        speed: 180,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 100, y: 100,
    },{
        type: 'toxic',
        radius: 27, 
        speed: 200,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 900, y: 100,
    },{
        type: 'toxic',
        radius: 30, 
        speed: 220,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 900, y: 900,
    },{
        type: 'toxic',
        radius: 34, 
        speed: 242,
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 100, y: 900,
    }],
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [100,1E99],
    spawnParams: [{
        type: 'enemyobstacle',
        radius: 12,
        speed: 80,
        obstacle: new Winpad(0, 0, 50, 50),
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    }],
}))



module.exports = map;