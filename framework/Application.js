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
        console.log(router.endpoints);

        Object.keys(router.endpoints).forEach((path) => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                const handlers = endpoint[method];
                this.server.on(this._getRouteMask(path, method), (req, res) => {
                    for (let i = 0; i < handlers.length; i++) {
                        const handler = handlers[i];
                        // либо норм
                        const next = handlers[i + 1];
                        handler(req, res, next);

                        // либо if i - 1
                    }
                    // либо i - 1
                    // handlers[handlers.length - 1](req, res);

                    // вызываем только первый обработчик, остальные будут вызываться при помощи next()
                    // handlers(req, res);
                });
            });
        });
    }

    /* endpoints = {
    '/users': {
        'GET': [middleware1, middleware2, handler],
        'POST': [middleware1, handler2],
        'DELETE': [middleware3, middleware4, handler3]
    },
    '/posts': {
        'GET': [handler4]
    }
}*/

    listen(PORT, HOSTNAME, callback) {
        this.server.listen(PORT, HOSTNAME, callback);
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }

    async _executeMiddlewares(req, res) {
        for (const middleware of this.middlewares) {
            await middleware(req, res);
        }
    }

    _createServer() {
        return http.createServer(async (req, res) => {
            /* Будущие middleware не работают как middleware в express - они не принимают next,
            а принимают только (req, res), а не (req, res, next)
            Middlewares будут запускаться в порядке, в котором были добавлены в массив
            Насчет работы middleware друг за другом, как authMiddleware(), checkRole('Admin') - я пока не скажу, не пробовал
            Каждая middleware будет добавлять функционал, делать что-то с req и res и т.д., при каждом подключении прямо здесь,
            поскольку req и res уникальны для каждого подключения
            */
            await this._executeMiddlewares(req, res);

            const emitted = this.server.emit(this._getRouteMask(req.pathname, req.method), req, res);
            if (!emitted) {
                res.send(req.url);
            }
        });
    }
};
