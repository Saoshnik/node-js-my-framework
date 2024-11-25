'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 30
    },
    body: {
        type: String,
        required: true,
        maxLength: 1000
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
