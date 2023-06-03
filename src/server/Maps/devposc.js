module.exports = {
    name: 'Planet of Simple Challenges',
    init: [
        {type: 'settings', dimensions: {x: 1000, y: 800}, spawn: {x: 500, y: 750}, difficulty: 'Peaceful', difficultyNumber: 0.8},// settings obstacle will always be the first obstacle, otherwise default to saved settings
        // shape, simulate, effect
        {type: 'oval-move-snapGrid',  maxStrength: 100, regenTime: 100, healSpeed: 10, /*x: 350, y: 350,*/rw: 20*2.5, rh: 30*2.5, snapDistance: {x: 35, y: 60}, snapAngle: 45, snapAngleRotateSpeed: 0.2, /*w: 60, h: 60,*/ currentPoint: 0, path: [{x: 350, y: 350}, {x: 350, y: 300}, {x: 400, y: 350}], speed: 2},
        {type: 'circle-move-normal', /*x: 150, y: 150,*/ r: 50, currentPoint: 0, path: [{x: 150, y: 500}, {x: 150, y: 300}, {x: 400, y: 500}], speed: 6},
        {type: 'circle-move-coin', /*x: 150, y: 150,*/ coinAmount: 3, r: 20, currentPoint: 0, path: [{x: 10, y: 10}, {x: 490, y: 10}, {x: 490, y: 490}, {x: 0, y: 490}], bounciness: 180, speed: 1},
        {type: 'circle-move-coin', /*x: 150, y: 150,*/ color: 'blue', coinAmount: 3, r: 20, currentPoint: 0.5, path: [{x: 10, y: 10}, {x: 490, y: 10}, {x: 490, y: 490}, {x: 0, y: 490}], bounciness: 180, speed: 1},
        {type: 'circle-move-coin', /*x: 150, y: 150,*/ color: 'red', coinAmount: 10, r: 20, currentPoint: 1, path: [{x: 10, y: 10}, {x: 490, y: 10}, {x: 490, y: 490}, {x: 0, y: 490}], bounciness: 180, speed: 1},
        {type: 'circle-move-coindoor', /*x: 150, y: 150,*/ r: 20, coins: 2, currentPoint: 2, path: [{x: 10, y: 10}, {x: 490, y: 10}, {x: 490, y: 490}, {x: 0, y: 490}], bounciness: 180, speed: 1},
        {type: 'circle-move-coindoor', /*x: 150, y: 150,*/ color: 'red', r: 20, coins: 2, currentPoint: 2.5, path: [{x: 10, y: 10}, {x: 490, y: 10}, {x: 490, y: 490}, {x: 0, y: 490}], bounciness: 180, speed: 1},

        {type: 'square-normal-bounce', x: 400, y: 150, w: 50, h: 50, bounciness: 1, friction: 0.98 },
        {type: 'square-normal-changeMap', x: 950, y: 0, w: 50, h: 50, map: 'Winroom' },
    ]
}