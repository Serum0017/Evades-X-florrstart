import Ref from '../editorRef.js';

// right side menu that can be used to edit obstacles and their parameters after they have been placed
export default class editMenuManager {
    constructor(client){
        this.client = client;
    }
    start(){
        this.selectionManager = this.client.selectionManager;

        this.defineObstaclePropertyMap();

        this.defineEventListeners();
    }
    defineEventListeners(){
        Ref.toggleGui.isOpen = false;
        Ref.toggleGui.onclick = (event) => {
            Ref.toggleGui.isOpen = !Ref.toggleGui.isOpen;
            if(Ref.toggleGui.isOpen === true){
                Ref.toggleGui.innerText = 'Close Menu';
                Ref.toggleGui.dataset.usage = 'on';
                Ref.gui.classList.remove('hidden');
                Ref.guiContainer.classList.add('gui-on');
                this.reloadMenu();
            } else {
                Ref.toggleGui.innerText = 'Open Menu';
                Ref.toggleGui.dataset.usage = 'off';
                Ref.gui.classList.add('hidden');
                Ref.guiContainer.classList.remove('gui-on');
            }
            event.preventDefault();
        }
    }
    defineObstaclePropertyMap(){
        this.id = 0;
        this.obstaclePropertyMap = {
            string: (key, value, {input, property, obstacle}) => {
                if(typeConverter.toHex(value, 'notahex') !== 'notahex'){
                    this.obstaclePropertyMap.color(key, value, {input, property, obstacle});
                    return;
                }

                input.classList.add('property-text-input');
                property.appendChild(input);
            },
            boolean: (key, value, {input, property, obstacle}) => {
                // this code is really spaghetti. Come back here in like a year
                // when i actually know how to write proper css and fix this mess
                // also take a look at the styles, specifically the slider::before mess
                input.checked = value;

                const label = document.createElement('label');
                label.classList.add('switch');
                label.classList.add('property-checkbox-input');
                label.appendChild(input);

                const span = document.createElement('span');
                span.classList.add('slider');
                if(input.checked == true){
                    span.classList.add('inputChecked'); 
                }
                label.appendChild(span);

                property.addEventListener('mousedown', (event) => {
                    event.preventDefault();
                    input.checked = !input.checked;
                    obstacle[key] = input.checked;
                    if(input.checked == true){
                        span.classList.add('inputChecked'); 
                    } else {
                        span.classList.remove('inputChecked');
                    }
                    this.regenerateObstacle(obstacle);
                });

                property.appendChild(label);
            },
            object: (key, subObject, {input, property, obstacle}) => {
                if(obstacle._parentObstacle !== undefined){
                    // for nested objects
                    subObject._parentObstacle = obstacle._parentObstacle;
                    subObject._parentKeyChain = [...obstacle._parentKeyChain, key];
                } else {
                    subObject._parentObstacle = obstacle;
                    subObject._parentKeyChain = [key];
                }
                property.appendChild(this.createObstacleProperties(subObject, key));
            },
            color: (key, value, {input, property, obstacle}) => {
                input.classList.add('property-color-input');
                input.type = 'color';

                input.id = this.generateId();
                
                const text = document.createTextNode(input.value);
                text.nodeValue = input.value;

                const label = document.createElement('label');
                label.classList.add('color-label');
                label.style.background = input.value;
                label.htmlFor = input.id;
                label.appendChild(input);
                label.appendChild(text);

                input.addEventListener('input', () => {
                    text.nodeValue = input.value;
                    label.style.background = input.value;
                });
                
                property.appendChild(label);
            },
            options: (key, value, {input, property, obstacle}) => {
                // unused ... for now
                input.classList.add('property-option-input');
                
                let first = false;
                let arr = value;
                if (!Array.isArray(arr) && obProp != null) {
                    arr = obProp.value.slice(1);
                }
                arr.forEach((data) => {
                    if (!first) {
                        first = true;
                        return; // skips first index because thats the default
                    }
                    const option = document.createElement('option');
                    option.value = data;
                    option.classList.add('select-items');
                    option.innerText = data;
                    input.appendChild(option);
                });
                property.appendChild(input);
            }
        }

        this.excludedProps = [
            'shape','simulate','effect','difference','type','pivot','body','render','lastState','toRender','parametersToReset','renderFlag','timeRemain','xv','yv','_properties','editorPropertyReferences',
            'hashId','hashPositions','lastCollidedTime','specialKeyNames','spatialHash','snapCooldown','snapToShowVelocity','interpolatePlayerData','difficultyNumber','map','acronym','isEditorProperties',
            '_parentKeyChain','_parentObstacle','_inputRef','visible','renderCircleSize','snapRotateMovementExpansion','rotateMovementExpansion','mapInitId'
        ];
        this.excludedProperties = {};
        for(let i = 0; i < this.excludedProps.length; i++){
            this.excludedProperties[this.excludedProps[i]] = true;
        }
        delete this.excludedProps;
        this.editorProperties = [{object: this.client.selectionManager, key: 'snapDistance'}, {object: this.client.selectionManager, key: 'toSnap'}, {object: this.client.game.map.settings.dimensions, key: 'x', keyName: 'map width'}, {object: this.client.game.map.settings.dimensions, key: 'y', keyName: 'map height'}/*, {object: window, key: 'isFullScreen', keyName: 'toggle full screen'}*/];
    }
    reloadMenu(){
        while(Ref.gui.firstChild){
            Ref.gui.removeChild(Ref.gui.firstChild);
        }
        Ref.gui.appendChild(this.createEditorProperties());
        for(let i = 0; i < this.selectionManager.selectedObstacles.length; i++){
            Ref.gui.appendChild(this.createObstacleProperties(this.selectionManager.selectedObstacles[i]));
        }
    }
    createEditorProperties(){
        const obstacle = {editorPropertyReferences: {}, specialKeyNames: {}, isEditorProperties: true};
        for(let i = 0; i < this.editorProperties.length; i++){
            obstacle[this.editorProperties[i].key] = this.editorProperties[i].object[this.editorProperties[i].key];
            obstacle.editorPropertyReferences[this.editorProperties[i].key] = this.editorProperties[i].object;
            if(this.editorProperties[i].keyName !== undefined){
                obstacle.specialKeyNames[this.editorProperties[i].key] = this.editorProperties[i].keyName;
            }
        }
        return this.createObstacleProperties(obstacle, 'Editor Settings');
    }
    createFolder(folderName){
        const folder = document.createElement('div');
        folder.classList.add('folder');

        const folderButton = document.createElement('button');
        folderButton.classList.add('folder-button');
        folderButton.addEventListener('mousedown', (event) =>
            this.clickFolder(event, folderButton.parentElement)
        );
        folderButton.isOpen = false;
        
        folder.folderName = folderName;
        folderButton.innerHTML = '<span class="or">▸</span>&nbsp;' + folder.folderName;
        folder.appendChild(folderButton);

        const folderContent = document.createElement('div');
        folderContent.classList.add('folder-content');
        folder.appendChild(folderContent);

        return folder;
    }
    createObstacleProperties(obstacle, folderName=[obstacle.shape, obstacle.simulate.join('-'), obstacle.effect].map(s => s[0].toUpperCase() + s.slice(1)).join(' ')) {
        const folder = this.createFolder(folderName);
        const folderContent = folder.getElementsByClassName('folder-content')[0];

        for(let key in obstacle){
            if(this.excludedProperties[key] === true){
                continue;
            }
            folderContent.appendChild(this.createObstacleProperty(obstacle, key, obstacle[key]));
        }

        for(let i = 0; i < folderContent.children.length; i++){
            folderContent.children[i].classList.add('hidden');
        }
        
        return folder;
    }
    createObstacleProperty(obstacle, key, value){
        const property = document.createElement('div');
        property.classList.add('property');
        property.classList.add('text');

        if(typeof value !== 'object'){
            const propName = document.createElement('span');
            propName.classList.add('property-name');
            if(obstacle.specialKeyNames !== undefined){
                propName.innerText = this.formatName(obstacle.specialKeyNames[key] ?? key);
            } else {
                propName.innerText = this.formatName(key);
            }
            property.appendChild(propName);
        }
        

        const input = document.createElement('input');
        input.maxLength = 500;
        input.spellcheck = 'false';
        input.value = value;
        obstacle._inputRef = input;

        if(obstacle._properties === undefined){
            obstacle._properties = {};
        }
        obstacle._properties[key] = value;
        Object.defineProperty(obstacle, key, {
            set(value) {
                obstacle._properties[key] = value;
                input.value = value;
            },
            get() {
                return obstacle._properties[key];
            },
            enumerable: true,
            configurable: true,
        });

        input.oninput = ((event) => {
            const targetValue = typeof obstacle[key] === 'number' ? parseFloat(event.target.value) : event.target.value;

            // preventing invalid inputs from resetting back to default
            if(typeof obstacle[key] === 'number' || typeof obstacle[key] === 'string'){
                if(window.initObstacle({...obstacle, [key]: targetValue})[key] !== targetValue){
                    return;
                }
                if(typeof obstacle[key] === 'number' && targetValue.toString() !== event.target.value){
                    return;
                }
            }

            obstacle[key] = targetValue;
            if(obstacle._parentObstacle !== undefined){
                applyToKeyChain(obstacle._parentObstacle, obstacle._parentKeyChain, obstacle);
                this.regenerateObstacle(obstacle._parentObstacle);
            } else {
                this.regenerateObstacle(obstacle);
            }
        }).bind(this);

        // running the configuration function hashmap
        if(this.obstaclePropertyMap[typeof value] !== undefined){
            this.obstaclePropertyMap[typeof value](key, value, {input, property, obstacle});
        } else {
            input.classList.add('property-text-input');
            property.appendChild(input);
        }

        if(typeof value === 'object'){
            property.style.height = 'auto';
        }

        return property;
    }
    regenerateObstacle(obstacle, isRegeneratable=obstacle.isEditorProperties===undefined) {
        if(isRegeneratable === false){
            this.regenerateMapProperty(obstacle);
            return;
        }
        obstacle.shape = obstacle.renderFlag ?? obstacle.shape;
        const newObstacle = window.initObstacle(obstacle);
        for(let key in newObstacle){
            if(key === 'spatialHash')continue;
            obstacle[key] = newObstacle[key];
            if(typeof newObstacle[key] === 'object' && this.excludedProperties[key] !== true){
                this.regenerateGettersAndSetters(newObstacle[key]);
            }
        }
        this.client.uiManager.updateInitObstacle(obstacle);
    }
    regenerateGettersAndSetters(obstacle){
        // when sub-obstacles are regenerated, they lose all of their getters and setters... we need to refresh those
        if(obstacle._properties === undefined){
            obstacle._properties = {};
        }
        for(let key in obstacle){
            if(this.excludedProperties[key] === true){
                continue;
            }
            obstacle._properties[key] = obstacle[key];
            Object.defineProperty(obstacle, key, {
                set(value) {
                    obstacle._properties[key] = value;
                    obstacle._inputRef.value = value;
                },
                get() {
                    return obstacle._properties[key];
                },
                enumerable: true,
                configurable: true,
            });
        }

        for(let key in obstacle){
            if(this.excludedProperties[key] === true){
                continue;
            }
            if(typeof obstacle[key] === 'object'){
                this.regenerateGettersAndSetters(obstacle[key]);
            }
        }
    }
    regenerateMapProperty(mapReferences){
        for(let key in mapReferences){
            if(key === '_properties' || key === 'editorPropertyReferences' || key === 'specialKeyNames' || key === 'isEditorProperties' || key === '_inputRef'){
                continue;
            }
            
            mapReferences.editorPropertyReferences[key][key] = mapReferences[key];
        }
    }
    clickFolder(event, folder){
        folder.isOpen = !folder.isOpen;
        const folderContent = folder.getElementsByClassName('folder-content')[0];
        const folderButton = folder.getElementsByClassName('folder-button')[0];
        if(folder.isOpen === true){
            folderButton.innerHTML = '<span class="ro">▸</span>&nbsp;' + folder.folderName;
            for(let i = 0; i < folderContent.children.length; i++){
                folderContent.children[i].classList.remove('hidden');
            }
        } else {
            folderButton.innerHTML = '<span class="or">▸</span>&nbsp;' + folder.folderName;
            for(let i = 0; i < folderContent.children.length; i++){
                folderContent.children[i].classList.add('hidden');
            }
        }
        
    }
    generateId(){
        return this.id++;
    }
    formatName(name){
        if(name.length > 1){
            name = name[0].toUpperCase() + name.slice(1);
        }
        
        for(let i = 0; i < name.length; i++){
            if(name[i].toUpperCase() === name[i]){
                name = name.slice(0, i) + ' ' + name[i].toLowerCase() + name.slice(i+1);
                i += 2;
            }
        }
        return name;
    }
} 

// TODO: make these a window obj because i think they're defined globally in /shared in minpack
// function applyToKeyChain(obj, chain, value){
//     const last = chain.pop();
//     chain.reduce((acc, k) => acc[k], obj)[last] = value;
// }

// function deleteKeyChain(obj, chain){
//     const last = chain.pop();
//     delete chain.reduce((acc, k) => acc[k], obj)[last];
// }
function applyToKeyChain(obj, chain, value){
    let lookUpString = '';
    for(let i = 0; i < chain.length; i++){
        lookUpString += "['" + chain[i].replaceAll(']','') + "']";
    }
    
    try {
        eval(`obj${lookUpString} = value;`);// TODO: ENSURE THIS IS SAFE!
    } catch(e){}
}