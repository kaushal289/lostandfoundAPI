const User = require('../models/User')
const upload=require('../middleware/upload')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer=require('../middleware/upload')



const registerUser = (req, res, next) => {
    User.findOne({ username: req.body.username })
    .then(user => {
        if (user != null) {
            res.status(400)
            return next(new Error(`Username ${req.body.username} already exists`))
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) next(err)
            let user = new User()
            user.username = req.body.username
            user.firstName=req.body.firstName
            user.lastName=req.body.lastName
            user.phoneNumber=req.body.phoneNumber
            user.gender=req.body.gender
            user.email=req.body.email
            user.location=req.body.location
            user.age=req.body.age
            const file = req.file;
            if(file){
                user.image=req.file.filename
            }
            
            if (req.body.role) user.role = req.body.role
            user.password = hash
            user.save().then(user => {
                data = {
                    id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName:user.lastName,
                    phoneNumber:user.phoneNumber,
                    gender:user.gender,
                    email:user.email,
                    role: user.role,
                    location: user.location,
                    age: user.age,
                    image:user.image
                }
                res.status(201).json({ status: 'User registration success.', data })
            }).catch((err) => { res.status(400); next(err) })
        })
    }).catch(next)
}

const loginUser = (req, res, next) => {
    User.findOne({ username: req.body.username })
    .then(user => {
        if (user == null) {
            res.status(401)
            return next(new Error(`User ${req.body.username} has not registered.`))
        }
        bcrypt.compare(req.body.password, user.password, (err, status) => {
            if (err) return next(err)
            if (!status) {
                res.status(401)
                return next(new Error('Password does not match!'))
            }
            data = {
                id: user._id,
                username: user.username,
                role: user.role
            }
            const token = jwt.sign(data,
                process.env.SECRET, { expiresIn: '1h' })
            res.json({ status: 'Login Success', token: token })
        })
    }).catch(next)
}

const getUserById = (req, res, next) => {
    User.findById(req.params.user_id)
        .then((user) => {
            res.json(user)
        }).catch(next)
}

const updateUserById = (req, res, next) => {
    User.findById(req.params.user_id)
        .then(user => {
            if (user.id != req.user.id) {
                res.status(403)
                return next(new Error('Not allowed'))
            }
            user.firstName = req.body.firstName ? req.body.firstName : user.firstName
            user.lastName = req.body.lastName ? req.body.lastName : user.lastName
            user.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : user.phoneNumber
            user.gender = req.body.gender ? req.body.gender : user.gender
            user.email = req.body.email ? req.body.email : user.email
            user.lastName = req.body.lastName ? req.body.lastName : user.lastName
            user.password = req.body.password ? req.body.password : user.password
            user.location = req.body.location ? req.body.location : user.location
            user.age = req.body.age ? req.body.age : user.age
            user.image = req.file.filename ? req.file.filename : user.image
            user.save().then(user => res.json(user)).catch(next)
        }).catch(next)
}

const getAllUsers = (req, res, next) => {
    User.find()
        .then((users) => {
            res.json(users)
        }).catch(next)
}

const deleteAllUsers = (req, res, next) => {
    User.deleteMany()
        .then((status) => {
            res.json(status)
        }).catch(next)
}

const deleteUserById = (req, res, next) => {
    User.findByIdAndDelete(req.params.user_id)
        .then((user) => {
            res.json(user)
        }).catch(next)
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    getUserById,
    deleteAllUsers,
    updateUserById,
    deleteUserById
}