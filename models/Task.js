const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  category: {
    type: String,
    default: 'Task'
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 1024
  },
  complete: {
    type: Boolean,
    default: false
  },
  finishTime: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  employee: {
    type: mongoose.Schema.ObjectId
  },
  urgency: {
    type: Boolean,
    default: false
  },
  cyclic: {
    type: Boolean
  }
});

exports.Task = mongoose.model('task', taskSchema);
