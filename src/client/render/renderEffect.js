// ok basically this file basically renders effects
// wow such insight

// we do different stuff to the canvas for each thing
// effects are mainly rendering effect but they can also do things like setting line dash and such
const renderEffectMap = {
    normal: (o, ctx, {colors}) => {
        ctx.fillStyle = colors.tile;
    },
    bounce: (o, ctx, advanced) => {
        ctx.fillStyle = 'blue';
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
        ctx.globalAlpha = o.strength / o.maxStrength;
    },
}

export default function renderEffect(o, ctx, advanced) {
    // no try catch or anything because its SO MUCH SLOWER
    // gl finding the error if you didn't define the render
    // if(renderEffectMap[o.effect] !== undefined){
        renderEffectMap[o.effect](o, ctx, advanced);
    // } else {
    //     console.log('render effect map not defined for ' + JSON.parse(o));
    // }
}