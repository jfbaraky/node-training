let restful = require('node-restful');
let mongoose = restful.mongoose;
let ObjectId = mongoose.Schema.Types.ObjectId;

let schema = {
    startTime: Date,
    finishTime: Date,
    game: {type: ObjectId, ref: 'game'},
    players: [String],
    winner: String
};

let options = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
};

let mongooseSchema = mongoose.Schema(schema, options);

mongoose.model('session', mongooseSchema);
module.exports = mongooseSchema;
