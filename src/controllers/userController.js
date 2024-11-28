'use strict';

const User = require('../models/userModel');
const {Types} = require('mongoose');

class UserController {
    async create(req, res) {
        try {
            const {name, email, password, age} = req.body;

            const user = new User({name, email, password, age});
            await user.save();

            res.send(user);
        } catch (err) {
            res.send(err.message);
        }
    }

    async get(req, res) {
        try {
            if (req.params.id && Types.ObjectId.isValid(req.params.id)) {
                const user = await User.findById(req.params.id);
                return res.send(user);
            }

            const users = await User.find();
            res.send(users);
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = new UserController();
