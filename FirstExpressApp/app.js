var express = require("express")
var app = express();


// "/" => "Hi there!"
app.get("/", function(req, res) {
	res.send("<h1>Hi! There!</h1>");
	console.log("received / request")
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
	res.send("Goodbye!");
	console.log("received /bye request")
});

// "/bye" => "Goodbye!"
app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
	res.send("welcome to subreddit" + req.params.subredditName + ", " + req.params.id);
	console.log("received /r/subreddit request")
});


app.get("*", function(req, res){
	res.send("You are a start!");
});


var port = "3001";
app.listen(port, function() {
	console.log("Server listening on port " + port)
});
