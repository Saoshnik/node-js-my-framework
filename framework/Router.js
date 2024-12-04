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
                this._request(path, method, ...handlers);
            });
        });
    }

    _request(path, method, ...handlers) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {};
        }
        if (!this.endpoints[path][method]) {
            this.endpoints[path][method] = [];
        }

        // todo: подкорректировать
        if (this.endpoints[path][method].length > 0) {
            throw new Error(`Метод ${method} по адресу ${path} уже существует`);
        }

        console.log(handlers);
        for (const handler of handlers) {
            if (typeof handler !== 'function') {
                throw new TypeError(`Обработчик ${handler} не является function`);
            }

            this.endpoints[path][method].push(handler);
        }


        /*         if (typeof handlers[0] !== 'function') {
            throw new TypeError(`Обработчик ${handlers[0]} не является function`);
        }

        // устанавливаем только первый из обработчиков, чтобы остальные вызывались только при помощи next()
        this.endpoints[path][method].push(handlers[0]);

        for (let i = 0; i < handlers.length - 1; i++) {
            const handler = handlers[i];

            if (typeof handler !== 'function') {
                throw new TypeError(`Обработчик ${handler} не является function`);
            }

            console.log(handlers[i + 1]);
            handler.next = handlers[i + 1];
        }*/
    }

    get(path, ...handlers) {
        this._request(path, 'GET', ...handlers);
    }

    post(path, ...handlers) {
        this._request(path, 'POST', ...handlers);
    }

    put(path, ...handlers) {
        this._request(path, 'PUT', ...handlers);
    }

    delete(path, ...handlers) {
        this._request(path, 'DELETE', ...handlers);
    }
}

module.exports = Router;
