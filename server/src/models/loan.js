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
        default: 'Active', 
        enum: ['Active', 'Paidoff']
    },

    borrower: {type: mongoose.ObjectId, ref: 'User', required: true},

    payments: [
        {
            amount: {type: Number, required: true},
            timestamp: { type: Number, default: () => { return Date.now() } },
        }
    ]

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Loan', loanSchema)