import editorUtils from '../../editorUtils.js';
const {defineAsUnEnumerable} = editorUtils;
import Ref from '../../editorRef.js';

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
            '_parentKeyChain','parentObstacle',/*'htmlRef', -TODO: remove all htmlref comments once new system is proven to work*/'visible','renderCircleSize','snapRotateMovementExpansion','rotateMovementExpansion','mapInitId','resizePoints','pointOn','pointTo','isSelected',
            'refresh','initialShape','hasParent','specialPropsToReset','parentObject','lastChangedKey','folderRef'
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
                this.editMenuGenerator.generateMenu();
            } else {
                Ref.toggleGui.innerText = 'Open Menu';
                Ref.toggleGui.dataset.usage = 'off';
                Ref.gui.classList.add('hidden');
                Ref.guiContainer.classList.remove('gui-on');
            }
            event.preventDefault();
        }
    }
    // usurping the ruling party
    // unlink(object, input, key){
    //     // console.log({object, input, key, value});

    //     // delete object._properties[key];
    //     // delete object[key];

    //     console.log('unlink:', {input, key, object});
    //     input.oninput = () => {};
    //     input.remove();
    // }
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
            // parentObstacle.body.rotateRelative(-parentObstacle.rotation, parentObstacle.pivot);
            // parentObstacle.rotation = 0;
            return true;
        } else if(object._parentKeyChain === undefined && key === 'x'){
            // change pivot by the delta that is transformed as well
            object.pivot.x += value - object[key];
            // if(object?.pivot?.x?.htmlRef !== undefined){
            //     object.pivot.x.htmlRef.value = value;
            // }
        } else if(object._parentKeyChain === undefined && key === 'y'){
            object.pivot.y += value - object[key];
            // if(object?.pivot?.y?.htmlRef !== undefined){
            //     object.pivot.y.htmlRef.value = value;
            // }
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
        if(isRegeneratable === false)return;

        obstacle.shape = obstacle.initialShape;
        obstacle.refresh = true;

        const newObstacle = window.initObstacle(obstacle);
        for(let key in newObstacle){
            obstacle[key] = newObstacle[key];
            if(typeof newObstacle[key] === 'object' && this.excludedProperties[key] !== true && key !== 'spatialHash'){
                this.regenerateGettersAndSetters(newObstacle[key]);
            }
        }

        if(obstacle.lastChangedKey !== 'rotation'){
            // to compensate for init rotating the other way
            obstacle.body.rotateRelative(-obstacle.rotation, obstacle.pivot);
            obstacle.body.rotateRelative(obstacle.rotation, {x: obstacle.x, y: obstacle.y});
        }

        const bound = obstacle.body.getBoundingBox();
        obstacle.x = bound.pos.x + bound.w/2;
        obstacle.y = bound.pos.y + bound.h/2;
        obstacle.difference = {x: bound.w, y: bound.h};
    }
    regenerateGettersAndSetters(object){
        // when sub-obstacles are regenerated, they lose all of their getters and setters... we need to refresh those
        // if(obstacle._properties === undefined){
        //     obstacle._properties = {};
        // }
        // for(let key in obstacle){
        //     if(this.excludedProperties[key] === true){
        //         continue;
        //     }
        //     obstacle._properties[key] = obstacle[key];
        //     Object.defineProperty(obstacle, key, {
        //         set(value) {
        //             obstacle._properties[key] = value;
        //             if(obstacle.htmlRef !== undefined){
        //                 obstacle.htmlRef[key].value = value;
        //             }
        //         },
        //         get() {
        //             return obstacle._properties[key];
        //         },
        //         enumerable: true,
        //         configurable: true,
        //     });
        // }

        // for(let key in obstacle){
        //     if(this.excludedProperties[key] !== true && typeof obstacle[key] === 'object'){
        //         this.regenerateGettersAndSetters(obstacle[key]);
        //     }
        // }

        regenerateKeys(object);

        for(let key in object){
            if(typeof object[key] === 'object' && this.excludedProperties[key] !== true){
                this.regenerateGettersAndSetters(object[key]);
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
                    // these things should be uncommented
                    // this.obstaclePropertyMap.addButton(key, subObject, {input, property, obstacle});
                    return;
                } else if(key === 'removeButton'){
                    // property.appendChild(this.createProperties(subObject, this.formatName(key)));
                    // this.obstaclePropertyMap.removeButton(key, subObject, {input, property, obstacle});
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

                const folder = property.appendChild(this.createProperties(subObject, this.formatName(key)));

                if(subObject.folderRef === undefined){
                    defineAsUnEnumerable(subObject, 'folderRef', folder);
                }
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
                            propertyToRemove = parentObject.htmlRef[name].parentElement;
                        }
                        // this.removeObstacleProperty(parentObject, propertyToRemove, name);
                    }

                    parentObject[name] = value;
                    // applyToKeyChain(parentObstacle, [...parentObject._parentKeyChain, name], value);

                    // pro html
                    const parentFolderContent = input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    parentFolderContent.appendChild(this.createProperty(parentObject, name, parentObject[name]));

                    this.client.updateObstacle(parentObstacle);

                    if(parentObject._parentKeyChain === undefined){
                        var folderTitle = [parentObstacle.shape, parentObstacle.simulate.join('-'), parentObstacle.effect].map(s => s[0].toUpperCase() + s.slice(1)).join(' ')
                    } else {
                        var folderTitle = parentObject._parentKeyChain[parentObject._parentKeyChain.length-1];
                    }
                    this.reloadFolder(parentObject, parentObject.folderRef, this.formatName(folderTitle));
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
                        propertyToRemove = parentObject.htmlRef[name].parentElement;
                    }
                    
                    // this.removeObstacleProperty(parentObject, propertyToRemove, name);

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
    definePropertyManager(o, folder){
        o.manageProperties = {addProperty: {name: '', value: '', addButton: {}}, removeProperty: {name: Object.keys(o)[0], removeButton: {}}};
        defineAsUnEnumerable(o.manageProperties.addProperty.addButton, 'parentObject', o);
        defineAsUnEnumerable(o.manageProperties.removeProperty.removeButton, 'parentObject', o);
        defineAsUnEnumerable(o, 'folderRef', folder);
    }
    generateMenu(){
        while(Ref.gui.firstChild){
            Ref.gui.removeChild(Ref.gui.firstChild);
        }
        Ref.gui.appendChild(this.createEditorProperties());
        const selectedObstacles = this.selectionManager.collisionManager.selectedObstacles;
        for(let i = 0; i < selectedObstacles.length; i++){
            Ref.gui.appendChild(this.createProperties(selectedObstacles[i]));
        }
    }
    // reloadFolder(object, folder, name){
    //     console.log(name);
    //     const oldParent = folder.parentElement;
    //     folder.remove();
    //     oldParent.appendChild(this.createProperties(object, name));
    // }

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
        return this.createProperties(obstacle, 'Editor Settings');
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
    // this function creates a folder/ input element property for a given field.
    createProperty(object, key, value, isLinkable=object.isEditorProperties===undefined){
        const property = document.createElement('div');
        property.classList.add('property');
        property.classList.add('text');

        if(typeof value !== 'object'){
            const propName = document.createElement('span');
            propName.classList.add('property-name');
            if(object.specialKeyNames !== undefined){
                propName.innerText = this.formatName(object.specialKeyNames[key] ?? key);
            } else {
                propName.innerText = this.formatName(key);
            }
            property.appendChild(propName);
        }

        const input = document.createElement('input');
        input.maxLength = 500;
        input.spellcheck = 'false';

        input.value = value//typeof value === 'number' ? Math.round(value * 10000) / 10000 : value;

        if(isLinkable === true){
            defineKey(object, key, undefined, (value) => {
                if(key !== 'lastChangedKey')object.lastChangedKey = key;// TODO: investigate if this is actually needed with the new system
                input.value = value//typeof value === 'number' ? Math.round(value * 10000) / 10000 : value;
                this.editMenuManager.regenerateObstacle(object.parentObstacle ?? object);
            });
        }
        
        input.oninput = ((event) => {
            console.log('input');
            const targetValue = typeof object[key] === 'number' ? parseFloat(event.target.value) : event.target.value;
            object[key] = targetValue;
            
            return event.preventDefault();
        }).bind(this);

        // defineKey(o, key, undefined, (value) => {
        //     input.value = value;
        // });

        // console.log({object, input, key, value});
        // if(o.htmlRef === undefined){
        //     defineAsUnEnumerable(o, 'htmlRef', {});
        // }
        
        // object.hasParent = object.parentObstacle !== undefined;

        // input.oninput = ((event) => {
        //     const targetValue = typeof object[key] === 'number' ? parseFloat(event.target.value) : event.target.value;

        //     // preventing invalid inputs from resetting back to default
        //     if(object.isEditorProperties === undefined && object.hasParent === false/*TODO: apply this to subobjects as well*/ && ((typeof object[key] === 'number' && isNaN(object[key]) === false) || typeof object[key] === 'string')){
        //         if(window.initObstacle({...object, [key]: targetValue})[key] !== targetValue){
        //             return event.preventDefault();
        //         }
        //         if(typeof object[key] === 'number' && targetValue.toString() !== event.target.value){
        //             return event.preventDefault();
        //         }
        //     }

        //     // this.handleSpecialProperties(object, key, targetValue);

        //     object[key] = targetValue;

        //     // /*const toReset = */this.handleSpecialProperties(object, key, targetValue);

        //     if(object.isEditorProperties === undefined){
        //         if(object.hasParent === true){
        //             applyToKeyChain(object.parentObstacle, object._parentKeyChain, object);
        //             this.client.updateObstacle(object.parentObstacle);
        //         } else {
        //             this.client.updateObstacle(object);
        //         }
        //     }

        //     // if(toReset === true){
        //     //     this.resetSpecialProperties(object, key, event, targetValue);
        //     // }
            
        //     return event.preventDefault();
        // }).bind(this);

        // this.editMenuManager.link(obstacle, input, key, value);

        // running the configuration function hashmap
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
    // this function creates a group of properties for an obstacle or for the editor.
    createProperties(obstacle, folderName=[obstacle.shape, obstacle.simulate.join('-'), obstacle.effect].map(s => s[0].toUpperCase() + s.slice(1)).join(' ')) {
        const folder = this.createFolder(folderName);
        const folderContent = folder.getElementsByClassName('folder-content')[0];

        Object.defineProperty(obstacle, 'htmlRef', {
            get() {
                return folder;
            },
            enumerable: false,
            configurable: true,
        });

        for(let key in obstacle){
            if(this.editMenuManager.excludedProperties[key] === true){
                continue;
            }
            folderContent.appendChild(this.createProperty(obstacle, key, obstacle[key]));
        }

        for(let i = 0; i < folderContent.children.length; i++){
            folderContent.children[i].classList.add('hidden');
        }

        if(obstacle.manageProperties === undefined /*&& key !== 'manageProperties' && key !== 'removeProperty' && key !== 'addProperty'*/){
            this.definePropertyManager(obstacle, folder);
        }
        
        return folder;
    }
    // removeObstacleProperty(object, input, key){
    //     this.editMenuManager.unlink(object, input, key);
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