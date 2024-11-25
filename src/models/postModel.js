'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    likes: Number, // todo: добавить по умолчанию 0
    userId: mongoose.SchemaTypes.ObjectId // todo: добавить обязательное условие
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
