const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  balance: {type: Number, default: 0},
});

module.exports = exports = mongoose.model('User', userSchema);
