'use strict';

const Router = require('../../framework/Router');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);

// мои middlewares не работают вместе, во время ошибки они не прерываются. Как реализовать middleware как в express я не знаю
router.get('/users', authMiddleware, roleMiddleware(['ADMIN']), userController.getAll);

module.exports = router;
