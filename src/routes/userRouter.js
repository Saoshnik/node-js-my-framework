'use strict';

const Router = require('../../framework/Router');
const userController = require('../controllers/userController');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.get('/users', userController.getAll)

module.exports = router;
