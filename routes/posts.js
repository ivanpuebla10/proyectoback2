const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isAuthor  } = require("../middlewares/authentication");
const { uploadUserProductsImages } = require('../middlewares/multer');

router.post('/',authentication, uploadUserProductsImages.single('imagePost'), PostController.create);
router.put('/:_id', authentication, isAuthor, uploadUserProductsImages.single('imagePost'), PostController.update);
router.delete('/:_id', authentication, isAuthor, PostController.delete);
router.get('/',PostController.getAll);
router.get('/title/:title',PostController.getPostsByName);
router.get('/id/:_id',PostController.getById);
router.put('/comments/:_id', authentication, uploadUserProductsImages.single('imagePost'),PostController.insertComment)
router.put('/updatecomments/:_id', authentication, isAuthor, uploadUserProductsImages.single('image'), PostController.updateComment)
router.put('/deletecomments/:_id', authentication, isAuthor, PostController.deleteComment)
router.put('/like/:_id', authentication, PostController.like)
router.put('/deslike/:_id', authentication, PostController.deslike) 
 
module.exports = router;