const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const multer=require('../middleware/upload')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { verifyUser,verifyAdmin} = require('../middleware/auth')

router.route('/register')
    .get((req, res) => res.status(501).json({ 'msg': 'Not implemented' }))
    .post(multer.single("image"), userController.registerUser)
router.route('/login')
    .post(userController.loginUser)

router.route('/:user_id')
    .get(userController.getUserById)
    .put(verifyUser,multer.single("image"),userController.updateUserById)

module.exports = router