const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    
    firstName: {type: String, required: true},

    lastName: {type: String, required: true},

    role: {type: String, enum: ['borrower', 'admin']},

    isActive: {type: Boolean, default: true}

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('User', userSchema)