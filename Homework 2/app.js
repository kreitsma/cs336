/***********************************************/
/* Kyle Reitsma, CS 336, Homework 01 10/3/16					    */
/***********************************************/

var express = require('./node_modules/express');
var app = express();

const http_status = require('http-status-codes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

//Person class
function Person(firstName, lastName, loginID, startDate) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.loginID = loginID;
	this.startDate = startDate;
}

// Compute age - by Naveen Jose
function getAge(date) {
    var today = new Date();
    var strtDate = new Date(date);
    var age = today.getFullYear() - strtDate.getFullYear();
    var m = today.getMonth() - strtDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < strtDate.getDate())) {
        age--;
    }
    return age;
}

var person_list = [];
person_list.push(new Person("Kyle", "Reitsma", 01, "1996/04/17"));
person_list.push(new Person("Grant", "Hoekwater", 02, "1996/04/07"));
person_list.push(new Person("Matthew", "Hinds", 03, "1995/08/24"));
person_list.push(new Person("Nathan", "Van Ryn", 04, "1996/02/19"));

app.get('/', function (req, res) {
  res.send('Hello World!'); //Default message
});

app.get('/people', function (req, res) {
	res.json(person_list); //Return full list of people
});

app.get('/people/:id', function (req, res) {
	var id = req.params["id"]; //Get entered parameter
	
	if (id <= person_list.length && id > 0) { //If id is valid
		res.json(person_list[id - 1]); //Return the id (which is one greater than index)
	}
	else
		res.sendStatus(404); //404 not found
});

app.delete('/people/:id', function (req, res) {
	var id = req.params["id"];
	
	if (id <= person_list.length && id > 0) { 
		person_list.splice(id - 1, 1);
		res.send("Deleted" + person_list[id -1].firstName + " " + person_list[id -1].firstName);
	}
	else
		res.sendStatus(404);
});

app.put('/people/:id', function (req, res) {
	var id = req.params["id"];
	
	if (id <= person_list.length && id > 0) { 
		person_list[id - 1]["firstName"] = req.body.firstname;
		person_list[id - 1]["lastName"] = req.body.lastname;
		person_list[id - 1]["startDate"] = req.body.startdate;
		res.send("Updated the information.");
	}
	else
		res.sendStatus(404);
});

app.get('/people/:id/name', function (req, res) {
	var id = req.params["id"];
	
	if (id <= person_list.length && id > 0) { 
		res.json(person_list[id -1].firstName + " " + person_list[id -1].lastName); //Full name
	}
	else
		res.sendStatus(404);
});

app.get('/people/:id/years', function (req, res) {
	var id = req.params["id"];
	
	if (id <= person_list.length && id > 0) {
		res.json(getAge(person_list[id-1].startDate)); //Send number of years
	}	
	else
		res.sendStatus(404);
});

app.post('/addperson', function(req, res) {
    person_list.push(new Person(req.body.firstname, req.body.lastname, person_list.length + 1, req.body.startdate));
	resData = { "firstname" : req.body.firstname, "lastname" : req.body.lastname};
	res.json(resData);
});

app.post('/findbyid', function(req, res) {
	if (req.body.idnumber <= person_list.length) {
		resData = {"firstname": person_list[req.body.idnumber - 1]["firstName"],
						"lastname": person_list[req.body.idnumber - 1]["lastName"],
						"idnum": person_list[req.body.idnumber - 1]["loginID"],
						"numyears": getAge(person_list[req.body.idnumber - 1]["startDate"])}
	
		res.json(resData);
	}
	else {
		console.log("Index out of range");
	}
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

