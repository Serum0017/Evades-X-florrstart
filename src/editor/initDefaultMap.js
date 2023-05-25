import Map from "../client/map.js";

export default function initDefaultMap(client){
    client.game.map = new Map(client);
    client.game.map.addPlayer(0, {
        x: 25, y: 25, r: 24.5, id: 0,
        frictions: {}, speed: 430 / 60, friction: 0.4,
        map: client.game.map,
        angle: 0, magnitude: 0,
        dev: false, god: false,
        input: {up: false, down: false, left: false, right: false},
        shape: 'circle', shapePoints: [],
        xv: 0, yv: 0,
        spawn: {x: 25, y: 25},
        dead: false,
        touching: {ground: [], platformer: [], safe: [], changeRadius: [], changeShape: []},
        axisSpeedMult: {x: 1, y: 1, angle: 0},
        pivot: {x: 0, y: 0},
        difference: {x: 50, y: 50},
        lastTick: 0,
        packKeys: []
    });
    client.game.map.selfId = 0;
    client.game.map.self = client.game.map.players[client.game.map.selfId];
    client.game.map.init({
        players: {},
        obstacles: [],
        tick: 0,
        selfId: 0,
        name: 'Planet of New Beginnings'
    });
    client.map = client.game.map;
}