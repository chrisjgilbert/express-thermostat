var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/temperature', function(req, res) {
  temperature = req.session.temperature || 20;
  res.json({ temperature: temperature });
});

app.post('/temperature', function(req, res) {
  req.session.temperature = req.body.temperature
  res.redirect('/')
});

app.listen(3000, function() {
  console.log('app running on port 3000');
});
