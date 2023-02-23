const Post = require('../models/post')
module.exports.home = (req , res)=>{
   
    Post.find({}).populate('user').exec ((err , posts)=>{
        if(err){
            console.log("error in finding the posts");
            return;
        }
        return res.render('home' , {
            title: "home",
            posts: posts
        })
    })
}