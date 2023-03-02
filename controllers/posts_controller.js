const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.posts = (req , res)=>{
    return res.render('post' , {
        title: 'user_post'
    })
}
module.exports.create = async (req , res)=>{
  try{
     await Post.create({
        content: req.body.content,
        user: req.user._id

    })
    return res.redirect('back'); 
  }catch(err){
    console.log(err);
    return;
  }
}

module.exports.destroy = async(req , res)=>{
   try{
    await Post.findByIdAndDelete(req.query.id);
        await Comment.deleteMany({post: req.query.id})
            return res.redirect('back');
   }catch(err){
    console.log(err);
    return;
   }
}