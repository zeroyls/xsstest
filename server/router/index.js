const commentsController = require('../controller/comments.js')
const usersController = require('../controller/users.js');
const express = require('express');
const router = express.Router();

router.post('/user/login',  usersController.login);
router.post('/comments/add', usersController.checkLoginStatus, commentsController.add);
router.get('/comments/delete', usersController.checkLoginStatus, commentsController.delete);
router.get('/comments/list', usersController.checkLoginStatus, commentsController.list);

module.exports = router