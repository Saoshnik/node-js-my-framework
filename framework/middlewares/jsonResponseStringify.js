'use strict';

module.exports = async function (req, res) {
    res.send = (data) => {
        res.writeHead(res.statusCode, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify((data)));
    };
};
