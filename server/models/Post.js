const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    location: String,
    description: {
        type: String,
        max: 500,
    },
    userPicturePath: {
        type: String,
        require: true,
    },
    picturePath: {
        type: String,
        require: true
    },
    likes: {
        type: Map,
        of: Boolean,
    }
}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);

module.exports = Post;