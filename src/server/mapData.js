const exps = {};

const fs = require('fs');

const directory = fs.opendirSync(require("path").join(__dirname, "Maps"));
let file;
while ((file = directory.readSync()) !== null) {
    const mapData = require(`./Maps/${file.name}`);
    if(mapData !== 'exclude'){
        exps[mapData.name] = mapData;
    }
}
directory.closeSync();

module.exports = exps;