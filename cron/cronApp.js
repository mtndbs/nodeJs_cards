const { CronJob } = require('cron/lib/cron');
const { Task } = require('../models/Task');
const Cyclic = require('../models/CyclicSchema');

const job = new CronJob('0 39 0 30 * *', async () => {
  const d = new Date();
  console.log('every first on month:', d);
  const baseCyclic = await Cyclic.find({})
    .select('-_id')
    .select('-__v');

  baseCyclic.forEach(task => {
    task.finishTime = new Date().toISOString();
    task.month = new Date().getMonth() + 1;
  });
  await Task.insertMany(baseCyclic);
  console.log(baseCyclic);
});

job.start();
