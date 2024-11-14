'use strict';

const Router = require('../../framework/Router');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

const router = new Router();

router.use(userRouter);
router.use(postRouter);

module.exports = router;
