const LoanRoutes = require('./loanRoutes')
const PaymentRoutes = require('./paymentRoutes')
const UserRoutes = require('./userRoutes')
const UtilRoutes = require('./utilRoutes')

module.exports.set = (server) => {
    LoanRoutes.set(server)
    PaymentRoutes.set(server)
    UserRoutes.set(server)
    UtilRoutes.set(server)
}