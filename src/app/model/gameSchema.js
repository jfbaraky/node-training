const restful = require('node-restful');
const mongooseIt = require('@app-masters/mongoose-it').mongooseIt;
const mongoose = restful.mongoose;

const schema = {
    name: String,
    cover: String,
    lastTimePlayed: {
        type: Date,
        default: 0
    },
    numberOfSessions: {
        type: Number,
        default: 0
    },
    timeInSession: {
        type: Number,
        default: 0
    }
};

const options = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
};

const mongooseSchema = mongoose.Schema(schema, options);
mongooseSchema.plugin(mongooseIt, 'game');

mongoose.model('game', mongooseSchema);
module.exports = mongooseSchema;
