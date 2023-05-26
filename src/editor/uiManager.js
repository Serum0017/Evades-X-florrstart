import Ref from './editorRef.js';
import addObstacle from './addObstacle.js';

// TODO: decide if any format is needed. Idk if this needs to be a class.

export default class UIManager {
    constructor(client){
        this.client = client;
    }
    start(){
        this.game = this.client.game;
        this.map = this.client.game.map;
        this.defineEventListeners();
    }
    defineEventListeners(){
        // TODO: proper obstacle init. The idea is that we have shared init? <- if not we can define a format using some functions like vv
        /*
            map for effects for example: (effect, simulate, and shape will all be concatenated/ separated in 3 diff headings)
            grav: someFunctionThatOptimizesOrHomoginizesTheDataIntoAStandardFormat({
                force: {x: "number", y: "number", optional: [forceMult: {...}]},
                direction: "number",
                otherDirectionOption: {type: "number", minValue: 5, maxValue: 200, isRequired: true},
                directionKeyFrames: {isArray: true, data: ["number", "number"], minLength: 1, maxLength: Infinity, isRequired: false}
            })
        */
       // this should be the same as map init or very similar so making the directory shared will be challenging but rewarding if possible
       // PRO IDEA FOR SHARED DIRECTORY (adi pro ideas) if(module !== undefined){module.exports = data} else {window.data = data} <- for ss we just require and for cs we just use window!
        Ref.createButton.onclick = () => {
            addObstacle({
                // shape: 'circle',
                // simulate: [ 'normal' ],
                // effect: 'normal',
                // difference: { x: 500, y: 500 },
                // type: 'circle-normal-normal',
                // x: 0,
                // y: 0,
                // r: 250,
                // pivot: { x: 0, y: 0 },
                // rotation: 0,
                // body: {
                //     pos: { x: 0, y: 0 },
                //     r: 250,
                //     offset: { x: 0, y: 0 },
                //     angle: 0
                // }

                // type: 'circle-normal-normal', x: 250, y: 250, r: 100
                type: 'circle-move-coindoor', /*x: 150, y: 150,*/ r: 20, coins: 2, currentPoint: 2, path: [{x: 10, y: 10}, {x: 490, y: 10}, {x: 490, y: 490}, {x: 0, y: 490}], bounciness: 180, speed: 1
            }, this.map)
        }
    }
}