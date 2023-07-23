import Ref from './editorRef.js';
import editorUtils from './editorUtils.js';
const {defineAsUnEnumerable, generateId, excludedProperties} = editorUtils;
import CreateManager from './createManager.js';
import EditManager from './editManager.js';
import BindManager from './bindManager.js';
import SnapGridManager from './snapGridManager.js';
import SelectionManager from './selectionManager.js';

export default class EditorManager {
    constructor(client){
        this.client = client;
        this.selectionManager = new SelectionManager(client);
        this.snapGridManager = new SnapGridManager(client);
        this.createManager = new CreateManager(client);
        this.editManager = new EditManager(client);
        this.bindManager = new BindManager(client);
    }
    start(){
        this.game = this.client.game;
        this.map = this.client.game.map;
        this.selectionManager.start();
        this.createManager.start();
        this.editManager.start();
        this.bindManager.start();

        // TODO
        // this.defineImportantProps();
    }
    addObstacle(init){
        const openTree = this.createOpenFolderStructure(init);
        // if this gets any bigger then isolate it into a separate function. This will happen bc we'll fix rotation im pretty sure
        const mapObstacles = this.client.game.map.obstacles;
        for(let i = 0; i < mapObstacles.length; i++){
            if(mapObstacles[i].editorId === init.editorId){
                this.client.game.map.removeObstacle(i);
                break;
            }
        }
        // if(init.editorId !== undefined)this.client.game.map.obstacles = this.client.game.map.obstacles.filter(o => o.editorId !== init.editorId);

        init.refresh = true;

        // TODO: fix rotation! its not a hard problem its just because im sick
        // if(init.body !== undefined && init.rotation !== undefined && init.pivot !== undefined){
        //     console.log(init);
        //     init.body.rotateRelative(-init.rotation, init.pivot);// resetting rotation
        // }
        
        const o = window.initObstacle(init);
        if(init.rotation !== undefined)o.body.rotateRelative(-init.rotation, o.pivot);

        // whenever objects are assigned with the equals sign, this erases all of the manageProperties and other stuff needed. Usually this is fine but in this case we need to regenerate values in manageProperties before we bindToDOM
        // TODO make sure there arent any other unexpected bugs because of this
        // this.reAssignManageProperties(init, o);// TODO

        // obstacle.pivot.manageProperties = init.pivot?.manageProperties;
        // console.log(obstacle.pivot == init.pivot);
        // console.log(o?.pivot?.manageProperties, init?.pivot?.manageProperties);
        // console.log(obstacle, init);
        // console.log(obstacle.pivot, init.pivot);
        // console.log(obstacle.pivot?.manageProperties, init.pivot?.manageProperties);
        // if(window.toThrow === true)throw new Error("Logs pls finish now!");

        const proxyObs = this.bindManager.bindToDOM(o);
        defineAsUnEnumerable(proxyObs, 'editorId', generateId());

        // this.reDefinePropertyManager(proxyObs);

        if(openTree !== false){
            // make new elements have the same ids as the old ones
            this.applyDomIds(init, o);

            // re open sub folders
            // this.openSubFolders(proxyObs, init);
            this.reOpenFolderStructure(openTree, proxyObs);

            // remove old html elements
            init.el.folder.remove();
        }

        // lets add special properties to an object for the addButtons and removeButtons. We want to add stuff based on type.
        // we have to do this as a proxyObs because otherwise it won't bind and create the elements we want
        this.addManageButtons(proxyObs);

        this.map.addObstacle(proxyObs);

        return proxyObs;
    }
    addManageButtons(o){
        // o.manageProperties = {
        //     // addProperty: {
        //     //     name: '', value: '',
        //     //     addButton: {
        //     //         ref: {
        //     //             parent: o,
        //     //             name: undefined,
        //     //             value: undefined,
        //     //         }
        //     //     }
        //     // },
        //     // removeProperty: {
        //     //     name: Object.keys(o)[0],
        //     //     removeButton: {
        //     //         ref: {
        //     //             parent: o,
        //     //             name: undefined,
        //     //             value: undefined,
        //     //         }
        //     //     }
        //     // }
        // };
        // // defining undefined pieces of ref
        // // o.manageProperties.addProperty.addButton.ref.name = o.manageProperties.addProperty.name;
        // // o.manageProperties.addProperty.addButton.ref.value = o.manageProperties.addProperty.value;
        // // o.manageProperties.removeProperty.removeButton.ref.name = o.manageProperties.removeProperty.name;
        // // o.manageProperties.removeProperty.removeButton.ref.value = o.manageProperties.removeProperty.value;

        // console.log(o);

        // // o[key].addButton = {ref: o[key], parentRef: o};
        // // o[key].removeButton = {ref: o[key], parentRef: o};

        // for(let key in o){
        //     if(typeof o[key] !== 'object' || ['addProperty','removeProperty','manageProperties','addButton','removeButton'].includes(key) || excludedProperties[key] === true)continue;
        //     this.addManageButtons(o[key]);
        // }
        if(o.shape === 'poly' && o.initialShape === undefined){
            o.points.addButton = {ref: o.points, keyName: 0, keyValue: [0, 0]};
            o.points.removeButton = {ref: o.points};
        }
        if(o.simulate === 'move'){
            o.path.addButton = {ref: o.path, keyName: 0, keyValue: {x: 0, y: 0}};
            o.path.removeButton = {ref: o.path};
        }
        // global properties
        // o.addButton = 
    }
    applyDomIds(last, o){
        // takes the old ids and makes the new ones the same
        // we'll remove the new ones anyways
        for(let key in last){
            if(excludedProperties[key] === true)continue;
            o.el.sub[key].id = last.el.sub[key].id;
            last.el.sub[key].id = generateId();// make it something else

            if(typeof last[key] !== 'object' || typeof o[key] !== 'object')continue;

            this.applyDomIds(last[key], o[key]);
        }
    }
    // openSubFolders(o, last){
    //     // bug: TODO: points always closes itself
    //     if(last.el.folder.isOpen === true){
    //         this.editManager.clickFolder(null, o.el.folder);
    //     }
        
    //     for(let key in o){
    //         if(excludedProperties[key] === true)continue;
    //         if(typeof o[key] === 'object' && typeof last[key] === 'object'){
    //             this.openSubFolders(o[key], last[key]);
    //         }
    //     }
    // }
    // reDefinePropertyManager(o){
    //     // folders are created before the object is a proxy, meaning that we have to reassign stuff here
    //     // this.editManager.createPropertyManagerParentObject(o);
    //     this.editManager.createPropertyManager(o);

    //     for(let key in o){
    //         if(typeof o[key] !== 'object')continue;
    //         this.reDefinePropertyManager(o[key]);
    //     }
    // }
    reAssignManageProperties(last, o){
        o.manageProperties = last.manageProperties;

        for(let key in last){
            if(typeof last[key] !== 'object' || typeof o[key] !== 'object')continue;
            this.reAssignManageProperties(last[key], o[key]);
        }
    }
    reOpenFolderStructure(struc, o){
        this.editManager.clickFolder(null, o.el.folder);
        for(let key in struc){
            this.reOpenFolderStructure(struc[key], o[key]);
        }
    }
    // TODO
    // defineImportantProps(){
        
    //     // these are properties that we don't want to be influenced by others. For example, if we change the angle of something then we don't want the x position to change if there's a different pivot.
    //     this.importantProps = ['x','y','rotation','manageProperties'];

    //     // this.importantProperties = {};
    //     // for(let i = 0; i < this.importantProps.length; i++){
    //     //     this.importantProperties[this.importantProps[i]] = true;
    //     // }
    //     // delete this.importantProps;
    // }
    // reAssignImportantProps(o, last){
    //     return;
    //     console.log(last);
    //     for(let i = 0; i < this.importantProps.length; i++){
    //         const importantKey = this.importantProps[i];
    //         if(last[importantKey] !== undefined){
    //             o[importantKey] = last[importantKey];
    //         }
    //     }
    //     for(let key in last){
    //         if(typeof last[key] !== 'object' || typeof o[key] !== 'object')continue;
    //         this.reAssignImportantProps(o[key], last[key]);
    //     }
    // }
    createOpenFolderStructure(last){
        // returns nested objects with keys specifying the keys of last that were open
        if(last?.el?.folder?.isOpen !== true){
            return false;
        }

        const struc = {};
        for(let key in last){
            if(typeof last[key] !== "object" || excludedProperties[key] === true)continue;
            if(last[key]?.el?.folder?.isOpen === true){
                const subStruc = this.createOpenFolderStructure(last[key]);
                if(subStruc !== false){
                    struc[key] = subStruc;
                }
            }
        }
        return struc;
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