const Loan = require('./models/loan')
const User = require('./models/user')

const members = [
    { name: 'Molly Dodson', username: 'tricklopsided' },
    { name: 'Beau Dawson', username: 'creationkangaroo' },
    { name: 'Tonicha Dawe', username: 'barrierexaltation' },
    { name: 'Arissa Melia', username: 'minercinnamon' },
    { name: 'Kohen Chan', username: 'colombianvirtue' },
    { name: 'Jaydan Langley', username: 'danoneambush' },
    { name: 'Ruairi Bentley', username: 'wedgemiserable' },
    { name: 'Zackery Banks', username: 'foremastrosy' },
    { name: 'Thiago Pope', username: 'gurglearches' },
    { name: 'Braxton Clements', username: 'shortdusky' },
    { name: 'Lily-May Villegas', username: 'phasebrails' },
    { name: 'Rachael Hulme', username: 'savorlumbar' },
    { name: 'Halle Pierce', username: 'gregarioustold' },
    { name: 'Alex Connelly', username: 'lebanesetux' },
    { name: 'Aaliya Nunez', username: 'usurpfibula' },
    { name: 'Artur Peel', username: 'itchcan' },
]

const admins = [
    { name: 'Solomon Bush', username: 'sbush' }
]



const loans = [
    {
        variant: 'Home',
        min: 200000,
        max: 450000
    },
    {
        variant: 'Personal',
        min: 20000,
        max: 150000
    },
    {
        variant: 'Payday',
        min: 5000,
        max: 20000
    }
]

const randInt = (min, max, round)  => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let final = Math.floor(Math.random() * (max - min + 1) + min)
    return round
        ? Math.floor(final/round)*round 
        : final
}
const generateRandomLoan = () =>{
    
    let loanConfig = loans[randInt(1, loans.length) - 1]
    let amount = randInt(loanConfig.min, loanConfig.max, 500)
    return {amount, variant: loanConfig.variant}
}

const generateRandomPayments = (totalMax) => {
    let paymentAmounts = [0]
    let n = randInt(0, 10)
    let i = 0
    let paidOff = false

    do {
        let payment = randInt(50, 5000, 25)
        let currTotalPayments = paymentAmounts.reduce((a,c) => a + c)
        let projTotalPayments = payment + currTotalPayments

        if(projTotalPayments >= totalMax){
            paymentAmounts.push((totalMax - currTotalPayments))
            paidOff = true;
            break;
        }else{
            paymentAmounts.push(payment)
        }
        i++
    }while(i < n)
    
    paymentAmounts.shift()
    return [paymentAmounts, paidOff]

}


const generateRandomLoans = (borrower) =>{
    let quantity = randInt(0, 4)
    let i = 0
    while(i < quantity){
        let rndLoan = generateRandomLoan()
        let amount = rndLoan.amount
        let variant = rndLoan.variant
        let status = 'Active'
        Loan.create({amount, variant, borrower, status}).then((l =>{
            let [paymentAmounts, paidOff] = generateRandomPayments(l.amount)
            paymentAmounts.map(v =>{
                l.payments.push({amount: v})
            })

            if(paidOff === true){
                l.status = 'Paidoff'
            }

            l.save()
        }))
        i++
    }
}


const build_usersLoans = () =>{
    members.map(v =>{
        let [firstName, lastName] = v.name.split(' ', 2)
        User.create({firstName, lastName, username: v.username, role: 'member'})
            .then(u =>{
                generateRandomLoans(u._id)
            })
            .catch(err =>{console.log(err)})
    })
}


// build_usersLoans()