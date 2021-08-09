const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
});

module.exports = userSchema;