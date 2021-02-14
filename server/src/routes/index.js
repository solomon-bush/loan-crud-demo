const LoanRoutes = require('./loanRoutes')
const UserRoutes = require('./userRoutes')
const UtilRoutes = require('./utilRoutes')

module.exports.set = (server) => {
    LoanRoutes.set(server)
    UserRoutes.set(server)
    UtilRoutes.set(server)
}