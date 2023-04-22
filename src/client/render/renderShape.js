import Utils from '../util.js';
// body type will basically be solely responsible for drawing the shape
const renderShapeMap = {
    circle: (o, ctx, advanced) => {
        ctx.beginPath();
        ctx.arc(o.render.x, o.render.y, o.r, 0, Math.PI*2);
        fsin(o, ctx, advanced);
        ctx.closePath();
    },
    square: (o, ctx, advanced) => {
        ctx.beginPath();
        ctx.rect(o.render.x-o.w/2,o.render.y-o.h/2,o.w,o.h);
        fsin(o, ctx, advanced);
        ctx.closePath();
    },
    poly: (o, ctx, advanced) => {
        ctx.beginPath();
        ctx.translate(o.render.x - o.x, o.render.y - o.y);
        ctx.moveTo(o.points[0][0], o.points[0][1]);
        for(let i = 1; i < o.points.length; i++){
            ctx.lineTo(o.points[i][0], o.points[i][1]);
        }
        ctx.lineTo(o.points[0][0], o.points[0][1]);
        fsin(o, ctx, advanced);
        ctx.translate(o.x - o.render.x, o.y - o.render.y);
        ctx.closePath();
    }
}

// fill stroke if needed
function fsin(o, ctx, advanced){
    if(ctx.toFill === true)ctx.fill();
    if(ctx.toStroke === true)ctx.stroke();
    if(ctx.toClip === true){
        ctx.save();
        ctx.clip();
    }
}

export default function renderShape(o, ctx, advanced) {
    // no try catch or anything because its SO MUCH SLOWER
    // gl finding the error if you didn't define the render
    renderShapeMap[o.shape](o, ctx, advanced);
}