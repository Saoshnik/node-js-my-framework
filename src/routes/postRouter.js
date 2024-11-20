'use strict';

const Router = require('../../framework/Router');
const postController = require('../controllers/postController');

const router = new Router();

router.post('/posts', postController.create);
router.get('/posts', postController.getAll);
router.put('/posts', postController.update);
router.delete('/posts', postController.delete);

module.exports = router;
