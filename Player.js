const { BasicPetal, RockPetal, DiepPetal, BubblePetal } = require('./Petal.js');
const playerSpeed = 1;
const petalDistance = 61.1;

module.exports = class Player{
    constructor(id, init){
        this.id = id;
        this.x = init.x;
        this.y = init.y;
        this.r = 23.5;
        this.isPlayer = true;

        this.room = {x: init.room.x, y: init.room.y};

        // input
        this.angle = init.angle;
        this.magnitude = init.magnitude;

        this.maxHp = 100;
        this.hp = this.maxHp;
        this.damage = 45;

        this.impulse = {x: 0, y: 0};

        this.petalDistance = petalDistance;
        this.desiredPetalDistance = petalDistance;

        if(init.petals){
            this.petals = init.petals;
        } else {
            this.petals = [];
            for(let i = 0; i < 5; i++){
                this.petals[i] = new BasicPetal('common', Math.PI*2*i/5, this);
            }
        }

        // const rarities = ['common','unusual','rare','epic','legendary','omnipotent'];
        // for(let i = 0; i < rarities.length; i++){
        //     console.log('RARITY ' + rarities[i]);
        //     console.log('BASIC: ' + JSON.stringify({hp: new BasicPetal(rarities[i], 0, this).hp, damage: new BasicPetal(rarities[i], 0, this).damage}));
        //     console.log('ROCK: ' + JSON.stringify({hp: new RockPetal(rarities[i], 0, this).hp, damage: new RockPetal(rarities[i], 0, this).damage}));
        // }

        this.attacking = init.attacking;
        this.defending = init.defending;
        this.updateAttackState();

        this.collectablePetals = [];// petal slots that are on the floor that can be collected by this player

        this.lastInputTimer = Date.now();
    }
    attack(data){
        this.attacking = data.attack ?? false;
        this.updateAttackState();
        this.lastInputTimer = Date.now();
    }
    defend(data){
        this.defending = data.defend ?? false;
        this.updateAttackState();
        this.lastInputTimer = Date.now();
    }
    updateAttackState(){
        if(this.attacking){
           this.desiredPetalDistance = petalDistance * 2.15;
        } else if(this.defending){
            this.desiredPetalDistance = petalDistance * 0.6;
        } else {
            this.desiredPetalDistance = petalDistance;
        }
    }
    simulate(dt, enemies){
        const xv = Math.cos(this.angle)*this.magnitude*playerSpeed+this.impulse.x;
        const yv = Math.sin(this.angle)*this.magnitude*playerSpeed+this.impulse.y;

        this.x += xv*dt/1000;
        this.y += yv*dt/1000;

        this.impulse.x *= Math.pow(/*this.friction*/0.8, dt * 15);
	    this.impulse.y *= Math.pow(/*this.friction*/0.8, dt * 15);

        this.petalDistance += (this.desiredPetalDistance - this.petalDistance) - (this.desiredPetalDistance - this.petalDistance) * Math.pow(0.985, dt);

        for(let i = 0; i < this.petals.length; i++){
            this.petals[i].simulate(this, dt, enemies);
        }
    }
    initPack(){
        return this;
    }
    updatePack() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            angle: this.angle,
            magnitude: this.magnitude,
            hp: this.hp,
            impulse: this.impulse,
            petalDistance: this.petalDistance,
            petals: this.petals.map(p => p.updatePack()),
        }
    }
}