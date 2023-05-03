module.exports = {
    name: 'Hub',
    init: [
        {type: 'settings', dimensions: {x: 500, y: 500}, spawn: {x: 50, y: 50}, difficulty: 'Peaceful'},// settings obstacle will always be the first obstacle, otherwise default to saved settings
        // shape, simulate, effect
        // {type: 'square-move-normal', /*x: 350, y: 350,*/ w: 60, h: 60, currentPoint: 0, path: [[350, 350], [350, 300], [400, 350]], speed: 2},
        // {type: 'circle-move-normal', /*x: 150, y: 150,*/ r: 50, currentPoint: 0, path: [[150, 350], [150, 300], [200, 350]], speed: 1},
        // //{type: 'circle-move-bounce', /*x: 150, y: 150,*/ r: 20, currentPoint: 0, path: [[10, 10], [490, 10], [490, 490], [0, 490]], bounciness: 120, speed: 1},

        {type: 'circle-normal-changeMap', x: 400, y: 400, r: 25, w: 50, h: 50, map: 'Planet of Simple Challenges' },
        {type: 'poly-move-changeMap', x: 0, y: 0, points: [[100, 0], [200, 0], [150, 75]], path: [[300,0],[400,0]], currentPoint: 0, speed: 1, maxStrength: 20, regenTime: 100, healSpeed: .1, map: 'Winroom' },
        {type: 'poly-move-changeMap', x: 0, y: 0, points: [[100, 0], [200, 0], [150, 75]], path: [[300,0],[400,0]], currentPoint: 0, speed: 1, maxStrength: 20, regenTime: 100, healSpeed: .1, map: 'Winroom' },
        
        // {type: 'square-normal-lava', x: 400, y: 150, w: 50, h: 50, bounciness: 1, friction: 0.98 },
        {type: 'square-normal-lava', x: 300, y: 300, w: 20, h: 20, bounciness: 1, friction: 0.98 },
        {type: 'circle-normal-normal', x: 75, y: 425, r: 50, bounciness: 10, friction: 0.9 },
        {type: 'circle-normal-resetFriction', x: 250, y: 250, r: 50},
        {type: 'circle-rotate-tp', rotation: 0, rotateSpeed: 1, pivot: {x: 200, y: 200}, x: 150, y: 150, r: 50, tp: {x: 450, y: 50}},
        //{type: 'poly-move-normal', x: 400, y: 400, w: 100, h: 100, points: [[100, 100], [150, 100], [150, 150]], path: [[400, 400], [350, 400], [350, 450]], currentPoint: 0, speed: 0.5},
        // {type: 'poly-normal-breakable', points: [[50, 50], [150, 50], [100, 125], [50, 100]], maxStrength: 100 },
        // {type: 'square-rotate-bounce', w: 50, h: 50, x: 100, y: 0, rotation: 0, rotateSpeed: -1, pivot: {x: 150, y: 150}},
        {type: 'poly-rotate-breakable', w: 50, h: 50, x: 100, y: 0, rotation: 0, rotateSpeed: -1, pivot: {x: 150, y: 150}, points: [[0, 0], [100, 0], [50, 75]], path: [[0, 0], [200, 200], [100, 200]], bounciness: 10, friction: 0.9, currentPoint: 0, speed: 3, maxStrength: 20, regenTime: 100, healSpeed: .1},

        {type: 'circle-enemy-breakable', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        {type: 'circle-enemy-breakable', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        {type: 'circle-enemy-lava', solid: false, bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        // {type: 'square-enemy-breakable', bound: {x: 350, y: 350, w: 100, h: 100}, w: 40, h: 40, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 1.8, r: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        {type: 'poly-enemy-lava', solid: true, points: [[0, 0], [40, 0], [20, 30]], bound: {x: 350, y: 350, w: 100, h: 100}, w: 40, h: 40, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 1.8, r: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        // {type: 'circle-enemy-normal', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10},
        // {type: 'circle-enemy-normal', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10},
        // {type: 'circle-enemy-normal', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10},

        // {type: 'square-normal-changeColor', x: 300, y: 300, w: 50, h: 50, tileColor: '#7A6B83', backgroundColor: '#99BFBB', safeColor: '#7A6B83'},
    ]
}