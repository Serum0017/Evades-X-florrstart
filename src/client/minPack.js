function minPack(last, v){
    if(Array.isArray(v) === true && Array.isArray(last) === true){
        const toSend = {};
        for(let i = 0; i < Math.max(last.length, v.length); i++){
            if(minPack(last[i], v[i]) !== 'NOTINCLUDED'){
                toSend[i] = minPack(last[i], v[i]);
            }
        }
        return Object.keys(toSend).length === 0 ? 'NOTINCLUDED' : toSend;
    } else if(typeof v === 'object' && v !== null && typeof last === 'object' && last !== null){
        const combined = (Object.keys(v)).concat((Object.keys(last)));
        const toSend = {};
        for(let i = 0; i < combined.length; i++){
            const key = combined[i];
            if(minPack(last[key], v[key]) !== 'NOTINCLUDED'){
                toSend[key] = minPack(last[key], v[key]);
            }
        }
        return Object.keys(toSend).length === 0 ? 'NOTINCLUDED' : toSend;
    } else {
        if(last === v){
            return 'NOTINCLUDED';
        } else if(v === undefined) {
            return 'REMOVEKEY';
        } else {
            return v;
        }
    }
}

function reconstructMinPack(last, v, baseObj=last, keyChain=[]){
    if(v === 'NOTINCLUDED')return;
    if(v === 'REMOVEKEY'){
        deleteKeyChain(baseObj, keyChain);
    } else if(typeof v === 'object' && v !== null){
        if(typeof last === 'object' && last !== null){
            for(let key in v){
                reconstructMinPack(last[key], v[key], baseObj, [...keyChain, key]);
            }
        } else {
            applyToKeyChain(baseObj, keyChain, v);
        }
    } else {
        // last = v;
        applyToKeyChain(baseObj, keyChain, v);
    }
}

function applyToKeyChain(obj, chain, value){
    const last = chain.pop();
    chain.reduce((acc, k) => acc[k], obj)[last] = value;
}

function deleteKeyChain(obj, chain){
    const last = chain.pop();
    delete chain.reduce((acc, k) => acc[k], obj)[last];
}

function cloneObject(v){
    let newObj;
    if(Array.isArray(v) === true){
        newObj = [];
        for(let i = 0; i < v.length; i++){
            newObj[i] = cloneObject(v[i]);
        }
    } else if(typeof v === 'object') {
        newObj = {};
        for(let key in v){
            newObj[key] = cloneObject(v[key]);
        }
    } else {
        newObj = v;
    }
    return newObj;
}

export default {minPack, reconstructMinPack, cloneObject};