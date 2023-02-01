const express=require('express')
const Lost= require('../models/Lost')
const upload=require('../middleware/upload')
const router=express.Router()
const multer=require('../middleware/upload')
const lostController = require('../controllers/lost-controller')
const {verifyUser,verifyAdmin} = require('../middleware/auth')

router.route('/')
    .post(verifyUser,multer.single("image"), lostController.createLost)
    .get(lostController.getAllLosts)
    .put((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .delete(verifyAdmin, lostController.deleteAllLosts)

router.route('/:lost_id')
    .get(lostController.getLostById)
    .post((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .put(verifyUser,multer.single("image"),lostController.updateLostById)
    .delete(verifyAdmin, lostController.deleteLostById)

module.exports = router