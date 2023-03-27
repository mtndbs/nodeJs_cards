const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  category: {
    type: String,
    default: 'Project'
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
  status: {
    type: String,
    minlength: 3,
    required: true
  },
  management: {
    type: String
  },
  Subtasks: {
    type: Array || String
  },

  image: {
    url: {
      type: String,
      minlength: 2,
      maxlength: 1024
    },
    alt: { type: String, minlength: 2, maxlength: 256 }
  }
});

exports.Project = mongoose.model('project', projectSchema);
