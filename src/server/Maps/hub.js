module.exports = {
    name: 'Hub',
    init: [
        {type: 'settings', dimensions: {x: 500, y: 500}, spawn: {x: 250, y: 250}, difficulty: 'Peaceful'},// settings obstacle will always be the first obstacle, otherwise default to saved settings
        // shape, simulate, effect
        
        {type: 'square-normal-changeShape', frictionValue: 0.9, x: 250, y: 250, w: 500, h: 500, shapeType: 'square', shapeWidth: 33, shapeHeight: 33},

        {type: 'square-move-changeMap', x: 50, y: 50, w: 100, h: 100, map: 'Planet of Difficulty Chart', path: [{x:50, y:50}, {x:450, y:50}, {x:450, y:450}, {x:50, y:450}], currentPoint: 0, speed: 1 },
        {type: 'square-move-changeMap', x: 50, y: 50, w: 100, h: 100, map: 'Planet of Extreme Dexterity', path: [{x:50, y:50}, {x:450, y:50}, {x:450, y:450}, {x:50, y:450}], currentPoint: 1, speed: 1 },
        {type: 'square-move-changeMap', x: 50, y: 50, w: 100, h: 100, map: 'Planet of Intense Agony', path: [{x:50, y:50}, {x:450, y:50}, {x:450, y:450}, {x:50, y:450}], currentPoint: 2, speed: 1 },
        {type: 'square-move-changeMap', x: 50, y: 50, w: 100, h: 100, map: 'Planet of Conveyor Abuse', path: [{x:50, y:50}, {x:450, y:50}, {x:450, y:450}, {x:50, y:450}], currentPoint: 3, speed: 1 },

        {type: 'circle-normal-normal', x: 0, y: 0, r: 250},
        {type: 'circle-normal-normal', x: 500, y: 0, r: 250},
        {type: 'circle-normal-normal', x: 0, y: 500, r: 250},
        {type: 'circle-normal-normal', x: 500, y: 500, r: 250},
    ]
}