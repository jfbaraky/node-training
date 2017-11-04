let express = require('express');
let router = express.Router();

let GameRouter = require('./game');
let SessionRouter = require('./session');

module.exports = function (app) {
    app.use('/api', router);
    // App data endpoints
    GameRouter.register(app);
    SessionRouter.register(app);
};
