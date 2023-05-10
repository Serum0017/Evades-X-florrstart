import transformBody from "./transformBody.js";
import satFactory from "./satFactory.js";

const eventEmitterMap = {
    parameterEqualTo: (event, obstacle) => {
        /*eventEmitters: [{type: 'parameterEqualTo', keyChain: ['grav','z'], value: 100, id: 5}*/
        if(keyChain(obstacle, event.keyChain) === event.value){
            return true;
        }
        return false;
    },
    parameterGreaterThan: (event, obstacle) => {
        if(keyChain(obstacle, event.keyChain) > event.value){
            return true;
        }
        return false;
    },
    parameterLessThan: (event, obstacle) => {
        if(keyChain(obstacle, event.keyChain) < event.value){
            return true;
        }
        return false;
    },
    parameterInRange: (event, obstacle) => {
        if(keyChain(obstacle, event.keyChain) <= event.maxValue && keyChain(obstacle, event.keyChain) >= event.minValue){
            return true;
        }
        return false;
    },
    // collidedWithPlayer: (event, obstacle, {tick}) => {
    //     if(obstacle.lastCollidedTime === tick){
    //         return true;
    //     }
    //     return false;
    // },
    timePassed: (event, obstacle) => {
        event.currentTime--;
        if(event.currentTime < 0){
            event.currentTime = event.maxTime;
            return true;
        }
        return false;
    },
};

const eventRecieverMap = {
    changeParameter: (reciever, obstacle) => {
        let lastState = {x: obstacle.x, y: obstacle.y, rotation: obstacle.rotation};
        let value = keyChain(obstacle, reciever.keyChain);

        // safeguard to prevent from setting x to undefined
        // TODO: implement the same thing for setting objects to an invalid state (ex. setting moving from [{x: 300, y: 200}] to ['lmao','have fun with','your game crashing'])

        if(reciever.setValue !== undefined && typeof value === typeof reciever.setValue){
            value = reciever.setValue;
        }

        // TODO: make sure all of the preceeding assignments are numbers as well
        if(Number.isFinite(value)){
            if(reciever.addValue !== undefined){
                value += reciever.addValue;
            }
            if(reciever.addRandomValue !== undefined){
                value += Math.random() * reciever.addRandomValue;
            }
            if(reciever.multiplyValue !== undefined){
                value *= reciever.multiplyValue;
            }
            if(reciever.exponentiateValue !== undefined){
                value = value ** reciever.multiplyValue;
            }
        }

        applyToKeyChain(obstacle, reciever.keyChain, value);
        
        // TODO: once growing is implemented implement change in w/h
        transformBody(obstacle, {x: obstacle.x - lastState.x, y: obstacle.y - lastState.y, rotation: obstacle.rotation - lastState.rotation});
    },
    clone: (reciever, obstacle, { obstacles }) => {
        let clone = window.structuredClone(obstacle);

        delete clone.eventEmitters;
        delete clone.eventRecievers;

        for(let key in reciever.parametersToSet){
            clone[key] = reciever.parametersToSet[key];
        }
        for(let key in reciever.parametersToAdd){
            if(Number.isFinite(reciever.parametersToAdd[key]) === false){
                continue;
            }
            clone[key] += reciever.parametersToAdd[key];
        }

        clone.body = satFactory.generateSAT(clone.body, clone);

        transformBody(clone, {x: clone.x - obstacle.x, y: clone.y - obstacle.y, rotation: clone.rotation - obstacle.rotation});

        obstacles.push(clone);
    }
}

function keyChain(obj, chain) {
    let subObject = obj;
    
    for (let i = 0; i < chain.length; i++) {
        if(subObject[chain[i]] !== undefined){
            subObject = subObject[chain[i]];
        }
    }
    
    return subObject;
}

// story behind this algo:
// this was my first stackoverflow question
// posted the question on 5/9
// got an answer the same day
// thank you to unmitigated 4 working answer :D
// function applyToKeyChain(obj, chain, value){
//     const last = chain.pop();
//     chain.reduce((acc, k) => acc[k], obj)[last] = value;
//     console.log(obj);
// }
function applyToKeyChain(obj, chain, value){
    let lookUpString = '';
    for(let i = 0; i < chain.length; i++){
        lookUpString += "['" + chain[i].replaceAll(']','') + "']";
    }
    
    try {
        eval(`obj${lookUpString} = value;`);// TODO: ENSURE THIS IS SAFE!
    } catch(e){}
}

// O(n^4) algorithm 💀
function checkEmmisions(obstacles, advanced){
    for(let i = 0; i < obstacles.length; i++){
        if(obstacles[i].eventEmitters === undefined){ continue; }
        for(let j = 0; j < obstacles[i].eventEmitters.length; j++){
            if(eventEmitterMap[obstacles[i].eventEmitters[j].type](obstacles[i].eventEmitters[j], obstacles[i]) === true && obstacles[i].eventEmitters[j].finished !== true){
                emitEvent(obstacles, obstacles[i].eventEmitters[j].id, advanced);
                // if(obstacles[i].eventEmitters[j].toLoop === false){
                //     obstacles[i].eventEmitters[j].finished = true;
                // }
            }
        }
    }
}

function emitEvent(obstacles, id, advanced){
    for(let i = 0; i < obstacles.length; i++){
        if(obstacles[i].eventRecievers === undefined){ continue; }
        for(let j = 0; j < obstacles[i].eventRecievers.length; j++){
            if(obstacles[i].eventRecievers[j].id === id && obstacles[i].eventRecievers[j].finished !== true){
                eventRecieverMap[obstacles[i].eventRecievers[j].type](obstacles[i].eventRecievers[j], obstacles[i], advanced);
                if(obstacles[i].eventRecievers[j].toLoop !== true){
                    obstacles[i].eventRecievers[j].finished = true;
                }
            }
        }
    }
}

export default { checkEmmisions };