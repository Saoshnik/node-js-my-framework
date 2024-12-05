'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    body: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    },
    likes: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
