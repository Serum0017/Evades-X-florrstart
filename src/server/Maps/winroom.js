module.exports = {
    name: 'Winroom',
    init: [
        {type: 'settings', dimensions: {x: 500, y: 500}, spawn: {x: 250, y: 250}, difficulty: 'Peaceful', difficultyNumber: 0.1},// settings obstacle will always be the first obstacle, otherwise default to saved settings
        {type: 'square-normal-changeMap', x: 250, y: 25, w: 50, h: 50, map: 'Hub' },
        {type: 'square-normal-changeColor', x: 250, y: 250, w: 1, h: 1, backgroundColor: '#310f99', tileColor: '#1d0a57'},
    ]
}