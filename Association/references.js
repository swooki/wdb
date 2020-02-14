var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", 
				 {useNewUrlParser:true, useUnifiedTopology: true});



// POST - title, content
var postSchema = new mongoose.Schema({}
									
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);


// USER - email, name
var userSchema = new mongoose.Schema({
	email:String,
	name:String,
	posts:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Post"
	}]
});
var User = mongoose.model("User", userSchema);


// var newUser = new User({
// 	email:"soonduck@brown.net",
// 	name: "Soonduck Jang"
// });

// newUser.posts.push({
// 	title:"How to bre polyjuice",
// 	content: "Just kidding"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

var newPost = new Post({
	title: "Reflection on Apples2",
	content: "They are delicious2"
});

newPost.save(function(err, post){
	if(err){
		console.log(err);
	} else {
		console.log(post);
	}
});

// User.findOne({name:"Soonduck Jang"}, function(err, user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);

// 		user.posts.push({
// 			title:"3 things I really hate",
// 			content:"cats cats cats"
// 		});
		
// 		user.save(function(err, user){
// 			if(err){
// 				console.log(err);
// 			} else {
// 				console.log(user);
// 			}
// 		});
// 	}
// });