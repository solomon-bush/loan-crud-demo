const mongoose = require('mongoose');

let loanSchema = new mongoose.Schema({
    
    amount: {type: Number, required: true},

    variant: {
        type: String, 
        required: true, 
        enum: ['Home', 'Personal', 'Payday'] 
    },

    status: {
        type: String, 
        default: 'Pending', 
        enum: ['Pending', 'Active', 'Paidoff', 'Delinquent']
    },

    borrower: {type: mongoose.ObjectId, ref: 'User', required: true},

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Loan', loanSchema)