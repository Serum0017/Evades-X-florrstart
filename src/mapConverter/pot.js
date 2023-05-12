const parseMap = require('../parser.js');


const text = `
	{"arena":{"width":6000,"height":6000},"enemy":[],"safes":[],"spawns":[],"playerSpawn":{"x":3175,"y":1100},"name":"PoT","longName":"Planet of Titans","tileColor":"#470000","bgColor":"#700000","safeColor":"#8c8c8c","difficulty":"Cataclysmic","texts":[{"x":3175,"y":2050,"w":25,"h":25,"size":80,"text":"WALL SINA","angle":0,"story":false},{"x":3175,"y":1500,"w":25,"h":25,"size":90,"text":"WALL ROSE","angle":0,"story":false},{"x":3175,"y":625,"w":25,"h":25,"size":100,"text":"WALL MARIA","angle":0,"story":false}],"obstacles":[{"type":"normal","x":2575,"y":2000,"w":1200,"h":100},{"type":"normal","x":2575,"y":2050,"w":100,"h":1650},{"type":"normal","x":2575,"y":3600,"w":1200,"h":100},{"type":"normal","x":3675,"y":2050,"w":100,"h":1600},{"type":"normal","x":4350,"y":1450,"w":100,"h":2750},{"type":"normal","x":1950,"y":4100,"w":2400,"h":100},{"type":"normal","x":1950,"y":1450,"w":100,"h":2650},{"type":"normal","x":2050,"y":1450,"w":2300,"h":100},{"type":"normal","x":650,"y":550,"w":4650,"h":150},{"type":"normal","x":650,"y":700,"w":150,"h":4600},{"type":"normal","x":800,"y":5150,"w":4650,"h":150},{"type":"normal","x":5300,"y":550,"w":150,"h":4600}]}
`
																																																																																											  
module.exports = parseMap(text);