const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    score: { type: Number, required: true },
    creator: { type: String, required: true }
});

module.exports = mongoose.model('Score', scoreSchema);