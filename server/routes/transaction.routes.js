const express = require('express');
const router = express.Router();
const transaction = require('../controllers/transaction.controller');

router.post('/transactions/add' , transaction.addOne)
router.get('/transactions' , transaction.getAll)
router.get('/transactions/sum' , transaction.getSum)

module.exports = router;