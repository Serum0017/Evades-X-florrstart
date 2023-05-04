module.exports = {
    name: 'Planet of Simple Challenges',
    init: [
        {type: 'settings', dimensions: {x: 1000, y: 800}, spawn: {x: 500, y: 750}, difficulty: 'Peaceful', difficultyNumber: 0.8},// settings obstacle will always be the first obstacle, otherwise default to saved settings
        // shape, simulate, effect
        {type: 'square-move-normal', /*x: 350, y: 350,*/ w: 60, h: 60, currentPoint: 0, path: [{x: 350, y: 350}, {x: 350, y: 300}, {x: 400, y: 350}], speed: 2},
        {type: 'circle-move-normal', /*x: 150, y: 150,*/ r: 50, currentPoint: 0, path: [{x: 150, y: 500}, {x: 150, y: 300}, {x: 400, y: 500}], speed: 6},
        {type: 'circle-move-bounce', /*x: 150, y: 150,*/ r: 20, currentPoint: 0, path: [{x: 10, y: 10}, {x: 490, y: 10}, {x: 490, y: 490}, {x: 0, y: 490}], bounciness: 180, speed: 1},
        
        {type: 'square-normal-bounce', x: 400, y: 150, w: 50, h: 50, bounciness: 1, friction: 0.98 },
        {type: 'square-normal-changeMap', x: 950, y: 0, w: 50, h: 50, map: 'Winroom' },
    ]
}