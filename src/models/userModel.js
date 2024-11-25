'use strict';

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100
    },
    name: {
        type: String,
        default: '',
        maxLength: 30
    },
    age: {
        type: Number,
        default: 18,
        min: 0,
        max: 120
    },
    posts: [mongoose.SchemaTypes.ObjectId]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
