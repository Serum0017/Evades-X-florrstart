import Player from "../client/player.js";

export default {
    name: 'Planet of New Beginnings',
    settings: {dimensions: {x: 1000, y: 1000}, spawn: {x: 25, y: 25}, difficulty: 'Peaceful'},
    obstacles: [],
    players: [new Player(-1, {
        packKeys: [],
        axisSpeedMult: {x: 1, y: 1, angle: 0},
        touching: {ground: [], platformer: [], safe: [], changeRadius: [], changeShape: []},
        pivot: {x: 0, y: 0},
        difference: {x: 49, y: 49},
        x: 25, y: 25, xv: 0, yv: 0, r: 24.5,
        shape: 'circle', shapePoints: [],
        input: {up: false, down: false, right: false, down: false, shift: false}
    })],
    selfId: -1
}