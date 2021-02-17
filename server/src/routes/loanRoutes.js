const Loan = require('../models/loan')
const { body, validationResult } = require('express-validator')

module.exports.set = (server) =>{
    let url = `${process.env.API_URL}/loan`

    //GET ALL LOANS
    server.get(`${url}`, (req,res)=>{
        Loan.find().populate('borrower').then(data =>{
            res.send(data)
        }).catch(err =>{
            res.status(400).send()
        })
    })

    //GET LOAN BY ID
    server.get(`${url}/:_id`, (req,res)=>{
        Loan.findById(req.params._id).then(data =>{
            res.send(data)
        }).catch(err =>{
            res.status(400).json(err)
        })
    })

    //NEW LOAN
    server.post(
        `${url}`,
        [
            body(['variant','status']).isString(),
            body('borrower').isMongoId(),
            body('amount').isNumeric()
        ],
        (req,res)=>{

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            console.log('test')
            Loan.create({
                amount: req.body.amount,
                variant: req.body.variant,
                status: req.body.status,
                borrower: req.body.borrower
            })
                .then(data => res.send(data))
                .catch(err => res.status(400).send(err))
        }
    )

    //MAKE PAYMENT
    server.post(
        `${url}/:_id`,
        body('amount').isNumeric(),
        (req,res)=>{


            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            
            Loan.findById(req.params._id)
                .then(l =>{
                    l.payments.push({amount: req.body.amount})
                    l.save()
                        .then(data => res.send(data))
                        .catch(err => res.status(400).send(err))
                })
                .catch(err => res.status(400).send(err))
        }
    )

}