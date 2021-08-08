const mongoose = require('mongoose');

const earnSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    require: true
  }
});

module.exports = earnSchema;