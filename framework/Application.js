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


    addSomething(req, res) {
        // version 1
        res.send = (data) => {
            res.end(JSON.stringify(data));
        }

        res.fillSomething = function (info) {
            // fill info
            res.send('info was filled')
        }

        req.checkAuth = function (token) {
            // check token
            res.send('Bad token');
        }

        // version 2
        // res.sendBetter = AnotherModule.send;
        // res.fillSomethingBetter = AnotherModule.fillSomething;
        // res.checkAuthBetter = AnotherModule.checkAuth;
    }


    methods = [];

    addSomethingBetter(method) {
        this.methods.push(method);

        this.addSomething(req, res)
    }

    initializeBetterMethods() {
        this.methods.forEach(method => {
            method(req, res);
            // addSomething(req, res);    middleware 1
            // addSomething2(req, res);   middleware 2
            // addSomething3(req, res);   middleware 3
        });
    }

    _createServer() {
        return http.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'application/json'});

            // ... Конечно же можно модифицировать прототип, а потом вернуть все к оригиналу, но я не знаю
            // что лучше и хочу попробовать использовать будущие middleware
            http.ServerResponse.prototype.sendHello = () => res.end('Hello');
            res.sendHello();
            // вернуть к обычному состоянию http.ServerResponse.prototype...

            // Этот коммит с комментариями я залью для понимая следующего коммита
            // Тут будет мой код с тем как я пытался разобраться

            this.addSomething(req, res);

            res.send = (data) => {
                res.end(JSON.stringify(data));
            }


            this.middlewares = [];
            this.middlewares.forEach(middleware => middleware(req, res, next)) // - не вариант

            // По сути мы для каждого подключения(обновления страницы) у нас срабатывает _createServer()
            // и для каждого мы вызываем наши middleware чтобы они добавили функционал, такой как res.send() - (не res.end)

            // Это нужно делать, потому что для каждого запроса request и response будет новым.
            // И нам постоянно нужно его модифицировать добавляя функционал. Потому что она находится только здесь,
            // в данном коллбеке (req, res) => {мы здесь}
            this.initializeBetterMethods();

            // p.s. Будущие middleware не работают как middleware в express они не принимают next,
            // а принимают только (req, res), а не (req, res, next)

            // p.s.s. Насчет работы middleware друг за другом, как authMiddleware(), checkRole('Admin') -
            // я пока не скажу, не пробовал. Скорее всего в данном случае просто будут вызываться все middleware


            ///// ВЫВОД
            // Это все глобально позволяет добавить новый функционал, такой как res.send() прямо сюда, в эту
            // функцию _createServer(). Только здесь находится req и res, соответственно модифицировать их можно только тут.
            // Будущий массив middleware[] будет добавлять функционал, делать что-то с req и res т.д.,
            // при каждом подключении прямо здесь.
            // Этот массив и проход по нему с помощью forEach нужен для того, чтобы не писать всю необходимую модификацию здесь
            // и не засорять _createServer().
            this.middlewares.forEach(middleware => {
                middleware(req, res);
            });
            // Так мы создаем массив middleware[] с функционалом и запускаем каждую функцию добавляя данный функционал
            // к req и res
            // При данной схеме, это лучший и самый короткий вариант, плюс он от Ulbi

            // Запускаться все это будет в том порядке, в котором будет добавлено в массив. Так что может
            // и получится использовать как нормальные middleware

            const emitted = this.server.emit(this._getRouteMask(req.url, req.method), req, res);
            if (!emitted) {
                res.end(req.url);
            }
        })
    }
};
