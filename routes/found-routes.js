const express=require('express')
const upload=require('../middleware/upload')
const router=express.Router()
const multer=require('../middleware/upload')
const foundController = require('../controllers/found-controller')
const { verifyUser,verifyAdmin} = require('../middleware/auth')

router.route('/')
    .post(verifyUser,multer.single("image"), foundController.createFound)
    .get(foundController.getAllFounds)
    .put((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .delete(verifyAdmin, foundController.deleteAllFounds)

router.route('/:found_id')
    .get(foundController.getFoundById)
    .post((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .put(verifyUser,multer.single("image"),foundController.updateFoundById)
    .delete(verifyAdmin, foundController.deleteFoundById)

module.exports = router