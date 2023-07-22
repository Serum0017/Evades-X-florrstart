import EditSettingsManager from './editSettingsManager.js';
import Ref from './editorRef.js';
import editorUtils from './editorUtils.js';
const {defineAsUnEnumerable, excludedProperties, generateId} = editorUtils;

// responsible for the edit menu on the side (one with the close menu / open menu button)
// not responsible for adding properties to that, see bindManager.js for how that's done
export default class EditManager {
    constructor(client){
        this.client = client;
        this.editSettingsManager = new EditSettingsManager(client, this);
    }
    start(){
        this.editorManager = this.client.editorManager;
        this.game = this.client.game;
        this.map = this.client.game.map;
        this.defineObstaclePropertyMap();
        this.defineEventListeners();
        this.editSettingsManager.start();
    }
    createFolder(obstacle, folderName=[obstacle.initialShape ?? obstacle.shape, obstacle.simulate.join('-'), obstacle.effect].map(s => s[0].toUpperCase() + s.slice(1)).join(' ')) {
        const folder = this.generateFolder(folderName);
        const folderContent = folder.getElementsByClassName('folder-content')[0];

        defineAsUnEnumerable(obstacle, 'el', {folder, sub: {}});

        // this.createPropertyManager(obstacle);

        for(let key in obstacle){
            if(excludedProperties[key] === true)continue;
            obstacle.el.sub[key] = folderContent.appendChild(this.createPropertyInFolder(obstacle, key, obstacle[key]));
        }
        
        for(let i = 0; i < folderContent.children.length; i++){
            folderContent.children[i].classList.add('hidden');
        }

        // if(obstacle.manageProperties === undefined /*&& key !== 'manageProperties' && key !== 'removeProperty' && key !== 'addProperty'*/){
        //     this.definePropertyManager(obstacle, folder);
        // }
        
        return folder;
    }
    // TODO
    // createPropertyManager(obstacle){
    //     // making sure that this we're not recursively defining manage properties for the sub objects in manage properties
    //     if(obstacle.addProperty !== undefined || obstacle.removeProperty !== undefined)return;
    //     if(obstacle.addButton !== undefined || obstacle.removeButton !== undefined)return;
    //     if(obstacle.isAddButton === true || obstacle.isRemoveButton === true)return;

    //     // defining the structure to be seen in the menu
    //     obstacle.manageProperties = {
    //         addProperty: {
    //             name: toString(obstacle?.manageProperties?.addProperty?.name, ''),
    //             value: toString(obstacle?.manageProperties?.addProperty?.value, ''),
    //             addButton: {
    //                 // parentObject: obstacle,
    //                 isAddButton: true,
    //             }
    //         },
    //         removeProperty: {
    //             name: toString(obstacle?.manageProperties?.removeProperty?.name, Object.keys(obstacle).find(key => excludedProperties[key] !== true) ?? ''),
    //             removeButton: {
    //                 // parentObject: obstacle,
    //                 isRemoveButton: true
    //             }
    //         }
    //     };
    //     defineAsUnEnumerable(obstacle.manageProperties.addProperty.addButton, 'parentObject', obstacle);
    //     defineAsUnEnumerable(obstacle.manageProperties.removeProperty.removeButton, 'parentObject', obstacle);
    // }
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
                });

                property.appendChild(label);
            },
            object: (key, subObject, {input, property, obstacle}) => {
                // TODO
                // if(key === 'addButton' || key === 'removeButton'){
                //     this.obstaclePropertyMap[key](key, subObject, {input, property, obstacle});
                //     return;   
                // }

                const parent = obstacle.parentObstacle ?? obstacle;
                defineAsUnEnumerable(subObject, 'parentObstacle', parent);// highest layer above

                subObject.parentKey = key;
                defineAsUnEnumerable(subObject, 'parentObject', obstacle);// 1 layer above

                if(parent.subObjects === undefined){
                    defineAsUnEnumerable(parent, 'subObjects', {});
                }
                parent.subObjects[/*this.generateSubObjectId(subObject.parentObstacle, subObject)*/key] = subObject;
                
                property.appendChild(this.createFolder(subObject, this.formatName(key)));
            },
            // addButton: (key, object, {input, property, obstacle}) => {
            //     // class to add a property to an object
            //     input.classList.add('property-button-input');
            //     input.type = 'button';
            //     input.value = 'add property';

            //     const parent = object.parentObject;

            //     // const parentObstacle = obstacle.parentObstacle;
            //     // const parentObject = object.parentObject;

            //     input.onclick = () => {
            //         const name = parent.manageProperties.addProperty.name;
            //         const value = parent.manageProperties.addProperty.value;

            //         parent[name] = value;
            //         // this.editorManager.addObstacle(parent.parentObstacle ?? parent);
            //         // const name = parentObject.manageProperties.addProperty.name;
            //         // let value = parentObject.manageProperties.addProperty.value;
            //         // if(value.slice(0,4) === 'JSON'){
            //         //     //try adding JSON{"x":5,"y":100}
            //         //     try{
            //         //         value = JSON.parse(value.slice(4));
            //         //     } catch(e){
            //         //         value = parentObject.manageProperties.addProperty.value;
            //         //     }
            //         // }

            //         // if(parentObject[name] !== undefined){
            //         //     let propertyToRemove;
            //         //     if(parentObject[name].folderRef !== undefined){
            //         //         propertyToRemove = parentObject[name].folderRef;
            //         //     } else {
            //         //         propertyToRemove = parentObject.htmlRef[name].parentElement;
            //         //     }
            //         //     // this.removeObstacleProperty(parentObject, propertyToRemove, name);
            //         // }

            //         // parentObject[name] = value;
            //         // // applyToKeyChain(parentObstacle, [...parentObject._parentKeyChain, name], value);

            //         // // pro html
            //         // const parentFolderContent = input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            //         // parentFolderContent.appendChild(this.createProperty(parentObject, name, parentObject[name]));

            //         // this.client.updateObstacle(parentObstacle);

            //         // if(parentObject._parentKeyChain === undefined){
            //         //     var folderTitle = [parentObstacle.shape, parentObstacle.simulate.join('-'), parentObstacle.effect].map(s => s[0].toUpperCase() + s.slice(1)).join(' ')
            //         // } else {
            //         //     var folderTitle = parentObject._parentKeyChain[parentObject._parentKeyChain.length-1];
            //         // }
            //         // this.reloadFolder(parentObject, parentObject.folderRef, this.formatName(folderTitle));
            //     }
            //     property.appendChild(input);
            // },
            // removeButton: (key, object, {input, property, obstacle}) => {
            //     // class to add a property to an object
            //     input.classList.add('property-button-input');
            //     input.type = 'button';
            //     input.value = 'remove property';

            //     // const parentObstacle = obstacle.parentObstacle;
            //     // const parentObject = object.parentObject;

            //     const parentObject = object.parentObject;

            //     input.onclick = () => {
            //         const name = parentObject.manageProperties.removeProperty.name;
            //         delete parentObject[name];
            //         // const name = parentObject.manageProperties.removeProperty.name;
            //         // let propertyToRemove;
            //         // if(parentObject[name].folderRef !== undefined){
            //         //     propertyToRemove = parentObject[name].folderRef;
            //         // } else {
            //         //     propertyToRemove = parentObject.htmlRef[name].parentElement;
            //         // }
                    
            //         // // this.removeObstacleProperty(parentObject, propertyToRemove, name);

            //         // deleteKeyChain(parentObstacle, [...parentObject._parentKeyChain, name]);

            //         // // filtering out empty elements of arrays
            //         // if(Array.isArray(parentObject) === true){
            //         //     let objToApply = parentObstacle;
            //         //     const keyChain = parentObject._parentKeyChain;
            //         //     for(let i = 0; i < keyChain.length; i++){
            //         //         objToApply = objToApply[keyChain[i]];
            //         //     }
            //         //     delete objToApply[name];

            //         //     // TODO: if we remove element 2, then element 3 in an array should become element 2 (but rn it just stays as 3)
            //         //     applyToKeyChain(parentObstacle, parentObject._parentKeyChain, parentObject.filter(p => p != null || p === null || p === undefined || isNaN(p) === true));

            //         //     console.log({parentObstacle, chain: [...parentObject._parentKeyChain, name], parentObject: object.parentObject, objToApply});
            //         // }

            //         // // removing empty elements from array
            //         // // only removing "empty" elements
            //         // // parentObject.path = parentObject.path.filter(p => p != null || p === null || p === undefined || isNaN(p) === true);
            //         // // console.log(parentObstacle.path.map(p => typeof p));
            //         // // console.log(parentObstacle.path);

            //         // this.client.updateObstacle(parentObstacle);

            //         // this.reloadFolder(parentObject, parentObject.folderRef, this.formatName(parentObject._parentKeyChain[parentObject._parentKeyChain.length-1]));

            //         // // console.log(parentObstacle.path);

            //         // console.log({propertyToRemove,name, parentObject,  parentObstacle});
            //     }
            //     property.appendChild(input);
            // },
            color: (key, value, {input, property, obstacle}) => {
                input.classList.add('property-color-input');
                input.type = 'color';
                
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
    // generateSubObjectId(parent, subObject){
    //     let parentKeyChain = [];
    //     let currentObj = subObject;
    //     while(parent !== currentObj){
    //         currentObj = currentObj.parentObject;
    //         parentKeyChain.push(currentObj.parentKey);
    //     }

    //     parentKeyChain.pop();
    //     return parentKeyChain.join('-');
    // }
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
        input.id = generateId();
        
        input.value = value;

        // if(isLinkable === true){
            // defineKey(object, key, undefined, (value) => {
            //     // if(key !== 'lastChangedKey')object.lastChangedKey = key;// TODO: investigate if this is actually needed with the new system
            //     input.value = value//typeof value === 'number' ? Math.round(value * 10000) / 10000 : value;
            //     this.editorManager.addObstacle(object.parentObstacle ?? object);
            // });
        // }

        const isColorInput = typeConverter.toHex(value, 'notahex') !== 'notahex';
        
        input.oninput = ((event) => {
            const targetValue = typeof object[key] === 'number' ? parseFloat(event.target.value) : event.target.value;

            if(object.isEditorProperties !== true){
                // making sure input doesn't get changed to something different then what's input.
                const actualValue = window.initObstacle({...object, [key]: targetValue})[key];
                const actualString = typeof actualValue === 'number' ? actualValue.toString() : actualValue;
                if(actualString !== event.target.value){
                    input.classList.add('inputError');
                    return event.preventDefault();
                } else {
                    input.classList.remove('inputError');
                }
            }

            // TODO: intercept things if target value does not end up staying. also make the invalid input box have a soft dark red glow

            object[key] = targetValue;// hmm this is kinda inefficient because the input is regenerated every time this happens. Maybe in the future add window.isInput flag that gets caught at bindManager.js? <- NVM SCREW INEFFICIENCY DUMBASS THIS IS EVADES X NOT GOOGLE.COM GTFU WITH YOUR POTATO PCS LMAO

            if(isColorInput || object.isEditorProperties)return;// if stuff ever gets changed here again then make sure to disable editor properties! This can be done easily by just disabling the start method in editorSettingsManager.js

            // i dont like the old system so im rewriting it. Basically what we want to do is focus the input of the corresponding in newObj. We can do this using keyChaining.
            // step 1. get the old key chain using parentKey until there's no more parentObstacle
            let keyChain = [];
            let currentObject = object;
            while(/*object.parentObstacle or same as*/currentObject.parentKey){
                keyChain.push(currentObject.parentKey);
                currentObject = currentObject.parentObject;
            }
            keyChain.reverse();

            const newObj = this.editorManager.addObstacle(object.parentObstacle ?? object);

            // step 2. get the object from the parent key chain
            const newSubObj = getKeyChain(newObj, keyChain);
            // get the input element within this object and apply the last key
            const newInput = newSubObj.el.sub[key].querySelector("input");

            newInput.focus();
            newInput.setSelectionRange(input.selectionStart, input.selectionEnd);

            // const newSubObj = object.parentObstacle !== undefined ? newObj.subObjects[/*this.generateSubObjectId(object.parentObstacle, object)*/object.parentKey/*new and old objects have the same parentKey*/] : newObj;
            // // console.log({newObj, newSubObj, object, parentKey: object.parentKey});
            // const newInput = newSubObj.el.sub[key].querySelector("input");// NOTE: THERE IS A GAME BREAKING BUG WHERE OBJECT.PARENTKEY IS DEFINED. PLEASE FIND AND FIX IT BEFORE RELEASE.

            // newInput.focus();
            // newInput.setSelectionRange(input.selectionStart, input.selectionEnd);

            // if(object.parentObstacle !== undefined){
            //     newSubObj.el.sub[key].querySelector("input").focus();
            //     newSubObj.el.sub[key].querySelector("input").setSelectionRange(newSubObj.el.sub[key].querySelector("input").selectionStart, newSubObj.el.sub[key].querySelector("input").selectionEnd);
            // } else {
            //     newObj.el.sub[key].querySelector("input").focus();
            //     newObj.el.sub[key].querySelector("input").setSelectionRange(newObj.el.sub[key].querySelector("input").selectionStart, newObj.el.sub[key].querySelector("input").selectionEnd);
            // }
            
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
    generateFolder(folderName){
        const folder = document.createElement('div');
        folder.classList.add('folder');

        const folderButton = document.createElement('button');
        folderButton.classList.add('folder-button');
        
        folder.folderName = folderName;
        folderButton.innerHTML = '<span class="or">▸</span>&nbsp;' + folder.folderName;
        folder.appendChild(folderButton);

        folderButton.parentElement.isOpen = false;
        folderButton.addEventListener('mousedown', (event) =>
            this.clickFolder(event, folderButton.parentElement)
        );

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

function getKeyChain(obj, chain) {
    let subObject = obj;
    
    for (let i = 0; i < chain.length; i++) {
        if(subObject[chain[i]] !== undefined){
            subObject = subObject[chain[i]];
        }
    }
    
    return subObject;
}