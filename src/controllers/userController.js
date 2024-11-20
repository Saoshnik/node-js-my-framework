'use strict';

const User = require('../models/userModel');
const {Types} = require("mongoose");

class UserController {
    async create(req, res) {
        req.body.age = req.body.age ?? 18;

        const user = new User({
            name: req.body.name,
            age: req.body.age
        });
        await user.save();

        res.send(user);
    }

    async get(req, res) {
        if (req.params.id && Types.ObjectId.isValid(req.params.id)) {
            const user = await User.findById(req.params.id);
            return res.send(user);
        }

        const users = await User.find();
        res.send(users);
    }
}

module.exports = new UserController();
