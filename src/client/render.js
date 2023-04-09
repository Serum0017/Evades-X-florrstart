let lastRenderTime = Date.now();
let renderDt = 0;

window.lastUpdateTime = Date.now();
let updateDt = 0;

let camera = { x: 0, y: 0, scale: 1 };

function render(game){
    const {Map, players} = game;
    const me = players[game.selfId];

    // filling bg
    ctx.fillStyle = '#4d5f56';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    if(!window.me){
        requestAnimationFrame(render);
        return;
    };
    
    camera.x = me.x - canvas.width/2/*expLerp(camera.x, player.x - canvas.width/2, 1/8);*/
    camera.y = me.y - canvas.height/2/*expLerp(camera.y, player.y - canvas.height/2, 1/8);*/

    renderTiles();

    ctx.translate(-camera.x, -camera.y);

    renderBounds();

    // drawing all players
    for(let id in players){
        players[id].render();
    }

    ctx.translate(camera.x, camera.y);

    if(window.disconnected){
        renderDisconnectedText();
    } else {
        requestAnimationFrame(render);
    }
}

function renderTiles(){
    // drawing tiles
    ctx.strokeStyle = '#415048';
    ctx.lineWidth = 2;
    const tileOffset = {x: -camera.x%50, y: -camera.y%50};

    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x+tileOffset.x, 0);
        ctx.lineTo(x+tileOffset.x, canvas.height);
        ctx.stroke();
        ctx.closePath();
    }

    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y+tileOffset.y);
        ctx.lineTo(canvas.width, y+tileOffset.y);
        ctx.stroke();
        ctx.closePath();
    }
}

function renderBounds(){
    // out of bounds borders
    // we make a large stroke and draw >:)

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 20000;
    ctx.strokeRect(-canvas.width, -canvas.height, Map.width + canvas.width * 2, Map.height + canvas.height * 2);
    ctx.lineWidth = 3;
}

function renderDisconnectedText(){
    ctx.font = '700 30px Inter';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText('Disconnected', canvas.width/2, canvas.height/2 - 70);
    ctx.fillText('Disconnected', canvas.width/2, canvas.height/2 - 70);
}

function interpolate(start, end, time) {
    return start * (1 - time) + end * time;
}

// if amount is 1/8, then we get 1/8 closer to the target every frame
function expLerp(start, end, amount){
    const difference = end-start;
    return start + difference*amount;
}

function interpolateDirection(d1, d2, angleIncrement) {
    let dir;
    let dif = d1-d2;
    let angleDif = Math.atan2(Math.sin(dif), Math.cos(dif));
    if (Math.abs(angleDif) >= angleIncrement*clamp(0,10000,Math.abs(angleDif)**0.6*0.55)) {
        if (angleDif < 0) {
            dir = 1;
        } else {
            dir = -1;
        }
    } else {
        // we're close enough to snap
        return d1 ? interpolateLinearDirection(d1, d2, 0.1) : d2;
    }
    return d1 + dir*angleIncrement*clamp(0,10000,Math.abs(angleDif)**0.6*0.55);
}

function interpolateFixedDirection(d1, d2, angleIncrement) {
    let dir;
    let dif = d1-d2;
    let angleDif = Math.atan2(Math.sin(dif), Math.cos(dif));
    if (Math.abs(angleDif) >= angleIncrement) {
        if (angleDif < 0) {
            dir = 1;
        } else {
            dir = -1;
        }
    } else {
        return d1 ? interpolateLinearDirection(d1, d2, 0.1) : d2;
    }
    return d1 + dir*angleIncrement;
}

// function interpolateLinearDirection(d1, d2, angleIncrement) {
//     let dir;
//     let dif = d1-d2;
//     let angleDif = Math.atan2(Math.sin(dif), Math.cos(dif));
//     if (angleDif < 0) {
//         dir = 1;
//     } else {
//         dir = -1;
//     }
//     return d1 + dir*angleIncrement*Math.abs(angleDif);
// }

function shortAngleDist(a0,a1) {
    var max = Math.PI*2;
    var da = (a1 - a0) % max;
    return 2*da % max - da;
}

function interpolateLinearDirection(a0,a1,t) {
    return a0 + shortAngleDist(a0,a1)*t;
}

function clamp(min,max,x){
    return(Math.min(max,Math.max(min,x)));
}

// class to neatly bundle stuff so you can call stuff like a game engine (like renderer.renderGame());
export default class Renderer {
    constructor(){
        this.renderGame = render;
    }
}