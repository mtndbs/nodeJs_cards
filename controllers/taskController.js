const joi = require('joi');
const { Task } = require('../models/Task');
// const Cyclic = require('../models/CyclicSchema');

module.exports = {
  getAll: async function(req, res, next) {
    try {
      const result = await Task.find({}).sort({ urgency: -1 });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'error getting tasks' });
    }
  },

  getOne: async function(req, res, next) {
    try {
      const schema = joi.object({
        id: joi.string().required()
      });

      const { error, value } = schema.validate(req.params);

      if (error) {
        console.log(error.details[0].message);
        throw `error get details`;
      }

      const task = await Task.findById(value.id);
      if (!task) throw 'Invalid task id, no such task.';
      res.json(task);
    } catch (err) {
      res.status(400).json({ error: 'Invalid data' });
      console.log(`Error: ${err}`);
    }
  },

  addNew: async function(req, res, next) {
    try {
      const schema = joi.object({
        title: joi
          .string()
          .min(2)
          .max(256)
          .required(),
        description: joi
          .string()
          .min(2)
          .max(1024)
          .required(),
        complete: joi.boolean(),
        urgency: joi.boolean(),
        finishTime: joi.allow()
      });

      const { error, value } = schema.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        throw 'error add task';
      }

      const task = new Task(value);
      const newTask = await task.save();
      res.json(newTask);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: `error adding task` });
    }
  },

  updateDetails: async function(req, res, next) {
    try {
      const schema = joi
        .object({
          title: joi
            .string()
            .min(2)
            .max(256),
          description: joi
            .string()
            .min(2)
            .max(1024),
          complete: joi.boolean()
        })
        .min(1);

      const { error, value } = schema.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        throw 'error updating task';
      }

      const filter = {
        _id: req.params.id
      };

      const task = await Task.findOneAndUpdate(filter, value);
      if (!task) throw 'No task with this ID in the database';
      const updated = await Task.findById(task._id);
      res.json(updated);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: `error updating details` });
    }
  },

  deleteOne: async function(req, res, next) {
    try {
      const schema = joi.object({
        id: joi.string().required()
      });

      const { error, value } = schema.validate(req.params);

      if (error) {
        console.log(error.details[0].message);
        throw `error delete task`;
      }

      const deleted = await Task.findOneAndRemove({
        _id: value.id
      });

      if (!deleted) throw 'failed to delete';
      res.json(deleted);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: `error delete task` });
    }
  },
  monthly: async function(req, res) {
    const month = req.params.month * 1; // 1-12
    const currentYear = new Date().getFullYear();

    const plan = await Task.aggregate([
      {
        $match: {
          finishTime: {
            $gte: new Date(`${currentYear}-${month}-01`),
            $lte: new Date(`${currentYear}-${month}-31`)
          }
        }
      }
    ]);
    res.status(200).json({
      status: 'success',
      results: plan.length,
      data: plan
    });
  },
  daily: async function(req, res) {
    const day = req.params.day ? req.params.day * 1 : new Date().getDate();
    const currentYear = new Date().getFullYear();
    const month = new Date().getMonth();
    let currentMonth;
    if (month >= 10) {
      currentMonth = month + 1;
    } else {
      currentMonth = `0${month + 1}`;
    }

    const plan = await Task.aggregate([
      {
        $match: {
          finishTime: {
            $gte: new Date(`${currentYear}-${currentMonth}-${day}`),
            $lte: new Date(`${currentYear}-${currentMonth}-${day + 1}`)
          }
        }
      }
    ]);

    res.status(200).json(plan);
  },

  getCyclic: async function(req, res) {
    const cyclic = await Task.find({ cyclic: true });

    res.status(200).json({
      status: 'success',
      results: cyclic.length,
      data: cyclic
    });
  }
};
