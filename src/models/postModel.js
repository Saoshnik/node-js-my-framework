'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    likes: Number
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
