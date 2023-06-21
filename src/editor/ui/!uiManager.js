import Ref from '../editorRef.js';
import createMenuManager from './createMenuManager.js';
import editMenuManager from './editMenuManager.js';

export default class UIManager {
    constructor(client){
        this.client = client;
    }
    start(){// TODO: add right click to pan around like three.js. This could just involve something like
        this.game = this.client.game;
        this.renderer = this.client.game.renderer;
        this.map = this.client.game.map;

        this.createMenuManager = new createMenuManager(this.client);
        this.createMenuManager.start();

        this.editMenuManager = new editMenuManager(this.client);
        this.editMenuManager.start();

        this.defineEventListeners();
    }
    defineEventListeners(){
        this.client.me().god = true;
        Ref.playButton.onclick = () => {
            this.client.playerActive = !this.client.playerActive;
            Ref.playButton.isPaused = !Ref.playButton.isPaused ?? true;
            const button = Ref.playButton.querySelector('.menu-button');
            const buttonText = Ref.playButton.querySelector('.menu-button-text');
            if(Ref.playButton.isPaused === true){
                this.client.me().respawn();// TODO: reset camera also when we get zooming working
                this.client.me().god = false;
                this.client.selectionManager.enterPlayMode();
                button.innerText = '';
                buttonText.innerText = 'Pause';
                for(let i = 0; i < 2; i++){
                    const span = document.createElement('span');
                    span.style.margin = '2px';
                    span.style.fontSize = '1.4rem';
                    span.innerText = 'l';
                    button.appendChild(span);
                }
                this.hideMenuUnlessHover();
                this.renderer.lastCamera = window.structuredClone(this.renderer.camera);
                this.renderer.camera.setScale(1);
            } else {
                if(this.renderer.lastCamera !== undefined){
                    this.renderer.camera.setScale(this.renderer.lastCamera.scalar);
                    this.renderer.camera.setRotate(this.renderer.lastCamera.rotation);
                    delete this.renderer.lastCamera;
                }
                this.client.me.dead = false;
                this.client.me().god = true;
                this.client.selectionManager.exitPlayMode();
                buttonText.innerText = 'Play';
                while (button.firstChild) {
                    button.removeChild(button.firstChild);
                }
                button.innerText = '▶';
                this.showMenu();
            }
        }

        Ref.canvas.onwheel = (e) => {
            this.renderer.camera.scale(1 - e.deltaY/2000);
            if(this.renderer.camera.scalar > 5){
                this.renderer.camera.setScale(5);
            } else if(this.renderer.camera.scalar < 0.2){
                this.renderer.camera.setScale(0.2);
            }
        };

        Ref.deleteButton.onclick = (event) => {
            this.client.selectionManager.deleteSelectedObstacles();
            this.client.selectionManager.previewObstacle = null;
            event.stopPropagation();
            return event.preventDefault();
        }

        this.mapInitData = {};
        this.mapInitId = 0;
        Ref.resyncButton.onclick = (event) => {
            this.importMap(this.exportMap());
        }

        Ref.importButton.onclick = (event) => {
            navigator.clipboard.readText()
                .then((clipboardText) => {
                    const toOverride = confirm('Override data? (OK) or add to existing (CANCEL)');
                    this.importMap(clipboardText, toOverride);
                })
                .catch((e) => {
                    console.error('Failed to read clipboard contents! ', e);
                    return;
                });
            
        }

        Ref.exportButton.onclick = (event) => {
            // copy JSON.stringify(this.mapInitData) to clipboard
            navigator.clipboard.writeText(this.exportMap());
        }
    }
    addInitObstacle(o){
        const deepObstacle = window.structuredCloneWithoutKey({...o, render: undefined, spatialHash: undefined}, ['_parentObstacle','resizePoints','inputRef']);

        o.mapInitId = this.mapInitId++;
        this.mapInitData[o.mapInitId] = deepObstacle;
    }
    updateInitObstacle(o){
        this.deleteInitObstacle(o);
        this.addInitObstacle(o);
    }
    deleteInitObstacle(o){
        delete this.mapInitData[o.mapInitId];
        delete o.mapInitId;
    }
    refreshMapInit(obstacles){
        this.mapInitData = {};
        this.mapInitId = 0;
        for(let i = 0; i < obstacles.length; i++){
            delete obstacles[i].mapInitId;
            this.client.initObstacle(obstacles[i]);
        }
    }

    importMap(mapText, toOverride=true){
        try {
            this.client.selectionManager.selectedObstacles = [];
            const mapData = JSON.parse(mapText);
            if(toOverride === true){
                mapData.selfId = this.map.selfId;
                this.map.init(mapData);
                this.refreshMapInit(this.map.obstacles);
                this.client.selectionManager.selectedObstacles = [];
            } else {
                if(!Array.isArray(mapData.obstacles)){
                    return;
                }
                for(let i = 0; i < mapData.obstacles.length; i++){
                    if(typeof mapData.obstacles[i] !== 'object'){
                        return;
                    }
                    this.client.addObstacle(mapData.obstacles[i]);
                    this.client.selectionManager.selectedObstacles.push(this.map.obstacles[this.map.obstacles.length-1]);
                }
                this.client.selectionManager.selectedObstacles = this.client.selectionManager.selectedObstacles;
            }
            this.client.selectionManager.selectedResizePoints = [];
            this.client.selectionManager.transformActive = false;
            this.client.selectionManager.transformResizePointsActive = false;
        } catch(e){
            console.error('Map importing error! ', e);
            console.warn('here is happy face to make you feel better :D');
            return;
        }
    }
    exportMap(){
        return JSON.stringify({...this.map.initPack(), players: undefined, obstacles: Object.values(this.mapInitData)});
    }

    hideMenuUnlessHover(){
        // Ref.allGui.classList.add('hidden');
        // window.addEventListener("mousemove", this.hideMenuUnlessHoverEventListener);
        Ref.allGui.addEventListener("mouseenter", this.hideMenuMouseEnter);
        Ref.allGui.addEventListener("mouseleave", this.hideMenuMouseLeave);
    }
    hideMenuMouseLeave(event) {
        Ref.allGui.style.opacity = "0";
        Ref.allGui.animate([
            { opacity: "1" },
            { opacity: "0" },
        ], {duration: 120})
    }
    hideMenuMouseEnter(event) {
        Ref.allGui.style.opacity = "1";
        Ref.allGui.animate([
            { opacity: "0" },
            { opacity: "1" },
        ], {duration: 120})
    }
    showMenu(){
        Ref.allGui.removeEventListener("mouseenter", this.hideMenuMouseEnter);
        Ref.allGui.removeEventListener("mouseleave", this.hideMenuMouseLeave);
    }
    // defineEventListeners(){
    //     // TODO: proper obstacle init. The idea is that we have shared init? <- if not we can define a format using some functions like vv
    //     /*
    //         map for effects for example: (effect, simulate, and shape will all be concatenated/ separated in 3 diff headings)
    //         grav: someFunctionThatOptimizesOrHomoginizesTheDataIntoAStandardFormat({
    //             force: {x: "number", y: "number", optional: [forceMult: {...}]},
    //             direction: "number",
    //             otherDirectionOption: {type: "number", minValue: 5, maxValue: 200, isRequired: true},
    //             directionKeyFrames: {isArray: true, data: ["number", "number"], minLength: 1, maxLength: Infinity, isRequired: false}
    //         })
    //     */
    //    // this should be the same as map init or very similar so making the directory shared will be challenging but rewarding if possible
    //    // PRO IDEA FOR SHARED DIRECTORY (adi pro ideas) if(module !== undefined){module.exports = data} else {window.data = data} <- for ss we just require and for cs we just use window!
        
    // }
}