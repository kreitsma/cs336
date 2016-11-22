/***********************************************/
/* Kyle Reitsma, CS 336, Homework 01 10/3/16					    */
/***********************************************/

var express = require('./node_modules/express');
var app = express();
var MongoClient = require('mongodb')

const http_status = require('http-status-codes');
const bodyParser = require('body-parser');

var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Connect to the database
MongoClient.connect('mongodb://cs336:bjarne@ds043942.mlab.com:43942/cs336', function (err, dbConnection) {
  if (err) throw err
	console.log("Successfully connected");
    db = dbConnection;
})

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
person_list.push({firstname: "Kyle", lastname: "Reitsma", id: 01, startdate: "1996/04/17"});
person_list.push({firstname: "Grant", lastname: "Hoekwater", id: 02, startdate: "1996/04/07"});
person_list.push({firstname: "Matthew", lastname: "Hinds", id: 03, startdate: "1995/08/24"});

app.get('/', function (req, res) {
  res.send('Hello World!'); //Default message
});

app.get('/people', function (req, res) {
	db.collection("homework3").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.get('/people/:id', function (req, res) {
	var personid = req.params["id"]; //Get entered parameter
	
	db.collection("homework3").find({id: parseInt(personid)}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

app.delete('/people/:id', function (req, res) {
	var personid = req.params["id"];
	
	db.collection("homework3").delete({id: parseInt(personid)});
});

app.put('/people/:id', function (req, res) {
	var personid = req.params["id"];
	
	db.collection("homework3").update({id: parseInt(personid)}, { $set: {
		firstname: String(req.body.firstname),
		lastname: String(req.body.lastname),
		startdate: String(req.body.startdate)}
	});
});

app.get('/people/:id/name', function (req, res) {
	var personid = req.params["id"];
	
	db.collection("homework3").find({id: parseInt(personid)}, {firstname:1, lastname:1, _id:0}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs[0]["firstname"] + " " + docs[0]["lastname"]);
	});
	
});

app.get('/people/:id/years', function (req, res) {
	var personid = req.params["id"];
	
	db.collection("homework3").find({id: parseInt(personid)}, {startdate:1, _id:0}).toArray(function(err, docs) {
		if (err) throw err;
		var years = getAge(docs[0]["startdate"]);
		res.json("Started " + years + " years ago");
	});
});

app.post('/people', function(req, res) {
	var newPerson = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		id: Date.now(),
		startdate: req.body.startdate
	};
	
	db.collection("homework3").insertOne(newPerson, function(err, result) {
        if (err) throw err;
		res.json(result);
    });
});

app.post('/findbyid', function(req, res) {
	for (person of person_list) {
		if (person["loginID"] == req.body.id) {
			resData = {"firstname": person["firstName"],
							"lastname": person["lastName"],
							"id": person["loginID"],
							"date": person["startDate"]				
			}
			res.json(JSON.stringify(resData));
		}
	}
	
	db.collection("homework3").find({id: parseInt(req.body.idnumber)}).toArray(function(err, docs) {
		if (err) throw err;
		console.log(docs);
		res.json(docs);
	});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

