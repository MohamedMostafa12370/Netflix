const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    type: { type: String, required: true, unique: true },
    genre: { type: String },
    content: { type: Array },
}, { timestamps: true });

const listModel = mongoose.model('list', listSchema);

module.exports = listModel;