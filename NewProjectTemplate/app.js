var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose.connect("mongodb://localhost:27017/{databaseName}", 
				 {useNewUrlParser:true, useUnifiedTopology: true});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


app.listen("3001", function() {
	console.log("{applicationName} Server Has Started!")
});