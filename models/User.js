const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
    phoneNumber:{
        type:String,
        required: [true, 'Phone Number is required']
    },
    gender:{
        type:String,
        required: [true, 'Gender is required']
    },
    email:{
        type:String,
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username matches with existing users'],
        minLength: 5
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    age: {
        type: String,
        required: [true, 'Age is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    image: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)