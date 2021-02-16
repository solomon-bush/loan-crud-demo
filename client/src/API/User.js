import qs from 'qs'
import axios from 'axios'
import moment from 'moment'

const baseURL = `${process.env.REACT_APP_API}/user`

class User {
    constructor(user){
        this._id = user._id;
        this.username = user.username;
        this.firstName = user.varfirstNameiant;
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
    static create = (user) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: baseURL,
                headers: {"Content-Type": "application/x-www-form-urlencoded",},
                data: qs.stringify({user})
            }).then(response =>{
                resolve(new User({...response.data}))
            })
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