const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please add a title']
    },
    body: {
        type: String,
        required: [true, 'please add a body']
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    image: String,
    comments: [{
        username: String,
        body: String
     }]
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;