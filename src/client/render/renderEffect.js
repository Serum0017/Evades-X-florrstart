import Utils from '../util.js';
// ok basically this file basically renders effects
// wow such insight

// we do different stuff to the canvas for each thing
// effects are mainly rendering effect but they can also do things like setting line dash and such
const renderEffectMap = {
    normal: (o, ctx, {colors}) => {
        ctx.fillStyle = colors.tile;
    },
    lava: (o, ctx, advanced) => {
        ctx.fillStyle = '#c70000';
        if (o.solid === false) {
            ctx.fillStyle = '#9e0000';
        }
        ctx.strokeStyle = 'black';
        ctx.toStroke = true;
        ctx.lineWidth = 2;
    },
    bounce: (o, ctx, advanced) => {
        ctx.fillStyle = 'blue';
    },
    coin: (o, ctx, advanced) => {
        ctx.fillStyle = o.color;
        if(o.collected === true){
            ctx.globalAlpha = 0.2;
        } else {
            ctx.globalAlpha = 0.8;
        }
    },
    coindoor: (o, ctx, { colors }) => {
        ctx.fillStyle = colors.tile;
        ctx.globalAlpha = o.coins <= 0 ? 0.5 : 1;
    },
    changeMap: (o, ctx, advanced) => {
        if(o.map === 'Winroom'){
            ctx.fillStyle = `hsl(${Date.now()/12},50%,50%)`;
        } else {
            // rendering acronym
            ctx.font = `${o.difference.x / 3.5}px Inter`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(o.acronym, o.x, o.y - o.difference.y * 3 / 4);

            ctx.toClip = true;
            ctx.toFill = false;
        }
    },
    changeColor: (o, ctx, advanced) => {
        ctx.toFill = false;
    },
    changeSpeed: (o, ctx, advanced) => {
        ctx.fillStyle = '#eba500';
        ctx.globalAlpha = 0.25;
    },
    changeRadius: (o, ctx, advanced) => {
        // ctx.toFill = false;
        ctx.fillStyle = '#1c1852';
        ctx.globalAlpha = 0.1;
    },
    changeFriction: (o, ctx, advanced) => {
        if (o.frictionValue > 0.4){
            ctx.fillStyle = '#0e30ad';
        } else {
            ctx.fillStyle = '#1c1852';
        }
        ctx.globalAlpha = 0.28;
    },
    resetFriction: (o, ctx, advanced) => {
        ctx.fillStyle = 'orange';
        ctx.strokeStyle = 'black';
        ctx.globalAlpha = 0.1;
        ctx.toStroke = true;
    },
    tp: (o, ctx, advanced) => {
        ctx.fillStyle = 'green';
    },
    breakable: (o, ctx, { colors }) => {
        // ui.ctx.fillStyle = ui.colors.tile;// setting fillstyle converts it to hex
        
        // const mix = ui.mixColor('#000000', ui.ctx.fillStyle, 0.1);
        // ui.fcolor(`rgb(${mix[0]},${mix[1]},${mix[2]})`);

        // TODO: decide if there's a better way to do this in init or something -> special init module for cases like this where it only applies client side
        if(colors.tile !== o.lastTileColor){
            o.lastTileColor = colors.tile;
            ctx.fillStyle = colors.tile;// to make it into hex
            o.darkenedTileColor = mixHex('#000000', ctx.fillStyle, 0.5);
        }
        ctx.fillStyle = o.darkenedTileColor;
        ctx.globalAlpha = o.render.strength / o.maxStrength;
    },
    platformer: (o, ctx, { colors }) => {
        ctx.toClip = true;
        ctx.fillStyle = colors.tile;
        ctx.globalAlpha = 0.3;
    },
    conveyor: (o, ctx, { colors }) => {
        ctx.toClip = true;
        ctx.fillStyle = colors.tile;
        ctx.globalAlpha = 0.1;
    },
    rotateMovement: (o, ctx, { colors }) => {
        ctx.strokeStyle = o.axisSpeedMult < 0 ? '#ff6969' : (o.axisSpeedMult > 1 ? '#c5c500' : 'white');
        ctx.setLineDash([15, 25]);
        ctx.lineDashOffset = -performance.now() / 20;
        ctx.lineWidth = 1;
        ctx.toFill = false;
        ctx.toStroke = true;
        ctx.toClip = true;
    },
    restrictAxis: (o, ctx, { colors }) => {
        if(o.axisSpeedMults.x < 0 && o.axisSpeedMults.y < 0){
            ctx.strokeStyle = 'red';
        } else if(o.axisSpeedMults.x < 0 || o.axisSpeedMults.y < 0){
            ctx.strokeStyle = '#ff6969';
        } else if(o.axisSpeedMults.y > 1 || o.axisSpeedMults.y > 1){
            ctx.strokeStyle = '#c5c500';
        } else {
            ctx.strokeStyle = 'white';
        }
        ctx.lineWidth = 1;
        ctx.toFill = false;
        ctx.toStroke = true;
        ctx.toClip = true;
    },
    snapGrid: (o, ctx, { colors }) => {
        ctx.fillStyle = '#00008a';
        ctx.globalAlpha = 0.1;
        ctx.toClip = true;
    }
}

const renderEffectAfterShapeMap = {
    changeMap: (o, ctx, advanced) => {
        if(o.map === 'Winroom')return;

        // Note: if ctx.toClip is specified then a renderEffectAfterShape is required to restore ctx.
        ctx.drawImage(Utils.difficultyImages[o.difficulty], o.x - o.difference.x/2, o.y - o.difference.x/2, o.difference.x, o.difference.y);

        // rendering difficulty number
        if (o.difficultyNumber !== undefined) {
            ctx.fillStyle = 'black';
            const markingY = o.y - o.difference.y/2 + (o.difference.y - 5) * (1 - o.difficultyNumber);
            ctx.fillRect(o.x - o.difference.x/2, markingY, o.difference.x / 5, 5);
        }
        
        ctx.restore();
    },
    coin: (o, ctx, { colors }) => {
        if(o.coinAmount === 1){
            return;
        }
        ctx.fillStyle = colors.tile;//'#313131';
        ctx.font = `${Math.min(20, o.difference.x/4, o.difference.y/4)}px Inter`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            Math.max(0, o.coinAmount),
            o.x,
            o.y
        );
    },
    coindoor: (o, ctx, { colors }) => {
        // render square in the middle saying amount of coins left
        ctx.fillStyle = o.color;
        ctx.beginPath();
        ctx.roundRect(o.x-o.difference.x/4, o.y-o.difference.y/4, o.difference.x/2, o.difference.y/2, Math.min(o.difference.x,o.difference.y)/20);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = colors.tile;//'#313131'//'#484a00';
        ctx.font = `${Math.min(20, o.difference.x/4, o.difference.y/4)}px Inter`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            Math.max(0, o.coins),
            o.x,
            o.y
        );
    },
    platformer: (o, ctx, advanced) => {
        // TODO: optimize with pregeneration
        ctx.globalAlpha = 1;
        for(let x = o.x - o.difference.x/2 + 25; x <= o.x - o.x%50 + 50 + o.difference.x/2 + 25; x += 50){
            for(let y = o.y - o.difference.y/2 + 25; y <= o.y - o.y%50 + 50 + o.difference.y/2 + 25; y += 50){
                ctx.translate(x,y);
                ctx.rotate(o.render.platformerAngle+Math.PI/2);
                ctx.drawImage(Utils.arrowImg, -25, -25, 50, 50);
                ctx.rotate(-o.render.platformerAngle-Math.PI/2);
                ctx.translate(-x,-y);
            }
        }

        ctx.restore();
    },
    conveyor: (o, ctx, advanced) => {
        // TODO: optimize with pregeneration
        ctx.globalAlpha = 1;
        for(let x = o.x - o.difference.x/2 + 25; x <= o.x - o.x%50 + 50 + o.difference.x/2 + 25; x += 50){
            for(let y = o.y - o.difference.y/2 + 25; y <= o.y - o.y%50 + 50 + o.difference.y/2 + 25; y += 50){
                ctx.translate(x,y);
                ctx.rotate(o.render.conveyorAngle+Math.PI/2);
                ctx.drawImage(Utils.arrowImg, -25, -25, 50, 50);
                ctx.rotate(-o.render.conveyorAngle-Math.PI/2);
                ctx.translate(-x,-y);
            }
        }

        ctx.restore();
    },
    rotateMovement: (o, ctx, advanced) => {
        // render grid lines showing axis
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.translate(o.x,o.y);
        ctx.rotate(o.render.rotateMovementAngle);
        o.rotateMovementExpansion = Math.ceil((Math.max(o.difference.x,o.difference.y)**2/Math.sqrt(o.difference.x**2+o.difference.y**2))/50)*50;

        ctx.globalAlpha = o.axisSpeedMult > 1 ? 1 : Math.max(0,1-Math.abs(o.axisSpeedMult));
        
        for(let x = -o.rotateMovementExpansion; x <= o.rotateMovementExpansion; x += 50){
            ctx.moveTo(x,-o.rotateMovementExpansion);
            ctx.lineTo(x,o.rotateMovementExpansion);
        }

        for(let y = -o.rotateMovementExpansion; y <= o.rotateMovementExpansion; y += 50){
            ctx.moveTo(-o.rotateMovementExpansion,y);
            ctx.lineTo(o.rotateMovementExpansion,y);
        }

        ctx.stroke();
        ctx.closePath();
        ctx.rotate(-o.render.rotateMovementAngle);
        ctx.translate(-o.x,-o.y);

        ctx.globalAlpha = 1;

        // render circle showing angle
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.setLineDash([15, 25]);
        
        o.renderCircleSize = Math.min(o.difference.x, o.difference.y)/4;
        if(o.rotateMovementAngle <= Math.PI/2){
            ctx.translate(-o.renderCircleSize, -o.renderCircleSize)
            o.renderCircleSize *= 2;
        }

        ctx.moveTo(o.x, o.y);
        ctx.lineTo(o.x + o.renderCircleSize, o.y);
        ctx.arc(o.x, o.y, o.renderCircleSize, 0, o.rotateMovementAngle);
        
        ctx.lineTo(o.x, o.y);

        ctx.stroke();

        ctx.restore();
        ctx.setLineDash([]);
    },
    restrictAxis: (o, ctx, advanced) => {
        // TODO: check if angle is 0 and if so draw an optimized ver
        
        ctx.translate(o.x, o.y);

        ctx.globalAlpha = o.axisSpeedMults.x > 1 ? 0.8 : (Math.max(0.3,(o.axisSpeedMults.x > 0)-o.axisSpeedMults.x));
        ctx.strokeStyle = o.axisSpeedMults.x < 0 ? 'red' : (o.axisSpeedMults.x > 1 ? '#c5c500' : 'white');

        ctx.beginPath();
        for(let x = -o.difference.x/2; x <= o.difference.x/2; x += 50){
            ctx.moveTo(x,-o.difference.y/2);
            ctx.lineTo(x,o.difference.y/2);
        }
        ctx.stroke();
        ctx.closePath();

        ctx.globalAlpha = o.axisSpeedMults.y > 1 ? 0.8 : (Math.max(0.3,(o.axisSpeedMults.y > 0)-o.axisSpeedMults.y));
        ctx.strokeStyle = o.axisSpeedMults.y < 0 ? 'red' : (o.axisSpeedMults.y > 1 ? '#c5c500' : 'white');

        ctx.beginPath();
        for(let y = -o.difference.y/2; y <= o.difference.y/2; y += 50){
            ctx.moveTo(-o.difference.x/2,y);
            ctx.lineTo(o.difference.x/2,y);
        }
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    },
    snapGrid: (o, ctx, { player }) => {
        ctx.strokeStyle = mixHex('#0f0000', '#000000', Math.max(0,o.render.snapCooldown) / o.maxSnapCooldown);
        ctx.globalAlpha = 0.25;
        ctx.translate(o.x, o.y);

        o.snapRotateMovementExpansion = {
            base: (Math.max(o.difference.x,o.difference.y)**2/Math.sqrt(o.difference.x**2+o.difference.y**2))
        }
        o.snapRotateMovementExpansion.x = Math.ceil(o.snapRotateMovementExpansion.base/o.snapDistance.x)*o.snapDistance.x
        o.snapRotateMovementExpansion.y = Math.ceil(o.snapRotateMovementExpansion.base/o.snapDistance.y)*o.snapDistance.y

        ctx.rotate(o.render.snapAngle);

        ctx.translate(o.x%50,o.y%50);

        let renderPath = new Path2D();
        for(let x = -o.snapRotateMovementExpansion.x; x <= o.snapRotateMovementExpansion.x; x += o.snapDistance.x){
            renderPath.rect(-5 + x, -o.snapRotateMovementExpansion.x - 5, 10, 2 * o.snapRotateMovementExpansion.x + 10);
            // ctx.moveTo(x,-o.snapRotateMovementExpansion);
            // ctx.lineTo(x,o.snapRotateMovementExpansion);
        }
        for(let y = -o.snapRotateMovementExpansion.y; y <= o.snapRotateMovementExpansion.y; y += o.snapDistance.y){
            renderPath.rect(-o.snapRotateMovementExpansion.y - 5, -5 + y, 2 * o.snapRotateMovementExpansion.y + 10, 10);
            // ctx.moveTo(-o.snapRotateMovementExpansion,y);
            // ctx.lineTo(o.snapRotateMovementExpansion,y);
        }
        ctx.stroke(renderPath);
        ctx.closePath();

        // ctx.translate(-o.x%50,-o.y%50);
        // ctx.rotate(-o.render.snapAngle);
        // ctx.translate(-o.x, -o.y);

        // ctx.translate(o.x,o.y);
        // ctx.rotate(o.render.snapAngle);
        // ctx.translate(o.x%50,o.y%50);
        
        // drawing snapMagnitude indicator
        if(player.x + o.snapMagnitude < o.x - o.difference.x/2 || player.x - o.snapMagnitude > o.x + o.difference.x/2 || player.y + o.snapMagnitude < o.y - o.difference.y/2 || player.y - o.snapMagnitude > o.y + o.difference.y/2){
            ctx.restore();
            return;
        }
        ctx.strokeStyle = 'grey';
        ctx.fillStyle = 'black';
        ctx.globalAlpha = 0.22;
        ctx.beginPath();

        ctx.clip(renderPath);

        ctx.translate(-o.x%50,-o.y%50);
        ctx.rotate(-o.render.snapAngle);
        ctx.translate(-o.x,-o.y);

        ctx.arc(player.x, player.y, o.snapMagnitude, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
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

function testPoint({x,y}, ctx){
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(x,y,10,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function testRect({x,y,w,h}, ctx){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x,y,w,h);
    ctx.closePath();
}

function renderEffect(o, ctx, advanced) {
    // no try catch or anything because its SO MUCH SLOWER
    // gl finding the error if you didn't define the render
    // if(renderEffectMap[o.effect] !== undefined){
        renderEffectMap[o.effect](o, ctx, advanced);
    // } else {
    //     console.log('render effect map not defined for ' + JSON.parse(o));
    // }
}

function renderEffectAfterShape(o, ctx, advanced) {
    renderEffectAfterShapeMap[o.effect](o, ctx, advanced);
}

export default {renderEffect, renderEffectAfterShapeMap, renderEffectAfterShape}