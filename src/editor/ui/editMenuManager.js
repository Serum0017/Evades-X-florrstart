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
                input.checked = value;

                const label = document.createElement('label');
                label.classList.add('switch');
                label.classList.add('property-checkbox-input');
                label.appendChild(input);

                const span = document.createElement('span');
                span.classList.add('slider');
                label.appendChild(span);

                property.addEventListener('mousedown', (event) => {
                    event.preventDefault();
                    input.checked = !input.checked;
                    obstacle[key] = input.checked;
                    this.regenerateObstacle(obstacle);
                });

                property.appendChild(label);
            },
            // object: (key, value, {input, property, obstacle}) => {
            //     // this isnt gonna work but ill do it for now
            //     for(let subProperty in value){
            //         property.appendChild(this.createObstacleProperty(value, subProperty, value[subProperty]));
            //     }
            // },
            color: (key, value, {input, property, obstacle}) => {
                input.classList.add('property-color-input');
                
                const text = document.createTextNode(input.value);
                text.nodeValue = input.value;

                const label = document.createElement('label');
                label.classList.add('color-label');
                label.style.background = input.value;
                label.htmlFor = input.id;
                label.appendChild(input);
                label.appendChild(text);

                label.addEventListener('input', () => {
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

        this.excludedProps = ['shape','simulate','effect','difference','type','pivot','body','render','lastState','toRender','parametersToReset','renderFlag','timeRemain','xv','yv','_properties','editorPropertyReferences'];
        this.excludedProperties = {};
        for(let i = 0; i < this.excludedProps.length; i++){
            this.excludedProperties[this.excludedProps[i]] = true;
        }
        delete this.excludedProps;
        this.editorProperties = [{object: this.client.selectionManager, key: 'snapDistance'}, {object: this.client.selectionManager, key: 'toSnap'}];
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
        const obstacle = {editorPropertyReferences: {}};
        for(let i = 0; i < this.editorProperties.length; i++){
            obstacle[this.editorProperties[i].key] = this.editorProperties[i].object[this.editorProperties[i].key];
            obstacle.editorPropertyReferences[this.editorProperties[i].key] = this.editorProperties[i].object;
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
    createObstacleProperties(obstacle, folderName=[obstacle.shape, obstacle.simulate, obstacle.effect].map(s => s[0].toUpperCase() + s.slice(1)).join(' ')) {
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

        const propName = document.createElement('span');
        propName.classList.add('property-name');
        propName.innerText = this.formatName(key);
        property.appendChild(propName);

        const input = document.createElement('input');
        input.maxLength = 500;
        input.spellcheck = 'false';
        input.value = value;

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
            obstacle[key] = parseInt(event.target.value);
            this.regenerateObstacle(obstacle);
        }).bind(this);

        // running the configuration function hashmap
        if(this.obstaclePropertyMap[typeof value] !== undefined){
            this.obstaclePropertyMap[typeof value](key, value, {input, property, obstacle});
        } else {
            input.classList.add('property-text-input');
            property.appendChild(input);
        }

        return property;
    }
    regenerateObstacle(obstacle, isRegeneratable=obstacle.effect!==undefined) {
        if(isRegeneratable === false){
            this.regenerateMapProperty(obstacle);
            return;
        }
        obstacle.shape = obstacle.renderFlag ?? obstacle.shape;
        const newObstacle = window.initObstacle(obstacle);
        for(let key in newObstacle){
            obstacle[key] = newObstacle[key];
        }
    }
    regenerateMapProperty(mapReferences){
        for(let key in mapReferences){
            if(key === '_properties' || key === 'editorPropertyReferences'){
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
    // createFolder(parent, name, layerType='simulate') {
    //     const folder = document.createElement('div');
    //     folder.classList.add('folder');
    //     folder.onmousedown = (e) => this.clickFolder(e, folder);
    //     folder.layerType = layerType;
    //     folder.name = name;

    //     const nameSpan = document.createElement('span');
    //     nameSpan.innerText = this.formatObstacleName(name);
    //     folder.appendChild(nameSpan);

    //     const gtSpan = document.createElement('span');
    //     gtSpan.classList.add('gt');
    //     gtSpan.innerText = '>';
    //     folder.appendChild(gtSpan);
        
    //     const folderData = document.createElement('div');
    //     folderData.classList.add('folder-data');
    //     folderData.classList.add('hidden');
    //     folderData.style.left = '120px';
    //     folderData.style.top = '-20.75px';
    //     folder.appendChild(folderData);
    //     folder.folderData = folderData;

    //     this.addFolderChild(parent, folder);
        
    //     return folder;
    // }
    // // TODO: this should be able to be read from a structure that's defined for obstacle init in !initObstacle.js
    // createFolder(name = 'folder name', props = [], show = 'true') {
    //     const folder = document.createElement('div');
    //     folder.classList.add('folder');
    //     const folderButton = document.createElement('button');
    //     folderButton.classList.add('folder-button');
    //     folderButton.dataset.show = show;
    //     folderButton.dataset.name = name;
    //     folderButton.addEventListener('mousedown', (e) =>
    //         folderToggle(e, folderButton)
    //     );
    //     folder.appendChild(folderButton);
    //     const folderContent = document.createElement('div');
    //     folderContent.classList.add('folder-content');
    //     props.forEach((prop) => {
    //         folderContent.appendChild(prop);
    //     });
    //     folder.appendChild(folderContent);

    //     if (show === 'false') {
    //         folderButton.innerHTML = '<span class="or">▸</span>&nbsp;' + name;
    //         folderContent.classList.add('hidden');
    //     } else if (show === 'true') {
    //         folderButton.innerHTML = '<span class="ro">▸</span>&nbsp;' + name;
    //     }
    //     Ref.gui.appendChild(folder);
    //     return folder;
    // }
    // createProperty(
    //     name = 'property name',
    //     type = 'text',
    //     value = 'ZeroTix',
    //     input = document.createElement('input'),
    //     readonly = false,
    //     obProp = null
    // ) {
    //     const property = document.createElement('div');
    //     property.classList.add('property');
    //     property.classList.add('text');
    //     const propName = document.createElement('span');
    //     propName.classList.add('property-name');
    //     propName.innerText = name;
    //     property.appendChild(propName);
    //     input.type = type;
    //     input.maxLength = 500;
    //     input.spellcheck = 'false';
    //     input.value = value;
    //     if (readonly) {
    //         input.readOnly = true;
    //     }
    //     if (type === 'color') {
    //         input.classList.add('property-color-input');
    //         const label = document.createElement('label');
    //         const text = document.createTextNode(input.value);
    //         text.nodeValue = input.value;
    //         label.appendChild(text);
    //         input.id = generateId();
    //         label.htmlFor = input.id;
    //         label.appendChild(input);
    //         label.classList.add('color-label');
    //         label.style.background = input.value;
    //         property.appendChild(label);
    //         label.addEventListener('input', () => {
    //             text.nodeValue = input.value;
    //             label.style.background = input.value;
    //         });
    //     } else if (type === 'checkbox') {
    //         const label = document.createElement('label');
    //         label.classList.add('switch');
    //         input.checked = value; // can u help fix css xd ooh theres a checkboxc ok
    //         label.classList.add('property-checkbox-input');
    //         label.appendChild(input);
    //         const span = document.createElement('span');
    //         span.classList.add('slider');
    //         label.appendChild(span);
    //         property.appendChild(label);
    //     } else if (type === 'directions') {
    //         input.classList.add('property-text-input');
    //         input.style.width = '0px';
    //         input.style.height = '0px';
    //         input.classList.add('dir-prop');
    //         input.readOnly = true;
    //         property.appendChild(input);
    //         const buttonContainer = document.createElement('div');
    //         buttonContainer.classList.add('directional-button-container');
    //         const dirs = Array(4)
    //             .fill(null)
    //             .map((unusedRefproperty, i) => {
    //                 const btn = document.createElement('button');
    //                 btn.classList.add('dir-btn');
    //                 const text = document.createElement('span');
    //                 const t = document.createElement('span');
    //                 t.innerHTML = '>';
    //                 text.appendChild(t);
    //                 text.classList.add(['left', 'down', 'up', 'right'][i]);
    //                 btn.appendChild(text);
    //                 btn.dataset.dir = ['left', 'down', 'up', 'right'][i];
    //                 return btn;
    //             });
    //         const index = ['left', 'down', 'up', 'right'].findIndex(
    //             (d) => d === value
    //         );
    //         if (index > -1) {
    //             dirs[index].classList.add('dir-selected');
    //         }
    //         appendChildren(buttonContainer, dirs);
    //         property.appendChild(buttonContainer);
    //     } else if (type === 'option') {
    //         // console.log(value)
    //         // const select = document.createElement('select');
    //         // input -> select element
    //         input.classList.add('property-option-input');
    //         // value => array ([0] is the intiial value)
    //         let first = false;
    //         let arr = value;
    //         if (!Array.isArray(arr) && obProp != null) {
    //             arr = obProp.value.slice(1);
    //         }
    //         arr.forEach((data) => {
    //             if (!first) {
    //                 first = true;
    //                 return; // skips first index because thats the default
    //             }
    //             const option = document.createElement('option');
    //             option.value = data;
    //             option.classList.add('select-items');
    //             option.innerText = data;
    //             input.appendChild(option);
    //         });
    //         property.appendChild(input);
    //     } else {
    //         input.classList.add('property-text-input');
    //         property.appendChild(input);
    //     }
    //     return property;
    // }
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