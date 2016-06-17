const express = require('express');
const jsonParser = require('body-parser').json();
const Tally = require(__dirname + '/../models/tally');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var kittyRouter = module.exports = exports = express.Router();

kittyRouter.get('/total', (req, res) => {
  Tally.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

kittyRouter.post('/total', jsonParser, (req, res) => {
  var newAmount = new Tally(req.body);
  newAmount.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

kittyRouter.delete('/tally/:id', jsonParser, (req, res) => {
  Tally.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'Successly deleted donor'});
  });
});
