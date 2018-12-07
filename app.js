var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/temperature', function(req, res) {
  res.json({ temperature: 20 });
});

app.listen(3000, function() {
  console.log('app running on port 3000');
});
