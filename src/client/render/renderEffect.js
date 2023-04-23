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
            ctx.fillText(o.acronym, o.x, o.top.y - o.difference.y / 4);

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
    breakable: (o, ctx, advanced) => {
        // ui.ctx.fillStyle = ui.colors.tile;// setting fillstyle converts it to hex
        
        // const mix = ui.mixColor('#000000', ui.ctx.fillStyle, 0.1);
        // ui.fcolor(`rgb(${mix[0]},${mix[1]},${mix[2]})`);
        ctx.fillStyle = 'black';// TODO: find the actual colors of bounce, tp, and breakable from semioldevade
        ctx.globalAlpha = o.render.strength / o.maxStrength;
    },
}

const renderEffectAfterShapeMap = {
    changeMap: (o, ctx, advanced) => {
        if(o.map === 'Winroom')return;

        // Note: if ctx.toClip is specified then a renderEffectAfterShape is required to restore ctx.
        ctx.drawImage(Utils.difficultyImages[o.difficulty], o.top.x, o.top.y, o.bottom.x-o.top.x, o.bottom.y-o.top.y);

        // rendering difficulty number
        if (o.difficultyNumber !== undefined) {
            ctx.fillStyle = 'black';
            const markingY = o.top.y + (o.difference.y - 5) * (1 - o.difficultyNumber);
            ctx.fillRect(o.top.x, markingY, o.difference.x / 5, 5);
        }
        
        ctx.restore();
    },
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