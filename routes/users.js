const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication } = require("../middlewares/authentication");

router.post('/',UserController.create)
router.post('/login', UserController.login)
router.get('/',UserController.getAll)
router.delete('/logout',authentication, UserController.logout)
router.get('/confirm/:emailToken',UserController.confirm)
router.get('/profile',authentication, UserController.getInfo)
// router.get('/getuser/:id',authentication, UserController.getUserLogged)


module.exports = router;