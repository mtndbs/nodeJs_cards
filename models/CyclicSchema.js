const mongoose = require('mongoose');

const cyclicSchema = mongoose.Schema({
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
  cyclic: {
    type: Boolean,
    default: true
  },
  month: {
    type: String
  }
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
});
// exports.Task = mongoose.model("task", taskSchema);
const Cyclic = mongoose.model('cyclic', cyclicSchema);
module.exports = Cyclic;
