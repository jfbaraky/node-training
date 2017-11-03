let restful = require('node-restful');

let AMRouter = require('@app-masters/node-lib').amRouter;
let mongooseSchema = require('../model/gameSchema');

class GameRouter extends AMRouter {
    constructor(app) {
        super();

        this.resource = app.resource = restful.model('game', mongooseSchema).methods(['get', 'post', 'put', 'delete'])
            .updateOptions({ 'new': true });
        this.resource.shouldUseAtomicUpdate = true;
        this.resource.register(app, '/api/game');
    }

    static register(app) {
        return new GameRouter(app);
    }


}

module.exports = GameRouter;
