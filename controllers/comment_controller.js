const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

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
                comment = await comment.populate('user' , ['name' , 'email']);
                // commentMailer.newComment(comment)
                let job = queue.create('emails' , comment).save((err)=>{
                    if(err){
                        console.log('error in sendng the job to queue' , err);
                        return;
                    }else{
                        console.log('job enqueued' , job.id);
                    }
                })
                if(req.xhr){
                    
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
        let comment =  await Comment.findByIdAndDelete(req.params.id);
        let postId = comment.post;
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