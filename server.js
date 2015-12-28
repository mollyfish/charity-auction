var mongoose = require('mongoose');
var express = require('express');
var app = express();
var itemsRouter = require(__dirname + '/routes/items_routes');
var authRouter = require(__dirname + '/routes/auth_routes');
var port = 3000 || process.env.PORT;

process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/items_dev');

app.use(express.static(__dirname + '/build'));

app.use('/api', authRouter);
app.use('/api', itemsRouter);

app.listen(port, function() {
  console.log('server up on port ' + port);
});
