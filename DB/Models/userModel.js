const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profailPic: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;