const User = require('../models/user')
const { body, validationResult } = require('express-validator')

module.exports.set = (server) =>{
    let url = `${process.env.API_URL}/user`
    
    //MOCK Login
    server.post(
        `${url}/login`,
        body(['username','role']).isString(),
        (req, res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            User.find({username: req.body.username, role: req.body.role})
                .then(data =>{
                    data.length === 1
                        ? res.send(data[0])
                        : res.send(false)
                }).catch(err =>{
                    res.status(400).json(err)
                })
        }
    )

    //GET ALL USERS
    server.get(`${url}`, (req,res)=>{
        User.find().then(data =>{
            res.send(data)
        }).catch(err =>{
            res.status(400).json(err)
        })
    })

    //GET USER BY ID
    server.get(`${url}/:_id`, (req,res)=>{
        User.findById(req.params._id).then(data =>{
            res.send(data)
        }).catch(err =>{
            res.status(400).json(err)
        })
    })
    
    //NEW (REGISTER) USER
    server.post(
        `${url}`, 
        body(['firstName', 'lastName', 'role']).isString(),
        (req,res)=>{
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            let u = new User({...req.body})
            u.save()
                .then(data => res.send(data))
                .catch(err => res.status(400).send(err))
        }
    )

    //UPDATE USER
    server.put(
        `${url}/:_id`,
        [
            body(['firstName', 'lastName']).isString(),
            body('isActive').isBoolean()
        ],
        (req,res)=>{

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            
            User.findByIdAndUpdate(req.params._id, {...req.body}, {new: true})
                .then(data => res.send(data))
                .catch(err => res.status(400).send(err))
        }
    )

}