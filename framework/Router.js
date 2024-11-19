'use strict';

class Router {
    /* endpoints = {
        '/users': {
            'GET': handler1,
            'POST': handler2,
            'DELETE': handler3
        },
        '/posts': {
            'GET': handler4
        }
    }*/

    constructor() {
        this.endpoints = {};
    }

    use(router) {
        Object.keys(router.endpoints).forEach((path) => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                const handler = endpoint[method];
                this.request(path, method, handler);
            });
        });
    }

    request(path, method, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {};
        }

        if (this.endpoints[path][method]) {
            throw new Error(`Метод ${method} по адресу ${path} уже существует`);
        }

        if (typeof handler !== 'function') {
            throw new TypeError(`Аргумент handler не является function`);
        }

        this.endpoints[path][method] = handler;
    }

    get(path, handler) {
        this.request(path, 'GET', handler);
    }

    post(path, handler) {
        this.request(path, 'POST', handler);
    }

    put(path, handler) {
        this.request(path, 'PUT', handler);
    }

    delete(path, handler) {
        this.request(path, 'DELETE', handler);
    }
}

module.exports = Router;
