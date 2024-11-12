'use strict';

const http = require('http');
require('dotenv').config();

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});

    res.end(JSON.stringify('Hello world'));
});

server.listen(PORT, HOSTNAME, () => console.log(`Server started on PORT ${PORT}`));
