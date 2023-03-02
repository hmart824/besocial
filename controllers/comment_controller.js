const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req , res)=>{
    Post.findById(req.body.post , (err , post)=>{
        if(err){
            console.log('error in finding the post');
            return;
        }
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },(err , comment)=>{
                if(err){
                    console.log('error in creating comment');
                    return;
                }
                console.log("comment" , comment)
                post.comments.push(comment);
                post.save();
                res.redirect('back');

            })
        }
    })
   
 }

 module.exports.destroy = (req , res)=>{
    Comment.findByIdAndDelete(req.query.id , (err , comment)=>{
        if(err){
            console.log('error in finding comment');
            return;
        } 
            let postId = comment.post;
            Post.findByIdAndUpdate(postId , {$pull:{comments: req.query.id}},(err , post)=>{
                if(err){
                    console.log('error in deleting comment in post');
                    return;
                } 
                return res.redirect('back');
            })
    })
}