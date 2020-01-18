//'places' route
const express = require('express');

const usersController = require('../controllers/users-controller');

const router = express.Router();



// ===== ===== ROUTES ===== =====
//DON'T FORGET THAT ROUTE ORDER MATTERS!!
router.get('/', usersController.getUsers);

router.post('/signup', usersController.signup);

router.post('/login', usersController.login);
// ===== ===== ====== ===== =====


module.exports = router; 