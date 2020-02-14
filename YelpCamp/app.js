var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose"); 
var app = express();
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var seedDB = require("./seeds");


mongoose.connect("mongodb://localhost:27017/yelp_camp", 
				 {useNewUrlParser:true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();


app.get("/", function(req, res){
	res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds) {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});		
		}
	});
});

// NEW
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
});

// CREATE
app.post("/campgrounds", function(req, res){
	// get data from form and dd to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description
	var newCampground = {name:name, image:image, description:description}
	
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
		
	// redirect back to campground page
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
});

//==========================================================================================
// SHOW - shows more info about one campground
app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("comments/new", {campground:foundCampground});
		}
	});
});

// CREATE
app.post("/campgrounds/:id/comments", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			console.log(campground);
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else {
					campground.comments.push(comment);
					campground.save();
					
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

app.listen("3001", function() {
	console.log("YelpCamp Server Has Started!")
});