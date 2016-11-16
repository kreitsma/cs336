/*********************************************/
/* Kyle Reitsma, Lab06, 10/12/2016           */
/*********************************************/

// 6.1
// a. Using Chrome, you can only test the GET request. However, you can test all of the requests in Curl. Chrome can only do GETs because it is a browser, not a web app.
//    Successful Curl commands: 
//    curl -X DELETE localhost:3000/request, curl -I HEAD localhost:3000/request, curl -X POST localhost:3000/request, curl -X PUT localhost:3000/request,
//    curl GET localhost:3000/request 
//
// b. 404 is the most appropriate, because it deals with routes that are not defined. 

// 6.2
// a. Forms support the GET and POST methods, with GET being the default. 
// 
// b. The form data is passed back to the server through HTTP; the source data looks like this:   
//		user_name=Kyle+Reitsma&user_email=kr29%40students.calvin.edu&user_message=Hello+World 
//    The syntax takes the form of a URL; spaces are replaced with +, @ is replaced with %40, and the input labels and values are separated by &.
//		The data itself is not modified because it is easily decoded.
//

var express = require('express');
var app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/request', function (req, res) {
  res.send('Got a GET request!');
});

app.post('/request', function (req, res) {
  res.send('Got a POST request');
});

app.post('/forms', function (req, res) {
  res.send('Got a POST request: Name: <code>' + req.body.user_name + '</code> Email: <code>' + req.body.user_email + '</code> Message: <code>'
					 + req.body.user_message + '</code>');
});

app.put('/request', function (req, res) {
  res.send('Got a PUT request at /user');
});

app.head('/request', function (req, res) {
  res.send('Got a HEAD request at /user');
});

app.delete('/request', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.all("*", function(req, res) {
	res.sendStatus(400);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});
