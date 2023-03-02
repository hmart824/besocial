const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (req , res)=>{
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
                })
                
                post.comments.push(comment);
                post.save();
                return res.redirect('back'); 
        }else{
            return res.redirect('back'); 
        }
    }catch(err){
        console.log(err);
        return;
    }
 }

 module.exports.destroy = async (req , res)=>{
    try{
        let comment =  await Comment.findByIdAndDelete(req.query.id)
        let postId = comment.post;
        await Post.findByIdAndUpdate(postId , {$pull:{comments: req.query.id}});
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}