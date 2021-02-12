const mongoose = require('mongoose');

let loanSchema = new mongoose.Schema({
    
    amount: {type: Number, required: true},

    type: {
        type: String, 
        required: true, 
        enum: ['Home', 'Personal', 'Auto', 'Student', 'Payday'] 
    },

    status: {
        type: String, 
        default: 'Pending', 
        enum: ['Pending', 'Active', 'Paidoff', 'Delinquent']
    },

    borrower: {type: mongoose.ObjectId, ref: 'User', required: true},

    coborrowers: [{ 
        _id: false, 
        type: mongoose.ObjectId, 
        ref: 'User'
    }]

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Loan', loanSchema)