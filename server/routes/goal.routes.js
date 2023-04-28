const express = require('express');
const router = express.Router();
const goal = require('../controllers/goal.controller');

router.post('/goals/addOne' , goal.addOne);
router.get('/goals' , goal.getAll )
router.get('/goals/latest' , goal.latest )

module.exports = router;