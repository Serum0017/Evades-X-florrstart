import Utils from '../util.js';


import EffectManager from './renderEffect.js'
import renderShape from './renderShape.js';
import renderSimulate from './renderSimulate.js';
import interpolateManager from './interpolateObstacle.js';

let canvas = Utils.ref.canvas;
let ctx = canvas.getContext('2d');

export default class Renderer {
    constructor(client){
        this.client = client;

        this.camera = new Camera();

        this.defaultColors = {
            tile: '#0d0d0d',// the stroke and outside of arena
            background: '#383838',// the fillcolor
            safe: '#8c8c8c',// the safe
        }

        this.vinette = {
            outer: {
                color: {r: 0, g: 0, b: 0},
                size: 1,
                alpha: 0.5,
                interpolate: {}
            },
            inner: {
                color: {r: 0, g: 0, b: 0},
                size: 0.5,
                alpha: 0,
                interpolate: {}
            },
        }
        // for(let key in this.vinette.inner){
        //     if(key === 'interpolate'){
        //         continue;
        //     } else if(key === 'color'){
        //         this.vinette.inner.interpolate.color = {
        //             r: this.vinette.inner.color.r,
        //             g: this.vinette.inner.color.g,
        //             b: this.vinette.inner.color.b
        //         }
        //     } else {
        //         this.vinette.inner.interpolate[key] = this.vinette.inner[key];
        //     }
        // }
        // for(let key in this.vinette.outer){
        //     if(key === 'interpolate'){
        //         continue;
        //     } else if(key === 'color'){
        //         this.vinette.outer.interpolate.color = {
        //             r: this.vinette.outer.color.r,
        //             g: this.vinette.outer.color.g,
        //             b: this.vinette.outer.color.b
        //         }
        //     } else {
        //         this.vinette.outer.interpolate[key] = this.vinette.outer[key];
        //     }
        // }

        this.colors = {};
        for(let key in this.defaultColors){
            this.colors[key] = this.defaultColors;
        }

        if(this.client.clientType === 'editor'){
            this.zoomDirection = 'neutral';
            this.renderObstacles = this.renderEditorObstacles;
        }
    }
    stop(){}
    reset(){
        for(let key in this.defaultColors){
            this.colors[key] = this.defaultColors[key];
        }
    }
    render(){
        this.updateZoom();

        const { map } = this.client.game;
        const me = this.client.me();

        me.updateInterpolate(this.client.game.getInterpolationRatio());

        // filling bg
        ctx.fillStyle = this.colors.background;
        ctx.fillRect(0,0,canvas.w,canvas.h);

        this.renderTiles({x: (-me.render.x + canvas.w / 2) % 50, y: (-me.render.y + canvas.h / 2) % 50});
        
        this.camera.setTranslate({x: -me.render.x + canvas.w / 2, y: -me.render.y + canvas.h / 2});

        this.renderBounds(map);

        // render obstacles with interpolation
        for(let i = 0; i < map.obstacles.length; i++){
            map.obstacles[i].toRender = this.camera.isInsideView(map.obstacles[i]);
            if(map.obstacles[i].toRender === false)continue;
            map.obstacles[i].render = interpolateManager.interpolateObstacle(map.obstacles[i].lastState, map.obstacles[i], /*(performance.now() - map.lastInterpolateTime) **/ this.client.game.getInterpolationRatio(), { map });
        }
        
        this.renderObstacles(map.obstacles.filter(o => o.toRender !== false), map.players, map.self);

        this.renderPlayers(map.players);

        this.renderEditor();

        this.camera.resetTranslate();

        // TODO: uncomment this and make it cached because vinete drawing is really laggy
        // this.renderOverlay(me);
    }
    renderOverlay(me){
        if (me.dead === true){
            this.renderRespawnPrompt();
        }

        this.renderVinette();
    }
    renderRespawnPrompt(){
        ctx.fillStyle = 'white';
        ctx.font = '30px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('R to respawn', canvas.w / 2, canvas.h - 85);
    }
    renderPlayers(players){
        if(this.client.clientType === 'editor' && this.client.playerActive === false){
            // this.client.me().updateInterpolate(this.client.game.getInterpolationRatio());
            return;
        }
        for(let id in players){
            players[id].renderBody(ctx, canvas, this.camera);
        }
    }
    renderObstacles(obstacles, players, player){
        for(let o of obstacles){
            ctx.toStroke = false;
            ctx.toFill = true;
            ctx.toClip = false;

            this.renderGlobal(o, ctx, {canvas, obstacles, players, player, colors: this.colors});

            EffectManager.renderEffect(o, ctx, {canvas, obstacles, players, player, colors: this.colors});
            renderShape(o, ctx, {canvas, obstacles, players, player, colors: this.colors});
            if(EffectManager.renderEffectAfterShapeMap[o.effect] !== undefined){
                EffectManager.renderEffectAfterShape(o, ctx, {canvas, obstacles, players, player, colors: this.colors});
            }

            ctx.globalAlpha = 1;
        }
    }
    renderGlobal(o, ctx, advanced){
        if(o.isGround === false){
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'grey';
            ctx.globalAlpha = 0.2;
            ctx.toStroke = true;
            ctx.toFill = false;
            renderShape(o, ctx, advanced);
            ctx.toStroke = false;
            ctx.toFill = true;
            ctx.globalAlpha = 1;
        }
    }
    renderTiles(tileOffset={x: 0, y: 0}){
        // drawing tiles
        ctx.strokeStyle = this.colors.tile;
        ctx.lineWidth = 2;
    
        for (let x = 0; x < canvas.w+ctx.lineWidth+50; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x+tileOffset.x, 0);
            ctx.lineTo(x+tileOffset.x, canvas.h);
            ctx.stroke();
            ctx.closePath();
        }
    
        for (let y = 0; y < canvas.h+ctx.lineWidth+50; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y+tileOffset.y);
            ctx.lineTo(canvas.w, y+tileOffset.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
    renderBounds(map){
        // out of bounds borders
        ctx.strokeStyle = this.colors.tile;
        ctx.lineWidth = Math.max(canvas.w, canvas.h);
        ctx.strokeRect(-ctx.lineWidth/2, -ctx.lineWidth/2, map.settings.dimensions.x + ctx.lineWidth, map.settings.dimensions.y + ctx.lineWidth);
        ctx.lineWidth = 3;
    }
    updateZoom(){
        if(this.client.clientType !== 'editor' || this.client.playerActive === true || this.zoomDirection === 'neutral'){
            return;
        }
        if(this.zoomDirection === 'in'){
            this.camera.scale(1.014);
        } else {
            this.camera.scale(1 / 1.014);
        }
        if(this.camera.scalar > 5){
            this.camera.setScale(5);
        } else if(this.camera.scalar < 0.2){
            this.camera.setScale(0.2);
        }
    }
    renderEditorObstacles(obstacles, players, player){
        for(let o of obstacles){
            ctx.toStroke = false;
            ctx.toFill = true;
            ctx.toClip = false;

            this.renderGlobal(o, ctx, {canvas, obstacles, players, player, colors: this.colors});
            EffectManager.renderEffect(o, ctx, {canvas, obstacles, players, player, colors: this.colors});

            if(ctx.toFill === false && ctx.toStroke === false || ctx.globalAlpha === 0){
                this.renderEditorObstacleOutline(o, ctx, {canvas, obstacles, players, player, colors: this.colors});
                o.visible = false;
            }

            renderShape(o, ctx, {canvas, obstacles, players, player, colors: this.colors});
            if(EffectManager.renderEffectAfterShapeMap[o.effect] !== undefined){
                EffectManager.renderEffectAfterShape(o, ctx, {canvas, obstacles, players, player, colors: this.colors});
            }

            if(o.visible === false){
                ctx.setLineDash([]);
                ctx.lineCap = 'butt';
            }

            ctx.globalAlpha = 1;
        }
    }
    renderEditorObstacleOutline(o, ctx, advanced){
        ctx.globalAlpha = (Math.sin(performance.now()/300) + 1)/2;
        ctx.toStroke = true;
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 4;
        ctx.setLineDash([15,25]);
        ctx.lineDashOffset = -performance.now() / 25;
        ctx.lineCap = 'round';
    }
    renderEditor(){
        if(this.client.clientType !== 'editor'){
            return;
        }
        // TODO
        // if(this.client.inputHandler.input.zoomin === true){
        //     ctx.translate(canvas.width/2, canvas.height/2);
        //     ctx.scale(1.01, 1.01);
        //     ctx.translate(-canvas.width/2, -canvas.height/2);
        // }
        // if(this.client.inputHandler.input.zoomout === true){
        //     ctx.translate(canvas.width/2, canvas.height/2);
        //     ctx.scale(1 / 1.01, 1 / 1.01);
        //     ctx.translate(-canvas.width/2, -canvas.height/2);
        // }

        // rendering tranparent preview obs
        if(this.client.selectionManager.previewObstacle !== null){
            ctx.globalAlpha = 0.5;
            this.client.selectionManager.previewObstacle.render = this.client.selectionManager.previewObstacle;
            this.renderObstacles([this.client.selectionManager.previewObstacle], this.client.game.players, this.client.map.self);
        }

        // rendering blue outline around selected obstacles
        for(let i = 0; i < this.client.selectionManager.selectedObstacles.length; i++){
            const selectedObstacle = this.client.selectionManager.selectedObstacles[i];
            ctx.toStroke = true;
            ctx.toFill = false;
            ctx.toClip = false;
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 4;
            if(selectedObstacle.visible === false){
                ctx.translate(selectedObstacle.x, selectedObstacle.y);
                ctx.scale((selectedObstacle.difference.x + 8) / selectedObstacle.difference.x, (selectedObstacle.difference.y + 8) / selectedObstacle.difference.y);
                ctx.translate(-selectedObstacle.x, -selectedObstacle.y);
            }

            renderShape(this.client.selectionManager.selectedObstacles[i], ctx, {canvas, obstacles: this.client.game.map.obstacles, players: this.client.game.players, player: this.client.me(), colors: this.colors});

            if(selectedObstacle.visible === false){
                ctx.translate(selectedObstacle.x, selectedObstacle.y);
                ctx.scale(selectedObstacle.difference.x / (selectedObstacle.difference.x + 8), selectedObstacle.difference.y / (selectedObstacle.difference.y + 8));
                ctx.translate(-selectedObstacle.x, -selectedObstacle.y);
            }

            ctx.globalAlpha = 1;
        }

        // rendering selection rect
        const selectionRect = this.client.selectionManager.selectionRect;
        if(selectionRect !== null){
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.rect(selectionRect.start.x, selectionRect.start.y, selectionRect.end.x - selectionRect.start.x, selectionRect.end.y - selectionRect.start.y);
            ctx.globalAlpha = 0.3;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.stroke();
            ctx.closePath();
        }
    }
    renderDisconnectedText(){
        ctx.fillStyle = 'white';
        ctx.font = '40px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('DISCONNECTED', canvas.w - 170, canvas.h - 40);
        // idea: make it bounce around like the dvd logo?
    }
    // SCRAPPED
    // interpolateObstacle(past, future, time/*0 to 1*/, isArray=false){
    //     // TODO: make this modify past and update the time parameter passed in to be a ratio from last time rendered to this time rendered
    //     const interpolatedObstacle = isArray ? [] : {};
    //     for(let key in past){
    //         if(key === 'sat')continue;
    //         if(typeof past[key] === "number") {
    //             // primitive type
    //             interpolatedObstacle[key] = past[key] * (1 - time) + future[key] * time;
    //             // console.log({key, interp: interpolatedObstacle[key], past: past[key], future: future[key]})
    //         } else if(Array.isArray(past[key]) === true){
    //             interpolatedObstacle[key] = [];
    //             for(let i = 0; i < past[key].length; i++){
    //                 interpolatedObstacle[key][i] = this.interpolateObstacle(past[key][i], future[key][i], time, true);
    //             }
    //         } else if(typeof past[key] === "object"){
    //             interpolatedObstacle[key] = this.interpolateObstacle(past[key], future[key], time);
    //         } else {
    //             // primitive type but not a number
    //             interpolatedObstacle[key] = future[key];
    //         }
    //     }
    //     return interpolatedObstacle;
    // }
    hex2rgb(hex){
        return {
            r: parseInt(hex.slice(1,3), 16),
            g: parseInt(hex.slice(3,5), 16),
            b: parseInt(hex.slice(5,7), 16)
        }
    }
    renderVinette(){
        const outer = this.vinette.outer;
        const inner = this.vinette.inner;

        const gradient = ctx.createRadialGradient(
            canvas.w / 2,
            canvas.h / 2,
            outer.size * (canvas.w*Math.sqrt(this.camera.fullscreen.ratio)+canvas.h-100)/2,
            canvas.w / 2,
            canvas.h / 2,
            inner.size * (canvas.w*Math.sqrt(this.camera.fullscreen.ratio)+canvas.h-100)/2
        );
        
        gradient.addColorStop(0,`rgba(${outer.color.r},${outer.color.g},${outer.color.b},${outer.alpha})`);
        gradient.addColorStop(1,`rgba(${inner.color.r},${inner.color.g},${inner.color.b},${inner.alpha})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.w,canvas.h);
    }
    updateState(){
        this.updateVinette();
    }
    updateVinette(){
        const outer = this.vinette.outer;
        const inner = this.vinette.inner;

        // interpolation
        for(let key in outer.interpolate){
            if(key === 'color'){
                outer.color = {
                    r: 0.9  * outer.color.r + 0.1 * outer.interpolate.color.r,
                    g: 0.9 * outer.color.g + 0.1 * outer.interpolate.color.g,
                    b: 0.9 * outer.color.b + 0.1 * outer.interpolate.color.b, 
                }
            } else {
                outer[key] = 0.9 * outer[key] + 0.1 * outer.interpolate[key];
            }
        }
        for(let key in inner.interpolate){
            if(key === 'color'){
                inner.color = {
                    r: 0.9 * inner.color.r + 0.1 * inner.interpolate.color.r,
                    g: 0.9 * inner.color.g + 0.1 * inner.interpolate.color.g,
                    b: 0.9 * inner.color.b + 0.1 * inner.interpolate.color.b, 
                }
            } else {
                inner[key] = 0.9 * inner[key] + 0.1 * inner.interpolate[key];
            }
        }
        
        outer.interpolate = {
            color: {r: 0, g: 0, b: 0},
            size: 1,
            alpha: 0.5
        };
        inner.interpolate = {
            color: {r: 0, g: 0, b: 0},
            size: 0.5,
            alpha: 0
        };
    }
}

class Camera {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.angle = 0;// in radians

        this.fullscreen = {
			ratio: 9 / 16,
			zoom: 1000,
		}

        this.scalar = 1;

        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
        })
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
        ctx.translate(canvas.w / 2, canvas.h / 2);
        ctx.rotate(a);
        this.angle += a;
        ctx.translate(-canvas.w / 2, - canvas.h / 2);
    }
    setRotate(a){
        ctx.translate(canvas.w/2, canvas.h/2)
        ctx.rotate(a - this.angle);
        this.angle = a;
        ctx.translate(-canvas.w/2, -canvas.h/2)
    }
    resetRotate(){
        this.setRotate(0);
    }
    scale(s){
        this.scalar *= s;
        this.resize();
    }
    setScale(s){
        this.scalar = s;
        this.resize();
    }
    resetScale(){
        this.setScale(1);
    }
    resize(){
        const dpi = window.devicePixelRatio;
        canvas.style.width = Math.ceil(window.innerWidth) + 'px';
        canvas.style.height = Math.ceil(window.innerHeight) + 'px';
        canvas.width = Math.ceil(window.innerWidth) * dpi;
        canvas.height = Math.ceil(window.innerHeight) * dpi;
        canvas.zoom = Math.max(canvas.height, canvas.width * this.fullscreen.ratio) / this.fullscreen.zoom * this.scalar;
        // w and h are calced with zoom
        canvas.w = canvas.width / canvas.zoom;
        canvas.h = canvas.height / canvas.zoom;
        // ctx.translate(canvas.width/2, canvas.height/2);
        ctx.scale(canvas.zoom, canvas.zoom);
        // ctx.translate(-canvas.width/2, -canvas.height/2);
        this.angle = 0;
        ctx.lineCap = 'square';
    }
    isInsideView(obstacle){
        if(obstacle.x - obstacle.difference.x/2 > -this.x + canvas.w || obstacle.x + obstacle.difference.x/2 < -this.x) return false;
        if(obstacle.y - obstacle.difference.y/2 > -this.y + canvas.h || obstacle.y + obstacle.difference.y/2 < -this.y) return false;
        return true;
    }
}

function interpolate(start, end, time) {
    return start * (1 - time) + end * time;
}

// if amount is 1/8, then we get 1/8 closer to the target every frame
function expLerp(start, end, amount){
    return start + (end-start)*amount;
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

function mixHex(color1, color2, t){
    const rgb1 = {
        r: parseInt(color1.slice(1,3), 16),
        g: parseInt(color1.slice(3,5), 16),
        b: parseInt(color1.slice(5,7), 16)
    }
    const rgb2 = {
        r: parseInt(color2.slice(1,3), 16),
        g: parseInt(color2.slice(3,5), 16),
        b: parseInt(color2.slice(5,7), 16)
    }
    
    return `rgb(${rgb1.r*(1-t)+rgb2.r*t},${rgb1.g*(1-t)+rgb2.g*t},${rgb1.b*(1-t)+rgb2.b*t})`;
}

function mixRgb(/*{r,g,b}*/color1,color2,t){
    return {
        r: color1.r*(1-t) + color2.r*t,
        g: color1.g*(1-t) + color2.g*t,
        b: color1.b*(1-t) + color2.b*t
    }
}