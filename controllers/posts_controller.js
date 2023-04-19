const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const User = require('../models/user');

module.exports.posts = (req , res)=>{
    return res.render('post' , {
        title: 'user_post'
    })
}
module.exports.create = async (req , res)=>{
  try{
    let user = await User.findById(req.user._id);
     let post = await Post.create({
        content: req.body.content,
        user: user.id
    });
    user.posts.push(post);
    user.save();
    if(req.xhr){
      post = await post.populate('user' , ['name' , 'avatar']);
      console.log(post)
      return res.status(200).json({
        data: {
          post: post,
          path: req.app.locals.staticPath('images/default_avatar.png')
        },
        message:'post created'
      })
    }
    req.flash('success','Post Published!');
    
    return res.redirect('back'); 
  }catch(err){
    console.log(err);
    return;
  }
}

module.exports.destroy = async(req , res)=>{
   try{
     let post = await Post.findByIdAndDelete(req.params.id);
     if(post.user == req.user.id){
        await Like.deleteMany({likeable: post._id, onModel: 'Post'});
        await Like.deleteMany({likeable: {$in: post.comments}});
        await Comment.deleteMany({post: req.params.id});
        await User.findByIdAndUpdate(post.user , {$pull:{posts: req.params.id}});
       if(req.xhr){
         return res.status(200).json({
           data:{
             post_id: req.params.id
           },
           message: 'Post deleted successfully!'
         })
       }
     }else{
      return res.redirect('back');
     }
        req.flash('error','Post deleted!');
            return res.redirect('back');
   }catch(err){
    console.log(err);
    return;
   }
}