const express = require('express');

const router = express.Router();
const tasks = require('../controllers/taskController');

router.get('/:id', tasks.getAllforEmplpyee);
module.exports = router;
