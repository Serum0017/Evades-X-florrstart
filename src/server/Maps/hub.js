module.exports = {
    name: 'Hub',
    init: [
        {type: 'settings', dimensions: {x: 500, y: 500}, spawn: {x: 50, y: 50}, difficulty: 'Peaceful'},// settings obstacle will always be the first obstacle, otherwise default to saved settings
        // shape, simulate, effect

        {type: 'circle-normal-changeMap', x: 400, y: 400, r: 25, w: 50, h: 50, map: 'Planet of Simple Challenges' },
        {type: 'poly-move-changeMap', x: 0, y: 0, points: [[100, 0], [200, 0], [150, 75]], path: [{x: 100,y: 0},{x: 200, y: 0}], currentPoint: 0, speed: 1, maxStrength: 20, regenTime: 100, healSpeed: .1, map: 'Winroom' },
        {type: 'poly-move-changeMap', x: 0, y: 0, points: [[100, 0], [200, 0], [150, 75]], path: [{x: 100,y: 0},{x: 200, y: 0}], currentPoint: 0.25, speed: 1, maxStrength: 20, regenTime: 100, healSpeed: .1, map: 'Winroom' },
        {type: 'poly-move-changeMap', x: 0, y: 0, points: [[100, 0], [200, 0], [150, 75]], path: [{x: 100,y: 0},{x: 200, y: 0}], currentPoint: 0.5, speed: 1, maxStrength: 20, regenTime: 100, healSpeed: .1, map: 'Winroom' },
        
        // {type: 'square-normal-lava', x: 400, y: 150, w: 50, h: 50, bounciness: 1, friction: 0.98 },
        {type: 'square-normal-lava', x: 300, y: 300, w: 20, h: 20, bounciness: 1, friction: 0.98 },
        {type: 'circle-normal-normal', x: 75, y: 425, r: 50, bounciness: 10, friction: 0.9 },
        {type: 'circle-normal-resetFriction', x: 250, y: 250, r: 50},
        {type: 'circle-rotate,move-normal', coins: 3, color: 'red', rotation: 0, rotateSpeed: 1, path: [{x: 300,y: 0},{x: 400, y: 0}], currentPoint: 0, speed: 1, pivot: {x: 200, y: 200}, x: 150, y: 150, r: 50, tp: {x: 450, y: 50}},
        // {type: 'poly-normal-breakable', points: [[50, 50], [150, 50], [100, 125], [50, 100]], maxStrength: 100 },
        // {type: 'square-rotate-bounce', w: 50, h: 50, x: 100, y: 0, rotation: 0, rotateSpeed: -1, pivot: {x: 150, y: 150}},
        {type: 'poly-rotate-coin', color: 'red', coinAmount: 2, w: 50, h: 50, x: 100, y: 0, rotation: 0, rotateSpeed: -1, pivot: {x: 150, y: 150}, points: [[0, 0], [100, 0], [50, 75]], path: [{x: 0, y: 0}, {x: 200, y: 200}, {x: 100, y: 100}], bounciness: 10, friction: 0.9, currentPoint: 0, speed: 3, maxStrength: 20, regenTime: 100, healSpeed: .1},

        // {type: 'circle-enemy-breakable', bound: {x: 0, y: 0, w: 500, h: 500}, wavyEnemyPeriod: 20, wavyEnemyRotateSpeed: 1, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal,wavy' /*other enemy-specific parameters*/, speed: 4, r: 20, maxStrength: 100, regenTime: 100, healSpeed: 10},
        // {type: 'circle-enemy-breakable', bound: {x: 0, y: 0, w: 500, h: 500}, wavyEnemyPeriod: 20, wavyEnemyRotateSpeed: 1, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal,wavy' /*other enemy-specific parameters*/, speed: 4, r: 20, maxStrength: 100, regenTime: 100, healSpeed: 10},
        // {type: 'circle-enemy-breakable', bound: {x: 0, y: 0, w: 500, h: 500}, wavyEnemyPeriod: 20, wavyEnemyRotateSpeed: 1, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal,wavy' /*other enemy-specific parameters*/, speed: 4, r: 20, maxStrength: 100, regenTime: 100, healSpeed: 10},
        // {type: 'circle-enemy-breakable', bound: {x: 0, y: 0, w: 500, h: 500}, wavyEnemyPeriod: 20, wavyEnemyRotateSpeed: 1, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal,wavy' /*other enemy-specific parameters*/, speed: 4, r: 20, maxStrength: 100, regenTime: 100, healSpeed: 10},

        {type: 'circle-enemy-breakable', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        {type: 'circle-enemy-lava', solid: false, bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        // {type: 'square-enemy-breakable', bound: {x: 350, y: 350, w: 100, h: 100}, w: 40, h: 40, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 1.8, r: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        {type: 'poly-enemy-lava', solid: true, points: [[0, 0], [40, 0], [20, 30]], bound: {x: 350, y: 350, w: 100, h: 100}, w: 40, h: 40, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 1.8, r: 10, maxStrength: 100, regenTime: 100, healSpeed: 10},
        // {type: 'circle-enemy-normal', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10},
        // {type: 'circle-enemy-normal', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10},
        // {type: 'circle-enemy-normal', bound: {x: 350, y: 350, w: 100, h: 100}, /*optional x and y params {x: 0, y: 0}*/ enemyType: 'normal' /*other enemy-specific parameters*/, speed: 3, r: 10},

        // {type: 'square-normal-changeColor', x: 300, y: 300, w: 50, h: 50, tileColor: '#7A6B83', backgroundColor: '#99BFBB', safeColor: '#7A6B83'},
        // {type: 'square-move-platformer', x: 350, y: 200, w: 200, h: 400, path: [{x:350, y:200}, {x:400, y:200}, {x:450, y:250}], currentPoint: 0, speed: 1 },
        // {type: 'square-normal-conveyor', x: 350, y: 200, w: 200, h: 400, conveyorAngleRotateSpeed: 1 /*path: [{x:350, y:200}, {x:400, y:200}, {x:450, y:250}], currentPoint: 0, speed: 1*/ },
        // {type: 'square-normal-rotateMovement', x: 350, y: 200, w: 200, h: 200, rotateMovementAngle: 0, rotateMovementAngleRotateSpeed: -0.2, axisSpeedMult: 0.5 /*path: [{x:350, y:200}, {x:400, y:200}, {x:450, y:250}], currentPoint: 0, speed: 1*/ },
        // {type: 'square-normal-restrictAxis', x: 350, y: 200, w: 200, h: 200, axisSpeedMults: {x: -0.01, y: 2} /*path: [{x:350, y:200}, {x:400, y:200}, {x:450, y:250}], currentPoint: 0, speed: 1*/ },
        // {type: 'square-normal-snapGrid', x: 175-32, y: 375-12, w: 200, h: 150, snapDistance: {x: 35, y: 60}, snapAngle: 45, snapAngleRotateSpeed: 0.2, /*path: [{x:350, y:200}, {x:400, y:200}, {x:450, y:250}], currentPoint: 0, speed: 1*/ },

        // {type: 'square-normal-changeFriction', frictionValue: 0.9, x: 400, y: 325, w: 100, h: 50},
        {type: 'square-normal-changeVinette', vinetteToChange: {outer: {color: {r: 20, g: 0, b: 0}, size: 0.05, alpha: 0}, inner: {color: {r: 0, g: 0, b: 0}, size: 0.02, alpha: 1}}, x: 400, y: 325, w: 100, h: 50, eventEmitters: [{type: 'timePassed', maxTime: 10, currentTime: 2, id: 0}], eventRecievers: [{id: 0, type: 'changeParameter', keyChain: ['x'], addValue: -5}]},
        // {type: 'square-normal-changeSpeed', speedMult: 0.1, x: 400, y: 325, w: 100, h: 50},
        {type: 'square-normal-normal', x: 250, y: 300, w: 50, h: 50},
        {type: 'circle-normal-normal', x: 300, y: 200, r: 25, isGround: false},
    ]
}