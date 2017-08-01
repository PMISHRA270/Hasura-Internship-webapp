
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


//your routes here
var root=process.cwd();



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login1.html'));
});

app.get('/form', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'form.html'));
});

app.use('/public',express.static('public'));

app.use('/img',express.static(path.join(__dirname,'public/images')))


app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'register.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/assets/signup.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/assets', 'signup.js'));
});

app.get('/ui/assets/login.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/assets', 'login.js'));
});

app.get('/Profile', function (req, res) {
    res.send("Your profile will be shown only if you are logged in");
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
