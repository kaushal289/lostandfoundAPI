const Lost = require('../models/Lost')

const getAllLosts = (req, res, next) => {
    Lost.find()
        .then((losts) => {
            res.json(losts)
        }).catch(next)
}

const createLost = (req, res, next) => {
    const file = req.file
    let lost = {
        ...req.body,
        creater:req.user.id
    }

    if(file) lost.image = req.file.filename
    Lost.create(lost)
        .then((lost) => {
            res.status(201).json(lost)
        }).catch(next)
}

const deleteAllLosts = (req, res, next) => {
    Lost.deleteMany()
        .then((status) => {
            res.json(status)
        }).catch(next)
}

const getLostById = (req, res, next) => {
    Lost.findById(req.params.lost_id)
        // .populate('category')
        .then((lost) => {
            res.json(lost)
        }).catch(next)
}

const updateLostById = (req, res, next) => {
    Lost.findById(req.params.lost_id)
        .then(lost => {
            if (lost.creater != req.user.id) {
                res.status(403)
                return next(new Error('Not allowed'))
            }
            const file = req.file
            lost.fullname = req.body.fullname ? req.body.fullname : lost.fullname
            lost.location = req.body.location ? req.body.location : lost.location
            lost.date = req.body.date ? req.body.date : lost.date
            lost.email = req.body.email ? req.body.email : lost.email

            lost.category = req.body.category ? req.body.category : lost.category
            lost.brand = req.body.brand ? req.body.brand : lost.brand
            lost.primarycolor = req.body.primarycolor ? req.body.primarycolor : lost.primarycolor
            lost.secondarycolor = req.body.secondarycolor ? req.body.secondarycolor : lost.secondarycolor

            lost.phonenumber = req.body.phonenumber ? req.body.phonenumber : lost.phonenumber
            lost.other = req.body.other ? req.body.other : lost.other
            if(file) lost.image = req.file.filename ? req.file.filename : lost.image 
            lost.save().then(lost => res.json(lost)).catch(next)
        }).catch(next)

    // Lost.findByIdAndUpdate(req.params.lost_id, { $set: req.body }, { new: true })
    //     .then((lost) => {
    //         res.json(lost)
    //     }).catch(next)
}

const deleteLostById = (req, res, next) => {
    Lost.findByIdAndDelete(req.params.lost_id)
        .then((lost) => {
            res.json(lost)
        }).catch(next)
}

module.exports = {
    getAllLosts,
    createLost,
    deleteAllLosts,
    getLostById,
    updateLostById,
    deleteLostById
}