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