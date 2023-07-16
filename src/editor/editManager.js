import Ref from './editorRef.js';
import editorUtils from './editorUtils.js';
const {defineAsUnEnumerable, excludedProperties, generateId} = editorUtils;

// responsible for the edit menu on the side (one with the close menu / open menu button)
// not responsible for adding properties to that, see bindManager.js for how that's done
export default class EditManager {
    constructor(client){
        this.client = client;
    }
    start(){
        this.editorManager = this.client.editorManager;
        this.game = this.client.game;
        this.map = this.client.game.map;
        this.defineObstaclePropertyMap();
        this.defineEventListeners();
    }
    createFolder(obstacle, folderName=[obstacle.initialShape ?? obstacle.shape, obstacle.simulate.join('-'), obstacle.effect].map(s => s[0].toUpperCase() + s.slice(1)).join(' ')) {
        // console.log(obstacle);//!!obstacle?.el?.folder?.isOpen
        // console.log(obstacle.el);
        const folder = this.generateFolder(folderName);
        const folderContent = folder.getElementsByClassName('folder-content')[0];

        defineAsUnEnumerable(obstacle, 'el', {folder, sub: {}});

        for(let key in obstacle){
            if(excludedProperties[key] === true)continue;
            obstacle.el.sub[key] = folderContent.appendChild(this.createPropertyInFolder(obstacle, key, obstacle[key]));
        }

        // TODO: add an isHidden flag so that things can persist past reloading
        for(let i = 0; i < folderContent.children.length; i++){
            folderContent.children[i].classList.add('hidden');
        }

        // if(obstacle.manageProperties === undefined /*&& key !== 'manageProperties' && key !== 'removeProperty' && key !== 'addProperty'*/){
        //     this.definePropertyManager(obstacle, folder);
        // }
        
        return folder;
    }
    // generateMenu(){
    //     while(Ref.gui.firstChild){
    //         Ref.gui.removeChild(Ref.gui.firstChild);
    //     }
    //     // Ref.gui.appendChild(this.createEditorProperties());
    //     // const selectedObstacles = this.selectionManager.collisionManager.selectedObstacles;
    //     for(let i = 0; i < this.map.obstacles.length; i++){
    //         Ref.gui.appendChild(this.createFolderAndInternals(this.map.obstacles[i]));
    //     }
    // }
    defineEventListeners(){
        Ref.toggleGui.isOpen = false;
        Ref.toggleGui.onclick = (event) => {
            Ref.toggleGui.isOpen = !Ref.toggleGui.isOpen;
            if(Ref.toggleGui.isOpen === true){
                Ref.toggleGui.innerText = 'Close Menu';
                Ref.toggleGui.dataset.usage = 'on';
                Ref.gui.classList.remove('hidden');
                Ref.guiContainer.classList.add('gui-on');
                // this.generateMenu();
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
                    this.editorManager.addObstacle(obstacle);
                });

                property.appendChild(label);
            },
            object: (key, subObject, {input, property, obstacle}) => {
                // if(key === 'addButton'){
                //     // TODO
                //     // these things should be uncommented
                //     // this.obstaclePropertyMap.addButton(key, subObject, {input, property, obstacle});
                //     return;
                // } else if(key === 'removeButton'){
                //     // property.appendChild(this.createFolderAndInternals(subObject, this.formatName(key)));
                //     // this.obstaclePropertyMap.removeButton(key, subObject, {input, property, obstacle});
                //     return;
                // }

                const parent = obstacle.parentObstacle ?? obstacle;
                defineAsUnEnumerable(subObject, 'parentObstacle', parent);

                // if(obstacle.parentObstacle !== undefined){
                //     // for nested objects
                //     defineAsUnEnumerable(subObject, 'parentObstacle', obstacle.parentObstacle);
                    
                //     // defineAsUnEnumerable(subObject, '_parentKeyChain',  [...obstacle._parentKeyChain, key]);
                //     // subObject.parentObstacle = obstacle.parentObstacle;
                //     // subObject._parentKeyChain = [...obstacle._parentKeyChain, key];
                // } else {
                //     defineAsUnEnumerable(subObject, 'parentObstacle', obstacle);
                //     // subObject.parentObstacle = obstacle;
                //     // subObject._parentKeyChain = [key];
                // }

                if(parent.subObjects === undefined){
                    defineAsUnEnumerable(parent, 'subObjects', {});
                }
                parent.subObjects[subObject] = subObject;

                /*const folder =*/ property.appendChild(this.createFolder(subObject, this.formatName(key)));
            },
            color: (key, value, {input, property, obstacle}) => {
                input.classList.add('property-color-input');
                input.type = 'color';

                input.id = generateId();
                
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
    }
    createPropertyInFolder(object, key, value, /*isLinkable=object.isEditorProperties===undefined*/){
        const property = document.createElement('div');
        property.classList.add('property');
        property.classList.add('text');

        if(typeof value !== 'object'){
            const propName = document.createElement('span');
            propName.classList.add('property-name');
            // if(object.specialKeyNames !== undefined){
            //     propName.innerText = this.formatName(object.specialKeyNames[key] ?? key);
            // } else {
                propName.innerText = this.formatName(key);
            // }
            property.appendChild(propName);
        }

        const input = document.createElement('input');
        input.maxLength = 500;
        input.spellcheck = 'false';
        
        input.value = value;

        // if(isLinkable === true){
            // defineKey(object, key, undefined, (value) => {
            //     // if(key !== 'lastChangedKey')object.lastChangedKey = key;// TODO: investigate if this is actually needed with the new system
            //     input.value = value//typeof value === 'number' ? Math.round(value * 10000) / 10000 : value;
            //     this.editorManager.addObstacle(object.parentObstacle ?? object);
            // });
        // }
        
        input.oninput = ((event) => {
            const targetValue = typeof object[key] === 'number' ? parseFloat(event.target.value) : event.target.value;

            object[key] = targetValue;// hmm this is kinda inefficient because the input is regenerated every time this happens. Maybe in the future add window.isInput flag that gets caught at bindManager.js? <- NVM SCREW INEFFICIENCY DUMBASS THIS IS EVADES X NOT GOOGLE.COM GTFU WITH YOUR POTATO PCS LMAO

            const newObj = this.editorManager.addObstacle(object.parentObstacle ?? object);
            if(object.parentObstacle !== undefined){
                const newSubObj = newObj.subObjects[object];
                newSubObj.el.sub[key].querySelector("input").focus();
            } else {
                newObj.el.sub[key].querySelector("input").focus();
            }
            
            return event.preventDefault();
        }).bind(this);

        if(this.obstaclePropertyMap[typeof value] !== undefined){
            this.obstaclePropertyMap[typeof value](key, value, {input, property, obstacle: object});
        } else {
            input.classList.add('property-text-input');
            property.appendChild(input);
        }

        if(typeof value === 'object'){
            property.style.height = 'auto';
        }

        return property;
    }
    generateFolder(folderName, isAlreadyOpen=false){
        const folder = document.createElement('div');
        folder.classList.add('folder');

        const folderButton = document.createElement('button');
        folderButton.classList.add('folder-button');
        
        folder.folderName = folderName;
        folderButton.innerHTML = '<span class="or">▸</span>&nbsp;' + folder.folderName;
        folder.appendChild(folderButton);

        folderButton.addEventListener('mousedown', (event) =>
            this.clickFolder(event, folderButton.parentElement)
        );
        folderButton.parentElement.isOpen = false;
        if(isAlreadyOpen === true){
            this.clickFolder(null, folderButton.parentElement)
        }

        const folderContent = document.createElement('div');
        folderContent.classList.add('folder-content');
        folder.appendChild(folderContent);

        return folder;
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