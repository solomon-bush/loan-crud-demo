import qs from 'qs'
import axios from 'axios'
import moment from 'moment'
import Loan from './Loan'

const baseURL = `${process.env.REACT_APP_API}/user`

class User {
    constructor(user){
        this._id = user._id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.role = user.role;
        this.isActive = user.isActive;
        this.createdAt = moment(user.createdAt).format('YYYY-MM-DD hh:mm A');
        this.updatedAt = moment(user.createdAt).format('YYYY-MM-DD hh:mm A');
    }

    static login = (username, role) =>{

        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `${baseURL}/login`,
                headers: {"Content-Type": "application/x-www-form-urlencoded",},
                data: qs.stringify({username, role})
            }).then(response =>{
                response.data !== false 
                    ? resolve(new User({...response.data}))
                    : reject('Invalid Login')
            })
        })
    }

    static getAll = () => {
        return new Promise((resolve, reject) => {
            let users = []
            axios({
                method: 'GET',
                url: baseURL
            }).then(response =>{
                response.data.forEach(l => { users.push(new User({ ...l })) })
                resolve(users)
            })
        })
    }
    static getById = (_id) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `${baseURL}/${_id}`
            }).then(response =>{
                resolve(new User({...response.data}))
            })
        })
    } 
    static getLoans = (_id) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `${baseURL}/${_id}/loan`
            }).then(response =>{
                let loans = []
                response.data.forEach(l => { loans.push(new Loan({ ...l })) })
                resolve(loans)
            })
        })
    } 
    static create = (user) => {
        console.log(user)
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: baseURL,
                headers: {"Content-Type": "application/x-www-form-urlencoded",},
                data: qs.stringify({...user})
            }).then(response =>{
                resolve(new User({...response.data}))
            }).catch(() => reject())
        })
    }
    static update = (_id, user) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'PUT',
                url: `${baseURL}/${_id}`,
                headers: {"Content-Type": "application/x-www-form-urlencoded",},
                data: qs.stringify({user})
            }).then(response =>{
                resolve(new User({...response.data}))
            })
        })
    }

}

export default User