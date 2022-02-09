const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication } = require("../middlewares/authentication");
const { uploadUserProductsImages } = require('../middlewares/multer');


router.post('/', uploadUserProductsImages.single('imagePost'), UserController.create)
router.post('/login', UserController.login)
router.put('/:_id', authentication, UserController.update)
router.get('/',UserController.getAll)
router.delete('/logout',authentication, UserController.logout)
router.get('/confirm/:emailToken',UserController.confirm)
router.get('/profile',authentication, UserController.getInfo)
router.get('/recoverPassowrd/:email', authentication, UserController.recoverPassword)
router.put('/resetPassword/:recoverToken', authentication, UserController.resetPassword)
router.put('/follow/:_id', authentication, UserController.follow)
router.put('/unfollow/:_id', authentication, UserController.unFollow)
router.get('/username/:username', UserController.getUserByName);
router.get('/id/:_id',UserController.getById);




module.exports = router;