const parseMap = require('../parser.js');
const Spawner = require('../spawner.js');

const { Winpad, SizePlayer, ColorChange, MovingSafe, Gun, Clone, CameraChange, EnemyButton, LavaDoor } = require('../obstacle.js');

const text = `
	{"arena":{"width":3000,"height":3000},"enemy":[],"safes":[],"spawns":[],"playerSpawn":{"x":2025,"y":25},"name":"PoTD","longName":"Planet of Tower Defense","tileColor":"#383838","bgColor":"#0d0d0d","safeColor":"#8c8c8c","difficulty":"Hardcore","renderRaycasting":false,"texts":[{"x":450,"y":850,"w":25,"h":25,"size":30,"text":"-----------------------------------------------------------------","angle":0,"story":false},{"x":500,"y":500,"w":25,"h":25,"size":30,"text":"----------------------------------------------------------","angle":0,"story":false},{"x":550,"y":100,"w":25,"h":25,"size":30,"text":"-----------------------------------------------------------------","angle":0,"story":false},{"x":900,"y":675,"w":25,"h":25,"size":30,"text":"-------------------------","angle":90,"story":false},{"x":100,"y":300,"w":25,"h":25,"size":30,"text":"----------------------------","angle":90,"story":false},{"x":975,"y":100,"w":25,"h":25,"size":30,"text":"!","angle":0,"story":false}],"obstacles":[{"type":"check","x":2000,"y":0,"w":250,"h":50},{"type":"normal","x":1000,"y":0,"w":1000,"h":3000,"canJump":true,"angle":0},{"type":"normal","x":0,"y":1000,"w":3000,"h":1000,"canJump":true,"angle":0},{"type":"normal","x":1975,"y":50,"w":1125,"h":900,"canJump":true,"angle":0},{"type":"tp","x":2000,"y":0,"w":50,"h":50,"tpx":25,"tpy":2025,"changeColor":false,"bgColor":"#0d0d0d","tileColor":"#383838"},{"type":"portal","x":2950,"y":950,"w":50,"h":50,"size":50,"name":"Hub","acronym":"Hub","difficulty":"Peaceful","difficultyNumber":null,"musicPath":null},{"type":"normal","x":1975,"y":925,"w":975,"h":100,"canJump":true,"angle":0},{"type":"tp","x":2100,"y":0,"w":50,"h":50,"tpx":2975,"tpy":975,"changeColor":false,"bgColor":"#0d0d0d","tileColor":"#383838"},{"type":"normal","x":2250,"y":-25,"w":825,"h":100,"canJump":true,"angle":0},{"type":"circle-hollow","x":475,"y":775,"r":50,"innerRadius":25},{"type":"circle-hollow","x":175,"y":575,"r":50,"innerRadius":25},{"type":"circle-hollow","x":175,"y":175,"r":50,"innerRadius":25},{"type":"circle-hollow","x":925,"y":175,"r":50,"innerRadius":25},{"type":"circle-hollow","x":775,"y":575,"r":50,"innerRadius":25}]}
`

const { Custom }= require("./!conversionClasses.js");

let map = parseMap(text);
let { obstacles, spawns } = map;

obstacles.push(new Clone(0, 2000, 50, 50, 175, 175-2000));
obstacles.push(new Clone(0, 2000, 50, 50, 925, 175-2000));
obstacles.push(new Clone(0, 2000, 50, 50, 175, 575-2000));
obstacles.push(new Clone(0, 2000, 50, 50, 775, 575-2000));
obstacles.push(new Clone(0, 2000, 50, 50, 475, 775-2000));
obstacles.push(new CameraChange(0, 2000, 50, 50, 500, 500, false));
//x, y, w, h, state, gunType, fireCooldown, speed, radius, life, effectTime
obstacles.push(new Gun(175, 175, 1, 1, true, 'normal', 1, 200, 24, 2, 1E99));
obstacles.push(new Gun(925, 175, 1, 1, true, 'normal', 0.8, 200, 24, 2, 1E99));
obstacles.push(new Gun(175, 575, 1, 1, true, 'push', 1.4, 162, 34, 1.56));
obstacles.push(new Gun(775, 575, 1, 1, true, 'normal', 1.2, 200, 24, 2, 1E99));
obstacles.push(new Gun(475, 775, 1, 1, true, 'stun', 0.8, 248, 18, 1.2, 0.1));

obstacles.unshift(new EnemyButton(950,75,50,50,1));
obstacles.unshift(new LavaDoor(175,175,0,0,1,false));

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [0.2,0.6,0.6,3,0.6,0.6,0.6,1E99],
    spawnParams: { 
        type: 'enemymove',
        x: 0,
        y: 850,
        radius: 24,
        speed: 160,
        points: [[0,850],[900,850],[900,500],[100,500],[100,100],[1000,100]],
        currentPoint: 0
    }
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [9,0.3,0.3,0.3,0.3,1E99],
    spawnParams: { 
        type: 'enemymove',
        x: 0,
        y: 850,
        radius: 18,
        speed: 272,
        points: [[0,850],[900,850],[900,500],[100,500],[100,100],[1000,100]],
        currentPoint: 0
    }
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [12,1E99],
    spawnParams: [{
        type: 'enemyobstacle',
        radius: 0,
        speed: 0,
        obstacle: new ColorChange(0, 0, 995, 995, '#182A22', '#35643B'),
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500,
        y: 500,
        life: 1,
    }],
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [16,1,1,1,1,1,1,1,1E99],
    spawnParams: { 
        type: 'enemymove',
        x: 0,
        y: 850,
        radius: 20,
        speed: 200,
        points: [[0,850],[900,850],[900,500],[100,500],[100,100],[1000,100]],
        currentPoint: 0,
    }
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [25,0.6,0.6,1E99],
    spawnParams: { 
        type: 'enemymove',
        x: 0,
        y: 850,
        radius: 20,
        speed: 120,
        points: [[0,850],[900,850],[900,500],[100,500],[100,100],[1000,100]],
        currentPoint: 0,
        parentId: 1,
    }
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [25,0.6,0.6,1E99],
    spawnParams: { 
        type: 'reflectbullet',
        radius: 24,
        speed: 2,
        hp: 2,
        childId: 1,
    }
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [34,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,1E99],
    spawnParams: [{ 
        type: 'enemymove',
        x: 0,
        y: 850,
        radius: 12,
        speed: 150,
        points: [[0,850],[900,850],[900,500],[100,500],[100,100],[1000,100]],
        currentPoint: 0,
    }]
}))

spawns.push(new Spawner(2000, 2000, 1000, 1000, { type: 'spawn', amount: 1, radius: 3, speed: 0, spawnTime: [22,1E99],
    spawnParams: [{
        type: 'enemyobstacle',
        radius: 0,
        speed: 0,
        obstacle: new ColorChange(0, 0, 995, 995, '#5A0C0C', '#791B23'),
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
        x: 500,
        y: 500,
        life: 1,
    }],
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [39,2,2,2,1E99],
    spawnParams: { 
        type: 'enemymove',
        x: 0,
        y: 850,
        radius: 22,
        speed: 140,
        points: [[0,850],[900,850],[900,500],[100,500],[100,100],[1000,100]],
        currentPoint: 0,
        parentId: 3,
    }
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [39,2,2,2,1E99],
    spawnParams: { 
        type: 'reflectbullet',
        radius: 23,
        speed: 2,
        hp: 2,
        childId: 3
    }
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [39,2,2,2,1E99],
    spawnParams: { 
        type: 'reflectbullet',
        radius: 12,
        speed: 2,
        hp: 2,
        childId: 3
    }
}))

// winged enemies
spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [52,0.5,0.5,0.5,1E99],
    spawnParams: { 
        type: 'enemymove',
        x: 0,
        y: 850,
        radius: 22,
        speed: 122,
        points: [[0,850],[50,850],[800,100],[1000,100]],
        currentPoint: 0,
    }
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [64,1E99],
    spawnParams: { 
        type: 'enemymove',
        x: 0,
        y: 850,
        radius: 23,
        speed: 150,
        points: [[0,850],[900,850],[900,500],[100,500],[100,100],[1000,100]],
        currentPoint: 0,
        parentId: 6,
    }
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [64,1E99],
    spawnParams: { 
        type: 'reflectbullet',
        radius: 24,
        speed: 2,
        hp: 8,
        childId: 6
    }
}))

spawns.push(new Spawner(-75, 825, 50, 50, { type: 'spawn', amount: 1, radius: 0, speed: 0, spawnTime: [84,0.1,0.1,0.1,1E99],
    spawnParams: { 
        type: 'enemyobstacle',
        radius: 0,
        speed: 300,
        obstacle: new Winpad(0, 0, 50, 50),
        bound: {
            x: 0,
            y: 0,
            w: 1000,
            h: 1000,
        },
    }
}))



module.exports = map;