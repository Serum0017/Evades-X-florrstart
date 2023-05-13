// module.exports = {
//     name: 'Winroom',
//     init: [
//         {type: 'settings', dimensions: {x: 500, y: 500}, spawn: {x: 100, y: 100}, difficulty: 'Peaceful', difficultyNumber: 0.1},// settings obstacle will always be the first obstacle, otherwise default to saved settings
//         {type: 'square-normal-changeMap', x: 450, y: 450, w: 50, h: 50, map: 'Hub' },
//     ]
// }

const map = require('../../mapConverter/!mapToNewEvadeConverter.js');

module.exports = map;