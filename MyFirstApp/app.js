var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("<h1>Hi there, welcome to my assignment.</h1>");
	console.log("received / request")
});


app.get("/speak/:animal", function(req, res) {
	console.log("received /speak/" + req.params.animal + " request")
	// if(req.params.animal === "dog") {
	// 	res.send("Woof Woof!");
	// } else if (req.params.animal === "cat") {
	// 	res.send("moew!");
	// } else {
	// 	res.send("What?");
	// }
	var sounds ={ 
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof"
	}
	
	var animal = req.params.animal.toLowerCase();
	var sound = sounds[animal];
	res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:string/:num", function(req, res) {
	console.log("received /repeat/:string/:num request with " + req.params.string+ ", " + req.params.num);
	var repeat = Number.parseInt(req.params.num);
	if(Number.isNaN(repeat)) {
		res.send("Invalid number");
		return;
	} else {
		var output = "";
		for(var i=1; i<=repeat; i++) {
			output+= req.params.string;
			if( i %50 ===0){
				output += "<br>";
			}
		}
		res.send(output + "<br>" + repeat);
	}
});

var port = 3001;
app.listen(port, function() {
	console.log("Server listening on port " + port)
});