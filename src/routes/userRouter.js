'use strict';

const Router = require('../../framework/Router');

const router = new Router();

router.get('/users', (req, res) => {
    console.log(req?.body);
    return res.send({id: 1, likes: 20});
});

router.post('/users', (req, res) => {
    console.log(`req.body in router: `);
    console.log(req.body);

    req.body.age = req.body.age ?? 18;
    res.send(req.body);
});

module.exports = router;
