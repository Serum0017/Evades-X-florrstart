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
    if(typeof hex !== 'string'){
        return defaultHex;
    }
    for(let i = 0; i < hex.length; i++){
        if(i === 0 && hex[i] === '#')continue;
        if(Number.isFinite(parseInt(hex[i], 16)) === true)continue;
        return defaultHex;
    }
    return hex;
}

if(typeof module !== 'undefined'){
    module.exports = {toBoolean, toNumber, toString, toHex};
} else {
    window.typeConverter = {toBoolean, toNumber, toString, toHex}
}