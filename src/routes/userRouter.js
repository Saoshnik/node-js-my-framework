'use strict';

const Router = require('../../framework/Router');
const models = require('../models/models');

const router = new Router();

router.get('/users', async (req, res) => {
    if (req.params.id) {
        const user = await models.User.findById(req.params.id);
        return res.send(user);
    }

    const users = await models.User.find();
    res.send(users);
});

router.post('/users', async (req, res) => {
    req.body.age = req.body.age ?? 18;

    const user = new models.User({
        name: req.body.name,
        age: req.body.age
    });
    await user.save();

    res.send(user);
});

module.exports = router;
