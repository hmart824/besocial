const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async (req , res)=>{
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user' , 'name')
        .populate({
            path: 'comments',
            options: { sort: '-createdAat'},
            populate:{
                path: 'user',
                select: 'name'
            }
        });
        return res.status(200).json({
            message: 'List of posts v1',
            Posts: posts
        })
    }catch(err){
        console.log(err);
    } 
}

module.exports.destroy = async(req , res)=>{
    try{
      await Post.findByIdAndDelete(req.params.id);
         await Comment.deleteMany({post: req.params.id});
             return res.status(200).json({
                message: "Post and post associated comments are deleted"
             });
    }catch(err){
     console.log(err);
     return res.status(500).json({
        message: "Internal server error"
     })
    }
 }