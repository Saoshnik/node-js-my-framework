'use strict';

const http = require('http');

module.exports = class Application {
    constructor() {
        this.server = this._createServer();
        this.middlewares = [];
    }

    useMiddleware(middleware) {
        this.middlewares.push(middleware);
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
            /* Будущие middleware не работают как middleware в express - они не принимают next,
            а принимают только (req, res), а не (req, res, next)
            Middlewares будут запускаться в порядке, в котором были добавлены в массив
            Насчет работы middleware друг за другом, как authMiddleware(), checkRole('Admin') - я пока не скажу, не пробовал
            Каждая middleware будет добавлять функционал, делать что-то с req и res и т.д., при каждом подключении прямо здесь,
            поскольку req и res уникальны для каждого подключения
            */
            this.middlewares.forEach(middleware => {
                middleware(req, res);
            });

            const emitted = this.server.emit(this._getRouteMask(req.url, req.method), req, res);
            if (!emitted) {
                res.send(req.url);
            }
        });
    }
};
