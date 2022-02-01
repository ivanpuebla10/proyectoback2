const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'please add a username']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please add an email']
    },
    password: {
        type: String,
        required: [true, 'please add a password']
    },
    role: String,
    confirmed: Boolean,
    token: String,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;