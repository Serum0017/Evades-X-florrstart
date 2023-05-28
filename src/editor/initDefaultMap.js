import Map from "../client/map.js";

const defaultMapName = 'Planet of New Beginnings';
export default function initDefaultMap(client){
    client.game.map = new Map(client);
    const ssMap = new window.Map();

    ssMap.addPlayer(new /*ss player*/window.Player(0, window.generateDefaultState(ssMap, defaultMapName)));

    // loading bare bones map - todo: expand this when saving/ loading maps becomes a thing (we'll still have the export/ import button, it will just be used less bc you dont have to go into the game everytime to test)
    ssMap.load({
        name: defaultMapName,
        init: [
            {type: 'settings', dimensions: {x: 500, y: 500}, spawn: {x: 25, y: 25}, difficulty: 'Peaceful'},
        ]
    })

    console.log(ssMap.initPack());
    client.game.map.init(ssMap.initPack());
    
    client.game.map.selfId = 0;
    client.game.map.self = client.game.map.players[client.game.map.selfId];
    client.game.map.self.isSelf = true;
    client.map = client.game.map;
}