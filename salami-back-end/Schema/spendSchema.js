const mongoose = require('mongoose');

const spendSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  }
});

module.exports = spendSchema;