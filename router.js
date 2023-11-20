const express = require('express');
const router = express.Router();

const authController = require('./controllers/auth.controllers.js');
const restrict = require('./middleware/restrict.js');
const locations = require('./controllers/location.controllers.js');

// const userController = require('./controllers/user.js');
// router.post('/users', userController.createUser);
// router.get('/users', userController.getUsers);
// router.get('/users/:id', userController.getUserDetail);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/whoami', restrict.validate, authController.whoami);


router.post('/locations', locations.create);
router.get('/locations', locations.index);

module.exports = router;