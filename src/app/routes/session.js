const restful = require('node-restful');

const AMRouter = require('@app-masters/node-lib').amRouter;
const mongooseSchema = require('../model/gameSchema');

const Game = require('../model/game');

class SessionRouter extends AMRouter {
    constructor(app) {
        super();

        this.resource = app.resource = restful.model('session', mongooseSchema).methods(['get', 'post', 'put', 'delete'])
            .updateOptions({'new': true});
        this.resource.shouldUseAtomicUpdate = true;

        this.afterPost(this.updateGame);

        this.resource.register(app, '/api/session');
    }

    static register(app) {
        return new SessionRouter(app);
    }

    async updateGame(req, res, next) {
        const gameId = req.body.game;
        const game = await Game.findOne({_id: gameId});
        let {timeInSession, numberOfSessions} = game;
        let {startTime, finishTime} = req.body;
        if (typeof startTime === 'string'){
            startTime = new Date(startTime);
            finishTime = new Date(finishTime);
        }
        const update = {
            lastTimePlayed: finishTime,
            numberOfSessions: numberOfSessions + 1,
            timeInSession: timeInSession + (finishTime - startTime)
        };
        const newGame = await Game.findOneAndUpdate({_id: gameId}, update);
        res.send(newGame);
    }

}

module.exports = SessionRouter;
