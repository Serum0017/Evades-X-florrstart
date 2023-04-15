// IMPORTANT: make sure to copy any changes made to this map to the server sided satFactory.js
const generateSATMap = {
    square: ({ x,y,w,h }) => {
        return new SAT.Box(new SAT.Vector(x-w/2, y-h/2), w, h).toPolygon();
    },
    circle: ({ x,y,r }) => {
        return new SAT.Circle(new SAT.Vector(x, y), r);
    },
    poly: ({ points }) => {
        return new SAT.Polygon(new SAT.Vector(), [...points.map((p) => new SAT.Vector(p[0], p[1]))]);
    }
};

export default function generateSAT(obstacle){
    return generateSATMap[obstacle.shape](obstacle);
}