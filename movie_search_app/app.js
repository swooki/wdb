var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("search");
});
		

app.get("/results", function(req, res) {
	console.log(req);
	var query = req.query.title;
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
	console.log(url);
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200) {
			var results = JSON.parse(body);
			res.render("results", {data:results});
		}
	});
});

var port = 3001;
app.listen(port, function() {
	console.log("Movie app has started " + port)
});