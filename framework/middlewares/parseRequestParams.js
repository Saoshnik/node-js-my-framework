'use strict';

module.exports = (baseUrl) => {
    return (req, res) => {
        const url = new URL(req.url, baseUrl);

        req.pathname = url.pathname;

        req.params = {};
        url.searchParams.forEach((value, key) => {
            req.params[key] = value;
        });
    };
};
