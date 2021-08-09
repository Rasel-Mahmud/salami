const mongoose = require('mongoose');

const earnSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    require: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  }
});

module.exports = earnSchema;