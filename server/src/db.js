
const mongoose = require('mongoose')

const connect = () => {
    return new Promise((resolve, reject) => {
        // This is bad practice, bc it is only relying on single host of ReplicaSet
        let mongoose_config_url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}` 
        let mongoose_config_options = {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            authSource: process.env.DB_AUTHDB,
            readPreference: 'primary',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: true, // Don't build indexes
            poolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 500, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
            
        }
        mongoose
            .connect(mongoose_config_url, mongoose_config_options)
            .then(() =>{resolve()})
            .catch((err) =>{reject(err)})
    })
}


module.exports = { connect }