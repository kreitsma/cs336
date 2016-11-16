/*********************************************/
/* Kyle Reitsma, Lab07, 10/19/2016           */
/*********************************************/

var express = require('express');
var app = express();

app.use(express.static('7.3'));

app.get("/lab07", function (req, res) {
		res.send({"content" : "This is " + req.query.name + "!"});
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});
