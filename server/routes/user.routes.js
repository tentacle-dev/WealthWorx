const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller')

router.post('/user/login', user.login);

router.post('/user/register', user.register);

router.get('/user-data' ,  user.getUsers )

module.exports = router;