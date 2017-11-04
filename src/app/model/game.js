const AMModel = require("@app-masters/node-lib").amModel;
require('./gameSchema');

class Game extends AMModel {
    constructor () {
        super('game', false);
    }

    static getInstance () {
        if (!this.instance) { this.instance = new Game(); }
        return this.instance;
    }
}

module.exports = Game.getInstance();
