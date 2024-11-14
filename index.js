'use strict';

const Router = require('./framework/Router');
const Application = require('./framework/Application');
require('dotenv').config();

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const router = new Router();

router.get('/users', (req, res) => {
    console.log(req?.body);
    return res.end(JSON.stringify({id: 1, likes: 20}));
});
router.get('/posts', (req, res) => {
    console.log(req?.body);
    return res.end(JSON.stringify({id: 1, name: 'Ivan'}));
})

const app = new Application();

app.addRouter(router);

app.listen(PORT, HOSTNAME, () => console.log(`Server started on PORT ${PORT}`));
