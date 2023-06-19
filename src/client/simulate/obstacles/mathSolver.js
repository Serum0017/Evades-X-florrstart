export default function solve(string='sin(x)', x){
    string = string.replaceAll(' ','').replaceAll('PI',Math.PI.toString()).replaceAll('var',x);
    // TODO: make sure the fn cant provide errors or crash the game
    // find the first closing parenthesis while also seeing the last open parenthesis
    let lastOpenIndex = null;

    // TODO: since every time we eval a function we lose 1 of each parenthesis,
    // make a parenthesis count and lower big O by 1 order of magnitude by
    // starting at the beginning until parenthesis == 0 and parenthesis-- every time 
    while(string.includes('(') === true){
        mainLoop: for(let i = 0; i < string.length; i++){
            if(string[i] === '('){
                lastOpenIndex = i;
            } else if(string[i] === ')'){
                if(lastOpenIndex === null){
                    continue;
                }
    
                // goal: eval whatever is inside the parenthesis
                // going from sin(x) * 5, x=0 to 1 * 5 in the string
                // or (5 + 4 * x) + 2, x=0 to 5 + 2
    
                // split whatever's inside the function by commas
                const functionSubStr = string.slice(lastOpenIndex + 1, i);
                let functionParams = functionSubStr.split(',').map(subParam => solve(subParam, x));
    
                // if there's a math function then eval that -> eval being replace the characters with the answer
                functionLoop: for(let j = 6; j >= 3; j--){
                    const fnName = string.slice(Math.max(0,lastOpenIndex - j),lastOpenIndex);
                    if(typeof Math[fnName] === 'function'){
                        string = replaceAt(string, Math.max(0,lastOpenIndex - j), i+1, Math[fnName](...functionParams).toString());
                        break mainLoop;// to prevent offsets from substitution
                    }
                }
    
                // otherwise, if its just normal parenthesis (5 + x) * 2 and there's only 1 function parameter than return that
                if(functionParams.length === 1){
                    string = replaceAt(string, lastOpenIndex, i+1, functionParams[0]);
                    break mainLoop;// to prevent offsets from substitution
                }
    
                // return 0;
            }
        }
    }

    // all parenthesis are cleared!

    // things should look like 5*x+2/17*x-3

    // evaluate all multiplication and division
    // TODO: For multiplication and division also keep track of the amount and loop until done instead of checking
    // every time like the optimization mentioned above
    // also dont forget to do this for addition/ subtraction as well
    while(string.includes('*') === true || string.includes('/') === true){
        for(let i = 0; i < string.length; i++){
            if(string[i] === '*' || string[i] === '/'){
                // find the number before and after the operation
                let startInd = i;
                do {
                    startInd--;
                } while(isNaN(parseInt(string[startInd])) === false || string[startInd] === '.' || /*if there's a negative sign on the left and the next character is another operator or ''*/(string[startInd] === '-' && isNaN(parseInt(string[startInd-1])) === true));
                startInd++;
    
                let endInd = i+1;
                do {
                    endInd++;
                } while(isNaN(parseInt(string[endInd])) === false || string[endInd] === '.');
    
                const leftSide = string.slice(startInd, i);
                const rightSide = string.slice(i+1, endInd);
    
                if(string[i] === '*'){
                    string = replaceAt(string, startInd, endInd, (parseFloat(leftSide) * parseFloat(rightSide)).toString());
                } else if(string[i] === '/'){
                    string = replaceAt(string, startInd, endInd, (parseFloat(leftSide) / parseFloat(rightSide)).toString());
                }
                break;// to prevent offsets from substitution
            }
        }
    }

    // // now the same thing for addition and subtraction :D
    while(string.includes('+') === true || string.includes('-') === true){
        for(let i = 0; i < string.length; i++){
            if(string[i] === '+' || string[i] === '-'){
                // find the number before and after the operation
                let startInd = i;
                do {
                    startInd--;
                } while(isNaN(parseInt(string[startInd])) === false || string[startInd] === '.' || /*if there's a negative sign on the left and the next character is another operator or ''*/(string[startInd] === '-' && isNaN(parseInt(string[startInd-1])) === true));
                startInd++;

                let endInd = i+1;
                do {
                    endInd++;
                } while(isNaN(parseInt(string[endInd])) === false || string[endInd] === '.');

                const leftSide = string.slice(startInd, i);
                const rightSide = string.slice(i+1, endInd);

                if(isNaN(parseInt(string[startInd-1])) === true && string[startInd] === '-'){
                    // negative number
                    return string;
                }

                if(string[i] === '+'){
                    string = replaceAt(string, startInd, endInd, (parseFloat(leftSide) + parseFloat(rightSide)).toString());
                } else if(string[i] === '-'){
                    string = replaceAt(string, startInd, endInd, (parseFloat(leftSide) - parseFloat(rightSide)).toString());
                }
                break;// to prevent offsets from substitution
            }
        }
    }
    
    return string;
}

function replaceAt(string, start, end, replaceText=""){
    return string.slice(0, start) + replaceText + string.slice(end, string.length);
}