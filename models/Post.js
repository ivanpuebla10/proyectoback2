const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please add a title']
    },
    body: {
        type: String,
        required: [true, 'please add a body']
    },
    image: String
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;