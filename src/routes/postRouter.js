'use strict';

const Router = require('../../framework/Router');

const router = new Router();

router.get('/posts', (req, res) => {
    console.log(req?.body);
    return res.send({id: 1, likes: 20});
})

module.exports = router;
