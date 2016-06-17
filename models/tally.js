const mongoose = require('mongoose');

var tallySchema = new mongoose.Schema({
  date: String,
  amount: Number,
  payer: String,
  description: String
});

module.exports = exports = mongoose.model('Tally', tallySchema);
