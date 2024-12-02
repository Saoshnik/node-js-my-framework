'use strict';

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    value: {type: String, unique: true, default: 'USER'} // todo: добавить enum
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
