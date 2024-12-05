'use strict';

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    value: {type: String, unique: true, default: 'USER', trim: true} // todo: добавить enum
});

module.exports = mongoose.model('Role', roleSchema);
