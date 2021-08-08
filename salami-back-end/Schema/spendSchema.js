const mongoose = require('mongoose');

const spendSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    require: true
  }
});

module.exports = spendSchema;