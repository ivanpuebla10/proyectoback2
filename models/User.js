const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'username already exists'],
        required: [true, 'please add an username']
    },
    email: {
        type: String,
        unique: [true, 'email already exists'],
        required: [true,  'please add a email']
    },
    password: {
        type: String,
        required: [true, 'please add a password']
    },
    role: String,
    confirmed: Boolean,
    token: [],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;