const express = require('express');
const router = express.Router();
const income = require('../controllers/income.controller');

router.post('/income/add' , income.addOne)
router.get('/income' , income.getAll)
router.get('/income/sum' , income.getSum);

module.exports = router