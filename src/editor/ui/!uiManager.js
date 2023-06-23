import Ref from '../editorRef.js';
import CreateMenuManager from './createMenuManager.js';
import EditMenuManager from './editMenuManager.js';

export default class UIManager {
    constructor(client){
        this.client = client;
    }
    start(){// TODO: add right click to pan around like three.js. This could just involve something like
        this.game = this.client.game;
        this.renderer = this.client.game.renderer;
        this.map = this.client.game.map;

        this.createMenuManager = new CreateMenuManager(this.client);
        this.createMenuManager.start();

        this.editMenuManager = new EditMenuManager(this.client);
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
                // pause the game
                this.client.me().respawn();
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
                // unpause the game
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

        Ref.simulateButton.onclick = () => {
            this.client.simulateActive = !this.client.simulateActive;
            Ref.simulateButton.isPaused = !Ref.simulateButton.isPaused ?? true;
            const button = Ref.simulateButton.querySelector('.menu-button');
            if(Ref.simulateButton.isPaused === true){
                button.innerText = '';
                for(let i = 0; i < 2; i++){
                    const span = document.createElement('span');
                    span.style.margin = '2px';
                    span.style.fontSize = '1.4rem';
                    span.innerText = 'l';
                    button.appendChild(span);
                }
            } else {
                while (button.firstChild) {
                    button.removeChild(button.firstChild);
                }
                button.innerText = '▷';
            }
        }

        // Ref.simulateButton.isPaused = false;
        // Ref.simulateButton.onclick();

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
            if(this.client.selectionManager.previewObstacle !== null){
                this.client.deleteObstacle(this.client.selectionManager.previewObstacle);   
                this.client.selectionManager.previewObstacle = null;
            }
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

        Ref.selectButton.onmousedown = (event) => {
            this.client.selectionManager.transformMode = 'select';
            Ref.selectText.classList.add('red');
            Ref.resizeText.classList.remove('red');
            Ref.rotateText.classList.remove('red');
            this.client.selectionManager.transformResizePointsActive = false;
            this.client.selectionManager.selectedPoints = [];
        }
        Ref.rotateButton.onmousedown = (event) => {
            this.client.selectionManager.transformMode = 'rotate';
            Ref.rotateText.classList.add('red');
            Ref.selectText.classList.remove('red');
            Ref.resizeText.classList.remove('red');
            this.client.selectionManager.transformResizePointsActive = false;
            this.client.selectionManager.selectedPoints = [];
        }
        Ref.resizeButton.onmousedown = (event) => {
            this.client.selectionManager.transformMode = 'resize';
            Ref.resizeText.classList.add('red');
            Ref.rotateText.classList.remove('red');
            Ref.selectText.classList.remove('red');
        }
        Ref.duplicateButton.onmousedown = (event) => {
            this.copy();
            this.paste();
        }
    }
    addInitObstacle(o){
        const deepObstacle = window.structuredCloneWithoutKey({...o, render: undefined, spatialHash: undefined}, ['parentObstacle','resizePoints','parentObject'/*,'inputRef'*/]);
        // const deepObstacle = window.structuredClone({...o, render: undefined, spatialHash: undefined});
        console.log(deepObstacle);

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
                this.client.selectionManager.collisionManager.selectedObstacles = [];
                this.client.selectionManager.collisionManager.selectedObstaclesChanged = true;
            } else {
                if(!Array.isArray(mapData.obstacles)){
                    return;
                }
                for(let i = 0; i < mapData.obstacles.length; i++){
                    if(typeof mapData.obstacles[i] !== 'object'){
                        return;
                    }
                    this.client.addObstacle(mapData.obstacles[i]);
                    this.client.selectionManager.collisionManager.selectedObstacles.push(this.map.obstacles[this.map.obstacles.length-1]);
                }
                this.client.selectionManager.collisionManager.selectedObstaclesChanged = true;
            }
            this.client.selectionManager.scaleManager.selectedPoints = [];
            this.client.selectionManager.collisionManager.transformActive = false;
            this.client.selectionManager.collisionManager.transformActive = false;
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