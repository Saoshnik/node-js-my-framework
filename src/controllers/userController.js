'use strict';

const models = require("../models/models");

class UserController {
    async create(req, res) {
        req.body.age = req.body.age ?? 18;

        const user = new models.User({
            name: req.body.name,
            age: req.body.age
        });
        await user.save();

        res.send(user);
    }

    async get(req, res) {
        if (req.params.id) {
            const user = await models.User.findById(req.params.id);
            return res.send(user);
        }

        const users = await models.User.find();
        res.send(users);
    }
}

module.exports = new UserController();
