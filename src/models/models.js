'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    likes: Number
})

const User = new mongoose.model('User', userSchema);
const Post = new mongoose.model('Post', postSchema);

module.exports = {
    User,
    Post
};
