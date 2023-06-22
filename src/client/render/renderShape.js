import Utils from '../util.js';
// body type will basically be solely responsible for drawing the shape
const renderShapeMap = {
    circle: (o, ctx, advanced) => {
        ctx.beginPath();
        ctx.arc(o.render.x, o.render.y, o.r, 0, Math.PI*2);
        fsin(o, ctx, advanced);
        ctx.closePath();

        testRect({x: o.x - o.difference.x/2, y: o.y - o.difference.y/2, w: o.difference.x, h:o.difference.y}, ctx);
        testPoint(o.pivot, ctx);
    },
    poly: (o, ctx, advanced) => {
        // if(o.renderFlag !== undefined){
        //     renderShapeMap[o.renderFlag](o, ctx, advanced);
        //     return;
        // }
        if(o.renderFlag === 'oval'){
            renderShapeMap.oval(o, ctx, advanced);
            return;
        }
        // drawing body

        // TODO: uncomment and fix this (idk why but they dont un-offset after this)
        // ctx.translate(o.render.x - o.x, o.render.y - o.y);
        ctx.beginPath();
        
        ctx.moveTo(o.body.calcPoints[0].x + o.body.pos.x, o.body.calcPoints[0].y + o.body.pos.y);
        for(let i = 1; i < o.body.calcPoints.length; i++){
            ctx.lineTo(o.body.calcPoints[i].x + o.body.pos.x, o.body.calcPoints[i].y + o.body.pos.y);
        }
        ctx.lineTo(o.body.calcPoints[0].x + o.body.pos.x, o.body.calcPoints[0].y + o.body.pos.y);
        fsin(o, ctx, advanced);
        
        ctx.closePath();

        testRect({x: o.x - o.difference.x/2, y: o.y - o.difference.y/2, w: o.difference.x, h:o.difference.y}, ctx);
        testPoint(o.pivot, ctx);
        // ctx.translate(o.x - o.render.x, o.y - o.render.y);
    },
    // TODO
    // square: (o, ctx, advanced) => {
    //     ctx.save();
    //     ctx.translate(o.body.pos.x + o.difference.x/2, o.body.pos.y + o.difference.y/2);
    //     ctx.rotate(o.render.rotation);

    //     ctx.beginPath();
    //     // remember to add back in + o.render.y - o.y
        
    //     ctx.rect(-o.w/2, -o.h/2, o.w, o.h);
    //     fsin(o, ctx, advanced);
        
    //     ctx.closePath();

    //     ctx.restore();
    //     // ctx.rotate(-o.render.rotation);
    //     // ctx.translate(-o.body.calcPoints[0].x - o.body.pos.x - o.difference.x/2, -o.body.calcPoints[0].y - o.body.pos.y - o.difference.x/2);
    // },
    oval: (o, ctx, advanced) => {
        ctx.beginPath();
        ctx.ellipse(o.render.x, o.render.y, o.rw, o.rh, o.render.rotation, 0, Math.PI*2);
        fsin(o, ctx, advanced);
        ctx.closePath();
        
        testRect({x: o.x - o.difference.x/2, y: o.y - o.difference.y/2, w: o.difference.x, h:o.difference.y}, ctx);
        testPoint(o.pivot, ctx);
    },
    text: (o, ctx, advanced) => {
        // renderShapeMap.poly(o, ctx, advanced);

        ctx.translate(o.body.pos.x + o.render.x - o.x + o.body.calcPoints[0].x, o.body.pos.y + o.render.y - o.y + o.body.calcPoints[0].y);

        ctx.font = `${o.fontSize}px Inter`;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.rotate(o.render.rotation);

        if(ctx.toFill === true)ctx.fillText(o.text, 0, 0);
        if(ctx.toStroke === true)ctx.strokeText(o.text, 0, 0);

        ctx.rotate(-o.render.rotation);

        ctx.translate(-o.body.pos.x - o.render.x + o.x - o.body.calcPoints[0].x, -o.body.pos.y - o.render.y + o.y - o.body.calcPoints[0].y)

        // // bounding box is the best we can do
        if(ctx.toClip === true){
            ctx.save();
            // ctx.translate(o.render.x - o.x, o.render.y - o.y);
            ctx.beginPath();
            renderShapeMap.poly(o, ctx, advanced);
            ctx.clip();
            // ctx.fill();
        }

        testRect({x: o.x - o.difference.x/2, y: o.y - o.difference.y/2, w: o.difference.x, h:o.difference.y}, ctx);
        testPoint(o.pivot, ctx);
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
    if(angle === 0){
        return;
    }
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.translate(-x,-y);
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

export default function renderShape(o, ctx, advanced) {
    // no try catch or anything because its SO MUCH SLOWER
    // gl finding the error if you didn't define the render
    renderShapeMap[o.shape](o, ctx, advanced);
}