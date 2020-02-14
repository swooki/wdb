var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


var members = [
	{name: "Sungwook Kwon", address: "6027 Innovation Dr."},
	{name: "Soonduck Jang", address: "4200 E 5TH AVE"},
	{name: "John Park", address: "4209 Main St."},
	{name: "Sungwook Kwon", address: "6027 Innovation Dr."},
	{name: "Soonduck Jang", address: "4200 E 5TH AVE"},
	{name: "John Park", address: "4209 Main St."},
	{name: "Sungwook Kwon", address: "6027 Innovation Dr."},
	{name: "Soonduck Jang", address: "4200 E 5TH AVE"},
	{name: "John Park", address: "4209 Main St."},
	{name: "Sungwook Kwon", address: "6027 Innovation Dr."},
	{name: "Soonduck Jang", address: "4200 E 5TH AVE"},
	{name: "John Park", address: "4209 Main St."},
]


app.get("/", function(req, res){
	res.render("landing");
});

app.get("/members/new", function(req, res){
	res.render("new");
});

app.get("/members", function(req, res){
	res.render("members", {members:members});
});

app.post("/members", function(req, res){
	var name = req.body.name;
	var address = req.body.address;
	var newMember = {name:name, address:address};
	
	members.push(newMember);
	
	res.redirect("/members");
});

app.listen("3001", function() {
	console.log("MyDirectory Server Has Started!")
});