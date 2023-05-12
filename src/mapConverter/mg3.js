const { NormalObstacle, BouncyObstacle,
	CircularNormalObstacle, CircularBouncyObstacle,
	Lava, RotatingLava, SpeedObstacle, GravObstacle,
	Tp, MovingObstacle, StoryDisplay, Pusher, MovingLavaObstacle, Portal, Winpad, Booster, WallBooster, WB, SpeedTrap, GrowingObstacle, GrowingLavaObstacle, GrowingCircleObstacle, GrowingCircleLavaObstacle, SizePlayer, Slip, BoostPad, Tornado, SnapGrid, VinetteIncrease, ColorChange, Checkpoint, InvincibilityPowerup, Particles, Gun, SwitchGrav, ZombieMaker, RevivePowerup, CircularHollowObstacle, DragonPowerup, CircularTpObstacle, RestrictAxis, Custom, Zoom }= require("./!conversionClasses.js");
const Spawner = require('../spawner.js');
const Safe = require('../safe.js');
const Text = require('../text.js');
const parseAddedObs = require('../addedobsparser.js');

const minigames = {
  arena: { width: 6000, height: 6000 },
  enemy: [],
  safes: [],
  texts: [],
  obstacles: [],
  spawns: [],
  playerSpawn: {x: 3000, y: 3000},
  name: 'Minigames3',
  longName: 'Minigames3',
  bgColor: '#182617',
    tileColor: '#1f401d',
  difficulty: "Peaceful",
  addedObstacles: []
}

let { texts, obstacles, safes, spawns, playerSpawn, arena } = minigames;
eval(parseAddedObs(`[{"x":5800,"y":2950,"w":150,"h":50,"type":"switchgrav","dirs":[{"direction":"right","force":5000,"time":2,"x":5000,"y":0},{"direction":"left","force":5000,"time":2,"x":-5000,"y":0}]},{"x":2650,"y":2650,"r":180,"tpx":500,"tpy":500,"type":"circle-tp","radius":180},
{"x":3350,"y":3350,"r":180,"tpx":5875,"tpy":2975,"type":"circle-tp","radius":180},{"x":3000,"y":3000,"radius":1000,"type":"circle-hollow","innerRadius":500},{"x":500,"y":500,"radius":1000,"type":"circle-hollow","innerRadius":500},{"x":1175,"y":-100,"w":2575,"h":2500,"type":"normal","canJump":true},{"x":-100,"y":1125,"w":2450,"h":2875,"type":"normal","canJump":true},{"x":500,"y":500,"w":0,"h":0,"type":"drpu","state":true},{"x":-150,"y":-125,"w":1350,"h":1275,"type":"size","size":80},{"x":3000,"y":3000,"w":0,"h":0,"type":"drpu","state":false},{"x":3000,"y":3525,"w":2500,"h":2475,"type":"normal","canJump":true},{"x":3725,"y":3000,"w":2425,"h":2400,"type":"normal","canJump":true},{"x":5500,"y":5400,"w":500,"h":600,"type":"raxis","rx":false,"ry":true},
{"x":5800,"y":2950,"w":150,"h":50,"type":"raxis","rx":true,"ry":true},{"x":5500,"y":5975,"w":500,"h":25,"type":"lava","collidable":true},{"x":5500,"y":5400,"w":500,"h":25,"type":"lava","collidable":true},{"x":5650,"y":2900,"w":350,"h":50,"type":"normal"},{"x":5650,"y":2950,"w":100,"h":75,"type":"normal"},{"x":5950,"y":2950,"w":50,"h":50,"type":"tp","tpx":5750,"tpy":5475},{"x":5750,"y":2950,"w":50,"h":50,"type":"tp","tpx":5750,"tpy":5925},{"x":5500,"y":5400,"w":500,"h":600,"type":"zoom","zoom":0.8},{"x":2500,"y":2500,"w":1000,"h":1000,"type":"zoom","zoom":1}]`))

// add pong back in once all other obs added (cant do addedobs without breaking everything)
obstacles.push(new Custom(5725,5625,30,30,//dimensions
    [{name: 'angle',value: 100},{name: 'radius',value: 30},{name: 'speed',value: 600},{name: 'bound',value:{x: 5500,y:5400,w:500,h:600}}],//properties
    // breaking bc we want it server sided
    `
    if(!this.xv){
        this.xv = Math.cos(this.angle)*this.speed;
        this.yv = Math.sin(this.angle)*this.speed;
    }
    this.x += this.xv * dt;
    if (this.x + this.radius >= this.bound.x + this.bound.w) {
        this.xv = -this.xv;
        this.x = (this.bound.x + this.bound.w) * 2 - this.x - this.radius * 2;
    }
    else if (this.x - this.radius <= this.bound.x) {
        this.xv = -this.xv;
        this.x = this.bound.x * 2 - this.x + this.radius * 2;
    }
    this.y += this.yv * dt;
    if (this.y + this.radius >= this.bound.y + this.bound.h) {
        this.yv = -this.yv;
        this.y = (this.bound.y + this.bound.h) * 2 - this.y - this.radius * 2;
    }
    else if (this.y - this.radius <= this.bound.y) {
        this.yv = -this.yv;
        this.y = this.bound.y * 2 - this.y + this.radius * 2;
    }
    if(!this.serverSided){
        if(this.y > 5900 && me().y > 5700 && me().x > 5400){me().dead = true; send({dead: true})}
        if(this.y < 5450 && me().y < 5700 && me().y > 5300 && me().x > 5400){me().dead = true; send({dead: true})}
        // predicting collision client sided
        if(Math.sqrt((me().x-this.x)**2+(me().y-this.y)**2) < me().radius+this.radius){
            setTimeout(function(){
                if(me().y > 5700){
                    this.yv = -Math.abs(this.yv);
                } else {
                    this.yv = Math.abs(this.yv);
                }
            }, 50)
        }
    }
    `,//simulate function
    false,//collidable (bounds player; doesnt do anythign to onCollision)
    ``,//onCollision function
    `ctx.beginPath();ctx.arc(pos.x,pos.y,this.radius,0,Math.PI*2);ctx.fill();ctx.closePath()`));// render function


texts.push(new Text(2700, 2700, '1v1s!', false, 50, -45*Math.PI/180));
texts.push(new Text(3300, 3300, 'Pong!', false, 50, -45*Math.PI/180));
// thigs for this uni: (natural/ green theme)
// mope.io 1v1 DONE
// hide and seek? resuse tag code ig
// wilderness duels (a lot of unique enemies + green ones)
// soccer w/ ball that has networking :> + u get assigned a random team (blue or red outline) once u enter in the arena
module.exports = minigames;