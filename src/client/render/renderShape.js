// body type will basically be solely responsible for drawing the shape
const renderShapeMap = {
    circle: (o, ctx, advanced) => {
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI*2);
        fsin(ctx);
        ctx.closePath();
    },
    square: (o, ctx, advanced) => {
        if(ctx.toFill === true)ctx.fillRect(o.x-o.w/2,o.y-o.h/2,o.w,o.h);
        if(ctx.toStroke === true)ctx.strokeRect(o.x-o.w/2,o.y-o.h/2,o.w,o.h);
    },
    poly: (o, ctx, advanced) => {
        ctx.beginPath();
        ctx.moveTo(o.points[0][0], o.points[0][1]);
        for(let i = 1; i < o.points.length; i++){
            ctx.lineTo(o.points[i][0], o.points[i][1]);
        }
        ctx.lineTo(o.points[0][0], o.points[0][1]);
        fsin(ctx);
        ctx.closePath();
    }
}

// fill stroke if needed
function fsin(ctx){
    if(ctx.toFill === true)ctx.fill();
    if(ctx.toStroke === true)ctx.stroke();
}

export default function renderShape(o, ctx, advanced) {
    // no try catch or anything because its SO MUCH SLOWER
    // gl finding the error if you didn't define the render
    renderShapeMap[o.shape](o, ctx, advanced);
}