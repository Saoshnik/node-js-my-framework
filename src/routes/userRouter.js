'use strict';

const Router = require('../../framework/Router');

const router = new Router();

router.get('/users', (req, res) => {
    console.log(req?.params);

    if (req.params) {
        const users = [
            {id: 1, name: 'Ivan'},
            {id: 2, name: 'Michail'},
            {id: 3, name: 'Sandy'},
        ];
        return res.send(users);
    }

    const user = {id: 1, name: 'Ivan'};
    // достаем из бд
    res.send(user);
});

router.post('/users', (req, res) => {
    console.log(`req.body in router: `);
    console.log(req.body);

    req.body.age = req.body.age ?? 18;
    res.send(req.body);
});

module.exports = router;
