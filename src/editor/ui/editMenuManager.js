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
            string: (key, value, {input, property}) => {
                if(typeConverter.toHex(value, 'notahex') !== 'notahex'){
                    this.obstaclePropertyMap.color(key, value, {input, property});
                    return;
                }

                input.classList.add('property-text-input');
                property.appendChild(input);
            },
            boolean: (key, value, {input, property}) => {
                input.checked = value;

                const label = document.createElement('label');
                label.classList.add('switch');
                label.classList.add('property-checkbox-input');
                label.appendChild(input);

                const span = document.createElement('span');
                span.classList.add('slider');
                label.appendChild(span);

                property.appendChild(label);
            },
            color: (key, value, {input, property}) => {
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
            options: (key, value, {input, property}) => {
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
    reloadMenu(){
        // Ref.gui.appendChild(this.createMapProperties());
        while(Ref.gui.firstChild){
            Ref.gui.removeChild(Ref.gui.firstChild);
        }
        for(let i = 0; i < this.selectionManager.selectedObstacles.length; i++){
            Ref.gui.appendChild(this.createObstacleProperties(this.selectionManager.selectedObstacles[i]));
        }
    }
    createMapProperties(){
        // get map settings and turn them into parameters
    }
    createObstacleProperties(obstacle) {
        const folder = document.createElement('div');
        folder.classList.add('folder');

        const folderButton = document.createElement('button');
        folderButton.classList.add('folder-button');
        folderButton.addEventListener('mousedown', (event) =>
            this.clickFolder(event, folderButton.parentElement)
        );
        folderButton.isOpen = false;
        folder.folderName = [obstacle.shape, obstacle.simulate, obstacle.effect].join('-');
        folderButton.innerHTML = '<span class="or">▸</span>&nbsp;' + folder.folderName;
        folder.appendChild(folderButton);

        const folderContent = document.createElement('div');
        folderContent.classList.add('folder-content');

        for(let key in obstacle){
            folderContent.appendChild(this.createObstacleProperty(key, obstacle[key]));
        }

        for(let i = 0; i < folderContent.children.length; i++){
            folderContent.children[i].classList.add('hidden');
        }

        folder.appendChild(folderContent);
        
        return folder;
    }
    createObstacleProperty(key, value){
        const property = document.createElement('div');
        property.classList.add('property');
        property.classList.add('text');

        const propName = document.createElement('span');
        propName.classList.add('property-name');
        propName.innerText = key;
        property.appendChild(propName);

        const input = document.createElement('input');
        input.maxLength = 500;
        input.spellcheck = 'false';
        input.value = value;

        // running the configuration function hashmap
        if(this.obstaclePropertyMap[typeof value] !== undefined){
            this.obstaclePropertyMap[typeof value](key, value, {input, property});
        } else {
            input.classList.add('property-text-input');
            property.appendChild(input);
        }

        return property;
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
} 