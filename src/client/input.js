import Utils from './util.js';

const keycodes = {
    KeyW: 'up',
    KeyA: 'left',
    KeyS: 'down',
    KeyD: 'right',
    ArrowUp: 'up',
    ArrowLeft: 'left',
    ArrowDown: 'down',
    ArrowRight: 'right',
    ShiftLeft: 'shift',
    ShiftRight: 'shift',
}

const editorKeyCodes = {
    KeyI: 'zoomin',
    KeyO: 'zoomout',
    Delete: 'delete',
    KeyC: 'copy',
    KeyV: 'paste',
    Digit0: 'toCenter',
    Digit1: 'toCenterAndZoom',
    ControlLeft: 'ctrl',
    ControlRight: 'ctrl'
}

const chatCommandMap = {
    'reset': (handler, { client }) => {
        client.send({changeMap: 'Hub'});
        client.game.lastRequestedMapTime = performance.now();
    },
    'devmodeoN': (handler, { client }) => {
        client.me().dev = !client.me().dev;
    },
    'export': (handler, { client }) => {
        navigator.clipboard.writeText(JSON.stringify({...handler.map.initPack(), players: undefined}));
    }
}

// adding / to all commands
for(let key in chatCommandMap){
    chatCommandMap['/' + key] = chatCommandMap[key];
    delete chatCommandMap[key];
}

export default class InputHandler {
    constructor(client){
        this.client = client;

        this.chatOpen = false;

        this.input = {
            up: false,
            down: false,
            left: false,
            right: false,
            shift: false
        };

        this.mouse = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    }
    start() {
        this.game = this.client.game;
        this.map = this.client.game.map;
        this.renderer = this.client.game.renderer;

        if(this.client.clientType === 'editor'){
            this.startEditor();
        }
        
        window.onkeydown = (e) => this.handleKey(e);
        window.onkeyup = (e) => this.handleKey(e);
        window.onmousemove = (e) => this.handleMouse(e);

        // prevent right click
        window.addEventListener("contextmenu", e => e.preventDefault());

        // make current keys pressed stop if user navigates out of tab
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                for(let key in this.input){
                    this.input[key] = false;
                }
            }
        });
    }
    startEditor(){
        for(let key in editorKeyCodes){
            keycodes[key] = editorKeyCodes[key];
            if(this.input[keycodes[key]] === undefined){
                this.input[keycodes[key]] = false;
            }
        }

        this.editorKeyMap = {
            delete: () => {
                this.client.selectionManager.collisionManager.deleteSelectedObstacles();
            },
            zoomin: (e) => {
                if(e.type === 'keydown'){
                    this.renderer.zoomDirection = 'in';
                } else if(this.renderer.zoomDirection === 'in') {
                    this.renderer.zoomDirection = 'neutral';
                }
            },
            zoomout: (e) => {
                if(e.type === 'keydown'){
                    this.renderer.zoomDirection = 'out';
                } else if(this.renderer.zoomDirection === 'out') {
                    this.renderer.zoomDirection = 'neutral';   
                }
            },
            copy: (e) => {
                if(e.type !== 'keydown' || this.input.ctrl === false){
                    return;
                }
                this.client.selectionManager.copy();
            },
            paste: (e) => {
                if(e.type !== 'keydown' || this.input.ctrl === false){
                    return;
                }
                this.client.selectionManager.paste();
            },
            // a in ctrl a is also the left key. Defined this way to avoid intersections
            /*highlightall*/left: (e) => {
                if(e.type !== 'keydown' || this.input.ctrl === false || this.client.playerActive === true){
                    return;
                }
                this.client.selectionManager.selectAll();
            },
            toCenter: (e) => {
                if(e.type !== 'keydown' || this.input.ctrl === false || this.client.playerActive === true){
                    return;
                }
                this.client.me().x = this.client.game.map.settings.dimensions.x/2;
                this.client.me().y = this.client.game.map.settings.dimensions.y/2;
                return e.preventDefault();
            },
            toCenterAndZoom: (e) => {
                if(e.type !== 'keydown' || this.input.ctrl === false || this.client.playerActive === true){
                    return;
                }
                this.client.me().x = this.client.game.map.settings.dimensions.x/2;
                this.client.me().y = this.client.game.map.settings.dimensions.y/2;
                this.client.game.renderer.camera.setScale(1);
                return e.preventDefault();
            },
        }
    }
    handleKey(e){
        // make sure the user hasn't selected / deselected the chat between inputs
        if(document.activeElement === Utils.ref.chatInput){
            this.chatOpen = true;
        } else {
            this.chatOpen = false;
        }

        // handling enter inputs
        if (e.code === 'Enter' && this.client.clientType !== 'editor') {
            if (this.chatOpen === true && e.type === 'keydown') {
                // send chat message
                Utils.ref.chatDiv.classList.add('hidden');
                const text = Utils.ref.chatInput.value.trim();
                if(text[0] === '/'){
                    for(let key in chatCommandMap){
                        if(text.startsWith(key) === true){
                            chatCommandMap[key](this, { client: this.client });
                            this.chatOpen = false;
                            Utils.ref.chatInput.value = '';
                            Utils.ref.chatInput.blur();
                            return;
                        }
                    }
                }
                this.client.send({chat: text});
                
                this.chatOpen = false;
                Utils.ref.chatInput.value = '';
                Utils.ref.chatInput.blur();

                // reset inputs to prevent ghosting
                for(let key in this.input){
                    this.input[key] = false;
                }
            } else if (e.type === 'keydown') {
                // focus chat
                this.chatOpen = true;
                Utils.ref.chatDiv.classList.remove('hidden');
                Utils.ref.chatInput.focus();
            }
            return;
        }

        // if we're typing, return
        if(this.chatOpen === true)return;

        // if we're not typing and we repeat keys, return
        if (e.repeat && this.chatOpen === false) return e.preventDefault();

        // if player is dead and key is r, respawn
        if (this.map.self.dead === true && e.code === 'KeyR'){
            this.map.self.respawn();
            return e.preventDefault();
        }

        // handling god mode if player is a dev
        if (this.map.self.dev === true && e.code === 'KeyO' && e.type === 'keydown'){
            this.map.self.god = !this.map.self.god;
            this.map.self.dead = false;
            return e.preventDefault();
        }

        // if we're in editor, handle editor key presses as well
        if (this.client.clientType === 'editor'){
            this.handleEditorKey(e);
        }

        // otherwise, set inputs in this.inputs as they're mapped by keycodes
        this.input[keycodes[e.code]] = e.type === 'keydown';

        // send the changed input to be used for player prediction
        this.client.send({input: this.input});// TODO: optimize with bitwise conversion

        this.map.self.input = this.input;
    }
    handleEditorKey(e){
        if(this.editorKeyMap[keycodes[e.code]] !== undefined){
            this.editorKeyMap[keycodes[e.code]](e);
            return;
        }
    }
    handleMouse(e) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
        
        const dY = this.mouse.y - this.client.me().y + this.renderer.camera.y;
        const dX = this.mouse.x - this.client.me().x + this.renderer.camera.x;
        this.client.send({angle: Math.atan2(dY, dX), magnitude: Math.min(300,Math.sqrt(dY**2+dX**2))});
    }
    applyInputs(inputsToApply){
        // re apply inputs to the reset player
        for(let key in this.input){
            inputsToApply[key] = this.input[key];
        }
    }
}