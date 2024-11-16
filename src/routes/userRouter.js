'use strict';

const Router = require('../../framework/Router');

const router = new Router();

router.get('/users', (req, res) => {
    console.log(req?.body);
    return res.send({id: 1, likes: 20});
});

router.post('/users', (req, res) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        data = JSON.parse(data);
        req.body = data;

        req.body.age = req.body.age ?? 18;

        res.send(req.body);
    });
});

module.exports = router;
