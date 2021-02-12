// EXTERNAL
const express = require('express');
const cors = require('cors')

// INTERNAL
const db = require('./db')
const routes = require('./routes/index.js')



/* INIT EXPRESS */
const server = express()
server.use([
    cors(),
    express.json(),
    express.urlencoded({extended: true})
])
routes.set(server)


console.log('\n\nProcess\t', 'Status\t', 'Details\t')
console.log('==================================')

/* INIT MONGOOSE */
db.connect().then(() => {
    
    console.log('DB\t', 'UP\t', `${process.env.DB_HOST} | ${process.env.DB_NAME}`)
    
    /* START EXPRESS */
    server.listen(process.env.SERVER_PORT, () =>{
    
        console.log('EXPRESS\t', 'UP\t', `${process.env.NODE_ENV} | ${process.env.SERVER_PORT}`) 
    
    })

}).catch(err => {throw Error(err)})
