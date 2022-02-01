const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');

router.post('/',PostController.create);
router.put('/:_id', PostController.update);
router.delete('/:_id',PostController.delete);
router.get('/',PostController.getAll);
router.get('/title/:title',PostController.getPostsByName);
router.get('/id/:_id',PostController.getById);

module.exports = router;