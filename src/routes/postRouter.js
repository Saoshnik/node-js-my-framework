'use strict';

const Router = require('../../framework/Router');

const router = new Router();

router.get('/posts', (req, res) => {
    console.log(req?.body);
    return res.end(JSON.stringify({id: 1, name: 'Ivan'}));
})

module.exports = router;
