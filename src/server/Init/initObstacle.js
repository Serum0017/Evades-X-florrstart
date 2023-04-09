// combination of other modules that are required to intialize obstacles
module.exports = function intializeObstacles(init) {
    for(let i = 0; i < init.length; i++){
        initType(init[i]);// check miro for the order, idk if this is right
        initSimulate(init[i]);
    }
}