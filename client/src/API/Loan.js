import qs from 'qs'
import axios from 'axios'
import moment from 'moment'

const baseURL = `${process.env.REACT_APP_API}/loan`

class Loan {
    constructor(loan){
        this._id = loan._id;
        this.amount = loan.amount;
        this.variant = loan.variant;
        this.status = loan.status;
        this.borrower = loan.user;
        this.payments = loan.payments;
        this.createdAt = moment(loan.createdAt).format('YYYY-MM-DD hh:mm A');
        this.updatedAt = moment(loan.createdAt).format('YYYY-MM-DD hh:mm A');
    }

    static getAll = () => {
        return new Promise((resolve, reject) => {
            let loans = []
            axios({
                method: 'GET',
                url: baseURL
            }).then(response =>{
                response.data.forEach(l => { loans.push(new Loan({ ...l })) })
                resolve(loans)
            })
        })
    }
    static getById = (_id) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `${baseURL}/${_id}`
            }).then(response =>{
                resolve(new Loan({...response.data}))
            })
        })
    } 
    static create = (loan) => {
        return new Promise((resolve, reject) => {
            let loans = []
            axios({
                method: 'POST',
                url: baseURL,
                headers: {"Content-Type": "application/x-www-form-urlencoded",},
                data: qs.stringify({loan})
            }).then(response =>{
                resolve(new Loan({...response.data}))
            })
        })
    }
    static makePayment = (_id, amount) => {
        return new Promise((resolve, reject) => {
            let loans = []
            axios({
                method: 'POST',
                url: `${baseURL}/${_id}`,
                headers: {"Content-Type": "application/x-www-form-urlencoded",},
                data: qs.stringify({amount})
            }).then(response =>{
                resolve(new Loan({...response.data}))
            })
        })
    }

}

export default Loan