module.exports.set = (server) =>{
    let url = `${process.env.API_URL}/util`

    //FUZZY SEARCH
    server.post(`${url}/fuzzy`, (req,res)=>{})

}