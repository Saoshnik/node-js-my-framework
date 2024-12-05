'use strict';

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log('start');
    if (req.method === 'OPTIONS') {
        next(); // todo with express: uncommit
        return; // todo with express: delete that line
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // достаем сам токен
        if (!token) {
            throw new Error();
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next(); // todo with express: uncommit
    } catch (err) {
        if (res.statusCode === 200) {
            res.statusCode = 403;
        }

        if (err instanceof jwt.JsonWebTokenError) {
            req.send(err.message);
        } else {
            res.send('Пользователь не авторизован');
        }
    }
};
