const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');
const authController = require('../controllers/auth.js');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserDetail);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

module.exports = router;