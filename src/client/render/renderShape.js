import Utils from '../util.js';
// body type will basically be solely responsible for drawing the shape
const renderShapeMap = {
    circle: (o, ctx, advanced) => {
        ctx.beginPath();
        ctx.arc(o.render.x, o.render.y, o.r, 0, Math.PI*2);
        fsin(o, ctx, advanced);
        ctx.closePath();

        if(o.simulate === 'rotate'){
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(o.pivot.x, o.pivot.y, 10, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
    },
    square: (o, ctx, advanced) => {
        ctx.beginPath();
        rotateAngle(ctx, o.render.rotation, o.pivot);
        ctx.rect(o.render.x-o.difference.x/2,o.render.y-o.difference.y/2,o.w,o.h);
        fsin(o, ctx, advanced);
        rotateAngle(ctx, -o.render.rotation, o.pivot);
        ctx.closePath();

        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(o.body.calcPoints[0].x, o.body.calcPoints[0].y, o.w, o.h);
    },
    poly: (o, ctx, advanced) => {
        // drawing body
        ctx.beginPath();
        ctx.translate(o.render.x - o.x, o.render.y - o.y);
        ctx.moveTo(o.body.calcPoints[0].x, o.body.calcPoints[0].y);
        for(let i = 1; i < o.body.calcPoints.length; i++){
            ctx.lineTo(o.body.calcPoints[i].x, o.body.calcPoints[i].y);
        }
        ctx.lineTo(o.body.calcPoints[0].x, o.body.calcPoints[0].y);
        fsin(o, ctx, advanced);
        ctx.translate(o.x - o.render.x, o.y - o.render.y)
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

function rotateAngle(ctx, angle, {x, y}){
    if(angle !== 0){
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x,-y);
    }
}

export default function renderShape(o, ctx, advanced) {
    // no try catch or anything because its SO MUCH SLOWER
    // gl finding the error if you didn't define the render
    renderShapeMap[o.shape](o, ctx, advanced);
}