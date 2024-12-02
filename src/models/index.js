'use strict';

const User = require('./userModel');
const Role = require('./roleModel');
const Post = require('./postModel');

const models = {
    User,
    Role,
    Post,
}

module.exports = models;
