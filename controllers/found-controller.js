const Found = require('../models/Found')

const getAllFounds = (req, res, next) => {
    Found.find()
        .then((founds) => {
            res.json(founds)
        }).catch(next)
}

const createFound = (req, res, next) => {
    const file = req.file
    let found = {
        ...req.body,
        creater:req.user.id
    }

    if(file) found.image = req.file.filename
    Found.create(found)
        .then((found) => {
            res.status(201).json(found)
        }).catch(next)
}

const deleteAllFounds = (req, res, next) => {
    Found.deleteMany()
        .then((status) => {
            res.json(status)
        }).catch(next)
}

const getFoundById = (req, res, next) => {
    Found.findById(req.params.found_id)
        .populate('category')
        .then((found) => {
            res.json(found)
        }).catch(next)
}

const updateFoundById = (req, res, next) => {
    Found.findById(req.params.found_id)
        .then(found => {
            if (found.creater != req.user.id) {
                res.status(403)
                return next(new Error('Not allowed'))
            }
            const file = req.file
            found.fullname = req.body.fullname ? req.body.fullname : found.fullname
            found.location = req.body.location ? req.body.location : found.location
            found.date = req.body.date ? req.body.date : found.date
            found.email = req.body.email ? req.body.email : found.email

            found.category = req.body.category ? req.body.category : found.category
            found.brand = req.body.brand ? req.body.brand : found.brand
            found.primarycolor = req.body.primarycolor ? req.body.primarycolor : found.primarycolor
            found.secondarycolor = req.body.secondarycolor ? req.body.secondarycolor : found.secondarycolor

            found.phonenumber = req.body.phonenumber ? req.body.phonenumber : found.phonenumber
            found.other = req.body.other ? req.body.other : found.other
            if(file) found.image = req.file.filename ? req.file.filename : found.image           
            found.save().then(found => res.json(found)).catch(next)
        }).catch(next)

    // Found.findByIdAndUpdate(req.params.found_id, { $set: req.body }, { new: true })
    //     .then((found) => {
    //         res.json(found)
    //     }).catch(next)
}

const deleteFoundById = (req, res, next) => {
    Found.findByIdAndDelete(req.params.found_id)
        .then((found) => {
            res.json(found)
        }).catch(next)
}

module.exports = {
    getAllFounds,
    createFound,
    deleteAllFounds,
    getFoundById,
    updateFoundById,
    deleteFoundById
}