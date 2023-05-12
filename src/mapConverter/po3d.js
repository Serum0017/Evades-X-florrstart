const { NormalObstacle3D, Lava3D, Winpad3D } = require("../3dobstacle.js");

const map = {
    arena: { width: 300, height: 300 },
    enemy: [],
    safes: [],
    texts: [],
    obstacles: [],
    spawns: [],
    playerSpawn: { x: 50, y: 25, z: 50 },
    name: 'Po3D',
    longName: 'Planet of 3D',
    bgColor: '#1f2129',
    tileColor: '#323646',
    difficulty: "Peaceful",
    addedObstacles: [],
    dimensions: 3,
    gravity: 200,
    jumpForce: 40,
    cameraZoom: 400,
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = map;

obstacles.push(new NormalObstacle3D(150,50,150,200,100,200));
obstacles.push(new Lava3D(0,50,0,50,50,50,true));
obstacles.push(new Lava3D(0,200,0,50,50,50,false));
obstacles.push(new Winpad3D(200,200,0,50,50,50));

module.exports = map;