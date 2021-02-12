
module.exports.set = (server) =>{
    let url = `${process.env.API_URL}/payments`

    //GET ALL PAYMENTS
    server.get(`${url}`, (req,res)=>{})

    //GET PAYMENTS BY ID
    server.get(`${url}/:id`, (req,res)=>{})

    //GET USER PAYMENTS
    server.get(`${url}/user/:_id`, (req,res)=>{})

    //GET LOAN PAYMENTS
    server.get(`${url}/loan/:_id`, (req,res)=>{})

    //NEW PAYMENT
    server.post(`${url}`, (req,res)=>{})
    
}