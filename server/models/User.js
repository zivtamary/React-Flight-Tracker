const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    registerDate: {
        type: Date,
        default: () => new moment().add(3, 'hours')
    }
});

module.exports = User = mongoose.model('user', UserSchema)