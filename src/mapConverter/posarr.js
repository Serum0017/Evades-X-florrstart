const parseMap = require('../parser.js');
let text = `{"arena":{"width":1000,"height":1000},"enemy":[],"safes":[],"spawns":[],"playerSpawn":{"x":50,"y":50},"name":"PoSaRR","longName":"Planet of Sadistic and Ruthless Retribution","tileColor":"#383838","bgColor":"#0d0d0d","safeColor":"#8c8c8c","difficulty":"Cataclysmic","texts":[],"obstacles":[{"type":"lava","x":100,"y":0,"w":50,"h":25,"canCollide":true},{"type":"lava","x":0,"y":100,"w":150,"h":50,"canCollide":true},{"type":"lava","x":100,"y":75,"w":50,"h":25,"canCollide":true},{"type":"lava","x":200,"y":50,"w":25,"h":100,"canCollide":true},{"type":"lava","x":150,"y":125,"w":50,"h":25,"canCollide":true},{"type":"lava","x":300,"y":0,"w":25,"h":150,"canCollide":true},{"type":"timetrap","x":175,"y":125,"w":175,"h":175,"maxTime":10},{"type":"typing","x":150,"y":150,"w":225,"h":150,"text":"good luck typing this huge phrase in only ten seconds of time, you will need it, because you cannot possibly pass this lol you are so dead for sure oh pretty close now well gg"}]}`
module.exports = parseMap(text);// bru what
//https://www.youtube.com/watch?v=RXJKdh1KZ0w