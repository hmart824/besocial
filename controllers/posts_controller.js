const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.posts = (req , res)=>{
    return res.render('post' , {
        title: 'user_post'
    })
}
module.exports.create = (req , res)=>{
   if(req.isAuthenticated()){
    Post.create({
        content: req.body.content,
        user: req.user._id
    } , (err , post)=>{
        if(err){
            console.log('error in creating post');
            return ;
        }
        console.log("-------", post)
        return res.redirect('back');
    })
    }
    else{
        return res.redirect('back');
    }
}

module.exports.destroy = (req , res)=>{
    Post.findByIdAndDelete(req.query.id, (err)=>{
        if(err){
            console.log('error in finding post to destroy');
            return;
        }
        Comment.deleteMany({post: req.query.id},(err)=>{
            if(err){
                console.log('error in deletting comments of post');
                return;
             }
                return res.redirect('back');
            })
        
    })
}