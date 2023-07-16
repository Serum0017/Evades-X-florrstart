import Ref from './editorRef.js';
import editorUtils from './editorUtils.js';
const {defineAsUnEnumerable, generateId, excludedProperties} = editorUtils;
import CreateManager from './createManager.js';
import EditManager from './editManager.js';
import BindManager from './bindManager.js';

export default class EditorManager {
    constructor(client){
        this.client = client;
        this.createManager = new CreateManager(client);
        this.editManager = new EditManager(client);
        this.bindManager = new BindManager(client);
    }
    start(){
        this.game = this.client.game;
        this.map = this.client.game.map;
        this.createManager.start();
        this.editManager.start();
        this.bindManager.start();
    }
    addObstacle(init){
        if(init.editorId !== undefined)this.client.game.map.obstacles = this.client.game.map.obstacles.filter(o => o.editorId !== init.editorId);

        init.refresh = true;
        const o = window.initObstacle(init);

        const proxyObs = this.bindManager.bindToDOM(o);
        defineAsUnEnumerable(proxyObs, 'editorId', generateId());

        if(init.el !== undefined){
            this.openSubFolders(proxyObs, init);
            init.el.folder.remove();
        }

        this.map.addObstacle(proxyObs);

        return proxyObs;
    }
    openSubFolders(o, last){
        // bug: TODO: points always closes itself
        if(last.el.folder.isOpen === true){
            this.editManager.clickFolder(null, o.el.folder);
        }
        for(let key in o){
            if(excludedProperties[key] === true)continue;
            if(typeof o[key] === 'object' && typeof last[key] === 'object'){
                this.openSubFolders(o[key], last[key]);
            }
        }
    }
}

// createEditorProperties(){
//     const obstacle = {isEditorProperties: true};
//     Object.defineProperty(obstacle, 'propData', {
//         enumerable: false,
//         value: {},
//     });
//     for(let i = 0; i < this.editMenuManager.editorProperties.length; i++){
//         const prop = this.editMenuManager.editorProperties[i];
//         const key = prop.key;
//         if(prop.keyName === undefined){
//             prop.keyName = prop.key;
//         }
//         obstacle.propData[prop.keyName] = prop;
//         obstacle.propData[prop.keyName].currentValue = prop.object[key];
//         Object.defineProperty(obstacle, prop.keyName, {
//             get(){
//                 return obstacle.propData[prop.keyName].currentValue;
//             },
//             set(v){
//                 obstacle.propData[prop.keyName].currentValue = v;
//                 obstacle.propData[prop.keyName].object[key] = v;
//             },
//             enumerable: true,
//         });
//     }
//     return this.createFolderAndInternals(obstacle, 'Editor Settings');
// }


// addButton: (key, object, {input, property, obstacle}) => {
//     // class to add a property to an object
//     input.classList.add('property-button-input');
//     input.type = 'button';
//     input.value = 'add property';

//     const parentObstacle = obstacle.parentObstacle;
//     const parentObject = object.parentObject;

//     input.onclick = () => {
//         const name = parentObject.manageProperties.addProperty.name;
//         let value = parentObject.manageProperties.addProperty.value;
//         if(value.slice(0,4) === 'JSON'){
//             //try adding JSON{"x":5,"y":100}
//             try{
//                 value = JSON.parse(value.slice(4));
//             } catch(e){
//                 value = parentObject.manageProperties.addProperty.value;
//             }
//         }

//         if(parentObject[name] !== undefined){
//             let propertyToRemove;
//             if(parentObject[name].folderRef !== undefined){
//                 propertyToRemove = parentObject[name].folderRef;
//             } else {
//                 propertyToRemove = parentObject.htmlRef[name].parentElement;
//             }
//             // this.removeObstacleProperty(parentObject, propertyToRemove, name);
//         }

//         parentObject[name] = value;
//         // applyToKeyChain(parentObstacle, [...parentObject._parentKeyChain, name], value);

//         // pro html
//         const parentFolderContent = input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
//         parentFolderContent.appendChild(this.createProperty(parentObject, name, parentObject[name]));

//         this.client.updateObstacle(parentObstacle);

//         if(parentObject._parentKeyChain === undefined){
//             var folderTitle = [parentObstacle.shape, parentObstacle.simulate.join('-'), parentObstacle.effect].map(s => s[0].toUpperCase() + s.slice(1)).join(' ')
//         } else {
//             var folderTitle = parentObject._parentKeyChain[parentObject._parentKeyChain.length-1];
//         }
//         this.reloadFolder(parentObject, parentObject.folderRef, this.formatName(folderTitle));
//     }
//     property.appendChild(input);
// },
// removeButton: (key, object, {input, property, obstacle}) => {
//     // class to add a property to an object
//     input.classList.add('property-button-input');
//     input.type = 'button';
//     input.value = 'remove property';

//     const parentObstacle = obstacle.parentObstacle;
//     const parentObject = object.parentObject;

//     input.onclick = () => {
//         const name = parentObject.manageProperties.removeProperty.name;
//         let propertyToRemove;
//         if(parentObject[name].folderRef !== undefined){
//             propertyToRemove = parentObject[name].folderRef;
//         } else {
//             propertyToRemove = parentObject.htmlRef[name].parentElement;
//         }
        
//         // this.removeObstacleProperty(parentObject, propertyToRemove, name);

//         deleteKeyChain(parentObstacle, [...parentObject._parentKeyChain, name]);

//         // filtering out empty elements of arrays
//         if(Array.isArray(parentObject) === true){
//             let objToApply = parentObstacle;
//             const keyChain = parentObject._parentKeyChain;
//             for(let i = 0; i < keyChain.length; i++){
//                 objToApply = objToApply[keyChain[i]];
//             }
//             delete objToApply[name];

//             // TODO: if we remove element 2, then element 3 in an array should become element 2 (but rn it just stays as 3)
//             applyToKeyChain(parentObstacle, parentObject._parentKeyChain, parentObject.filter(p => p != null || p === null || p === undefined || isNaN(p) === true));

//             console.log({parentObstacle, chain: [...parentObject._parentKeyChain, name], parentObject: object.parentObject, objToApply});
//         }

//         // removing empty elements from array
//         // only removing "empty" elements
//         // parentObject.path = parentObject.path.filter(p => p != null || p === null || p === undefined || isNaN(p) === true);
//         // console.log(parentObstacle.path.map(p => typeof p));
//         // console.log(parentObstacle.path);

//         this.client.updateObstacle(parentObstacle);

//         this.reloadFolder(parentObject, parentObject.folderRef, this.formatName(parentObject._parentKeyChain[parentObject._parentKeyChain.length-1]));

//         // console.log(parentObstacle.path);

//         console.log({propertyToRemove,name, parentObject,  parentObstacle});
//     }
//     property.appendChild(input);
// },


// class EditMenuGenerator {
//     constructor(client, editMenuManager){
//         this.client = client;
//         this.editMenuManager = editMenuManager;
//     }
//     start(){
//         this.selectionManager = this.editMenuManager.client.selectionManager;

//         this.defineObstaclePropertyMap();
//     }
    
//     definePropertyManager(o, folder){
//         o.manageProperties = {addProperty: {name: '', value: '', addButton: {}}, removeProperty: {name: Object.keys(o)[0], removeButton: {}}};
//         defineAsUnEnumerable(o.manageProperties.addProperty.addButton, 'parentObject', o);
//         defineAsUnEnumerable(o.manageProperties.removeProperty.removeButton, 'parentObject', o);
//         defineAsUnEnumerable(o, 'folderRef', folder);
//     }
    
//     // this function creates a folder/ input element property for a given field.
    
//     // this function creates a group of properties for an obstacle or for the editor.
// }