//   Requires
let express = require('express');
let bodyParser = require('body-parser');
let restful = require('node-restful');
let methodOverride = require('method-override');
let mongoose = restful.mongoose;

// Passport testing
let cookieParser = require('cookie-parser');
let packag = require('../package');

// Check node version
require('@app-masters/node-lib').checkVersion(packag);
let {config, envs} = require('./config/config');

let app = express();

// Database connection and error handling must be created
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(methodOverride());

// Bootstrap
require('@app-masters/node-lib').amBootstrap(app, envs, packag);
// Routes
require('./app/routes')(app);
// Error handling
require('@app-masters/node-lib').amError(app);

// Start the server
const port = process.env.PORT || 3000;
console.log("Starting at NODE_ENV: " + process.env.NODE_ENV);
app.listen(port, function () {
    console.log('listening on port: ' + port);

    // Move monogoose bootstrap to somewhere?
    // Start connection
    // Timeout? Retry connect? How to handle it?
    mongoose.Promise = global.Promise;
    let mongoDbUri = config.database.url;
    mongoose.connect(mongoDbUri, {useMongoClient: true}).catch((err) => {
        console.error('mongoose error (on index.js)');
        console.error(err);
        Rollbar.error(err);
        Rollbar.log(err);
        //{ MongoError: failed to connect to server [ds143362.mlab.com:43362] on first connect [MongoError: connect ETIMEDOUT 54.196.80.31:43362]
    });
    let db = mongoose.connection;

    // mongodb error
    db.on('error', (err) => {
        console.error('connection error (on index.js):');
        console.error(err);
        Rollbar.error(err);
        Rollbar.log(err);
    });

    // mongodb connection open
    db.once('open', () => {
        console.log(`Connected to Mongo at (on index.js): ${new Date()}`)
    });

    // mongodb disconnected
    db.on('disconnected', function () {
        console.log(`Mongoose default connection disconnected at (on index.js): ${new Date()}`);
    });
});
