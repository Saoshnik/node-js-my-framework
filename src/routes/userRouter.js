'use strict';

const Router = require('../../framework/Router');
const userController = require('../controllers/userController');

const router = new Router();

router.post('/users', userController.create);

router.get('/users', userController.get);

module.exports = router;
