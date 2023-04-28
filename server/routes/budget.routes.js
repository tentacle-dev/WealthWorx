const express = require('express');
const router = express.Router();
const budget = require('../controllers/budget.controller')

router.post('/budget/addOne' , budget.addOne)
router.get('/budget' , budget.getAll)

module.exports = router