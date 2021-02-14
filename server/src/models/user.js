const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

    username: {type: String, required: true, unique: true },

    firstName: {type: String, required: true},

    lastName: {type: String, required: true},

    role: {type: String, enum: ['member', 'admin']}, 

    isActive: {type: Boolean, default: true}

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('User', userSchema)