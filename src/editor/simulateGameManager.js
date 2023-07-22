import Ref from './editorRef.js';

export default class SimulateGameManager {
    constructor(client){
        this.client = client;
    }
    start(){
        this.game = this.client.game;
        this.renderer = this.client.game.renderer;
        this.map = this.client.game.map;
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
                this.enterPlayMode();
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
                this.client.me().dead = false;
                this.client.me().god = true;
                this.exitPlayMode();
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

        Ref.canvas.onwheel = (e) => {
            this.renderer.camera.scale(1 - e.deltaY/2000);
            if(this.renderer.camera.scalar > 5){
                this.renderer.camera.setScale(5);
            } else if(this.renderer.camera.scalar < 0.2){
                this.renderer.camera.setScale(0.2);
            }
        };

        Ref.clearButton.onclick = (e) => {
            while(this.map.obstacles.length > 0){
                this.map.removeObstacle(0);
            }
        }
    }
    enterPlayMode(){
        this.client.game.renderer.lastRenderScale = this.client.game.renderer.renderScale;
        this.client.game.renderer.renderScale = 1;
    }

    exitPlayMode(){
        this.client.game.renderer.renderScale = this.client.game.renderer.lastRenderScale;

        for(let i = 0; i < this.map.obstacles.length; i++){
            if(this.map.obstacles[i].parametersToReset !== undefined){
                this.map.resetObstacleParameters(this.map.obstacles[i], this.map.obstacles[i].parametersToReset);
            }
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
}