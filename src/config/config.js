const envs = {};

envs.development = {
    database: {
        url: 'mongodb://database:admin@ds245615.mlab.com:45615/boardgames'
    },
    rollbar: {},
    security: {
        disabledOnDev: false,
        secret: "as4232rf2fg434weZerAZ323dfy0CrY12^g9%Kre3_2ypZAZy0C43Yevr^g9%12"
    }
};

envs.production = {
    database: {
        url: "mongodb://database:admin@ds245615.mlab.com:45615/boardgames-prod"
    },
    rollbar: {},
    security: {
        secret: "as4232rf2fg434weZerAZ323dfy0CrY12^g9%Kre3_2ypZAZy0C43Yevr^g9%12"
    }
};

envs.staging = envs.production;

if (process.env.NODE_ENV === undefined){
    console.warn("Forcing 'development' enviroment");
    process.env.NODE_ENV = 'development';
}
if (!envs[process.env.NODE_ENV] || envs[process.env.NODE_ENV].length === 0)
    throw new Error("Missing config for '" + process.env.NODE_ENV + "' env in config.js");
const config = envs[process.env.NODE_ENV];
global.config = config;

module.exports = {config, envs};
