var Campground = require("../models/campground");
var Comment = require("../models/comment")
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
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

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		// if not, redirect
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
				// how to compare ids
				if(foundComment.author.id.equals(req.user._id)) {
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
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;