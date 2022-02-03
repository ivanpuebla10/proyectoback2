const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isAuthor  } = require("../middlewares/authentication");


router.post('/',authentication, PostController.create);
router.put('/:_id', authentication, isAuthor, PostController.update);
router.delete('/:_id', authentication, isAuthor, PostController.delete);
router.get('/',PostController.getAll);
router.get('/title/:title',PostController.getPostsByName);
router.get('/id/:_id',PostController.getById);
router.put('/comments/:_id', authentication, PostController.insertComment)
router.put('/like/:_id', authentication, PostController.like)
router.put('/deslike/:_id', authentication, PostController.deslike)


module.exports = router;