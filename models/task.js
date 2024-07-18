// models/Task.js
const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  history:{
    type:Array,
  }
});

module.exports = mongoose.model('Task', taskSchema);