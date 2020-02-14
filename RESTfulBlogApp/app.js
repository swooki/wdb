var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose.connect("mongodb://localhost:27017/restful_blog_app", 
				 {useNewUrlParser:true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type:Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFul FOUTES
// Blog.create({
// 	title:"Test Blog",
// 	image:"https://pixabay.com/get/54e2d4464953ab14f6da8c7dda793f7f1636dfe2564c704c7d2e78d29349c25d_340.jpg",
// 	body:"HELLO THIS IS A BLOG POST"
// });
app.get("/", function(req, res){
	res.redirect("/blogs");
})

// INDEX ROUTE
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err) {
			console.log(err);
		} else {
			res.render("index", {blogs:blogs});		
		}
	});
	
});

// NEW ROUTE
app.get("/blogs/new", function(req,res){
	res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err) {
			console.log(err);
		} else {
			res.render("show", {blog:foundBlog});
		}
	});
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err) {
			console.log(err);
		} else {
			res.render("edit", {blog:foundBlog});
		}
	});
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err){
			console.log(err);
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndDelete(req.params.id, function(err) {
		if(err){
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	});
});


app.listen("3001", function() {
	console.log("RESTfulBlogApp Server Has Started!")
});