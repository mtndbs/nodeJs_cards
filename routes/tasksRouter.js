const express = require('express');

const router = express.Router();
const tasks = require('../controllers/taskController');
const cyclics = require('../controllers/cyclic');

router.get('/cyclic', cyclics.getCyclic);
router.get('/cyclicBase', cyclics.getCyclicBase);
router.post('/cyclicBase', cyclics.addCyclicBase);
router.get('/bootstrapCyclic', cyclics.bootstrapCyclic);

router.get('/test', tasks.getTEST);

router.post('/', tasks.addNew);
router.get('/', tasks.getAll);
router.get('/daily', tasks.daily);
router.get('/:id', tasks.getOne);
router.put('/:id', tasks.updateDetails);
router.delete('/:id', tasks.deleteOne);

router.get('/month/:month', tasks.monthly);
module.exports = router;
