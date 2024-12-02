'use strict';

const User = require('../models/userModel');
const Role = require('../models/roleModel');
const {Types} = require('mongoose');

class UserController {
    async registration(req, res) {
        try {
            const {name, email, password, age} = req.body;

            const user = new User({name, email, password, age});
            await user.save();

            res.send(user);
        } catch (err) {
            res.send(err.message);
        }
    }

    async login(req, res) {
        try {
            res.send('works');
        } catch (err) {
            res.send(err.message);
        }
    }

    async getAll(req, res) {
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
