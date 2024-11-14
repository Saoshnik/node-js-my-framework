'use strict';

const http = require('http');

module.exports = class Application {
    constructor() {
        this.server = this._createServer();
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach((path) => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                const handler = endpoint[method];
                this.server.on(this._getRouteMask(path, method), (req, res) => {
                    handler(req, res);
                });
            });
        });
    }

    listen(PORT, HOSTNAME, callback) {
        this.server.listen(PORT, HOSTNAME, callback);
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }

    _createServer() {
        return http.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'application/json'});

            const emitted = this.server.emit(this._getRouteMask(req.url, req.method), req, res);
            if (!emitted) {
                res.end(req.url);
            }
        })
    }
};
