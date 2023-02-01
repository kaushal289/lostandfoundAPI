const mongoose = require('mongoose')

const lostSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full Name is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    date:{
        type:String,
        required: [true, 'Date is required']
    },
    email:{
        type:String,
        required: [true, 'Email is required']
    },
    phonenumber: {
        type: String,
        required: [true, 'Phonenumber is required']
    },
    category:{
        type: String,
        required: [true, 'Category is required']
    },
    brand:{
        type: String,
        required: [true, 'Brand is required']
    },
    primarycolor:{
        type: String,
        required: [true, 'Color is required']
    },
    secondarycolor:{
        type: String,
        required: [true, 'Color is required']
    },
    other: {
        type: String,
        required: [true, 'Other is required']
    },
    image: {
        type: String,
    },

    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Lost', lostSchema)