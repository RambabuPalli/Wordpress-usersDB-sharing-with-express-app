var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var path = require('path');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'wordpress1'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM wp_users WHERE user_login = ?', [username], async function (error, results, fields) {
			if (results.length > 0) {
				const comparison = await bcrypt.compare(password, results[0].user_pass)
				if (comparison) {
					console.log("Password matched");
					request.session.loggedin = true;
					request.session.username = username;
					response.redirect('/home');
				} else {
					console.log("Password mis-matched");
					// alert("username or password mismatched");
					// response.redirect('/home');
					response.send('Incorrect Username and/or Password!');
				}
			}
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);