'use strict';

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
