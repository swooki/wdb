var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

// Root Route
router.get("/", function(req, res){
    res.render("landing");
});


// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
			// Basically, req.flash() is meant to be used with res.redirect().
			// When using res.render() you can just pass the flash message directly 
			// as the second argument, since res.render offers the ability 
			// to pass values to the template.
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp!");
			res.redirect("/campgrounds"); 
        });
    });
});

// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
router.get("/logout", function(req, res){
   	req.logout();
	req.flash("success", "Logged you out!");
   	res.redirect("/campgrounds");
}); 

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

