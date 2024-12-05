'use strict';

const jwt = require("jsonwebtoken");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            /*next();*/ // todo with express: uncommit
            return; // todo with express: delete that line
        }

        try {
            const token = req.headers.authorization.split(' ')[1]; // достаем сам токен
            if (!token) {
                throw new Error('Отсутствует токен авторизации');
            }

            const {roles: userRoles} = jwt.verify(token, process.env.JWT_SECRET_KEY);

            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                throw new Error('У вас нет доступа');
            }

            /*next();*/ // todo with express: uncommit
        } catch (err) {
            if (res.statusCode === 200) {
                res.statusCode = 403;
            }

            res.send(err.message);
        }
    };
}
