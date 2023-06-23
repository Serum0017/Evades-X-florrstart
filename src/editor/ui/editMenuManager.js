import Ref from '../editorRef.js';

// right side menu that can be used to edit obstacles and their parameters after they have been placed

// this class manages the obstacles and their relations with the html (linking)
export default class EditMenuManager {
    constructor(client){
        this.client = client;

        this.editMenuGenerator = new EditMenuGenerator(client, this);
    }
    start(){
        this.selectionManager = this.client.selectionManager;

        this.editMenuGenerator.start();

        this.defineEventListeners();

        this.defineExcluded();
    }
    defineExcluded(){
        this.excludedProps = [
            'shape',/*'simulate',*/'effect','difference','type','body','render','lastState','toRender','parametersToReset','renderFlag','timeRemain','xv','yv','_properties','editorPropertyReferences',
            'hashId','hashPositions','lastCollidedTime','specialKeyNames','spatialHash','snapCooldown','snapToShowVelocity','interpolatePlayerData','difficultyNumber','map','acronym','isEditorProperties',
            '_parentKeyChain','parentObstacle','inputRef','visible','renderCircleSize','snapRotateMovementExpansion','rotateMovementExpansion','mapInitId','resizePoints','pointOn','pointTo','isSelected',
            'refresh','initialShape','hasParent','specialPropsToReset','parentObject'
        ];
        this.excludedProperties = {};
        for(let i = 0; i < this.excludedProps.length; i++){
            this.excludedProperties[this.excludedProps[i]] = true;
        }
        delete this.excludedProps;
        this.editorProperties = [{object: this.client.selectionManager.settings, key: 'snapDistance'}, {object: this.client.selectionManager.settings, key: 'toSnap'}, {object: this.client.game.map.settings.dimensions, key: 'x', keyName: 'map width'}, {object: this.client.game.map.settings.dimensions, key: 'y', keyName: 'map height'}/*, {object: window, key: 'isFullScreen', keyName: 'toggle full screen'}*/];
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
                this.editMenuGenerator.reloadMenu();
            } else {
                Ref.toggleGui.innerText = 'Open Menu';
                Ref.toggleGui.dataset.usage = 'off';
                Ref.gui.classList.add('hidden');
                Ref.guiContainer.classList.remove('gui-on');
            }
            event.preventDefault();
        }
    }
    // the function to rule them all!
    link(object, input, key, value){
        // console.log({object, input, key, value});
        if(object.inputRef === undefined){
            defineAsUnEnumerable(object, 'inputRef', {});
        }
        Object.defineProperty(object.inputRef, key, {
            get() {
                return input;
            },
            enumerable: false,
            configurable: true,
        });

        object.hasParent = object.parentObstacle !== undefined;

        if(object._properties === undefined){
            defineAsUnEnumerable(object, '_properties', {});
        }
        object._properties[key] = value;
        if(object.isEditorProperties === undefined){
            Object.defineProperty(object, key, {
                set(value) {
                    object._properties[key] = value;
                    if(object.inputRef !== undefined){
                        object.inputRef[key].value = value;
                    }
                },
                get() {
                    return object._properties[key];
                },
                enumerable: true,
                configurable: true,
            });
        }

        input.oninput = ((event) => {
            const targetValue = typeof object[key] === 'number' ? parseFloat(event.target.value) : event.target.value;

            // preventing invalid inputs from resetting back to default
            if(object.isEditorProperties === undefined && object.hasParent === false/*TODO: apply this to subobjects as well*/ && ((typeof object[key] === 'number' && isNaN(object[key]) === false) || typeof object[key] === 'string')){
                if(window.initObstacle({...object, [key]: targetValue})[key] !== targetValue){
                    return event.preventDefault();
                }
                if(typeof object[key] === 'number' && targetValue.toString() !== event.target.value){
                    return event.preventDefault();
                }
            }

            this.handleSpecialProperties(object, key, targetValue);

            object[key] = targetValue;

            // /*const toReset = */this.handleSpecialProperties(object, key, event, targetValue);

            if(object.isEditorProperties === undefined){
                if(object.hasParent === true){
                    applyToKeyChain(object.parentObstacle, object._parentKeyChain, object);
                    this.client.updateObstacle(object.parentObstacle);
                } else {
                    this.client.updateObstacle(object);
                }
            }

            // if(toReset === true){
            //     this.resetSpecialProperties(object, key, event, targetValue);
            // }
            
            return event.preventDefault();
        }).bind(this);
    }
    // usurping the ruling party
    unlink(object, input, key){
        // console.log({object, input, key, value});

        // delete object._properties[key];
        // delete object[key];

        console.log('unlink:', {input, key, object});
        input.oninput = () => {};
        input.remove();
    }
    // TODO: make this system work better
    handleSpecialProperties(object, key, value){
        // if we change pivot param, then make rotation 0
        // if this gets any bigger then maybe use parentKeyChain instead. Also maybe make this a map if we get >3
        if(object._parentKeyChain !== undefined && object._parentKeyChain.length === 1 && object._parentKeyChain[0] === 'pivot'){
            const parentObstacle = object.parentObstacle;
            // if(parentObstacle.specialPropsToReset === undefined){
            //     parentObstacle.specialPropsToReset = {};
            // }
            // parentObstacle.specialPropsToReset.rotation = parentObstacle.rotation;
            parentObstacle.body.rotateRelative(-parentObstacle.rotation, parentObstacle.pivot);
            parentObstacle.rotation = 0;
            return true;
        } else if(object._parentKeyChain === undefined && key === 'x'){
            // change pivot by the delta that is transformed as well
            object.pivot.x += value - object[key];
            if(object?.pivot?.x?.inputRef !== undefined){
                object.pivot.x.inputRef.value = value;
            }
        } else if(object._parentKeyChain === undefined && key === 'y'){
            object.pivot.y += value - object[key];
            if(object?.pivot?.y?.inputRef !== undefined){
                object.pivot.y.inputRef.value = value;
            }
        }
        // return false;
    }
    // resetSpecialProperties(object, key, event, targetValue){
    //     const parentObstacle = object.parentObstacle;
    //     for(let key in parentObstacle.specialPropsToReset){
    //         parentObstacle[key] = parentObstacle.specialPropsToReset[key];
    //     }
    //     delete parentObstacle.specialPropsToReset;
    //     this.client.updateObstacle(parentObstacle);
    // }
    regenerateObstacle(obstacle, isRegeneratable=obstacle.isEditorProperties===undefined) {
        if(isRegeneratable === false){
            return;
        }
        obstacle.shape = obstacle.initialShape;
        obstacle.refresh = true;
        const newObstacle = window.initObstacle(obstacle);
        for(let key in newObstacle){
            if(key === 'spatialHash')continue;
            obstacle[key] = newObstacle[key];
            if(typeof newObstacle[key] === 'object' && this.excludedProperties[key] !== true){
                this.regenerateGettersAndSetters(newObstacle[key]);
            }
        }

        const bound = obstacle.body.getBoundingBox();
        obstacle.x = bound.pos.x + bound.w/2;
        obstacle.y = bound.pos.y + bound.h/2;
        obstacle.difference = {x: bound.w, y: bound.h};
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
                    if(obstacle.inputRef !== undefined){
                        obstacle.inputRef[key].value = value;
                    }
                },
                get() {
                    return obstacle._properties[key];
                },
                enumerable: true,
                configurable: true,
            });
        }

        for(let key in obstacle){
            if(this.excludedProperties[key] !== true && typeof obstacle[key] === 'object'){
                this.regenerateGettersAndSetters(obstacle[key]);
            }
        }
    }
}

// this class handles the html, while the main class handles obstacles and their links with the main.
class EditMenuGenerator {
    constructor(client, editMenuManager){
        this.client = client;
        this.editMenuManager = editMenuManager;
    }
    start(){
        this.selectionManager = this.editMenuManager.client.selectionManager;

        this.defineObstaclePropertyMap();
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
                    this.editMenuManager.regenerateObstacle(obstacle);
                });

                property.appendChild(label);
            },
            object: (key, subObject, {input, property, obstacle}) => {
                if(key === 'addButton'){
                    // TODO
                    this.obstaclePropertyMap.addButton(key, subObject, {input, property, obstacle});
                    return;
                } else if(key === 'removeButton'){
                    // property.appendChild(this.createObstacleProperties(subObject, this.formatName(key)));
                    this.obstaclePropertyMap.removeButton(key, subObject, {input, property, obstacle});
                    return;
                }

                if(obstacle.parentObstacle !== undefined){
                    // for nested objects
                    subObject.parentObstacle = obstacle.parentObstacle;
                    subObject._parentKeyChain = [...obstacle._parentKeyChain, key];
                } else {
                    subObject.parentObstacle = obstacle;
                    subObject._parentKeyChain = [key];
                }

                if(key !== 'manageProperties' && key !== 'removeProperty' && key !== 'addProperty'){
                    subObject.manageProperties = {addProperty: {name: '', value: '', addButton: {}}, removeProperty: {name: Object.keys(subObject)[0], removeButton: {}}};
                    defineAsUnEnumerable(subObject.manageProperties.addProperty.addButton, 'parentObject', subObject);
                    defineAsUnEnumerable(subObject.manageProperties.removeProperty.removeButton, 'parentObject', subObject);
                }

                const folder = property.appendChild(this.createObstacleProperties(subObject, this.formatName(key)));

                defineAsUnEnumerable(subObject, 'folderRef', folder);
            },
            addButton: (key, object, {input, property, obstacle}) => {
                // class to add a property to an object
                input.classList.add('property-button-input');
                input.type = 'button';
                input.value = 'add property';

                const parentObstacle = obstacle.parentObstacle;
                const parentObject = object.parentObject;

                input.onclick = () => {
                    const name = parentObject.manageProperties.addProperty.name;
                    let value = parentObject.manageProperties.addProperty.value;
                    if(value.slice(0,4) === 'JSON'){
                        //try adding JSON{"x":5,"y":100}
                        try{
                            value = JSON.parse(value.slice(4));
                        } catch(e){
                            value = parentObject.manageProperties.addProperty.value;
                        }
                    }

                    if(parentObject[name] !== undefined){
                        let propertyToRemove;
                        if(parentObject[name].folderRef !== undefined){
                            propertyToRemove = parentObject[name].folderRef;
                        } else {
                            propertyToRemove = parentObject.inputRef[name].parentElement;
                        }
                        this.removeObstacleProperty(parentObject, propertyToRemove, name);
                    }

                    parentObject[name] = value;
                    // applyToKeyChain(parentObstacle, [...parentObject._parentKeyChain, name], value);

                    // pro html
                    const parentFolderContent = input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    parentFolderContent.appendChild(this.createObstacleProperty(parentObject, name, parentObject[name]));

                    this.client.updateObstacle(parentObstacle);

                    this.reloadFolder(parentObject, parentObject.folderRef, this.formatName(parentObject._parentKeyChain[parentObject._parentKeyChain.length-1]));
                }
                property.appendChild(input);
            },
            removeButton: (key, object, {input, property, obstacle}) => {
                // class to add a property to an object
                input.classList.add('property-button-input');
                input.type = 'button';
                input.value = 'remove property';

                const parentObstacle = obstacle.parentObstacle;
                const parentObject = object.parentObject;

                input.onclick = () => {
                    const name = parentObject.manageProperties.removeProperty.name;
                    let propertyToRemove;
                    if(parentObject[name].folderRef !== undefined){
                        propertyToRemove = parentObject[name].folderRef;
                    } else {
                        propertyToRemove = parentObject.inputRef[name].parentElement;
                    }
                    
                    this.removeObstacleProperty(parentObject, propertyToRemove, name);

                    deleteKeyChain(parentObstacle, [...parentObject._parentKeyChain, name]);

                    // filtering out empty elements of arrays
                    if(Array.isArray(parentObject) === true){
                        let objToApply = parentObstacle;
                        const keyChain = parentObject._parentKeyChain;
                        for(let i = 0; i < keyChain.length; i++){
                            objToApply = objToApply[keyChain[i]];
                        }
                        delete objToApply[name];

                        // TODO: if we remove element 2, then element 3 in an array should become element 2 (but rn it just stays as 3)
                        applyToKeyChain(parentObstacle, parentObject._parentKeyChain, parentObject.filter(p => p != null || p === null || p === undefined || isNaN(p) === true));

                        console.log({parentObstacle, chain: [...parentObject._parentKeyChain, name], parentObject: object.parentObject, objToApply});
                    }

                    // removing empty elements from array
                    // only removing "empty" elements
                    // parentObject.path = parentObject.path.filter(p => p != null || p === null || p === undefined || isNaN(p) === true);
                    // console.log(parentObstacle.path.map(p => typeof p));
                    // console.log(parentObstacle.path);

                    this.client.updateObstacle(parentObstacle);

                    this.reloadFolder(parentObject, parentObject.folderRef, this.formatName(parentObject._parentKeyChain[parentObject._parentKeyChain.length-1]));

                    // console.log(parentObstacle.path);

                    console.log({propertyToRemove,name, parentObject,  parentObstacle});
                }
                property.appendChild(input);
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
    }
    reloadMenu(){
        while(Ref.gui.firstChild){
            Ref.gui.removeChild(Ref.gui.firstChild);
        }
        Ref.gui.appendChild(this.createEditorProperties());
        const selectedObstacles = this.selectionManager.collisionManager.selectedObstacles;
        for(let i = 0; i < selectedObstacles.length; i++){
            Ref.gui.appendChild(this.createObstacleProperties(selectedObstacles[i]));
        }
    }
    reloadFolder(object, folder, name){
        console.log(name);
        const oldParent = folder.parentElement;
        folder.remove();
        oldParent.appendChild(this.createObstacleProperties(object, name));
    }

    createEditorProperties(){
        // const obstacle = {editorPropertyReferences: {}, specialKeyNames: {}, isEditorProperties: true};
        // Object.defineProperty(obstacle, 'specialKeyValues', {
        //     enumerable: false,
        //     writable: true,
        //     configurable: true,
        //     value: {}
        // })
        // const editorProperties = this.editMenuManager.editorProperties;

        // for(let i = 0; i < editorProperties.length; i++){
        //     obstacle[editorProperties[i].key] = editorProperties[i].object[editorProperties[i].key];
        //     obstacle.editorPropertyReferences[editorProperties[i].key] = editorProperties[i].object;
        //     if(editorProperties[i].keyName !== undefined){
        //         const key = editorProperties[i].key;
        //         Object.defineProperty(obstacle.specialKeyNames, key, {
        //             get(){
        //                 return obstacle.specialKeyValues[key];
        //             },
        //             set(value){
        //                 if(key === 'editorPropertyReferences' || key === 'specialKeyNames' || key === 'isEditorProperties' || key === 'hasParent'){
        //                     return;
        //                 }
                        
        //                 obstacle.editorPropertyReferences[key][key] = value;
        //             }
        //         })
        //         obstacle.specialKeyValues[key] = editorProperties[i].keyName;
        //     }
        // }
        // console.log(obstacle);
        
        //this.editorProperties = [{object: this.client.selectionManager.settings, key: 'snapDistance'}, {object: this.client.selectionManager.settings, key: 'toSnap'}, {object: this.client.game.map.settings.dimensions, key: 'x', keyName: 'map width'}, {object: this.client.game.map.settings.dimensions, key: 'y', keyName: 'map height'}/*, {object: window, key: 'isFullScreen', keyName: 'toggle full screen'}*/];
        const obstacle = {isEditorProperties: true};
        Object.defineProperty(obstacle, 'propData', {
            enumerable: false,
            value: {},
        });
        for(let i = 0; i < this.editMenuManager.editorProperties.length; i++){
            const prop = this.editMenuManager.editorProperties[i];
            const key = prop.key;
            if(prop.keyName === undefined){
                prop.keyName = prop.key;
            }
            obstacle.propData[prop.keyName] = prop;
            obstacle.propData[prop.keyName].currentValue = prop.object[key];
            Object.defineProperty(obstacle, prop.keyName, {
                get(){
                    return obstacle.propData[prop.keyName].currentValue;
                },
                set(v){
                    obstacle.propData[prop.keyName].currentValue = v;
                    obstacle.propData[prop.keyName].object[key] = v;
                },
                enumerable: true,
            });
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
            if(this.editMenuManager.excludedProperties[key] === true){
                continue;
            }
            folderContent.appendChild(this.createObstacleProperty(obstacle, key, obstacle[key]));
        }

        for(let i = 0; i < folderContent.children.length; i++){
            folderContent.children[i].classList.add('hidden');
        }
        
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

        this.editMenuManager.link(obstacle, input, key, value);

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
    removeObstacleProperty(object, input, key){
        this.editMenuManager.unlink(object, input, key);
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

    generateId(){
        return this.id++;
    }
}

// ok so what functions do i see that can be grouped together
// prop sync / menu generator

// TODO: make these a window obj because i think they're defined globally in /shared in minpack
function applyToKeyChain(obj, chain, value){
    let lookUpString = '';
    for(let i = 0; i < chain.length; i++){
        lookUpString += "['" + chain[i].replaceAll(']','') + "']";
    }
    
    try {
        eval(`obj${lookUpString} = value;`);// TODO: ENSURE THIS IS SAFE!
    } catch(e){}
}

function deleteKeyChain(obj, chain){
    let lookUpString = '';
    for(let i = 0; i < chain.length; i++){
        lookUpString += "['" + chain[i].replaceAll(']','') + "']";
    }
    
    try {
        eval(`delete obj${lookUpString}`);// TODO: ENSURE THIS IS SAFE!
    } catch(e){}
}

// function deleteKeyChain(obj, chain){
//     const last = chain.pop();
//     delete chain.reduce((acc, k) => acc[k], obj)[last];
// }
// function applyToKeyChain(obj, chain, value){
//     const chainWithoutLast = chain.slice(0, chain.length-1);
//     const last = chain[chain.length-1];
//     chainWithoutLast.reduce((acc, k) => acc[k], obj)[last] = value;
// }

// function deleteKeyChain(obj, chain){
//     const chainWithoutLast = chain.slice(0, chain.length-1);
//     const last = chain[chain.length-1];
//     delete chainWithoutLast.reduce((acc, k) => acc[k], obj)[last];
// }