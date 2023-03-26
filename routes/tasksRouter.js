const express = require('express');

const router = express.Router();
const tasks = require('../controllers/taskController');
const cyclics = require('../controllers/cyclic');

router.get('/', tasks.getAll);
router.get('/daily', tasks.daily);
router.get('/cyclic', cyclics.getCyclic);
router.get('/cyclicBase', cyclics.getCyclicBase);
router.get('/bootstrapCyclic', cyclics.bootstrapCyclic);

router.post('/cyclicBase', cyclics.addCyclicBase);
router.post('/', tasks.addNew);

router.get('/:id', tasks.getOne);
router.put('/:id', tasks.updateDetails);
router.delete('/:id', tasks.deleteOne);

router.get('/month/:month', tasks.monthly);
module.exports = router;
