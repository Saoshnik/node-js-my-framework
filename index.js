'use strict';

const mongoose = require('mongoose');
const Application = require('./framework/Application');
const router = require('./src/routes/index');
const jsonStringify = require('./framework/middlewares/jsonStringify');
const parseRequest = require('./framework/middlewares/parseRequestBody');
const parseRequestParams = require('./framework/middlewares/parseRequestParams');
require('dotenv').config();

const app = new Application();

app.addRouter(router);

app.useMiddleware(jsonStringify);
app.useMiddleware(parseRequest);

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

app.useMiddleware(parseRequestParams(`http://${HOSTNAME}:${PORT}`));

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);

        app.listen(PORT, HOSTNAME, () => console.log(`Server started on PORT ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};

start();
