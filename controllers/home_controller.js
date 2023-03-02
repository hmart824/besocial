const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.home = (req , res)=>{
   
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec ((err , posts)=>{
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