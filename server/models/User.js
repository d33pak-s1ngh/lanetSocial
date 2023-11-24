const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        require: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    picturePath: {
        type: String,
        default: "",
    },
    occupation: String,
    viewedProfile: {
        type: Number,
        default: 0,
    },
    impressions: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User