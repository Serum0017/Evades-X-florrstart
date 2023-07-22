// // this is in addtion to client utils.js
// function defineKey(o, key, getFunction, setFunction, deleteFunction/*TODO*/){
//     if(o._getterData === undefined){
//         defineAsUnEnumerable(o, '_getterData', {});
//     }

//     if(o._getterData[key] === undefined){
//         o._getterData[key] = {value: o[key], getFunctions: [], setFunctions: []};
//     }
//     if(getFunction !== undefined)o._getterData[key].getFunctions.push(getFunction);
//     if(setFunction !== undefined)o._getterData[key].setFunctions.push(setFunction);
    
//     delete o[key];
//     Object.defineProperty(o, key, {
//         get(){
//             // run each getter function
//             for(let i = 0; i < o._getterData[key].getFunctions.length; i++){
//                 o._getterData[key].getFunctions[i]();
//             }

//             return o._getterData[key].value;
//         },
//         set(value){
//             // run each setter function
//             for(let i = 0; i < o._getterData[key].setFunctions.length; i++){
//                 o._getterData[key].setFunctions[i](value);
//             }

//             o._getterData[key].value = value;
//         },
//         // TODO: maybe mess with proxies and stuff and see if we can get delete working
//         // delete(){
//         //     delete o._getterData[key];
//         //     delete o[key];
//         // },
//         configurable: true,
//         enumerable: true,
//     })

//     return o._getterData[key].getFunctions.length - 1;
// }

// // removes all getters and setters made by a previous object
// function removeGetters(o){
//     for(let key in o){
//         o._getterData[key] = {getFunctions: [], setFunctons: []};
//     }
// }

// once stuff is reloaded in the editor, stuff needs to be reset
function regenerateKeys(o){// scrapped, i dont like the way vthat there's a differentiation between reloaded and inited
    if(o._getterData === undefined){
        return;
    }

    for(let key in o._getterData){
        if(o[key] !== undefined){
            o._getterData[key].value = o[key];
        }
        
        delete o[key];

        for(let i = 0; i < o._getterData[key].getFunctions.length; i++){
            defineKey(o, key, o._getterData[key].getFunctions[i], o._getterData[key].setFunctions[i]);
        }
    }
}

function defineAsUnEnumerable(object, keyName, value) {
    Object.defineProperty(object, keyName, {
        value,
        enumerable: false,
        configurable: true,
        writable: true
    });
}

const excludedProps = [
    'shape',/*'simulate',*/'effect','difference','type','body','render','lastState','toRender','parametersToReset','renderFlag','timeRemain','xv','yv',/*'_properties',*/'editorPropertyReferences',
    'hashId','hashPositions','lastCollidedTime','specialKeyNames','spatialHash','snapCooldown','snapToShowVelocity','interpolatePlayerData','difficultyNumber','map','acronym','isEditorProperties',
    /*'_parentKeyChain','parentObstacle','htmlRef', -TODO: remove all htmlref comments once new system is proven to work*/'visible','renderCircleSize','snapRotateMovementExpansion',
    'rotateMovementExpansion','mapInitId','resizePoints','pointOn','pointTo','isSelected', 'refresh','initialShape','hasParent','specialPropsToReset','parentObject','lastChangedKey',/*,'folderRef'*/
    'subObjectHashId','parentKey'
];

const excludedProperties = {};
for(let i = 0; i < excludedProps.length; i++){
    excludedProperties[excludedProps[i]] = true;
}

let id = 0;
function generateId(){
    return id++;
}

export default {defineAsUnEnumerable, /*defineKey, removeGetters,*/ excludedProperties, generateId};