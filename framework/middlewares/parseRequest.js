'use strict';

module.exports = async function (req, res) {
    return new Promise((resolve, reject) => {
        try {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => {
                if (data) {
                    req.body = JSON.parse(data);
                }
                resolve();
            });
        } catch (err) {
            reject(err);
        }
    });
};
