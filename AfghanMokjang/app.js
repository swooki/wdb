var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose.connect("mongodb://localhost:27017/afghan_mokjang", 
				 {useNewUrlParser:true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE/MODEL CONFIG
var prayerSchema = new mongoose.Schema({
	title: String,
	image: String,
	content: String,
	requester: String,
	created: {type:Date, default: Date.now},
	answered: Date
});

var Prayer = mongoose.model("Prayer", prayerSchema);

// ROOT ROUTE
app.get("/", function(req, res){
	res.redirect("/prayers");
})

// INDEX ROUTE
app.get("/prayers", function(req, res){
	Prayer.find({}, function(err, prayers){
		if(err) {
			console.log(err);
		} else {
			res.render("index", {prayers:prayers});		
		}
	});
	
});

// NEW ROUTE
app.get("/prayers/new", function(req,res){
	res.render("new");
});

// SHOW ROUTE
app.get("/prayers/:id", function(req, res){
	Prayer.findById(req.params.id, function(err, foundPrayer){
		if(err) {
			console.log(err);
		} else {
			res.render("show", {prayer:foundPrayer});
		}
	});
});

// CREATE ROUTE
app.post("/prayers", function(req, res){
	req.body.prayer.content = req.sanitize(req.body.prayer.content);
	Prayer.create(req.body.prayer, function(err, newPrayer){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/prayers");
		}
	});
});


// EDIT ROUTE
app.get("/prayers/:id/edit", function(req, res){
	Prayer.findById(req.params.id, function(err, foundPrayer){
		if(err) {
			console.log(err);
		} else {
			res.render("edit", {prayer:foundPrayer});
		}
	});
});

// UPDATE ROUTE
app.put("/prayers/:id", function(req, res){
	req.body.prayer.content = req.sanitize(req.body.prayer.content);
	Prayer.findByIdAndUpdate(req.params.id, req.body.prayer, function(err, updatedPrayer) {
		if(err){
			console.log(err);
		} else {
			res.redirect("/prayers/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/prayers/:id", function(req, res){
	Prayer.findByIdAndDelete(req.params.id, function(err) {
		if(err){
			console.log(err);
		} else {
			res.redirect("/prayers");
		}
	});
});


app.listen("3001", function() {
	console.log("Prayers Server Has Started!")
});
