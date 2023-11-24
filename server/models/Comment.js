const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    postId: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
        max: 500,
    }
}, { timestamps: true });


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;