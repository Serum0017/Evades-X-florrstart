import Utils from '../util.js';

import renderEffect from './renderEffect.js'
import renderShape from './renderShape.js';
import renderSimulate from './renderSimulate.js';

let canvas = Utils.ref.canvas;
let ctx = canvas.getContext('2d');

export default class Renderer {
    constructor(client){
        this.client = client;

        this.camera = new Camera();

        this.stopped = false;

        this.colors = {
            tile: '#415048',// the stroke
            background: '#4d5f56',// the fill
            safe: '#0f0f0',// the safecolor
        }
    }
    start(){
        // this.game = this.client.game;
        requestAnimationFrame(this.render.bind(this));
        
        // this.camera.resize();
        // window.addEventListener('resize', () => {
        //     this.camera.resize();
        // })
    }
    stop(){
        this.stopped = true;
    }
    render(){
        const { map } = this.client.game;
        const me = this.client.me();
    
        // filling bg
        ctx.fillStyle = this.colors.background;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        this.renderTiles({x: -me.x + canvas.width / 2, y: -me.y + canvas.height / 2});
        
        this.camera.setTranslate({x: -me.x + canvas.width / 2, y: -me.y + canvas.height / 2});
    
        this.renderBounds(map);
        this.renderPlayers(map.players);

        this.renderObstacles(map.obstacles, map.players);

        this.camera.resetTranslate();

        if(this.stopped === true){
            this.renderDisconnectedText();
        } else {
            requestAnimationFrame(this.render.bind(this));
        }
    }
    renderPlayers(players){
        for(let id in players){
            players[id].render(ctx, canvas, this.camera);
        }
    }
    renderObstacles(obstacles, players){
        for(let o of obstacles){
            ctx.toStroke = false;
            ctx.toFill = true;
            ctx.toClip = false;

            renderEffect(o, ctx, {canvas, obstacles, players, colors: this.colors});
            renderShape(o, ctx, {canvas, obstacles, players, colors: this.colors});

            ctx.globalAlpha = 1;
        }
    }
    renderTiles(tileOffset={x: 0, y: 0}){
        // drawing tiles
        ctx.strokeStyle = this.colors.tile;
        ctx.lineWidth = 2;
    
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
    renderBounds(map){
        // out of bounds borders
        ctx.strokeStyle = this.colors.tile;
        ctx.lineWidth = 10000//Math.max(canvas.width, canvas.height);
        ctx.strokeRect(-ctx.lineWidth/2, -ctx.lineWidth/2, map.settings.dimensions.x + ctx.lineWidth, map.settings.dimensions.y + ctx.lineWidth);
        ctx.lineWidth = 3;
    }
    renderDisconnectedText(){
        ctx.font = '700 30px Inter';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        this.camera.resetTranslate();
        ctx.strokeText('Disconnected', canvas.width/2, canvas.height/2 - 70);
        ctx.fillText('Disconnected', canvas.width/2, canvas.height/2 - 70);
        // idea: make it bounce around like the dvd logo?
    }
}

const fullscreen = {
    ratio: 9 / 16,
    zoom: 1000,
}

class Camera {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.angle = 0;// in radians
    }
    translate({x,y}){
        ctx.translate(x,y);
        this.x += x;
        this.y += y;
    }
    setTranslate({x,y}){
        ctx.translate(x - this.x, y - this.y);
        this.x = x;
        this.y = y;
    }
    resetTranslate(){
        this.setTranslate({x: 0, y: 0});
    }
    rotate(a){
        ctx.translate({x: canvas.width/2, y: canvas.height/2})
        ctx.rotate(a);
        this.angle += a;
        ctx.translate({x: -canvas.width/2, y: -canvas.height/2})
    }
    setRotate(a){
        ctx.translate({x: canvas.width/2, y: canvas.height/2})
        ctx.rotate(a - this.angle);
        this.angle = a;
        ctx.translate({x: -canvas.width/2, y: -canvas.height/2})
    }
    resetRotate(){
        this.setRotate(0);
    }
    // // TODO: i forgot the ctx scale method lol, do once i get off plane
    // scale(a){
    //     ctx.translate({x: canvas.width/2, y: canvas.height/2})
    //     ctx.scale(a);
    //     this.angle = a;
    //     ctx.translate({x: -canvas.width/2, y: -canvas.height/2})
    // }
    // setScale(a){
    //     ctx.translate({x: canvas.width/2, y: canvas.height/2})
    //     ctx.rotate(a - this.angle);
    //     this.angle = a;
    //     ctx.translate({x: -canvas.width/2, y: -canvas.height/2})
    // }
    // resetScale(){
    //     this.setRotate(0);
    // }

    // resize() {
    //     // TODO: change this to use scale to not lose resolution, once scale is done
    //     // const dpi = window.devicePixelRatio;
    //     // canvas.style.width = Math.ceil(window.innerWidth) + 'px';
    //     // canvas.style.height = Math.ceil(window.innerHeight) + 'px';
    //     // canvas.width = Math.ceil(window.innerWidth + 2) * dpi;
    //     // canvas.height = Math.ceil(window.innerHeight + 2) * dpi;
    //     // canvas.zoom = Math.max(canvas.height, canvas.width * fullscreen.ratio) / fullscreen.zoom;
    //     let scale = Math.max(window.innerWidth / canvas.width, window.innerHeight / canvas.height);
    //     canvas.style.transform = "scale(" + scale + ")"; 
    //     canvas.style.left = 1 / 2 * (window.innerWidth - canvas.width) + "px";
    //     canvas.style.top = 1 / 2 * (window.innerHeight - canvas.height) + "px";
    // }
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