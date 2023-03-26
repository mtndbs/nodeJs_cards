// const joi = require("joi");
const { Task } = require('../models/Task');
const Cyclic = require('../models/CyclicSchema');

module.exports = {
  getCyclic: async function(req, res) {
    const cyclic = await Task.find({ cyclic: true });

    res.status(200).json(cyclic);
  },

  bootstrapCyclic: async function(req, res) {
    try {
      const baseCyclic = await Cyclic.find({})
        .select('-_id')
        .select('-__v');

      baseCyclic.forEach(task => {
        task.finishTime = new Date().toISOString();
        task.month = new Date().getMonth() + 1;
      });
      console.log(baseCyclic);
      const bootCyclic = await Task.insertMany(baseCyclic);

      res.status(200).json({
        status: 'success',
        results: bootCyclic.length,
        data: bootCyclic
      });
    } catch (err) {
      if (err) {
        res.status(400).send(err);
      }
    }
  },

  getCyclicBase: async function(req, res) {
    const cyclic = await Cyclic.find({});

    res.status(200).json({
      status: 'success',
      results: cyclic.length,
      data: cyclic
    });
  },

  addCyclicBase: async function(req, res) {
    const newCyclic = await Cyclic.create(req.body);

    res.status(200).json({
      status: 'success',
      results: newCyclic.length,
      data: newCyclic
    });
  }
};
