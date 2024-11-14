'use strict';

const http = require('http');
const Router = require('./framework/Router');
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

function _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
}

function addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
        const endpoint = router.endpoints[path];
        Object.keys(endpoint).forEach((method) => {
            const handler = endpoint[method];
            server.on(_getRouteMask(path, method), (req, res) => {
                handler(req, res);
            });
        });
    });
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});

    const emitted = server.emit(_getRouteMask(req.url, req.method), req, res);
    if (!emitted) {
        res.end(req.url);
    }
});

addRouter(router);

server.listen(PORT, HOSTNAME, () => console.log(`Server started on PORT ${PORT}`));
