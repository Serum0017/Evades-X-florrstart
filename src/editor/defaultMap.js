import Player from "../client/player.js";

export default {
    name: 'Planet of New Beginnings',
    settings: {dimensions: {x: 1000, y: 1000}, spawn: {x: 25, y: 25}, difficulty: 'Peaceful'},
    obstacles: [],
    players: [new Player(0, {packKeys: [], input: {}, axisSpeedMult: {x: 1, y: 1, angle: 0}, touching: []})],
    selfId: 0
}