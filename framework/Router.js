'use strict';

class Router {
    // Попробую переделать так, чтобы каждый метод являлся массивом и содержал уже СПИСОК обработчиков (handler1, handler2) и т.д.
    // А точнее список будет состоять по сути из всех middlewares и самого обработчика.
    // Так же как и раньше: на данном маршруте и для конкретного метода
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

    constructor() {
        this.endpoints = {};
    }

    useRouter(router) {
        Object.keys(router.endpoints).forEach((path) => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                const handlers = endpoint[method];
                for (const handler of handlers) {
                    this.request(path, method, handler);
                }
            });
        });
    }

    request(path, method, handlers) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {};
        }
        if (!this.endpoints[path][method]) {
            this.endpoints[path][method] = [];
        }

        // закомментировано для возможности добавлять больше одного обработчика - то есть что-то вроде middleware
        // if (this.endpoints[path][method]) {
        //     throw new Error(`Метод ${method} по адресу ${path} уже существует`);
        // }

        if (typeof handler !== 'function') {
            throw new TypeError(`Аргумент handler не является function`);
        }

        this.endpoints[path][method].push(handler);
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
