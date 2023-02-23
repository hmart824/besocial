const Post = require('../models/post');

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