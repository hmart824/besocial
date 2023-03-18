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
                if(req.xhr){
                    comment = await comment.populate('user' , 'name');
                    return res.status(200).json({
                        data:{
                            comment: comment
                        },
                        message: 'Comment created successfully!'
                    })
                }
                
               
                req.flash('success','Comment posted!');
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
        console.log(req.params.id)
        let comment =  await Comment.findById(req.params.id);
        console.log(comment)
        let postId = comment.post;
        
        comment.deleteOne();
        console.log(postId)
        await Post.findByIdAndUpdate(postId , {$pull:{comments: req.params.id}});
        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }
        req.flash('error','Comment deleted');
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}