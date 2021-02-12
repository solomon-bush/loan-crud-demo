const mongoose = require('mongoose');

let paymentSchema = new mongoose.Schema({
    
    ammount: {type: Number, required: true},

    user: {type: mongoose.ObjectId, ref: 'User', required: true},

    loan: {type: mongoose.ObjectId, ref: 'Loan', required: true}

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Payment', paymentSchema)