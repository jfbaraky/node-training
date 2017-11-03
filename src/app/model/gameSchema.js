let restful = require('node-restful');
let mongoose = restful.mongoose;

let schema = {
    name: String,
    cover: String
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

mongoose.model('game', mongooseSchema);
module.exports = mongooseSchema;
