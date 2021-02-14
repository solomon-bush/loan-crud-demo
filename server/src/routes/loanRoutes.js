const Loan = require('../models/loan')

module.exports.set = (server) =>{
    let url = `${process.env.API_URL}/loan`

    //GET ALL LOANS
    server.get(`${url}`, (req,res)=>{
        Loan.find().then(data =>{
            res.send(data)
        }).catch(err =>{
            res.status(400).send()
        })
    })

    //GET LOAN BY ID
    server.get(`${url}/:_id`)

    //NEW LOAN
    server.post(`${url}`, (req,res)=>{})

    //UPDATE LOAN
    server.put(`${url}`, (req,res)=>{})

}