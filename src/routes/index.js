'use strict';

const Router = require('../../framework/Router');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

const router = new Router();

router.useRouter(userRouter);
router.useRouter(postRouter);

module.exports = router;
