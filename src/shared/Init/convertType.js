function toBoolean(key, defaultValue=false){
    return (key !== false && key !== true) ? defaultValue : key;
}

function toNumber(num, defaultNumber=0){
    return Number.isFinite(num) ? num : defaultNumber;
}

function toString(str, defaultString="Hello World!"){
    return typeof str === 'string' ? str : defaultString;
}

function toHex(hex, defaultHex="#ff0000"){
    if(typeof hex !== 'string' || hex.length <= 1 || (hex.length-1)%3 !== 0 /*<- rgb, rrggbb, ...*/){
        return defaultHex;
    }
    if(hex[0] !== '#')return defaultHex;
    for(let i = 1; i < hex.length; i++){
        if(Number.isFinite(parseInt(hex[i], 16)) === true)continue;
        return defaultHex;
    }
    return hex;
}

// STRUCTURE FORMAT

// a) object as advanced object
// {
//      type: object,
//      keys: {a: {type: "number"}, b: {type: "array", maxLength: 3, sub: {type: "number"}}},
//      excludedKeys: ['e','drip']
// }
// Valid Example: {a: 3, b: [1,2], c: 'whatever', d: {a: 'b'}}

// c) basic array
// basic type, advanced number, advanced array substructure
// ["number",{type: "number"},{type: 'array', maxLength: 5, minLength: 2}]
// Valid example: [3,[1,2,3,4],17,"amongus",{whatever: "tf"}];

// d) defining an array with complex params inside an object
// {type: "array", maxLength: 5, minLength: 2, sub: {type: "number"}}
// Valid example: [0,2,3]

// bonus nesting example
// {type: "array", sub: {type: "array", sub: {type: "array", maxLength: 5, sub: {type: "number"}}}}
// Valid Example: [[[1,2,3,4]],[[]]]

// actually i could just make everything an advanced object {type: "array", }

function toType(val){
    if(val === 'null')return 'null';
    return Array.isArray(val) ? 'array' : typeof val;
}

function toStructure(structure, init, defaultValue){
    if(toType(init) !== structure.type){ return defaultValue; }
    if(structure.type === 'array'){
        if(init.length < (structure.minLength??0) || init.length > (structure.maxLength??1E99)){
            return defaultValue;
        }
        if(structure.sub === undefined || structure.sub.type === undefined){
            console.log('Array Structure Subtype undefined! shared convertType.js');
            console.log(structure);
        }
        for(let i = 0; i < init.length; i++){
            const subType = Array.isArray(structure.sub.type) ? structure.sub.type[Math.min(structure.sub.type.length-1,i)] : structure.sub.type;
            if(toType(init[i]) !== subType){
                return defaultValue;
            } else if(toStructure({...structure.sub, type: subType}, init[i], 'INVALIDSTRUCTURE') === 'INVALIDSTRUCTURE'){
                return defaultValue;
            }
        }
        return init;
    } else if(structure.type === 'object'){
        // converting from ['a','b'] to {a: true, b: true}
        // in order to save a time complexity
        if(structure.excludedKeys === undefined){
            structure.excludedKeys = [];
        }
        if(structure.keys === undefined){
            structure.keys = {};
        }
        if(Array.isArray(structure.excludedKeys) === true){
            let newExcludedKeys = {};
            for(let i = 0; i < structure.excludedKeys.length; i++){
                newExcludedKeys[structure.excludedKeys[i]] = true;
            }
            structure.excludedKeys = newExcludedKeys;
        }
        // check that all keys are there
        for(let key in structure.keys){
            if(init[key] === undefined){
                return defaultValue;
            } else if(toStructure(structure.keys[key], init[key], 'INVALIDSTRUCTURE') === 'INVALIDSTRUCTURE'){
                return defaultValue;
            }
        }
        for(let key in structure.excludedKeys){
            if(init[key] !== undefined){
                return defaultValue;
            }
        }
        return init;
    } else {
        // this is a primitive type
        return init;
    }
}

if(typeof module !== 'undefined'){
    module.exports = {toBoolean, toNumber, toString, toHex, toStructure};
} else {
    window.typeConverter = {toBoolean, toNumber, toString, toHex, toStructure}
}