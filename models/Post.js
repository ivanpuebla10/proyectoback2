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
        userId: { type: ObjectId, ref: 'User' },
        userName: { type: String, ref: "User" },
        comment: String
    }],
    likes: [{ type: ObjectId, ref: 'User' }]

}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;