var express = require("express");
var router = express.Router();

var Campground = require("../models/campground")


//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});
 
//CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
    var newCampground = {name: name, image: image, description: desc, author:author}
	
	
	
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
			console.log(newCampground);
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    			Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT Campground
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});	
	});
})

// Update campground route
router.put("/:id", checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


// Destroy campground route
router.delete("/:id", checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err) {
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});



// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

function checkCampgroundOwnership(req, res, next) {
	if(req.isAuthenticated()){
		// if not, redirect
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				res.redirect("back");
			} else {
				// how to compare ids
				if(foundCampground.author.id.equals(req.user._id)) {
					//render show template with that campground
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
};

module.exports = router;



