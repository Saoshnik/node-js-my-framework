'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 100,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        maxLength: 100
    },
    name: {
        type: String,
        default: '',
        trim: true,
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
