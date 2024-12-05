'use strict';

const Router = require('../../framework/Router');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.get('/users', authMiddleware, () => console.log('second middleware was running successful'), userController.getAll);

module.exports = router;
