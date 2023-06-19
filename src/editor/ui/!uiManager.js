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

        Ref.deleteButton.onclick = (event) => {
            this.client.selectionManager.deleteSelectedObstacles();
            this.client.selectionManager.previewObstacle = null;
            event.stopPropagation();
            return event.preventDefault();
        }
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