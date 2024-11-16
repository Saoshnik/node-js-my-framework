'use strict';

const Application = require('./framework/Application');
const router = require('./src/routes/index');
const jsonStringify = require('./framework/middlewares/jsonStringify');
require('dotenv').config();

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const app = new Application();

app.addRouter(router);
app.useMiddleware(jsonStringify);

app.listen(PORT, HOSTNAME, () => console.log(`Server started on PORT ${PORT}`));
