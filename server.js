const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/kitty_app_dev');

const kittyRouter = require(__dirname + '/routes/kitty_routes');
const userRouter = require(__dirname + '/routes/user_routes');

app.use('/api', kittyRouter);
app.use('/api', userRouter);

app.use(express.static(__dirname + '/build'));

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
